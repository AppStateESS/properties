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

    public function __construct($role)
    {
        parent::__construct($role);
    }

    /**
     * @param \Canopy\Request $request
     */
    public function createHtmlCommand(\Canopy\Request $request)
    {
        $this->ownerOptions();
        \Layout::addStyle('properties', 'sublease/form.css');
        return $this->factory->reactView('subleaseform');
    }

    /**
     * @param \Canopy\Request $request
     */
    public function editHtmlCommand(\Canopy\Request $request)
    {
        $this->ownerOptions();
        \Layout::addStyle('properties', 'sublease/form.css');
        return $this->factory->reactView('subleaseform');
    }

    public function listHtmlCommand(\Canopy\Request $request)
    {
        $this->ownerOptions();

        \Layout::addStyle('properties', 'sublease/list.css');
        return $this->factory->reactView('sublease');
    }

    public function ownerJsonCommand()
    {
        $sublease = $this->factory->getSubleaseByUser($this->role->getId());
        if (empty($sublease)) {
            $json['sublease'] = null;
        } else {
            $json['sublease'] = $sublease->getVariablesAsValue(true,
                    array('active'));
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
            return $this->factory->put($request, $this->role->getId());
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

    public function ownerOptions($photo=false)
    {
        $sublease = $this->factory->getSubleaseByUser($this->role->getId());
        if ($sublease) {
            NavBar::setTitle('My Sublease');
            NavBar::addOption('<a href="./properties/Sublease/' . $sublease->getId() . '"><i class="fa fa-building-o"></i>&nbsp;View my sublease</a>');
            NavBar::addOption('<a href="./properties/Sublease/edit"><i class="fa fa-edit"></i>&nbsp;Update my sublease</a>');
            if ($photo) {
                NavBar::addOption('<a onClick="editPhotos.callback()" class="pointer"><i class="fa fa-camera"></i>&nbsp;Edit photos</a>');
            }
        } else {
            $this->createButton();
        }
    }

}
