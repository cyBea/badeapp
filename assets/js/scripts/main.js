$(document).ready(function() {
    initMap();
    getLakes();
});

function initMap() {
    var southWest = new L.LatLng(52.3380737304688, 13.0883140563965);
    var northEast = new L.LatLng(52.6754760742188, 13.7609090805054);
    var berlinBounds = new L.LatLngBounds(southWest, northEast);
    var map = L.map('map')
    map.setMaxBounds(berlinBounds);
    map.fitBounds(berlinBounds);
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
        maxZoom: 18
    }).addTo(map);  
}

function getLakes() {
    var lakeData = "data/lakes.json"
    $.getJSON(lakeData, {})
    .done(function(data) {
        $.each( data.index, function( i, item ) {
            $(document.createElement('p')).text(item.badname).appendTo( "#lakes" );
        });
    });
};