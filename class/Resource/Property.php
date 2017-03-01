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
class Property extends Place
{

    protected $admin_fee_amt;
    protected $admin_fee_refund;
    protected $approved;
    protected $clean_fee_amt;
    protected $clean_fee_refund;
    protected $clubhouse;
    protected $contact_id;
    protected $contract_length;
    protected $efficiency;
    protected $heat_type;
    protected $other_fees;
    protected $parking_fee;
    protected $pet_deposit;
    protected $pet_dep_refund;
    protected $pet_fee;
    protected $pet_type;
    protected $proptype;
    protected $security_amt;
    protected $security_refund;
    protected $student_type;
    protected $sublease;
    protected $timeout;
    protected $util_cable;
    protected $util_fuel;
    protected $util_internet;
    protected $util_phone;
    protected $util_water;
    protected $util_trash;
    protected $util_power;
    protected $window_number;
    protected $workout_room;
    protected $table = 'properties';
    protected $company_name;

    public function __construct()
    {
        parent::__construct();

        $this->admin_fee_amt = new Variable\IntegerVar(0, 'admin_fee_amt');
        $this->admin_fee_refund = new Variable\BooleanVar(false,
                'admin_fee_refund');
        $this->approved = new Variable\BooleanVar(false, 'approved');
        $this->clean_fee_amt = new Variable\IntegerVar(0, 'clean_fee_amt');
        $this->clean_fee_refund = new Variable\BooleanVar(0, 'clean_fee_refund');
        $this->clubhouse = new Variable\BooleanVar(false, 'clubhouse');
        $this->contact_id = new Variable\IntegerVar(0, 'contact_id');
        $this->contact_id->setRange(1);
        $this->contract_length = new Variable\SmallInteger(3, 'contract_length');
        $this->efficiency = new Variable\BooleanVar(false, 'efficiency');
        $this->heat_type = new Variable\ArrayVar(null, 'heat_type');
        $this->heat_type->allowNull(true);
        $this->other_fees = new Variable\StringVar('', 'other_fees');
        $this->parking_fee = new Variable\IntegerVar(0, 'parking_fee');
        $this->pet_deposit = new Variable\IntegerVar(0, 'pet_deposit');
        $this->pet_dep_refund = new Variable\BooleanVar(false, 'pet_dep_refund');
        $this->pet_fee = new Variable\IntegerVar(0, 'pet_fee');
        $this->pet_type = new Variable\StringVar('', 'pet_type');
        $this->security_amt = new Variable\IntegerVar(0, 'security_amt');
        $this->security_refund = new Variable\BooleanVar(false,
                'security_refund');
        $this->student_type = new Variable\SmallInteger(0, 'student_type');
        $this->sublease = new Variable\BooleanVar(false, 'sublease');
        $this->timeout = new Variable\IntegerVar(0, 'timeout');
        $this->trash_type = new Variable\IntegerVar(0, 'trash_type');
        $this->trash_type->setRange(0, 10);
        $this->util_water = new Variable\IntegerVar(0, 'util_water');
        $this->util_water->setRange(-1, 2000);
        $this->util_trash = new Variable\IntegerVar(0, 'util_trash');
        $this->util_trash->setRange(-1, 2000);
        $this->util_power = new Variable\IntegerVar(0, 'util_power');
        $this->util_power->setRange(-1, 2000);
        $this->util_cable = new Variable\IntegerVar(0, 'util_cable');
        $this->util_cable->setRange(-1, 2000);
        $this->util_fuel = new Variable\IntegerVar(0, 'util_fuel');
        $this->util_fuel->setRange(-1, 2000);
        $this->util_internet = new Variable\IntegerVar(0, 'util_internet');
        $this->util_internet->setRange(-1, 2000);
        $this->util_phone = new Variable\IntegerVar(0, 'util_phone');
        $this->util_phone->setRange(-1, 2000);
        $this->window_number = new Variable\BooleanVar(true, 'window_number');
        $this->workout_room = new Variable\BooleanVar(false, 'workout_room');
        $this->company_name = new Variable\StringVar('', 'company_name');
        $this->doNotSave('company_name');
    }

    public function getStudentType()
    {
        switch ($this->student_type->get()) {
            case NO_STUDENT_PREFERENCE:
                return 'None';

            case UNDERGRAD:
                return 'Undergraduate';

            case GRAD_STUDENT:
                return 'Graduate';
        }
    }

    public function getHeatTypes()
    {
        $heat_types = $this->heat_type->get();
        if (empty($heat_types)) {
            return 'None';
        } else {
            foreach ($heat_types as $t) {
                switch ($t) {
                    case HT_HVAC:
                        $type = 'Heat pump';
                        break;
                    case HT_OIL:
                        $type = 'Oil';
                        break;
                    case HT_PROPANE:
                        $type = 'Propane';
                        break;
                    case HT_ELEC_BASE:
                        $type = 'Electric baseboard';
                        break;
                    case HT_KEROSENE:
                        $type = 'Kerosene';
                        break;
                    case HT_WOODSTOVE:
                        $type = 'Woodstove/Fireplace';
                        break;
                    case HT_GAS:
                        $type = 'Natural gas';
                        break;
                    
                    default:
                        throw new \Exception("Unknown heat type: $t");
                }
                $types[] = $type;
            }
        }
        return implode(', ', $types);
    }

    public function view()
    {
        $view = parent::view();

        $view['lease_type'] = $this->lease_type === '0' ? 'per unit' : 'per tenant';
        $view['admin_fee_refund'] = $this->admin_fee_refund->get() ? 'Refundable' : 'Non-refundable';
        $view['clean_fee_refund'] = $this->clean_fee_refund->get() ? 'Refundable' : 'Non-refundable';
        $view['pet_dep_refund'] = $this->pet_dep_refund->get() ? 'Refundable' : 'Non-refundable';
        $view['security_refund'] = $this->security_refund->get() ? 'Refundable' : 'Non-refundable';
        $view['student_type'] = $this->getStudentType();
        $view['heat_type'] = $this->getHeatTypes();
        $view['contract_length'] = $this->getContractLength();

        if ($this->furnished->get() || $this->airconditioning->get() ||
                $this->isHighSpeed() || $this->dishwasher->get() ||
                $this->utilities_inc->get() || $this->clubhouse->get() ||
                $this->appalcart->get() || $this->workout_room->get() ||
                $this->pets_allowed->get()) {
            $view['has_amenities'] = true;
        } else {
            $view['has_amenities'] = false;
        }

        return $view;
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

}
