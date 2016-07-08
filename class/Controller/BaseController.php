<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace properties\Controller;

/**
 * Description of BaseController
 *
 * @author Matthew McNaney <mcnaneym@appstate.edu>
 */
abstract class BaseController extends \phpws2\Http\Controller
{

    /**
     * @var array
     */
    protected $adminPermissions;

    /**
     * @var array
     */
    protected $managerPermissions;

    /**
     * @var array
     */
    protected $userPermissions;

    public function __construct($module)
    {
        parent::__construct($module);
        $this->adminPermissions = array();
        $this->managerPermissions = array();
        $this->userPermissions = array();
    }

    public function get(\Request $request)
    {
        $data = array();
        $view = $this->getView($data, $request);
        $response = new \Response($view);
        return $response;
    }

    protected function allow($command, \Request $request)
    {
        $session = \phpws2\Session::getInstance();

        if (\Current_User::allow('properties') && in_array($command,
                        $this->adminPermissions)) {
            return true;
        }

        if (in_array($command, $this->userPermissions)) {
            return true;
        }

        if (in_array($command, $this->managerPermissions) && isset($session->currentManagerId) && 
                $session->currentManagerId === $request->getVar('managerId')) {
            return true;
        }

        return false;
    }

    protected function checkCommand($request, $defaultCommand = null)
    {
        $command = $request->shiftCommand();
        if (empty($command)) {
            $command = $defaultCommand;
        }

        if (!$this->allow($command, $request)) {
            throw new \Exception("'$command' not recognized");
        }
        return $command;
    }

}
