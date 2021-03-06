<?php

/**
 *
 * @author Matthew McNaney <mcnaneym@appstate.edu>
 */

namespace properties\Resource;

use \phpws2\Database;

class Base extends \phpws2\Resource
{

    public function __set($name, $value)
    {
        if ((!$this->$name->allowNull() ||
                (method_exists($this->$name, 'allowEmpty') && !$this->$name->allowEmpty())) &&
                ( (is_string($value) && $value === '') || is_null($value))) {
            throw new \properties\Exception\MissingInput("$name may not be empty");
        }

        $this->$name->set($value);
    }

    public function __get($name)
    {
        $method_name = self::walkingCase($name, 'get');
        if (method_exists($this, $method_name)) {
            return $this->$method_name();
        } else {
            return $this->$name->get();
        }
    }

    public function googleMapUrl($address)
    {
        $url = preg_replace('/[\W]/', '+', $address);
        $url = preg_replace('/\+{2,}/', '+', $url);
        return sprintf('http://maps.google.com/maps?q=%s', $url);
    }

}
