<?php

/**
 *
 * @author Matthew McNaney <mcnaneym@appstate.edu>
 */

namespace properties\Resource;

use \phpws2\Variable;

class Manager extends Base
{

    protected $username;
    protected $password;
    protected $first_name;
    protected $last_name;
    protected $phone;
    protected $email_address;
    protected $company_name;
    protected $company_address;
    protected $company_url;
    protected $times_available;
    protected $last_log;
    protected $active;
    protected $private;
    protected $approved;
    protected $table = 'prop_contacts';

    public function __construct()
    {
        parent::__construct();

        $this->username = new Variable\TextOnly(null, 'username');
        $this->username->allowEmpty(false);
        $this->password = new Variable\Password(null, 'password');
        $this->password->allowEmpty(false);
        $this->first_name = new Variable\TextOnly(null, 'first_name');
        $this->first_name->allowEmpty(false);
        $this->last_name = new Variable\TextOnly(null, 'last_name');
        $this->last_name->allowEmpty(false);
        $this->phone = new Variable\PhoneNumber(null, 'phone');
        $this->phone->allowEmpty(false);
        $this->phone->formatNumber(true);
        $this->email_address = new Variable\Email(null, 'email_address');
        $this->email_address->allowEmpty(false);
        $this->company_name = new Variable\TextOnly(null, 'company_name');
        $this->company_name->allowEmpty(false);
        $this->company_address = new Variable\TextOnly(null, 'company_address');
        $this->company_address->allowNull(true);
        $this->company_url = new Variable\Url(null, 'company_url');
        $this->company_url->allowNull(true);
        $this->times_available = new Variable\TextOnly(null, 'times_available');
        $this->times_available->allowNull(true);
        $this->last_log = new Variable\Integer(time(), 'last_log');
        $this->active = new Variable\Bool(1, 'active');
        $this->private = new Variable\Bool(0, 'private');
        $this->approved = new Variable\Bool(1, 'approved');
    }

}
