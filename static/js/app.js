// Create our initial map object
// Set the longitude, latitude, and the starting zoom level
var myMap = L.map("sample", {
    center: [40.78, -73.96],
    zoom: 13
  });
  
  // Add a tile layer (the background map image) to our map
  // We use the addTo method to add objects to our map
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(myMap);

  d3.json("http://127.0.0.1:5000/api/squirrel-census-data", function(data) {
      for (var i = 0; i < 20; i++) {
        var squirrelData = data[i];
        var marker = L.marker([squirrelData.y, squirrelData.x], {
          draggable: false,
          title: `Squirrel ${squirrelData.unique_squirrel_id}`
        }).addTo(myMap);

        marker.bindPopup("Squirrel ID: " + squirrelData.unique_squirrel_id);
      }
  });
  