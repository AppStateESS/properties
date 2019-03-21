<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace properties\Factory;

use phpws2\Database;
use phpws2\Settings;
use phpws2\Template;
use properties\Resource\Property as Resource;
use properties\Factory\Property\Photo as PropPhoto;
use properties\Factory\Manager;
use properties\Controller\Property as Controller;
use properties\Exception\MissingInput;
use properties\Exception\PrivilegeMissing;
use properties\Factory\NavBar;

/**
 * Description of PropertyFactory
 *
 * @author Matthew McNaney <mcnaneym@appstate.edu>
 */
class Property extends Base
{

    public $more_rows = true;

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
        $photo = new PropPhoto;
        $photo->removeByProperty($property->id);
        self::deleteResource($property);
    }

    public function listing(\Canopy\Request $request, $view = false,
            $admin = false)
    {
        $listing = new Property\Listing();

        if ($admin) {
            $show_inactive = $request->pullGetBoolean('showinactive', true);
            if ($show_inactive === null || $show_inactive === false) {
                $listing->show_inactive = false;
            } else {
                $listing->show_inactive = true;
            }
        }
        $listing->pullVariables($request);
        $result = $listing->get($view);
        $this->more_rows = $listing->more_rows;
        return $result;
    }

    public function post(\Canopy\Request $request)
    {
        $errors = array();
        $r = new Resource;
        try {
            $r->loadPostByType($request,
                    array('active', 'company_name', 'heat_type', 'created', 'updated', 'thumbnail', 'timeout'));
            $heat_type = $request->pullPostVar('heat_type');
            if (empty($heat_type)) {
                $heat_type = array();
            }
            $r->heat_type = $heat_type;
            $r->active = true;
            $r->created = time();
            $r->updated = time();
        } catch (\Exception $e) {
            throw new \properties\Exception\PropertySaveFailure($e->getMessage());
        }
        return $r;
    }

    /**
     * Checks to see if the property inactive timeout check has passed.
     * updatePropertyTimeout does the setting update
     * @return boolean
     */
    public function propertyTimeoutPast()
    {
        $timeout = Settings::get('properties', 'property_timeout');
        return $timeout < time();
    }

    /**
     * Sets the property timeout 30 days in advance
     */
    public function updatePropertyTimeout()
    {
        Settings::set('properties', 'property_timeout',
                time() + PROPERTIES_FORWARD_TIMEOUT);
    }

    /**
     * Flips properties that have passed the timeout
     */
    public function flipPropertyTimeout()
    {
        $db = Database::getDB();
        $tbl = $db->addTable('properties');
        $tbl->addFieldConditional('timeout', time(), '<');
        $tbl->addFieldConditional('active', 1);
        $tbl->addValue('active', 0);
        return $db->update();
    }

    public function save(Resource $property)
    {
        $property->forwardTimeout();
        $property->updated = time();
        self::saveResource($property);
        return $property->id;
    }

    public function put(\Canopy\Request $request, $manager_id = null)
    {
        $errors = array();
        $r = $this->load($request->pullPutInteger('id'), $manager_id);

        try {
            $hide = array('active', 'company_name', 'heat_type', 'created',
                'updated', 'thumbnail', 'timeout');

            $r->loadPutByType($request, $hide);
            $heat_type = $request->pullPutVar('heat_type');
            if (empty($heat_type)) {
                $heat_type = array();
            }
            $r->heat_type = $heat_type;
            self::save($r);
            return array('id' => $r->getId());
        } catch (\Exception $e) {
            throw new \properties\Exception\PropertySaveFailure($e->getMessage());
        }
    }

    public function backLink()
    {
        if (isset($_SERVER['HTTP_REFERER']) && stristr($_SERVER['HTTP_REFERER'],
                        'properties/Property/list')) {
            NavBar::addItem('<a class="btn btn-link navbar-btn pointer" onClick="window.history.back()"><i class="fa fa-list"></i>&nbsp;Back to list</a>');
        } else {
            NavBar::addItem('<a class="btn btn-link navbar-btn" href="./properties/Property/list"><i class="fa fa-list"></i>&nbsp;Back to list</a>');
        }
    }

    public function view($property, $admin = false)
    {
        $this->backLink();
        if (empty($property)) {
            throw new \properties\Exception\ResourceNotFound($property);
        }
        if (is_numeric($property)) {
            $property = $this->load($property);
        } elseif (!is_a($property, 'properties\Resource\Property')) {
            throw new \properties\Exception\ResourceNotFound();
        }

        if (!$property->active && !$admin) {
            return "<p>This property is not currently available.</p>";
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

        $tpl['amenitiesTemplate'] = PHPWS_SOURCE_DIR . 'mod/properties/templates/property/Amenities.html';
        $tpl['petsTemplate'] = PHPWS_SOURCE_DIR . 'mod/properties/templates/property/Pets.html';
        $tpl['otherInformationTemplate'] = PHPWS_SOURCE_DIR . 'mod/properties/templates/property/OtherInformation.html';
        $tpl['expensesTemplate'] = PHPWS_SOURCE_DIR . 'mod/properties/templates/property/Expenses.html';
        $tpl['utilitiesTemplate'] = PHPWS_SOURCE_DIR . 'mod/properties/templates/property/Utilities.html';
        $tpl['imburseTemplate'] = PHPWS_SOURCE_DIR . 'mod/properties/templates/property/Imburse.html';

        $this->includeVendor();
        $photoFactory = new PropPhoto;
        $tpl['inactive_warning'] = $property->active == 0;
        $tpl['currentPhotos'] = json_encode($photoFactory->thumbs($property->id));
        $tpl['id'] = $property->id;
        $tpl['photoupdate'] = null;
        $tpl['delete'] = null;
        $tpl['photo_edit_button'] = null;
        if ($admin) {
            $property_id = $property->id;
            NavBar::addOption('<a class="dropdown-item" id="delete-property-button"><i class="far fa-trash-alt"></i>&nbsp;Delete property</a>',
                    true);
            NavBar::addOption("<a class='dropdown-item' href='properties/Property/$property_id/edit'><i class='fa fa-edit'></i>&nbsp;Edit property</a>",
                    true);
            NavBar::addOption('<a id="edit-photo-button" class="dropdown-item pointer"><i class="fa fa-camera"></i>&nbsp;Edit photos</a>',
                    true);
            NavBar::setTitle('Property options');
            $tpl['photoupdate'] = $this->reactView('propertyimage', false);
            $tpl['delete'] = $this->reactView('propertydelete', false);
        }
        $tpl['photo'] = $this->reactView('PhotoGallery');

        $template = new \phpws2\Template($tpl);
        $template->setModuleTemplate('properties', 'property/view.html');
        return $template->get();
    }

    private function photoButton($property_id)
    {
        return <<<EOF
<button id="edit-photo-button" class="btn btn-primary btn-sm navbar-btn mr-1" data-property-id="$property_id" title="Update photos"><i class="fa fa-camera"></i>&nbsp;Edit photos</button>
EOF;
    }

    public function patch($id, $param, $value, $manager_id = null)
    {
        static $allowed_params = array('active');

        if (!in_array($param, $allowed_params)) {
            throw new \Exception('Parameter may not be patched');
        }
        $property = $this->load($id, $manager_id);
        $property->$param = $value;
        $property->updated = time();
        $this->save($property);
        return true;
    }

    private function addManagerInfo(array $tpl,
            \properties\Resource\Manager $manager)
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
                            null, true));
        } elseif ($manager_id) {
            $property = $this->build();
            $property->contact_id = $manager_id;
            $managerFactory = new Manager;
            $manager = $managerFactory->load($manager_id);
            $property->company_name = $manager->company_name;
            $property_json = json_encode($property->getVariablesAsValue(true,
                            array('active'), true));
        } else {
            throw new \properties\Exception\ResourceNotFound;
        }

        $content[] = <<<EOF
<script type="text/javascript">const property = $property_json;let activate = () => {};let deactivate = () => {}</script>
EOF;
        $content[] = $this->reactView('propertyform');
        return implode('', $content);
    }

    public function activeCount()
    {
        $db = Database::getDB();
        $tbl = $db->addTable('properties');
        $id = $tbl->getField('id');
        $exp = $db->getExpression("count($id)", 'property_count');
        $tbl->addFieldConditional('active', 1);
        $tbl->addField($exp);
        return $db->selectColumn();
    }

}
