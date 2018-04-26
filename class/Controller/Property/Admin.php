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
use Canopy\Request;
use properties\Factory\NavBar;

class Admin extends User
{

    protected function viewHtmlCommand(Request $request)
    {
        \Layout::addToStyleList('mod/properties/css/property/view.css');
        return $this->factory->view($this->id, true);
    }

    protected function editHtmlCommand(Request $request)
    {
        $back = <<<EOF
<a class="nav-link" href="properties/Property/{$this->id}"><i class="fa fa-undo"></i>&nbsp;Back to view</a>
EOF;
        Navbar::addItem($back);
        \Layout::addStyle('properties', 'property/form.css');
        return $this->factory->edit($this->id);
    }

    protected function createHtmlCommand(Request $request)
    {
        \Layout::addStyle('properties', 'property/form.css');
        return $this->factory->edit(0, $request->pullGetInteger('managerId'));
    }

    protected function savePostCommand(Request $request)
    {
        try {
            $property = $this->factory->post($request);
            return array('id' => $this->factory->save($property));
        } catch (\properties\Exception\PropertySaveFailure $e) {
            return array('error' => $e->getMessage());
        }
    }

    protected function updatePutCommand(Request $request)
    {
        try {
            return $this->factory->put($request);
        } catch (\properties\Exception\PropertySaveFailure $e) {
            return array('error' => $e->getMessage());
        }
    }

    protected function listJsonCommand(Request $request)
    {
        return $this->getPropertyRows($request, true);
    }

    protected function deleteCommand(Request $request)
    {
        $property = $this->factory->load($this->id);
        $this->factory->delete($property);
        return array('success' => true);
    }

    public function getHtml(Request $request)
    {
        $this->adminButtons();
        return parent::getHtml($request);
    }

    protected function jsonPatchCommand(Request $request)
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
