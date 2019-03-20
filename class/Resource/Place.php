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

abstract class Place extends Base
{

    protected $active;
    protected $address;
    protected $airconditioning;
    protected $appalcart;
    protected $bathroom_no;
    protected $bedroom_no;
    protected $campus_distance;
    protected $created;
    protected $description;
    protected $dishwasher;
    protected $furnished;
    protected $internet_type;
    protected $laundry_type;

    /**
     * 0 - per unit
     * 1 - per renter
     * @var phpws2\Variable\SmallInteger
     */
    protected $lease_type;
    protected $monthly_rent;
    protected $move_in_date;
    protected $name;
    protected $parking_per_unit;
    protected $pets_allowed;
    protected $proptype;
    protected $no_smoking;
    protected $timeout;
    protected $trash_type;
    protected $tv_type;
    protected $updated;
    protected $utilities_inc;
    protected $thumbnail;

    public function __construct()
    {
        parent::__construct();
        $this->active = new \phpws2\Variable\BooleanVar(false, 'active');
        $this->address = new \phpws2\Variable\StringVar(null, 'address');
        $this->airconditioning = new \phpws2\Variable\BooleanVar(false,
                'airconditioning');
        $this->appalcart = new \phpws2\Variable\BooleanVar(false, 'appalcart');
        $this->bathroom_no = new \phpws2\Variable\DecimalVar(1.0, 'bathroom_no');
        $this->bedroom_no = new \phpws2\Variable\SmallInteger(1, 'bedroom_no');
        $this->bedroom_no->setRange(1, 10);
        $this->campus_distance = new \phpws2\Variable\SmallInteger(0,
                'campus_distance');
        $this->campus_distance->setRange(0, 100);
        $this->created = new \phpws2\Variable\DateTime(null, 'created');
        $this->description = new \phpws2\Variable\StringVar(null, 'description');
        $this->dishwasher = new \phpws2\Variable\BooleanVar(false, 'dishwasher');
        $this->furnished = new \phpws2\Variable\BooleanVar(false, 'furnished');
        $this->internet_type = new \phpws2\Variable\SmallInteger(1,
                'internet_type');
        $this->internet_type->setRange(0, 20);
        $this->laundry_type = new \phpws2\Variable\SmallInteger(0,
                'laundry_type');
        $this->laundry_type->setRange(0, 10);
        $this->lease_type = new \phpws2\Variable\SmallInteger(0, 'lease_type');
        $this->lease_type->setRange(0, 10);
        $this->monthly_rent = new \phpws2\Variable\SmallInteger(0,
                'monthly_rent');
        $this->move_in_date = new \phpws2\Variable\DateVar(0, 'move_in_date');
        $this->move_in_date->stamp();
        $this->name = new \phpws2\Variable\StringVar(null, 'name');
        $this->name->setLimit(256);
        $this->parking_per_unit = new \phpws2\Variable\SmallInteger(1,
                'parking_per_unit');
        $this->pets_allowed = new \phpws2\Variable\BooleanVar(false,
                'pets_allowed');
        $this->proptype = new \phpws2\Variable\SmallInteger(0, 'proptype');
        $this->proptype->setRange(0, 20);
        $this->no_smoking = new \phpws2\Variable\BooleanVar(false, 'no_smoking');
        $this->timeout = new Variable\IntegerVar(time(), 'timeout');
        $this->trash_type = new \phpws2\Variable\SmallInteger(0, 'trash_type');
        $this->tv_type = new \phpws2\Variable\SmallInteger(0, 'tv_type');
        $this->tv_type->setRange(0, 10);
        $this->updated = new \phpws2\Variable\DateTime(time(), 'updated');
        $this->utilities_inc = new \phpws2\Variable\BooleanVar(false,
                'utilities_inc');
        $this->thumbnail = new Variable\StringVar(null, 'thumbnail');
        $this->thumbnail->allowNull(true);
        $this->thumbnail->setIsTableColumn(false);
        $this->doNotSave('thumbnail');
    }

    public function getCampusDistance()
    {
        switch ($this->campus_distance->get()) {
            case '0':
                return 'Within a mile';
            case '1':
                return 'Less than five miles';
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

    public function isHighSpeed()
    {
        switch ($this->internet_type->get()) {
            case NET_DSL:
            case NET_CABLE:
            case NET_BOTH:
            case NET_FIBER:
                return true;

            default:
                return false;
        }
    }

    public function getLaundryType()
    {
        switch ($this->laundry_type->get()) {
            case LAUNDRY_NONE:
                return 'No laundry facilities';
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

    public function getPropType()
    {
        switch ($this->proptype->get()) {
            case PROP_TYPE_APARTMENT:
                return 'Apartment';
                break;

            case PROP_TYPE_EFFICIENCY:
                return 'Efficiency';
                break;

            case PROP_TYPE_HOUSE:
                return 'House';
                break;

            case PROP_TYPE_CONDO:
                return 'Condo';
                break;

            case PROP_TYPE_TOWNHOUSE:
                return 'Townhouse';
                break;

            case PROP_TYPE_DUPLEX:
                return 'Duplex';
                break;
        }
    }

    public function getSmokingAllowed()
    {
        return $this->no_smoking ? 'Smoke free' : 'Smoking allowed';
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

    public function isCloseToCampus()
    {
        return $this->campus_distance->get() == 0;
    }

    public function view()
    {
        $view = $this->getStringVars();
        $view['close_to_campus'] = $this->isCloseToCampus();
        $view['description'] = nl2br($view['description']);
        $view['campus_distance'] = $this->getCampusDistance();
        $view['trash_type'] = $this->getTrashType();
        $view['internet_type'] = $this->getInternetType();
        $view['laundry_type'] = $this->getLaundryType();
        if ($this->move_in_date->get() < time()) {
            $view['move_in_date'] = 'Move in today!';
        } else {
            $view['move_in_date'] = $this->getMoveInDate();
        }
        $view['tv_type'] = $this->getTvType();
        $view['washer'] = ($this->laundry_type->get() == LAUNDRY_IN_UNIT);
        $view['property_map_address'] = $this->googleMapUrl($this->address);
        $view['high_speed'] = $this->isHighSpeed();
        $view['proptype'] = $this->getPropType();
        $view['no_smoking'] = $this->getSmokingAllowed();
        $view['smoke_free'] = ($this->no_smoking->get() == 1);
        return $view;
    }

    public function forwardTimeout()
    {
        $forward = time() + PROPERTIES_FORWARD_TIMEOUT;
        $this->timeout->set($forward);
    }

}
