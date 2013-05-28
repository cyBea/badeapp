$(document).ready(function() {
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