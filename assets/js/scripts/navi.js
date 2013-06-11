$(function() {
    $('#header').click(function(e) {
            $('#dialog').slideToggle({ 
                duration : 'medium', 
                easing : 'linear'
            });    
        return false;
    });

    $('.openArrow').click(function(e) {
            $('#dialog').slideToggle({ 
                duration : 'medium', 
                easing : 'linear'
            });    
        return false;
    });

    $('#see').change(function(e) {
        $('#dialog').slideToggle({ 
            duration : 'medium', 
            easing : 'linear'
        });    
        var coords = $('#see').val().split(";");
        var p1 = coords[0].split(",");
        var p2 = coords[1].split(",");
        var bounds = new L.LatLngBounds(
            new L.LatLng(parseFloat(p1[0].substring(7)), parseFloat(p1[1])),
            new L.LatLng(parseFloat(p2[0].substring(7)), parseFloat(p2[1]))
        );
        map.fitBounds(bounds);
        
        return false;
    });

    $('#badestelle').change(function(e) {
        $('#dialog').slideToggle({ 
            duration : 'medium', 
            easing : 'linear'
        });
        var coords = $('#badestelle').val().split(";");
        var LatLng = new L.LatLng(parseFloat(coords[0]), parseFloat(coords[1]));
        map.panTo(LatLng);
        map.zoomIn(3);

        return false;
    });
}); 