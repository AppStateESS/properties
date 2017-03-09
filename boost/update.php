<?php

/*
 *
 * @author Matthew McNaney <mcnaneym@appstate.edu>
 * @license http://opensource.org/licenses/gpl-3.0.html
 */

function properties_update(&$content, $currentVersion)
{
    $propertyUpgrade = new PropertyUpgrade;
    switch ($currentVersion) {
        case (version_compare($currentVersion, '1.1.0', '<')):
            $db = new PHPWS_DB('properties');
            $result = $db->addTableColumn('efficiency',
                    'smallint not null default 0');
            if (PHPWS_Error::isError($result)) {
                PHPWS_Error::log($result);
                $content[] = 'ERROR - could not add efficiency column';
                return false;
            }
            $content[] = '<pre>1.1.0 updates
---------------
+ Added efficiency option</pre>';

        case (version_compare($currentVersion, '1.1.1', '<')):
            $db = new PHPWS_DB('prop_contacts');
            $result = $db->addTableColumn('company_url', 'VARCHAR( 255 ) NULL');
            if (PHPWS_Error::isError($result)) {
                PHPWS_Error::log($result);
                $content[] = 'ERROR - could not add company_url column';
                return false;
            }
            $content[] = '<pre>1.1.1 updates
---------------
+ Added company url
+ Property listing divided into tabs.</pre>';

        case (version_compare($currentVersion, '1.2.0', '<')):
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
            $result = $db->addTableColumn('pet_fee', 'int not null default 0');
            if (PHPWS_Error::isError($result)) {
                PHPWS_Error::log($result);
                $content[] = 'ERROR - could not add pet_fee column';
                return false;
            }

            $db->reset();
            $result = $db->addTableColumn('airconditioning',
                    'smallint not null default 0');
            if (PHPWS_Error::isError($result)) {
                PHPWS_Error::log($result);
                $content[] = 'ERROR - could not add airconditioning column';
                return false;
            }

            $db->reset();
            $result = $db->addTableColumn('heat_type',
                    'varchar(255) default null');
            if (PHPWS_Error::isError($result)) {
                PHPWS_Error::log($result);
                $content[] = 'ERROR - could not add heat_type column';
                return false;
            }

        case (version_compare($currentVersion, '1.2.1', '<')):
            $content[] = '<pre>1.2.1 updates
---------------
- Improved look with Bootstrapping.</pre>';

        case (version_compare($currentVersion, '1.2.2', '<')):
            $content[] = '<pre>1.2.2 updates
---------------
+ Added gas heat and fiber internet/tv.
</pre>';
        case (version_compare($currentVersion, '1.3.0', '<')):
            $content[] = <<<EOF
<pre>1.3.0 updates
-----------------
+ Changed login box for IE users
+ Added ability to view properties by contact.
+ Contacts list compacted. Email links to contact name.
+ Fixed bad function call on error page.
+ Added error checks in case 1) the property does not exists or not active or
  2) the image files are not present.
+ Test for incactive properties preventing error.
+ Added Bootstrap styling and overhauled to work on mobile devices.
+ Last logged defaults to creation date.
+ Fixed Shared Bedroom and Bathroom settings on roommates page.
+ Fixed active/inactive buttons.
</pre>
EOF;
        case (version_compare($currentVersion, '1.4.0', '<')):
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
            $content[] = <<<EOF
<pre>1.4.0 updates
-----------------
+ Added Private Renter designation.
+ Added new manager signup.
</pre>
EOF;
        case (version_compare($currentVersion, '1.4.1', '<')):
            $content[] = <<<EOF
<pre>1.4.1 updates
-----------------
+ New user signup requires all email settings to be set.
+ Invalid and duplicate email addresses are now checked on signup.
</pre>
EOF;
        case (version_compare($currentVersion, '1.4.2', '<')):
            $content[] = <<<EOF
