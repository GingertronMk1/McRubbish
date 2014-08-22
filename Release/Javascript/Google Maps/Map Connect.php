<?php

$username="root";
$password="";
$database="Storage";

// Start XML file, create parent node

$dom = new DOMDocument("1.0", "UTF-8");
$doc = $dom->createElement("Markers");
$parnode = $dom->appendChild($doc);

// Opens a connection to a MySQL server

$connection=mysql_connect ('localhost', $username, $password);
if (!$connection) {  die('Not connected : ' . mysql_error());}

// Set the active MySQL database

$db_selected = mysql_select_db($database, $connection);
if (!$db_selected) {
  die ('Can\'t use db : ' . mysql_error());
}

// Select all the rows in the Pictures table

$query = "SELECT * FROM Pictures WHERE 1";
$result = mysql_query($query);
if (!$result) {
  die('Invalid query: ' . mysql_error());
}

header("Content-type: text/xml");

// Iterate through the rows, adding XML nodes for each

while ($row = @mysql_fetch_assoc($result)){
  // ADD TO XML DOCUMENT NODE 
  $node = $dom->createElement("marker");
  $newnode = $doc->appendchild($node);
  $newnode->setAttribute("ID", $row['ID']);
  $newnode->setAttribute("Username", $row['Username']);
  $newnode->setAttribute("Title", $row['Title']);
  $newnode->setAttribute("Description", $row['Description']);
  $newnode->setAttribute("Latitude", $row['Latitude']);
  $newnode->setAttribute("Longitude", $row['Longitude']);
  $newnode->setAttribute("Orientation", $row['Orientation']);
  $newnode->setAttribute("PicFilePath", $row['Picture']);
}


echo $dom->saveXML();

?>
