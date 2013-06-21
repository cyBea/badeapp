function addLakeOverlays() {
    var lakeLayer = L.geoJson().addTo(this.map);

    var lakeData = "data/lakes_with_markers.json";
    $.getJSON( lakeData, {}).done(function(data) {
        $.each( data, function(i, item) {
            // Creates a Marker for each bathing place of a lake
            $.each(item.markers, function(n, markerData) {
                var marker = L.marker([markerData.coordinates[1],markerData.coordinates[0]]);
                marker.title = n;
                marker.bindPopup(n);
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
        var divContent = this._div.innerHTML;
        this._div.innerHTML = '<h4>Badestelle</h4>';

        if (typeof props != "undefined") {
            var badestellen = '<h3>' + props.name + '</h3>';
            $.each(props.badestellen, function(name, markerData) {
                badestellen += '<h4>' + name + '</h4><p>E.coli pro 100 ml<a id="question" onclick="questionmark(\'E.coli\')" href="#">[?]</a>: ' + markerData.eco + '<br>Int. Enterokokken pro 100 ml <a id="question" onclick="questionmark(\'Int. Enterokokken\')" href="#">[?]</a>: ' + markerData.ente + '<br>Sichttiefe in cm: ' + markerData.sicht + '</p>' 
            });
            this._div.innerHTML = badestellen;
        } else {
            this._div.innerHTML += 'Bewege die Maus über einen See';   
        }
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
                '<i style="background:' + grades[i] + '"></i> ' +
                labels[i] + '<br>';
        }

        return div;
    };

    legend.addTo(map);


   
    var explanation = L.control({position: 'bottomleft'});
    explanation.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info explanation'); 
       // this.update('E.coli');
        div.innerHTML = '<h4> Was sind eigentlich </h4> ';
        return div;
       };
    explanation.addTo(map);


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



