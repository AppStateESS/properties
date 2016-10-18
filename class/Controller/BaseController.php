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
    protected $role;

    protected function loadRole($controller, $method)
    {
        if (\Current_User::allow('properties')) {
            $this->role = new \properties\Role\AdminRole($controller, $method);
        } elseif ((bool) isset($_SESSION['Contact_Manager']) && $_SESSION['Contact_Manager']->id) {
            $this->role = new \properties\Role\ManagerRole($controller, $method);
        } elseif (\Current_User::isLogged()) {
            $this->role = new \properties\Role\LoggedRole($controller, $method);
        } else {
            $this->role = new \properties\Role\UserRole($controller, $method);
        }
    }

    public function get(\Request $request)
    {
        $this->loadRole(null, 'GET');
        try {
            $data = array();
            $view = $this->getView($data, $request);
        } catch (\properties\Exception\PrivilegeMissing $e) {
            $view = $this->errorPage($e);
        }
        $response = new \Response($view);
        return $response;
    }
    
    public function execute(\Request $request)
    {
        $this->loadRole(null, $request->getMethod());
        return parent::execute($request);
    }

    protected function errorPage(\Exception $e)
    {
        $content = $e->getMessage();
        $template = new \phpws2\Template(array('message' => $e->getMessage()));
        $template->setModuleTemplate('properties', 'error.html');
        $view = new \phpws2\View\HtmlView($template->get());
        return $view;
    }

    protected function checkCommand($request, $defaultCommand = null)
    {
        $command = $request->shiftCommand();
        if (empty($command)) {
            $command = $defaultCommand;
        }

        if (!empty($command)) {
            // this a view of a specific item
            if (is_numeric($command)) {
                if (!$this->role->allow('view')) {
                    throw new \properties\Exception\PrivilegeMissing;
                } else {
                    return $command;
                }
            } else {
                if (!$this->role->allow($command)) {
                    throw new \properties\Exception\PrivilegeMissing;
                }
            }
        }
        return $command;
    }

    protected function getScript($filename)
    {
        $root_directory = PHPWS_SOURCE_HTTP . 'mod/properties/javascript/';
        if (PROPERTIES_REACT_DEV) {
            $path = "dev/$filename.js";
        } else {
            $path = "build/$filename.js";
        }
        $script = "<script type='text/javascript' src='{$root_directory}$path'></script>";
        return $script;
    }

    protected function reactView($view_name)
    {
        $script[] = $this->getScript('vendor');
        $script[] = $this->getScript($view_name);
        $react = implode("\n", $script);
        $content = <<<EOF
<div id="$view_name"></div>
$react
EOF;
        return $content;
    }

}
