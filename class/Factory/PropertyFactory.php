<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace properties\Factory;

use \properties\Resource\Property as Resource;
use \phpws2\Database;
use \properties\Exception\MissingInput;

/**
 * Description of PropertyFactory
 *
 * @author Matthew McNaney <mcnaneym@appstate.edu>
 */
class PropertyFactory extends BaseFactory
{

    protected function build()
    {
        return new Resource;
    }

    public function delete($id)
    {
        if (empty($id) || !is_numeric($id)) {
            throw new \Exception('Property id invalid');
        }
        $db = Database::getDB();
        $tbl = $db->addTable('properties');
        $tbl->addFieldConditional('id', $id);
        $db->delete();
        $this->removePhotos($id);
    }

    public function removePhotos($id)
    {
        if (empty($id) || !is_numeric($id)) {
            throw new \Exception('Property id invalid');
        }
        $photo_list = $this->getPhotos($id, true);
        if (empty($photo_list)) {
            return true;
        }

        $photoFactory = new PhotoFactory;
        foreach ($photo_list as $photo) {
            $photoFactory->delete($photo);
        }
    }

    public function getPhotos($id, $as_resource = false)
    {
        if (empty($id) || !is_numeric($id)) {
            throw new \Exception('Property id invalid');
        }
        $db = Database::getDB();
        $img_tbl = $db->addTable('prop_photo');
        $img_tbl->addFieldConditional('pid', $id);
        $result = $db->selectAsResources('\properties\Resource\Photo');
        return $result;
    }

    public function listing($manager_id = 0, $search = null, $limit = 100)
    {
        $db = Database::getDB();
        $tbl = $db->addTable('properties');
        if ((int) $limit <= 0) {
            $limit = 100;
        }
        $db->setLimit($limit);
        if (!empty($search)) {
            $search_string = "%$search%";
            $s1 = $db->createConditional($tbl->getField('name'), $search_string,
                    'like');
            $s2 = $db->createConditional($tbl->getField('address'),
                    $search_string, 'like');
            $conditional = $db->createConditional($s1, $s2, 'or');
            $db->addConditional($conditional);
        }
        if ($manager_id) {
            $tbl->addFieldConditional('contact_id', $manager_id);
        }
        $result = $db->select();
        return $result;
    }

}
