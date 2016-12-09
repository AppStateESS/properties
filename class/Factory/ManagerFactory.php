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
class ManagerFactory extends ManagerFactoryAbstract
{

    public function __construct($controller = 'manager')
    {
        parent::__construct($controller);
    }

    public function approvedListing($limit = 100, $search = null)
    {
        $listing = new Manager\Listing;
        $listing->limit = $limit;
        $listing->search = $search;
        $listing->active = null;
        $listing->view = true;
        $listing->restricted = $this->role->isUser() || $this->role->isLogged();
        $result = $listing->get(true, true);
        if (empty($result)) {
            return array();
        }
        return $result;
    }

    public function unapprovedListing($limit = 100, $search = null)
    {
        if (!$this->role->isAdmin()) {
            throw new PrivilegeMissing;
        }
        $listing = new Manager\Listing;
        $listing->limit = $limit;
        $listing->active = null;
        $listing->approved = 0;
        $listing->include_property_count = false;
        $listing->orderby = 'last_log';
        $listing->orderby_dir = 'desc';
        $listing->view = true;
        $listing->restricted = false;
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
            $manager->active = true;
            $manager->approved = true;
            $this->saveResource($manager);
        } catch (\Exception $e) {
            \phpws2\Error::log($e);
            $json = array('status' => 'fail', 'error' => 'An unrecoverable error occurred.');
        }
        $json = array('status' => 'success');
        return $json;
    }

    public function delete($id)
    {
        if (!$id) {
            throw new \Exception('Id is null');
        }

        $db = \phpws2\Database::getDB();
        $db->begin();
        try {
            $tbl = $db->addTable('prop_contacts');
            $tbl->addFieldConditional('id', (int) $id);
            $db->delete();

            $properties = $this->getProperties($id);

            if (empty($properties)) {
                $db->commit();
                return true;
            }

            // Delete all their properties.
            $propertyFactory = new PropertyFactory;
            foreach ($properties as $property) {
                $propertyFactory->delete($property['id']);
            }
            $db->commit();
        } catch (\Exception $e) {
            $db->rollback();
            throw $e;
        }
        // Delete the manager's image directory
        $this->deleteImageDirectory($id);
        return true;
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
        } else {
            throw \Exception('Manager directory not found: ' . $directory);
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

    public function needApproval()
    {
        $db = Database::getDB();
        $tbl = $db->addTable('prop_contacts');
        $tbl->addFieldConditional('approved', 0);
        $tbl->addField('id')->showCount();
        return $db->selectColumn();
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
        
        
        $vars = $manager->view();
        $vars = array_merge($this->contactInformation(), $vars);
        $template = new \phpws2\Template($vars);
        $template->setModuleTemplate('properties', "emails/$refusalLetter");
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

    /**
     * Refuses a manager request
     * @param Resource $manager
     */
    public function refuse(Resource $manager, $reason)
    {
        $this->emailRefusal($manager, $reason);
        //$this->delete($manager->id);
    }

}
