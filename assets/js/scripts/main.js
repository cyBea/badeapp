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
    var datenBerlinApi = "http://www.berlin.de/badegewaesser/baden-details/index.php/index/all.json?callback=";
    $.getJSON(datenBerlinApi, {format: "json"})
    .done(function(data) {
        $.each( data.items, function( i, item ) {
            $(document.createElement('p')).innerText(item).appendTo( "#lakes" );
        });
    });
};