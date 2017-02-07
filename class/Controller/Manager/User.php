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

namespace properties\Controller\Manager;

use properties\Exception\BadCommand;

class User extends \properties\Controller\SubController
{
    /**
     * @var \properties\Factory\Manager
     */
    protected $factory;

    public function loadFactory()
    {
        $factory = new \properties\Factory\Manager;
        return $factory;
    }

    protected function signinHtmlCommand(\Canopy\Request $request)
    {
        return $this->factory->reactView('managersignin');
    }

    protected function listHtmlCommand(\Canopy\Request $request)
    {
        \Layout::addStyle('properties', 'manager/list.css');
        return $this->factory->reactView('manager');
    }

    protected function listJsonCommand(\Canopy\Request $request)
    {
        $json['admin'] = false;
        $json['managerList'] = $this->factory->approvedListing($request->pullGetVarIfSet('limit',
                        true), $request->pullGetString('search', true), true);
        return $json;
    }

    protected function signinPostCommand(\Canopy\Request $request)
    {
        $username = $request->pullPostString('manager_username');
        $password = $request->pullPostString('manager_password');
        if (empty($username) || empty($password)) {
            \PHPWS_Core::reroute('./properties/Manager/signin?error=login');
        }
        $manager_id = $this->factory->signin($username, $password);
        if ($manager_id) {
            $session = \phpws2\Session::getInstance();
            $session->property_manager_id = $manager_id;
            \PHPWS_Core::reroute('./properties/Manager/desktop');
        } else {
            \PHPWS_Core::reroute('./properties/Manager/signin?error=not_found');
        }
    }

    /**
     * @param \Canopy\Request $request
     * @return string
     */
    protected function desktopHtmlCommand(\Canopy\Request $request)
    {
        return $this->factory->reactView('managersignin');
    }
    
    /**
     * @param \Canopy\Request $request
     * @return string
     */
    protected function viewHtmlCommand(\Canopy\Request $request)
    {
        return $this->factory->view($this->id, true);
    }
    
    protected function checkUsernameJsonCommand(\Canopy\Request $request)
    {
        $json['duplicate'] = $this->factory->checkUsername($request->pullGetString('username'));
        return $json;
    }

    protected function checkEmailJsonCommand(\Canopy\Request $request)
    {
        $json['duplicate'] = $this->factory->checkEmail($request->pullGetString('email_address'));
        return $json;
    }
    
    protected function checkCompanyNameJsonCommand(\Canopy\Request $request)
    {
        $json['duplicate'] = $this->factory->checkCompanyName($request->pullGetString('company_name'));
        return $json;
    }

    protected function signupHtmlCommand(\Canopy\Request $request)
    {
        return $this->factory->reactView('managersignup');
    }
    
    protected function savePostCommand(\Canopy\Request $request)
    {
        return $this->factory->signup($request);
    }
    
    protected function successHtmlCommand(\Canopy\Request $request)
    {
        $template = new \phpws2\Template();
        $template->setModuleTemplate('properties', 'manager/success_signup.html');
        return $template->get();
    }
    
    protected function forgotHtmlCommand(\Canopy\Request $request)
    {
        return $this->factory->forgotForm();
    }
    
    protected function forgotPostCommand(\Canopy\Request $request)
    {
        return $this->factory->forgotPost($request);
    }
}
