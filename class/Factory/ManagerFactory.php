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

    public function __construct()
    {
        parent::__construct('manager');
    }

    public function listing($limit = 100, $search = null)
    {
        $db = Database::getDB();
        $tbl = $db->addTable('prop_contacts');
        $tbl2 = $db->addTable('properties');
        $tbl2->addField('id', 'property_count')->showCount();
        if ((int) $limit <= 0) {
            $db->setLimit(100);
        }
        $tbl->addField('id');
        $tbl->addField('username');
        $tbl->addField('first_name');
        $tbl->addField('last_name');
        $tbl->addField('phone');
        $tbl->addField('email_address');
        $tbl->addField('company_name');
        $tbl->addField('company_address');
        $tbl->addField('company_url');
        $tbl->addField('times_available');
        $tbl->addField('last_log');
        $tbl->addField('active');
        $tbl->addField('approved');

        $join_conditional = $db->createConditional($tbl->getField('id'),
                $tbl2->getField('contact_id'));
        $db->joinResources($tbl, $tbl2, $join_conditional, 'left');

        $search_string = "%$search%";
        if (!empty($search)) {
            $s1 = $db->createConditional($tbl->getField('username'),
                    $search_string, 'like');
            $s2 = $db->createConditional($tbl->getField('first_name'),
                    $search_string, 'like');
            $s3 = $db->createConditional($tbl->getField('last_name'),
                    $search_string, 'like');
            $s4 = $db->createConditional($tbl->getField('company_name'),
                    $search_string, 'like');
            $sf1 = $db->createConditional($s1, $s2, 'or');
            $sf2 = $db->createConditional($s3, $s4, 'or');
            $conditional = $db->createConditional($sf1, $sf2, 'or');
            $db->addConditional($conditional);
        }
        if (!$this->role->isAdmin()) {
            $tbl->addFieldConditional('active', 1);
        }
        $db->setGroupBy($tbl->getField('id'));
        $result = $db->select();
        if (empty($result)) {
            return array();
        }


        if ($this->role->isUser() || $this->role->isLogged()) {
            $hide = array('private', 'username', 'first_name', 'last_name', 'last_log', 'active', 'approved');
        }
        $hide[] = 'password';

        $resourceArray = \phpws2\ResourceFactory::makeResourceStringArray($result,
                        '\properties\Resource\Manager', $hide);
        $final = array_map(function($row) {
            unset($row['password']);
            return $row;
        }, $resourceArray);
        return $final;
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
        static $allowed_params = array('username', 'passwddord', 'first_name',
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

}
