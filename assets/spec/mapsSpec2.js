
describe("mapModule", function(){
    var map;

    beforeEach(function () {
        map =new Mapa();
        map.getMyPosition();
    });
    describe('Geolocation', function () {

        it ('Should show a success alert ', function(){
            spyOn(map, 'getMyPosition');
            spyOn(window, 'alert');
            expect(window.alert).toHaveBeenCalledWith('Success your navegator has geolocation');
        })
    });

});
