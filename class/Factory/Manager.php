<?php

/*
 * Factory file for Managers
 * Be aware they used to be called "contacts" and you will see some
 * remnants of this.
 */

namespace properties\Factory;

use phpws2\Database;
use properties\Resource\Manager as Resource;
use properties\Exception\MissingInput;
use properties\Exception\PrivilegeMissing;

/**
 * @author Matthew McNaney <mcnaneym@appstate.edu>
 */
class Manager extends Base
{

    /**
     * @return properties\Resource\Manager
     */
    public function build()
    {
        return new Resource;
    }

    public function approvedListing($limit = 100, $search = null,
            $restricted = true)
    {
        $listing = new Manager\Listing;
        $listing->limit = $limit;
        $listing->search = $search;
        $listing->active = null;
        $listing->view = true;
        $listing->restricted = $restricted;
        $result = $listing->get(true, true);
        if (empty($result)) {
            return array();
        }
        return $result;
    }

    public function unapprovedListing($limit = 100, $search = null)
    {
        $listing = new Manager\Listing;
        $listing->limit = $limit;
        $listing->active = null;
        $listing->approved = 0;
        $listing->include_property_count = false;
        $listing->orderby = 'last_log';
        $listing->orderby_dir = 'desc';
        $listing->view = true;
        $listing->restricted = false;
        $listing->include_inquiry = true;
        $result = $listing->get();
        if (empty($result)) {
            return array();
        }
        return $result;
    }

    /**
     * Administrative post of the manager
     * @return string
     */
    public function adminPost(\Request $request)
    {
        $manager = $this->loadResourceFromPost($request);
        // if array, there were problems
        if (is_array($manager)) {
            return $manager;
        }
        try {
            if (empty($manager->id)) {
                $manager->active = true;
                $manager->approved = true;
            }
            $this->saveResource($manager);
        } catch (\Exception $e) {
            \phpws2\Error::log($e);
            $json = array('status' => 'fail', 'error' => 'An unrecoverable error occurred.');
        }
        $json = array('status' => 'success');
        return $json;
    }

    public function getTable()
    {
        $db = Database::getDB();
        return $db->addTable('prop_contacts');
    }

    public function approve($manager)
    {
        $this->approveManager($manager->id);
        $this->deleteInquiry($manager->id);
        $this->emailApproval($manager);
    }

    private function approveManager($id)
    {
        $tbl = $this->getTable();
        $tbl->addFieldConditional('id', $id);
        $tbl->addValue('approved', 1);
        $tbl->addValue('active', 1);
        $tbl->db->update();
    }

    public function delete($id)
    {
        if (!$id) {
            throw new \Exception('Id is null');
        }

        $db = \phpws2\Database::getDB();
        $db->begin();
        try {
            $this->deleteProperties($id);
            $this->deleteInquiry($id);

            $tbl = $db->addTable('prop_contacts');
            $tbl->addFieldConditional('id', (int) $id);
            $db->delete();

            $db->commit();
        } catch (\Exception $e) {
            $db->rollback();
            throw $e;
        }
        // Delete the manager's image directory
        $this->deleteImageDirectory($id);
        return true;
    }

    public function deleteInquiry($id)
    {
        $db = Database::getDB();
        $tbl = $db->addTable('prop_inquiry');
        $tbl->addFieldConditional('contact_id', $id);
        $db->delete();
    }

    public function deleteProperties($id)
    {
        $properties = $this->getProperties($id);

        if (empty($properties)) {
            return;
        }

        // Delete all their properties.
        $propertyFactory = new PropertyFactory;
        foreach ($properties as $property) {
            $propertyFactory->delete($property);
        }
    }

    public function deleteImageDirectory($id)
    {
        $directory = 'c' . $id;
        if (is_dir($directory)) {
            $files = glob($directory . '*', GLOB_MARK);

            foreach ($files as $file) {
                unlink($file);
            }

            rmdir($directory);
        }
    }

    public function patch($id, $param, $value)
    {
        static $allowed_params = array('username', 'password', 'first_name',
            'last_name', 'phone', 'email_address', 'company_name', 'company_address',
            'company_url', 'times_available', 'active', 'approved');

        if (!in_array($param, $allowed_params)) {
            throw new \Exception('Parameter may not be patched');
        }
        $manager = $this->load($id);
        $manager->$param = $value;
        $this->saveResource($manager);
        return true;
    }

    /**
     * 
     * @param Resource $manager
     * @param type $reason
     * @throws \Exception
     */
    private function emailRefusal($manager, $reason)
    {
        switch ($reason) {
            case 'duplicate':
                $refusalLetter = 'duplicate.html';
                break;

            case 'bad_data':
                $refusalLetter = 'bad_data.html';
                break;

            case 'no_response':
                $refusalLetter = 'no_response.html';
                break;

            default:
                throw new \Exception('Bad reason variable sent to refusal');
        }

        $this->sendEmail($manager, $refusalLetter);
    }

    private function emailApproval($manager)
    {
        $this->sendEmail($manager, 'approval.html');
    }

