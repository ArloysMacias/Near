describe("Map", function(){

    var nav;
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    }
    function success(pos) {
        var crd = pos.coords;
        console.log('Your current position is:');
        console.log('Latitude : ' + crd.latitude);
        console.log('Longitude: ' + crd.longitude);
        console.log('More or less ' + crd.accuracy + ' meters.');
    }
    function error(err) {
        alert("Your browser does not support the geolocation API.");
    }

    window.google = {
        maps: {
            places: {
                Autocomplete: class {}
            }
        }
    };

    var map;

    beforeEach(function(){
        map=new Map(pos,locations);
        nav=navigator.geolocation;
    });

    //nav.geolocation.getCurrentPosition(success, error, options);

    describe("Geolocation: getting actual position",function(){
        it("Should show an alert if the positipn is empty", function() {
            spyOn(window,"alert");
            initMap('bar');
            expect(window.alert).toHaveBeenCalledWith("Your browser does not support the geolocation API.");
        });


    //     it("should return an error if we don't supply two function", function() {
    //         spyOn(window,"alert")
    //         nav.geolocation.getCurrentPosition(success, error, options);
    //         expect(map.pos).toBe(Object);
    //     });
    //     it("should return an error if we don't supply two function", function() {
    //         spyOn(window,"alert")
    //         nav.geolocation.getCurrentPosition(null);
    //         expect(window.alert).toHaveBeenCalled("Error!");
    //     });
     });

});