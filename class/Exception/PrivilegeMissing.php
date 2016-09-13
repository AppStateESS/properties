<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace properties\Exception;

/**
 * Description of PrivilegeMissing
 *
 * @author matt
 */
class PrivilegeMissing extends \Exception
{
    protected $message = 'You do not have permissions for this action.';
}
