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

use properties\Exception\BadCommand;
use \phpws2\Database;

abstract class SubController extends Base
{

    protected $factory;
    protected $role;
    protected $id;

    abstract protected function loadFactory();

    public function __construct($role)
    {
        $this->factory = $this->loadFactory();
        $this->role = $role;
    }

    protected function pullGetCommand(\Request $request)
    {
        $command = $request->shiftCommand();
        if (is_numeric($command)) {
            $this->id = $command;

            $subcommand = $request->shiftCommand();
            if (empty($subcommand)) {
                $command = 'view';
            } else {
                return $subcommand;
            }
        } else if (empty($command)) {
            $command = 'list';
        }
        return $command;
    }

    public function post(\Request $request)
    {
        $command = $request->shiftCommand();

        if (empty($command)) {
            $command = 'save';
        }

        $method_name = $command . 'PostCommand';
        if (!method_exists($this, $method_name)) {
            throw new BadCommand($method_name);
        }

        $content = $this->$method_name($request);

        if ($request->isAjax()) {
            return $this->jsonResponse($content);
        } else {
            return $this->htmlResponse($content);
        }
    }

    public function put(\Request $request)
    {
        $command = $request->shiftCommand();

        if (is_numeric($command)) {
            $this->id = $command;
            $command = $request->shiftCommand();
        }

        if (empty($command)) {
            $command = 'update';
        }

        $method_name = $command . 'PutCommand';
        if (!method_exists($this, $method_name)) {
            throw new BadCommand($method_name);
        }

        $content = $this->$method_name($request);

        if ($request->isAjax()) {
            return $this->jsonResponse($content);
        } else {
            return $this->htmlResponse($content);
        }
    }

    public function getHtml(\Request $request)
    {
        $command = $this->pullGetCommand($request);

        if (empty($command)) {
            $command = 'list';
        }

        $method_name = $command . 'HtmlCommand';
        if (!method_exists($this, $method_name)) {
            if (!method_exists($this, 'viewHtmlCommand')) {
                throw new BadCommand($method_name);
            } else {
                $method_name = 'viewHtmlCommand';
            }
        }

        $content = $this->$method_name($request);

        return $this->htmlResponse($content);
    }

    public function getJson(\Request $request)
    {
        $command = $this->pullGetCommand($request);

        if (empty($command)) {
            throw new BadCommand;
        }

        $method_name = $command . 'JsonCommand';

        if (!method_exists($this, $method_name)) {
            throw new BadCommand($method_name);
        }

        $json = $this->$method_name($request);
        return $this->jsonResponse($json);
    }

    public function patch(\Request $request)
    {
        $id = $request->shiftCommand();

        if (empty($id)) {
            throw new BadCommand;
        }
        $this->id = $id;

        if (!method_exists($this, 'patchCommand')) {
            throw new BadCommand($patchCommand);
        }

        $json = $this->patchCommand($request);
        return $this->jsonResponse($json);
    }

    public function delete(\Request $request)
    {
        $id = $request->shiftCommand();

        if (!is_numeric($id)) {
            throw new BadCommand;
        }
        $this->id = $id;

        if (!method_exists($this, 'deleteCommand')) {
            throw new BadCommand('deleteCommand');
        }

        $content = $this->deleteCommand($request);

        return $this->jsonResponse($content);
    }

    public function getResponse($content, \Request $request)
    {
        return $request->isAjax() ? $this->jsonResponse($content) : $this->htmlResponse($content);
    }

    public function htmlResponse($content)
    {
        $view = new \phpws2\View\HtmlView($content);
        $response = new \Response($view);
        return $response;
    }

    public function jsonResponse($json)
    {
        $view = new \phpws2\View\JsonView($json);
        $response = new \Response($view);
        return $response;
    }

    protected function managerButtons()
    {
        $myprops = '<a class="btn" href="./properties/Manager/desktop">View my properties</a>';
        \properties\Factory\NavBar::addOption($myprops);

        $editInfo = '<a href="./properties/Manager/edit">Edit account</a>';
        \properties\Factory\NavBar::addOption($editInfo);

        $signout = '<a href="./properties/Manager/signout">Sign out</a>';
        \properties\Factory\NavBar::addOption($signout);
    }
    
    protected function addApprovalLink()
    {
        $needApproval = $this->needApproval();
        if ($needApproval == 0) {
            return;
        }
        $label = ($needApproval == 1) ? "$needApproval manager needs approval" : "$needApproval managers need approval";
        $link = "<button onClick=\"window.location.href='./properties/ManagerApproval'\" class=\"btn btn-default navbar-btn\">$label</button>";
        NavBar::addItem($link);
    }
    
    private function needApproval()
    {
        $db = Database::getDB();
        $tbl = $db->addTable('prop_contacts');
        $tbl->addFieldConditional('approved', 0);
        $tbl->addField('id')->showCount();
        return $db->selectColumn();
    }

}
