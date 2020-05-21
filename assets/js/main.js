$(document).ready(function(){
    $( "span" ).click(function() {
        $( this ).fadeOut( 1000, function() {
            $( "div" ).text( "'" + $( this ).text() + "' has faded!" );
            $( this ).remove();
        });
    });
    $( "span" ).hover(function() {
        $( this ).addClass( "hilite" );
    }, function() {
        $( this ).removeClass( "hilite" );
    });
})
