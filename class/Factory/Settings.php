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

    public function form()
    {
        $settings['site_email'] = \phpws2\Settings::get('properties',
                        'site_email');
        $settings['approval_email'] = \phpws2\Settings::get('properties',
                        'approval_email');
        $template = new \phpws2\Template($settings);
        $template->setModuleTemplate('properties', 'settings.html');
        return $template->get();
    }

    public function post(\Canopy\Request $request)
    {
        \phpws2\Settings::set('properties', 'site_email',
                $request->pullPostString('site_email', true));
        \phpws2\Settings::set('properties', 'approval_email',
                $request->pullPostString('approval_email', true));
    }

    public function view()
    {
        $settings['site_email'] = \phpws2\Settings::get('properties',
                        'site_email');
        $settings['approval_email'] = \phpws2\Settings::get('properties',
                        'approval_email');
        return $settings;
    }

}
