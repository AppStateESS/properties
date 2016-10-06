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

namespace properties\Role;

abstract class BaseRole
{

    protected $getCommands = false;
    protected $postCommands = false;
    protected $putCommands = false;
    protected $patchCommands = false;
    protected $deleteCommands = false;
    protected $method;
    protected $controller;

    public function __construct($controller = null, $method = null)
    {
        $this->setMethod($method);
        $this->setController($controller);
    }

    public function isAdmin()
    {
        return false;
    }

    public function isManager()
    {
        return false;
    }

    public function isUser()
    {
        return false;
    }

    public function isLogged()
    {
        return false;
    }

    public function allow($command = null, $method = null)
    {
        if ($method === null) {
            $method = $this->method;
        }
        switch (strtoupper($method)) {
            case 'GET':
                return $this->allowGet($command);

            case 'POST':
                return $this->allowPost($command);

            case 'PATCH':
                return $this->allowPatch($command);

            case 'PUT':
                return $this->allowPut($command);

            case 'DELETE':
                return $this->allowDelete($command);

            default:
                throw new \Exception('Method not set');
        }
    }

    public function setMethod($method)
    {
        $this->method = $method;
    }

    public function setController($controller)
    {
        $this->controller = $controller;
    }

    protected function allowGet($command)
    {
        if ($command === null) {
            return $this->getCommands === true;
        }
        return $this->check($command, $this->getCommands);
    }

    protected function allowPost($command)
    {
        if ($command === null) {
            return $this->postCommands === true;
        }
        return $this->check($command, $this->postCommands);
    }

    protected function allowPatch($command)
    {
        if ($command === null) {
            return $this->patchCommands === true;
        }
        return $this->check($command, $this->patchCommands);
    }

    protected function allowDelete($command)
    {
        if ($command === null) {
            return $this->deleteCommands === true;
        }
        return $this->check($command, $this->deleteCommands);
    }

    private function check($command, $command_list)
    {
        if (!is_array($command_list)) {
            if ($command_list === true || $command_list === false) {
                return $command_list;
            } else {
                throw new \Exception('Expected boolean value');
            }
        } else {
            if (empty($this->controller)) {
                throw new \Exception('Role controller not set');
            } else if (!isset($command_list[$this->controller])) {
                return false;
            }
            return in_array($command, $command_list[$this->controller]);
        }
    }

    protected function setGet($controller, array $commands)
    {
        $this->getCommands[$controller] = $commands;
    }

    protected function setPost($controller, array $commands)
    {
        $this->postCommands[$controller] = $commands;
    }

    protected function setPatch($controller, array $commands)
    {
        $this->patchCommands[$controller] = $commands;
    }

    protected function setDelete($controller, array $commands)
    {
        $this->deleteCommands[$controller] = $commands;
    }

    protected function setPut($controller, array $commands)
    {
        $this->putCommands[$controller] = $commands;
    }

}
