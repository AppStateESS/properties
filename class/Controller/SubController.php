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
use properties\Factory\NavBar;
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

    protected function pullGetCommand(\Canopy\Request $request)
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

    public function post(\Canopy\Request $request)
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

    public function put(\Canopy\Request $request)
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

    public function getHtml(\Canopy\Request $request)
    {
        $command = $this->pullGetCommand($request);

        if (empty($command)) {
            $command = 'list';
        }

        $method_name = $command . 'HtmlCommand';
        if (!method_exists($this, $method_name)) {
            if ($this->id && method_exists($this, 'viewHtmlCommand')) {
                $method_name = 'viewHtmlCommand';
            } else {
                throw new BadCommand($method_name);
            }
        }

        $content = $this->$method_name($request);

        return $this->htmlResponse($content);
    }

    public function getJson(\Canopy\Request $request)
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

    public function patch(\Canopy\Request $request)
    {
        $id = $request->shiftCommand();

        if (empty($id)) {
            throw new BadCommand;
        }
        $this->id = $id;

        $patch_command = $request->isAjax() ? 'jsonPatchCommand' : 'htmlPatchCommand';
        
        if (!method_exists($this, $patch_command)) {
            throw new BadCommand($patch_command);
        }

        $json = $this->$patch_command($request);
        return $this->jsonResponse($json);
    }

    public function delete(\Canopy\Request $request)
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

    public function getResponse($content, \Canopy\Request $request)
    {
        return $request->isAjax() ? $this->jsonResponse($content) : $this->htmlResponse($content);
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
        $link = "<button onClick=\"window.location.href='./properties/Manager/approval'\" class=\"btn btn-default navbar-btn\">$label</button>";
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
