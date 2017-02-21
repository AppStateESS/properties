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

use \properties\Factory\Base;
use \phpws2\Database;

abstract class Photo extends Base
{

    protected $table_name;
    protected $item_column;
    protected $owner_column;
    protected $save_directory;

    public function load($id)
    {
        if (empty($id)) {
            throw new \properties\Exception\ResourceNotFound;
        }
        $db = Database::getDB();
        $tbl = $db->addTable($this->table_name);
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

    protected function thumbnailed($url)
    {
        return preg_replace('/\.(jpg|jpeg|gif|png)$/i', '_tn.\\1', $url);
    }

    public function thumbs($id)
    {
        $rows = array();
        $images = $this->listing($id);

        $db = Database::getDB();
        $tbl = $db->addTable($this->table_name);
        if (!empty($id)) {
            $tbl->addFieldConditional($this->item_column, $id);
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

    public function listing($item_id = null, $owner_id = null,
            $as_resource = false)
    {
        if (empty($item_id) || !is_numeric($item_id)) {
            throw new \Exception('Item id invalid');
        }
        $db = Database::getDB();
        $tbl = $db->addTable($this->table_name);
        if (!empty($item_id)) {
            $tbl->addFieldConditional($this->item_column, $item_id);
        } elseif (!empty($owner_id)) {
            $tbl->addFieldConditional($this->owner_column, $owner_id);
        } else {
            throw new \Exception('Photo owner not specified.');
        }
        if ($as_resource) {
            return $db->selectAsResources(__NAMESPACE__);
        } else {
            return $db->select();
        }
    }

    protected function createTitleFromFileName($file_name)
    {
        $file_name2 = preg_replace('/\.(jpe?g|png|gif$)$/', '', $file_name);
        return preg_replace('/[\W_]{1,}/', '', $file_name2);
    }

    protected function resize($file)
    {
        return \phpws\PHPWS_File::scaleImage($file, $file, PROP_MAX_IMAGE_WIDTH,
                        PROP_MAX_IMAGE_HEIGHT);
    }

    public function moveImage($pic, $owner_id)
    {
        if ($pic['error'] !== 0) {
            throw new \Exception('Upload error');
        }

        if (!in_array($pic['type'],
                        array('image/jpeg', 'image/gif', 'image/png'))) {
            throw new \properties\Exception\WrongImageType;
        }
        $dest = $this->save_directory . $owner_id . '/';
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

    public function removePhotos($item_id)
    {
        $db = Database::getDB();
        $tbl = $db->addTable($this->table_name);
        $tbl->addFieldConditional($this->item_column, $item_id);
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

    protected function mainPicExists($id)
    {
        $db = Database::getDB();
        $tbl = $db->addTable($this->table_name);
        $tbl->addFieldConditional($this->item_column, $id);
        $tbl->addFieldConditional('main_pic', 1);
        $result = $db->selectOneRow();
        return (bool) $result;
    }

    public function removeMain(\properties\Resource\PicBase $photo)
    {
        $db = Database::getDB();
        $tbl = $db->addTable($this->table_name);
        $tbl->addFieldConditional('id', $photo->id, '!=');
        $tbl->addFieldConditional($this->item_column,
                $photo->{$this->item_column}, '=');
        $tbl->addValue('main_pic', 0);
        return $db->update();
    }

    public function patch(\properties\Resource\PicBase $photo, $varname, $value)
    {
        $photo->$varname = $value;
        self::saveResource($photo);
    }

    protected function handlePhotoPost($photo, $item_id, $owner_id)
    {
        if (!isset($_FILES) || empty($_FILES)) {
            return array('error' => 'No files uploaded');
        }
        $pic = $_FILES['photo'];
        
        try {
            $this->resize($pic['tmp_name']);
            $title = $this->createTitleFromFileName($pic['tmp_name']);
            $size = getimagesize($pic['tmp_name']);
            $photo->width = $size[0];
            $photo->height = $size[1];
            $photo->title = $title;
            $photo->main_pic = !$this->mainPicExists($item_id);
            $photo->path = $this->moveImage($pic, $owner_id);
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

}
