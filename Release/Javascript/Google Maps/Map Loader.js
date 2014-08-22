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
}

downloadUrl("Map Connect.php", function(data) {
  var xml = data.responseXML;
  var markers = xml.documentElement.getElementsByTagName("marker");
  for (var i = 0; i < markers.length; i++) {
    var name = markers[i].getAttribute("Username");
    var address = markers[i].getAttribute("Title");
    var type = markers[i].getAttribute("Description");
    var point = new google.maps.LatLng(
        parseFloat(markers[i].getAttribute("Latitude")),
        parseFloat(markers[i].getAttribute("Longitude")));
    var html = "<b>" + Title + "</b> <br/>" + Username;
    var icon = customIcons;
    var marker = new google.maps.Marker({
      map: map,
      position: point,
      icon: icon.icon
    });
    bindInfoWindow(marker, map, infoWindow, html);
  }
});

var customIcon = {
    icon: './Pictures/pin.png'
};

function bindInfoWindow(marker, map, infoWindow, html) {
  google.maps.event.addListener(marker, 'click', function() {
    infoWindow.setContent(html);
    infoWindow.open(map, marker);
  });
}