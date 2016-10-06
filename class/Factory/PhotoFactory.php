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

namespace properties\Factory;
namespace properties\Resource\Photo;

class PhotoFactory extends Base
{

    protected function build()
    {
        return new \properties\Resource\Photo;
    }

    public function delete($photo)
    {
        if (is_numeric($photo)) {
            $photo = $this->load($photo);
        } elseif (!is_a($photo, '\properties\Resource\Photo')) {
            throw new \Exception('Improper parameter');
        }
        var_dump($photo);
    }

}
