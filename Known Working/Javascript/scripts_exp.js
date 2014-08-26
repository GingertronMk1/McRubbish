var exif = "poop";

$(document).ready(function() {
  $('.modal').find('input:text').val('');    
});

function resetAllValues() {
  	$('.modal').find('.textin').val('');
  	$('#file-input').val('');
  	$('canvas').remove();
  	$('#file-input').show();
  	document.getElementById("picpreview").style.marginTop="0px"
  	exif = "poop";
}

function toggleUpload() {
	$('#aboutpage').hide();
	$('#uploadpage').toggle();
  	resetAllValues();
};

function uploadOff() {
	$('#aboutpage').hide();
	$('#uploadpage').hide();
  	resetAllValues();
};

function toggleAbout() {
	$('#uploadpage').hide();
	$('#aboutpage').toggle();
  	resetAllValues();
};

function aboutOff() {
	$('#uploadpage').hide();
	$('#aboutpage').hide();
  	resetAllValues();
};

function findDecDeg(coord) {
	var coordstr = coord.toString(); //converts to string
	var coordar = coordstr.split(','); //converts to array
	var decimalised = (parseFloat(coordar.slice(0,1)) + (parseFloat(coordar.slice(1,2))/60) + (parseFloat(coordar.slice(2,3))/3600)).toFixed(6);
	console.log(decimalised);
	return(decimalised);
};

function latLong(a,b) {
  	$('table').find('#latitude').val(findDecDeg(a));
  	$('table').find('#longitude').val(findDecDeg(b));
  	$('#file-input').hide();
  	document.getElementById("picpreview").style.marginTop="25px"
  	console.log('Image Selected' + ", Coordinates " + "N" + findDecDeg(a) + " " + "W" + findDecDeg(b));
};

function downloadUrl(url,callback) {
	var request = window.ActiveXObject ?
	new ActiveXObject('Microsoft.XMLHTTP') :
    new XMLHttpRequest;

	request.onreadystatechange = function() {
   		if (request.readyState == 4) {
     		request.onreadystatechange = doNothing;
     		callback(request, request.status);
   		}
 	};
 	request.open('GET', url, true);
 	request.send(null);
};

function uploadConfirm() {
	if(exif != "poop") {
		console.log('Upload Confirmed!');
		$("#uploadform").submit();
		uploadOff();
	}
	else {
		console.log("You haven't selected a picture!")
	};
}