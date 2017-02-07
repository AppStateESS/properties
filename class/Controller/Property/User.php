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

namespace properties\Controller\Property;

use properties\Resource\Property as Resource;

class User extends \properties\Controller\SubController
{
    /**
     * @var \properties\Factory\Property
     */
    protected $factory;
    
    
    public function loadFactory()
    {
        $factory = new \properties\Factory\Property;
        return $factory;
    }

    protected function listHtmlCommand(\Canopy\Request $request)
    {
        \Layout::addStyle('properties', 'property/list.css');
        return $this->factory->reactView('property');
    }

    protected function viewHtmlCommand(\Canopy\Request $request)
    {
        \Layout::addStyle('properties', 'property/view.css');
        return $this->factory->view($this->id, false);
    }

    protected function listJsonCommand(\Canopy\Request $request)
    {
        $json['properties'] = $this->factory->listing($request, true);
        $manager_id = $request->pullGetInteger('managerId', true);
        if ($manager_id) {
            $mngFactory = new \properties\Factory\Manager;
            $manager = $mngFactory->load($manager_id);
            $json['manager'] = $manager->view(true);
        }
        return $json;
    }

}
