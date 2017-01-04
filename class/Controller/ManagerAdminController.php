<?php

/*
 * See docs/AUTHORS and docs/COPYRIGHT for relevant info.
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * @author Matthew McNaney <mcnaney at gmail dot com>
 *
 * @license http://opensource.org/licenses/lgpl-3.0.html
 */

namespace properties\Controller;

use properties\Factory\ManagerFactory as Factory;

class ManagerAdminController extends BaseController
{

    /**
     * @var properties\Factory\ManagerFactory
     */
    protected $factory;

    public function __construct($module)
    {
        parent::__construct($module);
        $this->factory = new Factory('manageradmin');
    }

    public function getHtmlView($data, \Request $request)
    {
        try {
            $command = $this->checkCommand($request, 'list');
        } catch (\properties\Exception\ResourceNotFound $e) {
            return $this->errorPage($e);
        } catch (\properties\Exception\BadCommand $e) {
            return $this->errorPage($e);
        }

        \Layout::addStyle('properties');
        switch ($command) {
            case 'create';
                \Layout::addStyle('properties', 'propertyForm.css');
                $content = $this->editView(0,
                        $request->pullGetInteger('managerId'));
                break;

            case 'edit':
                \Layout::addStyle('properties', 'propertyForm.css');
                $content = $this->editView($request->pullGetInteger('propertyId'));
                break;

            default:
                throw new \properties\Exception\BadCommand;
        }
        $view = new \phpws2\View\HtmlView($content);
        return $view;
    }

    public function delete(\Request $request)
    {
        if (!$this->factory->role->allow()) {
            throw new \properties\Exception\PrivilegeMissing;
        }
        $id = $request->pullGetInteger('managerId');
        if ($id === false) {
            throw new \phpws2\Exception\ValueNotSet('Manager id not set');
        }
        $json = array('success' => $this->factory->delete($id));
        $view = new \View\JsonView($json);
        $response = new \Response($view);
        return $response;
    }

    public function post(\Request $request)
    {
        if (!$this->factory->role->allow()) {
            throw new \properties\Exception\PrivilegeMissing;
        }
        $json = $this->factory->adminPost($request);

        $view = new \View\JsonView($json);
        $response = new \Response($view);
        return $response;
    }

    public function put(\Request $request)
    {
        $command = $this->checkCommand($request);
        switch ($command) {
            case 'refuse':
                $this->factory->refuse($this->resource,
                        $request->pullPutString('reason'));
                break;

            case 'inquiry':
                $this->factory->inquiry($this->resource,
                        $request->pullPutString('inquiryType'));
                break;

            default:
                throw new \properties\Exception\BadCommand;
        }

        $json['success'] = true;
        $view = new \View\JsonView($json);
        $response = new \Response($view);
        return $response;
    }

    public function patch(\Request $request)
    {
        $command = $this->checkCommand($request);
        switch ($command) {
            case 'approve':
                $this->factory->approve($this->resource);
                break;

            default:
                throw new \properties\Exception\BadCommand;
        }
        $json['success'] = true;
        $view = new \View\JsonView($json);
        $response = new \Response($view);
        return $response;
    }

    protected function editView($property_id = 0, $manager_id = 0)
    {
        $propertyFactory = new \properties\Factory\PropertyFactory();
        $property = $property_id ? $propertyFactory->load($property_id) : $propertyFactory->build();

        if ($property->getId()) {
            $propertyEncode = json_encode($property->getVariablesAsValue(true,
                            array('approved', 'active')));
        } else {
            $manager = $this->factory->load($manager_id);
            $property->contact_id = $manager_id;
            $property->company_name = $manager->company_name;

            $propertyEncode = json_encode($property->getVariablesAsValue(true,
                            array('approved', 'active')));
        }

        $content[] = <<<EOF
<script type="text/javascript">const property = $propertyEncode;let deleteProperty = () => {}</script>
EOF;
        $content[] = $this->reactView('propertyform');
        return implode('', $content);
    }

}
