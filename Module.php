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
require_once PHPWS_SOURCE_DIR . 'mod/properties/conf/system_defines.php';
require_once PHPWS_SOURCE_DIR . 'mod/properties/conf/defines.php';

class Module extends \Canopy\Module
{

    public function __construct()
    {
        parent::__construct();
        $this->setTitle('properties');
        $this->setProperName('Properties');
        $namespace = __NAMESPACE__;
        spl_autoload_register('\properties\Module::autoloader');
    }

    public function getController(\Canopy\Request $request)
    {
        try {
            $controller = new Controller\Controller($this, $request);
            return $controller;
        } catch (\Exception $e) {
            if (PROPERTIES_FRIENDLY_ERRORS && $request->isGet() && !$request->isAjax()) {
                return $this->friendlyController();
            }
            throw $e;
        }
    }

    private function friendlyController()
    {
        $error_controller = new Controller\FriendlyError($this);
        return $error_controller;
    }

    public function afterRun(\Canopy\Request $request, \Canopy\Response $response)
    {
        if ($request->isGet() && !$request->isAjax()) {
            \properties\Factory\NavBar::view();
        }
    }

    public function runTime(\Canopy\Request $request)
    {
        if (\phpws\PHPWS_Core::atHome()) {
            \Layout::add($this->home());
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

    public function home()
    {
        $template = new \phpws2\Template();
        $template->setModuleTemplate('properties', 'home.html');
        return $template->get();
    }

}
