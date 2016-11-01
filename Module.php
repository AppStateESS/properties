<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * @author Matthew McNaney <mcnaneym at appstate dot edu>
 */
namespace properties;

require_once PHPWS_SOURCE_DIR . 'src/Module.php';
require_once PHPWS_SOURCE_DIR . 'mod/properties/conf/defines.php';

class Module extends \Module
{

    public function __construct()
    {
        parent::__construct();
        $this->setTitle('properties');
        $this->setProperName('Counseling Center Check-In');
        $namespace = __NAMESPACE__;
        spl_autoload_register('\properties\Module::autoloader');
    }

    public function getController(\Request $request)
    {
        $command = filter_var($request->shiftCommand(), FILTER_SANITIZE_STRING);
        if (empty($command)) {
            $command = 'Property';
        }
        $class_name = '\properties\Controller\\' . $command . 'Controller';
        if (!class_exists($class_name)) {
            throw new \phpws2\Http\NotAcceptableException;
        }
        $controller = new $class_name($this);
        return $controller;
    }

    public function afterRun(\Request $request, \Response $response)
    {
        \properties\Factory\NavBar::view();
    }
    
    public function runTime(\Request $request)
    {
        if (\phpws\PHPWS_Core::atHome()) {
            \Layout::add($this->home(), 'properties');
        }
    }

    public function autoloader($class_name)
    {
        static $not_found = array();

        if (isset($not_found[$class_name])) {
            return;
        }
        $class_array = explode('\\', $class_name);
        array_shift($class_array);
        $class_dir = implode('/', $class_array);

        $class_path = PHPWS_SOURCE_DIR . 'mod/properties/class/' . $class_dir . '.php';
        if (is_file($class_path)) {
            require_once $class_path;
            return true;
        } else {
            $not_found[] = $class_name;
            return false;
        }
    }

    private function home()
    {
        $template = new \phpws2\Template();
        $template->setModuleTemplate('properties', 'home.html');
        return $template->get();
    }

}
