// Initialize all of the LayerGroups we'll be using
var am_markers = [];
var pm_markers = [];

d3.json("http://127.0.0.1:5000/api/squirrel-census-data", function (data) {
  for (var i = 0; i < 300; i++) {
    var squirrelData = data[i];
    if (squirrelData.shift ==="AM") {
      console.log("am");
      am_markers.push(L.marker([squirrelData.y, squirrelData.x], {
        draggable: false, 
        title: `Squirrel ${squirrelData.unique_squirrel_id}`
      }).bindPopup("Squirrel ID: " + squirrelData.unique_squirrel_id + "<br>" + "Squirrel Shift: " + squirrelData.shift));
      continue;
    }
    else if (squirrelData.shift === "PM") {
      console.log("pm"); 
      pm_markers.push(L.marker([squirrelData.y, squirrelData.x], {
        draggable: false, 
        title: `Squirrel ${squirrelData.unique_squirrel_id}`
      }).bindPopup("Squirrel ID: " + squirrelData.unique_squirrel_id + "<br>" + "Squirrel Shift: " + squirrelData.shift));
      continue;
    }
    else { continue };
  }


var amLayer = L.layerGroup(am_markers);
var pmLayer = L.layerGroup(pm_markers);


// Add a tile layer (the background map image) to our map
// We use the addTo method to add objects to our map
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

// Create our initial map object
// Set the longitude, latitude, and the starting zoom level
var myMap = L.map("ampmmap", {
    center: [40.782, -73.964],
    zoom: 13.5,
    layers: [satellite, amLayer]
  });
  

// Overlays that may be toggled on or off
var overlayMaps = {
  "AM": amLayer,
  "PM": pmLayer,
};
var baseMaps = {
  "Satellite": satellite,
  "Street": street
};
  // Add a tile layer (the background map image) to our map
  // We use the addTo method to add objects to our map
console.log(am_markers);
L.control.layers(baseMaps, overlayMaps).addTo(myMap);
});
  










//   / Initialize all of the LayerGroups we'll be using
// var layers = {
//   COMING_SOON: new L.LayerGroup(),
//   EMPTY: new L.LayerGroup(),
//   LOW: new L.LayerGroup(),
//   NORMAL: new L.LayerGroup(),
//   OUT_OF_ORDER: new L.LayerGroup()
// };

// // Create the map with our layers
// var map = L.map("map-id", {
//   center: [40.73, -74.0059],
//   zoom: 12,
//   layers: [
//     layers.COMING_SOON,
//     layers.EMPTY,
//     layers.LOW,
//     layers.NORMAL,
//     layers.OUT_OF_ORDER
//   ]
// });

// // Add our 'lightmap' tile layer to the map
// lightmap.addTo(map);

// // Create an overlays object to add to the layer control
// var overlays = {
//   "Coming Soon": layers.COMING_SOON,
//   "Empty Stations": layers.EMPTY,
//   "Low Stations": layers.LOW,
//   "Healthy Stations": layers.NORMAL,
//   "Out of Order": layers.OUT_OF_ORDER
// };
  // // Create a control for our layers, add our overlay layers to it
  // L.control.layers(null, overlays).addTo(myMap);

  // // Create a legend to display information about our map
  // var info = L.control({
  //   position: "bottomright"
  // });

  // // When the layer control is added, insert a div with the class of "legend"
  // info.onAdd = function() {
  //   var div = L.DomUtil.create("div", "legend");
  //   return div;
  // };
  // // Add the info legend to the map
  // info.addTo(myMap);


// // Set up the legend  
//   var legend = L.control({ position: "bottomright" });
//   legend.onAdd = function() {
//     var div = L.DomUtil.create("div"); 
//     var colors = ["#C4F069", "#E5F16A"];
//     var times = ["AM", "PM"]
//     var labels = [];
//     markerColors.forEach(function(limit, index) {
//         labels.push("<div style=\"background-color: white; padding-left: 5px; padding-right: 5px;\"><span style=\"background-color: " + colors[index] + "\">&nbsp;&nbsp;&nbsp;&nbsp;</span> " + times[index] + "</div>");
    
//       });

//     div.innerHTML += labels.join("");

// // Adding legend to the map
//     legend.addTo(myMap);

  // Set up the legend
  // var legend = L.control({ position: "bottomright" });
  // legend.onAdd = function() {
  //   var div = L.DomUtil.create("div", "info legend");
    // var limits = geojson.options.limits;
    // var colors = geojson.options.colors;
    // var labels = [];

    // Add min & max
    // var legendInfo = "<h1>Squirrel Shift</h1>" +
      // "<div class=\"labels\">" +
        // "<div class=\"min\">" + limits[0] + "</div>" +
        // "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
    //   "</div>";

    // div.innerHTML = legendInfo;

    // limits.forEach(function(limit, index) {
    //   labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
    // });

  //   div.innerHTML += "<ul>" + labels.join("") + "</ul>";
  //   return div;
  // };

  // Adding legend to the map
  // legend.addTo(myMap);