<pre>1.4.2 updates
-----------------
+ Fixed: New managers could log in before approved.
</pre>
EOF;

        case (version_compare($currentVersion, '2.0.0', '<')):
            $content[] = $propertyUpgrade->v2_0_0();

        case (version_compare($currentVersion, '2.0.1', '<')):
            $content[] = $propertyUpgrade->v2_0_1();

        case (version_compare($currentVersion, '2.0.2', '<')):
            $content[] = $propertyUpgrade->v2_0_2();

        case (version_compare($currentVersion, '2.0.3', '<')):
            $content[] = $propertyUpgrade->v2_0_3();

        case (version_compare($currentVersion, '2.0.4', '<')):
            $content[] = $propertyUpgrade->v2_0_4();

        case (version_compare($currentVersion, '2.0.5', '<')):
            $content[] = $propertyUpgrade->v2_0_5();

        case (version_compare($currentVersion, '2.0.6', '<')):
            $content[] = $propertyUpgrade->v2_0_6();
    }
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

    public function v2_0_0()
    {
        try {
            $db = \phpws2\Database::getDB();
            $db->begin();
            $tbl = $db->addTable('properties');
            $dt = $tbl->addDataType('proptype', 'smallint');
            $dt->setDefault(0);
            $dt->add();

            $tbl->addValue('proptype', 1);
            $tbl->addFieldConditional('efficiency', 1);
            $db->update();
            $db->commit();
        } catch (\Exception $ex) {
            $db->rollback();
            $content[] = 'Update failed: ' . $ex->getMessage();
            return false;
        }
        $changes = array();
        $changes[] = ' Rewrite of original properties modules.';
        return $this->comments('2.0.0', $changes);
    }

    public function v2_0_1()
    {
        try {
            $db = \phpws2\Database::getDB();
            $db->begin();
            $tbl = $db->buildTable('prop_inquiry');
            $tbl->addDataType('contact_id', 'int');
            $tbl->addDataType('inquiry_date', 'int');
            $tbl->addDataType('inquiry_type', 'varchar')->setSize(20);
            $tbl->create();
            $db->commit();
        } catch (\Exception $ex) {
            $db->rollback();
            $content[] = 'Update failed: ' . $ex->getMessage();
            return false;
        }
        $changes = array();
        $changes[] = 'Inquiry feature added.';
        return $this->comments('0.0.0', $changes);
    }

    public function v2_0_2()
    {
        try {
            $db = \phpws2\Database::getDB();
            $db->begin();
            $tbl = $db->addTable('properties');
            $dt = $tbl->addDataType('smoking_allowed', 'smallint');
            $dt->setDefault(0);
            $dt->add();
            $db->clearTables();

            $sublease = new \properties\Resource\Sublease;
            $sublease->createTable($db);
            $sub_table = $db->buildTable($sublease->getTable());
            $db->commit();
        } catch (\Exception $ex) {
            $db->rollback();
            $content[] = 'Update failed: ' . $ex->getMessage();
            return false;
        }
        $changes = array();
        $changes[] = 'Added smoking note.';
        return $this->comments('2.0.2', $changes);
    }

    public function v2_0_3()
    {
        try {
            $db = \phpws2\Database::getDB();
            $db->begin();
            $tbl = $db->addTable('prop_contacts');
            $dt = $tbl->addDataType('pw_timeout', 'int');
            $dt->setDefault(0);
            $dt->add();
            $dt2 = $tbl->addDataType('pw_hash', 'varchar');
            $dt2->setIsNull(true);
            $dt2->add();
            $db->commit();
        } catch (\Exception $ex) {
            $db->rollback();
            $content[] = 'Update failed: ' . $ex->getMessage();
            return false;
        }
        return $this->comments('2.0.3', array('Inquiry feature added'));
    }

    public function v2_0_4()
    {
        try {
            $db = \phpws2\Database::getDB();
            $db->begin();
            $sublease_table = $db->getTable('sublease');
            $sublease_table_id = $sub_table->getDataType('id');
            $sublease_photo_resource = new \properties\Resource\SubleasePhoto;
            $sublease_photo_resource->createTable($db);
            $sublease_photo_table = $db->buildTable($sublease_photo_resource->getTable());
            $sublease_photo_sid_column = $sublease_photo_table->getDataType('sid');
            $sublease_photo_index = new \phpws2\Database\ForeignKey($sublease_photo_sid_column,
                    $sublease_table_id);
            $sublease_photo_index->add();
            $db->commit();
        } catch (\Exception $ex) {
            $db->rollback();
            $content[] = 'Update failed: ' . $ex->getMessage();
            return false;
        }
        return $this->comments('2.0.4', array('Added sublease photos'));
    }

    public function v2_0_5()
    {
        try {
            $db = \phpws2\Database::getDB();
            $db->begin();
            $roommate = new \properties\Resource\Roommate;
            $roommate->createTable($db);
            $db->commit();
        } catch (\Exception $ex) {
            $db->rollback();
            $content[] = 'Update failed: ' . $ex->getMessage();
            return false;
        }
        return $this->comments('2.0.5', array('Added roommate section'));
    }

    public function v2_0_6()
    {
        $changes = array();
        try {
            $db = \phpws2\Database::getDB();
            $db->begin();

            $tbl = $db->addTable('prop_photo');
            $dt = $tbl->addDataType('porder', 'int');
            $dt->setDefault(1);
            $dt->add();
            $changes[] = 'Added porder to prop_photo';

            $tbl = $db->addTable('prop_sub_photo');
            $dt = $tbl->addDataType('porder', 'int');
            $dt->setDefault(1);
            $dt->add();
            $changes[] = 'Added porder to prop_sub_photo';

            $db = \phpws2\Database::getDB();
            $tbl = $db->addTable('prop_photo');
            $photos = $db->select();

            $aCount = array();

            foreach ($photos as $p) {
                $property_id = $p['pid'];
                $db->clearTables();
                $db->clearConditional();
                $tbl = $db->addTable('prop_photo');

                $tbl->addFieldConditional('id', $p['id']);
                if ((int) $p['main_pic'] === 1) {
                    $tbl->addValue('porder', 1);
                } else {
                    if (isset($aCount[$property_id])) {
                        $aCount[$property_id] ++;
                        $current_count = $aCount[$property_id];
                    } else {
                        $current_count = $aCount[$property_id] = 2;
                    }
                    $tbl->addValue('porder', $current_count);
                }
                $db->update();
            }

            $changes[] = 'Ordered photos in prop_photo';
            $db->commit();
        } catch (\Exception $ex) {
            $db->rollback();
            $content[] = 'Update failed: ' . $ex->getMessage();
            return false;
        }

        return $this->comments('2.0.6', $changes);
    }

    private function comments($version, array $changes)
    {
        $changes_string = implode("\n+", $changes);
        return <<<EOF
<pre>
Version $version
------------------------------------------------------
+$changes_string
</pre>
EOF;
    }

}
