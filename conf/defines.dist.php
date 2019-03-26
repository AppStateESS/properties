<?php

/**
 * This is the default defines file for properties. You should make a copy
 * (defines.php) and save it in the properties/conf/ directory. Change your
 * settings within it.
 * 
 * Updates to properties will overwrite this file.
 */
// 1 : smtp
// 2 : sendmail
// 3 : was mail and is deprecated, do not use
if (!defined('SWIFT_MAIL_TRANSPORT_TYPE')) {
    define('SWIFT_MAIL_TRANSPORT_TYPE', 2);
}

// depends on the choice above
// 1 : server location
// 2 : location of sendmail
// http://swiftmailer.org/docs/sending.html
if (!defined('SWIFT_MAIL_TRANSPORT_PARAMETER')) {
    define('SWIFT_MAIL_TRANSPORT_PARAMETER', '/usr/sbin/sendmail -t -i');
}

define('PROPERTIES_REACT_DEV', false);

// If true, exceptions are caught and an error page is shown
define('PROPERTIES_FRIENDLY_ERRORS', true);
