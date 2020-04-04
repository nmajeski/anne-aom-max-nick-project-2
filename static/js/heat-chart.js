// Create our initial map object
// Set the longitude, latitude, and the starting zoom level
var myMap = L.map("location-heatmap", {
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

// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 500;

// Define the chart's margins as an object
var chartMargin = {
  top: 50,
  right: 30,
  bottom: 30,
  left: 50
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3.select("#color-barchart")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and to the bottom
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

d3.json("http://127.0.0.1:5000/api/squirrel-census-data", function(data) {
  var heatArray = [];
  var numGraySquirrels = 0;
  var numCinnamonSquirrels = 0;
  var numBlackSquirrels = 0;
  var numSquirrelsOfUnknownColor = 0;

  for (var i = 0; i < data.length; i++) {
    var squirrelData = data[i];
    heatArray.push([squirrelData.y, squirrelData.x]);

    if (!squirrelData.primary_fur_color) {
      numSquirrelsOfUnknownColor += 1;
    } else if (squirrelData.primary_fur_color.toLowerCase() == 'gray' || squirrelData.primary_fur_color.toLowerCase() == 'grey') {
      numGraySquirrels += 1;
    } else if (squirrelData.primary_fur_color.toLowerCase() == 'cinnamon') {
      numCinnamonSquirrels += 1;
    } else if (squirrelData.primary_fur_color.toLowerCase() == 'black') {
      numBlackSquirrels += 1;
    }
  }

  L.heatLayer(heatArray, {
    radius: 20,
    blur: 35
  }).addTo(myMap);

  var xBandScale = d3.scaleBand()
    .domain(["Gray", "Cinnamon", "Black", "Unknown"])
    .range([0, chartWidth]);

  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max([numGraySquirrels, numCinnamonSquirrels, numBlackSquirrels, numSquirrelsOfUnknownColor])])
    .range([chartHeight, 0]);

  var bottomAxis = d3.axisBottom(xBandScale);
  var leftAxis = d3.axisLeft(yLinearScale).ticks(10);

  chartGroup.append("g")
    .call(leftAxis);

  chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);

  var data = [{name: "Gray", num: numGraySquirrels, color: "grey"}, {name: "Cinnamon", num: numCinnamonSquirrels, color: "#7B3F00"}, {name: "Black", num: numBlackSquirrels, color: "black"}, {name: "Unknown", num: numSquirrelsOfUnknownColor, color: "steelblue"}]

  chartGroup.selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("fill", d => d.color)
    .attr("class", "bar")
    .attr("x", d => xBandScale(d.name))
    .attr("y", d => yLinearScale(d.num))
    .attr("width", xBandScale.bandwidth())
    .attr("height", d => chartHeight - yLinearScale(d.num));
});
