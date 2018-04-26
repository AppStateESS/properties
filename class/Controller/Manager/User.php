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
use \Canopy\Request;
use \phpws2\Template;
use \phpws2\Settings;

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

    protected function signinHtmlCommand(Request $request)
    {
        return $this->factory->reactView('managersignin');
    }

    protected function listHtmlCommand(Request $request)
    {
        \Layout::addToStyleList('mod/properties/css/manager/list.css');
        return $this->factory->reactView('manager');
    }

    protected function listJsonCommand(Request $request)
    {
        $json['admin'] = false;
        $json['managerList'] = $this->factory->approvedListing($request);
        $json['more_rows'] = $this->factory->more_rows;
        return $json;
    }

    protected function signinPostCommand(Request $request)
    {
        $username = $request->pullPostString('manager_username');
        $password = $request->pullPostString('manager_password');
        if (empty($username) || empty($password)) {
            \PHPWS_Core::reroute('properties/Manager/signin?error=login');
        }
        $manager = $this->factory->signin($username, $password);
        if ($manager) {
            if (!$manager->approved) {
                \PHPWS_Core::reroute('properties/Manager/notApproved');
            } elseif (!$manager->active) {
                \PHPWS_Core::reroute('properties/Manager/notActive');
            } else {
                $session = \phpws2\Session::getInstance();
                $session->property_manager_id = $manager->id;
                $manager->stamp();
                $this->factory->saveResource($manager);
                \PHPWS_Core::reroute('properties/Manager/desktop');
            }
        } else {
            \PHPWS_Core::reroute('properties/Manager/signin?error=not_found&username=' . $username);
        }
    }
    
    protected function notApprovedHtmlCommand()
    {
        $template = new Template(array('our_email'=>Settings::get('properties', 'our_email')));
        $template->setModuleTemplate('properties',
                'manager/not_approved.html');
        return $template->get();
    }

    protected function notActiveHtmlCommand()
    {
        $template = new Template(array('our_email'=>Settings::get('properties', 'our_email')));
        $template->setModuleTemplate('properties',
                'manager/not_active.html');
        return $template->get();
    }

    /**
     * @param Request $request
     * @return string
     */
    protected function desktopHtmlCommand(Request $request)
    {
        return $this->factory->reactView('managersignin');
    }

    /**
     * @param Request $request
     * @return string
     */
    protected function viewHtmlCommand(Request $request)
    {
        return $this->factory->view($this->id, true);
    }

    protected function checkUsernameJsonCommand(Request $request)
    {
        $json['duplicate'] = $this->factory->checkUsername($request->pullGetString('username'));
        return $json;
    }

    protected function checkEmailJsonCommand(Request $request)
    {
        $json['duplicate'] = $this->factory->checkEmail($request->pullGetString('email_address'));
        return $json;
    }

    protected function checkCompanyNameJsonCommand(Request $request)
    {
        $json['duplicate'] = $this->factory->checkCompanyName($request->pullGetString('company_name'));
        return $json;
    }

    protected function signupHtmlCommand(Request $request)
    {
        $email = \phpws2\Settings::get('properties', 'our_email');
        if (empty($email)) {
            return '<h2>Sorry</h2><p>Manager signup is disabled at this time. Please try back later.</p>';
        }
        return $this->factory->reactView('managersignup');
    }

    protected function applyPostCommand(Request $request)
    {
        return $this->factory->signup($request);
    }

    protected function successHtmlCommand(Request $request)
    {
        $template = new Template;
        $template->setModuleTemplate('properties', 'manager/success_signup.html');
        return $template->get();
    }

    protected function forgotHtmlCommand(Request $request)
    {
        return $this->factory->forgotForm();
    }

    protected function forgotPostCommand(Request $request)
    {
        return $this->factory->forgotPost($request);
    }

    protected function passwordSentHtmlCommand(Request $request)
    {
        $email_address = $request->pullGetString('email');
        $tpl = new \phpws2\Template(array('email' => $email_address));
        $tpl->setModuleTemplate('properties', 'manager/password_sent.html');
        return $tpl->get();
    }

    protected function changepwHtmlCommand(Request $request)
    {
        return $this->factory->handlePasswordChange($request);
    }

    protected function changepwPostCommand(Request $request)
    {
        return $this->factory->postPasswordChange($request);
    }

    protected function passwordChangeCompleteHtmlCommand()
    {
        $template = new Template();
        $template->setModuleTemplate('properties',
                'manager/password_success.html');
        return $template->get();
    }

    /**
     * Called a manager function without being signed in
     * @param Request $request
     * @return type
     */
    protected function editHtmlCommand(Request $request)
    {
        return $this->factory->reactView('managersignin');
    }

}
