<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace properties\Controller;

use properties\Factory\PropertyFactory as Factory;
use properties\Factory\ManagerFactory;

/**
 * Description of Property.
 *
 * @author Matthew McNaney <mcnaneym@appstate.edu>
 */
class PropertyController extends BaseController
{

    private $factory;

    public function __construct($module)
    {
        parent::__construct($module);
        $this->factory = new Factory();
    }

    public function getHtmlView($data, \Request $request)
    {
        $this->role->setController('property');
        \Layout::addStyle('properties');
        $command = $this->checkCommand($request, 'list');
        if (is_numeric($command)) {
            $propertyId = (int) $command;
            $command = 'view';
        } else {
            $propertyId = $request->pullGetInteger('propertyId', true);
        }
        $managerId = $request->pullGetInteger('managerId', true);
        switch ($command) {
            case 'list':
                $content = $this->reactView('property');
                break;

            case 'create';
                $content = $this->reactView('propertyform');
                break;

            case 'view':
                $content = 'property view';
                break;

            default:
                throw new \properties\Exception\BadCommand;
        }
        $view = new \phpws2\View\HtmlView($content);

        return $view;
    }

    public function getJsonView($data, \Request $request)
    {
        $this->role->setController('property');
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

            default:
                throw new \phpws2\Http\MethodNotAllowedException();
        }
        $view = new \View\JsonView($json);

        return $view;
    }

    public function post(\Request $request)
    {
        $this->role->setController('property');
        if (!$this->role->allow()) {
            throw new \properties\Exception\PrivilegeMissing;
        }
        try {
            $result = $this->factory->post($request);
        } catch (\properties\Exception\PropertySaveFailure $e) {
            $result = array('error'=>$e->getMessage());
        }
        if($request->isAjax()) {
            $view = new \View\JsonView($result);
        } else {
            $view = new \View\HtmlView($result);
        }
        $response = new \Response($view);
        return $response;
    }

}
