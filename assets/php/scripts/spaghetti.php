#!/usr/bin/php 
<?php

$address = "http://www.berlin.de/badegewaesser/baden-details/index.php/index/all.kml?q&badname=--%20Alles%20--&bezirk=--%20Alles%20--&profil=--%20Alles%20--&q_geo&q_radius=20000&ipp=20"; 
$useragent = 'Mozilla/5.0 (Windows; U; Windows NT 5.1; de; rv:1.9.2.3) Gecko/20100401 Firefox/3.6.3';  

$ch = curl_init(); 

$header[] = "Host: www.berlin.de"; 
$header[] = "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"; 
$header[] = "Accept-Language: de-de,de;q=0.8,en-us;q=0.5,en;q=0.3"; 
$header[] = "Accept-Encoding: gzip,deflate"; 
$header[] = "Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.7"; 
$header[] = "Keep-Alive: 115"; 
$header[] = "Connection: keep-alive"; 
$header[] = "Cache-Control: max-age=0"; 

curl_setopt($ch, CURLOPT_URL, $address);
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
curl_setopt($ch, CURLOPT_REFERER, $address); 
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, TRUE); 

$response = curl_exec($ch);

$address = "http://www.berlin.de/badegewaesser/baden-details/index.php/index/all.json?q&badname=--%20Alles%20--&bezirk=--%20Alles%20--&profil=--%20Alles%20--&q_geo&q_radius=20000&ipp=20";

curl_setopt($ch, CURLOPT_URL, $address);
curl_setopt($ch, CURLOPT_REFERER, $address);

$response2 = curl_exec($ch);

curl_close($ch);

list($responseHeaders, $responseBody) = explode("\r\n\r\n", $response, 2);

$lines = html_entity_decode(implode("\n", array_slice(explode("\n", $responseBody), 4, -2)));
$entries = explode("<Placemark>", $lines);

$json = '{';

foreach ($entries as $value) {
	$start = strpos($value, "<name>");
	if($start !== false) {
		$end = strpos($value, "</name>");
		if($end !== false) {
			$start = $start + 6;
			$length = $end - $start;
			$name = substr($value, $start, $length);
			if(strpos($name, " / ") !== false) {
				$name = substr($name, 0, strpos($name, " / "));
			}
		}
	}
	$start = strpos($value, "<coordinates>");
	if($start !== false) {
		$end = strpos($value, ",0</coordinates>");
		if($end !== false) {
			$start += 13;
			$length = $end - $start;
			$coordinates = substr($value, $start, $length);
		}
	}
	if(isset($name) && isset($coordinates)) {
		$json .= '"'. $name .'":{"coordinates":[' . $coordinates . ']},'; //last kein komma
	}
}

$jsonObject1 = json_decode(substr($json, 0, -1) . '}', true);

// zweite bearbeitung 
list($responseHeaders, $responseBody) = explode("\r\n\r\n", $response2, 2);

$jsonObject2 = json_decode($responseBody);

if (is_array($jsonObject2->index)){
  foreach ($jsonObject2->index as $entry) {
	  $start = strpos($entry->badestellelink, "|");
	  if($start !== false) {
		  $end = strpos($entry->badestellelink, "]]");
		  if($end !== false) {
			  $start += 1;
			  $length = $end - $start;
			  $name = substr($entry->badestellelink, $start, $length);

			  if(isset($jsonObject1[$name])) {
				  $jsonObject1[$name]["profil"] = $entry->profil;
				  $jsonObject1[$name]["bezirk"] = $entry->bezirk;
				  $jsonObject1[$name]["dat"] = $entry->dat;
				  $jsonObject1[$name]["eco"] = $entry->eco;
				  $jsonObject1[$name]["ente"] = $entry->ente;
				  $jsonObject1[$name]["sicht"] = $entry->sicht;
				  $jsonObject1[$name]["ente"] = $entry->ente;

				  $color = str_replace(".jpg", "", $entry->farbe);
				  //$end = strpos($color, "_");
				  /*if($end !== false) {
					  echo $color;
					  $color = substr($color, $end);
					  echo "aktualisiert:" . $color;
				  }*/
				  switch($color) {
					  case "gruen":
						  $color = "lawngreen";
						  break;
					  case "gelb":
						  $color = "yellow";
						  break;
					  case "rot":
						  $color = "red";
						  break;
					  case "gruen_a":
						  $color = "lawngreen_a";
						  break;
					  case "gelb_a":
						  $color = "yellow_a";
						  break;
					  case "rot_a":
						  $color = "red_a";
						  break;
					  default:
						  $color = "grey";
				  }
				  $jsonObject1[$name]["color"] = $color;
			  }
		  }
	  }
  }
}
$arr = array("Dämeritzsee", "Große Krampe", "Kleiner Müggelsee", "Krumme Lanke", "Schlachtensee", "Seddinsee");

foreach ($arr as $key) {
	if (isset($jsonObject1[$key])) {
		$jsonObject1[$key]["profil"] = $key;
	}
}

$file = "../../../data/lakes_osm.json";

$jsonObject3 = json_decode(file_get_contents($file), true);

if (is_array($jsonObject1)){
  foreach ($jsonObject1 as $key => $value) {
	  if(isset($jsonObject3[$value["profil"]])) {
		  $jsonObject3[$value["profil"]]["markers"][$key] = $value;
	  }
  }
}

if (is_array($jsonObject3)){
  foreach ($jsonObject3 as $lakeName => $lake) {

	  if(isset($lake["markers"])) {
		  $i = 0.0;
		  $j = 0;
		  foreach ($lake["markers"] as $markerName => $marker) {
			  switch($marker["color"]) {
						  case "lawngreen":
							  $i += 3.0;
							  $j += 1;
							  break;
						  case "lawngreen_a":
							  $i += 3.0;
							  $j += 1;
							  break;
						  case "yellow":
							  $i += 2.0;
							  $j += 1;
							  break;
						  case "yellow_a":
							  $i += 2.0;
							  $j += 1;
							  break;
						  case "red":
							  $i += 1.0;
							  $j += 1;
							  break;
						  case "red_a":
							  $i += 1.0;
							  $j += 1;
							  break;
						  default:
							  break;
					  }
		  }

		  $k = 0.0;

		  if($j > 0) {
			  $k = round($i/$j);
		  }

		  switch ($k) {
			  case 3.0:
				  $jsonObject3[$lakeName]["color"] = "lawngreen";
				  break;
			  case 2.0:
				  $jsonObject3[$lakeName]["color"] = "yellow";
				  break;
			  case 1.0:
				  $jsonObject3[$lakeName]["color"] = "red";
				  break;
			  default:
				  $jsonObject3[$lakeName]["color"] = "grey";
				  break;
		  }
	  } else {
		  $jsonObject3[$lakeName]["color"] = "grey";
	  }
  }
}
  
$outfile = "../../../data/lakes_with_markers.json";

file_put_contents($outfile, json_encode($jsonObject3, JSON_UNESCAPED_UNICODE));
?>