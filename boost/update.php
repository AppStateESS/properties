<?php

/*
 *
 * @author Matthew McNaney <mcnaneym@appstate.edu>
 * @license http://opensource.org/licenses/gpl-3.0.html
 */

use \phpws2\Database;

function properties_update(&$content, $currentVersion)
{
    $propertyUpgrade = new PropertyUpgrade($currentVersion);
    $content = $propertyUpgrade->run($content);
    return true;
}

/**
 * 
 * public function v0_0_0() {
 *  //logic
 *  $changes = array();
 *  $changes[] = 'Change made';
 *  return $this->comments('0.0.0', $changes);
 * }
 */
class PropertyUpgrade
{

    public $content;
    public $current_version;

    public function __construct($current_version)
    {
        $this->current_version = $current_version;
    }

    public function compare($version)
    {
        return version_compare($this->current_version, $version, '<');
    }

    public function getMethodName($version)
    {
        return 'v' . str_replace('.', '_', $version);
    }

    public function run(&$content)
    {
        switch (1) {
            case $this->compare('1.1.0'):
                $methodName = $this->getMethodName('1.1.0');
                $this->$methodName($content);

            case $this->compare('1.1.1'):
                $methodName = $this->getMethodName('1.1.1');
                $this->$methodName($content);

            case $this->compare('1.2.0'):
                $methodName = $this->getMethodName('1.2.0');
                $this->$methodName($content);

            case $this->compare('1.3.0'):
                $methodName = $this->getMethodName('1.3.0');
                $this->$methodName($content);

            case $this->compare('1.4.0'):
                $methodName = $this->getMethodName('1.4.0');
                $this->$methodName($content);

            case $this->compare('1.4.2'):
                $methodName = $this->getMethodName('1.4.2');
                $this->$methodName($content);

            case $this->compare('2.0.0'):
                $methodName = $this->getMethodName('2.0.0');
                $this->$methodName($content);

            case $this->compare('2.0.1'):
                $methodName = $this->getMethodName('2.0.1');
                $this->$methodName($content);

            case $this->compare('2.0.2'):
                $methodName = $this->getMethodName('2.0.2');
                $this->$methodName($content);

            case $this->compare('2.0.3'):
                $methodName = $this->getMethodName('2.0.3');
                $this->$methodName($content);

            case $this->compare('2.0.4'):
                $methodName = $this->getMethodName('2.0.4');
                $this->$methodName($content);

            case $this->compare('2.0.5'):
                $methodName = $this->getMethodName('2.0.5');
                $this->$methodName($content);

            case $this->compare('2.0.6'):
                $methodName = $this->getMethodName('2.0.6');
                $this->$methodName($content);

            case $this->compare('2.0.7'):
                $methodName = $this->getMethodName('2.0.7');
                $this->$methodName($content);

            case $this->compare('2.0.8'):
                $methodName = $this->getMethodName('2.0.8');
                $this->$methodName($content);
        }
        return $content;
    }

    public function v1_1_0(&$content)
    {
        $db = new PHPWS_DB('properties');
        $db->addTableColumn('efficiency', 'smallint not null default 0');
        $this->addContent($content, '1.1.0', array('Added efficiency option'));
    }

    public function v1_1_1(&$content)
    {
        $db = new PHPWS_DB('prop_contacts');
        $db->addTableColumn('company_url', 'VARCHAR( 255 ) NULL');
        $this->addContent($content, '1.1.1',
                array('Added company url', 'Property listing divided into tabs'));
    }

    public function v1_2_0(&$content)
    {
        $db = new PHPWS_DB('properties');
        $db->addWhere('pets_allowed', 1);
        $db->addColumn('id');
        $db->addColumn('pet_type');
        $db->setIndexBy('id');
        $cols = $db->select('col');
        if (!empty($cols)) {
            foreach ($cols as $id => $pets) {
                if (empty($pets)) {
                    continue;
                }

                $db->reset();
                $pets_array = null;
                $pets_array = @unserialize($pets);

                if (!is_array($pets_array)) {
                    continue;
                } else {
                    $pets = implode(', ', $pets_array);
                }
                $db->addWhere('id', $id);
                $db->addValue('pet_type', $pets);
                $db->update();
            }
        }
        $db->reset();
        $db->addTableColumn('pet_fee', 'int not null default 0');

        $db->reset();
        $db->addTableColumn('airconditioning', 'smallint not null default 0');

        $db->reset();
        $db->addTableColumn('heat_type', 'varchar(255) default null');
        $this->addContent($content, '1.2.0',
                array('Pet and airconditioning added'));
    }

