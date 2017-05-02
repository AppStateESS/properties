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

use \phpws2\Database;

class BanUser extends Base
{

    public function build()
    {
        return new \properties\Resource\BanUser;
    }

    public function load($id)
    {
        $db = Database::getDB();
        $tbl = $db->addTable('prop_banned');
        $tbl->addFieldConditional('id', $id);
        $row = $db->selectOneRow();
        $ban = $this->build();
        $ban->setVars($row);
        return $ban;
    }

    public function loadByUserId($user_id)
    {
        $db = Database::getDB();
        $tbl = $db->addTable('prop_banned');
        $tbl->addFieldConditional('user_id', $user_id);
        $row = $db->selectOneRow();
        if (empty($row)) {
            return null;
        }
        $ban = $this->build();
        $ban->setVars($row);
        return $ban;
    }

    public function ban($user_id, $reason)
    {
        $ban = $this->loadByUserId($user_id);
        if (!$ban) {
            $this->createBanRecord($user_id, $reason);
        }
        $this->deleteSubleases($user_id);
        $this->deleteRoommate($user_id);
    }

    private function deleteSubleases($user_id)
    {
        $subleaseFactory = new \properties\Factory\Sublease;
        $sublease = $subleaseFactory->getSubleaseByUser($user_id);
        if ($sublease) {
            $subleaseFactory->delete($sublease);
        }
    }

    private function deleteRoommate($user_id)
    {
        $roommateFactory = new \properties\Factory\Roommate;
        $roommate = $roommateFactory->getRoommateByUser($user_id);
        if ($roommate) {
            $roommateFactory->delete($roommate);
        }
    }

    private function createBanRecord($user_id, $reason)
    {
        $db = Database::getDB();
        $tbl = $db->addTable('prop_banned');
        $tbl->addValue('user_id', $user_id);
        $tbl->addValue('reason', $reason);
        $db->insert();
    }

    public function isCurrentUserBanned()
    {
        return (bool) $this->getCurrentBannedUser();
    }

    public function getCurrentUserBanned()
    {
        return $this->loadByUserId(\Current_User::getId());
    }

    public function removeBanByUser($user_id)
    {
        $db = Database::getDB();
        $tbl = $db->addTable('prop_banned');
        $tbl->addFieldConditional('user_id', $user_id);
        $db->delete();
    }

}
