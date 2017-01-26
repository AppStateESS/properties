<?php

/**
 * @author Matthew McNaney <mcnaneym at appstate dot edu>
 */
function properties_install(&$content)
{
    $db = \phpws2\Database::getDB();
    $db->begin();

    try {
        $manager = new \properties\Resource\Manager;
        $manager->createTable($db);
        $manager_tbl = $db->buildTable($manager->getTable());
        $manager_id = $manager_tbl->getDataType('id');

        $property = new \properties\Resource\Property;
        $property->createTable($db);
        $property_tbl = $db->buildTable($property->getTable());
        $property_id = $property_tbl->getDataType('id');
        $cid = $property_tbl->getDataType('contact_id');
        $property_index = new \phpws2\Database\ForeignKey($cid, $manager_id);
        $property_index->add();

        $photo = new \properties\Resource\Photo;
        $photo->createTable($db);
        $photo_tbl = $db->buildTable($photo->getTable());
        $pid = $photo_tbl->getDataType('pid');
        $photo_index = new \phpws2\Database\ForeignKey($pid, $property_id);
        $photo_index->add();

        $sublease = new \properties\Resource\Sublease;
        $sublease->createTable($db);
        $sub_table = $db->buildTable($sublease->getTable());
        $user_id = $sub_table->getDataType('user_id');
        $sublease_index = new \phpws2\Database\Unique($user_id);
        $sublease_index->add();
        
        $db = \phpws2\Database::getDB();
        $tbl = $db->buildTable('prop_inquiry');
        $tbl->addDataType('contact_id', 'int');
        $tbl->addDataType('inquiry_date', 'int');
        $tbl->addDataType('inquiry_type', 'varchar')->setSize('20');
        $tbl->create();
    } catch (\Exception $e) {
        \phpws2\Error::log($e);
        $db->buildTable($manager->getTable())->drop(true);
        $db->buildTable($property->getTable())->drop(true);
        $db->buildTable($photo->getTable())->drop(true);
        $db->buildTable($sublease->getTable())->drop(true);

        $db->rollback();
        throw $e;
    }
    $db->commit();

    $content[] = 'Tables created';
    return true;
}
