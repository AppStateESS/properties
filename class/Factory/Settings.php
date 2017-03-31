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

class Settings extends Base
{

    protected function build()
    {
        
    }

    public function post(\Canopy\Request $request)
    {
        \phpws2\Settings::set('properties', 'approval_email',
                $request->pullPostString('approval_email', true));
        \phpws2\Settings::set('properties', 'our_email',
                $request->pullPostString('our_email', true));
        \phpws2\Settings::set('properties', 'our_name',
                $request->pullPostString('our_name', true));
        \phpws2\Settings::set('properties', 'our_phone',
                $request->pullPostString('our_phone', true));
    }

    public function view()
    {
        $settings['our_email'] = \phpws2\Settings::get('properties',
                        'our_email');
        $settings['our_name'] = \phpws2\Settings::get('properties',
                        'our_name');
        $settings['our_phone'] = \phpws2\Settings::get('properties',
                        'our_phone');
        $settings['approval_email'] = \phpws2\Settings::get('properties',
                        'approval_email');
        return $settings;
    }

}
