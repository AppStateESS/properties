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
        if ($this->factory->propertyTimeoutPast()) {
            $this->factory->flipPropertyTimeout();
            $this->factory->updatePropertyTimeout();
        }
        \Layout::addToStyleList('mod/properties/css/property/list.css');
        return $this->factory->reactView('property');
    }

    protected function viewHtmlCommand(\Canopy\Request $request)
    {
        \Layout::addToStyleList('mod/properties/css/property/view.css');
        return $this->factory->view($this->id, false);
    }

    protected function listJsonCommand(\Canopy\Request $request)
    {
        return $this->getPropertyRows($request, false);
    }

    protected function getPropertyRows(\Canopy\Request $request, $admin = false)
    {
        $manager_id = $request->pullGetInteger('managerId', true);
        if ($manager_id) {
            try {
                $mngFactory = new \properties\Factory\Manager;
                $manager = $mngFactory->load($manager_id);
                $json['manager'] = $manager->view(true);
            } catch (\properties\Exception\ResourceNotFound $e) {
                $json['manager'] = false;
                $json['properties'] = array();
                $json['more_rows'] = null;
                return $json;
            } catch (\Exception $e) {
                throw $e;
            }
        }
        $json['active_button'] = $admin;
        $json['properties'] = $this->factory->listing($request, true, $admin);
        $json['more_rows'] = $this->factory->more_rows;
        return $json;
    }

}
