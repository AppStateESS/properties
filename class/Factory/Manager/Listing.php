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

namespace properties\Factory\Manager;

use phpws2\Database;
use properties\Resource\Manager as Resource;
use properties\Exception\MissingInput;
use properties\Exception\PrivilegeMissing;

class Listing
{

    private $limit = 50;
    public $search = null;
    public $active = 1; // null pulls all
    public $approved = 1; // null pulls all
    public $include_property_count = true;
    public $restricted = true;
    public $view = false;
    public $orderby = null;
    public $orderby_dir = 'asc';

    public function get()
    {
        $db = Database::getDB();
        $tbl = $db->addTable('prop_contacts');
        if ($this->include_property_count) {
            $tbl2 = $db->addTable('properties');
            $tbl2->addField('id', 'property_count')->showCount();
        }

        $db->setLimit($this->limit);

        // avoiding the password field
        $tbl->addField('id');
        $tbl->addField('username');
        $tbl->addField('phone');
        $tbl->addField('email_address');
        $tbl->addField('company_name');
        $tbl->addField('company_address');
        $tbl->addField('company_url');
        $tbl->addField('times_available');
        $tbl->addField('first_name');
        $tbl->addField('last_name');
        $tbl->addField('last_log');
        $tbl->addField('active');
        $tbl->addField('approved');
        $tbl->addField('last_inquiry');

        if ($this->include_property_count) {
            $join_conditional = $db->createConditional($tbl->getField('id'),
                    $tbl2->getField('contact_id'));
            $db->joinResources($tbl, $tbl2, $join_conditional, 'left');
        }

        if (!empty($this->search)) {
            $this->addSearch($db);
        }
        if ($this->active !== null) {
            $tbl->addFieldConditional('active', $this->active);
        }
        if ($this->approved !== null) {
            $tbl->addFieldConditional('approved', $this->approved);
        }
        $db->setGroupBy($tbl->getField('id'));
        if ($this->orderby) {
            $tbl->addOrderBy($this->orderby, $this->orderby_dir);
        }
        $sql = $db->selectQuery();
        if ($this->view) {
            $result = $db->selectAsResources('\properties\Resource\Manager');
            if (empty($result)) {
                return array();
            }
            foreach ($result as $manager) {
                $listing[] = $manager->view($this->restricted);
            }
            return $listing;
        } else {
            $result = $db->select();
            return $result;
        }
    }

    private function formatSearch()
    {
        return '%' . $this->search . '%';
    }

    public function __set($varname, $value)
    {
        if ($varname === 'limit' && $value >= 1) {
            $this->limit = $value;
        }
    }

    private function addSearch($db)
    {
        $search_string = $this->formatSearch();
        $s1 = $db->createConditional($tbl->getField('username'), $search_string,
                'like');
        $s2 = $db->createConditional($tbl->getField('first_name'),
                $search_string, 'like');
        $s3 = $db->createConditional($tbl->getField('last_name'),
                $search_string, 'like');
        $s4 = $db->createConditional($tbl->getField('company_name'),
                $search_string, 'like');
        $sf1 = $db->createConditional($s1, $s2, 'or');
        $sf2 = $db->createConditional($s3, $s4, 'or');
        $conditional = $db->createConditional($sf1, $sf2, 'or');
        $db->addConditional($conditional);
    }

}
