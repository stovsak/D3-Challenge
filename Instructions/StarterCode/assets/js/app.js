// @TODO: YOUR CODE HERE!

var svgWidth = 900;
var svgHeight = 500;

var margin = { top:20, right: 80, left: 100 };

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper and append SVG group to the chart
var svg = d3.select("#scatter").append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);


// Append div to body, create tooltips and assign class
d3.sleect(".chart").append("div").attr("class", "tooltip").style("opacity", 0);

// CSV retreival and execution
d3.csv("data.csv").then(funciton(censusData)) {
    
    console.log(censusData)

    censusData.forEach(function(data) {
        data.healthcare = +data.heathcare;
        data.poverty = +data.poverty;
    });

//Create scale functions
    //==================
    
    var ylinearScale = d3.scaleLinear()
    .domain([d3.min(censusData, d => d.heathcare) -2, d3.max(censusData, d => d.heathcare) +2])
    .range([chartHeight, 0]);

    var xlinearScale = d3.scaleLinear()
    .domain([d3.min(censusData, d => d.poverty) -1, d3.max(censusData, d => d.poverty) +1])
    .range([0, chartwidth]);

// Axis functions
    //====================

    var yAxis = d3.axisLeft(ylinearScale);
    var xAxis = d3.axisBottom(xlinearScale);
    
})
