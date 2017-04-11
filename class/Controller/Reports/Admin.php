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

namespace properties\Controller\Reports;

use properties\Resource\Property as Resource;
use Canopy\Request;

class Admin extends \properties\Controller\SubController
{

    protected function loadFactory()
    {
        $factory = new \properties\Factory\Reports;
        return $factory;
    }

    protected function listHtmlCommand(Request $request)
    {
        \Layout::addStyle('properties', 'reports/style.css');
        return $this->factory->reactView('reports');
    }

    protected function inactivityJsonCommand(Request $request)
    {
        $json['list'] = $this->factory->getInactiveManagers($request->pullGetString('date'));
        return $json;
    }

}
