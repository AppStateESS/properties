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
use Canopy\Request;

require_once PHPWS_SOURCE_DIR . 'mod/properties/class/PasswordHash.php';

// do not uncomment below in production
//require_once 'mod/properties/class/FakeSwiftMailer.php';

/**
 * @author Matthew McNaney <mcnaneym@appstate.edu>
 */
class Manager extends Base
{

    public $more_rows = true;

    /**
     * @return properties\Resource\Manager
     */
    public function build()
    {
        return new Resource;
    }

    public function approvedListing(Request $request)
    {
        $listing = new Manager\Listing;
        $listing->offset = $request->pullGetString('offset', true);
        $listing->search = $request->pullGetString('search', true);
        $listing->active = true;
        $listing->view = true;
        $listing->orderby = 'company_name';
        $listing->orderby_dir = 'asc';
        $listing->restricted = true;
        $listing->must_have_property = true;
        $result = $listing->get(true, true);
        $this->more_rows = $listing->more_rows;
        if (empty($result)) {
            return array();
        }
        return $result;
    }

    public function unapprovedListing(Request $request)
    {
        $listing = new Manager\Listing;
        $listing->offset = $request->pullGetString('offset', true);
        $listing->active = null;
        $listing->approved = 0;
        $listing->limit = 0;
        $listing->include_property_count = false;
        $listing->orderby = 'company_name';
        $listing->orderby_dir = 'asc';
        $listing->view = true;
        $listing->restricted = false;
        $listing->include_inquiry = true;
        $result = $listing->get();
        $this->more_rows = $listing->more_rows;
        if (empty($result)) {
            return array();
        }
        return $result;
    }

    /**
     * Lists all managers. Admin only.
     * @param integer $limit
     * @param string $search
     * @return array
     */
    public function adminList(Request $request, $unlimited = false)
    {
        $listing = new Manager\Listing;
        $listing->active = null;
        $listing->offset = $request->pullGetString('offset', true);
        $listing->approved = null;
        $listing->include_property_count = true;
        $listing->orderby = 'company_name';
        $listing->orderby_dir = 'asc';
        $listing->view = true;
        $listing->restricted = false;
        $listing->include_inquiry = true;
        $listing->search = $request->pullGetString('search', true);
        $listing->must_have_property = false;
        if ($unlimited) {
            $listing->unlimited = true;
        }
        $result = $listing->get();
        $this->more_rows = $listing->more_rows;
        if (empty($result)) {
            return array();
        }
        return $result;
    }

    /**
     * Administrative post of the manager
     * @return string
     */
    public function adminPost(\Canopy\Request $request)
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

