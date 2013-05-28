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
                        "popupContent": "This is where the Rockies play!"
                    },
                    "geometry" : item.geojson
                };
                L.geoJson(geojsonFeature).addTo(map);
                lakeLayer.addData(geojsonFeature);
            });
        });
    }
}
