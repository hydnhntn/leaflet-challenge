

// Create the tile layer that will be the background of our map.
var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Create the map object with options.
var map = L.map("map", {
center: [20,0],
zoom: 3,
layers: [streetmap]
});

// Create a baseMaps object to hold the streetmap layer.
var baseMaps = {
"Street Map": streetmap
};

// Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
L.control.layers(baseMaps)

var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson"

d3.json(url).then(function(data) {

    L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng, {
                radius: feature.properties.mag*4,
                fillOpacity: 0.85,
                stroke: true,
                color: 'black',
                weight: 1,
                color: color(feature.geometry.coordinates[2])
            });
        },

        onEachFeature: function(feature, layer) {
            layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place+ "<br>Depth: " + feature.geometry.coordinates[2] + " km");
        }
    }).addTo(map);

    function color(depth) {

        if(depth < 10){
            return "#77FF33"
        }
        else if(depth<30){
            return "#6EAD2A"
        }
        else if (depth <50){
            return "#F6F92F"
        }
        else if (depth <70){
            return "#F9AC2F"
        }
        else if (depth <90){
            return "#F9471B"
        } 
        else {
            return "#5D1200"
        }
    };
         
    var legend = L.control({
        position: "bottomright"
    })
    legend.onAdd = function() {
        var div = L.DomUtil.create("div", "info legend");
    
        var grades = [0, 1, 2, 3, 4, 5];
        var colors = [
          "#98ee00",
          "#d4ee00",
          "#eecc00",
          "#ee9c00",
          "#ea822c",
          "#ea2c2c"
        ];
    
        // Looping through
        for (var i = 0; i < grades.length; i++) {
          div.innerHTML +=
            "<i class='circle' style='background: " + colors[i] + "'></i> " +
            grades[i] + (grades[i + 1] ? "&ndash;" + color[i + 1] + "<br>" : "+");
        }
        return div;
      };
    
legend.addTo(map);
        
    

})