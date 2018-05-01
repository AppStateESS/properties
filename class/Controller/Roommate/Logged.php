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

namespace properties\Controller\Roommate;
use Canopy\Request;

class Logged extends User
{

    protected $user_roommate;

    public function __construct($role)
    {
        parent::__construct($role);
        $this->loadUserRoommate();
    }

    protected function loadUserRoommate()
    {
        $this->user_roommate = $this->factory->getRoommateByUser($this->role->getId());
    }

    protected function listHtmlCommand(Request $request)
    {
        $react = null;
        if ($this->user_roommate) {
            \properties\Factory\NavBar::addItem($this->updateButton());
            \properties\Factory\NavBar::addItem($this->deleteButton());
            $react = $this->factory->reactView('roommatedelete');
        } else {
            \properties\Factory\NavBar::addItem($this->createButton());
        }

        return $this->factory->reactView('roommatelist') . $react;
    }

    protected function listJsonCommand(Request $request)
    {
        $json['roommates'] = $this->factory->listing($request, true);
        return $json;
    }

    protected function selfJsonCommand()
    {
        if (empty($this->user_roommate)) {
            return array('roommate' => null);
        } else {
            $json['roommate'] = $this->user_roommate->view(false);
            return $json;
        }
    }

    protected function viewHtmlCommand(Request $request)
    {
        $react = null;
        if ($this->user_roommate) {
            $admin = true;
            \properties\Factory\NavBar::addItem($this->updateButton());
            \properties\Factory\NavBar::addItem($this->deleteButton());
            $react = $this->factory->reactView('roommatedelete');
        } else {
            $admin = false;
            \properties\Factory\NavBar::addItem($this->createButton());
        }
        $this->backToList();
        return $this->factory->view($this->id, true, $admin) . $react;
    }

    protected function editHtmlCommand(Request $request)
    {
        if ($this->checkBan()) {
            return $this->showBan();
        }
        $this->showRoommateViewLink();
        \Layout::addStyle('properties', 'roommate/form.css');
        return $this->factory->reactView('roommateform');
    }

    protected function createHtmlCommand(Request $request)
    {
        if ($this->checkBan()) {
            return $this->showBan();
        }
        $this->showRoommateViewLink();
        \Layout::addStyle('properties', 'roommate/form.css');
        return $this->factory->reactView('roommateform');
    }

    private function showRoommateViewLink()
    {
        if ($this->user_roommate) {
            $rm_id = $this->user_roommate->getId();
            $link = "<button onClick='location.href=\"properties/Roommate/$rm_id\"' class='btn btn-outline-dark navbar-btn btn-sm'><i class='fa fa-undo'></i>&nbsp;Back to view</button>";
            \properties\Factory\NavBar::addItem($link);
        }
    }

    protected function savePostCommand(Request $request)
    {
        try {
            $roommate = $this->factory->post($request);
            $roommate->uid = $this->role->getId();
            return array('id' => $this->factory->save($roommate));
        } catch (\properties\Exception\RoommateSaveFailure $e) {
            return array('error' => $e->getMessage());
        }
    }

    protected function updatePutCommand(Request $request)
    {
        try {
            $roommate = $this->factory->put($request, $this->user_roommate);
            $roommate->active = true;
            return array('id' => $this->factory->save($roommate));
        } catch (\properties\Exception\RoommateSaveFailure $e) {
            return array('error' => $e->getMessage());
        }
    }

    protected function deleteCommand(Request $request)
    {
        return $this->factory->delete($this->user_roommate);
    }

    protected function jsonPatchCommand(Request $request)
    {
        return array('success' => $this->factory->patch($this->user_roommate->id,
                    $request->pullPatchString('varname'),
                    $request->pullPatchBoolean('value')));
    }

    private function updateButton()
    {
        return '<button class="btn btn-outline-dark btn-sm mr-1 navbar-btn" onClick="window.location.href=\'properties/Roommate/edit\'"><i class="fa fa-bullhorn"></i>&nbsp;Update my request</button>';
    }

    private function deleteButton()
    {
        $id = $this->user_roommate->id;
        return <<<EOF
<button class="btn btn-sm btn-outline-danger" data-id="$id" id="delete-roommate"><i class="fa fa-times"></i>&nbsp;Delete my request</button>
EOF;
    }

}
