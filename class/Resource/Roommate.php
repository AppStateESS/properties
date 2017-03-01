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

class Roommate extends Base
{

    protected $uid;
    protected $move_in_date;
    protected $name;
    protected $description;
    protected $email;
    protected $phone;
    protected $facebook;
    protected $instagram;
    protected $twitter;
    protected $politics;
    protected $major;
    protected $focus;
    protected $wake_time;
    protected $sleep_time;
    protected $overnighter;
    protected $free_time;
    protected $cleanliness;
    protected $loudness;
    protected $study_time;
    protected $languages;
    protected $music;
    protected $hobbies;
    protected $smoking;
    protected $pets;
    protected $created;
    protected $updated;
    
    protected $table = 'prop_roommate';

    public function __construct()
    {
        parent::__construct();
        $this->uid = new \phpws2\Variable\IntegerVar(null, 'uid');
        $this->move_in_date = new \phpws2\Variable\IntegerVar(null, 'move_in_date');
        $this->name = new \phpws2\Variable\TextOnly(null, 'name');
        $this->name->setLimit('60');
        $this->description = new \phpws2\Variable\TextOnly(null, 'description');
        $this->email = new \phpws2\Variable\Email(null, 'email');
        $this->phone = new \phpws2\Variable\PhoneNumber(null, 'phone');
        $this->facebook = new \phpws2\Variable\Url(null, 'facebook', 255);
        $this->facebook->allowNull(true);
        $this->instagram = new \phpws2\Variable\Url(null, 'instagram', 255);
        $this->instagram->allowNull(true);
        $this->twitter = new \phpws2\Variable\Url(null, 'twitter', 255);
        $this->twitter->allowNull(true);
        $this->politics = new \phpws2\Variable\Alphanumeric(null, 'politics', 20);
        $this->politics->allowNull(true);
        $this->major = new \phpws2\Variable\TextOnly(null, 'major', 20);
        $this->major->allowNull(true);
        $this->focus = new \phpws2\Variable\Alphanumeric(null, 'focus', 20);
        $this->focus->allowNull(true);
        $this->wake_time = new \phpws2\Variable\Alphanumeric(null, 'wake_time', 20);
        $this->wake_time->allowNull(true);
        $this->sleep_time = new \phpws2\Variable\Alphanumeric(null, 'sleep_time', 20);
        $this->sleep_time->allowNull(true);
        $this->overnighter = new \phpws2\Variable\Alphanumeric(null,
                'overnighter', 20);
        $this->overnighter->allowNull(true);
        $this->free_time = new \phpws2\Variable\Alphanumeric(null, 'free_time', 20);
        $this->free_time->allowNull(true);
        $this->cleanliness = new \phpws2\Variable\Alphanumeric(null,
                'cleanliness', 20);
        $this->cleanliness->allowNull(true);
        $this->loudness = new \phpws2\Variable\Alphanumeric(null, 'loudness', 20);
        $this->loudness->allowNull(true);
        $this->study_time = new \phpws2\Variable\Alphanumeric(null,
                'study_time', 20);
        $this->study_time->allowNull(true);
        $this->languages = new \phpws2\Variable\ArrayVar(null, 'languages');
        $this->languages->allowNull(true);
        $this->music = new \phpws2\Variable\ArrayVar(null, 'music');
        $this->music->allowNull(true);
        $this->hobbies = new \phpws2\Variable\ArrayVar(null, 'hobbies');
        $this->hobbies->allowNull(true);
        $this->smoking = new \phpws2\Variable\Alphanumeric(null, 'smoking', 20);
        $this->smoking->allowNull(true);
        $this->pets = new \phpws2\Variable\Alphanumeric(null, 'pets', 20);
        $this->pets->allowNull(true);
        $this->created = new \phpws2\Variable\DateVar(null, 'created');
        $this->updated = new \phpws2\Variable\DateVar(null, 'updated');
    }
    
    public function view()
    {
        $view = $this->getStringVars();
        $view['languages'] = $this->languages->get();
        $view['music'] = $this->music->get();
        $view['hobbies'] = $this->hobbies->get();
        $this->phone->formatNumber(true);
        $view['phone'] = $this->phone->get();
                
        return $view;
    }

}
