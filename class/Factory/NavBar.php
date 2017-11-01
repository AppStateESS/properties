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

    public static $items;
    public static $options;
    public static $title = 'Administrate';
    public static $has_run = false;

    public static function view(\Canopy\Request $request)
    {
        if (self::$has_run) {
            return;
        }
        self::$has_run = true;
        $auth = \Current_User::getAuthorization();

        $vars['logged'] = \Current_User::isLogged();
        $vars['admin'] = \Current_User::allow('properties');

        $vars['items'] = null;
        $vars['options'] = null;
        if (!empty(self::$items)) {
            $vars['items'] = self::$items;
        }
        
        if (!empty(self::$options)) {
            $vars['options'] = implode('</li><li>', self::$options);
        }

        $vars['is_deity'] = \Current_User::isDeity();
        $vars['logout_uri'] = $auth->logout_link;
        $vars['username'] = \Current_User::getDisplayName();
        $vars['home'] = \Canopy\Server::getSiteUrl();
        $vars['title'] = self::$title;
        $vars['current_area'] = self::getNavTitle($request);
        $template = new \phpws2\Template($vars);
        $template->setModuleTemplate('properties', 'navbar.html');
        $content = $template->get();

        \Layout::plug($content, 'NAV_LINKS');
    }

    private static function getNavTitle(\Canopy\Request $request)
    {
        $url = $request->getUrl();
        if (preg_match('/Roommate/', $url)) {
            return '<i class="fa fa-comments-o"></i>&nbsp;Roommates';
        } elseif (preg_match('/Manager/', $url)) {
            return '<i class="fa fa-users"></i>&nbsp;Landlords';
        } elseif (preg_match('/Sublease/', $url)) {
            return '<i class="fa fa-suitcase"></i>&nbsp;Subleases';
        } elseif (preg_match('/Property/', $url)) {
            return '<i class="fa fa-building"></i>&nbsp;Properties';
        } else {
            return 'Main menu';
        }
    }
    
    public static function addItem($item)
    {
        self::$items[] = $item;
    }
    
    public static function addDivider()
    {
        self::$items[] = '|';
    }

    public static function addOption($option, $unshift=false)
    {
        if ($unshift && !empty(self::$options)) {
            array_unshift(self::$options,$option);
        } else {
            self::$options[] = $option;
        }
    }
    
    public static function setTitle($title)
    {
        self::$title = $title;
    }
}
