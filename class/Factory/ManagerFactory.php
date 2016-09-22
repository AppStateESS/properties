<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace properties\Factory;

use \phpws2\Database;
use \properties\Resource\Manager as Resource;
use \properties\Exception\MissingInput;

/**
 * Description of ManagerFactory
 *
 * @author Matthew McNaney <mcnaneym@appstate.edu>
 */
class ManagerFactory extends Base
{

    public function listView()
    {
        $script[] = $this->getScript('manager');
        $react = implode("\n", $script);
        //\Layout::addStyle('properties', 'style.css');
        //$icons = json_encode(\properties\Factory\Base::categoryIcons());
        $content = <<<EOF
<div id="manager"></div>
$react
EOF;
        return $content;
    }

    public function listingJson($limit = 100)
    {
        $db = Database::getDB();
        $tbl = $db->addTable('prop_contacts');
        if ((int) $limit > 0) {
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


        $result = $db->select();
        if (empty($result)) {
            return null;
        }
        $resourceArray = \phpws2\ResourceFactory::makeResourceStringArray($result,
                        '\properties\Resource\Manager');
        $final = array_map(function($row) {
            unset($row['password']);
            return $row;
        }, $resourceArray);

        return json_encode($final);
    }

    /**
     * Administrative post of the manager
     * @return string
     */
    public function post()
    {
        $errors = array();
        $r = new Resource;
        try {
            $id = $this->pullPostInteger('id');
            $r->setId($id);
            $username = strtolower($this->pullPostString('username'));

            if (empty($username)) {
                $errors['usernameEmpty'] = true;
            } elseif ($this->checkUsername($username, $id)) {
                $errors['usernameDuplicate'] = true;
            } else {
                $r->username = $username;
            }

            $password = $this->pullPostString('password');

            if (empty($password)) {
                if ($id == 0) {
                    $errors['passwordEmpty'] = true;
                }
            } else {
                if (strlen($password) < 9) {
                    $errors['passwordShort'] = true;
                } else {
                    $r->password = $password;
                }
            }

            $first_name = $this->pullPostString('first_name');

            if (empty($first_name)) {
                $errors['firstNameEmpty'] = true;
            } else {
                $r->first_name = $first_name;
            }

            $last_name = $this->pullPostString('last_name');

            if (empty($last_name)) {
                $errors['lastNameEmpty'] = true;
            } else {
                $r->last_name = $last_name;
            }

            $phone = preg_replace('/[^\d]/', '', $this->pullPostString('phone'));
            if (empty($phone)) {
                $errors['phoneEmpty'] = true;
            } elseif (strlen($phone < 7)) {
                $errors['phoneBadFormat'] = true;
            } else {
                $r->phone = $phone;
            }

            $email_address = strtolower($this->pullPostString('email_address'));

            if (empty($email_address)) {
                $errors['emailEmpty'] = true;
            } else {
                try {
                    $r->email_address = $email_address;
                } catch (\Exception $e) {
                    $errors['emailBadFormat'] = true;
                }
            }

            $company_name = $this->pullPostString('company_name');
            if (empty($company_name)) {
                $errors['companyEmpty'] = true;
            } else {
                $r->company_name = $company_name;
            }

            if (!empty($errors)) {
                $json = $errors;
                $json['status'] = 'error';
                return $json;
            }

            $r->company_address = $this->pullPostString('company_address');
            $r->company_url = $this->pullPostString('company_url');
            $r->times_available = $this->pullPostString('times_available');

            $this->saveResource($r);
            $json = array('status' => 'success');
        } catch (\properties\Exception\MissingInput $e) {
            $json = array('status' => 'usererror', 'error' => $e->getMessage());
        } catch (\Exception $e) {
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
        $company = $tbl->createConditional('company_name',
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

    public function signInForm()
    {
        
    }

}
