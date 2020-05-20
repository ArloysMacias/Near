function initMap()
{
    // Creamos un mapa con las coordenadas actuales
    navigator.geolocation.getCurrentPosition(function(pos) {

        lat = pos.coords.latitude;
        lon = pos.coords.longitude;

        var myLatlng = new google.maps.LatLng(lat, lon);

        var mapOptions = {
            center: myLatlng,
            zoom: 14,
            mapTypeId: google.maps.MapTypeId.SATELLITE
        };

        map = new google.maps.Map(document.getElementById("mapa"),  mapOptions);



        //The others positions
        var locations = [{
            lat: 59.4182144,
            lng: 17.9372032
        }, {
            lat: 41.084045,
            lng: -73.874256
        }];
        var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        var markers = locations.map(function(location, i) {
            return new google.maps.Marker({
                position: myLatlng,
                label: labels[i % labels.length]
            });
        });
        var markerCluster = new MarkerClusterer(map, markers, {
            imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
        });





        // Creamos el infowindow
        infowindow = new google.maps.InfoWindow();

        // Especificamos la localización, el radio y el tipo de lugares que queremos obtener
        var request = {
            location: myLatlng,
            radius: 2000,
            types: ['cafe']
        };

        // Creamos el servicio PlaceService y enviamos la petición.
        var service;
        service = new google.maps.places.PlacesService(map);

        service.nearbySearch(request, function(results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                    createMarker(results[i]);
                }
            }
        });
    });
}

function createMarker(place)
{
    // Creamos un marcador
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    // Asignamos el evento click del marcador
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}
