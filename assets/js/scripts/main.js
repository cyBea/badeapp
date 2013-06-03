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
    map = initMap();
    addLakeOverlays();
}
