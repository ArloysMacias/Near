if(navigator.geolocation){
    var success = function(position){
        var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
        var myOptions = {
            zoom: 15,
            center: latlng,
            mapTypeControl: false,
            navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        var map = new google.maps.Map(document.getElementById("map"), myOptions)
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title:"Estás aquí! (en un radio de "+position.coords.accuracy+" metros)"
        })
    }
    navigator.geolocation.getCurrentPosition(success, function(msg){
        console.error( msg );
    });
}
