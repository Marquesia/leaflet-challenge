var mapBACKGROUND = L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png", {
    attribution: "Map from <a href = 'https://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
})

var map= L.map("map", { 
    center: [
        40.7,-94.5
    ],
    zoom: 2
});

mapBACKGROUND.addTo(map);

var legend = L.control({
    position: "bottomright"
})

legend.onAdd = function(){
    var container = L.DomUtil.create("div", "info legend");
    
   var depths= [90,70,50,30,10,"<10"];
   var colours= ["darkred","red","orange","yellow","yellowgreen","green"];

   container.innerHTML += "<p><b>Depth</b></p>"
   
   
   
   for (var i = 0; i < depths.length; i++){
        console.log("LOOP", depths[i],colours[i]);
        container.innerHTML += `<div>
            <i style= 'background: ${colours[i]}'></i>
            <span>${depths[i]}</span>
    
        </div`
   }

    return container;

}

legend.addTo(map);

function createCircleColor(depth){
    if(depth >90){
        return "darkred";
    } else if (depth > 70) {
        return "red";
    }else if (depth > 50) {
        return "orange";
    }else if (depth > 30) {
        return "yellow";
    }else if (depth>10){
        return "yellowgreen"
    }else {
        return "green"
    }
 }

function createStyle (feature){
    return{
        opacity:.85,
        color:"black",
        weight: 0.1,
        fillColor: createCircleColor (feature["geometry"]
        ["coordinates"][2]),
        radius: feature.properties.mag *15
    }
}


d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson").then (function(earthquakeData) {
    L.geoJson(earthquakeData,{
        pointToLayer: function (feature, coordinates) {
            return L.circleMarker (coordinates);
        },
        style: createStyle
    }).addTo(map);
})