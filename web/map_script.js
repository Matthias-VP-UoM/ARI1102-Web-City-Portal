// create map and insert it to HTML
var map = L.map('map').setView([35.85556, 14.43639], 15);
var marker = L.marker([35.85556, 14.43639]).addTo(map);

marker.bindPopup("<b style=\"font-size:15px;\">Is-Siġġiewi</b>").openPopup();

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

/*var circle = L.circle([35.854843, 14.437398], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(map);*/

/*var polygon = L.polygon([
    [35.849, 14.4356],
    [35.8573, 14.4277],
    [35.863, 14.4485],
    [35.855, 14.4453]
]).addTo(map);*/

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);

// get list of hotspots in Siggiewi using AJAX GET call
var request = new XMLHttpRequest () ;
var hpath = "http://api.geonames.org/findNearbyWikipediaJSON?formatted=true&lat=35.8546&lng=14.4381&radius=2&maxRows=10&username=mattvpulis&country=MT";

var jsonHotSpots;
request.open ("GET", hpath, false);
request.send();

// parse the JSON data
jsonHotSpots = JSON.parse(request.responseText);
console.log(jsonHotSpots);
console.log(jsonHotSpots.geonames[0]);

var clist = Object.keys(jsonHotSpots);

var i;

// create and add a marker and popup for each hotspot
for(i = 0; i < jsonHotSpots.geonames.length; i++){
    // eliminate the creation of a marker for the main city and for other generated hotspots that are outside of Siggiewi after retrieving the hotspots
    if (jsonHotSpots.geonames[i].title == "Siġġiewi" || jsonHotSpots.geonames[i].lat > 35.86){
        continue;
    }
    var marker = L.marker([jsonHotSpots.geonames[i].lat, jsonHotSpots.geonames[i].lng]).addTo(map);
    marker.bindPopup("<u style=\"font-size:14px;\">"+jsonHotSpots.geonames[i].title+"</u><br>"+jsonHotSpots.geonames[i].summary+"<br><a href=https://"+jsonHotSpots.geonames[i].wikipediaUrl+" target=\"_blank\">Click here to learn more about "+jsonHotSpots.geonames[i].title+"</a>");
    console.log("Marker has been added for: "+jsonHotSpots.geonames[i].title);
}
