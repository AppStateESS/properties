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
        $button = $this->createButton();
        \properties\Factory\NavBar::addItem($button);
        return 'hi';
    }

    protected function listHtmlCommand(\Canopy\Request $request)
    {
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

    private function createButton()
    {
        return '<button class="btn btn-primary btn-sm navbar-btn" onClick="window.location.href=\'./properties/Roommate/create\'"><i class="fa fa-bullhorn"></i>&nbsp;Add Roommate request</button>';
    }

}
