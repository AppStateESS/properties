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

use properties\Resource\Sublease as Resource;

class User extends \properties\Controller\SubController
{

    /**
     * @var \properties\Factory\Sublease
     */
    protected $factory;

    public function loadFactory()
    {
        $factory = new \properties\Factory\Sublease;
        return $factory;
    }

    /**
     * @param \Canopy\Request $request
     */
    public function createHtmlCommand(\Canopy\Request $request)
    {
        \Current_User::requireLogin();
    }

    public function listHtmlCommand(\Canopy\Request $request)
    {
        $this->updateTimeouts();
        $this->createButton();

        \Layout::addToStyleList('mod/properties/css/sublease/list.css');
        return $this->factory->reactView('sublease');
    }

    public function listJsonCommand(\Canopy\Request $request)
    {
        return $this->getSubleaseRows($request);
    }

    protected function getSubleaseRows($request, $admin=false)
    {
        $json['active_button'] = $admin;
        $json['subleases'] = $this->factory->listing($request, $admin);
        $json['more_rows'] = $this->factory->more_rows;
        return $json;
    }
    
    public function viewHtmlCommand(\Canopy\Request $request)
    {
        \Layout::addStyle('properties', 'sublease/view.css');
        return $this->factory->view($this->id);
    }

    protected function createButton()
    {
        $button = <<<EOF
<button onClick="window.location.href='properties/Sublease/create'" class="btn btn-outline-secondary"><i class="fa fa-plus"></i>&nbsp;Create my sublease</button>
EOF;
        \properties\Factory\NavBar::addItem($button);
    }

    protected function backToList()
    {
        if (isset($_SERVER['HTTP_REFERER']) && stristr($_SERVER['HTTP_REFERER'],
                        'properties/Sublease/list')) {
            \properties\Factory\NavBar::addItem('<button class="btn btn-outline-secondary navbar-btn mr-1" onClick="window.history.back()"><i class="fa fa-list"></i>&nbsp;Back to list</button>');
        }
    }

    protected function updateTimeouts()
    {
        if ($this->factory->subleaseTimeoutPast()) {
            $this->factory->flipSubleaseTimeout();
            $this->factory->updateSubleaseTimeout();
        }
    }

}
