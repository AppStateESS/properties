<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace properties\Controller;

use properties\Factory\ManagerFactory as Factory;
use properties\Factory\NavBar;

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
        $this->factory = new Factory('manager');
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

        if (is_numeric($command) && $this->factory->role->allow('view')) {
            $managerId = (int) $command;
            $command = 'view';
        } else {
            $managerId = $request->pullGetInteger('managerId', true);
        }

        \Layout::addStyle('properties');
        switch ($command) {
            case 'list':
                $content = $this->listing();
                break;

            case 'view':
                $content = 'html view ' . $managerId;
                break;

            default:
                throw new \properties\Exception\BadCommand;
        }
        $view = new \phpws2\View\HtmlView($content);
        return $view;
    }

    private function addApprovalLink()
    {
        $needApproval = $this->factory->needApproval();
        if ($needApproval == 0) {
            return;
        }
        $label = ($needApproval == 1) ? "$needApproval manager needs approval" : "$needApproval managers need approval";
        $link = "<button onClick=\"window.location.href='./properties/ManagerApproval'\" class=\"btn btn-default navbar-btn\">$label</button>";
        NavBar::addItem($link);
    }

    private function listing()
    {
        if ($this->factory->role->isAdmin()) {
            $this->addApprovalLink();
        }
        return $this->reactView('manager');
    }

    public function getJsonView($data, \Request $request)
    {
        $command = $this->checkCommand($request, 'list');

        switch ($command) {
            case 'list':
                $json = array();
                $json['admin'] = $this->factory->role->isAdmin();
                $json['managerList'] = $this->factory->approvedListing($request->pullGetVarIfSet('limit',
                                true), $request->pullGetString('search', true));
                return new \View\JsonView($json);
                break;

            case 'checkUsername':
                $json = array('duplicate' => $this->factory->checkUsername($request->pullGetString('username',
                                    true), $request->pullGetInteger('id', true)));
                break;

            case 'checkEmail':
                $json = array('duplicate' => $this->factory->checkEmail($request->pullGetString('email_address',
                                    true), $request->pullGetInteger('id', true)));
                break;

            case 'checkCompanyName':
                $json = array('duplicate' => $this->factory->checkCompanyName($request->pullGetString('company_name',
                                    true), $request->pullGetInteger('id', true)));
                break;

            case 'view':
                $json = $this->resource->view(true);
                break;

            default:
                throw new \properties\Exception\BadCommand;
        }
        $view = new \View\JsonView($json);
        return $view;
    }

}