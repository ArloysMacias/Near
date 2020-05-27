
describe("mapModule", function(){

    /*var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': '1600 Amphitheatre Parkway, Mountain View, CA 94043' }, function(results) {
        // address results of Google HQ
    });*/


    beforeEach(function() {
        var constructorSpy = spyOn(google.maps, 'Geocoder');
        geocoder = jasmine.createSpyObj('Geocoder', ['geocode']);

        constructorSpy.and.returnValue(geocoder);
    });
    it('returns an error if the data service returns no results', function(done) {

        var location = 'some location value';

        geocoder.geocode.and.callFake(function(request, callback) {
            callback(results, google.maps.GeocoderStatus.OK);
        });

        // Act
        var result = service.geocodeLocation(location);

        // Assert
        expect(geocoder.geocode).toHaveBeenCalled();

        var lastCall = geocoder.geocode.calls.mostRecent();
        var args = lastCall.args[0];
        expect(args.address).toEqual(location);

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
