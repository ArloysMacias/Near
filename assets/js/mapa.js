
    var pos;
    var map;
    var bounds;
    var infoWindow;
    var currentInfoWindow;
    var service;
    var infoPane;
// Servicio PlaceService
    var service;

    function initMap()
    {

        // Initialize variables
        bounds = new google.maps.LatLngBounds();
        infoWindow = new google.maps.InfoWindow;
        currentInfoWindow = infoWindow;
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


            // Infowindow
            infowindow = new google.maps.InfoWindow();

            //location, the radius and the type of places to obtain
            var request = {
                location: myLatlng,
                radius: 11000,
                types: ['bar']
            };


            service = new google.maps.places.PlacesService(map);

            service.nearbySearch(request, function(results, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    createMarker(results);
                }
            });
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

            /* TODO: Step 4B: Add click listeners to the markers */
            // Add click listener to each marker
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
            // Adjust the map bounds to include the location of this marker
            bounds.extend(place.geometry.location);
        });
        /* Once all the markers have been placed, adjust the bounds of the map to
         * show all the markers within the visible area. */
        map.fitBounds(bounds);
    }

// Builds an InfoWindow to display details above the marker
    function showDetails(placeResult, marker, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {

            var placeInfowindow = new google.maps.InfoWindow();
            var rating = "None";

            if (placeResult.rating) {
                rating = placeResult.rating;
            }
            placeInfowindow.setContent('<div><strong>' + placeResult.name +
                '</strong><br>' + 'Rating: ' + rating + '</div>');
            placeInfowindow.open(marker.map, marker);
            currentInfoWindow.close();
            currentInfoWindow = placeInfowindow;

            showPanel(placeResult);
        } else {
            console.log('showDetails failed: ' + status);
        }
    }

    function showPanel(placeResult){
        var firstPhoto = placeResult.photos[0];
        var name = placeResult.name;
        var rat = placeResult.rating;
        var websiteUrl = placeResult.website;
        var address=placeResult.formatted_address;
        fillPanel(placeResult,firstPhoto,rat,websiteUrl,address,name)
    }

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

    function removeElement(id) {
        // remove all child nodes
        var dv = document.getElementById(id);
        while (dv.hasChildNodes()) {
            dv.removeChild(dv.lastChild);
        }
    }

