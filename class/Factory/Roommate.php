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

use properties\Resource\Roommate as Resource;
use phpws2\Settings;
use phpws2\Database;

class Roommate extends Base
{

    protected function build()
    {
        return new \properties\Resource\Roommate;
    }

    public function listing(\Canopy\Request $request, $identify = false)
    {
        $listing = new Roommate\Listing;
        $listing->identify = $identify;
        $listing->pullVariables($request);
        return $listing->get();
    }

    public function patch($id, $param, $value)
    {
        static $allowed_params = array('active');

        if (!in_array($param, $allowed_params)) {
            throw new \Exception('Parameter may not be patched');
        }
        $roommate = $this->load($id);
        $roommate->$param = $value;
        $roommate->updated = time();
        $this->saveResource($roommate);
        return true;
    }

    public function post(\Canopy\Request $request)
    {
        $r = new Resource;
        try {
            $r->loadPostByType($request,
                    array('created', 'updated', 'uid', 'active', 'timeout'),
                    array('languages', 'music', 'hobbies'));
            $r->created = time();
            $r->active = true;
        } catch (\Exception $e) {
            throw new \properties\Exception\RoommateSaveFailure($e->getMessage());
        }
        return $r;
    }

    public function put(\Canopy\Request $request, $roommate)
    {
        try {
            $roommate->loadPutByType($request,
                    array('created', 'updated', 'uid', 'active', 'timeout'),
                    array('languages', 'music', 'hobbies'));
        } catch (\Exception $e) {
            throw new \properties\Exception\RoommateSaveFailure($e->getMessage());
        }
        return $roommate;
    }

    public function save(\properties\Resource\Roommate $roommate)
    {
        $roommate->updated = time();
        $roommate->forwardTimeout();
        self::saveResource($roommate);
        return $roommate->id;
    }

    public function getUserRoommate($uid)
    {
        $db = \phpws2\Database::getDB();
        $tbl = $db->addTable('prop_roommate');
        $tbl->addFieldConditional('uid', $uid);
        $db->setLimit(1);
        $row = $db->selectOneRow();
        if (empty($row)) {
            return null;
        }

        $resource = new Resource;
        $resource->setVars($row);
        return $resource;
    }

    public function isOwner(\properties\Resource\Roommate $roommate, $uid)
    {
        return ((int) $roommate->uid === (int) $uid && !empty($uid));
    }

    public function view($id, $contact_allowed, $admin = false)
    {
        \Layout::addStyle('properties', 'roommate/view.css');
        $roommate = $this->load($id);
        $tpl = $roommate->view(true);
        $tpl['contact_allowed'] = $contact_allowed;

        $auth = \Current_User::getAuthorization();
        if (!empty($auth->login_link)) {
            $tpl['login'] = $auth->login_link;
        } else {
            $tpl['login'] = 'index.php?module=users&action=user&command=login_page';
        }

        $template = new \phpws2\Template;
        if (!$roommate->active && !$admin) {
            $template->setModuleTemplate('properties',
                    'errorpage/ResourceNotFound.html');
        } else {
            $template->addVariables($tpl);
            $template->setModuleTemplate('properties', 'roommate/view.html');
        }

        return $template->get();
    }

    /**
     * Checks to see if the property inactive timeout check has passed.
     * updatePropertyTimeout does the setting update
     * @return boolean
     */
    public function roommateTimeoutPast()
    {
        $timeout = Settings::get('properties', 'roommate_timeout');
        return $timeout < time();
    }

    /**
     * Sets the property timeout 30 days in advance
     */
    public function updateRoommateTimeout()
    {
        Settings::set('properties', 'roommate_timeout', time() + PROPERTIES_FORWARD_TIMEOUT);
    }

    /**
     * Flips properties that have passed the timeout
     */
    public function flipRoommateTimeout()
    {
        $db = Database::getDB();
        $tbl = $db->addTable('prop_roommate');
        $tbl->addFieldConditional('timeout', time(), '<');
        $tbl->addFieldConditional('active', 1);
        $tbl->addValue('active', 0);
        $db->update();
    }

}
