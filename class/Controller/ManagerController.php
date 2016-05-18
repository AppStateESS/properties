<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace properties\Controller;

use properties\Factory\ManagerFactory as Factory;

/**
 * Description of Manager
 *
 * @author Matthew McNaney <mcnaneym@appstate.edu>
 */
class ManagerController extends \phpws2\Http\Controller
{

    public function get(\Request $request)
    {
        $data = array();
        $view = $this->getView($data, $request);
        $response = new \Response($view);
        return $response;
    }

    public function getHtmlView($data, \Request $request)
    {
        $command = $request->shiftCommand();
        if (empty($command)) {
            $command = 'list';
        }

        if (!$this->allow($command, $request)) {
            throw new \phpws2\Http\NotAcceptableException;
        }

        $factory = new Factory;

        switch ($command) {
            case 'adminlist':
                $this->adminListing();
                break;

            case 'list':
                $content = $factory->listing();
                break;

            case 'create';
                $content = $factory->create();
                break;

            case 'view':
                break;
        }
        $view = new \phpws2\View\HtmlView($content);
        $response = new \Response($view);
        return $response;
    }

    private function allow($command, \Request $request)
    {
        $session = \phpws2\Session::getInstance();

        $admins = array('adminlist', 'create', 'edit', 'save');
        $managers = array('edit', 'save');
        $users = array('userlist', 'view', 'list');

        if (\Current_User::allow('properties') && in_array($command, $admins)) {
            return true;
        }

        if (in_array($command, $users)) {
            return true;
        }

        if (in_array($command, $managers) &&
                $session->currentManagerId === $request->getVar('managerId')) {
            return true;
        }

        return false;
    }

}