// ---------

// // Create a legend to display information about our map
// var info = L.control({
//   position: "bottomright"
// });

// // When the layer control is added, insert a div with the class of "legend"
// info.onAdd = function() {
//   var div = L.DomUtil.create("div", "legend");
//   return div;
// };
// // Add the info legend to the map
// info.addTo(map);

// // Initialize an object containing icons for each layer group
// var icons = {
//   COMING_SOON: L.ExtraMarkers.icon({
//     icon: "ion-settings",
//     iconColor: "white",
//     markerColor: "yellow",
//     shape: "star"
//   }),
//   EMPTY: L.ExtraMarkers.icon({
//     icon: "ion-android-bicycle",
//     iconColor: "white",
//     markerColor: "red",
//     shape: "circle"
//   }),
//   OUT_OF_ORDER: L.ExtraMarkers.icon({
//     icon: "ion-minus-circled",
//     iconColor: "white",
//     markerColor: "blue-dark",
//     shape: "penta"
//   }),
//   LOW: L.ExtraMarkers.icon({
//     icon: "ion-android-bicycle",
//     iconColor: "white",
//     markerColor: "orange",
//     shape: "circle"
//   }),
//   NORMAL: L.ExtraMarkers.icon({
//     icon: "ion-android-bicycle",
//     iconColor: "white",
//     markerColor: "green",
//     shape: "circle"
//   })
// };

// // Perform an API call to the Citi Bike Station Information endpoint
// d3.json("https://gbfs.citibikenyc.com/gbfs/en/station_information.json", function(infoRes) {

//   // When the first API call is complete, perform another call to the Citi Bike Station Status endpoint
//   d3.json("https://gbfs.citibikenyc.com/gbfs/en/station_status.json", function(statusRes) {
//     var updatedAt = infoRes.last_updated;
//     var stationStatus = statusRes.data.stations;
//     var stationInfo = infoRes.data.stations;

//     // Create an object to keep of the number of markers in each layer
//     var stationCount = {
//       COMING_SOON: 0,
//       EMPTY: 0,
//       LOW: 0,
//       NORMAL: 0,
//       OUT_OF_ORDER: 0
//     };

//     // Initialize a stationStatusCode, which will be used as a key to access the appropriate layers, icons, and station count for layer group
//     var stationStatusCode;

//     // Loop through the stations (they're the same size and have partially matching data)
//     for (var i = 0; i < stationInfo.length; i++) {

//       // Create a new station object with properties of both station objects
//       var station = Object.assign({}, stationInfo[i], stationStatus[i]);
//       // If a station is listed but not installed, it's coming soon
//       if (!station.is_installed) {
//         stationStatusCode = "COMING_SOON";
//       }
//       // If a station has no bikes available, it's empty
//       else if (!station.num_bikes_available) {
//         stationStatusCode = "EMPTY";
//       }
//       // If a station is installed but isn't renting, it's out of order
//       else if (station.is_installed && !station.is_renting) {
//         stationStatusCode = "OUT_OF_ORDER";
//       }
//       // If a station has less than 5 bikes, it's status is low
//       else if (station.num_bikes_available < 5) {
//         stationStatusCode = "LOW";
//       }
//       // Otherwise the station is normal
//       else {
//         stationStatusCode = "NORMAL";
//       }

//       // Update the station count
//       stationCount[stationStatusCode]++;
//       // Create a new marker with the appropriate icon and coordinates
//       var newMarker = L.marker([station.lat, station.lon], {
//         icon: icons[stationStatusCode]
//       });

//       // Add the new marker to the appropriate layer
//       newMarker.addTo(layers[stationStatusCode]);

//       // Bind a popup to the marker that will  display on click. This will be rendered as HTML
//       newMarker.bindPopup(station.name + "<br> Capacity: " + station.capacity + "<br>" + station.num_bikes_available + " Bikes Available");
//     }

//     // Call the updateLegend function, which will... update the legend!
//     updateLegend(updatedAt, stationCount);
//   });
// });

// // Update the legend's innerHTML with the last updated time and station count
// function updateLegend(time, stationCount) {
//   document.querySelector(".legend").innerHTML = [
//     "<p>Updated: " + moment.unix(time).format("h:mm:ss A") + "</p>",
//     "<p class='out-of-order'>Out of Order Stations: " + stationCount.OUT_OF_ORDER + "</p>",
//     "<p class='coming-soon'>Stations Coming Soon: " + stationCount.COMING_SOON + "</p>",
//     "<p class='empty'>Empty Stations: " + stationCount.EMPTY + "</p>",
//     "<p class='low'>Low Stations: " + stationCount.LOW + "</p>",
//     "<p class='healthy'>Healthy Stations: " + stationCount.NORMAL + "</p>"
//   ].join("");
// }
