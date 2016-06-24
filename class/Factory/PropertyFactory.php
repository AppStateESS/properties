<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace properties\Factory;

use \phpws2\Database;

/**
 * Description of PropertyFactory
 *
 * @author Matthew McNaney <mcnaneym@appstate.edu>
 */
class PropertyFactory
{

    public function listView()
    {
        if (PROPERTIES_REACT_DEV) {
            $script[] = \properties\Factory\React::development('Mixin/',
                            'Mixins.js');
            $script[] = \properties\Factory\React::development('Property/',
                            'Listing.js');
        } else {
            $script[] = \properties\Factory\React::production('Mixin/',
                            'script.min.js');
            $script[] = \properties\Factory\React::production('Property/',
                            'script.min.js');
        }
        $react = implode("\n", $script);
        $content = <<<EOF
<div id="properties"></div>
$react
EOF;

        return $content;
    }

    public function listingJson()
    {
        $db = Database::getDB();
        $db->addTable('');
    }

}
