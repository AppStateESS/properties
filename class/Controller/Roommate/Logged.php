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

class Logged extends User
{

    protected function getUserRoommate()
    {
        $roommate = $this->factory->getUserRoommate($this->role->getId());
        return $roommate;
    }

    protected function listHtmlCommand(\Canopy\Request $request)
    {
        $roommate = $this->getUserRoommate();
        if ($roommate) {
            $button = $this->updateButton();
        } else {
            $button = $this->createButton();
        }
        \properties\Factory\NavBar::addItem($button);

        return $this->factory->reactView('roommatelist');
    }

    protected function listJsonCommand(\Canopy\Request $request)
    {
        $json['roommates'] = $this->factory->listing($request, true);
        return $json;
    }

    protected function selfJsonCommand()
    {
        $roommate = $this->factory->getUserRoommate($this->role->getId());
        if (empty($roommate)) {
            return array('roommate' => null);
        } else {
            $json['roommate'] = $roommate->view(false);
            return $json;
        }
    }

    protected function viewHtmlCommand(\Canopy\Request $request)
    {
        $roommate = $this->getUserRoommate();
        if ($roommate) {
            $button = $this->updateButton();
        } else {
            $button = $this->createButton();
        }
        \properties\Factory\NavBar::addItem($button);
        return $this->factory->view($this->id, true);
    }

    protected function editHtmlCommand(\Canopy\Request $request)
    {
        $this->showRoommateViewLink();
        \Layout::addStyle('properties', 'roommate/form.css');
        return $this->factory->reactView('roommateform');
    }

    protected function createHtmlCommand(\Canopy\Request $request)
    {
        $this->showRoommateViewLink();
        \Layout::addStyle('properties', 'roommate/form.css');
        return $this->factory->reactView('roommateform');
    }

    private function showRoommateViewLink()
    {
        $roommate = $this->factory->getUserRoommate($this->role->getId());
        if ($roommate) {
            $rm_id = $roommate->getId();
            $link = "<button onClick='location.href=\"./properties/Roommate/$rm_id\"' class='btn btn-default navbar-btn btn-sm'><i class='fa fa-undo'></i>&nbsp;Back to my listing</button>";
            \properties\Factory\NavBar::addItem($link);
        }
    }

    protected function savePostCommand(\Canopy\Request $request)
    {
        try {
            $roommate = $this->factory->post($request);
            $roommate->uid = $this->role->getId();
            return array('id' => $this->factory->save($roommate));
        } catch (\properties\Exception\RoommateSaveFailure $e) {
            return array('error' => $e->getMessage());
        }
    }

    protected function updatePutCommand(\Canopy\Request $request)
    {
        $roommate = $this->factory->load($request->pullPutInteger('id'));
        if (!$this->factory->isOwner($roommate, $this->role->getId())) {
            return array('error' => 'You do not own this roommate record');
        }
        try {
            $roommate = $this->factory->put($request, $roommate);
            return array('id' => $this->factory->save($roommate));
        } catch (\properties\Exception\RoommateSaveFailure $e) {
            return array('error' => $e->getMessage());
        }
    }

    private function updateButton()
    {
        return '<button class="btn btn-primary btn-sm navbar-btn" onClick="window.location.href=\'./properties/Roommate/edit\'"><i class="fa fa-bullhorn"></i>&nbsp;Update my roommate request</button>';
    }

}
