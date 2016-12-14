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

class Photo extends Base
{
    /**
     * Contact id
     * @var phpws2\Variable\Integer
     */
    protected $cid;
    protected $width;
    protected $height;
    /**
     * Property id
     * @var phpws2\Variable\Integer
     */
    protected $pid;
    protected $path;
    protected $title;
    protected $main_pic;
    
    protected $table = 'prop_photo';
            
    public function __construct()
    {
        parent::__construct();
        $this->cid = new \phpws2\Variable\Integer(0, 'cid');
        $this->width = new \phpws2\Variable\Integer(0, 'width');
        $this->width->setRange(5);
        $this->height = new \phpws2\Variable\Integer(0, 'height');
        $this->height->setRange(5);
        $this->pid = new \phpws2\Variable\Integer(0, 'pid');
        $this->path = new \phpws2\Variable\File(null, 'path');
        $this->path->setLimit(255);
        $this->title = new \phpws2\Variable\CanopyString('', 'title');
        $this->title->setLimit(255);
        $this->main_pic = new \phpws2\Variable\Bool(false, 'main_pic');
        
    }
    
    public function delete()
    {
        unlink($this->path);
        unlink($this->getThumbnail());
        parent::delete();
    }
    
    public function getThumbnail()
    {
        return preg_replace('/\.(jpg|jpeg|gif|png)$/i', '_tn.\\1', $this->path);
    }
}
