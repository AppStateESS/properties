<?php

namespace properties\Factory;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of View
 *
 * @author Matthew McNaney <mcnaneym@appstate.edu>
 */
class View
{

    public static function navbar()
    {
        $auth = \Current_User::getAuthorization();

        $vars['is_deity'] = \Current_User::isDeity();
        $vars['logout_uri'] = $auth->logout_link;
        $vars['username'] = \Current_User::getDisplayName();
        $vars['home'] = \Server::getSiteUrl();
        $template = new \phpws2\Template($vars);
        $template->setModuleTemplate('properties', 'navbar.html');
        $content = $template->get();

        \Layout::plug($content, 'NAV_LINKS');
    }

}
