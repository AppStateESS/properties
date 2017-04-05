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

class Admin extends User
{

    protected function viewHtmlCommand(\Canopy\Request $request)
    {
        \Layout::addStyle('properties', 'property/view.css');
        return $this->factory->view($this->id, true);
    }

    protected function editHtmlCommand(\Canopy\Request $request)
    {
        \Layout::addStyle('properties', 'property/form.css');
        return $this->factory->edit($this->id);
    }

    protected function createHtmlCommand(\Canopy\Request $request)
    {
        \Layout::addStyle('properties', 'property/form.css');
        return $this->factory->edit(0, $request->pullGetInteger('managerId'));
    }

    protected function savePostCommand(\Canopy\Request $request)
    {
        try {
            $property = $this->factory->post($request);
            return array('id' => $this->factory->save($property));
        } catch (\properties\Exception\PropertySaveFailure $e) {
            return array('error' => $e->getMessage());
        }
    }

    protected function updatePutCommand(\Canopy\Request $request)
    {
        try {
            return $this->factory->put($request);
        } catch (\properties\Exception\PropertySaveFailure $e) {
            return array('error' => $e->getMessage());
        }
    }

    protected function listJsonCommand(\Canopy\Request $request)
    {
        $json['properties'] = $this->factory->listing($request, true, true);
        $json['more_rows'] = $this->factory->more_rows;
        $manager_id = $request->pullGetInteger('managerId', true);
        $json['active_button'] = true;
        if ($manager_id) {
            $mngFactory = new \properties\Factory\Manager;
            $manager = $mngFactory->load($manager_id);
            $json['manager'] = $manager->view(true);
        }
        return $json;
    }

    protected function deleteCommand(\Canopy\Request $request)
    {
        $property = $this->factory->load($this->id);
        $this->factory->delete($property);
        return array('success' => true);
    }

    public function getHtml(\Canopy\Request $request)
    {
        $this->addApprovalLink();
        return parent::getHtml($request);
    }

    protected function jsonPatchCommand(\Canopy\Request $request)
    {
        if ($request->patchVarIsset('values')) {
            $values = $request->pullPatchVar('values');
            foreach ($values as $arrVal) {
                $this->factory->patch($this->id, $arrVal['varname'],
                        $arrVal['value']);
            }
        } else {
            $this->factory->patch($this->id,
                    $request->pullPatchString('varname'),
                    $request->pullPatchBoolean('value'));
        }
        $json['success'] = true;
        return $json;
    }

}
