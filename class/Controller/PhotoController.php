<?php

/*
 * See docs/AUTHORS and docs/COPYRIGHT for relevant info.
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * @author Matthew McNaney <mcnaney at gmail dot com>
 *
 * @license http://opensource.org/licenses/lgpl-3.0.html
 */

namespace properties\Controller;

use properties\Factory\PhotoFactory as Factory;
use properties\Resource\Photo as Resource;

class PhotoController extends BaseController
{

    /**
     *
     * @var properties\Factory\PhotoFactory
     */
    protected $factory;

    /**
     *
     * @var properties\Resource\Photo
     */
    protected $resource;

    public function __construct($module)
    {
        $this->factory = new Factory();
        $this->resource = $this->factory->build();
        parent::__construct($module);
    }

    public function post(\Request $request)
    {
        if (!$this->factory->role->allow()) {
            throw new \properties\Exception\PrivilegeMissing;
        }
        try {
            $result = $this->factory->post($request);
        } catch (\Exception $ex) {
            throw $ex;
        }
        if ($request->isAjax()) {
            $view = new \View\JsonView($result);
        } else {
            $view = new \View\HtmlView($result);
        }
        $response = new \Response($view);
        return $response;
    }

    public function getJsonView($data, \Request $request)
    {
        $command = $this->checkCommand($request, 'list');
        if (is_numeric($command)) {
            $propertyId = (int) $command;
            $command = 'view';
        } else {
            $propertyId = $request->pullGetInteger('propertyId', true);
        }
        switch ($command) {
            case 'list':
                $json = $this->factory->thumbs($propertyId, null, false, true);
                break;

            case 'view':
                $json = array();
                break;
        }
        $view = new \View\JsonView($json);

        return $view;
    }

    public function delete(\Request $request)
    {
        if (!$this->factory->role->allow()) {
            throw new \properties\Exception\PrivilegeMissing;
        }
        $id = $request->shiftCommand();
        $this->factory->delete($id);
        if ($request->isAjax()) {
            $view = new \View\JsonView(array('success' => true));
            $response = new \Response($view);
            return $response;
        } else {
            \Server::forward('./properties/Property/');
        }
    }

}
