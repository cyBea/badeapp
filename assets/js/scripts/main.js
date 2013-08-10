$(document).ready(function() {
    setMapDimensions();
    setDialogPosition();
    init();
});

$(window).resize(function() {
	setMapDimensions();
    setDialogPosition();
    /*passt die infobox der Fenstergröße an*/
    var map = document.getElementById('map');
    var infobox = document.getElementsByClassName("info")[0];
    infobox.style.maxHeight = (map.offsetHeight-130)+'px';
});

function setDialogPosition() {
    $('#dialog').css('left', ($(window).width() - $('#dialog').outerWidth(true)) / 2);
    $('#explanation').css('left', ($(window).width() - $('#explanation').outerWidth(true)) / 2);
    $('.openArrow').css('left', ($(window).width() - $('.openArrow').outerWidth(true)) / 2);
}

function init() {
    map = initMap();
    addLakeOverlays();
}
