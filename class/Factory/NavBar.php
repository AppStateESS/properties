<?php

/*
 * See docs/AUTHORS and docs/COPYRIGHT for relevant info.
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * @author Matthew McNaney <mcnaney at gmail dot com>
 *
 * @license http://opensource.org/licenses/lgpl-3.0.html
 */

namespace properties\Factory;

class NavBar
{

    public static $buttons;

    public static function view()
    {
        $auth = \Current_User::getAuthorization();

        $vars['logged'] = \Current_User::isLogged();
        $vars['admin'] = \Current_User::allow('properties');

        $vars['buttons'] = null;
        if (!empty(self::$buttons)) {
            $vars['buttons'] = implode('', self::$buttons);
        }

        $vars['is_deity'] = \Current_User::isDeity();
        $vars['logout_uri'] = $auth->logout_link;
        $vars['username'] = \Current_User::getDisplayName();
        $vars['home'] = \Server::getSiteUrl();
        $template = new \phpws2\Template($vars);
        $template->setModuleTemplate('properties', 'navbar.html');
        $content = $template->get();

        \Layout::plug($content, 'NAV_LINKS');
    }

    public static function addButton($button)
    {
        self::$buttons[] = $button;
    }

}
