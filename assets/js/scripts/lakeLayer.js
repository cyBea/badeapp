function lakeLayer()
{
    this.addLakeOverlays = addLakeOverlays;

    function addLakeOverlays(map) {
        var lakeLayer = L.geoJson().addTo(map);

        var lakeData = "data/lakes_with_markers.json";
        $.getJSON( lakeData, {}).done(function(data) {
            $.each( data, function(i, item) {
                var geojsonFeature = {
                    "type": "Feature",
                    "properties": {
                        "name": i,
                        "popupContent": i,
                        "color" : item.color
                    },
                    "geometry" : item.geojson
                };

                lakeLayer.addData(geojsonFeature);
                var polygon = L.geoJson(geojsonFeature, {
                    style: function (feature) {
                        return {color: feature.properties.color};
                    },
                    onEachFeature: function (feature, layer) {
                        //map.fitBounds(feature.getBounds());
                        layer.bindPopup(feature.properties.popupContent);
                    }});
                polygon.addTo(map);

                $.each(item.markers, function(n, marker) {
                    L.marker([marker.coordinates[1],marker.coordinates[0]]).addTo(map);
                });
            });
        });
    }
}
