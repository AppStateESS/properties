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

use \properties\Resource\Roommate as Resource;

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

    public function post(\Canopy\Request $request)
    {
        $r = new Resource;
        try {
            $r->loadPostByType($request, array('created', 'updated', 'uid'), array('languages', 'music', 'hobbies'));
            $r->created = time();
            $r->updated = time();
        } catch (\Exception $e) {
            throw new \properties\Exception\RoommateSaveFailure($e->getMessage());
        }
        return $r;
    }

    public function put(\Canopy\Request $request, $roommate)
    {
        try {
            $roommate->loadPutByType($request, array('created', 'updated', 'uid'), array('languages', 'music', 'hobbies'));
            $roommate->updated = time();
        } catch (\Exception $e) {
            throw new \properties\Exception\RoommateSaveFailure($e->getMessage());
        }
        return $roommate;
    }
    
    public function save(Resource $roommate)
    {
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
        return ((int)$roommate->uid === (int)$uid && !empty($uid));
    }
    
    public function view($id, $contact_allowed)
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
        
        $template = new \phpws2\Template($tpl);
        $template->setModuleTemplate('properties', 'roommate/view.html');
        return $template->get();
    }

}
