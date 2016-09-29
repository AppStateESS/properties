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
    
    public function getPhotos($id, $as_resource=false)
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
}
