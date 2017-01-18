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

class Controller extends Base
{

    protected $role;
    protected $controller;

    public function __construct($module, $request)
    {
        parent::__construct($module);
        $this->loadRole();
        $this->loadController($request, $this->role);
    }

    private function loadController(\Request $request)
    {
        $major_controller = filter_var($request->shiftCommand(),
                FILTER_SANITIZE_STRING);
        
        if (empty($major_controller)) {
            \Server::forward('./properties/Property/list/');
        }

        if (empty($major_controller)) {
            throw new \properties\Exception\BadCommand;
        }

        $role_name = substr(strrchr(get_class($this->role), '\\'), 1);
        $controller_name = '\\properties\\Controller\\' . $major_controller . '\\' . $role_name;
        if (!class_exists($controller_name)) {
            throw new \properties\Exception\BadCommand;
        }
        $this->controller = new $controller_name($this->role);
    }

    protected function loadRole()
    {
        // Zero if not logged in
        $current_manager = $this->getCurrentLoggedManager();

        // Only students will be able to log in. Admins
        // will meet first conditional.
        $current_user = \Current_User::isLogged();

        if (\Current_User::allow('properties')) {
            $this->role = new \properties\Role\Admin($current_user);
        } elseif ($current_manager) {
            $this->role = new \properties\Role\Manager($current_manager);
        } elseif ($current_user) {
            $this->role = new \properties\Role\Logged($current_user);
        } else {
            $this->role = new \properties\Role\User;
        }
    }

    public function post(\Request $request)
    {
        return $this->controller->post($request);
    }

    public function patch(\Request $request)
    {
        return $this->controller->patch($request);
    }

    public function delete(\Request $request)
    {
        return $this->controller->delete($request);
    }

    public function put(\Request $request)
    {
        return $this->controller->put($request);
    }

    public function get(\Request $request)
    {
        return $request->isAjax() ? $this->controller->getJson($request) : $this->controller->getHtml($request);
    }
    
}
