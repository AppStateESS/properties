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

use properties\Factory\ManagerSignupFactory as Factory;

class ManagerSignupController extends BaseController
{

    public function __construct($module)
    {
        parent::__construct($module);
        $this->factory = new Factory();
    }

    public function getHtmlView($data, \Request $request)
    {
        try {
            $command = $this->checkCommand($request, 'signup');
        } catch (\properties\Exception\ResourceNotFound $e) {
            return $this->errorPage($e);
        } catch (\properties\Exception\BadCommand $e) {
            return $this->errorPage($e);
        }

        \Layout::addStyle('properties');
        switch ($command) {
            case 'signup':
                $content = $this->reactView('managersignup');
                break;
            
            case 'success':
                $content = $this->success();
                break;
            
            case 'error':
                $content = '';

            default:
                throw new \properties\Exception\BadCommand;
        }
        $view = new \phpws2\View\HtmlView($content);
        return $view;
    }

    public function post(\Request $request)
    {
        if (!$this->factory->role->allow('signup')) {
            throw new \properties\Exception\PrivilegeMissing;
        }
        $json = $this->factory->signup($request);
        $view = new \View\JsonView($json);
        $response = new \Response($view);
        return $response;
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
            case 'checkUsername':
                $json = array('duplicate' => $this->factory->checkUsername($request->pullGetString('username',
                                    true), $request->pullGetInteger('id', true)));
                break;

            case 'checkEmail':
                $json = array('duplicate' => $this->factory->checkEmail($request->pullGetString('email',
                                    true), $request->pullGetInteger('id', true)));
                break;

            case 'checkCompanyName':
                $json = array('duplicate' => $this->factory->checkCompanyName($request->pullGetString('company_name',
                                    true), $request->pullGetInteger('id', true)));
                break;
        }
        $view = new \View\JsonView($json);
        return $view;
    }
    
    public function success()
    {
        $template = new \phpws2\Template();
        $template->setModuleTemplate('properties', 'manager/success_signup.html');
        return $template->get();
    }

}
