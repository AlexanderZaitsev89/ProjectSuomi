<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
// Using json-data saved in text file
// From: http://coursesweb.net/php-mysql/

// path and name of the file
$filetxt = 'formdata.txt';

// check if the file exists
if(file_exists($filetxt)) {
  // gets json-data from file
  $jsondata = file_get_contents($filetxt);
  echo($jsondata);
  // converts json string into array
  //$arr_data = json_decode($jsondata, true);
  // Now you can use the array $arr_data with json-data saved in text file
  //var_export($arr_data);        // Test to see the array
}
else echo 'The file '. $filetxt .' not exists';


// additional stuff
//$ar = array('apple', 'orange', 'banana', 'strawberry');
//echo json_encode($ar);
?>