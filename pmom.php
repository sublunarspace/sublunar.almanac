<?php

/**
* @preserve Copyright (c) 2018 T. F. Raaion, www.sublunar.space
* License MIT: http://www.opensource.org/licenses/MIT
*/

header('Content-type: application/json');

$ts = $_GET['ts'];
$lon = $_GET['lon'];
$lat = $_GET['lat'];
$days = $_GET['days'];

exec ("lib/sweph/pmom $days $ts $lat $lon $moment", $output);

echo $output[0];
?>
