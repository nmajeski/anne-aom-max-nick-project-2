// Use D3 fetch to read the JSON file
// The data from the JSON file is arbitrarily named importedData as the argument

var runs_from = 0;
var approaches = 0;
var indifferent = 0;

d3.json("http://127.0.0.1:5000/api/squirrel-census-data", function (data) {


    for (var i = 0; i < data.length; i++) {
        var squirrelData = data[i];

        if (squirrelData.runs_from === true) {
            runs_from += 1;
        } else if (squirrelData.approaches === true) {
            approaches += 1;
        } else if (squirrelData.indifferent === true) {
            indifferent += 1;
        }};

    var data2 = [
        {
            x: ['runs from', 'approaches', 'indifferent'],
            y: [runs_from, approaches, indifferent],
            type: 'bar'
        }
    ];

    var layout = {
        title: "Do Squirrels Run Away From People",
        xaxis: { title: "Response to Person" },
        yaxis: { title: "# of reactions" }
    };


    Plotly.newPlot("runaway", data2, layout)});
