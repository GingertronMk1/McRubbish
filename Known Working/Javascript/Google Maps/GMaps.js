function initialize() {
  
  function downloadUrl(url,callback) {
 var request = window.ActiveXObject ?
     new ActiveXObject('Microsoft.XMLHTTP') :
     new XMLHttpRequest;

 request.onreadystatechange = function() {
   if (request.readyState == 4) {
     request.onreadystatechange = '';
     callback(request, request.status);
   }
 };

 request.open('GET', url, true);
 request.send(null);
};

function bindInfoWindow(marker, map, infoWindow, html) {
  google.maps.event.addListener(marker, 'click', function() {
    infoWindow.setContent(html);
    infoWindow.open(map, marker);
  });
};

var customIcon = {
  	url: 'Pictures/pin.png',
  	anchor: new google.maps.Point(15, 15),
  	scaledSize: new google.maps.Size(30, 30)
	};

downloadUrl("/Javascript/Google Maps/Map Connect.php", function(data) {
  var xml = data.responseXML;
  var markers = xml.documentElement.getElementsByTagName("marker");
  for (var i = 0; i < markers.length; i++) {
    var name = markers[i].getAttribute("Username");
    var title = markers[i].getAttribute("Title");
    var type = markers[i].getAttribute("Description");
    var imgsrc = "'" + markers[i].getAttribute('PicFilePath') + "'";
    console.log(imgsrc);
    var orient = switchOrientation(markers[i].getAttribute('Orientation'));
    var point = new google.maps.LatLng(
        parseFloat(markers[i].getAttribute("Latitude")),
        0-parseFloat(markers[i].getAttribute("Longitude")));
    var html = "<b>" + name + "</b> <br/> <b>" + title + "</b> <br/> <img src=" + imgsrc + " style='position: relative; max-width: 200px; max-height: 200px; -moz-transform:rotate(" + orient + "deg); -webkit-transform:rotate(" + orient + "deg); -o-transform:rotate(" + orient + "deg); -ms-transform:rotate(" + orient + "deg); margin: auto; padding: auto; clear: both; top: 50px;'/>";
    var infoWindow = new google.maps.InfoWindow;
    var icon = customIcon;
    var marker = new google.maps.Marker({
      map: map,
      position: point,
      icon: icon,
    });
    bindInfoWindow(marker, map, infoWindow, html);
  }
});

  var mapOptions = {
	zoom: 7,
    center: new google.maps.LatLng(53.7443, -0.3325),
    zoomControl: true,
	zoomControlOptions: {position: google.maps.ControlPosition.LEFT_CENTER},
	streetViewControl: false,
	mapTypeControl: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
	panControl: false,
	minZoom: 5,
	maxZoom: 18,
  	};
  
  var strictBounds = new google.maps.LatLngBounds(
  	new google.maps.LatLng(49.9, -10.5), 
    new google.maps.LatLng(59, 1.8)
  );
  
  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	  
  var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">xxDeXtr0y3rxx</h1>'+
      '<p style="text-align: center;"><img src="http://gizmo-the-geek.net/wp-content/uploads/2010/02/mcdonalds-rubbish.jpg" style="width: 100px; height: 80px"/></p>'+
	  '<p>Image take 20:13 04/03/2014 </p>'
	  '</div>'+
      '</div>';
  var infowindow = new google.maps.InfoWindow({
      content: contentString
  });

  var styleArray = [
  
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [
      { color: "#d9462e" },
    ]
  },
  
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [
      { color: "#e36f5d" },
    ]
  },
  
  {
    featureType: "road",
    elementType: "labels",
    stylers: [
      { visibility: "off" }
    ]
  },
  
  {
    featureType: "poi",
    stylers: [
      { visibility: "on" }
    ]
  },
  
  {
    featureType: "poi",
    stylers: [
      { saturation: "-100" },
      { lightness: "50" },
    ]
  },
  
  {
    featureType: "transit",
    stylers: [
      { visibility: "off" }
    ]
  },
  
  {
    featureType: "administrative.country",
    elementType: "labels",
    elementType: "geometry",
    stylers: [
      { visibility: "off" }
    ]
  },
  
  {
    featureType: "administrative.localities",
    elementType: "labels.text.fill",
    stylers: [
      { color: "#747474" }
    ]
  },
  
  {
    featureType: "administrative.province",
    elementType: "labels",
    elementType: "geometry.stroke",
    stylers: [
      { visibility: "off" }
    ]
  },
  
  {
    featureType: "administrative.neighborhood",
    stylers: [
      { visibility: "off" }
    ]
  },
  
  {
    featureType: "water",
    elementType: "labels",
    stylers: [
      { visibility: "off" }
    ]
  },
  
  {
    featureType: "water",
    stylers: [
      { color: "#7EC5EB" }
    ]
  },
  
];
  map.setOptions({styles: styleArray});
  
  google.maps.event.addListener(map, 'dragend', function() {
    if (strictBounds.contains(map.getCenter())) return;
    var c = map.getCenter(),
                x = c.lng(),
                y = c.lat(),
                maxX = strictBounds.getNorthEast().lng(),
                maxY = strictBounds.getNorthEast().lat(),
                minX = strictBounds.getSouthWest().lng(),
                minY = strictBounds.getSouthWest().lat();

                if (x < minX) x = minX;
                if (x > maxX) x = maxX;
                if (y < minY) y = minY;
                if (y > maxY) y = maxY;

                map.setCenter(new google.maps.LatLng(y, x));
  });

};

google.maps.event.addDomListener(window, 'load', initialize);

