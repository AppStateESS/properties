<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace properties\Resource;

use \phpws2\Variable;

/**
 * Description of Property
 *
 * @author matt
 */
class Property extends Base
{

    protected $address;
    protected $active;
    protected $admin_fee_amt;
    protected $admin_fee_refund;
    protected $airconditioning;
    protected $appalcart;
    protected $approved;
    protected $bathroom_no;
    protected $bedroom_no;
    protected $campus_distance;
    protected $clean_fee_amt;
    protected $clean_fee_refund;
    protected $clubhouse;
    protected $contact_id;
    protected $contract_length;
    protected $created;
    protected $description;
    protected $dishwasher;
    protected $efficiency;
    protected $furnished;
    protected $heat_type;
    protected $internet_type;
    protected $lease_type;
    protected $laundry_type;
    protected $monthly_rent;
    protected $move_in_date;
    protected $name;
    protected $other_fees;
    protected $parking_fee;
    protected $parking_per_unit;
    protected $pet_deposit;
    protected $pet_dep_refund;
    protected $pets_allowed;
    protected $pet_fee;
    protected $pet_type;
    protected $security_amt;
    protected $security_refund;
    protected $student_type;
    protected $sublease;
    protected $timeout;
    protected $trash_type;
    protected $updated;
    protected $util_water;
    protected $util_trash;
    protected $util_power;
    protected $utilities_inc;
    protected $tv_type;
    protected $window_number;
    protected $workout_room;
    protected $table = 'properties';

    public function __construct()
    {
        parent::__construct();
        $this->active = new Variable\Bool(false, 'active');
        $this->address = new Variable\String(null, 'address');
        $this->admin_fee_amt = new Variable\Integer(0, 'admin_fee_amt');
        $this->admin_fee_refund = new Variable\Bool(false, 'admin_fee_refund');
        $this->airconditioning = new Variable\Bool(false, 'airconditioning');
        $this->appalcart = new Variable\Bool(false, 'appalcart');
        $this->approved = new Variable\Bool(false, 'approved');
        $this->bathroom_no = new \phpws2\Variable\Decimal(1.0, 'bathroom_no');
        $this->bedroom_no = new Variable\Integer(0, 'bedroom_no');
        $this->bedroom_no->setRange(0, 100);
        
        $this->campus_distance = new Variable\Integer(0, 'campus_distance');
        $this->campus_distance->setRange(0, 100);
        
        $this->clean_fee_amt = new Variable\Integer(0, 'clean_fee_amt');
        $this->clean_fee_refund = new Variable\Bool(0, 'clean_fee_refund');
        $this->clubhouse = new Variable\Bool(false, 'clubhouse');
        $this->contact_id = new Variable\Integer(0, 'contact_id');
        $this->contract_length = new Variable\Integer(0, 'contract_length');
        $this->created = new Variable\Integer(0, 'created');
        $this->description = new Variable\String(null, 'description');
        $this->dishwasher = new Variable\Bool(false, 'dishwasher');
        $this->efficiency = new Variable\Bool(false, 'efficiency');
        $this->furnished = new Variable\Bool(false, 'furnished');
        $this->heat_type = new Variable\String(null, 'heat_type');
        $this->heat_type->setLimit(100);
        $this->internet_type = new Variable\Integer(0, 'internet_type');
        $this->internet_type->setRange(0, 20);
        
        $this->lease_type = new Variable\Integer(0, 'lease_type');
        $this->lease_type->setRange(0, 10);
        
        $this->laundry_type = new Variable\Integer(0, 'laundry_type');
        $this->laundry_type->setRange(0, 10);
        
        $this->monthly_rent = new Variable\Integer(0, 'monthly_rent');
        $this->move_in_date = new Variable\Integer(0, 'move_in_date');
        $this->name = new Variable\String(null, 'name');
        $this->name->setLimit(255);
        
        $this->other_fees = new Variable\String(null, 'other_fees');
        $this->parking_fee = new Variable\Integer(0, 'parking_fee');
        $this->parking_per_unit = new Variable\Integer(0, 'parking_per_unit');
        $this->pet_deposit = new Variable\Integer(0, 'pet_deposit');
        $this->pet_dep_refund = new Variable\Bool(false, 'pet_dep_refund');
        $this->pets_allowed = new Variable\Bool(false, 'pets_allowed');
        $this->pet_fee = new Variable\Integer(0, 'pet_fee');
        $this->pet_type = new Variable\String(null, 'pet_type');
        $this->security_amt = new Variable\Integer(0, 'security_amt');
        $this->security_refund = new Variable\Bool(false, 'security_refund');
        $this->student_type = new Variable\Integer(0, 'student_type');
        $this->sublease = new Variable\Bool(false, 'sublease');
        $this->timeout = new Variable\Integer(0, 'timeout');
        $this->trash_type = new Variable\Integer(0, 'trash_type');
        $this->trash_type->setRange(0, 10);
        $this->updated = new Variable\Integer(0, 'updated');
        $this->util_water = new Variable\Bool(false, 'util_water');
        $this->util_trash = new Variable\Bool(false, 'util_trash');
        $this->util_power = new Variable\Bool(false, 'util_power');
        $this->utilities_inc = new Variable\Bool(false, 'utilities_inc');
        $this->tv_type = new Variable\Integer(0, 'tv_type');
        $this->tv_type->setRange(0, 10);
        $this->window_number = new Variable\Integer(0, 'window_number');
        $this->window_number->setRange(0, 1000);
        $this->workout_room = new Variable\Bool(false, 'workout_room');
    }

}
