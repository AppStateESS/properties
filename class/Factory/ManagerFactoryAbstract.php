<?php

/*
 * See docs/AUTHORS and docs/COPYRIGHT for relevant info.
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * @author Matthew McNaney <mcnaney at gmail dot com>
 *
 * @license http://opensource.org/licenses/lgpl-3.0.html
 */

namespace properties\Factory;

use phpws2\Database;
use properties\Resource\Manager as Resource;
use properties\Exception\MissingInput;
use properties\Exception\PrivilegeMissing;

abstract class ManagerFactoryAbstract extends BaseFactory
{

    /**
     * 
     * @return properties\Resource\Manager
     */
    public function build()
    {
        return new Resource;
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

}
