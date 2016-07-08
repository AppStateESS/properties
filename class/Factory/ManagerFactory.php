<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace properties\Factory;

use \phpws2\Database;
use \properties\Resource\Manager as Resource;

/**
 * Description of ManagerFactory
 *
 * @author Matthew McNaney <mcnaneym@appstate.edu>
 */
class ManagerFactory extends Base
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

    public function listingJson($limit = 100)
    {
        $db = Database::getDB();
        $tbl = $db->addTable('prop_contacts');
        if ((int) $limit > 0) {
            $db->setLimit(100);
        }
        $result = $db->select();
        if (empty($result)) {
            return null;
        }
        $result = \phpws2\ResourceFactory::makeResourceStringArray($result,
                        '\properties\Resource\Manager');
        return $result;
    }

    public function post()
    {
        $r = new Resource;
        try {
            $r->username = strtolower($this->pullPostString('username'));
            $r->password = $this->pullPostString('password');
            $r->first_name = $this->pullPostString('first_name');
            $r->last_name = $this->pullPostString('last_name');
            $r->phone = $this->pullPostString('phone');
            $r->email_address = strtolower($this->pullPostString('email_address'));
            $r->company_name = $this->pullPostString('company_name');
            $r->company_address = $this->pullPostString('company_address');
            $r->company_url = $this->pullPostString('company_url');
            $r->times_available = $this->pullPostString('times_available');
            $this->saveResource($r);
            $json = array('status' => 'done');
        } catch (\properties\Exception\MissingInput $e) {
            $json = array('status' => 'usererror', 'error' => $e->getMessage());
        } catch (\Exception $e) {
            $json = array('status' => 'fail', 'error' => 'An unrecoverable error occurred.');
        }

        return $json;
    }

    public function checkUsername($username)
    {
        $db = Database::getDB();
        $tbl = $db->addTable('prop_contacts');
        $tbl->addFieldConditional('username', strtolower($username), 'like');
        $tbl->addField('id');
        $result = $db->selectOneRow();
        return (bool) $result;
    }

    public function checkEmail($email)
    {
        $db = Database::getDB();
        $tbl = $db->addTable('prop_contacts');
        $tbl->addFieldConditional('email_address', strtolower($email), 'like');
        $tbl->addField('id');
        $result = $db->selectOneRow();
        return (bool) $result;
    }

}
