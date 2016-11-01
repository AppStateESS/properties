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
                $content = $this->reactView('property');
                break;

            case 'create';
                $content = $this->editView($managerId);
                break;

            case 'view':
                $content = $this->view();
                break;

            case 'edit':
                $content = $this->editView();
                break;
            
            default:
                throw new \properties\Exception\BadCommand;
        }
        $view = new \phpws2\View\HtmlView($content);

        return $view;
    }

    private function view() {
        $tpl = array();
        $tpl['property'] = $this->factory->viewHtml($this->resource);
        $tpl['id'] = $this->resource->id;
        $tpl['update'] = $this->factory->role->allow('edit');
        $tpl['photo'] = $this->reactView('photo');
        $tpl['photoupdate'] = $this->factory->role->allow('edit') ? $this->reactView('propertyimage') : null;
        $template = new \phpws2\Template($tpl);
        $template->setModuleTemplate('properties', 'property_view.html');
        return $template->get();
    }
    
    private function editView($managerId=null)
    {
        if ($this->resource->getId()) {
            $property = json_encode($this->resource->getVariablesAsValue());
        } else {
            $this->resource->contact_id = $managerId;
            $managerFactory = new ManagerFactory;
            $manager = $managerFactory->load($this->resource->contact_id);
            $this->resource->company_name = $manager->company_name;
            
            $property = json_encode($this->resource->getVariablesAsValue(true, array('approved','active')));
        }
        
        $content[] = <<<EOF
<script type="text/javascript">const property = $property</script>
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
                $manager_id = $request->pullGetInteger('managerId', true);
                $json['properties'] = $this->factory->listing($manager_id,
                        $request->pullGetString('search', true),
                        $request->pullGetInteger('limit', true));
                if ($manager_id) {
                    $managerFactory = new ManagerFactory();
                    $manager = $managerFactory->load($manager_id);
                    $json['manager'] = $manager->getStringVars();
                } else {
                    $json['manager'] = null;
                }
                break;
                
            case 'view':
                //$json['property'] = $this->factory->
                break;

            default:
                throw new \phpws2\Http\MethodNotAllowedException();
        }
        $view = new \View\JsonView($json);

        return $view;
    }

    public function post(\Request $request)
    {
        if (!$this->factory->role->allow()) {
            throw new \properties\Exception\PrivilegeMissing;
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
    


}
