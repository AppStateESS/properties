<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class update_2_0_0
{

    public function run()
    {
        $updates = array();
        try {
            $db = \phpws2\Database::getDB();
            $db->begin();

            $this->adjustAmounts();

            $this->updatePropertyColumns();
            $updates[] = 'Added smoking note to properties';
            $updates[] = 'Added property type to properties';
            $updates[] = 'Removed efficiency and window_number columns from properties';

            $this->updateContactsTable();
            $updates[] = 'Contacts have ability to reset their password.';

            $this->rewritePrivates();
            $updates[] = 'No more private managers. All managers are named.';

            $this->fixControlPanel();

            $this->fixHeatType();

            $this->updatePassword();
            $updates[] = 'Manager passwords extended, better security';

            $this->createInquiryTable();
            $updates[] = 'Manager inquiries can be made in admin';

            $this->createSubleaseTable();
            $updates[] = 'Added sublease section separate from roommmates';
            $updates[] = 'Subleases may now have pictures.';

            $this->createRoommateTable();
            $updates[] = 'All roommate flushed. Students will need to re-enter.';

            $this->updatePropertyPhotos();
            $updates[] = 'Property photos may now be ordered.';

            $this->createBanTable();
            $updates[] = 'Added Ban Table';

            $this->updateSequences();

            $db->commit();
        } catch (\Exception $ex) {
            $db->rollback();
            throw $ex;
        }
        return $updates;
    }

    private function createBanTable()
    {
        $db = Database::getDB();
        $tbl = $db->buildTable('prop_banned');
        $tbl->addPrimaryIndexId();
        $dt2 = $tbl->addDataType('user_id', 'varchar');
        $dt3 = $tbl->addDataType('reason', 'varchar');
        $tbl->create();
    }

    private function updateSequences()
    {
        $tables = array('prop_contacts', 'prop_messages', 'prop_photo',
            'prop_report', 'properties');
        foreach ($tables as $tbl_name) {
            $db = Database::getDB();
            $tbl = $db->addTable($tbl_name);
            $tbl->serializePrimaryKey();
            $seq = $db->addTable($tbl_name . '_seq');
            $seq->drop();
        }
    }

    private function createRoommateTable()
    {
        $db = \phpws2\Database::getDB();
        $roommate_table = $db->addTable('prop_roommate');
        $roommate_table->drop(true);
        $roommate = new \properties\Resource\Roommate;
        $roommate->createTable($db);
    }

    private function createSubleaseTable()
    {
        $db = \phpws2\Database::getDB();
        $sublease = new \properties\Resource\Sublease;
        $sublease->createTable($db);

        $sublease_table = $db->addTable('prop_sublease');
        $sublease_table_id = $sublease_table->getDataType('id');
        $sublease_photo_resource = new \properties\Resource\SubleasePhoto;
        $sublease_photo_resource->createTable($db);
        $sublease_photo_table = $db->buildTable($sublease_photo_resource->getTable());
        $sublease_photo_sid_column = $sublease_photo_table->getDataType('sid');
        $sublease_photo_index = new \phpws2\Database\ForeignKey($sublease_photo_sid_column,
                $sublease_table_id);
        $sublease_photo_index->add();
    }

    private function createInquiryTable()
    {
        $db = \phpws2\Database::getDB();
        $db->begin();
        $tbl = $db->buildTable('prop_inquiry');
        $tbl->addDataType('contact_id', 'int');
        $tbl->addDataType('inquiry_date', 'int');
        $tbl->addDataType('inquiry_type', 'varchar')->setSize(20);
        $tbl->create();
    }

    /**
     * Removes odd column from contacts table. Not even sure where it came from.
     */
    private function updateContactsTable()
    {
        $db = Database::getDB();
        $tbl = $db->addTable('prop_contacts');
        if ($tbl->columnExists('default_active')) {
            $tbl->dropColumn('default_active');
        }

        $dt = $tbl->addDataType('pw_timeout', 'int');
        $dt->setDefault(0);
        $dt->add();

        $dt2 = $tbl->addDataType('pw_hash', 'varchar');
        $dt2->setIsNull(true);
        $dt2->add();
    }

    /**
     * Adds proptype column to properties
     * Replaces efficiency column
     */
    private function updatePropertyColumns()
    {
        $db = Database::getDB();
        $tbl = $db->addTable('properties');
        $dt = $tbl->addDataType('proptype', 'smallint');
        $dt->setDefault(0);
        $dt->add();

        $dt = $tbl->addDataType('smoking_allowed', 'smallint');
        $dt->setDefault(0);
        $dt->add();

        $tbl->addValue('proptype', 1);
        $tbl->addFieldConditional('efficiency', 1);
        $db->update();

        $tbl->dropColumn('window_number');
        $tbl->dropColumn('efficiency');
        $tbl->dropColumn('sublease');
        $tbl->dropColumn('approved');
    }

    /**
     * Removes 00 from amounts
     */
    private function adjustAmounts()
    {
        $db = Database::getDB();
        $tbl = $db->addTable('properties');

        /** reduce fee values * */
        $admin_fee = new \phpws2\Database\Expression($tbl->getField('admin_fee_amt') . '* 0.01');
        $monthly_rent = new \phpws2\Database\Expression($tbl->getField('monthly_rent') . '* 0.01');
        $security_amt = new \phpws2\Database\Expression($tbl->getField('security_amt') . '* 0.01');
        $pet_fee = new \phpws2\Database\Expression($tbl->getField('pet_fee') . '* 0.01');
        $parking_fee = new \phpws2\Database\Expression($tbl->getField('parking_fee') . '* 0.01');
        $pet_deposit = new \phpws2\Database\Expression($tbl->getField('pet_deposit') . '* 0.01');
        $clean_fee_amt = new \phpws2\Database\Expression($tbl->getField('clean_fee_amt') . '* 0.01');
        $util_water = new \phpws2\Database\Expression($tbl->getField('util_water') . '* 0.01');
        $util_trash = new \phpws2\Database\Expression($tbl->getField('util_trash') . '* 0.01');
        $util_power = new \phpws2\Database\Expression($tbl->getField('util_power') . '* 0.01');
        $util_fuel = new \phpws2\Database\Expression($tbl->getField('util_fuel') . '* 0.01');
        $util_cable = new \phpws2\Database\Expression($tbl->getField('util_cable') . '* 0.01');
        $util_internet = new \phpws2\Database\Expression($tbl->getField('util_internet') . '* 0.01');
        $util_phone = new \phpws2\Database\Expression($tbl->getField('util_phone') . '* 0.01');

        $tbl->addValue('admin_fee_amt', $admin_fee);
        $tbl->addValue('monthly_rent', $monthly_rent);
        $tbl->addValue('security_amt', $security_amt);
        $tbl->addValue('pet_fee', $pet_fee);
        $tbl->addValue('parking_fee', $parking_fee);
        $tbl->addValue('pet_deposit', $pet_deposit);
        $tbl->addValue('clean_fee_amt', $clean_fee_amt);
        $tbl->addValue('util_water', $util_water);
        $tbl->addValue('util_trash', $util_trash);
        $tbl->addValue('util_power', $util_power);
        $tbl->addValue('util_fuel', $util_fuel);
        $tbl->addValue('util_cable', $util_cable);
        $tbl->addValue('util_internet', $util_internet);
        $tbl->addValue('util_phone', $util_phone);

        $db->update();
    }

    /**
     * Fixes old control panel link
     */
    private function fixControlPanel()
    {
        $db = \phpws2\Database::getDB();
        $tbl = $db->addTable('controlpanel_link');
        $tbl->addFieldConditional('itemname', 'properties');
        $tbl->addValue('url', './properties/');
        $db->update();
    }

    /**
     * Fixes old array format of heat type
     * @return null
     */
    private function fixHeatType()
    {
        $db = \phpws2\Database::getDB();
        $tbl = $db->addTable('properties');
        $tbl->addFieldConditional('heat_type', null, 'is not');
        $result = $db->select();
        if (empty($result)) {
            return;
        }
        foreach ($result as $row) {
            $testing = json_decode($row['heat_type']);
            if (is_array($testing)) {
                continue;
            }
            $heat_type = unserialize($row['heat_type']);
            if (is_array($heat_type)) {
                $db->clearConditional();
                $tbl->reset();
                $tbl->addValue('heat_type',
                        json_encode(array_values($heat_type)));
                $tbl->addFieldConditional('id', $row['id']);
                $db->update();
            }
        }
    }

    /**
     * Changes length of password varchar column
     */
    private function updatePassword()
    {
        $db = Database::getDB();
        $tbl = $db->addTable('prop_contacts');
        $newdt = new \phpws2\Database\Datatype\Varchar($tbl, 'password', 255);
        $tbl->alter($tbl->getDataType('password'), $newdt);
    }

    /*
     * Changes all private renters to managers using the contact name.
     */

    private function rewritePrivates()
    {
        $db = \phpws2\Database::getDB();
        $tbl = $db->addTable('prop_contacts');
        $tbl->addField('id');
        $tbl->addField('company_name');
        $tbl->addField('first_name');
        $tbl->addField('last_name');
        $tbl->addFieldConditional('private', 1);
        $privates = $db->select();
        $db->clearConditional();
        if (empty($privates)) {
            return;
        }
        foreach ($privates as $contact) {
            if (preg_match('/private renter/i', $contact['company_name'])) {
                $db->clearConditional();
                $tbl->reset();
                $tbl->addValue('company_name',
                        $contact['first_name'] . ' ' . $contact['last_name']);
                $tbl->addFieldConditional('id', $contact['id']);
                $db->update();
            }
        }
    }

    private function updatePropertyPhotos()
    {
        $db = \phpws2\Database::getDB();

        $tbl = $db->addTable('prop_photo');
        if (!$tbl->columnExists('porder')) {
            $dt = $tbl->addDataType('porder', 'int');
            $dt->setDefault(1);
            $dt->add();
        }

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
        $tbl->dropColumn('main_pic');
    }
}
