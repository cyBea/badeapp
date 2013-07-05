#!/usr/bin/php -q
<?php
$file = "../../../data/lakes_with_markers.json";

$geofile =  "../../../data/geoBadestellen.json";

$jsonObject = json_decode(file_get_contents($file), true);
$geoJSON = json_decode(file_get_contents($geofile), true);


foreach ($jsonObject as $gewaesser => $badestelle) {

	foreach ($badestelle["markers"] as $badestellenname => $badevalues){
	$jsonObject[$gewaesser]["markers"][$badestellenname]["coordinates"][0] = floatval($geoJSON[$badestellenname]["lat"]);
	$jsonObject[$gewaesser]["markers"][$badestellenname]["coordinates"][1] = floatval($geoJSON[$badestellenname]["long"]);
	
	
	}
	
	
}

$jsonObject2 = json_encode($jsonObject, JSON_UNESCAPED_UNICODE);

file_put_contents($file, $jsonObject2);


?>