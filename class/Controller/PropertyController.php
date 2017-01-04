<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace properties\Controller;

use properties\Factory\PropertyFactory as Factory;
use properties\Factory\PhotoFactory as Photo;
use properties\Resource\Property as Resource;
use properties\Factory\ManagerFactory;
use properties\Factory\NavBar;

/**
 * Description of Property.
 *
 * @author Matthew McNaney <mcnaneym@appstate.edu>
 */
class PropertyController extends BaseController
{

    /**
     *
     * @var \properties\Factory\PropertyFactory
     */
    protected $factory;

    /**
     *
     * @var \properties\Resource\Property
     */
    protected $resource;

    public function __construct($module)
    {
        $this->factory = new Factory();
        $this->resource = $this->factory->build();
        parent::__construct($module);
    }

    public function getHtmlView($data, \Request $request)
    {
        \Layout::addStyle('properties');
        try {
            $command = $this->checkCommand($request, 'list');
        } catch (\properties\Exception\ResourceNotFound $e) {
            return $this->errorPage($e);
        } catch (\properties\Exception\BadCommand $e) {
            return $this->errorPage($e);
        }

        $managerId = $request->pullGetInteger('managerId', true);
        switch ($command) {
            case 'list':
                \Layout::addStyle('properties', 'propertyListing.css');
                $content = $this->reactView('property');
                break;

            case 'create';
                \Layout::addStyle('properties', 'propertyForm.css');
                $content = $this->editView($managerId);
                break;

            case 'edit':
                \Layout::addStyle('properties', 'propertyForm.css');
                $content = $this->editView();
                break;

            case 'view':
            default:
                \Layout::addStyle('properties', 'propertyView.css');
                $content = $this->view();
                break;
        }
        $view = new \phpws2\View\HtmlView($content);

        return $view;
    }

    private function updateButton($property_id)
    {
        return <<<EOF
<button class="btn btn-primary btn-sm navbar-btn" onclick="window.location.href='./properties/Property/$property_id/edit'"><i class="fa fa-pencil"></i>&nbsp;Edit property</button>
EOF;
    }

    private function deleteButton($property_id)
    {
        return <<<EOF
<button class="btn btn-danger btn-sm navbar-btn" data-property-id="$property_id" title="Delete property" onClick="deleteProperty.callback()"><i class="fa fa-trash-o"></i>&nbsp;Delete property</button>
EOF;
    }

    private function photoButton($property_id)
    {
        return <<<EOF
<button class="btn btn-primary btn-sm navbar-btn" data-property-id="$property_id" title="Update photos" onClick="editPhotos.callback()"><i class="fa fa-camera"></i>&nbsp;Edit photos</button>
EOF;
    }

    private function view()
    {
        $photoFactory = new Photo;

        $tpl = $this->resource->view();
        $managerFactory = new ManagerFactory;
        $manager = $managerFactory->load($this->resource->contact_id);
        $managerTpl = $manager->view();
        $tpl = array_merge($tpl, $managerTpl);

        $tpl['current_photos'] = json_encode($photoFactory->thumbs($this->resource->id));
        $tpl['photo'] = $this->reactView('photo');
        $tpl['id'] = $this->resource->id;
        $tpl['photoupdate'] = null;
        $tpl['photo_edit_button'] = null;
        $tpl['property_edit_button'] = null;
        if ($this->factory->role->isAdmin() || (int)$this->resource->contact_id === $this->factory->getCurrentLoggedManager()) {
            $tpl['photoupdate'] = $this->reactView('propertyimage');
            $tpl['photo_edit_button'] = $this->photoButton($this->resource->id);
            $tpl['property_edit_button'] = $this->updateButton($this->resource->id);
        }
        $template = new \phpws2\Template($tpl);
        $template->setModuleTemplate('properties', 'property_view.html');
        return $template->get();
    }

    private function editView($managerId = null)
    {
        if ($this->resource->getId()) {
            $property = json_encode($this->resource->getVariablesAsValue(true,
                            array('approved', 'active')));
        } else {
            $this->resource->contact_id = $managerId;
            $managerFactory = new ManagerFactory;
            $manager = $managerFactory->load($this->resource->contact_id);
            $this->resource->company_name = $manager->company_name;

            $property = json_encode($this->resource->getVariablesAsValue(true,
                            array('approved', 'active')));
        }

        $content[] = <<<EOF
<script type="text/javascript">const property = $property;let deleteProperty = () => {}</script>
EOF;
        $content[] = $this->reactView('propertyform');
        return implode('', $content);
    }

    public function getJsonView($data, \Request $request)
    {
        $command = $this->checkCommand($request, 'list');
        if (is_numeric($command)) {
            $propertyId = (int) $command;
            $command = 'view';
        } else {
            $propertyId = $request->pullGetInteger('propertyId', true);
        }

        switch ($command) {
            case 'list':
                $json['properties'] = $this->factory->listing($request, true);
                $manager_id = $request->pullGetInteger('managerId', true);
                if ($manager_id) {
                    $managerFactory = new ManagerFactory();
                    $manager = $managerFactory->load($manager_id);
                    $json['manager'] = $manager->getStringVars();
                } else {
                    $json['manager'] = null;
                }
                break;

            default:
                throw new \phpws2\Http\MethodNotAllowedException();
        }
        $view = new \View\JsonView($json);

        return $view;
    }

    public function post(\Request $request)
    {
        $this->checkCommand($request);

        // Managers post here as well. Make sure they are legit.
        if ($this->factory->role->isManager()) {
            $managerFactory = new ManagerFactory;
            $current_logged_manager = $managerFactory->getCurrentLoggedManager();
            $post_contact_id = $request->pullPostInteger('contact_id');
            if (empty($current_logged_manager) || $current_logged_manager != $post_contact_id) {
                $view = new \View\JsonView(array('error' => 'You do not have property posting privileges'));
                $response = new \Response($view);
                return $response;
            }
        }

        try {
            $result = $this->factory->post($request);
        } catch (\properties\Exception\PropertySaveFailure $e) {
            $result = array('error' => $e->getMessage());
        }
        if ($request->isAjax()) {
            $view = new \View\JsonView($result);
        } else {
            $view = new \View\HtmlView($result);
        }
        $response = new \Response($view);
        return $response;
    }

    public function delete(\Request $request)
    {
        $id = $this->checkCommand($request);

        $this->factory->delete($this->resource);
        if ($request->isAjax()) {
            $view = new \View\JsonView(array('success' => true));
            $response = new \Response($view);
            return $response;
        } else {
            \Server::forward('./properties/Property/');
        }
    }

}
