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
        $tbl->addField('porder');
        $tbl->addOrderBy('porder');
        $db->loadSelectStatement();
        while ($row = $db->fetch()) {
            $row['thumbnail'] = $this->thumbnailed($row['path']);
            $row['original'] = $row['path'];
            $rows[] = $row;
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
            return $db->selectAsResources('\properties\Resource\Photo');
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
        return $path;
    }

    private function makeThumbnail($photo)
    {
        $thumbnail = $this->thumbnailed($photo->path);
        $source_path = $photo->path;

        if ($photo->width != $photo->height) {
            if ($photo->width < $photo->height) {
                $crop_size = $photo->width;
            } else {
                $crop_size = $photo->height;
            }
            \phpws\PHPWS_File::cropImage($source_path, $thumbnail, $crop_size,
                    $crop_size);
            $source_path = $thumbnail;
        }

        \phpws\PHPWS_File::scaleImage($source_path, $thumbnail, 100, 100);
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
            $photo->path = $this->moveImage($pic, $owner_id);
            $this->makeThumbnail($photo);
            $photo->porder = $this->getMaxOrder($photo->pid) + 1;
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

    public function sort($photo, $new_position)
    {
        $sortable = new \phpws2\Sortable('prop_photo', 'porder');
        $sortable->setAnchor('pid', $photo->pid);
        $sortable->moveTo($photo->getId(), $new_position);
    }

    protected function getMaxOrder($photo_item_id)
    {
        $db = \phpws2\Database::getDB();
        $tbl = $db->addTable($this->table_name, null, false);
        $tbl->addFieldConditional($this->item_column, $photo_item_id);
        $max_column = $tbl->getField('porder');
        $db->addExpression('max(' . $max_column . ')', 'max');
        return (int) $db->selectColumn();
    }

}
