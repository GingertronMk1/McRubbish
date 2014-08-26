<? 
header("Location: http://mcrubbish.ngrok.com/index.html"); //redirects back to main page upon completion

if(exif_imagetype($_FILES["picture"]["tmp_name"]) !== FALSE) {
	
	$Username=$_POST["username"]; 
	$Title=$_POST["title"]; 
	$Description=$_POST["description"]; 
	$Latitude=$_POST["gpslat"];
	$Longitude=$_POST["gpslong"];
	$Picture=('Uploads/' . $Username . $Title . $_FILES['picture']['name']);
	$temp=explode(".", $_FILES["picture"]["name"]);
	
	mysql_connect("localhost", "root", "") or die(mysql_error()); 
	mysql_select_db("Storage") or die(mysql_error()); 
	mysql_query("INSERT INTO `Pictures` VALUES ('ID', '$Username', '$Title', '$Description', '$Latitude', '$Longitude', '$Picture')"); //adds to database table

	move_uploaded_file($_FILES["picture"]["tmp_name"], $Picture); //moves pictures to upload folder
	
	Print "Your information has been successfully added to the database.";
	mysql_close(); 
	
} else {
	die("No image file set!");
};
exit;
?>