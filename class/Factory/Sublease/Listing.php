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

    public function __construct()
    {
        parent::__construct();
        $this->data_table = $this->db->addTable('prop_sublease');
        $this->photo_table = $this->db->addTable('prop_sub_photo');
        $this->photo_table->addField('path', 'thumbnail');
    }

    public function get($view = false)
    {
        $this->prepare();

        $c1 = $this->db->createConditional($this->data_table->getField('id'),
                $this->photo_table->getField('sid'));

        $this->db->joinResources($this->data_table, $this->photo_table, $c1,
                'left');

        $this->addConditionals();
        if ($view) {
            $result = $this->db->selectAsResources('\properties\Resource\Sublease');
            if (empty($result)) {
                $this->more_rows = false;
                return array();
            }
            if (count($result) < $this->limit) {
                $this->more_rows = false;
            }
            foreach ($result as $sublease) {
                $listing[] = $sublease->view();
            }
            return $listing;
        } else {
            $result = $this->db->select();
            if (count($result) < $this->limit) {
                $this->more_rows = false;
            }
            return $result;
        }
    }

}