    public function v1_3_0(&$content)
    {
        $changes[] = 'Improved look with Bootstrapping.';
        $changes[] = 'Added gas heat and fiber internet/tv.';
        $changes[] = 'Changed login box for IE users';
        $changes[] = 'Added ability to view properties by contact';
        $changes[] = 'Contacts list compacted. Email links to contact name';
        $changes[] = 'Fixed bad function call on error page.';
        $changes[] = 'Added error checks in case 1) the property does not exists or not active or
  2) the image files are not present';
        $changes[] = 'Test for incactive properties preventing error';
        $changes[] = 'Added Bootstrap styling and overhauled to work on mobile devices';
        $changes[] = 'Last logged defaults to creation date';
        $changes[] = 'Fixed Shared Bedroom and Bathroom settings on roommates page';
        $changes[] = 'Fixed active/inactive buttons';

        $this->addContent($content, '1.3.0', $changes);
    }

    public function v1_4_0(&$content)
    {
        if (!is_file(PHPWS_SOURCE_DIR . 'lib/vendor/autoload.php')) {
            $content[] = 'Composer is not installed. Be sure to run `composer install` in your installation\'s lib directory.';
            return false;
        }
        $db = \Database::getDB();
        $t1 = $db->addTable('prop_contacts');
        $dt = $t1->addDataType('private', 'smallint');
        $dt->setDefault(0);
        $dt->add();
        $dt2 = $t1->addDataType('approved', 'smallint');
        $dt2->setDefault(1);
        $dt2->add();
        $t1->addFieldConditional('company_name', 'private%', 'like');
        $t1->addValue('private', 1);
        $db->update();
        $old = $t1->getDataType('company_name');
        $new = clone $old;
        $new->setIsNull(true);
        $t1->alter($old, $new);
        $changes[] = 'Added Private Renter designation.';
        $changes[] = 'Added new manager signup.';

        $this->addContent($content, '1.4.0', $changes);
    }

    public function v1_4_2(&$content)
    {
        $changes[] = 'New user signup requires all email settings to be set.';
        $changes[] = 'Invalid and duplicate email addresses are now checked on signup.';
        $changes[] = 'Fixed: New managers could log in before approved.';

        $this->addContent($content, '1.4.2', $changes);
    }

    public function v2_0_0(&$content)
    {
        require_once PHPWS_SOURCE_DIR . 'mod/properties/boost/updates/2_0_0.php';
        $update = new update_2_0_0($content);
        $updates = $update->run();
        $this->addContent($content, '2.0.0', $updates);
    }

    public function v2_0_1(&$content)
    {
        require_once PHPWS_SOURCE_DIR . 'mod/properties/boost/updates/2_0_1.php';
        $update = new update_2_0_1($content);
        $updates = $update->run();
        $this->addContent($content, '2.0.1', $updates);
    }

    public function v2_0_2(&$content)
    {
        $updates = array('Changed the word manager to landlord');
        $this->addContent($content, '2.0.2', $updates);
    }

    public function v2_0_3(&$content)
    {
        $updates = array('Added backward compatible (< 5.5) password hasher.');
        $this->addContent($content, '2.0.3', $updates);
    }

    public function v2_0_4(&$content)
    {
        $updates = array('Signin button fix for phones.', 'Manager letter fix', 'Authorization link fix');
        $this->addContent($content, '2.0.4', $updates);
    }

    public function v2_0_5(&$content)
    {
        $updates = array('Admin can now delete subleases', 'Users can extend their sublease deadlines', 'Other small fixes');
        $this->addContent($content, '2.0.5', $updates);
    }

    public function v2_0_6(&$content)
    {
        $updates = array('Added missing creation button', 'Put 4 character limit on rent');
        $this->addContent($content, '2.0.6', $updates);
    }

    public function v2_0_7(&$content)
    {
        $updates = array('Changed class name to prevent conflicting class name error.',
            'Increase password timeout to one hour.', 'Rewording to sublease tile');
        $this->addContent($content, '2.0.7', $updates);
    }

    public function v2_0_8(&$content)
    {
        $updates = array('Changed wording on manager page',
            'Added additional manager log-in link and changed sign in to Student sign in');
        $this->addContent($content, '2.0.7', $updates);
    }

    private function addContent(&$content, $version, array $changes)
    {
        $changes_string = implode("\n+", $changes);
        $content[] = <<<EOF
<pre>
Version $version
------------------------------------------------------
+$changes_string
</pre>
EOF;
    }

}
