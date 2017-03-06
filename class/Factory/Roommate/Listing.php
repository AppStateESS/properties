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

namespace properties\Factory\Roommate;

class Listing
{

    public $identify = false;

    public function pullVariables(\Canopy\Request $request)
    {
        
    }

    public function get()
    {
        $db = \phpws2\Database::getDB();
        $tbl = $db->addTable('prop_roommate');

        if ($this->identify) {
            $tbl->addField('email');
            $tbl->addField('facebook');
            $tbl->addField('instagram');
            $tbl->addField('twitter');
            $tbl->addField('name');
            $tbl->addField('phone');
        }

        $tbl->addField('id');
        $tbl->addField('cleanliness');
        $tbl->addField('created');
        $tbl->addField('description');
        $tbl->addField('focus');
        $tbl->addField('free_time');
        $tbl->addField('hobbies');
        $tbl->addField('languages');
        $tbl->addField('loudness');
        $tbl->addField('major');
        $tbl->addField('move_in_date');
        $tbl->addField('music');
        $tbl->addField('overnighter');
        $tbl->addField('pets');
        $tbl->addField('politics');
        $tbl->addField('sleep_time');
        $tbl->addField('smoking');
        $tbl->addField('study_time');
        $tbl->addField('updated');
        $tbl->addField('wake_time');
        $result = $db->selectAsResources('\properties\Resource\Roommate');
        if (empty($result)) {
            return array();
        }
        foreach ($result as $rm) {
            /* @var $rm \properties\Resource\Roommate */
            $listing[] = $rm->view(true, true);
        }
        return $listing;
    }

}
