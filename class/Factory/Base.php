<?php

namespace properties\Factory;

use properties\Exception\ResourceNotFound;

/**
 *
 * @author Matthew McNaney <mcnaneym@appstate.edu>
 */
abstract class Base extends \phpws2\ResourceFactory
{

    abstract protected function build();

    public function load($id)
    {
        if (empty($id)) {
            throw new \properties\Exception\ResourceNotFound;
        }
        $resource = $this->build();
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
        $vars['our_email'] = $this->getSiteEmail();
        $vars['our_phone'] = '(123) 123-1234';
        $vars['our_contact_name'] = 'Chuck Charles';
        $vars['our_website'] = \Canopy\Server::getSiteUrl();
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
        return isset($session->property_manager_id) ? (int) $session->property_manager_id : false;
    }

    public function clearCurrentLoggedManager()
    {
        $session = \phpws2\Session::getInstance();
        unset($session->property_manager_id);
    }

    private function getScript($filename)
    {
        $root_directory = PHPWS_SOURCE_HTTP . 'mod/properties/javascript/';
        if (PROPERTIES_REACT_DEV) {
            $path = "dev/$filename.js";
        } else {
            $path = "build/$filename.js";
        }
        $script = "<script type='text/javascript' src='{$root_directory}$path'></script>";
        return $script;
    }

    public function reactView($view_name)
    {
        static $vendor_included = false;
        if (!$vendor_included) {
            $script[] = $this->getScript('vendor');
            $vendor_included = true;
        }
        $script[] = $this->getScript($view_name);
        $react = implode("\n", $script);
        $content = <<<EOF
<div id="$view_name"></div>
$react
EOF;
        return $content;
    }
    
    public function getSiteEmail()
    {
        $site_email = \phpws2\Settings::get('properties', 'site_email');
                
    }
    
    
}
