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

namespace properties\Controller\Reports;

use Canopy\Request;
use properties\Factory\Manager as managerFactory;

class Admin extends \properties\Controller\SubController
{

    protected function loadFactory()
    {
        $factory = new \properties\Factory\Reports;
        return $factory;
    }

    protected function listHtmlCommand(Request $request)
    {
        \Layout::addStyle('properties', 'reports/style.css');
        return $this->factory->reactView('reports');
    }

    protected function inactivityJsonCommand(Request $request)
    {
        $json['list'] = $this->factory->getInactiveManagers($request);
        return $json;
    }
    
    protected function studentsJsonCommand(Request $request)
    {
        $studentList = $this->factory->getStudents($request);
        foreach ($studentList as &$s) {
            $s['checked'] = false;
        }
        $json['list'] = $studentList;
        $json['more_rows'] = $this->factory->more_rows;
        return $json;
    }
    
    protected function overviewJsonCommand(Request $request)
    {
        return $this->factory->getOverview($request);
    }
    
    protected function deleteCommand(Request $request)
    {
        $this->factory->deleteStudent($this->id);
        return array('success'=>true);
    }
    
    protected function downloadHtmlCommand(Request $request)
    {
        $stamp = strftime('%F-%H%M');
        $managerFactory = new managerFactory;
        $unused_values = array('last_log', 'private', 'pw_timeout', 'pw_hash', 'company_map_address', 'admin', 'phone_tel');
        
        $listing = $managerFactory->adminList($request, true);
        if (empty($listing)) {
            return 'Sorry! No managers found in the system.';
        }
        $filepath = '/tmp/' . time() . rand(0, 10) . '.csv';
        $file = fopen($filepath, 'w');
        $keys = array_diff(array_keys($listing[0]), $unused_values);
        fputcsv($file, $keys);
        foreach ($listing as $row) {
            // these variables aren't needed in a report
            foreach ($unused_values as $v) {
                unset($row[$v]);
            }
            fputcsv($file, $row);
        }
        fclose($file);

        if (is_file($filepath)) {
            header('Content-Description: File Transfer');
            header('Content-Type: text/csv');
            header("Content-Disposition: attachment; filename=Current-managers-$stamp.csv");
            header('Expires: 0');
            header('Cache-Control: must-revalidate');
            header('Pragma: no-cache');
            header('Content-Length: ' . filesize($filepath));
            readfile($filepath);
            exit;
        } else {
            return 'Sorry! An error occurred while creating your file.';
        }
    }

}
