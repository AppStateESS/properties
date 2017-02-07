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

class Admin extends User
{

    protected function createPostCommand(\Canopy\Request $request)
    {
        return $this->factory->adminPost($request);
    }

    /**
     * @param \Canopy\Request $request
     * @return string
     */
    protected function viewHtmlCommand(\Canopy\Request $request)
    {
        return $this->factory->view($this->id, false);
    }

    protected function listJsonCommand(\Canopy\Request $request)
    {
        $json['admin'] = true;
        $json['managerList'] = $this->factory->approvedListing($request->pullGetVarIfSet('limit',
                        true), $request->pullGetString('search', true), false);
        return $json;
    }

    public function getHtml(\Canopy\Request $request)
    {
        $this->addApprovalLink();
        return parent::getHtml($request);
    }

    protected function savePostCommand(\Canopy\Request $request)
    {
        $json = $this->factory->adminPost($request);
        return $json;
    }

    protected function deleteCommand(\Canopy\Request $request)
    {
        $json['success'] = $this->factory->delete($this->id);
        return $json;
    }

    protected function approvalHtmlCommand(\Canopy\Request $request)
    {
        return $this->factory->reactView('managerapproval');
    }

    protected function approvalJsonCommand(\Canopy\Request $request)
    {
        $json['admin'] = 1;
        $json['managerList'] = $this->factory->unapprovedListing($request->pullGetVarIfSet('limit',
                        true), $request->pullGetString('search', true));
        return $json;
    }

    protected function inquiryPutCommand(\Canopy\Request $request)
    {
        $manager = $this->factory->load($request->pullPutInteger('managerId'));
        $this->factory->inquiry($manager, $request->pullPutString('inquiryType'));
    }

    protected function refusePutCommand(\Canopy\Request $request)
    {
        $manager = $this->factory->load($request->pullPutInteger('managerId'));
        $this->factory->refuse($manager, $request->pullPutString('reason'));
    }

    protected function jsonPatchCommand(\Canopy\Request $request)
    {
        $json['success'] = $this->factory->patch($this->id,
                $request->pullPatchString('varname'),
                $request->pullPatchBoolean('value'));
        return $json;
    }

}
