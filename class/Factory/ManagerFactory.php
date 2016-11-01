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
 * Description of ManagerFactory
 *
 * @author Matthew McNaney <mcnaneym@appstate.edu>
 */
class ManagerFactory extends BaseFactory
{

    public function __construct()
    {
        parent::__construct('manager');
    }

    /**
     * 
     * @return properties\Resource\Manager
     */
    public function build()
    {
        return new Resource;
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
     * 
     * @param integer $id
     * @return \properties\Resource\Manager
     */
    public function load($id)
    {
        $manager = parent::load($id);
        $db = Database::getDB();
        $db->addTable('properties')->addField('id', 'count')->showCount();
        $manager->property_count = $db->selectColumn();
        return $manager;
    }

    /**
     * Administrative post of the manager
     * @return string
     */
    public function post(\Request $request)
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
            $r->company_url = $company_url === false ? null : $company_url;
            
            $times_available = $request->pullPostString('times_available',
                    true);
            $r->times_available = $times_available === false ? null : $times_available;

            $this->saveResource($r);
            $json = array('status' => 'success');
        } catch (\properties\Exception\MissingInput $e) {
            $json = array('status' => 'usererror', 'error' => $e->getMessage());
        } catch (\Exception $e) {
            \phpws2\Error::log($e);
            $json = array('status' => 'fail', 'error' => 'An unrecoverable error occurred.');
        }

        return $json;
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
        $passwordCheck = $db->createConditional($tbl->getField('email_address'),
                strtolower($username), 'like');
        $combined = $db->createConditional($usernameCheck, $passwordCheck, 'or');
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
        $db = Database::getDB();
        $tbl = $db->addTable('prop_contacts');
        $email = $tbl->createConditional('email_address', strtolower($email),
                'like');
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
        return $db->select();
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
