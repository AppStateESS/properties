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

class Listing extends \properties\Factory\Listing
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

    public function __construct()
    {
        parent::__construct();
        $this->data_table = $this->db->addTable('prop_sublease');
        $this->photo_table = $this->db->addTable('prop_sub_photo');
        $this->photo_table->addField('path', 'thumbnail');
    }

    public function get($view = false)
    {
        if ((int) $this->limit <= 0) {
            $this->limit = 100;
        }

        $this->db->setLimit($this->limit);
        $this->addSearch();

        $this->data_table->addOrderBy('updated', 'desc');

        $c1 = $this->db->createConditional($this->data_table->getField('id'),
                $this->photo_table->getField('sid'));

        $this->db->joinResources($this->data_table, $this->photo_table, $c1,
                'left');

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

}
