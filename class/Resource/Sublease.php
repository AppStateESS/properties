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
    protected $table = 'prop_sublease';

    public function __construct()
    {
        parent::__construct();

        $this->additional_fees = new Variable\TextOnly(null, 'additional_fees');
        $this->contact_phone = new Variable\PhoneNumber(null, 'contact_phone');
        $this->contact_phone->allowEmpty(false);
        $this->contact_phone->formatNumber(true);
        $this->contact_email = new Variable\Email(null, 'contact_email');
        $this->landlord_perm = new Variable\BooleanVar(false, 'landlord_perm');
        $this->move_out_date = new Variable\DateVar(0, 'move_out_date');
        $this->user_id = new Variable\IntegerVar(0, 'user_id');
    }

    public function view()
    {
        $view = parent::view();

        if ($this->isCloseToCampus() || $this->furnished->get() || 
                $this->airconditioning->get() ||
                $this->isHighSpeed() || $this->dishwasher->get() ||
                $this->utilities_inc->get() || $this->appalcart->get() ||
                $this->pets_allowed->get()) {
            $view['has_amenities'] = true;
        } else {
            $view['has_amenities'] = false;
        }

        $view['lease_type'] = $this->lease_type->get() == 1 ? 'for unit' : 'per tenant';
        
        $this->contact_phone->formatNumber(false);
        $view['contact_phone_tel'] = 'tel:+1' . $this->contact_phone->get();
        return $view;
    }

}
