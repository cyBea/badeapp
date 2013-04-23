$(document).ready(function() {
    initMap();
    getLakes();
});

function initMap() {
    var map = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
        maxZoom: 18
    }).addTo(map);  
}

function getLakes() {
    var lakeData = "data/lakes.js"
    $.getJSON(lakeData, {})
    .done(function(data) {
        $.each( data.index, function( i, item ) {
            $(document.createElement('p')).text(item.badname).appendTo( "#lakes" );
        });
    });
};