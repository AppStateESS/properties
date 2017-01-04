<?php
// 1 : smtp
// 2 : sendmail
// 3 : Mail
define('SWIFT_MAIL_TRANSPORT_TYPE', 3);

// depends on the choice above
// 1 : server location
// 2 : location of sendmail
// http://swiftmailer.org/docs/sending.html
define('SWIFT_MAIL_TRANSPORT_PARAMETER', 'localhost');

define('PROPERTIES_REACT_DEV', false);

// Change this, but ONLY ONCE. If changed later, 
// managers will not be able to log in.
define('PROPERTIES_MANAGER_SALT', 'DzGdGuRQlX');