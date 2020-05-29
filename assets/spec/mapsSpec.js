function jasmineFunction(){

    describe("Create Marker", function(){
        var places;
        var request = {
            placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
            fields: ['name', 'rating', 'formatted_phone_number', 'geometry']
        };

        var map;
        var testPosition;
        var placeResult;
        //La Havana
        testPosition = {
            lat: 23.113592,
            lng: -82.366592
        };

        beforeEach(function() {
            map=new Mapa();
            map.createMap(testPosition,'mapa');

            var constructorSpy = spyOn(google.maps.places, 'PlacesService');
            places = jasmine.createSpyObj('PlacesService', ['getDetails'])/*.withArgs(request,callback).and.returnValue(results)*/;
            constructorSpy.and.returnValue(places);
        });
        it('returns an error if the data service returns no results', function(done) {
            places.getDetails.and.callFake(function (request,callback){
                callback(results,status);
            });
            places.getDetails(request,function (result,status) {
                status=google.maps.places.PlacesServiceStatus.OK;
            });
            // Act initMap('bar');
            map.initMapa('cafe');
            //createMarker(places);
            // Assert
            expect(places.getDetails(request,function (result,status) {
                status=google.maps.places.PlacesServiceStatus.OK;
            })).toHaveBeenCalled();

            var lastCall = places.getDetails(request, callback).calls.mostRecent();
            var args = lastCall.args[0];

            expect(args.name).toEqual(request.name);

            result.then(function(returnedValue) {
                expect(returnedValue).toEqual([results[0].geometry.location.lat(), results[0].geometry.location.lng()]);
                done();
            });
        });

        function getRandomInRange(from, to, fixed) {
            return parseFloat((Math.random() * (to - from) + from).toFixed(fixed));
        }

        var createResult = function(key) {
            // Generate a random lat/lng value
            var getRandomLatLng = function() {
                return new google.maps.LatLng(
                    getRandomInRange(-180, 180, 7),
                    getRandomInRange(-180, 180, 7));
            };

            return {
                address_components: [],
                formatted_address: key + ' Some Street, Somewhere',
                geometry: {
                    location: getRandomLatLng(),
                    bounds: new google.maps.LatLngBounds(
                        getRandomLatLng(),
                        getRandomLatLng()),
                    location_type: google.maps.GeocoderLocationType.ROOFTOP,
                    viewport: new google.maps.LatLngBounds(
                        getRandomLatLng(),
                        getRandomLatLng())
                },
                types: ['route']
            }
        };

        var resultCount = 10;
        var results = [];
        for (var i = 0; i < resultCount; i++) {
            results.push(createResult(i));
        }
    });


    describe("Get my position", function(){
        var map;
        beforeEach(function () {
            map =new Mapa();
        });

        describe('Geolocation', function () {
            it ('Should show a success alert ', function(){
                spyOn(map, 'getMyPosition');
                spyOn(window, 'alert');
                expect(window.alert).toHaveBeenCalledWith('Success your navegator has geolocation');
            })
        });

    });

    // $(document).ready(function(){
    //     describe('Build Map', function () {
    //         var map;
    //         var testPosition;
    //         var placeResult;
    //         //La Havana
    //         testPosition = {
    //             lat: 23.113592,
    //             lng: -82.366592
    //         };
    //         beforeEach(function () {
    //             map=new Mapa();
    //             map.createMap(testPosition,'mapa');
    //         });
    //         describe('Name of the Place', function () {
    //             it ('Should return La Habana', function(){
    //                 placeResult=map.findPlaces(testPosition,'bar');
    //                 expect(placeResult.formatted_address).toBe("La Habana");
    //             });
    //         });
    //         // alert("You need to click on the markers to initialize the test");
    //         describe('Address Place', function () {
    //             //Current browser position
    //             var laceResult=map.initMapa('cafe');
    //             it ('Should return La Habana', function(){
    //
    //                 expect(laceResult.formatted_address).toBe("La Habana");
    //             });
    //         });
    //     })
    // });
}

