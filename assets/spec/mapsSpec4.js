$(document).ready(function(){
    describe('Place name', function () {

        var map;
        var testPosition;
        var placeResult;
        //La Havana
        testPosition = {
            lat: 23.113592,
            lng: -82.366592
        };
        beforeEach(function () {
            map=new Mapa();
            map.createMap(testPosition,'mapa');
        });

        describe('Name of the Place', function () {

            it ('Should return Varadero', function(){
                placeResult=map.findPlaces(testPosition,'cafe');
                expect(placeResult.formatted_address).toBe("La Habana, Cuba");
            });
        });
        // alert("You need to click on the markers to initialize the test");
        describe('Your position', function () {
            //Current browser position
            map.initMapYoursPosition('cafe');
            it ('Should return Varadero', function(){
                expect(placeResult.formatted_address).toBe("La Habana, Cuba");
            });
        });
    })
});
