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

namespace properties\Controller\SubleasePhoto;

use Canopy\Request;

class Admin extends User
{

    protected function deleteCommand(Request $request)
    {
        $photo = $this->factory->load($this->id);
        $this->factory->delete($photo);
        return array('success' => true);
    }

    protected function savePostCommand(Request $request)
    {
        $sublease_id = $request->pullPostInteger('subleaseId');
        $subleaseFactory = new \properties\Factory\Sublease;
        $sublease = $subleaseFactory->load($sublease_id);
        return $this->factory->post($sublease);
    }

    protected function jsonPatchCommand(Request $request)
    {
        $photo = $this->factory->load($this->id);
        $variableName = $request->pullPatchString('varname');
        switch ($variableName) {
            case 'move':
                $this->factory->sort($photo,
                        $request->pullPatchInteger('newPosition'));
                break;
        }
        return array('success' => true);
    }

    protected function rotatePutCommand(Request $request)
    {
        $photo = $this->factory->load($this->id);
        $this->factory->rotate($photo, $request->pullPutInteger('direction'));
        return array('success' => 1);
    }

}
