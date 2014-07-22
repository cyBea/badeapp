#!/usr/bin/php 
<?php

$ch = curl_init(); 

$header[] = "Host: www.berlin.de"; 
$header[] = "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"; 
$header[] = "Accept-Language: de-de,de;q=0.8,en-us;q=0.5,en;q=0.3"; 
$header[] = "Accept-Encoding: gzip,deflate"; 
$header[] = "Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.7"; 
$header[] = "Keep-Alive: 115"; 
$header[] = "Connection: keep-alive"; 
$header[] = "Cache-Control: max-age=0"; 

$useragent = 'Mozilla/5.0 (Windows; U; Windows NT 5.1; de; rv:1.9.2.3) Gecko/20100401 Firefox/3.6.3';

curl_setopt($ch, CURLOPT_USERAGENT, $useragent); 
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE); 
curl_setopt($ch, CURLOPT_HEADER, TRUE); 
curl_setopt($ch, CURLINFO_HEADER_OUT, TRUE); 
curl_setopt($ch, CURLOPT_NOBODY, FALSE); 
curl_setopt($ch, CURLOPT_HTTPHEADER, $header); 
curl_setopt($ch, CURLOPT_ENCODING, 'gzip,deflate'); 
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10); 
curl_setopt($ch, CURLOPT_TIMEOUT, 25); 
curl_setopt($ch, CURLOPT_FRESH_CONNECT, TRUE); 
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, TRUE); 

$address = "http://www.berlin.de/badegewaesser/baden-details/index.php/index/all.kml?q&badname=--%20Alles%20--&bezirk=--%20Alles%20--&profil=--%20Alles%20--&q_geo&q_radius=20000&ipp=20";

curl_setopt($ch, CURLOPT_URL, $address);
curl_setopt($ch, CURLOPT_REFERER, $address); 

$response = curl_exec($ch);

if(curl_errno($ch)) {
	exit('Curl error: ' . curl_error($ch) . "\n");
}

$kmlResponse = array();
list($kmlResponse["header"], $kmlResponse["body"]) = explode("\r\n\r\n", $response, 2);

$address = "http://www.berlin.de/badegewaesser/baden-details/index.php/index/all.json?q&badname=--%20Alles%20--&bezirk=--%20Alles%20--&profil=--%20Alles%20--&q_geo&q_radius=20000&ipp=20";

curl_setopt($ch, CURLOPT_URL, $address);
curl_setopt($ch, CURLOPT_REFERER, $address);

$response = curl_exec($ch);

if(curl_errno($ch)) {
	exit('Curl error: ' . curl_error($ch) . "\n");
}

$jsonResponse = array();
list($jsonResponse["header"], $jsonResponse["body"]) = explode("\r\n\r\n", $response, 2);

curl_close($ch);


// $kml = json_decode(new CustomKmlToJson().convert($kmlResponse["body"]));
// $json = json_decode(new CustomJsonBla().convert($jsonResponse["body"]));

$srcfile = realpath(dirname(__FILE__) . "/../../../data/lakes_osm.json");

$lakes = json_decode(file_get_contents($srcfile), true);

// X.merge($kml, $json, $lakes);

$outfile = realpath(dirname(__FILE__) . "/../../../data/lakes_with_markers.json");
file_put_contents($outfile, json_encode($lakes, JSON_UNESCAPED_UNICODE));

?>