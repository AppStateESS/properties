<?php

namespace properties\Factory;

/**
 *
 * @author Matthew McNaney <mcnaneym@appstate.edu>
 */
abstract class BaseFactory extends \phpws2\ResourceFactory
{

    abstract protected function build();

    public function load($id)
    {
        $resource = $this->build();
        if (!$id) {
            throw new \Exception('Missing id');
        }
        $resource->setId($id);
        if (!parent::loadByID($resource)) {
            throw new \Exception('Resource id not found:' . $id);
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
