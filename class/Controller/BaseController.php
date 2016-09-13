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
     * Array of permissions allowed for only administrators
     * Inherits all manager permissions
     * @var array
     */
    protected $adminPermissions;

    /**
     * Array of permissions allowed only for managers
     * Inherits all user permissions
     * @var array
     */
    protected $managerPermissions;

    /**
     * Array of permissions allowed for standard user
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
        try {
            $data = array();
            $view = $this->getView($data, $request);
        } catch (\properties\Exception\PrivilegeMissing $e) {
            $view = $this->errorPage($e);
        }
        $response = new \Response($view);
        return $response;
    }

    protected function errorPage(\Exception $e)
    {
        $content = $e->getMessage();
        $template = new \phpws2\Template(array('message'=>$e->getMessage()));
        $template->setModuleTemplate('properties', 'error.html');
        $view = new \phpws2\View\HtmlView($template->get());
        return $view;
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
