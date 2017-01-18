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

    protected function viewHtmlCommand(\Request $request)
    {
        \Layout::addStyle('properties', 'property/view.css');
        return $this->factory->view($this->id, true);
    }

    protected function editHtmlCommand(\Request $request)
    {
        \Layout::addStyle('properties', 'property/form.css');
        return $this->factory->edit($this->id);
    }

    protected function savePostCommand(\Request $request)
    {
        try {
            return $this->factory->post($request);
        } catch (\properties\Exception\PropertySaveFailure $e) {
            return array('error' => $e->getMessage());
        }
    }

    protected function updatePutCommand(\Request $request)
    {
        try {
            return $this->factory->put($request);
        } catch (\properties\Exception\PropertySaveFailure $e) {
            return array('error' => $e->getMessage());
        }
    }

    public function getHtml(\Request $request)
    {
        $this->addApprovalLink();
        return parent::getHtml($request);
    }

}
