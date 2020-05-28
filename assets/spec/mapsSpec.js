function jasmineFunction(){
    describe("mapModule", function(){

        var places;
        var request = {
            placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
            fields: ['name', 'rating', 'formatted_phone_number', 'geometry']
        };
        var status=google.maps.places.PlacesServiceStatus.OK;

        function callback(results, status){
            request = {
                placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
                fields: ['name', 'formatted_address', 'rating',
                    'website', 'photos']
            };
            status=google.maps.places.PlacesServiceStatus.OK;
        }

        var marker;

        beforeEach(function() {



            var constructorSpy = spyOn(google.maps.places, 'PlacesService');
            places = jasmine.createSpyObj('PlacesService', ['getDetails'])/*.withArgs(request,callback).and.returnValue(results)*/;

            marker = new google.maps.Marker({
                position: places[0].geometry.location,
                animation: google.maps.Animation.DROP,
                map: map,
                title: places[0].name
            });


            constructorSpy.and.returnValue(places);
        });

        it('returns an error if the data service returns no results', function(done) {

            places.getDetails.and.callFake(function (request,callback){
                callback(results,status);
            });

            results= [{
                placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
                fields: ['name', 'rating', 'formatted_phone_number', 'geometry']
            },{
                placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
                fields: ['name', 'rating', 'formatted_phone_number', 'geometry']
            }]

            // Act initMap('bar');
            addListenerToMarker(marker,places)

            console.log(places.getDetails(request, callback));


            // Assert
            expect(places.getDetails(request, callback)).toHaveBeenCalled();

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
}

