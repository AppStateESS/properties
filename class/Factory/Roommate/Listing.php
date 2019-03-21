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
    public $focus;
    public $wake_time;
    public $sleep_time;
    public $free_time;
    public $pets;
    public $smoking;
    public $show_inactive = false;
    public $more_rows = true;
    public $limit = 10;
    public $moveinnow = false;
    public $offset = 0;
    public $searchName;
    public $allowSearchName = false;

    public function pullVariables(\Canopy\Request $request)
    {
        $this->offset = $request->pullGetInteger('offset', true);
        $this->focus = $request->pullGetString('focus', true);
        $this->wake_time = $request->pullGetString('wake_time', true);
        $this->sleep_time = $request->pullGetString('sleep_time', true);
        $this->free_time = $request->pullGetString('free_time', true);
        $this->pets = $request->pullGetString('pets', true);
        $this->smoking = $request->pullGetString('smoking', true);
        $this->moveinnow = $request->pullGetBoolean('moveinnow', true);
        if ($this->allowSearchName) {
            $this->searchName = $request->pullGetString('searchName', true);
        }
    }

    public function get()
    {
        $db = \phpws2\Database::getDB();
        $tbl = $db->addTable('prop_roommate');

        if ((int) $this->limit <= 0 || (int) $this->limit > 10) {
            $this->limit = 10;
        }
        
        $offset = $this->offset * $this->limit;
        $db->setLimit($this->limit + 1, $offset);

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

        $this->addConditionals($tbl);

        $result = $db->selectAsResources('\properties\Resource\Roommate');
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

        foreach ($result as $rm) {
            /* @var $rm \properties\Resource\Roommate */
            $listing[] = $rm->view(true, true);
        }
        return $listing;
    }

    /**
     * 
     * @param \phpws2\Database\Table $tbl
     */
    private function addConditionals(&$tbl)
    {
        if ($this->show_inactive === false) {
            $tbl->addFieldConditional('active', 1);
        }

        if ($this->focus) {
            $tbl->addFieldConditional('focus', $this->focus);
        }

        if ($this->wake_time) {
            $tbl->addFieldConditional('wake_time', $this->wake_time);
        }

        if ($this->sleep_time) {
            $tbl->addFieldConditional('sleep_time', $this->sleep_time);
        }

        if ($this->free_time) {
            $tbl->addFieldConditional('free_time', $this->free_time);
        }

        if ($this->pets) {
            $tbl->addFieldConditional('pets', $this->pets);
        }

        if ($this->smoking) {
            $tbl->addFieldConditional('smoking', $this->smoking);
        }

        if ($this->moveinnow) {
            $tbl->addFieldConditional('move_in_date', time(), '<');
        }
        
        if ($this->allowSearchName && !empty($this->searchName)) {
            $tbl->addFieldConditional('name', "%{$this->searchName}%", 'like');
        }
    }

}
