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

class User extends \properties\Controller\SubController
{

    /**
     * @var \properties\Factory\Roommate
     */
    public $factory;

    public function __construct($role)
    {
        parent::__construct($role);
    }

    public function loadFactory()
    {
        return new \properties\Factory\Roommate;
    }

    protected function viewHtmlCommand(\Canopy\Request $request)
    {
        $this->backToList();
        $button = $this->createButton();
        \properties\Factory\NavBar::addItem($button);
        return $this->factory->view($this->id, false);
    }

    protected function backToList()
    {
        if (isset($_SERVER['HTTP_REFERER']) && stristr($_SERVER['HTTP_REFERER'],
                        'properties/Roommate/list')) {
            \properties\Factory\NavBar::addItem('<button class="btn btn-outline-dark btn-sm navbar-btn mr-1" onClick="window.history.back()"><i class="fa fa-list"></i>&nbsp;Back to list</button>');
        }
    }
    
    protected function listHtmlCommand(\Canopy\Request $request)
    {
        if ($this->factory->roommateTimeoutPast()) {
            $this->factory->flipRoommateTimeout();
            $this->factory->updateRoommateTimeout();
        }

        $button = $this->createButton();
        \properties\Factory\NavBar::addItem($button);

        return $this->factory->reactView('roommatelist');
    }

    protected function listJsonCommand(\Canopy\Request $request)
    {
        $json['roommates'] = $this->factory->listing($request, false);
        return $json;
    }

    protected function createHtmlCommand(\Canopy\Request $request)
    {
        \Current_User::requireLogin();
    }

    protected function editHtmlCommand(\Canopy\Request $request)
    {
        \Current_User::requireLogin();
    }

    protected function createButton()
    {
        return '<button class="btn btn-primary btn-sm navbar-btn" onClick="window.location.href=\'properties/Roommate/create\'"><i class="fa fa-plus"></i>&nbsp;Create roommate request</button>';
    }

}
