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
        } elseif ((bool) isset($_SESSION['Contact_Manager']) && $_SESSION['Contact_Manager']->id) {
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

}
