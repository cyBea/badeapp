$(document).ready(function() {
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