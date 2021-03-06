function initMap() {
    var map = L.map('map')

    var southWest = new L.LatLng(52.3380737304688, 13.0883140563965);
    var northEast = new L.LatLng(52.6754760742188, 13.7609090805054);
    var berlinBounds = new L.LatLngBounds(southWest, northEast);
    
    map.fitBounds(berlinBounds);
    map.zoomIn(1);
     
   
    
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18
    }).addTo(map);
    
    
//     L.tileLayer('http://otile2.mqcdn.com/tiles/1.0.0/sat', {
//         attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
//         maxZoom: 18
//     }).addTo(map);

    L.control.scale({imperial : false}).addTo(map);

    return map;
}

function setMapDimensions() {
    $('#map').css('height', $(window).height() - $('#header').outerHeight(true));
}

// erwarten Koordinaten in Form eines Strings example: "4.53;13.24"
function zoomToBathplace(coordString) {
    var coords = coordString.split(";");
    var LatLng = new L.LatLng(parseFloat(coords[0]), parseFloat(coords[1]));
    map.panTo(LatLng);
    map.setZoom(15);
}

// erwarten Boundingbox(Punkt oben links und Punkt unten rechts) in Form eines Strings example: "LatLng(52.44817, 13.57023);LatLng(52.37509, 13.65709)"
function zoomToLake(coordstring) {
    var coords = coordstring.split(";");
    var p1 = coords[0].split(",");
    var p2 = coords[1].split(",");
    var bounds = new L.LatLngBounds(
        new L.LatLng(parseFloat(p1[0].substring(7)), parseFloat(p1[1])),
        new L.LatLng(parseFloat(p2[0].substring(7)), parseFloat(p2[1]))
    );
    map.fitBounds(bounds);
}