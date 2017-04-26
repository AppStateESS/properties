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

namespace properties\Resource;
use phpws2\Database;

abstract class PicBase extends Base
{
    protected $width;
    protected $height;
    protected $path;
    protected $title;
    protected $porder;
    protected $item_column;

    public function __construct()
    {
        parent::__construct();
        $this->width = new \phpws2\Variable\IntegerVar(0, 'width');
        $this->width->setRange(5);
        $this->height = new \phpws2\Variable\IntegerVar(0, 'height');
        $this->height->setRange(5);
        $this->path = new \phpws2\Variable\FileVar(null, 'path');
        $this->path->setLimit(255);
        $this->title = new \phpws2\Variable\StringVar(null, 'title');
        $this->title->setLimit(255);
        $this->porder = new \phpws2\Variable\SmallInteger(0, 'porder');
        $this->doNotSave('item_column');
    }

    public function delete($resort = true)
    {
        if (is_file($this->path)) {
            unlink($this->path);
        }
        $thumb = $this->getThumbnail();
        if (is_file($thumb)) {
            unlink($this->getThumbnail());
        }
        $this->deleteRow($resort);
    }
    
    protected function deleteRow($resort = true)
    {
        $db = Database::getDB();
        $tbl = $db->addTable($this->table);
        $tbl->addFieldConditional('id', $this->getId());
        $result = $db->delete();
        if ($result) {
            if ($resort) {
                $position = $this->porder;
                $db->clearConditional();
                $db = Database::getDB();
                $tbl = $db->addTable($this->table);
                $exp = new \phpws2\Database\Expression($tbl->getField('porder') . '-1');
                $tbl->addValue('porder', $exp);
                $tbl->addFieldConditional($this->item_column, $this->{$this->item_column});
                $tbl->addFieldConditional('porder', $position, '>');
                $db->update();
            }
            return $result;
        }
    }

    public function getThumbnail()
    {
        return preg_replace('/\.(jpg|jpeg|gif|png)$/i', '_tn.\\1', $this->path);
    }

}
