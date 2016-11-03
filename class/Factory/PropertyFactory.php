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

    public function delete($id)
    {
        if (empty($id) || !is_numeric($id)) {
            throw new \Exception('Property id invalid');
        }
        $photo = new PhotoFactory;
        $photo->removePhotos($id);
        $db = Database::getDB();
        $tbl = $db->addTable('properties');
        $tbl->addFieldConditional('id', $id);
        $db->delete();
    }


    public function listing($manager_id = 0, $view = false, $search = null,
            $limit = 100)
    {
        $db = Database::getDB();
        $tbl = $db->addTable('properties');
        $tbl2 = $db->addTable('prop_contacts');
        $tbl2->addField('company_name');

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
        $tbl->addFieldConditional('contact_id', $tbl2->getField('id'));
        if ($view) {
            $result = $db->selectAsResources('\properties\Resource\Property');
            foreach ($result as $prop) {
                $listing[] = $prop->view();
            }
            return $listing;
        } else {
            $result = $db->select();
            return $result;
        }
    }

    public function post(\Request $request)
    {
        $errors = array();
        $r = new Resource;
        try {
            $r->loadPostByType($request,
                    array('active', 'approved', 'company_name', 'heat_type', 'created', 'updated'));
            $r->heat_type = json_encode($request->pullPostVar('heat_type'));
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

    public function viewHtml($resource)
    {
        $propertyTpl = $resource->view();
        $managerFactory = new ManagerFactory;
        $manager = $managerFactory->load($resource->contact_id);
        $managerTpl = $manager->view();
        $view = array_merge($propertyTpl, $managerTpl);
        $tpl = new \phpws2\Template($view);
        $tpl->setModuleTemplate('properties', 'property.html');
        return $tpl->get();
    }

}
