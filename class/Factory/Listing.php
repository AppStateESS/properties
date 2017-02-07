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

namespace properties\Factory;

abstract class Listing
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
    protected $db;

    /**
     * @var \phpws2\Database\Table
     */
    protected $data_table; //tbl

    public function __construct()
    {
        $this->db = \phpws2\Database::getDB();
        $this->data_table = $this->db->addTable('properties');
    }

    public function pullVariables(\Canopy\Request $request)
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
        $this->airconditioning = $request->pullGetBoolean('airconditioning',
                true);
        $this->dishwasher = $request->pullGetBoolean('dishwasher', true);
        $this->laundry = $request->pullGetBoolean('laundry', true);
        $this->efficiency = $request->pullGetBoolean('efficiency', true);
        $this->apartment = $request->pullGetBoolean('apartment', true);
        $this->house = $request->pullGetBoolean('house', true);
        $this->condo = $request->pullGetBoolean('condo', true);
        $this->townhouse = $request->pullGetBoolean('townhouse', true);
        $this->duplex = $request->pullGetBoolean('duplex', true);
    }

}
