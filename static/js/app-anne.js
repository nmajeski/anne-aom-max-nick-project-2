// Create our initial map object
// Set the longitude, latitude, and the starting zoom level

var runMarkers = [];
var chaseMarkers = [];
var climbMarkers = [];
var eatMarkers =[];
var forageMarkers =[];

d3.json("http://127.0.0.1:5000/api/squirrel-census-data", function (data) {
  for (var i = 0; i < data.length; i++) {
    var squirrelData = data[i];
    if (squirrelData.running === true && squirrelData.date === "10142018" && squirrelData.shift === "AM") {
      console.log("running");
      runMarkers.push(L.marker([squirrelData.y, squirrelData.x], {
        draggable: false,
        title: `Squirrel ${squirrelData.unique_squirrel_id}`
      }).bindPopup("Squirrel ID: " + squirrelData.unique_squirrel_id));
      continue;
    }
    else if (squirrelData.chasing === true && squirrelData.date === "10142018" && squirrelData.shift === "AM") {
      console.log("chasing");
      chaseMarkers.push(L.marker([squirrelData.y, squirrelData.x], {
        draggable: false,
        title: `Squirrel ${squirrelData.unique_squirrel_id}`
      }).bindPopup("Squirrel ID: " + squirrelData.unique_squirrel_id));
      continue;
    }
    else if (squirrelData.climbing === true && squirrelData.date === "10142018" && squirrelData.shift === "AM") {
      console.log("climbing!");
      climbMarkers.push(L.marker([squirrelData.y, squirrelData.x], {
        draggable: false,
        title: `Squirrel ${squirrelData.unique_squirrel_id}`
      }).bindPopup("Squirrel ID: " + squirrelData.unique_squirrel_id));
      continue;
    }
    else if (squirrelData.eating === true && squirrelData.date === "10142018" && squirrelData.shift === "AM") {
      console.log("eating!");
      eatMarkers.push(L.marker([squirrelData.y, squirrelData.x], {
        draggable: false,
        title: `Squirrel ${squirrelData.unique_squirrel_id}`
      }).bindPopup("Squirrel ID: " + squirrelData.unique_squirrel_id));
      continue;
    }
    else if (squirrelData.foraging === true && squirrelData.date === "10142018" && squirrelData.shift === "AM") {
      console.log("climbing!");
      forageMarkers.push(L.marker([squirrelData.y, squirrelData.x], {
        draggable: false,
        title: `Squirrel ${squirrelData.unique_squirrel_id}`
      }).bindPopup("Squirrel ID: " + squirrelData.unique_squirrel_id));
      continue;
    }
    else { continue };
  }


var runLayer = L.layerGroup(runMarkers);
var chaseLayer = L.layerGroup(chaseMarkers);
var climbLayer = L.layerGroup(climbMarkers);
var eatLayer = L.layerGroup(eatMarkers);
var forageLayer = L.layerGroup(forageMarkers);

var satellite = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.satellite",
  accessToken: API_KEY
});

  var street = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.street",
    accessToken: API_KEY
  });


var myMap = L.map("activitymap", {
  center: [40.782, -73.964],
  zoom: 13.5,
  layers: [satellite, runLayer]
});



// Overlays that may be toggled on or off
var overlayMaps = {
  "Running": runLayer,
  "Chasing": chaseLayer,
  "Climbing": climbLayer,
  "Eating": eatLayer,
  "Foraging": forageLayer
};

var baseMaps = {
  "Satellite": satellite,
  "Street": street
};
  // Add a tile layer (the background map image) to our map
  // We use the addTo method to add objects to our map
console.log(runMarkers);
L.control.layers(baseMaps, overlayMaps).addTo(myMap);

});

