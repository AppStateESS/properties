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
use Canopy\Request;

class Reports extends Base
{

    public $date;
    public $more_rows = true;
    public $limit = 20;
    public $offset = 0;

    protected function build()
    {
        
    }

    public function getInactiveManagers(Request $request)
    {
        $this->pullVariables($request);
        $db = Database::getDB();
        $c = $db->addTable('prop_contacts');
        $p = $db->addTable('properties', null, false);
        $cond = new \phpws2\Database\Conditional($db, $c->getField('id'),
                $p->getField('contact_id'), '=');
        $db->joinResources($c, $p, $cond, 'left');
        $exp = new \phpws2\Database\Expression('count(' . $p->getField('id') . ')',
                'count');
        $db->addExpression($exp);
        $c->addField('id');
        $c->addField('active');
        $c->addField('company_name');
        $c->addField('last_log');
        $c->addFieldConditional('last_log', $this->date, '<');
        $c->addOrderBy('last_log');
        $db->setGroupBy($c->getField('id'));
        $result = $db->select();
        return $result;
    }

    protected function pullVariables(Request $request)
    {
        $this->date = strtotime($request->pullGetString('date'));
        $this->offset = $request->pullGetInteger('offset', true);
    }

    public function getStudents(Request $request)
    {
        $this->pullVariables($request);

        if ((int) $this->limit <= 0 || (int) $this->limit > 20) {
            $this->limit = 20;
        }

        $offset = $this->offset * $this->limit;

        $db = Database::getDB();
        $db->setLimit($this->limit, $offset);
        $tbl = $db->addTable('users');
        $tbl->addField('id');
        $tbl->addField('username');
        $tbl->addField('last_logged');
        $tbl->addFieldConditional('last_logged', $this->date, '<');
        $tbl->addFieldConditional('last_logged', 0, '!=');
        $tbl->addFieldConditional('deity', 0);
        $tbl->addOrderBy('last_logged', 'asc');
        $result = $db->select();
        if (count($result) < $this->limit) {
            $this->more_rows = false;
        }
        return $result;
    }

    protected function deleteUserGroup($user_id)
    {
        $db = Database::getDB();
        $tbl = $db->addTable('users_groups');
        $tbl->addFieldConditional('user_id', $user_id);
        $db->delete();
    }

    protected function deleteUserSublease($user_id)
    {
        $factory = new \properties\Factory\Sublease;
        $sublease = $factory->getSubleaseByUser($user_id);
        if ($sublease) {
            $factory->delete($sublease);
        }
    }

    protected function deleteUserRoommate($user_id)
    {
        $factory = new \properties\Factory\Roommate;
        $roommate = $factory->getRoommateByUser($user_id);
        if ($roommate) {
            $factory->delete($roommate);
        }
    }

    protected function deleteUserBan($user_id)
    {
        $factory = new \properties\Factory\BanUser;
        $factory->removeBanByUser($user_id);
    }

    public function deleteStudent($user_id)
    {
        $db = Database::getDB();
        $tbl = $db->addTable('users');
        $tbl->addFieldConditional('deity', 0);
        $tbl->addFieldConditional('id', $user_id);
        $db->delete();

        $this->deleteUserGroup($user_id);
        $this->deleteUserSublease($user_id);
        $this->deleteUserRoommate($user_id);
        $this->deleteUserBan($user_id);
    }

    public function getOverview(Request $request)
    {
        $propertyFactory = new Property;
        $counts['property_count'] = $propertyFactory->activeCount();

        $managerFactory = new Manager;
        $counts['manager_count'] = $managerFactory->activeCount();

        $subleaseFactory = new Sublease;
        $counts['sublease_count'] = $subleaseFactory->activeCount();

        $roommateFactory = new Roommate;
        $counts['roommate_count'] = $roommateFactory->activeCount();

        return $counts;
    }

}
