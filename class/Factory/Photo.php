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

use \properties\Resource\Photo as Resource;
use \phpws2\Database;

class Photo extends Base
{

    public function build()
    {
        return new Resource;
    }

    public function load($id)
    {
        if (empty($id)) {
            throw new \properties\Exception\ResourceNotFound;
        }
        $db = Database::getDB();
        $tbl = $db->addTable('prop_photo');
        $tbl->addFieldConditional('id', $id);
        $row = $db->selectOneRow();
        if (empty($row)) {
            throw new \properties\Exception\ResourceNotFound;
        }
        $photo = $this->build();
        $photo->setVars($row);
        return $photo;
    }

    public function delete($photo)
    {
        if (!is_a($photo, 'properties\Resource\Photo')) {
            if (is_numeric($photo) && !empty($photo)) {
                $photo = $this->load($photo);
            } else {
                throw \Exception('Empty photo id');
            }
        }
        $photo->delete();
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

    private function thumbnailed($url)
    {
        return preg_replace('/\.(jpg|jpeg|gif|png)$/i', '_tn.\\1', $url);
    }

    public function thumbs($property_id)
    {
        $rows = array();
        $images = $this->listing($property_id);

        $db = Database::getDB();
        $tbl = $db->addTable('prop_photo');
        if (!empty($property_id)) {
            $tbl->addFieldConditional('pid', $property_id);
        } else {
            throw new \Exception('Property not specified.');
        }
        $tbl->addField('id');
        $tbl->addField('path');
        $tbl->addField('main_pic');
        $db->loadSelectStatement();
        while ($row = $db->fetch()) {
            $rows[] = array('id' => $row['id'], 'original' => $row['path'],
                'thumbnail' => $this->thumbnailed($row['path']), 'main_pic' => $row['main_pic']);
        }
        return $rows;
    }

    public function listing($property_id = null, $manager_id = null,
            $as_resource = false)
    {
        if (empty($property_id) || !is_numeric($property_id)) {
            throw new \Exception('Property id invalid');
        }
        $db = Database::getDB();
        $tbl = $db->addTable('prop_photo');
        if (!empty($property_id)) {
            $tbl->addFieldConditional('pid', $property_id);
        } elseif (!empty($manager_id)) {
            $tbl->addFieldConditional('cid', $property_id);
        } else {
            throw new \Exception('Property not specified.');
        }
        if ($as_resource) {
            return $db->selectAsResources('\properties\Resource\Photo');
        } else {
            return $db->select();
        }
    }

    private function createTitleFromFileName($file_name)
    {
        $file_name2 = preg_replace('/\.(jpe?g|png|gif$)$/', '', $file_name);
        return preg_replace('/[\W_]{1,}/', '', $file_name2);
    }

    public function post(\Canopy\Request $request)
    {
        if (!isset($_FILES) || empty($_FILES)) {
            return array('error' => 'No files uploaded');
        }

        $propertyId = $request->pullPostInteger('propertyId');

        $propertyFactory = new \properties\Factory\Property;
        $property = $propertyFactory->load($propertyId);
        $pic = $_FILES['photo'];
        try {
            $this->resize($pic['tmp_name']);
            $title = $this->createTitleFromFileName($pic['tmp_name']);
            $size = getimagesize($pic['tmp_name']);
            $photo = $this->build();
            $photo->cid = $property->contact_id;
            $photo->width = $size[0];
            $photo->height = $size[1];
            $photo->pid = $property->id;
            $photo->title = $title;
            $photo->main_pic = !$this->mainPropertyPicExists($propertyId);
            $photo->path = $this->moveImage($pic, $property->contact_id);
            self::saveResource($photo);
            $result['photo'] = array('original' => $photo->path, 'thumbnail' => $photo->getThumbnail(), 'id' => $photo->getId());
            $result['success'] = true;
        } catch (properties\Exception\FileSaveFailure $e) {
            $result['success'] = false;
            $result['error'] = $e->getMessage();
        } catch (properties\Exception\WrongImageType $e) {
            $result['success'] = false;
            $result['error'] = $e->getMessage();
        } catch (\Exception $e) {
            $result['success'] = false;
            $result['error'] = $e->getMessage();
        }

        return $result;
    }

    private function mainPropertyPicExists($property_id)
    {
        $db = Database::getDB();
        $tbl = $db->addTable('prop_photo');
        $tbl->addFieldConditional('pid', $property_id);
        $tbl->addFieldConditional('main_pic', 1);
        $result = $db->selectOneRow();
        return (bool) $result;
    }

    private function resize($file)
    {
        return \phpws\PHPWS_File::scaleImage($file, $file, PROP_MAX_IMAGE_WIDTH,
                        PROP_MAX_IMAGE_HEIGHT);
    }

    public function moveImage($pic, $contact_id)
    {
        if ($pic['error'] !== 0) {
            throw new \Exception('Upload error');
        }

        if (!in_array($pic['type'],
                        array('image/jpeg', 'image/gif', 'image/png'))) {
            throw new \properties\Exception\WrongImageType;
        }
        $dest = 'images/properties/c' . $contact_id . '/';
        if (!is_dir($dest)) {
            if (!mkdir($dest, 0755)) {
                throw new \Exception('Could not create directory');
            }
        }


        $file_name = rand() . time() . '.' . \phpws\PHPWS_File::getFileExtension($pic['name']);
        $path = $dest . $file_name;
        if (!move_uploaded_file($pic['tmp_name'], $path)) {
            throw new properties\Exception\FileSaveFailure($path);
        }
        \PHPWS_File::makeThumbnail($file_name, $dest, $dest,
                PROP_THUMBNAIL_WIDTH, PROP_THUMBNAIL_HEIGHT);
        return $path;
    }

    public function removePhotos($property_id)
    {
        $db = Database::getDB();
        $tbl = $db->addTable('prop_photo');
        $tbl->addFieldConditional('pid', $property_id);
        $tbl->addField('path');
        while ($path = $db->selectColumn()) {
            $files[] = $path;
            $files[] = $this->thumbnailed($path);
        }
        $db->delete();
        if (!empty($files)) {
            foreach ($files as $path) {
                unlink(PHPWS_HOME_DIR . $path);
            }
        }
    }

    public function removeMain(Resource $photo)
    {
        $db = Database::getDB();
        $tbl = $db->addTable('prop_photo');
        $tbl->addFieldConditional('id', $photo->id, '!=');
        $tbl->addFieldConditional('pid', $photo->pid, '=');
        $tbl->addValue('main_pic', 0);
        return $db->update();
    }

    public function patch(Resource $photo, $varname, $value)
    {
        $photo->$varname = $value;
        self::saveResource($photo);
    }

}
