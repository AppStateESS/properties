<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace properties\Factory;

use \properties\Resource\Property as Resource;
use \properties\Factory\PhotoFactory;
use \properties\Factory\ManagerFactory;
use \properties\Controller\Property as Controller;
use \phpws2\Database;
use \properties\Exception\MissingInput;

/**
 * Description of PropertyFactory
 *
 * @author Matthew McNaney <mcnaneym@appstate.edu>
 */
class PropertyFactory extends BaseFactory
{

    public function __construct()
    {
        parent::__construct('property');
    }

    /**
     * 
     * @return \properties\Resource\Property
     */
    public function build()
    {
        return new Resource;
    }

    public function load($id)
    {
        $db = Database::getDB();
        $tbl = $db->addTable('properties');
        $tbl2 = $db->addTable('prop_contacts');
        $tbl2->addField('company_name');
        $tbl->addFieldConditional('id', $id);
        $tbl->addFieldConditional('contact_id', $tbl2->getField('id'));
        $row = $db->selectOneRow();
        if (empty($row)) {
            throw new \properties\Exception\ResourceNotFound;
        }
        $property = $this->build();
        $property->setVars($row);
        return $property;
    }

    public function delete(Resource $property)
    {
        $photo = new PhotoFactory;
        $photo->removeByProperty($property->id);
        $property->delete();
    }

    
    public function listing(\Request $request, $view=false) {
        $listing = new Property\Listing();
        $listing->pullVariables($request);
        return $listing->get($view);
    }

    public function post(\Request $request)
    {
        $errors = array();
        $r = new Resource;
        try {
            $r->loadPostByType($request,
                    array('active', 'approved', 'company_name', 'heat_type', 'created', 'updated', 'thumbnail'));
            $heat_type = $request->pullPostVar('heat_type');
            if (empty($heat_type)) {
                $heat_type = array();
            }
            $r->heat_type = $heat_type;
            $r->active = true;
            $r->approved = true;
            $r->created = time();
            $r->updated = time();
            self::saveResource($r);
            return array('id' => $r->id);
        } catch (\Exception $e) {
            throw new \properties\Exception\PropertySaveFailure($e->getMessage());
        }
    }
}
