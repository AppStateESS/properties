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

namespace properties\Resource;

class BanUser extends Base
{
    protected $user_id;
    protected $username;
    protected $reason;
    protected $table = 'prop_banned_user';
    
    public function __construct()
    {
        parent::__construct();
        $this->user_id = new \phpws2\Variable\IntegerVar(0, 'user_id');
        $this->username = new \phpws2\Variable\StringVar(null, 'username');
        $this->reason = new \phpws2\Variable\StringVar(null, 'reason');
    }
    
}
