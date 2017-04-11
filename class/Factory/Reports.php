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

use phpws2\Database;

class Reports extends Base
{

    protected function build()
    {
        
    }

    public function getInactiveManagers($inactive_date)
    {
        $unix = strtotime($inactive_date);
        $db = Database::getDB();
        $c = $db->addTable('prop_contacts');
        $c->addFieldConditional('last_log', $unix, '<');
        $c->addOrderBy('last_log');
        $result = $db->select();
        return $result;
    }

}
