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

namespace properties\Controller\Sublease;

class Logged extends User
{

    /**
     * @param \Request $request
     */
    public function createHtmlCommand(\Request $request)
    {
        \Layout::addStyle('properties', 'sublease/form.css');
        return $this->factory->reactView('subleaseform');
    }

    public function ownerJsonCommand()
    {
        $sublease = $this->factory->getSubleaseByUser($this->role->getId());
        if (empty($sublease)) {
            $json['sublease'] = null;
        } else {
            $json['sublease'] = $sublease->view();
        }
        $json['email'] = \Current_User::getEmail();
        return $json;
    }

}
