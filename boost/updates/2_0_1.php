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

class update_2_0_1
{

    public function run()
    {
        $updates = array();
        $updates[] = 'Added "Walking distance to campus" distance option';

        $this->changePropertySmokingColumn();
        $this->changeSubleaseSmokingColumn();
        $updates[] = 'Smoking allowed changed to contrasting no_smoking column';

        $this->addPool();
        $updates[] = 'Swimming pool added as an amenity';

        return $updates;
    }

    private function changePropertySmokingColumn()
    {
        $db = \phpws2\Database::getDB();
        $tbl = $db->addTable('properties');

        if (!$tbl->columnExists('no_smoking')) {
            $dt = $tbl->addDataType('no_smoking', 'smallint');
            $dt->setDefault(0);
            $dt->add();
        }

        if ($tbl->columnExists('smoking_allowed')) {
            $tbl->dropColumn('smoking_allowed');
        }
    }

    private function changeSubleaseSmokingColumn()
    {
        $db = \phpws2\Database::getDB();
        $tbl = $db->addTable('prop_sublease');

        if (!$tbl->columnExists('no_smoking')) {
            $dt = $tbl->addDataType('no_smoking', 'smallint');
            $dt->setDefault(0);
            $dt->add();
        }

        if ($tbl->columnExists('smoking_allowed')) {
            $tbl->dropColumn('smoking_allowed');
        }
    }

    private function addPool()
    {
        $db = \phpws2\Database::getDB();
        $tbl = $db->addTable('properties');

        if (!$tbl->columnExists('pool')) {
            $dt = $tbl->addDataType('pool', 'smallint');
            $dt->setDefault(0);
            $dt->add();
        }
    }

}
