// @TODO: YOUR CODE HERE!

var svgWidth = 900;
var svgHeight = 500;

var margin = { top:20, right: 80, left: 100, bottom: 100 };

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper and append SVG group to the chart
var svg = d3.select("#scatter").append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// CSV retreival and execution
d3.csv("data.csv").then(function(censusData) {

    // Data
    console.log(censusData);
  
    // Parse Data/Cast as numbers
      // ==============================
      censusData.forEach(function(data) {
        data.healthcare = +data.healthcare;
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

// Append axes
    //====================
    chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(xAxis);

    chartGroup.append("g")
    .call(yAxis);

// Circle Creatation
    //===================
    var circlesGroup = chartGroup.selectAll("circle")
      .data(censusData)
      .enter()
      .append("circle")
      .attr("cy", d => xlinearScale(d.healthcare))
      .attr("cx", d => ylinearScale(d.poverty))
      .attr("r", "10")
      .attr("opacity", "0.75")
      .attr("class", stateCircle)
      .attr("stroke", "black");

// Tooltip time
    //====================
    var toolTip = d3.tip()
      .attr("class", "d3-tip")
      .offset([0,0])
      .html(function(d) {
          return(`<strong>${d.state}</br></br>Lacks Healthcare (%):</br>${d.healthcare}</br></br>Poverty (%):</br> ${d.poverty}<strong>`);
      
      });
// Add tooltip to the chart
    //=========================
    svg.call(toolTip);

    // Mouseclick
    circlesGroup.on("click", function(data){
        toolTip.show(data, this);
    });
    // Mouseover
    circlesGroup.on("mouseover", function(data) {
        toolTip.show(data, this);
    });
    // Mouseout
    circlesGroup.on("mouseout", function(data) {
        toolTip.hide(data, this);
    });

// Create Axes
//=====================
chartGroup.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left + 40)
  .attr("x", 0 -(chartHeight / 2))
  .attr("class", "axisText")
  .text("Lacks Healthcare (%)");
chartGroup.append("text")
  .attr("transform", `translate(${chartWidth / 2},  ${chartHeight + margin.top +30})`)
  .attr("class", "axisText")
  .text("Poverty (%)");

//States in Circles
chartGroup.append("text")
  .attr("class", "stateText")
  .style("font-size", "9px")
  .style("font-weight", "bold")
  .selectAll("tspan")
  .data(censusData)
  .enter()
  .append("tspan")
  .attr("x", function(data) {
      return xlinearScale(data.poverty);
  })
   .attr("y", function(data) {
       return ylinearScale(data.healthcare -0.2);
   })
   .text(function(data) {
       return data.abbr
   });

}).catch(function(error) {
    console.log(error);
});
