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

    protected function createPostCommand(\Request $request)
    {
        return $this->factory->adminPost($request);
    }

    /**
     * @param \Request $request
     * @return string
     */
    protected function viewHtmlCommand(\Request $request)
    {
        return $this->factory->view($this->id, false);
    }

    protected function listJsonCommand(\Request $request)
    {
        $json['admin'] = true;
        $json['managerList'] = $this->factory->approvedListing($request->pullGetVarIfSet('limit',
                        true), $request->pullGetString('search', true), false);
        return $json;
    }

    public function getHtml(\Request $request)
    {
        $this->addApprovalLink();
        return parent::getHtml($request);
    }

    public function savePostCommand(\Request $request)
    {
        $json = $this->factory->adminPost($request);
        return $json;
    }
}
