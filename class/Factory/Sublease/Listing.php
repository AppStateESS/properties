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

namespace properties\Factory\Sublease;

class Listing
{

    public $search_string;
    public $limit = 100;
    public $beds = 1;
    public $baths = 1;
    public $minprice = 0;
    public $maxprice = 0;
    public $furnished = 0;
    public $pets = 0;
    public $appalcart = 0;
    public $campus = 0; // within 5 miles of campus
    public $utils = 0; // utilities comped
    public $airconditioning = 0;
    public $dishwasher = 0;
    public $laundry = 0; // washer/dryer in unit
    public $clubhouse = 0;
    public $workout = 0;
    public $efficiency = 0;
    public $apartment = 0;
    public $house = 0;
    public $condo = 0;
    public $townhouse = 0;
    public $duplex = 0;

    /**
     * @var \phpws2\Database\DB
     */
    private $db;

    /**
     * @var \phpws2\Database\Table
     */
    private $sublease_table; //tbl

    public function __construct()
    {
        $this->db = \phpws2\Database::getDB();
        $this->sublease_table = $this->db->addTable('prop_sublease');
    }

    public function pullVariables(\Request $request)
    {
        $this->search_string = $request->pullGetString('search', true);
        $this->limit = $request->pullGetInteger('limit', true);
        $this->beds = $request->pullGetInteger('beds', true);
        $this->baths = $request->pullGetInteger('baths', true);
        $this->minprice = (int) $request->pullGetInteger('minprice', true);
        $this->maxprice = (int) $request->pullGetInteger('maxprice', true);
        $this->furnished = $request->pullGetBoolean('furnished', true);
        $this->pets = $request->pullGetBoolean('pets', true);
        $this->appalcart = $request->pullGetBoolean('appalcart', true);
        $this->campus = $request->pullGetBoolean('campus', true);
        $this->utils = $request->pullGetBoolean('utils', true);
        $this->dishwasher = $request->pullGetBoolean('dishwasher', true);
        $this->laundry = $request->pullGetBoolean('laundry', true);
        $this->efficiency = $request->pullGetBoolean('efficiency', true);
        $this->apartment = $request->pullGetBoolean('apartment', true);
        $this->house = $request->pullGetBoolean('house', true);
        $this->condo = $request->pullGetBoolean('condo', true);
        $this->townhouse = $request->pullGetBoolean('townhouse', true);
        $this->duplex = $request->pullGetBoolean('duplex', true);
    }

    public function get($view = false)
    {
        if ((int) $this->limit <= 0) {
            $this->limit = 100;
        }

        $this->db->setLimit($this->limit);
        $this->addSearch();


        $this->sublease_table->addOrderBy('updated', 'desc');
        $this->addConditionals();
        if ($view) {
            $result = $this->db->selectAsResources('\properties\Resource\Sublease');
            if (empty($result)) {
                return array();
            }
            foreach ($result as $sublease) {
                $listing[] = $sublease->view();
            }
            return $listing;
        } else {
            $result = $this->db->select();
            return $result;
        }
    }

    private function addConditionals()
    {
        if ($this->beds > 1) {
            $this->sublease_table->addFieldConditional('bedroom_no',
                    $this->beds, '>=');
        }
        if ($this->baths > 1) {
            $this->sublease_table->addFieldConditional('bathroom_no',
                    $this->baths, '>=');
        }
        if ($this->minprice) {
            $this->sublease_table->addFieldConditional('monthly_rent',
                    (int) $this->minprice, '>=');
        }
        if ($this->maxprice) {
            $this->sublease_table->addFieldConditional('monthly_rent',
                    (int) $this->maxprice, '<=');
        }
        if ($this->furnished) {
            $this->sublease_table->addFieldConditional('furnished', 1);
        }
        if ($this->pets) {
            $this->sublease_table->addFieldConditional('pets_allowed', 1);
        }
        if ($this->appalcart) {
            $this->sublease_table->addFieldConditional('appalcart', 1);
        }
        if ($this->campus) {
            $this->sublease_table->addFieldConditional('campus_distance', 0);
        }
        if ($this->utils) {
            $this->sublease_table->addFieldConditional('utilities_inc', 1);
        }

        if ($this->dishwasher) {
            $this->sublease_table->addFieldConditional('dishwasher', 1);
        }
        if ($this->laundry) {
            $this->sublease_table->addFieldConditional('laundry_type',
                    LAUNDRY_IN_UNIT);
        }


        if ($this->efficiency || $this->apartment || $this->house || $this->condo || $this->townhouse || $this->duplex) {
            $prop_type = $this->sublease_table->getField('proptype');
            if ($this->efficiency) {
                $prop_cond[] = $this->db->createConditional($this->sublease_table->getField('proptype'),
                        PROP_TYPE_EFFICIENCY);
            }
            if ($this->apartment) {
                $prop_cond[] = $this->db->createConditional($this->sublease_table->getField('proptype'),
                        PROP_TYPE_APARTMENT);
            }
            if ($this->house) {
                $prop_cond[] = $this->db->createConditional($this->sublease_table->getField('proptype'),
                        PROP_TYPE_HOUSE);
            }
            if ($this->condo) {
                $prop_cond[] = $this->db->createConditional($this->sublease_table->getField('proptype'),
                        PROP_TYPE_CONDO);
            }
            if ($this->townhouse) {
                $prop_cond[] = $this->db->createConditional($this->sublease_table->getField('proptype'),
                        PROP_TYPE_TOWNHOUSE);
            }
            if ($this->duplex) {
                $prop_cond[] = $this->db->createConditional($this->sublease_table->getField('proptype'),
                        PROP_TYPE_DUPLEX);
            }

            foreach ($prop_cond as $cond) {
                if (empty($final_cond)) {
                    $final_cond = $cond;
                } else {
                    $final_cond = $this->db->createConditional($final_cond,
                            $cond, 'or');
                }
            }
            $this->db->addConditional($final_cond);
        }
    }

    private function addSearch()
    {
        if (!empty($this->search_string)) {
            $search_string = '%' . $this->search_string . '%';
            $s1 = $this->db->createConditional($this->sublease_table->getField('name'),
                    $search_string, 'like');
            $s2 = $this->db->createConditional($this->sublease_table->getField('address'),
                    $search_string, 'like');
            $conditional = $this->db->createConditional($s1, $s2, 'or');
            $this->db->addConditional($conditional);
        }
    }

}
