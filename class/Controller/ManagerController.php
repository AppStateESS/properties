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

    protected $factory;

    public function __construct($module)
    {
        parent::__construct($module);
        $this->factory = new Factory();
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
                $content = 'html view';
                break;

            case 'signin':
                $content = $this->signin();
                break;

            default:
                throw new \properties\Exception\BadCommand;
        }
        $view = new \phpws2\View\HtmlView($content);
        return $view;
    }

    private function listing()
    {
        return $this->reactView('manager');
    }

    private function signin()
    {
        $template = new \phpws2\Template;
        $template->setModuleTemplate('properties', 'manager/signin.html');
        return $template->get();
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
                $json['addManager'] = $this->factory->role->allow('post');
                $json['managerList'] = $this->factory->listing($request->pullGetVarIfSet('limit',
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
                $manager = $this->factory->load($managerId);
                $json = $manager->getStringVars(null, 'password');
                break;
        }
        $view = new \View\JsonView($json);
        return $view;
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

    public function patch(\Request $request)
    {
        if (!$this->factory->role->allow()) {
            throw new \properties\Exception\PrivilegeMissing;
        }
        $param = $request->pullPatchString('param');
        $json = array('success' => $this->factory->patch($request->pullPatchInteger('managerId'),
                    $param, $request->pullPatchVar($param)));
        $view = new \View\JsonView($json);
        $response = new \Response($view);
        return $response;
    }

}
