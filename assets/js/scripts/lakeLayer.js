function addLakeOverlays() {
    var lakeLayer = L.geoJson().addTo(this.map);

    var lakeData = "data/lakes_with_markers.json";
    $.getJSON( lakeData, {}).done(function(data) {
        $.each( data, function(i, item) {
            $(document.createElement('li')).text(i).appendTo('#dropdown');
            $.each(item.markers, function(n, markerData) {
                var marker = L.marker([markerData.coordinates[1],markerData.coordinates[0]]);
                marker.title = n;
                marker.addTo(map);
            });

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

            polygon = L.geoJson(geojsonFeature, {
                style: function (feature) {
                    return {
                        weight: 3,
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
        });
    });

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
                badestellen += '<h4>' + name + '</h4><p>Eco: ' + markerData.eco + '<br>Ente: ' + markerData.enter + '<br>Sicht: ' + markerData.sicht + '</p>'
            });
            this._div.innerHTML = badestellen;
        } else {
            this._div.innerHTML += 'Bewege die Maus über einen See';   
        }
    };

    info.addTo(map);

    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function (map) {

        var div = L.DomUtil.create('div', 'info legend'),
            grades = ["lawngreen"];
            labels = ["Gute Wasserqualität"];

        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + grades[i] + '"></i> ' +
                labels[i] + '<br>';
        }

        return div;
    };

    legend.addTo(map);

    function highlightFeature(e) {
        var layer = e.target;

        layer.setStyle({
            weight: 3,
            opacity: 1.0,
            color: '#FFD174',
        });

        if (!L.Browser.ie && !L.Browser.opera) {
            layer.bringToFront();
        }
        info.update(layer.feature.properties);
    }

    function resetHighlight(e) {
        polygon.resetStyle(e.target);
        info.update();
    }

    function zoomToFeature(e) {
        map.fitBounds(e.target.getBounds());
    }
}