    /**
     * Refuses a manager request
     * @param Resource $manager
     */
    public function refuse(Resource $manager, $reason)
    {
        $this->emailRefusal($manager, $reason);
        $this->delete($manager->id);
    }

    /**
     * Sends an email of inquiry to the manager request
     * @param Resource $manager
     * @param string $type
     * @throws \Exception
     */
    private function emailInquiry($manager, $type)
    {
        switch ($type) {
            case 'sublease':
                $inquiryLetter = 'sublease.html';
                break;

            case 'information':
                $inquiryLetter = 'more_information.html';
                break;

            default:
                throw new \Exception('Bad reason variable sent to inquiry');
        }

        $this->sendEmail($manager, $inquiryLetter);
    }

    private function sendEmail($manager, $email_template)
    {
        $vars = $manager->view(true);
        $vars = array_merge($this->contactInformation(), $vars);
        $template = new \phpws2\Template($vars);
        $template->setModuleTemplate('properties', "emails/$email_template");
        $content = $template->get();

        $contact_info = $this->contactInformation();

        $email_address = $manager->email_address;
        $transport = \Swift_MailTransport::newInstance();
        //$transport = \Swift_SendmailTransport::newInstance();

        $message = \Swift_Message::newInstance();
        $message->setSubject('Manager request denied');
        $message->setFrom($contact_info['our_email']);
        $message->setTo($email_address);
        $message->setBody($content, 'text/html');
        $mailer = \Swift_Mailer::newInstance($transport);
        $mailer->send($message);
    }

    public function inquiry(Resource $manager, $inquiry_type)
    {
        $this->emailInquiry($manager, $inquiry_type);
        InquiryFactory::save($manager->id, $inquiry_type);
    }

    /**
     * 
     * @param integer $id
     * @return \properties\Resource\Manager
     */
    public function load($id)
    {
        $manager = parent::load($id);
        $manager->property_count = $this->propertyCount($id);
        $inquiry = $this->getInquiry($id);
        if (!empty($inquiry)) {
            $manager->inquiry_date = $inquiry['inquiry_date'];
            $manager->inquiry_type = $inquiry['inquiry_type'];
        }
        return $manager;
    }

    private function propertyCount($contact_id)
    {
        $db = Database::getDB();
        $tbl = $db->addTable('properties');
        $tbl->addFieldConditional('contact_id', $contact_id);
        $tbl->addField('id', 'count')->showCount();
        return $db->selectColumn();
    }

    private function getInquiry($contact_id)
    {
        $db = Database::getDB();
        $tbl = $db->addTable('prop_inquiry');
        $tbl->addFieldConditional('contact_id', $contact_id);
        return $db->selectOneRow();
    }

    protected function loadResourceFromPost(\Request $request)
    {
        $errors = array();
        $r = new Resource;

        try {
            $id = $request->pullPostInteger('id', true);
            if ($id) {
                $r->setId($id);
            }

            $username = strtolower($request->pullPostString('username', true));

            if (empty($username)) {
                $errors['usernameEmpty'] = true;
            } elseif ($this->checkUsername($username, $id)) {
                $errors['usernameDuplicate'] = true;
            } else {
                $r->username = $username;
            }

            $password = $request->pullPostString('password', true);

            if (empty($password)) {
                if ($id == 0) {
                    $errors['passwordEmpty'] = true;
                }
            } else {
                if (strlen($password) < 8) {
                    $errors['passwordShort'] = true;
                } else {
                    $r->password = $password;
                }
            }

            $first_name = $request->pullPostString('first_name', true);

            if (empty($first_name)) {
                $errors['firstNameEmpty'] = true;
            } else {
                $r->first_name = $first_name;
            }

            $last_name = $request->pullPostString('last_name', true);

            if (empty($last_name)) {
                $errors['lastNameEmpty'] = true;
            } else {
                $r->last_name = $last_name;
            }

            $phone = preg_replace('/[^\d]/', '',
                    $request->pullPostString('phone', true));
            if (empty($phone)) {
                $errors['phoneEmpty'] = true;
            } elseif (strlen($phone < 7)) {
                $errors['phoneBadFormat'] = true;
            } else {
                $r->phone = $phone;
            }

            $email_address = strtolower($request->pullPostString('email_address',
                            true));

            if (empty($email_address)) {
                $errors['emailEmpty'] = true;
            } else {
                try {
                    $r->email_address = $email_address;
                } catch (\Exception $e) {
                    $errors['emailBadFormat'] = true;
                }
            }

            $company_name = $request->pullPostString('company_name', true);
            if (empty($company_name)) {
                $errors['companyEmpty'] = true;
            } elseif ($this->checkCompanyName($company_name, $id)) {
                $errors['companyDuplicate'] = true;
            } else {
                $r->company_name = $company_name;
            }

            if (!empty($errors)) {
                $json = $errors;
                $json['status'] = 'error';
                return $json;
            }

            $company_address = $request->pullPostString('company_address', true);
            $r->company_address = $company_address === false ? null : $company_address;

            $company_url = $request->pullPostString('company_url', true);
            if (empty($company_url)) {
                $r->company_url = null;
            } else {
                if (preg_match('@^(https?:\/\/)@', $company_url)) {
                    $r->company_url = $company_url;
                } else {
                    $r->company_url = 'http://' . $company_url;
                }
            }

            $times_available = $request->pullPostString('times_available', true);
            $r->times_available = $times_available === false ? null : $times_available;
            return $r;
        } catch (\properties\Exception\MissingInput $e) {
            return array('status' => 'usererror', 'error' => $e->getMessage());
        } catch (\Exception $e) {
            \phpws2\Error::log($e);
            return array('status' => 'fail', 'error' => 'An unrecoverable error occurred.');
        }
    }

