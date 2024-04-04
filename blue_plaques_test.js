function initialize() {
    var map = L.map('mapdiv');
    map.setView([53.79804655828452, -1.5427751265932252], 14);
        
    //Load tiles from open street map
    L.tileLayer('http://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data ©OpenStreetMap contributors, CC-BY-SA, Imagery ©CloudMade',
        maxZoom: 18 
    }).addTo(map); //add the basetiles to the map object
        
    for (var id in os_markers)  { 
        var info = "<div class='infowindow'><h1>" + os_markers[id].title + "</h1><p>Caption: " + os_markers[id].caption + "</p></div>";

        // Convert co-ords
        var osPt = new OSRef(os_markers[id].easting, os_markers[id].northing);
        
        var llPt = osPt.toLatLng(osPt);
        llPt.OSGB36ToWGS84();
		
		//custom marker
        var myIcon = L.icon({
            iconUrl : 'marker.png',
            iconSize: [16, 16]
        });

        var markerLocation = new L.LatLng(llPt.lat, llPt.lng);
        var marker = new L.Marker(markerLocation, {icon: myIcon}).addTo(map).bindPopup(info);
    }
}

