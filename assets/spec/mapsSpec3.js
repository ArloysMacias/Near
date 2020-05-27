
describe("mapModule", function(){

    var mm, $canvas;

    beforeEach(function(){
        $canvas = $('<div>').attr("id", "mapa");
        $(document.body).append($canvas);
        mm = mapModule("map-canvas");
    });

    afterEach(function(){
        $canvas.remove();
        $canvas = null;
        mm = null;
    });

    it("should encompass all added markers", function(done){
        var mapModule = mm;

        var idleListener = google.maps.event.addListener(mapModule.getMap(), 'idle', function() {

            idleListener.remove(); //don't fire again when bounds are updated
            mapModule.addByLatLen([
                {label:"My marker", lat: 40, len: 20},
                {label:"My marker", lat: 42, len: 23},
                {label:"My marker2", lat: 47, len: 19},
                {label:"My marker3", lat: 59, len: 12}
            ]);

            google.maps.event.addListener(mapModule.getMap(), 'bounds_changed', function() {
                console.log("bounds_changed", mapModule.getMap().getBounds().toString())
                expect(typeof mapModule.getMap().getBounds()).toBe("object");
                expect(isNaN(mapModule.getMap().getBounds().pa.j)).toBe(false);
                expect(mapModule.getMap().getBounds().pa.j < 12).toBe(true);
                expect(mapModule.getMap().getBounds().pa.k > 23).toBe(true);
                expect(mapModule.getMap().getBounds().xa.j < 40).toBe(true);
                expect(mapModule.getMap().getBounds().xa.k > 59).toBe(true);
                done();
            })

            mapModule.updateBounds();
        });
    })
});