    /**
     * Returns true if user name is already in use
     * @param string $username
     * @param integer $id
     * @return boolean
     */
    public function checkUsername($username, $id = 0)
    {
        $db = Database::getDB();
        $tbl = $db->addTable('prop_contacts');
        $usernameCheck = $db->createConditional($tbl->getField('username'),
                strtolower($username), 'like');
        $emailCheck = $db->createConditional($tbl->getField('email_address'),
                strtolower($username), 'like');
        $combined = $db->createConditional($usernameCheck, $emailCheck, 'or');
        if ($id > 0) {
            $idCheck = $db->createConditional($tbl->getField('id'), $id, '!=');
            $together = $db->createConditional($combined, $idCheck, 'and');
            $db->addConditional($together);
        } else {
            $db->addConditional($combined);
        }
        $tbl->addField('id');
        $result = $db->selectOneRow();
        return (bool) $result;
    }

    /**
     * Returns true if email is already in use
     * @param string $email
     * @param integer $id
     * @return boolean
     */
    public function checkEmail($email, $id = 0)
    {
        if (empty($email)) {
            throw new \Exception('Missing email address');
        }
        $db = Database::getDB();
        $tbl = $db->addTable('prop_contacts');
        $email = $db->createConditional($tbl->getField('email_address'),
                strtolower($email), 'like');
        if ($id > 0) {
            $idCheck = $db->createConditional($tbl->getField('id'), $id, '!=');
            $together = $db->createConditional($email, $idCheck, 'and');
            $db->addConditional($together);
        } else {
            $db->addConditional($email);
        }
        $tbl->addField('id');
        $result = $db->selectOneRow();
        return (bool) $result;
    }

    /**
     * Returns true if company name is in use
     * @param string $company_name
     * @param integer $id
     * @return boolean
     */
    public function checkCompanyName($company_name, $id = 0)
    {
        $db = Database::getDB();
        $tbl = $db->addTable('prop_contacts');
        $company = $db->createConditional('company_name',
                strtolower($company_name), 'like');
        if ($id > 0) {
            $idCheck = $db->createConditional($tbl->getField('id'), $id, '!=');
            $together = $db->createConditional($company, $idCheck, 'and');
            $db->addConditional($together);
        } else {
            $db->addConditional($company);
        }
        $tbl->addField('id');
        $result = $db->selectOneRow();
        return (bool) $result;
    }

    public function getProperties($contact_id)
    {
        $db = \phpws2\Database::getDB();
        $tbl = $db->addTable('properties');
        $tbl->addFieldConditional('contact_id', $contact_id);
        return $db->selectAsResources('properties\Resource\Property');
    }

    public function signin($username, $password)
    {
        $db = Database::getDB();
        $tbl = $db->addTable('prop_contacts');

        $password = new \phpws2\Variable\Password($password, 'password',
                PROPERTIES_MANAGER_SALT);
        $tbl->addFieldConditional('username', $username);
        $tbl->addFieldConditional('password', $password);
        $manager = $db->selectOneRow();
        if ($manager === false) {
            return false;
        } else {
            return $manager['id'];
        }
    }

    public function signout()
    {
        $this->clearCurrentLoggedManager();
    }

    /**
     * 
     * @param int $contact_id
     * @param bool $restricted
     * @return string
     * @throws \properties\Exception\ResourceNotFound
     */
    public function view($contact_id, $restricted = true)
    {
        if (empty($contact_id)) {
            throw new \properties\Exception\ResourceNotFound;
        }

        $manager = $this->load($contact_id);
        $vars = $manager->view($restricted);
        $template = new \phpws2\Template($vars);
        $template->setModuleTemplate('properties', 'manager/view.html');
        return $template->get();
    }
    
     public function signup(\Request $request)
    {
        $manager = $this->loadResourceFromPost($request);
        // if array, there were problems
        if (is_array($manager)) {
            return $manager;
        }

        try {
            $manager->active = false;
            $manager->approved = false;
            $this->saveResource($manager);
        } catch (\Exception $e) {
            \phpws2\Error::log($e);
            $json = array('status' => 'fail', 'error' => 'An unrecoverable error occurred.');
        }
        $json = array('status' => 'success');
        return $json;
    }
    

}
