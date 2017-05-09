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

use properties\Factory\Property\Listing as Listing;
use \Canopy\Request;

class Manager extends User
{

    public function __construct($role)
    {
        parent::__construct($role);
        $this->id = $this->getCurrentLoggedManager();
    }

    protected function signinHtmlCommand(Request $request)
    {
        return \PHPWS_Core::reroute('./properties/Manager/desktop');
    }

    protected function desktopHtmlCommand(Request $request)
    {
        \Layout::addStyle('properties');
        \Layout::addStyle('properties', 'property/list.css');
        return $this->factory->reactView('managerdesktop');
    }

    protected function mylistJsonCommand(Request $request)
    {
        $listing = new Listing;
        $listing->show_inactive = true;
        $listing->manager_id = $this->id;
        $json['properties'] = $listing->get(true);
        return $json;
    }

    protected function signoutHtmlCommand()
    {
        $manager_id = $this->id;
        if (empty($manager_id)) {
            \Canopy\Server::forward('./');
        }
        $vars['manager_id'] = $manager_id;
        $this->factory->signout();
        $template = new \phpws2\Template($vars);
        $template->setModuleTemplate('properties', 'manager/signout.html');
        return $template->get();
    }

    protected function editHtmlCommand(Request $request)
    {
        return $this->factory->reactView('manageredit');
    }

    protected function viewJsonCommand(Request $request)
    {
        $manager = $this->factory->load($this->id);
        $json = $manager->view(false);
        return $json;
    }

    public function getHtml(Request $request)
    {
        $this->managerButtons();
        return parent::getHtml($request);
    }

    protected function checkCompanyNameJsonCommand(Request $request)
    {
        $json['duplicate'] = $this->factory->checkCompanyName($request->pullGetString('company_name'),
                $this->id);
        return $json;
    }

    protected function checkEmailJsonCommand(Request $request)
    {
        $json['duplicate'] = $this->factory->checkEmail($request->pullGetString('email_address'),
                $this->id);
        return $json;
    }

    /**
     * 
     * @param Request $request
     * @return type
     */
    protected function savePostCommand(Request $request)
    {
        return $this->factory->signup($request);
    }

    protected function updatePutCommand(Request $request)
    {
        if ($request->pullPutInteger('id') != $this->getCurrentLoggedManager()) {
            throw new \properties\Exception\PrivilegeMissing;
        }
        return $this->factory->managerUpdate($request);
    }

    protected function changePasswordHtmlCommand(Request $request)
    {
        $managerId = $this->role->getId();
        $header = <<<EOF
<script>const managerId = '$managerId';</script>
EOF;
        return $header . $this->factory->reactView('managerpasswordchange');
    }
    
    /**
     * @param Request $request
     * @return string
     * @throws BadCommand
     */
    public function patch(Request $request)
    {
        $patch_command = $request->shiftCommand();
        if (empty($patch_command)) {
            $patch_command = $request->isAjax() ? 'jsonPatchCommand' : 'htmlPatchCommand';
        } else {
            $patch_command .= 'PatchCommand';
        }
        if (!method_exists($this, $patch_command)) {
            throw new BadCommand($patch_command);
        }

        $json = $this->$patch_command($request);
        return $this->jsonResponse($json);
    }
    
    protected function changePasswordPatchCommand(Request $request)
    {
        $new_password = $request->pullPatchString('password');
        $current_password = $request->pullPatchString('currentPassword');
        $manager = $this->factory->load($this->role->getId());
        if (!password_verify($current_password, $manager->password)) {
            return array('success'=>false, 'error'=>'Current password is incorrect');
        }
        
        $this->factory->patch($this->role->getId(), 'password', password_hash($new_password,PASSWORD_DEFAULT));
        return array('success'=>true);
    }

}
