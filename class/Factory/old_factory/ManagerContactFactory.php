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

class ManagerContactFactory extends ManagerFactoryAbstract
{

    public function __construct()
    {
        parent::__construct('managercontact');
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

}
