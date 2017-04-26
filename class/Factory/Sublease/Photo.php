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

namespace properties\Factory\Sublease;

use \properties\Resource\SubleasePhoto as Resource;
use \phpws2\Database;

class Photo extends \properties\Factory\Photo
{

    protected $table_name = 'prop_sub_photo';
    protected $item_column = 'sid'; // sublease id
    protected $owner_column = 'uid'; // user id
    protected $save_directory = 'images/properties/u';

    public function build()
    {
        return new Resource;
    }

    public function removeBySublease($subleaseId)
    {
        $photo_list = $this->listing($subleaseId, null, true);
        if (empty($photo_list)) {
            return true;
        }

        foreach ($photo_list as $photo) {
            $this->delete($photo);
        }
    }

    public function post(\properties\Resource\Sublease $sublease)
    {
        $photo = $this->build();
        $photo->uid = $sublease->user_id;
        $photo->sid = $sublease->id;

        $result = $this->handlePhotoPost($photo, $sublease->id, $sublease->user_id);

        return $result;
    }

}
