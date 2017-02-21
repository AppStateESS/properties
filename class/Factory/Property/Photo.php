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

namespace properties\Factory\Property;

use \properties\Resource\Photo as Resource;
use \phpws2\Database;

class Photo extends \properties\Factory\Photo
{

    protected $table_name = 'prop_photo';
    protected $item_column = 'pid'; // property id
    protected $owner_column = 'cid'; // manager/contact id
    protected $save_directory = 'images/properties/c';

    public function build()
    {
        return new Resource;
    }

    public function removeByProperty($propertyId)
    {
        $photo_list = $this->listing($propertyId, null, true);
        if (empty($photo_list)) {
            return true;
        }

        foreach ($photo_list as $photo) {
            $this->delete($photo);
        }
    }

    public function post(\Canopy\Request $request)
    {
        $propertyFactory = new \properties\Factory\Property;
        $propertyId = $request->pullPostInteger('propertyId');
        $property = $propertyFactory->load($propertyId);

        $photo = $this->build();
        $photo->cid = $property->contact_id;
        $photo->pid = $property->id;

        $result = $this->handlePhotoPost($photo, $propertyId,
                $property->contact_id);

        return $result;
    }

}
