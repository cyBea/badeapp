function addLakeOverlays() {
    var lakeLayer = L.geoJson().addTo(this.map);

    var lakeData = "data/lakes_with_markers.json";
    $.getJSON( lakeData, {}).done(function(data) {
        $.each( data, function(i, item) {
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
        this._div.innerHTML = '<h4>Badestelle</h4>' +  (props ?
            '<b>' + props.name + '</b><br />' + 'hier die daten vom see einfügen' : 'Bewege die Maus über einen See');
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

    info.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info'); 
        this.update();
        return this._div;
    };

    info.update = function (props) {
        this._div.innerHTML = '<h4>Badestelle</h4>' +  (props ?
            '<b>' + props.name + '</b><br />' + 'hier die daten vom see einfügen' : 'Bewege die Maus über einen See');
    };

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



