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
        $this->move_in_date = new \phpws2\Variable\IntegerVar(null,
                'move_in_date');
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
        $this->wake_time = new \phpws2\Variable\Alphanumeric(null, 'wake_time',
                20);
        $this->wake_time->allowNull(true);
        $this->sleep_time = new \phpws2\Variable\Alphanumeric(null,
                'sleep_time', 20);
        $this->sleep_time->allowNull(true);
        $this->overnighter = new \phpws2\Variable\Alphanumeric(null,
                'overnighter', 20);
        $this->overnighter->allowNull(true);
        $this->free_time = new \phpws2\Variable\Alphanumeric(null, 'free_time',
                20);
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

    public function view($format = false, $as_string=false)
    {
        $view = $this->getStringVars();
        if ($format) {
            $this->phone->formatNumber(true);
            $view['phone_format'] = $this->phone->get();
            if ($this->move_in_date->get() < time()) {
                $view['move_in_date'] = 'Right now!';
            } else {
                $view['move_in_date'] = strftime('%B %e, %Y',
                        $this->move_in_date->get());
            }
            $view['languages'] = $this->getLanguages($as_string);
            $view['music'] = $this->getMusic($as_string);
            $view['hobbies'] = $this->getHobbies($as_string);
            $view['focus'] = $this->getFocus();
            $view['wake_time'] = $this->getWakeTimes();
            $view['sleep_time'] = $this->getSleepTimes();
            $view['free_time'] = $this->getFreeTime();
            $view['cleanliness'] = $this->getCleanliness();
            $view['loudness'] = $this->getLoudness();
            $view['study_time'] = $this->getStudyTime();
            $view['smoking'] = $this->getSmoking();
            $view['pets'] = $this->getPets();
            $view['politics'] = $this->getPolitics();
        } else {
            $view['languages'] = $this->languages->get();
            $view['music'] = $this->music->get();
            $view['hobbies'] = $this->hobbies->get();
        }

        return $view;
    }

    protected function getHobbies($as_string=false)
    {
        static $hobbies = array(
            'arts_and_crafts' => 'Arts and Crafts',
            'books_and_reading' => 'Books and Reading',
            'cars' => 'Cars',
            'church_activities' => 'Church Activities',
            'collecting' => 'Collecting',
            'computers_and_technology' => 'Computers and Technology',
            'dancing' => 'Dancing',
            'fashion' => 'Fashion',
            'fine_arts' => 'Fine Arts',
            'gardening' => 'Gardening',
            'games' => 'Games',
            'humor' => 'Humor',
            'investing_personal_finance' => 'Investing/Personal Finance',
            'movies' => 'Movies',
            'music' => 'Music',
            'outdoor_activities' => 'Outdoor Activities',
            'pets_and_animals' => 'Pets and Animals',
            'photography' => 'Photography',
            'politics' => 'Politics',
            'sports' => 'Sports',
            'travel' => 'Travel',
            'tv_shows' => 'TV Shows',
            'volunteering' => 'Volunteering',
            'writing' => 'Writing',
            'rotc' => 'Military / ROTC'
        );
        if ($this->hobbies->isEmpty()) {
            return null;
        }
        $join_array = array_intersect_key($hobbies, array_flip($this->hobbies->get()));
        
        if ($as_string) {
            return implode(', ', $join_array);
        } else {
            return $join_array;
        }
    }

    protected function getStudyTime()
    {
        static $stimes = array(
            'early_morning' => 'Early in the morning',
            'morning_afternoon' => 'In the morning and early afternoon',
            'afternoon_evening' => 'In the afternoon and early evening',
            'evening' => 'In the evening',
            'late_night' => 'Late at night'
        );
        if ($this->study_time->isEmpty()) {
            return null;
        }
        return $stimes[$this->study_time->get()];
    }

    protected function getWakeTimes()
    {
        static $waketimes = array(
            'six_or_earlier' => 'Before 6:00AM',
            'six_to_eight' => 'Between 6:00AM and 8:00AM',
            'eight_to_ten' => 'Between 8:00AM and 10:00AM',
            'ten_to_noon' => 'Between 10:00AM and Noon',
            'noon_or_later' => 'Between Noon or later'
        );
        if ($this->wake_time->isEmpty()) {
            return null;
        }
        return $waketimes[$this->wake_time->get()];
    }

    protected function getSleepTimes()
    {
        $sleeptimes = array(
            'eight_or_earlier' => '8:00pm or earlier',
            'eight_to_ten' => '8:00pm to 10:00pm',
            'ten_to_midnight' => '10:00pm to midnight',
            'after_midnight' => 'After midnight'
        );
        if ($this->sleep_time->isEmpty()) {
            return null;
        }
        return $sleeptimes[$this->sleep_time->get()];
    }

    protected function getPolitics()
    {
        static $politics = array(
            'very_liberal' => 'Very liberal',
            'somewhat_liberal' => 'Somewhat liberal',
            'moderate' => 'Moderate',
            'somewhat_conservative' => 'Somewhat conservative',
            'very_conservative' => 'Very conservative'
        );
        if ($this->politics->isEmpty()) {
            return null;
        }
        return $politics[$this->politics->get()];
    }

    protected function getLanguages($as_string = false)
    {
        static $languages = array(
            'Arabic' => 'Arabic',
            'Bengali' => 'Bengali',
            'Chinese' => 'Chinese',
            'English' => 'English',
            'French' => 'French',
            'German' => 'German',
            'Hindi' => 'Hindi',
            'Italian' => 'Italian',
            'Japanese' => 'Japanese',
            'Javanese' => 'Javanese',
            'Korean' => 'Korean',
            'Malay' => 'Malay',
            'Marathi' => 'Marathi',
            'Portuguese' => 'Portuguese',
            'Punjabi' => 'Punjabi',
            'Russian' => 'Russian',
            'Spanish' => 'Spanish',
            'Tamil' => 'Tamil',
            'Telugu' => 'Telugu',
            'Vietnamese' => 'Vietnamese'
        );
        if ($this->languages->isEmpty()) {
            return null;
        }

        $join_array = array_intersect_key($languages,
                array_flip($this->languages->get()));
        if ($as_string) {
            return implode(', ', $join_array);
        } else {
            return $join_array;
        }
    }

    protected function getOvernighter()
    {
        static $overnight = array(
            'Occasionally' => 'Occasionally', 'Rarely' => 'Rarely', 'Never' => 'Never');
        if ($this->overnighter->isEmpty()) {
            return null;
        }
        return $overnight[$this->overnighter->get()];
    }

    protected function getMusic($as_string=false)
    {
        static $music = array(
            'alternative' => 'Alternative',
            'ambient' => 'Ambient',
            'beach' => 'Beach',
            'bluegrass' => 'Bluegrass',
            'blues' => 'Blues',
            'religious' => 'Religious',
            'classical' => 'Classical',
            'classic_rock' => 'Classic Rock',
            'country' => 'Country',
            'electronic' => 'Electronic',
            'folk' => 'Folk',
            'heavy_metal' => 'Heavy metal',
            'hip_hop' => 'Hip hop',
            'house' => 'House',
            'industrial' => 'Industrial',
            'jazz' => 'Jazz',
            'popular_music' => 'Popular music',
            'progressive' => 'Progressive',
            'punk' => 'Punk',
            'r_and_b' => 'R&B',
            'rap' => 'Rap',
            'reggae' => 'Reggae',
            'rock' => 'Rock',
            'world_music' => 'World music'
        );
        if ($this->music->isEmpty()) {
            return null;
        }
        $join_array = array_intersect_key($music,
                array_flip($this->music->get()));
        if ($as_string) {
            return implode(', ', $join_array);
        } else {
            return $join_array;
        }
    }

    protected function getFreeTime()
    {
        static $freetime = array(
            'go_out' => 'I like to go out with friends',
            'stay_in_friends' => 'I like to stay in with friends',
            'time_alone' => 'I like relaxing alone'
        );
        if ($this->free_time->isEmpty()) {
            return null;
        }
        return $freetime[$this->free_time->get()];
    }

    protected function getLoudness()
    {
        static $loudness = array(
            'very_loud' => 'I am pretty loud', 'loud' => 'I can get loud', 'average' => 'I do not get loud', 'quiet' => 'I am quiet', 'very_quiet' => 'I am very quiet'
        );
        if ($this->loudness->isEmpty()) {
            return null;
        }
        return $loudness[$this->loudness->get()];
    }

    protected function getCleanliness()
    {
        static $clean = array(
            'very_messy' => 'Messy and disorganized', 'messy' => 'Somewhat messy and disorganized', 'average' => 'Fairly clean', 'clean' => 'Quite clean and tidy', 'very_clean' => 'Very clean and very tidy'
        );
        if ($this->cleanliness->isEmpty()) {
            return null;
        }
        return $clean[$this->cleanliness->get()];
    }

    protected function getSmoking()
    {
        static $smoking = array(
            'never' => 'I never smoke', 'sometimes' => 'I sometimes smoke',
            'outside' => 'I smoke, but do so outside', 'inside' => 'I smoke inside'
        );
        if ($this->smoking->isEmpty()) {
            return null;
        }
        return $smoking[$this->smoking->get()];
    }

    protected function getPets()
    {
        static $pets = array(
            'none' => 'I do not want pets',
            'want' => 'Do not have a pet, but want one',
            'have' => 'I have a pet',
            'accept' => 'I can room with someone with a pet'
        );
        if ($this->pets->isEmpty()) {
            return null;
        }
        return $pets[$this->pets->get()];
    }

    protected function getFocus()
    {
        static $focus = array(
            'academic' => 'My academic and intellectual growth',
            'relationships' => 'The friends and relationships I create at college',
            'both' => 'Both my academics and relationships equally',
        );
        if ($this->focus->isEmpty()) {
            return null;
        }
        return $focus[$this->focus->get()];
    }

}
