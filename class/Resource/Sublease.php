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

use \phpws2\Variable;

class Sublease extends Place
{

    protected $additional_fees;
    protected $contact_phone;
    protected $contact_email;
    protected $landlord_perm;
    protected $move_out_date;
    protected $user_id;
    

    public function __construct()
    {
        parent::__construct();

        $this->additional_fees = new Variable\TextOnly('', 'additional_fees');
        $this->contact_phone = new Variable\PhoneNumber('', 'contact_phone');
        $this->contact_email = new Variable\Email('', 'contact_email');
        $this->landlord_perm = new Variable\Bool(false, 'landlord_perm');
        $this->move_out_date = new Variable\Date(time(), 'move_out_date');
        $this->user_id = new Variable\Integer(0, 'user_id');
    }

    public function getSubleaseType()
    {
        switch ($this->sublease_type->get()) {
            case 0:
                return 'Tenant';

            case 1:
                return 'Unit';
        }
    }
    
    public function view()
    {
        $vars = $this->getStringVars(true, array('active'));
        return $vars;
    }

}
