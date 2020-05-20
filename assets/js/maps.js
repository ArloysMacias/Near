//Initial function that call the function for get the location
function initMap() {
    getLocation();
}

//Get the location of the navigator
function getLocation () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(currentPosition);
    } else {
        window.alert("Geolocation is not supported by this browser.");
    }
}



//Object that specify where the map will be centered
function Position(lat,lng) {
    this.lat=lat;
    this.lng=lng;
}

//The others positions
var locations = [{
    lat: 59.4182144,
    lng: 17.9372032
}, {
    lat: 41.084045,
    lng: -73.874256
}];
var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

//Get the current position
var map;
function currentPosition (position) {


    var center = new Position(position.coords.latitude, position.coords.longitude);
    map = new google.maps.Map(document.getElementById('map'), {
        zoom:16,
        center,
        mapTypeControl: true,
        navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
        mapTypeId: google.maps.MapTypeId.SATELLITE
    });

    var markers = locations.map(function(location, i) {
        return new google.maps.Marker({
            position: center,
            label: labels[i % labels.length]
        });
    });
    var markerCluster = new MarkerClusterer(map, markers, {
        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
    });
}
