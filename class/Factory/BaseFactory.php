<?php

namespace properties\Factory;

use properties\Exception\ResourceNotFound;

/**
 *
 * @author Matthew McNaney <mcnaneym@appstate.edu>
 */
abstract class BaseFactory extends \phpws2\ResourceFactory
{

    /**
     *
     * @var \properties\Role\BaseRole
     */
    public $role;

    abstract protected function build();

    public function __construct($controller)
    {
        $request = \Server::getCurrentRequest();
        $this->loadRole($controller, $request->getMethod());
    }

    protected function loadRole($controller, $method)
    {
        if (\Current_User::allow('properties')) {
            $this->role = new \properties\Role\AdminRole($controller, $method);
        } elseif ($this->getCurrentLoggedManager()) {
            $this->role = new \properties\Role\ManagerRole($controller, $method);
        } elseif (\Current_User::isLogged()) {
            $this->role = new \properties\Role\LoggedRole($controller, $method);
        } else {
            $this->role = new \properties\Role\UserRole($controller, $method);
        }
    }

    public function load($id)
    {
        $resource = $this->build();
        if (!$id) {
            throw new \Exception('Missing id');
        }
        $resource->setId($id);
        if (!parent::loadByID($resource)) {
            throw new ResourceNotFound($id);
        }
        return $resource;
    }

    protected function walkingCase($name)
    {
        if (stripos($name, '_')) {
            return preg_replace_callback('/^(\w)(\w*)_(\w)(\w*)/',
                    function($letter) {
                $str = strtoupper($letter[1]) . $letter[2] . strtoupper($letter[3]) . $letter[4];
                return $str;
            }, $name);
        } else {
            return ucfirst($name);
        }
    }

    public function contactInformation()
    {
        $vars['our_email'] = 'somewebsite@appstate.edu';
        $vars['our_phone'] = '(123) 123-1234';
        $vars['our_contact_name'] = 'Chuck Charles';
        $vars['our_website'] = \Server::getSiteUrl();
        return $vars;
    }

    public function setCurrentLoggedManager($manager_id)
    {
        $session = \phpws2\Session::getInstance();
        $session->property_manager_id = $manager_id;
    }

    public function getCurrentLoggedManager()
    {
        $session = \phpws2\Session::getInstance();
        return isset($session->property_manager_id) ? (int)$session->property_manager_id : false;
    }

    public function clearCurrentLoggedManager()
    {
        $session = \phpws2\Session::getInstance();
        unset($session->property_manager_id);
    }

}
