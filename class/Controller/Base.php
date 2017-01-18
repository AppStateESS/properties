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

namespace properties\Controller;

class Base extends \phpws2\Http\Controller
{

    public function setCurrentLoggedManager($manager_id)
    {
        $session = \phpws2\Session::getInstance();
        $session->property_manager_id = $manager_id;
    }

    public function getCurrentLoggedManager()
    {
        $session = \phpws2\Session::getInstance();
        return isset($session->property_manager_id) ? (int) $session->property_manager_id : false;
    }

    public function clearCurrentLoggedManager()
    {
        $session = \phpws2\Session::getInstance();
        unset($session->property_manager_id);
    }

}
