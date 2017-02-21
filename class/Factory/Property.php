<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace properties\Factory;

use properties\Resource\Property as Resource;
use properties\Factory\Property\Photo as Photo;
use properties\Factory\Manager;
use properties\Controller\Property as Controller;
use phpws2\Database;
use properties\Exception\MissingInput;
use properties\Exception\PrivilegeMissing;

/**
 * Description of PropertyFactory
 *
 * @author Matthew McNaney <mcnaneym@appstate.edu>
 */
class Property extends Base
{

    /**
     * 
     * @return \properties\Resource\Property
     */
    public function build()
    {
        return new Resource;
    }

    /**
     * 
     * @param integer $id
     * @param integer $manager_id If set, then test against it on query
     * @return \properties\Resource\Property
     * @throws \properties\Exception\ResourceNotFound
     */
    public function load($id, $manager_id = 0)
    {
        $db = Database::getDB();
        $tbl = $db->addTable('properties');
        $tbl2 = $db->addTable('prop_contacts');
        $tbl2->addField('company_name');
        $tbl->addFieldConditional('id', $id);
        $tbl->addFieldConditional('contact_id', $tbl2->getField('id'));

        if ($manager_id) {
            $tbl->addFieldConditional('contact_id', $manager_id);
        }
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

    public function listing(\Canopy\Request $request, $view = false)
    {
        $listing = new Property\Listing();
        $listing->pullVariables($request);
        return $listing->get($view);
    }

    public function post(\Canopy\Request $request)
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
        } catch (\Exception $e) {
            throw new \properties\Exception\PropertySaveFailure($e->getMessage());
        }
        return $r;
    }

    public function save(Resource $property)
    {
        self::saveResource($property);
        return $property->id;
    }

    public function postManager(\Canopy\Request $request, $manager_id)
    {
        $r = new Resource;
        exit('postManager incomplete');
    }

    public function put(\Canopy\Request $request)
    {
        $errors = array();
        $r = $this->load($request->pullPutInteger('id'));
        
        try {
            $r->loadPutByType($request,
                    array('active', 'approved', 'company_name', 'heat_type', 'created', 'updated', 'thumbnail'));
            $heat_type = $request->pullPutVar('heat_type');
            if (empty($heat_type)) {
                $heat_type = array();
            }
            $r->heat_type = $heat_type;
            $r->updated = time();
            self::saveResource($r);
            return array('id' => $r->getId());
        } catch (\Exception $e) {
            throw new \properties\Exception\PropertySaveFailure($e->getMessage());
        }
    }

    public function view($property, $admin = false)
    {
        if (empty($property)) {
            throw new \properties\Exception\ResourceNotFound($property);
        }
        if (is_numeric($property)) {
            $property = $this->load($property);
        } elseif (!is_a($property, 'properties\Resource\Property')) {
            throw new \properties\Exception\ResourceNotFound;
        }
        $managerFactory = new Manager;
        $manager = $managerFactory->load($property->contact_id);

        $tpl = $this->addManagerInfo($property->view(), $manager);
        
        if (!$manager->active || !$manager->approved) {
            if ($admin) {
                $tpl['manager_warning'] = 'This property\'s owner is currently deactivated.';
            } else {
                \phpws2\Error::errorPage('404');
            }
        }

        $photoFactory = new Photo;
        $tpl['current_photos'] = json_encode($photoFactory->thumbs($property->id));
        $tpl['photo'] = $this->reactView('photo');
        $tpl['id'] = $property->id;
        $tpl['photoupdate'] = null;
        $tpl['photo_edit_button'] = null;
        $tpl['property_edit_button'] = null;

        if ($admin) {
            NavBar::addItem($this->updateButton($property->id));
            NavBar::addItem($this->photoButton($property->id));
            $tpl['photoupdate'] = $this->reactView('propertyimage');
            $tpl['property_edit_button'] = null;
        }

        $template = new \phpws2\Template($tpl);
        $template->setModuleTemplate('properties', 'property/view.html');
        return $template->get();
    }

    private function photoButton($property_id)
    {
        return <<<EOF
<button class="btn btn-primary btn-sm navbar-btn" data-property-id="$property_id" title="Update photos" onClick="editPhotos.callback()" style="margin-right:6px"><i class="fa fa-camera"></i>&nbsp;Edit photos</button>
EOF;
    }

    private function updateButton($property_id)
    {
        return <<<EOF
<button class="btn btn-primary btn-sm navbar-btn" onclick="window.location.href='./properties/Property/$property_id/edit'" style="margin-right:6px"><i class="fa fa-edit"></i>&nbsp;Update property</button>
EOF;
    }

    private function deleteButton($property_id)
    {
        return <<<EOF
<button class="btn btn-danger btn-sm navbar-btn" data-property-id="$property_id" title="Delete property" onClick="deleteProperty.callback()" style="margin-right:6px"><i class="fa fa-trash-o"></i>&nbsp;Delete property</button>
EOF;
    }

    private function addManagerInfo(array $tpl, \properties\Resource\Manager $manager)
    {
        $managerTpl = $manager->view(true);
        $finaltpl = array_merge($tpl, $managerTpl);
        return $finaltpl;
    }

    public function edit($property_id, $manager_id = null)
    {
        if ($property_id) {
            $property = $this->load($property_id, $manager_id);
            $property_json = json_encode($property->getVariablesAsValue(true,
                            array('approved', 'active'), true));
        } elseif ($manager_id) {
            $property = $this->build();
            $property->contact_id = $manager_id;
            $managerFactory = new Manager;
            $manager = $managerFactory->load($manager_id);
            $property->company_name = $manager->company_name;
            $property_json = json_encode($property->getVariablesAsValue(true,
                            array('approved', 'active'), true));
        } else {
            throw new \properties\Exception\ResourceNotFound;
        }

        $content[] = <<<EOF
<script type="text/javascript">const property = $property_json;let deleteProperty = () => {}</script>
EOF;
        $content[] = $this->reactView('propertyform');
        return implode('', $content);
    }

}
