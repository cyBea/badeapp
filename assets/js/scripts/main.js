$(document).ready(function() {
    init();
    setMapDimensions();
    setDialogPosition();
});

$(window).resize(function() {
	setMapDimensions();
    setDialogPosition();
});

function setMapDimensions() {
	$('#map').css('height', $(window).height() - $('#header').outerHeight(true));
}

function setDialogPosition() {
    $('#dialog').css('left', ($(window).width() - $('#dialog').outerWidth(true)) / 2);
}

function init() {
    map = initMap();
    addLakeOverlays();
}
