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

namespace properties\Controller\Sublease;

use properties\Factory\NavBar;

class Logged extends User
{

    protected $user_sublease;

    public function __construct($role)
    {
        parent::__construct($role);
        $this->loadUserSublease();
    }

    protected function loadUserSublease()
    {
        $this->user_sublease = $this->factory->getSubleaseByUser($this->role->getId());
    }

    /**
     * @param \Canopy\Request $request
     */
    public function createHtmlCommand(\Canopy\Request $request)
    {
        
        $this->ownerOptions(false, false);
        if ($this->user_sublease) {
            $sublease = $this->user_sublease;
        } else {
            $sublease = $this->factory->build();
            $sublease->user_id = \Current_User::getId();
        }
        return $this->factory->edit($sublease);
    }

    /**
     * @param \Canopy\Request $request
     */
    public function editHtmlCommand(\Canopy\Request $request)
    {
        $this->ownerOptions(false, false);
        return $this->factory->edit($this->user_sublease, \Current_User::getId());
    }

    public function getHtml(\Canopy\Request $request)
    {
        $this->backToList();
        return parent::getHtml($request);
    }
    
    public function listHtmlCommand(\Canopy\Request $request)
    {
        $this->ownerOptions();

        \Layout::addStyle('properties', 'sublease/list.css');
        return $this->factory->reactView('sublease');
    }

    public function ownerJsonCommand()
    {
        if (empty($this->user_sublease)) {
            $json['sublease'] = null;
        } else {
            $json['sublease'] = $this->user_sublease->getVariablesAsValue(true);
        }
        $json['email'] = \Current_User::getEmail();
        return $json;
    }

    public function savePostCommand(\Canopy\Request $request)
    {
        try {
            return $this->factory->post($request, $this->role->getId());
        } catch (\properties\Exception\PropertySaveFailure $e) {
            return array('error' => $e->getMessage());
        }
    }

    public function updatePutCommand(\Canopy\Request $request)
    {
        try {
            return $this->factory->put($request, $this->user_sublease);
        } catch (\properties\Exception\PropertySaveFailure $e) {
            return array('error' => $e->getMessage());
        }
    }

    public function viewHtmlCommand(\Canopy\Request $request)
    {
        $this->ownerOptions(true);
        \Layout::addStyle('properties', 'sublease/view.css');
        return $this->factory->view($this->id,
                        $this->factory->loggedIsOwner($this->id,
                                $this->role->getId()));
    }

    protected function jsonPatchCommand(\Canopy\Request $request)
    {
        return array('success' => $this->factory->patch($this->user_sublease,
                    $request->pullPatchString('varname'),
                    $request->pullPatchBoolean('value')));
    }

    public function ownerOptions($photo = false, $show_create = true)
    {
        if ($this->user_sublease) {
            NavBar::setTitle('My Sublease');
            NavBar::addOption('<a href="./properties/Sublease/' . $this->user_sublease->getId() . '"><i class="fa fa-building-o"></i>&nbsp;View my sublease</a>');
            NavBar::addOption('<a href="./properties/Sublease/edit"><i class="fa fa-edit"></i>&nbsp;Update my sublease</a>');
            if ($photo) {
                NavBar::addOption('<a onClick="editPhotos.callback()" class="pointer"><i class="fa fa-camera"></i>&nbsp;Edit photos</a>');
            }
        } elseif ($show_create) {
            $this->createButton();
        }
    }

}
