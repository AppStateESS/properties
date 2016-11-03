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
    protected $util_cable;
    protected $util_fuel;
    protected $util_internet;
    protected $util_phone;
    protected $util_water;
    protected $util_trash;
    protected $util_power;
    protected $utilities_inc;
    protected $tv_type;
    protected $window_number;
    protected $workout_room;
    protected $table = 'properties';
    protected $company_name;

    public function __construct()
    {
        parent::__construct();
        $this->active = new Variable\Bool(false, 'active');
        $this->address = new Variable\String('', 'address');
        $this->admin_fee_amt = new Variable\Integer(0, 'admin_fee_amt');
        $this->admin_fee_refund = new Variable\Bool(false, 'admin_fee_refund');
        $this->airconditioning = new Variable\Bool(false, 'airconditioning');
        $this->appalcart = new Variable\Bool(false, 'appalcart');
        $this->approved = new Variable\Bool(false, 'approved');
        $this->bathroom_no = new \phpws2\Variable\Decimal(1.0, 'bathroom_no');
        $this->bedroom_no = new Variable\Integer(1, 'bedroom_no');
        $this->bedroom_no->setRange(1, 10);

        $this->campus_distance = new Variable\Integer(0, 'campus_distance');
        $this->campus_distance->setRange(0, 100);

        $this->clean_fee_amt = new Variable\Integer(0, 'clean_fee_amt');
        $this->clean_fee_refund = new Variable\Bool(0, 'clean_fee_refund');
        $this->clubhouse = new Variable\Bool(false, 'clubhouse');
        $this->contact_id = new Variable\Integer(0, 'contact_id');
        $this->contact_id->setRange(1);
        $this->contract_length = new Variable\Integer(3, 'contract_length');
        $this->created = new Variable\DateTime(null, 'created');
        $this->description = new Variable\String('', 'description');
        $this->dishwasher = new Variable\Bool(false, 'dishwasher');
        $this->efficiency = new Variable\Bool(false, 'efficiency');
        $this->furnished = new Variable\Bool(false, 'furnished');
        $this->heat_type = new Variable\String('', 'heat_type');
        $this->heat_type->setLimit(100);
        $this->internet_type = new Variable\Integer(0, 'internet_type');
        $this->internet_type->setRange(0, 20);

        $this->lease_type = new Variable\Integer(0, 'lease_type');
        $this->lease_type->setRange(0, 10);

        $this->laundry_type = new Variable\Integer(0, 'laundry_type');
        $this->laundry_type->setRange(0, 10);

        $this->monthly_rent = new Variable\Integer(0, 'monthly_rent');
        $this->move_in_date = new Variable\Date(0, 'move_in_date');
        $this->name = new Variable\String('', 'name');
        $this->name->setLimit(100);

        $this->other_fees = new Variable\String('', 'other_fees');
        $this->parking_fee = new Variable\Integer(1, 'parking_fee');
        $this->parking_per_unit = new Variable\Integer(0, 'parking_per_unit');
        $this->pet_deposit = new Variable\Integer(0, 'pet_deposit');
        $this->pet_dep_refund = new Variable\Bool(false, 'pet_dep_refund');
        $this->pets_allowed = new Variable\Bool(false, 'pets_allowed');
        $this->pet_fee = new Variable\Integer(0, 'pet_fee');
        $this->pet_type = new Variable\String('', 'pet_type');
        $this->security_amt = new Variable\Integer(0, 'security_amt');
        $this->security_refund = new Variable\Bool(false, 'security_refund');
        $this->student_type = new Variable\Integer(0, 'student_type');
        $this->sublease = new Variable\Bool(false, 'sublease');
        $this->timeout = new Variable\Integer(0, 'timeout');
        $this->trash_type = new Variable\Integer(0, 'trash_type');
        $this->trash_type->setRange(0, 10);
        $this->updated = new Variable\DateTime(time(), 'updated');
        $this->util_water = new Variable\Integer(0, 'util_water');
        $this->util_trash = new Variable\Integer(0, 'util_trash');
        $this->util_power = new Variable\Integer(0, 'util_power');
        $this->util_cable = new Variable\Integer(0, 'util_cable');
        $this->util_fuel = new Variable\Integer(0, 'util_fuel');
        $this->util_internet = new Variable\Integer(0, 'util_internet');
        $this->util_phone = new Variable\Integer(0, 'util_phone');
        $this->utilities_inc = new Variable\Bool(false, 'utilities_inc');
        $this->tv_type = new Variable\Integer(0, 'tv_type');
        $this->tv_type->setRange(0, 10);
        $this->window_number = new Variable\Bool(true, 'window_number');
        $this->workout_room = new Variable\Bool(false, 'workout_room');

        $this->company_name = new Variable\String('', 'company_name');
    }

    public function getCampusDistance()
    {
        switch ($this->campus_distance->get()) {
            case '0':
                return 'Five miles or less';
            case '5':
                return 'Between five and ten miles';
            case '10':
                return 'Between 10 and 25 miles';
            case '25':
                return '25 miles or more';

            default:
                return false;
        }
    }

    public function getContractLength()
    {
        switch ($this->contract_length->get()) {
            case C_MONTHLY:
                return 'Monthly';

            case C_SIX_MONTH:
                return 'Every six months';

            case C_YEARLY:
                return 'Yearly (12 months)';

            case C_SUMMER:
                return 'Summer only';

            case C_SEMESTER:
                return 'Per semester';

            case C_TWO_SEMESTER:
                return 'Two semesters, no summer';

            case C_TEN_MONTH:
                return '10 months';

            case C_FIVE_MONTH:
                return '5 months';

            default:
                return false;
        }
    }

    public function getInternetType()
    {
        switch ($this->internet_type->get()) {
            case NET_DIALUP:
                return 'Dial up only';
            case NET_DSL:
                return 'DSL';
            case NET_WIRELESS:
                return 'Wireless';
            case NET_SATELLITE:
                return 'Satellite';
            case NET_CABLE:
                return 'Cable';
            case NET_BOTH:
                return 'DSL/Cable';
            case NET_FIBER:
                return 'Fiber';
        }
    }

    public function getLaundryType()
    {
        switch ($this->laundry_type->get()) {
            case LAUNDRY_NONE:
                return 'No laundry';
            case LAUNDRY_IN_UNIT:
                return 'Washer/Dryer in unit';
            case LAUNDRY_ON_PREMISES:
                return 'Laundry room on premises';
            case LAUNDRY_HOOKUP:
                return 'Washer/Dryer hook ups in unit';
        }
        return false;
    }

    public function getMoveInDate()
    {
        return $this->move_in_date->__toString();
    }

    public function getStudentType()
    {
        switch ($this->student_type->get()) {
            case NO_STUDENT_PREFERENCE:
                return 'No preference';

            case UNDERGRAD:
                return 'Undergraduate';

            case GRAD_STUDENT:
                return 'Graduate';
        }
    }

    public function getTrashType()
    {
        switch ($this->trash_type->get()) {
            case TRASH_ON_YOUR_OWN:
                return 'No pickup or bins';
            case TRASH_PICKUP:
                return 'Curbside pickup';
            case TRASH_ON_PREMISES_NO_RECYCLE:
                return 'Trash only, no recycling bins';
            case TRASH_ON_PREMISES_WITH_RECYCLE:
                return 'Both bins on site';
        }
    }

    public function getTvType()
    {
        switch ($this->tv_type->get()) {
            case TV_NONE:
                return 'Antenna';
            case TV_CABLE:
                return 'Cable';
            case TV_SATELLITE:
                return 'Satellite';
            case TV_FIBER:
                return 'Fiber';
        }
    }

    public function view()
    {
        $view = $this->getStringVars();
        $view['campus_distance'] = $this->getCampusDistance();
        $view['contract_length'] = $this->getContractLength();
        $view['internet_type'] = $this->getInternetType();
        $view['lease_type'] = $this->lease_type === '0' ? 'per unit' : 'per renter';
        $view['laundry_type'] = $this->getLaundryType();
        $view['move_in_date'] = $this->getMoveInDate();
        $view['trash_type'] = $this->getTrashType();
        $view['admin_fee_refund'] = $this->admin_fee_refund->get() ? 'Refundable' : 'Non-refundable';
        $view['pet_dep_refund'] = $this->pet_dep_refund->get() ? 'Refundable' : 'Non-refundable';
        $view['security_refund'] = $this->security_refund->get() ? 'Refundable' : 'Non-refundable';
        $view['student_type'] = $this->getStudentType();
        $view['tv_type'] = $this->getTvType();
        $view['property_map_address'] = $this->googleMapUrl($this->address);

        return $view;
    }

}
