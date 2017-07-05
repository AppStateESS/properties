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

namespace properties\Controller\Settings;

use properties\Resource\Property as Resource;

class Admin extends \properties\Controller\SubController
{

    protected function loadFactory()
    {
        $factory = new \properties\Factory\Settings;
        return $factory;
    }

    protected function listHtmlCommand(\Canopy\Request $request)
    {
        return $this->factory->reactView('settings');
    }
    
    protected function savePostCommand(\Canopy\Request $request)
    {
        $this->factory->post($request);
        return array('success'=>true);
    }
    
    protected function viewJsonCommand(\Canopy\Request $request)
    {
        return $this->factory->view();
    }
    
    protected function inactivePutCommand(\Canopy\Request $request)
    {
        $propertyFactory = new \properties\Factory\Property;
        $updated = $propertyFactory->flipPropertyTimeout();
        $propertyFactory->updatePropertyTimeout();
        return array('success'=>true, 'updated'=>$updated);
    }

}
