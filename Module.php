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

use properties\Factory\NavBar;

require_once PHPWS_SOURCE_DIR . 'src/Module.php';
require_once PHPWS_SOURCE_DIR . 'mod/properties/conf/system_defines.php';
require_once PHPWS_SOURCE_DIR . 'mod/properties/conf/defines.php';

class Module extends \Canopy\Module implements \Canopy\SettingDefaults
{

    public function __construct()
    {
        parent::__construct();
        $this->setTitle('properties');
        $this->setProperName('Properties');
        spl_autoload_register('\properties\Module::autoloader', true, true);
    }

    public function getSettingDefaults()
    {
        $settings['approval_email'] = '';
        $settings['our_email'] = '';
        $settings['our_phone'] = null;
        $settings['our_name'] = null;
        return $settings;
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

    public function afterRun(\Canopy\Request $request,
            \Canopy\Response $response)
    {
        if ($request->isGet() && !$request->isAjax()) {
            \properties\Factory\NavBar::view($request);
        }
    }

    public function runTime(\Canopy\Request $request)
    {
        if ($request->isGet() && !$request->isAjax()) {
            if (\phpws\PHPWS_Core::atHome()) {
                \Layout::add($this->home());
            }
            if (!preg_match('/^properties/', \Canopy\Server::getCurrentUrl())) {
                if (!\Current_User::isLogged()) {
                    $auth = \Current_User::getAuthorization();
                    if (!empty($auth->login_link)) {
                        $url = $auth->login_link;
                    } else {
                        $url = 'index.php?module=users&action=user&command=login_page';
                    }
                    NavBar::addItem("<a href='$url'>Sign in</a>");
                }
                \properties\Factory\NavBar::view($request);
            }
        }
    }

    public static function autoloader($class_name)
    {
        static $not_found = array();

        if (strpos($class_name, 'properties') !== 0) {
            return;
        }

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
