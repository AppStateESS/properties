<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace properties\Controller;

/**
 * Description of BaseController
 *
 * @author Matthew McNaney <mcnaneym@appstate.edu>
 */
abstract class BaseController extends \phpws2\Http\Controller
{

    /**
     * Array of permissions allowed for only administrators
     * Inherits all manager permissions
     * @var array
     */
    protected $adminPermissions;

    /**
     * Array of permissions allowed only for managers
     * Inherits all user permissions
     * @var array
     */
    protected $managerPermissions;

    /**
     * Array of permissions allowed for standard user
     * @var array
     */
    protected $userPermissions;
    protected $factory;

    /**
     * @var \properties\Resource\Property
     */
    protected $resource;

    public function get(\Request $request)
    {
        try {
            $data = array();
            $view = $this->getView($data, $request);
        } catch (\properties\Exception\PrivilegeMissing $e) {
            if ($request->isAjax()) {
                $view = new \phpws2\View\JsonView(array('error' => 'Not privileged for this action'));
            } else {
                $view = $this->errorPage($e);
            }
        }
        $response = new \Response($view);
        return $response;
    }

    /**
     * 
     * @param \Exception $e
     * @return \phpws2\View\HtmlView
     */
    protected function errorPage(\Exception $e)
    {
        $content = $e->getMessage();
        $template = new \phpws2\Template(array('message' => $e->getMessage()));
        $template->setModuleTemplate('properties', 'error.html');
        $view = new \phpws2\View\HtmlView($template->get());
        return $view;
    }

    protected function checkCommand(\Request $request, $defaultCommand = 'list')
    {
        $command = $request->shiftCommand();
        if (empty($command)) {
            $command = $defaultCommand;
        }

        if (!empty($command)) {
            // this a view of a specific item
            if (is_numeric($command)) {
                $subcommand = $request->shiftCommand();
                if (empty($subcommand)) {
                    $subcommand = $this->defaultNumericCommand($request);
                }
                $this->resource = $this->factory->load($command);

                if (!$this->factory->role->allow($subcommand)) {
                    if ($request->getMethod() === 'GET') {
                        return 'view';
                    } else {
                        throw \properties\Exception\BadCommand;
                    }
                } else {
                    return $subcommand;
                }
            } elseif (!$this->factory->role->allow($command)) {
                throw new \properties\Exception\PrivilegeMissing;
            }
            return $command;
        }
    }

    private function defaultNumericCommand(\Request $request)
    {
        // If numeric, post fails automatically because you don't
        // POST with a specific id
        if ($request->isPost()) {
            throw new \properties\Exception\BadCommand();
        } elseif ($request->isGet()) {
            // Get will return the default 'view' on an empty command
            $command = $request->shiftCommand();
            return empty($command) ? 'view' : $command;
        } else {
            return null;
        }
    }

    protected function getScript($filename)
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

    protected function reactView($view_name)
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

}
