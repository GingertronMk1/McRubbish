mgr = new MarkerManager(map);
    google.maps.event.addListener(mgr, 'loaded', function() {
        for (var i = 0; i < 1000; i++) {
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(Math.random() * 180 - 90, Math.random() * 360 - 180),
                title: "Random marker #" + i
            });
            mgr.addMarker(marker, 0);
        }
        mgr.refresh();
    });