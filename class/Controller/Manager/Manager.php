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

namespace properties\Controller\Manager;

use properties\Factory\Property\Listing as Listing;

class Manager extends User
{

    protected function signinHtmlCommand(\Canopy\Request $request)
    {
        return \PHPWS_Core::reroute('./properties/Manager/desktop');
    }

    protected function desktopHtmlCommand(\Canopy\Request $request)
    {
        \Layout::addStyle('properties');
        \Layout::addStyle('properties', 'property/list.css');
        return $this->factory->reactView('managerdesktop');
    }

    protected function mylistJsonCommand(\Canopy\Request $request)
    {
        $listing = new Listing;
        $listing->manager_id = $this->getCurrentLoggedManager();
        $json['properties'] = $listing->get(true);
        return $json;
    }

    protected function signoutHtmlCommand()
    {
        $manager_id = $this->factory->getCurrentLoggedManager();
        if (empty($manager_id)) {
            \Server::forward('./');
        }
        $vars['manager_id'] = $manager_id;
        $this->factory->signout();
        $template = new \phpws2\Template($vars);
        $template->setModuleTemplate('properties', 'manager/signout.html');
        return $template->get();
    }

    public function getHtml(\Canopy\Request $request)
    {
        $this->managerButtons();
        return parent::getHtml($request);
    }

}
