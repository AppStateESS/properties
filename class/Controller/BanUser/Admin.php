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

namespace properties\Controller\BanUser;

class Admin extends \properties\Controller\SubController
{

    protected $factory;

    protected function loadFactory()
    {
        return new \properties\Factory\BanUser;
    }

    protected function savePostCommand(\Canopy\Request $request)
    {
        $this->factory->ban($request->pullPostInteger('userId'),
                $request->pullPostString('reason'));
        $json = array('success' => true);
        return $json;
    }

    protected function successHtmlCommand()
    {
        $content = <<<EOF
<h2>User banned</h2>
<p>The user's sublease and roommate requests are removed and they will be prohibited
    from posting further.</p> The will still be able to log on to view roommate information.</p>
EOF;
        return $content;
    }

}
