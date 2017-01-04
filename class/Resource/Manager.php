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
    protected $property_count;
    protected $inquiry_date;
    protected $inquiry_type;
    protected $table = 'prop_contacts';

    public function __construct()
    {
        parent::__construct();

        $this->username = new Variable\TextOnly(null, 'username');
        $this->username->allowEmpty(false);
        $this->password = new Variable\Password(null, 'password');
        $this->password->allowEmpty(false);
        $this->password->setSalt(PROPERTIES_MANAGER_SALT);
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
        $this->active = new Variable\Bool(0, 'active');
        $this->private = new Variable\Bool(0, 'private');
        $this->approved = new Variable\Bool(0, 'approved');
        $this->property_count = new Variable\Integer(0, 'properties_count');
        $this->property_count->setIsTableColumn(false);

        $this->inquiry_date = new Variable\Integer(0, 'inquiry_date');
        $this->inquiry_type = new Variable\Attribute(null, 'inquiry_type');
        $this->doNotSave(array('inquiry_date', 'inquiry_type'));
    }

    public function view($restricted = false)
    {
        $hide = array();
        if ($restricted) {
            $hide = array('active', 'approved', 'last_log', 'username', 'first_name', 'last_name', 'inquiry_date', 'inquiry_type');
        }
        $hide[] = 'password';
        $view = $this->getStringVars(null, $hide);
        $view['company_map_address'] = $this->googleMapUrl($this->company_address);
        if (!$restricted) {
            $view['last_log_date'] = strftime('%e %b %Y, %r',
                    $this->last_log->get());
            if ($this->inquiry_date->get()) {
                $view['inquiry_date'] = strftime('%B %e, %Y at %r',
                        $this->inquiry_date->get());
            } else {
                $view['inquiry_date'] = null;
                $view['inquiry_type'] = null;
            }
        }
        $this->phone->formatNumber(false);
        $view['phone_tel'] = 'tel:+1' . $this->phone->get();
        return $view;
    }
    
}
