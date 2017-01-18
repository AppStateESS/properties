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
namespace properties\Controller\Photo;

class Admin extends User
{
    protected function savePostCommand(\Request $request)
    {
        return $this->factory->post($request);
    }
    
    protected function deleteCommand()
    {
        $this->factory->delete($this->id);
        return array('success'=>true);
    }
    
    protected function patchCommand(\Request $request)
    {
        $photo = $this->factory->load($this->id);
        $variableName = $request->pullPatchString('varname');
        switch ($variableName) {
            case 'main_pic':
                $this->factory->removeMain($photo);
                $this->factory->patch($photo, 'main_pic', 1);
                break;
        }
        return array('success' => true);
    }
}
