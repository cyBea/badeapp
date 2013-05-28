$(document).ready(function() {
<<<<<<< HEAD
    initMap();
    setMapDimensions();
});

$(window).resize(function() {
	setMapDimensions();
});


function initMap() {
    badestellenMap = badestellenMap();
}
function setMapDimensions() {
	$('#map').css('height', $(window).height()-140)
}
=======
    init();
});

function init() {
    var map = initMap();
    lakeLayer = new lakeLayer();
    lakeLayer.addLakeOverlays(map);
}

    // function getLakes() {
    //     var lakeData = "data/lakes.json"
    //     $.getJSON(lakeData, {})
    //     .done(function(data) {
    //         $.each( data.index, function( i, item ) {
    //             $(document.createElement('p')).text(item.badname).appendTo( "#lakes" );
    //         });
    //     });
    // }
>>>>>>> 2897036f83944dbe82cf6e7fb5f5c334256e7c6a
