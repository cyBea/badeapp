$(function() {
    $('#nav').click(function(e) {
        
        if ($(e.target.nodeName).is('div')) {
            $('#dropdown').toggle('slow');    
        }
        if ($(e.target.nodeName).is('li')) {

           // swl swla / nel nela
            var swl = $(e.target).attr('swl');
            var swla = $(e.target).attr('swla');
            var nel = $(e.target).attr('nel');
            var nela = $(e.target).attr('nela');

            var southWest = new L.LatLng(swl, swla);
            var northEast = new L.LatLng(nel, nela);
            var berlinBounds = new L.LatLngBounds(southWest, northEast);
            map.fitBounds(berlinBounds);
            

        }
        return false;
    });
}); 
$(function() {
    $('#dropdown').click(function(e) {

           // swl swla / nel nela
            var swl = $(e.target).attr('swl');
            var swla = $(e.target).attr('swla');
            var nel = $(e.target).attr('nel');
            var nela = $(e.target).attr('nela');

            var southWest = new L.LatLng(swl, swla);
            var northEast = new L.LatLng(nel, nela);
            var berlinBounds = new L.LatLngBounds(southWest, northEast);
            map.fitBounds(berlinBounds);
            alert(klick);

        return false;
    });
}); 


function zoom() {
    

}

//$(function() {
//    $( "#dropdown" ).menu();
//});
