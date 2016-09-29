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
        // only admins may 
        $this->adminPermissions = array('adminlist', 'create', 'edit', 'save', 'list', 'post', 'delete', 'patch');
        $this->managerPermissions = array('edit', 'save');
        $this->userPermissions = array('userlist', 'view', 'checkUsername', 'checkEmail', 'checkCompanyName', 'Signin');
        $this->factory = new Factory;
    }

    public function getHtmlView($data, \Request $request)
    {
        $command = $request->shiftCommand();
        if (empty($command)) {
            $command = 'list';
        }

        if (!$this->allow($command, $request)) {
            throw new \properties\Exception\PrivilegeMissing;
        }

        \Layout::addStyle('properties');
        switch ($command) {
            case 'list':
                $content = $this->factory->listView();
                break;

            case 'create':
                $content = $this->factory->create();
                break;

            case 'signin':
                $content = $this->factory->signInForm();

            case 'view':
                $content = 'html view';
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
        } elseif (is_numeric($command)) {
            $managerId = (int)$command;
            $command = 'view';
        } else {
            $managerId = $request->pullGetInteger('managerId', true);
        }

        if (!$this->allow($command, $request)) {
            throw new \properties\Exception\PrivilegeMissing;
        }

        switch ($command) {
            case 'list':
                $result = $this->factory->listingJson($request->pullGetVarIfSet('limit',
                                true), $request->pullGetString('search', true));
                if (empty($result)) {
                    $json = array();
                } else {
                    return new \phpws2\View\HtmlView($result);
                }
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
        if (!$this->allow('delete', $request)) {
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
        if (!$this->allow('post', $request)) {
            throw new \properties\Exception\PrivilegeMissing;
        }
        $json = $this->factory->post($request);
        $view = new \View\JsonView($json);
        $response = new \Response($view);
        return $response;
    }

    public function patch(\Request $request)
    {
        if (!$this->allow('patch', $request)) {
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
