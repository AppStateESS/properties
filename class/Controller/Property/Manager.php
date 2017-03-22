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

class Manager extends User
{

    protected function viewHtmlCommand(\Canopy\Request $request)
    {
        $property = $this->factory->load($this->id);
        $admin = $property->contact_id == $this->getCurrentLoggedManager();
        \Layout::addStyle('properties', 'property/view.css');
        return $this->factory->view($property, $admin);
    }

    public function getHtml(\Canopy\Request $request)
    {
        $this->managerButtons();
        return parent::getHtml($request);
    }

    protected function createHtmlCommand(\Canopy\Request $request)
    {
        \Layout::addStyle('properties', 'property/form.css');
        return $this->factory->edit(0, $this->getCurrentLoggedManager());
    }

    protected function editHtmlCommand(\Canopy\Request $request)
    {
        \Layout::addStyle('properties', 'property/form.css');
        return $this->factory->edit($this->id, $this->getCurrentLoggedManager());
    }

    protected function savePostCommand(\Canopy\Request $request)
    {
        try {
            $property = $this->factory->post($request);
            $property->contact_id = $this->getCurrentLoggedManager();
            return array('id' => $this->factory->save($property));
        } catch (\properties\Exception\PropertySaveFailure $e) {
            return array('error' => $e->getMessage());
        }
    }
    
    protected function updatePutCommand(\Canopy\Request $request)
    {
        try {
            return $this->factory->put($request, $this->getCurrentLoggedManager());
        } catch (\properties\Exception\PropertySaveFailure $e) {
            return array('error' => $e->getMessage());
        }
    }

}
