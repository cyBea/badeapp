$(document).ready(function() {
    init();
    setMapDimensions();
});

$(window).resize(function() {
	setMapDimensions();
});

function setMapDimensions() {
	$('#map').css('height', $(window).height()-140)
}

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
