<?php

namespace properties\Factory;

use properties\Exception\ResourceNotFound;
use phpws2\Settings;
use phpws2\Database;

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
        $vars['our_email'] = Settings::get('properties', 'our_email');
        $vars['our_phone'] = Settings::get('properties', 'our_phone');
        $vars['our_name'] = Settings::get('properties', 'our_name');
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
            $path = 'build/' . $this->getAssetPath($filename);
        }
        $script = "<script type='text/javascript' src='{$root_directory}$path'></script>";
        return $script;
    }

    private function getAssetPath($scriptName)
    {
        $rootDirectory = PHPWS_SOURCE_DIR . 'mod/properties/';
        if (!is_file($rootDirectory . 'assets.json')) {
            exit('Missing assets.json file. Run npm run prod in stories directory.');
        }
        $jsonRaw = file_get_contents($rootDirectory . 'assets.json');
        $json = json_decode($jsonRaw, true);
        if (!isset($json[$scriptName]['js'])) {
            throw new \Exception('Script file not found among assets.');
        }
        return $json[$scriptName]['js'];
    }

    public function includeVendor()
    {
        \Layout::addJSHeader($this->getScript('vendor'));
    }

    public function getVendor()
    {
        return $this->getScript('vendor');
    }

    public function reactView($view_name, $includeVendor = true)
    {
        static $vendor_included = false;
        if (!$vendor_included && $includeVendor) {
            $script[] = $this->getScript('vendor');
            $vendor_included = true;
        }
        $script[] = $this->getScript($view_name);
        $react = implode("\n", $script);
        \Layout::addJSHeader($react);
        $content = <<<EOF
<div id="$view_name"></div>
EOF;
        return $content;
    }

}
