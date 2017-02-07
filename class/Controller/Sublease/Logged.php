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

class Logged extends User
{

    /**
     * @param \Canopy\Request $request
     */
    public function createHtmlCommand(\Canopy\Request $request)
    {
        \Layout::addStyle('properties', 'sublease/form.css');
        return $this->factory->reactView('subleaseform');
    }

    /**
     * @param \Canopy\Request $request
     */
    public function editHtmlCommand(\Canopy\Request $request)
    {
        \Layout::addStyle('properties', 'sublease/form.css');
        return $this->factory->reactView('subleaseform');
    }

    public function listHtmlCommand(\Canopy\Request $request)
    {
        $sublease = $this->factory->getSubleaseByUser($this->role->getId());
        if ($sublease) {
            $this->editButton();
        } else {
            $this->createButton();
        }

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

    private function editButton()
    {
        $button = <<<EOF
<button onClick="window.location.href='./properties/Sublease/edit'" class="btn btn-primary btn-sm navbar-btn">Update my sublease</button>
EOF;
        \properties\Factory\NavBar::addItem($button);
    }

    public function viewHtmlCommand(\Canopy\Request $request)
    {
        if ($this->factory->loggedIsOwner($this->id, $this->role->getId())) {
            $this->editButton();
        }
        \Layout::addStyle('properties', 'sublease/view.css');
        return $this->factory->view($this->id);
    }

}
