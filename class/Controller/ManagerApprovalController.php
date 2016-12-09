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
use properties\Factory\NavBar;

class ManagerApprovalController extends BaseController
{

    public function __construct($module)
    {
        parent::__construct($module);
        $this->factory = new Factory('managerapproval');
    }

    public function getHtmlView($data, \Request $request)
    {
        try {
            $command = $this->checkCommand($request, 'list');
        } catch (\properties\Exception\ResourceNotFound $e) {
            return $this->errorPage($e);
        } catch (\properties\Exception\BadCommand $e) {
            return $this->errorPage($e);
        }

        \Layout::addStyle('properties');
        switch ($command) {
            case 'list':
                $content = $this->reactView('managerapproval');
                break;

            default:
                throw new \properties\Exception\BadCommand;
        }
        $view = new \phpws2\View\HtmlView($content);
        return $view;
    }

    public function getJsonView($data, \Request $request)
    {
        $command = $this->checkCommand($request, 'list');
        if (is_numeric($command)) {
            $managerId = (int) $command;
            $command = 'view';
        } else {
            $managerId = $request->pullGetInteger('managerId', true);
        }

        switch ($command) {
            case 'list':
                $json = array();
                $json['admin'] = $this->factory->role->isAdmin();
                $json['managerList'] = $this->factory->unapprovedListing($request->pullGetVarIfSet('limit',
                                true), $request->pullGetString('search', true));
                return new \View\JsonView($json);
                break;

            case 'view':
                $manager = $this->factory->load($managerId);
                $json = $manager->getStringVars(null, 'password');
                break;
        }
        $view = new \View\JsonView($json);
        return $view;
    }

}
