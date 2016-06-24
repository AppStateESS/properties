<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace properties\Controller;

use properties\Factory\ManagerFactory as Factory;

/**
 * Description of Manager
 *
 * @author Matthew McNaney <mcnaneym@appstate.edu>
 */
class ManagerController extends BaseController
{

    public function __construct($module)
    {
        parent::__construct($module);
        $this->adminPermissions = array('adminlist', 'create', 'edit', 'save');
        $this->managerPermissions = array('edit', 'save');
        $this->userPermissions = array('userlist', 'view', 'list');
    }

    public function getHtmlView($data, \Request $request)
    {
        $command = $request->shiftCommand();
        if (empty($command)) {
            $command = 'list';
        }

        if (!$this->allow($command, $request)) {
            throw new \phpws2\Http\NotAcceptableException;
        }

        $factory = new Factory;

        \Layout::addStyle('properties');
        switch ($command) {
            case 'list':
                $content = $factory->listView();
                break;

            case 'create';
                $content = $factory->create();
                break;

            case 'view':
                break;
        }
        $view = new \phpws2\View\HtmlView($content);
        return $view;
    }

    public function getJsonView($data, \Request $request)
    {
        $command = $request->shiftCommand();

        if (empty($command)) {
            $command = 'list';
        }

        if (!$this->allow($command, $request)) {
            throw new \phpws2\Http\NotAcceptableException;
        }

        $factory = new Factory;

        switch ($command) {
            case 'list':
                $json = $factory->listingJson();
                break;
        }
        $view = new \View\JsonView($json);
        return $view;
    }

}
