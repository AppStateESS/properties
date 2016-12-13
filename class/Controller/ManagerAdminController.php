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

namespace properties\Controller;

use properties\Factory\ManagerFactory as Factory;

class ManagerAdminController extends BaseController
{

    public function __construct($module)
    {
        parent::__construct($module);
        $this->factory = new Factory('manageradmin');
    }

    public function delete(\Request $request)
    {
        if (!$this->factory->role->allow()) {
            throw new \properties\Exception\PrivilegeMissing;
        }
        $id = $request->pullGetInteger('managerId');
        if ($id === false) {
            throw new \phpws2\Exception\ValueNotSet('Manager id not set');
        }
        $json = array('success' => $this->factory->delete($id));
        $view = new \View\JsonView($json);
        $response = new \Response($view);
        return $response;
    }

    public function post(\Request $request)
    {
        if (!$this->factory->role->allow()) {
            throw new \properties\Exception\PrivilegeMissing;
        }
        $json = $this->factory->adminPost($request);

        $view = new \View\JsonView($json);
        $response = new \Response($view);
        return $response;
    }

    public function put(\Request $request)
    {
        $command = $this->checkCommand($request);
        switch ($command) {
            case 'refuse':
                $this->factory->refuse($this->resource,
                        $request->pullPutString('reason'));
                break;

            case 'inquiry':
                $this->factory->inquiry($this->resource,
                        $request->pullPutString('inquiryType'));
                break;

            default:
                throw new \properties\Exception\BadCommand;
        }

        $json['success'] = true;
        $view = new \View\JsonView($json);
        $response = new \Response($view);
        return $response;
    }

    public function patch(\Request $request)
    {
        $command = $this->checkCommand($request);
        switch ($command) {
            case 'approve':
                $this->factory->approve($this->resource);
                break;

            default:
                throw new \properties\Exception\BadCommand;
        }
        $json['success'] = true;
        $view = new \View\JsonView($json);
        $response = new \Response($view);
        return $response;
    }

}
