
var map;
var bounds;
var infoPane;
var service;
var markers;
var infoWindow;
var myLatlng;
var result;

//Others positions
var locations = [{
    lat: 23.113592 , lng: -82.366592  /*La Habana*/
}, {
    lat: 23.151291 , lng: -81.260506  /*Varadero*/
}];


//For testing with Jasmine
Mapa=function() {
    //Current browser position
    var pos;
    this.pos=pos;
};
Mapa.prototype.createMap=function (pos,idelement) {

//Any position
    myLatlng = new google.maps.LatLng(pos);

    var mapOptions = {
        center: myLatlng,
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById(idelement), mapOptions);

};
//For testing with Jasmine
Mapa.prototype.findPlaces=function (position,id) {
    var resulta=result;
    initMapAnyPosition(position,id);

    return resulta;
};
//For testing with Jasmine
Mapa.prototype.getMyPosition=function (){
    if (navigator.geolocation) {

        // Create a map with current coordinates
        navigator.geolocation.getCurrentPosition(function (position) {

            //Current browser position
            pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            // console.log("Latitud:  "+pos.lat+"  Long: "+pos.lng);
            alert("Success your navegator has geolocation");


        }, function(objPositionError)
        {
            switch (objPositionError.code)
            {
                case objPositionError.PERMISSION_DENIED:
                    alert("Access to the user's position has not been allowed.");
                    break;
                case objPositionError.POSITION_UNAVAILABLE:
                    alert("Your position information could not be accessed.");
                    break;
                case objPositionError.TIMEOUT:
                    alert("The service has taken too long to respond.");
                    break;
                default:
                    alert("Unknown error.");
            }
        }, {
            maximumAge: 75000,
            timeout: 15000
        });
    }
    else
    {
        alert("Your browser does not support the geolocation API.");
    }
};
//For testing with Jasmine
Mapa.prototype.initMapa=function(id){
    initMap(id);
}

function initMapAnyPosition(position,id) {

    // Initialize variables
    bounds = new google.maps.LatLngBounds();
    infoPane = document.getElementById('panel');
    infoWindow = new google.maps.InfoWindow;

    //Create a map with the current browser position
    map=new Mapa();
    map.createMap(position,'mapa');

    infoWindow.setPosition(position);
    infoWindow.setContent('You are here');
    infoWindow.open(map);


    //******Markers
    //Letters that will have the markers
    var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    //First marker with current position
    locations.unshift(position);
    markers = locations.map(function (position, i) {
        return new google.maps.Marker({
            position: myLatlng,
            label: labels[i % labels.length]
        });
    });
    //Create first marker in the actual position
    var markerCluster = new MarkerClusterer(map, markers, {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    service = new google.maps.places.PlacesService(map);
    markerById(id, myLatlng);

    return result;
}


function initMap(id) {

    // Initialize variables
    bounds = new google.maps.LatLngBounds();
    infoPane = document.getElementById('panel');
    infoWindow = new google.maps.InfoWindow;


    if (navigator.geolocation) {

        // Create a map with current coordinates
        navigator.geolocation.getCurrentPosition(function (position) {

            //Current browser position
            pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            //Create a map with the current browser position
            map=new Mapa()
            map.createMap(pos,'mapa');

            infoWindow.setPosition(pos);
            infoWindow.setContent('You are here');
            infoWindow.open(map);


            //******Markers
            //Letters that will have the markers
            var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            //First marker with current position
            locations.unshift(pos);
            markers = locations.map(function (location, i) {
                return new google.maps.Marker({
                    position: myLatlng,
                    label: labels[i % labels.length]
                });
            });
            //Create first marker in the actual position
            var markerCluster = new MarkerClusterer(map, markers, {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
            service = new google.maps.places.PlacesService(map);
            markerById(id, myLatlng);


        }, function(objPositionError)
        {
            switch (objPositionError.code)
            {
                case objPositionError.PERMISSION_DENIED:
                    alert("Access to the user's position has not been allowed.");
                    break;
                case objPositionError.POSITION_UNAVAILABLE:
                    alert("Your position information could not be accessed.");
                    break;
                case objPositionError.TIMEOUT:
                    alert("The service has taken too long to respond.");
                    break;
                default:
                    alert("Unknown error.");
            }
        }, {
            maximumAge: 75000,
            timeout: 15000
        });
    }
    else
    {
        alert("Your browser does not support the geolocation API.");
    }
}

//Mark the map depending of the id
function markerById(id,myLatlng) {
    type=id;
    var request = {
        location: myLatlng,
        radius: 5000,
        type
    };
    service.nearbySearch(request, function(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            createMarker(results);
        }
    });
}

// Set markers at the location of each place result
function createMarker(places) {
    for (var i = 0; i < places.length; i++) {
        clearMarkers();
        addMarkerWithTimeout(places[i], i * 200);
        // Adjust the map bounds to include the location of this marker
        bounds.extend(places[i].geometry.location);
    }
}
//Add animation to the marker
function addMarkerWithTimeout(place, timeout) {

    var marker = new google.maps.Marker({
        position: place.geometry.location,
        animation: google.maps.Animation.DROP,
        map: map,
        title: place.name
    });

    window.setTimeout(function() {markers.push(marker);}, timeout);

    addListenerToMarker(marker,place);

}
function clearMarkers() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
}


// Add click listener to each marker
function addListenerToMarker(marker,place){
    google.maps.event.addListener(marker, 'click', function() {
        var request = {
            placeId: place.place_id,
            fields: ['name', 'formatted_address', 'rating',
                'website', 'photos']
        };
        service.getDetails(request, (placeResult, status) => {
            showDetails(placeResult, marker, status)
        });

        //Make the marker jump when it is clicked
        if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
        }

        window.location.href = "#panel";

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
    result=placeResult;

    var firstPhoto;
    var i=0;
    while (i < placeResult.photos.length) {
        if(placeResult.photos[i]){
            firstPhoto = placeResult.photos[i];
            break;
        }
        i++;
    }

    var name = placeResult.name;
    var rat = placeResult.rating;
    var websiteUrl = placeResult.website;
    var address=placeResult.formatted_address;
    fillPanel(placeResult,firstPhoto,rat,websiteUrl,address,name);
    return result;
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
        document.getElementById('rating').style.display = 'none';
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