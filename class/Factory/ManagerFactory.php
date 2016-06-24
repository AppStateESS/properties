<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace properties\Factory;

use \phpws2\Database;

/**
 * Description of ManagerFactory
 *
 * @author Matthew McNaney <mcnaneym@appstate.edu>
 */
class ManagerFactory
{

    public function listView()
    {
        if (PROPERTIES_REACT_DEV) {
            $script[] = \properties\Factory\React::development('Mixin/',
                            'Mixins.js');
            $script[] = \properties\Factory\React::development('Mixin/',
                            'Modal.js');
            $script[] = \properties\Factory\React::development('Manager/',
                            'Listing.js');
        } else {
            $script[] = \properties\Factory\React::production('Mixin/',
                            'script.min.js');
            $script[] = \properties\Factory\React::production('Manager/',
                            'script.min.js');
        }
        $react = implode("\n", $script);
        //\Layout::addStyle('properties', 'style.css');
        //$icons = json_encode(\properties\Factory\Base::categoryIcons());
        $content = <<<EOF
<div id="manager"></div>
$react
EOF;
        return $content;
    }

    public function listingJson()
    {
        $db = Database::getDB();
        $db->addTable('prop_contacts');
        return $db->select();
    }
}
