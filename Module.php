<?php

namespace properties;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * @author Matthew McNaney <mcnaneym at appstate dot edu>
 */
class Module extends \Module
{

    public function __construct()
    {
        parent::__construct();
        $this->setTitle('properties');
        $this->setProperName('Counseling Center Check-In');
    }

    public function getController(\Request $request)
    {
        $command = $request->shiftCommand();
        $class_name = '\properties\Controller\\' . $command . 'Controller';
        if (!class_exists($class_name)) {
            throw new \phpws2\Http\NotAcceptableException;
        }
        $controller = new $class_name($this);
        return $controller;
    }

    public function runTime(\Request $request)
    {
        if (\Current_User::allow('properties')) {
            \properties\Factory\View::navbar();
        }
    }

}
