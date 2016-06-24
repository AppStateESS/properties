<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace properties\Controller;

use properties\Factory\SettingsFactory as Factory;

/**
 * Description of Settings
 *
 * @author Matthew McNaney <mcnaneym@appstate.edu>
 */
class SettingsController extends BaseController
{

    public function __construct($module)
    {
        parent::__construct($module);
        $this->adminPermissions = array('edit', 'save');
    }

    public function getHtmlView($data, \Request $request)
    {
        $content = self::settingsForm();
        $view = new \phpws2\View\HtmlView($content);
        return $view;
    }

    private function settingsForm()
    {
        $template = new \phpws2\Template();
        $template->setModuleTemplate('properties', 'settings.html');
        return $template->get();
    }

}
