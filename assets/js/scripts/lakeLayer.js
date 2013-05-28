function lakeLayer()
{
    this.addLakeOverlays = addLakeOverlays;

    function addLakeOverlays(map) {
        var lakeLayer = L.geoJson().addTo(map);

        var lakeData = "data/lakes_osm_min.json";
        $.getJSON( lakeData, {}).done(function(data) {
            $.each( data, function(i, item) {
                var geojsonFeature = {
                    "type": "Feature",
                    "properties": {
                        "name": "Coors Field",
                        "amenity": "Baseball Stadium",
                        "popupContent": i + ". Eintrag",
                        "color" : "#ff0000"
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
            });
        });
    }
}
