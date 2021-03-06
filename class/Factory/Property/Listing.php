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
    public $pool = 0;

    /**
     * @var \phpws2\Database\Table
     */
    private $contact_table; //tbl2
    /**
     * @var \phpws2\Database\Table
     */
    protected $photo_table; //tbl3

    public function __construct()
    {
        parent::__construct();
        $this->data_table = $this->db->addTable('properties');
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
        $this->pool = $request->pullGetBoolean('pool', true);
    }

    public function get($view = false)
    {
        $this->prepare();
        if ($this->manager_id) {
            $this->data_table->addFieldConditional('contact_id',
                    $this->manager_id);
        }

        $c1 = $this->db->createConditional($this->data_table->getField('id'),
                $this->photo_table->getField('pid'));
        $c2 = $this->db->createConditional($this->photo_table->getField('porder'),
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
                $this->more_rows = false;
                return array();
            }
            $totalRows = count($result);
            if ($totalRows > $this->limit) {
                $this->more_rows = true;
                // one more row was pulled just for testing
                array_pop($result);
            } else {
                $this->more_rows = false;
            }

            foreach ($result as $prop) {
                $listing[] = $prop->view();
            }
            return $listing;
        } else {
            $result = $this->db->select();
            if (empty($result)) {
                $this->more_rows = false;
                return array();
            }

            $totalRows = count($result);
            if ($totalRows > $this->limit) {
                $this->more_rows = true;
                // one more row was pulled just for testing
                array_pop($result);
            } else {
                $this->more_rows = false;
            }
            return $result;
        }
    }

    protected function addConditionals()
    {
        parent::addConditionals();
        $this->contact_table->addFieldConditional('active', 1);
        $this->contact_table->addFieldConditional('approved', 1);
    }

}
