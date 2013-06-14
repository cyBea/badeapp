$(document).ready(function() {
    setMapDimensions();
    setDialogPosition();
    init();
});

$(window).resize(function() {
	setMapDimensions();
    setDialogPosition();
});

function setDialogPosition() {
    $('#dialog').css('left', ($(window).width() - $('#dialog').outerWidth(true)) / 2);
    $('.openArrow').css('left', ($(window).width() - $('.openArrow').outerWidth(true)) / 2);
}

function init() {
    map = initMap();
    addLakeOverlays();
}
