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

use properties\Factory\ManagerContactFactory as Factory;

class ManagerContactController extends BaseController
{

    /**
     * @var properties\Factory\ManagerContactFactory
     */
    protected $factory;

    public function __construct($module)
    {
        parent::__construct($module);
        $this->factory = new Factory('managercontact');
    }

    public function getHtmlView($data, \Request $request)
    {
        try {
            $command = $this->checkCommand($request, 'signin');
        } catch (\properties\Exception\ResourceNotFound $e) {
            return $this->errorPage($e);
        } catch (\properties\Exception\BadCommand $e) {
            return $this->errorPage($e);
        }


        \Layout::addStyle('properties');
        switch ($command) {
            case 'signin':
                $content = $this->signinForm();
                break;

            case 'signout':
                $content = $this->signout();
                break;

            case 'desktop':
                $content = $this->reactView('managerdesktop');
                break;

            case 'create':
                \Layout::addStyle('properties', 'propertyForm.css');
                $content = $this->editView(0,
                        $this->factory->getCurrentLoggedManager());
                break;

            default:
                throw new \properties\Exception\BadCommand;
        }
        $view = new \phpws2\View\HtmlView($content);
        return $view;
    }

    public function getJsonView($data, \Request $request)
    {
        $command = $this->checkCommand($request, 'list');

        switch ($command) {
            case 'desktop':
                $json['properties'] = $this->getManagerProperties();
                break;

            default:
                throw new \properties\Exception\BadCommand;
        }
        $view = new \View\JsonView($json);
        return $view;
    }

    private function signinForm()
    {
        $manager_id = $this->factory->getCurrentLoggedManager();
        if ($manager_id) {
            return \PHPWS_Core::reroute('./properties/ManagerContact/desktop');
        } else {
            return $this->reactView('managersignin');
        }
    }

    private function signout()
    {
        $manager_id = $this->factory->getCurrentLoggedManager();
        if (empty($manager_id)) {
            \Server::forward('./');
        }
        $vars['manager_id'] = $manager_id;
        $this->factory->signout();
        $template = new \phpws2\Template($vars);
        $template->setModuleTemplate('properties', 'signout.html');
        return $template->get();
    }

    private function getManagerProperties()
    {
        $listing = new \properties\Factory\Property\Listing;
        $listing->manager_id = $this->factory->getCurrentLoggedManager();
        return $listing->get(true);
    }

    public function post(\Request $request)
    {
        $command = $this->checkCommand($request);
        switch ($command) {
            case 'signin':
                $this->signin($request);
                $view = new \View\HtmlView('');
                break;

            case 'create':
                $json = $this->factory->adminPost($request);
                $view = new \View\JsonView($json);
                break;

            default:
                throw new \properties\Exception\BadCommand;
        }
        $response = new \Response($view);
        return $response;
    }

    private function signin(\Request $request)
    {
        $username = $request->pullPostString('manager_username');
        $password = $request->pullPostString('manager_password');
        if (empty($username) || empty($password)) {
            \PHPWS_Core::reroute('./properties/ManagerContact/signin?error=login');
        }
        $manager_id = $this->factory->signin($username, $password);
        if ($manager_id) {
            $session = \phpws2\Session::getInstance();
            $session->property_manager_id = $manager_id;
            \PHPWS_Core::reroute('./properties/ManagerContact/desktop');
        } else {
            \PHPWS_Core::reroute('./properties/ManagerContact/signin?error=not_found');
        }
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
