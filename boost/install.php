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
        $property = new \properties\Resource\Property;
        $property->createTable($db);
    } catch (\Exception $e) {
        $db->buildTable($manager->getTable())->drop(true);
        $db->buildTable($property->getTable())->drop(true);

        $db->rollback();
        throw $e;
    }
    $db->commit();

    $content[] = 'Tables created';
    return true;
}