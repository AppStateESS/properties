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

namespace properties\Factory\Property;

class Listing extends \properties\Factory\Listing
{

    public $manager_id;
    public $clubhouse = 0;
    public $workout = 0;

    /**
     * @var \phpws2\Database\Table
     */
    private $contact_table; //tbl2
    /**
     * @var \phpws2\Database\Table
     */
    private $photo_table; //tbl3

    public function __construct()
    {
        parent::__construct();
        $this->contact_table = $this->db->addTable('prop_contacts');
        $this->photo_table = $this->db->addTable('prop_photo');
        $this->contact_table->addField('company_name');
        $this->photo_table->addField('path', 'thumbnail');
    }

    public function pullVariables(\Canopy\Request $request)
    {
        parent::pullVariables($request);
        $this->manager_id = $request->pullGetInteger('managerId', true);
        $this->clubhouse = $request->pullGetBoolean('clubhouse', true);
        $this->workout = $request->pullGetBoolean('workout', true);
    }

    public function get($view = false)
    {
        if ((int) $this->limit <= 0) {
            $this->limit = 100;
        }

        $this->db->setLimit($this->limit);
        $this->addSearch();

        if ($this->manager_id) {
            $this->data_table->addFieldConditional('contact_id',
                    $this->manager_id);
            $this->data_table->addOrderBy('updated', 'desc');
        } else {
            // Properties are random if manager not specified
            $this->data_table->randomOrder(true);
        }

        $c1 = $this->db->createConditional($this->data_table->getField('id'),
                $this->photo_table->getField('pid'));
        $c2 = $this->db->createConditional($this->photo_table->getField('main_pic'),
                1);
        $c3 = $this->db->createConditional($c1, $c2, 'and');

        $this->db->joinResources($this->data_table, $this->contact_table,
                $this->db->createConditional($this->data_table->getField('contact_id'),
                        $this->contact_table->getField('id')), 'left');
        $this->db->joinResources($this->data_table, $this->photo_table, $c3,
                'left');

        $this->addConditionals();
        if ($view) {
            $result = $this->db->selectAsResources('\properties\Resource\Property');
            if (empty($result)) {
                return array();
            }
            foreach ($result as $prop) {
                $listing[] = $prop->view();
            }
            return $listing;
        } else {
            $result = $this->db->select();
            return $result;
        }
    }

    private function addConditionals()
    {
        $this->contact_table->addFieldConditional('active', 1);
        $this->contact_table->addFieldConditional('approved', 1);
        if ($this->beds > 1) {
            $this->data_table->addFieldConditional('bedroom_no', $this->beds,
                    '>=');
        }
        if ($this->baths > 1) {
            $this->data_table->addFieldConditional('bathroom_no', $this->baths,
                    '>=');
        }
        if ($this->minprice) {
            $this->data_table->addFieldConditional('monthly_rent',
                    (int) $this->minprice, '>=');
        }
        if ($this->maxprice) {
            $this->data_table->addFieldConditional('monthly_rent',
                    (int) $this->maxprice, '<=');
        }
        if ($this->furnished) {
            $this->data_table->addFieldConditional('furnished', 1);
        }
        if ($this->pets) {
            $this->data_table->addFieldConditional('pets_allowed', 1);
        }
        if ($this->appalcart) {
            $this->data_table->addFieldConditional('appalcart', 1);
        }
        if ($this->campus) {
            $this->data_table->addFieldConditional('campus_distance', 0);
        }
        if ($this->utils) {
            $this->data_table->addFieldConditional('utilities_inc', 1);
        }
        if ($this->airconditioning) {
            $this->data_table->addFieldConditional('airconditioning', 1);
        }
        if ($this->dishwasher) {
            $this->data_table->addFieldConditional('dishwasher', 1);
        }
        if ($this->laundry) {
            $this->data_table->addFieldConditional('laundry_type',
                    LAUNDRY_IN_UNIT);
        }
        if ($this->clubhouse) {
            $this->data_table->addFieldConditional('clubhouse', 1);
        }
        if ($this->workout) {
            $this->data_table->addFieldConditional('workout_room', 1);
        }

        if ($this->efficiency || $this->apartment || $this->house || $this->condo || $this->townhouse || $this->duplex) {
            $prop_type = $this->data_table->getField('proptype');
            if ($this->efficiency) {
                $prop_cond[] = $this->db->createConditional($this->data_table->getField('proptype'),
                        PROP_TYPE_EFFICIENCY);
            }
            if ($this->apartment) {
                $prop_cond[] = $this->db->createConditional($this->data_table->getField('proptype'),
                        PROP_TYPE_APARTMENT);
            }
            if ($this->house) {
                $prop_cond[] = $this->db->createConditional($this->data_table->getField('proptype'),
                        PROP_TYPE_HOUSE);
            }
            if ($this->condo) {
                $prop_cond[] = $this->db->createConditional($this->data_table->getField('proptype'),
                        PROP_TYPE_CONDO);
            }
            if ($this->townhouse) {
                $prop_cond[] = $this->db->createConditional($this->data_table->getField('proptype'),
                        PROP_TYPE_TOWNHOUSE);
            }
            if ($this->duplex) {
                $prop_cond[] = $this->db->createConditional($this->data_table->getField('proptype'),
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
            $s1 = $this->db->createConditional($this->data_table->getField('name'),
                    $search_string, 'like');
            $s2 = $this->db->createConditional($this->data_table->getField('address'),
                    $search_string, 'like');
            $conditional = $this->db->createConditional($s1, $s2, 'or');
            $this->db->addConditional($conditional);
        }
    }

}
