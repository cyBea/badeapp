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
        zoomToLake($('#see').val());
    });

    $('#badestelle').change(function(e) {
        $('#dialog').slideToggle({ 
            duration : 'medium', 
            easing : 'linear'
        });
        zoomToBathplace($('#badestelle').val());
    });
}); 