function initialize() {
    var map = L.map('mapdiv');
    map.setView([53.79804655828452, -1.5427751265932252], 14);
        
    //Load tiles from open street map
    L.tileLayer('http://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data ©OpenStreetMap contributors, CC-BY-SA, Imagery ©CloudMade',
        maxZoom: 18 
    }).addTo(map); //add the basetiles to the map object
}

function fetchData()	{
	
	//Define array to hold results returned from server
	tweetData = new Array();
	
	//AJAX request to server; accepts a URL to which the request is sent 
	//and a callback function to execute if the request is successful. 
	$.getJSON("fetchData.php", function(results)	{ 
		
		//Populate tweetData with results
		for (var i = 0; i < results.length; i++ )	{
			
			tweetData.push ({
				id: results[i].id, 
				body: results[i].body, 
				lat: results[i].lat, 
				lon: results[i].lon
			}); 
		}
		
		plotTweets(); 
});
	
	function plotTweets()	{	
	
		for (var i = 0; i< markerData.length; i++)	{ 
		var markerLocation = new L.LatLng(markerData[i].lat,markerData[i].lng);
        var marker = new L.Marker(markerLocation).addTo(map).bindPopup(markerData[i].pop);			
		}
	}
}

function clearData() {
    map.eachLayer(function(layer) {
        if (layer.getLatLng) {
            map.removeLayer(layer); 
        }
    });
  }

		
	
	