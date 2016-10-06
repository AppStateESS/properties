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

    private $factory;

    public function __construct($module)
    {
        parent::__construct($module);
        $this->factory = new Factory;
    }

    public function getHtmlView($data, \Request $request)
    {
        $this->role->setController('manager');

        $command = $this->checkCommand($request, 'list');

        if (is_numeric($command) && $this->role->allow('view')) {
            $managerId = (int) $command;
            $command = 'view';
        } else {
            $managerId = $request->pullGetInteger('managerId', true);
        }

        \Layout::addStyle('properties');
        switch ($command) {
            case 'list':
                $content = $this->reactView('manager');
                break;

            case 'view':
                $content = 'html view';
                break;

            default:
                throw new \phpws2\Http\MethodNotAllowedException();
        }
        $view = new \phpws2\View\HtmlView($content);
        return $view;
    }

    public function getJsonView($data, \Request $request)
    {
        $this->role->setController('manager');
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
                $json['addManager'] = $this->role->allow('post');
                $json['managerList'] = $this->factory->listing($this->role,
                        $request->pullGetVarIfSet('limit', true),
                        $request->pullGetString('search', true));
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
        $this->role->setController('manager');
        if (!$this->role->allow()) {
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
        $this->role->setController('manager');
        if (!$this->role->allow()) {
            throw new \properties\Exception\PrivilegeMissing;
        }
        $json = $this->factory->post($request);
        $view = new \View\JsonView($json);
        $response = new \Response($view);
        return $response;
    }

    public function patch(\Request $request)
    {
        $this->role->setController('manager');
        if (!$this->role->allow()) {
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
