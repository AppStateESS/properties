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

namespace properties\Role;

class UserRole extends BaseRole
{

    public function __construct($controller, $method = null)
    {
        $this->getCommands = array('manager' => array('view', 'list'), 'property' => array('view', 'list'), 'photo' => array('view', 'list'));
        parent::__construct($controller, $method);
    }

    public function isUser()
    {
        return true;
    }

}
