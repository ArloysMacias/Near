
var pos;
var map;
var bounds;
var infoPane;
var service;

function initMap(id)
{
    // Initialize variables
    bounds = new google.maps.LatLngBounds();
    infoPane = document.getElementById('panel');

    // Create a map with current coordinates
    navigator.geolocation.getCurrentPosition(function(position) {

        pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        //Current browser position
        var myLatlng = new google.maps.LatLng(pos);

        var mapOptions = {
            center: myLatlng,
            zoom: 14,
            mapTypeId: google.maps.MapTypeId.HYBRID
        };

        map = new google.maps.Map(document.getElementById("mapa"),  mapOptions);

        //Others positions
        var locations = [{
            lat: 59.4182144,
            lng: 17.9372032
        }, {
            lat: 41.084045,
            lng: -73.874256
        }];

        //Letters that will have the markers
        var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        //First marker with current position
        var markers = locations.map(function(location, i) {
            return new google.maps.Marker({
                position: myLatlng,
                label: labels[i % labels.length]
            });
        });
        //Create first marker
        var markerCluster = new MarkerClusterer(map, markers, {
            imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
        });

        markerById(id,myLatlng);
    });
}
var type=['bar'];

function markerById(id,myLatlng) {
//location, the radius and the type of places to obtain

    type=[id];

    var request = {
        location: myLatlng,
        radius: 11000,
        type
    };
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, function(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            createMarker(results);
        }
    });
}

// Set markers at the location of each place result
function createMarker(places) {

    places.forEach(place => {
        var marker = new google.maps.Marker({
            position: place.geometry.location,
            map: map,
            title: place.name
        });
        addListenerToMarker(marker,place);

        // Adjust the map bounds to include the location of this marker
        bounds.extend(place.geometry.location);
    });
    /*Show all the markers within the visible area*/
    map.fitBounds(bounds);
}

// Add click listener to each marker
function addListenerToMarker(marker,place){
    google.maps.event.addListener(marker, 'click', () => {
        var request = {
            placeId: place.place_id,
            fields: ['name', 'formatted_address', 'geometry', 'rating',
                'website', 'photos']
        };
        service.getDetails(request, (placeResult, status) => {
            showDetails(placeResult, marker, status)
        });
    });
}

//Call the function that create the panel
function showDetails(placeResult, marker, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        showPanel(placeResult);
    } else {
        console.log('showDetails failed: ' + status);
    }
}

//Add the values of the api to a variable and call the function that fill the html
function showPanel(placeResult){
    var firstPhoto = placeResult.photos[0];
    var name = placeResult.name;
    var rat = placeResult.rating;
    var websiteUrl = placeResult.website;
    var address=placeResult.formatted_address;
    fillPanel(placeResult,firstPhoto,rat,websiteUrl,address,name)
}

//Fill al the element of the index.html related to the panel
function fillPanel(placeResult,firstPhoto,rat,websiteUrl,add,name){
    if (firstPhoto) {
        document.getElementById('photo').style.visibility="visible";
        document.getElementById('photo').src = firstPhoto.getUrl();
    }
    if (name){
        document.getElementById("name").innerHTML = name;
    }
    if (rat){
        var ratingHtml = '';
        for (var i = 0; i < 5; i++) {
            if (rat < (i + 0.5)) {
                ratingHtml += '&#10025;';
            } else {
                ratingHtml += '&#10029;';
            }
            document.getElementById('rating').style.display = '';
            document.getElementById('rating').innerHTML= `Rating: ${rat} ${ratingHtml} `;
        }
    } else {
        document.getElementById('rating-row').style.display = 'none';
    }
    if(add){
        document.getElementById("address").textContent=`Address: ${add}`;
    }
    if (websiteUrl) {
        document.getElementById('web').style.visibility="visible";
        document.getElementById('web').href = websiteUrl;
    }
}

//Remove the element from the html (DOM)
// function removeElement(id) {
//     // remove all child nodes
//     var dv = document.getElementById(id);
//     while (dv.hasChildNodes()) {
//         dv.removeChild(dv.lastChild);
//     }
// }