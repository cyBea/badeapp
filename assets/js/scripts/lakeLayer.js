function addLakeOverlays() {
    var lakeLayer = L.geoJson().addTo(this.map);

    var lakeData = "data/lakes_with_markers.json";
    $.getJSON( lakeData, {}).done(function(data) {
        $.each( data, function(i, item) {
            // Creates a Marker for each bathing place of a lake
            $.each(item.markers, function(n, markerData) {
                var marker = L.marker([markerData.coordinates[1],markerData.coordinates[0]]);
                marker.title = n;
                marker.on('click', function(){
                    if (markerData.color == 'lawngreen_a' || markerData.color == 'yellow_a' || markerData.color == 'red_a') {
                        marker.bindPopup(n + ": Algen!" ,{className: 'leaflet-popup-content-wrapper-'+markerData.color});
                    }
                    else{
                        marker.bindPopup(n ,{className: 'leaflet-popup-content-wrapper-'+markerData.color});
                    }
                    zoomToBathplaceByName(n);
                    marker.openPopup();
                    showInfoPanel(n);
                })
              
                marker.addTo(map);
                $('#badestelle').append($('<option>', {
                    value: markerData.coordinates[1] + ";" + markerData.coordinates[0],
                    text: n
                }));
            });

            // Creates geoJson Feature of a lake to add a Polygon to the Maplayer
            var geojsonFeature = {
                type: "Feature",
                properties: {
                    //id : n
                    name : i,
                    popupContent: i,
                    color : item.color,
                    badestellen : item.markers
                },
                geometry : item.geojson
            };

            lakeLayer.addData(geojsonFeature);

            // creates the polygon with the feature information
            polygon = L.geoJson(geojsonFeature, {
                style: function (feature) {
                    return {
                        weight: 2,
                        opacity: 1,
                        color: feature.properties.color,
                    };
                },
                onEachFeature: function (feature, layer) {
                    layer.on({
                        mouseover: highlightFeature,
                        mouseout: resetHighlight,
                        click: zoomToFeature
                    });
                }});
            polygon.addTo(map);
            $('#see').append($('<option>', {
                value: polygon.getBounds().getNorthWest() + ";" + polygon.getBounds().getSouthEast(),
                text: i
            }));
        });
    });

    // creates the infopanel for lake information and bathplace information
    var info = L.control();

    info.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info'); 

        this.update();
        return this._div;
    };

    info.update = function (props) {


        if (typeof props != "undefined") {

            if (!this._div.innerHTML.match(props.name)){    //Wenn nicht schon infobox mit richtiger Badestelle geladen wurde...
                this._div.innerHTML = '<h4>Badestelle</h4>';
                var badestellen = '<div id = "profil-'+props.name + '"> <h3>' + props.name + '</h3>';
                $.each(props.badestellen, function(name, markerData) {
                    badestellen += '<div id = "badestelle-'+name +'" class="infoItem" style="margin: 3px 3px;" onclick = markerPopup("'+escape(name)+'") onmouseover = hoverItem("'+escape(name)+'") onmouseout = unhoverItem("'+escape(name)+'")><div id = badestelle-'+markerData.color+'>'+' <h4>' + name + '</h4></div><p>E.coli pro 100 ml<a class="question" onclick="questionmark(\'E.coli\')" href="#">[?]</a>: ' + markerData.eco + '<br>Int. Enterokokken pro 100 ml <a class="question" onclick="questionmark(\'Int. Enterokokken\')" href="#">[?]</a>: \ ' + markerData.ente + '</br>Sichttiefe in cm: ' + markerData.sicht + '</p></div> ' ; //
                    
                });
               this._div.innerHTML = badestellen;

       
            }
               
   

        } else {
            this._div.innerHTML += '<h4>Bewege die Maus über einen See</h4>';   
        }
        
        /*passt die maximale Höhe der größe der Karte an*/
        var map = document.getElementById('map');
        this._div.style.maxHeight = (map.offsetHeight-130)+'px';


    };

    info.addTo(map);

    // creates a panel for the polygoncolordescription
    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function (map) {

        var div = L.DomUtil.create('div', 'info legend'),
            grades = ["lawngreen", "orange", "red"];
            labels = ["Gute Wasserqualität", "vom Baden wird abgeraten", "Badeverbot"];

        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i  style="background:' + grades[i] + '"></i> ' +
                labels[i] + '<br>';
        }

        return div;
    };

    legend.addTo(map);


    // is called on mouseover of a polygon
    function highlightFeature(e) {
        var layer = e.target;

        layer.setStyle({
            weight: 2,
            opacity: 1.0,
        });

        if (!L.Browser.ie && !L.Browser.opera) {
            layer.bringToFront();
        }
        info.update(layer.feature.properties);
    }

    // Is called on mouseout of a polygon
    function resetHighlight(e) {
        // polygon.resetStyle(e.target);
        //info.update();
    }

    // is called on click of a polygon
    function zoomToFeature(e) {
        map.fitBounds(e.target.getBounds());
    }

  


 
}


    function markerPopup(name){
    zoomToBathplaceByName(unescape(name));
    showInfoPanel(unescape(name));
    openPopupByName(unescape(name));
}

  function zoomToBathplaceByName(name){
        var el = document.getElementById('badestelle');
        for(var i=0; i<el.options.length; i++) {
          if ( el.options[i].text == name ) {
            el.selectedIndex = i;
            zoomToBathplace($('#badestelle').val());
            break;
          }
        }
    }

function openPopupByName(name){
    var el = document.getElementById('badestelle');
        for(var i=0; i<el.options.length; i++) {
          if ( el.options[i].text == name ) {
            el.selectedIndex = i;
            console.log(L.marker($('#badestelle').val()).openPopup());
            //zoomToBathplace($('#badestelle').val());
            break;
          }
        }
}


function hoverItem(name){
        document.getElementById("badestelle-"+unescape(name)+"").className += ' hoverInfoItem';

}

function unhoverItem(name){
           $('div').filter(function() {
                        return this.id.match("badestelle-"+unescape(name));
                    }).removeClass("hoverInfoItem");
}

function showInfoPanel(name){
     
       $('.info').find('*').each(function() {
         $('div').filter(function() {
                    return this.id.match(/badestelle/);
                }).removeClass("highlightInfoItem");
        });
        if (document.getElementById("badestelle-"+name+"") != null){
            document.getElementById("badestelle-"+name+"").className += ' highlightInfoItem';
            var badestelle = document.getElementById("badestelle-"+name+"");
            var infobox = document.getElementsByClassName("info")[0];
            infobox.scrollTop = badestelle.offsetTop - 4; // -4 => OFFSET
        }

    }


