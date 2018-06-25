<?php
// 1 : smtp
// 2 : sendmail
// 3 : was mail and is deprecated, do not use
define('SWIFT_MAIL_TRANSPORT_TYPE', 2);

// depends on the choice above
// 1 : server location
// 2 : location of sendmail
// http://swiftmailer.org/docs/sending.html
define('SWIFT_MAIL_TRANSPORT_PARAMETER', 'localhost');

define('PROPERTIES_REACT_DEV', false);

// If true, exceptions are caught and an error page is shown
define('PROPERTIES_FRIENDLY_ERRORS', true);