    /**
     * Limited field update for managers only.
     * @return string
     */
    public function managerUpdate(\Canopy\Request $request)
    {
        $manager = $this->load($request->pullPutInteger('id'));
        $ignore = array('username', 'password', 'last_log', 'active', 'private',
            'approved', 'pw_timeout', 'pw_hash', 'inquiry_date', 'inquiry_type', 'property_count');
        $manager->loadPutByType($request, $ignore);
        try {
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
        $propertyFactory = new Property;
        foreach ($properties as $property) {
            $propertyFactory->delete($property);
        }
    }

    public function deleteImageDirectory($id)
    {
        $directory = 'images/properties/c' . $id;
        if (is_dir($directory)) {
            $files = glob($directory . '/*', GLOB_MARK);

            foreach ($files as $file) {
                unlink($file);
            }
            if (is_writable('images/properties/')) {
                rmdir($directory);
            }
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
        $subject = 'Property manager application declined';
        switch ($reason) {
            case 'duplicate':
                $refusalLetter = 'refuse/duplicate.html';
                break;

            case 'bad_data':
                $refusalLetter = 'refuse/bad_data.html';
                break;

            case 'no_response':
                $refusalLetter = 'refuse/no_response.html';
                break;

            default:
                throw new \Exception('Bad reason variable sent to refusal');
        }

        $this->sendEmail($manager, $refusalLetter, $subject);
    }

    public function emailApproval($manager)
    {
        $this->sendEmail($manager, 'approval.html',
                'Property manager account approved');
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
        $subject = 'Manager account inquiry';
        switch ($type) {
            case 'sublease':
                $inquiryLetter = 'inquiry/sublease.html';
                break;

            case 'information':
                $inquiryLetter = 'inquiry/more_information.html';
                break;

            case 'phone_number':
                $inquiryLetter = 'inquiry/phone_number.html';
                break;

            default:
                throw new \Exception('Bad reason variable sent to inquiry');
        }

        $this->sendEmail($manager, $inquiryLetter, $subject);
    }

    private function sendEmail($manager, $email_template, $subject)
    {
        $contact_info = $this->contactInformation();
        $vars = $manager->view(false);
        $vars = array_merge($contact_info, $vars);
        $template = new \phpws2\Template($vars);
        $template->setModuleTemplate('properties', "emails/$email_template");
        $content = $template->get();


        $transport = \Swift_MailTransport::newInstance();
        //$transport = \Swift_SendmailTransport::newInstance();

        $message = \Swift_Message::newInstance();
        $message->setSubject($subject);
        $message->setFrom($contact_info['our_email']);
        $message->setTo($manager->email_address);
        $message->setBody($content, 'text/html');
        $mailer = \Swift_Mailer::newInstance($transport);
        $mailer->send($message);
    }

    public function inquiry(Resource $manager, $inquiry_type)
    {
        $this->emailInquiry($manager, $inquiry_type);
        $this->saveInquiry($manager->id, $inquiry_type);
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
        $tbl->addFieldConditional('active', 1);
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

    protected function loadResourceFromPost(\Canopy\Request $request, $id = 0)
    {
        $errors = array();
        $r = new Resource;

        try {
            $id = $request->pullPostInteger('id', true);
            if ($id) {
                $r = $this->load($id);
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
                    $hasher = $this->getHasher();
                    //$r->password = password_hash($password, PASSWORD_DEFAULT);
                    $r->password = $hasher->HashPassword($password);
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

        $tbl->addFieldConditional('username', $username);
        $row = $db->selectOneRow();
        $hasher = $this->getHasher();
        //if ($row !== false && password_verify($password, $row['password'])) {
        if ($row !== false && $hasher->CheckPassword($password, $row['password'])) {
            $manager = $this->build();
            $manager->setVars($row);
            return $manager;
        } else {
            return false;
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
        if ($restricted && !$manager->active) {
            throw new \properties\Exception\ResourceNotFound;
        }
        $vars = $manager->view($restricted);
        $template = new \phpws2\Template($vars);
        $template->setModuleTemplate('properties', 'manager/view.html');
        return $template->get();
    }

    public function signup(\Canopy\Request $request)
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

    protected function saveInquiry($manager_id, $type)
    {
        $db = Database::getDB();
        $tbl = $db->addTable('prop_inquiry');
        $tbl->addValue('contact_id', $manager_id);
        $tbl->addValue('inquiry_date', time());
        $tbl->addValue('inquiry_type', $type);
        return $db->insert();
    }

    public function forgotForm()
    {
        $template = new \phpws2\Template;
        $template->setModuleTemplate('properties', 'manager/forgot.html');
        return $template->get();
    }

    public function passwordSent()
    {
        $tpl = new \phpws2\Template(array('email' => $email_address));
        $tpl->setModuleTemplate('properties', 'manager/password_sent.html');
        return $tpl->get();
    }

    public function forgotPost(\Canopy\Request $request)
    {
        $email_address = $request->pullPostString('email');
        $manager = $this->getManagerByEmail($email_address);
        if ($manager !== null) {
            $this->sendForgotEmail($manager);
        }
        \Canopy\Server::forward('./properties/Manager/passwordSent?email=' . $email_address);
    }

    public function getManagerByEmail($email_address)
    {
        $manager = $this->build();
        $db = \phpws2\Database::getDB();
        $tbl = $db->addTable('prop_contacts');
        $tbl->addFieldConditional('email_address', $email_address);
        $result = $db->selectOneRow();
        if (empty($result)) {
            return null;
        }

        $manager->setVars($result);
        return $manager;
    }

    private function sendForgotEmail(Resource $manager)
    {
        if (!$manager->id) {
            throw new \Exception('Empty manager');
        }
        // Start the email template with contact information
        $tpl = array_merge($manager->getStringVars(),
                $this->contactInformation());
        $hash = md5(\Canopy\TextString::randomString(12));
        $link = \Canopy\Server::getSiteUrl(true) . 'properties/Manager/changepw/' . $hash;

        $tpl['reset_link'] = $link;

        $timeout = time() + 3600;
        $tpl['timeout'] = strftime('%B %e, %Y at %l:%M%P', $timeout);

        $manager->pw_timeout = $timeout;
        $manager->pw_hash = $hash;
        $this->saveResource($manager);

        $subject = 'Password reset request from ' . \Layout::getPageTitle();

        $transport = \Swift_MailTransport::newInstance();
        //$transport = \Swift_SendmailTransport::newInstance();
        $template = new \phpws2\Template($tpl);
        $template->setModuleTemplate('properties', 'emails/forgot.html');
        $content = $template->get();
        $message = \Swift_Message::newInstance();
        $message->setSubject($subject);
        $message->setFrom($tpl['our_email']);
        $message->setTo($manager->email_address);
        $message->setBody($content, 'text/html');
        $mailer = \Swift_Mailer::newInstance($transport);
        $mailer->send($message);
    }

    private function getByPasswordHash($hash)
    {
        $db = Database::getDB();
        $tbl = $db->addTable('prop_contacts');
        $tbl->addFieldConditional('pw_hash', $hash);
        $row = $db->selectOneRow();
        if (empty($row)) {
            return null;
        }
        $manager = $this->build();
        $manager->setVars($row);
        return $manager;
    }

    public function handlePasswordChange($request)
    {
        $hash = $request->shiftCommand();
        $tpl = new \phpws2\Template();
        $tpl->setModuleTemplate('properties',
                'manager/change_password_error.html');
        if (empty($hash)) {
            $tpl->add('reason', 'your identifying hash is missing');
            return $tpl->get();
        }

        $manager = $this->getByPasswordHash($hash);
        if (empty($manager)) {
            $tpl->add('reason', 'it cannot find your password request');
            return $tpl->get();
        }

        if ($manager->pw_timeout < time()) {
            $tpl->add('reason', 'your request timed out');
            return $tpl->get();
        }
        $content = <<<EOF
<script>
const hash = '$hash'
</script>
EOF;
        return $content . $this->reactView('passwordchange');
    }

    public function postPasswordChange(\Canopy\Request $request)
    {
        $username = $request->pullPostString('username');
        $password = $request->pullPostString('password');
        $hash = $request->pullPostString('hash');

        $db = Database::getDB();
        $tbl = $db->addTable('prop_contacts');
        $tbl->addFieldConditional('username', $username);
        $tbl->addFieldConditional('pw_hash', $hash);
        $row = $db->selectOneRow();
        if (empty($row)) {
            return array('success' => false, 'error' => 'Could not find account. Check username or reapply for a password change');
        }
        $manager = $this->build();
        $manager->setVars($row);
        //$manager->password = password_hash($password, PASSWORD_DEFAULT);
        $hasher = $this->getHasher();
        $manager->password = $hasher->HashPassword($password);
        $manager->pw_hash = null;
        $manager->pw_timeout = 0;
        self::saveResource($manager);
        return array('success' => true);
    }

    public function activeCount()
    {
        $db = Database::getDB();
        $tbl = $db->addTable('prop_contacts');
        $id = $tbl->getField('id');
        $exp = $db->getExpression("count($id)", 'manager_count');
        $tbl->addFieldConditional('active', 1);
        $tbl->addField($exp);
        return $db->selectColumn();
    }

    public function getHasher()
    {
        $hash_cost = 8;
        $hash_portable = FALSE;
        $hasher = new \PasswordHash($hash_cost, $hash_portable);
        return $hasher;
    }

}
