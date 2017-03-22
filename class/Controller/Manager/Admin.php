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

use \Canopy\Request;

class Admin extends User
{

    protected function createPostCommand(Request $request)
    {
        return $this->factory->adminPost($request);
    }

    /**
     * @param Request $request
     * @return string
     */
    protected function viewHtmlCommand(Request $request)
    {
        return $this->factory->view($this->id, false);
    }

    protected function listJsonCommand(Request $request)
    {
        $json['admin'] = true;
        $json['managerList'] = $this->factory->listAll($request->pullGetVarIfSet('limit',
                        true), $request->pullGetString('search', true), false);
        return $json;
    }

    public function getHtml(Request $request)
    {
        $this->addApprovalLink();
        return parent::getHtml($request);
    }

    protected function savePostCommand(Request $request)
    {
        $json = $this->factory->adminPost($request, $this->id);
        return $json;
    }

    protected function deleteCommand(Request $request)
    {
        $json['success'] = $this->factory->delete($this->id);
        return $json;
    }

    protected function approvalHtmlCommand(Request $request)
    {
        return $this->factory->reactView('managerapproval');
    }

    protected function approvalJsonCommand(Request $request)
    {
        $json['admin'] = 1;
        $json['managerList'] = $this->factory->unapprovedListing($request->pullGetVarIfSet('limit',
                        true), $request->pullGetString('search', true));
        $json['email_warning'] = empty(\phpws2\Settings::get('properties', 'site_email'));
        return $json;
    }

    protected function inquiryPutCommand(Request $request)
    {
        $manager = $this->factory->load($request->pullPutInteger('managerId'));
        $this->factory->inquiry($manager, $request->pullPutString('inquiryType'));
    }

    protected function refusePutCommand(Request $request)
    {
        $manager = $this->factory->load($request->pullPutInteger('managerId'));
        $this->factory->refuse($manager, $request->pullPutString('reason'));
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

    protected function viewJsonCommand(Request $request)
    {
        $manager = $this->factory->load($this->id);
        $json = $manager->view(false);
        return $json;
    }

    protected function signinHtmlCommand(\Canopy\Request $request)
    {
        return '<p>Logout of your administrator account to sign in as a manager</p>';
    }

}
