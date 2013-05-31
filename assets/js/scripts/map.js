function initMap() {
    var map = L.map('map')

    var southWest = new L.LatLng(52.3380737304688, 13.0883140563965);
    var northEast = new L.LatLng(52.6754760742188, 13.7609090805054);
    var berlinBounds = new L.LatLngBounds(southWest, northEast);
    
    map.fitBounds(berlinBounds);
    map.zoomIn(1);
    L.tileLayer('http://otile1.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpg', {
        subdomains: ['http://otile2.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpg', 
            'http://otile3.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpg', 
            'http://otile4.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpg'],
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
        maxZoom: 18
    }).addTo(map);

    L.control.scale({imperial : false}).addTo(map);

    return map;
}