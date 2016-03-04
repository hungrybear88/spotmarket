/**
 * Append graph to DOM.
 * @param  {{
 *         		label: string,
 *         		selector: string
 *              width: int
 *              height: int
 *              legend: string
 *              marginright: int
 *              marginleft: int
 *              ylegend: string
 *              dateformat: string
 * 				 }} options
 */
function graphPrice(options) {

	options = _.extend({
		json: '',
		label: '',
		selector: 'body',
		width: 960,
		height: 500,
		legend: 480,
		marginright: 80,
		marginleft: 50,
		ylegend: 'price (ISK)',
		dateformat: '%Y-%m-%d'
	}, options);

	var margin = {top: 20, right: options.marginright, bottom: 50, left: options.marginleft},
	    width = options.width - margin.left - margin.right,
	    height = options.height - margin.top - margin.bottom;

	var parseDate = d3.time.format(options.dateformat).parse;

	var x = d3.time.scale()
	    .range([0, width]);

	var y = d3.scale.linear()
	    .range([height, 0]);

	var color = d3.scale.category10();

	var xAxis = d3.svg.axis()
	    .scale(x)
	    .ticks(5)
	    .innerTickSize(-height)
	    .outerTickSize(0)
	    .orient("bottom");

	var yAxis = d3.svg.axis()
	    .scale(y)
	    .orient("left");

	var line = d3.svg.line()
	    .interpolate("basis")
	    .x(function(d) { return x(d.timestamp); })
	    .y(function(d) { return y(d.temperature); });

var svg = d3.select(options.selector).append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	    .attr("class", "graph-svg-component")
	  .append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.json(options.json, function(error, data) {
	  if (error) throw error;

	  color.domain(d3.keys(data[0]).filter(function(key) { return key !== "timestamp"; }));

	  data.forEach(function(d) {
	    d.timestamp = parseDate(d.timestamp);
	  });

	  color.domain(d3.keys(data[0]).filter(function(key) { return key !== "timestamp"; }));

	  var cities = color.domain().map(function(name) {
	    return {
	      name: name,
	      values: data.map(function(d) {
	        return {timestamp: d.timestamp, temperature: +d[name]};
	      })
	    };
	  });

	  x.domain(d3.extent(data, function(d) { return d.timestamp; }));

	  y.domain([
	    d3.min(cities, function(c) { return d3.min(c.values, function(v) { return v.temperature; }); }),
	    d3.max(cities, function(c) { return d3.max(c.values, function(v) { return v.temperature; }); })
	  ]);

	  svg.append("g")
	      .attr("class", "x axis")
	      .attr("transform", "translate(0," + height + ")")
	      .call(xAxis);

	  svg.append("g")
	      .attr("class", "y axis")
	      .call(yAxis)
	    .append("text")
	      .attr("transform", "rotate(-90)")
	      .attr("y", 6)
	      .attr("dy", ".71em")
	      .style("text-anchor", "end")
	      .text(options.ylegend)
	      .style("font-size","10px");

	  var city = svg.selectAll(".city")
	      .data(cities)
	    .enter().append("g")
	      .attr("class", "city");

	  city.append("path")
	      .attr("class", "line")
	      .attr("d", function(d) { return line(d.values); })
	      .attr("data-legend",function(d) { return d.name})
	      .style("stroke", function(d) { return color(d.name); });

	  city.append("text")
	      .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
	      .attr("transform", function(d) { return "translate(" + x(d.value.timestamp) + "," + y(d.value.temperature) + ")"; })
	      .attr("x", 3)
	      .attr("dy", ".35em")
	      .style("font-size","10px")
	      .text(function(d) { return d.name; });

	  legend = svg.append("g")
	    .attr("class","legend")
	    .attr("transform","translate(50,10)")
	    .style("font-size","10px")
	    .call(d3.legend)

	svg.append("text")
	        .attr("x", (width / 2))
	        .attr("y", options.legend - (margin.top / 2))
	        .attr("text-anchor", "middle")
	        .style("font-size", "14px")
	        .text(options.label);
	});
}

graphPrice({ /* Dramiel */
    width: 580,
    height: 340,
    marginright: 50,
    marginleft: 80,
    selector: '.d3-graph-price-17932',
    json: '/api/market/avgprice/17932'
});

graphPrice({ /* Cynabal */
    width: 580,
    height: 340,
    marginright: 50,
    marginleft: 80,
    selector: '.d3-graph-price-17720',
    json: '/api/market/avgprice/17720'
});

graphPrice({ /* Machariel */
    width: 580,
    height: 340,
    marginright: 50,
    marginleft: 80,
    selector: '.d3-graph-price-17738',
    json: '/api/market/avgprice/17738'
});

graphPrice({ /* Cruor */
    width: 580,
    height: 340,
    marginright: 50,
    marginleft: 80,
    selector: '.d3-graph-price-17926',
    json: '/api/market/avgprice/17926'
});

graphPrice({ /* Ashimmu */
    width: 580,
    height: 340,
    marginright: 50,
    marginleft: 80,
    selector: '.d3-graph-price-17922',
    json: '/api/market/avgprice/17922'
});

graphPrice({ /* Bhaalgorn */
    width: 580,
    height: 340,
    marginright: 50,
    marginleft: 80,
    selector: '.d3-graph-price-17920',
    json: '/api/market/avgprice/17920'
});

graphPrice({ /* Worm */
    width: 580,
    height: 340,
    marginright: 50,
    marginleft: 80,
    selector: '.d3-graph-price-17930',
    json: '/api/market/avgprice/17930'
});

graphPrice({ /* Gila */
    width: 580,
    height: 340,
    marginright: 50,
    marginleft: 80,
    selector: '.d3-graph-price-17715',
    json: '/api/market/avgprice/17715'
});

graphPrice({ /* Rattlesnake */
    width: 580,
    height: 340,
    marginright: 50,
    marginleft: 80,
    selector: '.d3-graph-price-17918',
    json: '/api/market/avgprice/17918'
});

graphPrice({ /* Garmur */
    width: 580,
    height: 340,
    marginright: 50,
    marginleft: 80,
    selector: '.d3-graph-price-33816',
    json: '/api/market/avgprice/33816'
});

graphPrice({ /* Orthrus */
    width: 580,
    height: 340,
    marginright: 50,
    marginleft: 80,
    selector: '.d3-graph-price-33818',
    json: '/api/market/avgprice/33818'
});

graphPrice({ /* Barghest */
    width: 580,
    height: 340,
    marginright: 50,
    marginleft: 80,
    selector: '.d3-graph-price-33820',
    json: '/api/market/avgprice/33820'
});

graphPrice({ /* Succubus */
    width: 580,
    height: 340,
    marginright: 50,
    marginleft: 80,
    selector: '.d3-graph-price-17924',
    json: '/api/market/avgprice/17924'
});

graphPrice({ /* Phantasm */
    width: 580,
    height: 340,
    marginright: 50,
    marginleft: 80,
    selector: '.d3-graph-price-17718',
    json: '/api/market/avgprice/17718'
});

graphPrice({ /* Nightmare */
    width: 580,
    height: 340,
    marginright: 50,
    marginleft: 80,
    selector: '.d3-graph-price-17736',
    json: '/api/market/avgprice/17736'
});

graphPrice({ /* Promethium */
    width: 580,
    height: 340,
    marginright: 50,
    marginleft: 80,
    selector: '.d3-graph-price-16652',
    json: '/api/market/avgprice/16652'
});





function graphJumps(options) {

	options = _.extend({
		json: '',
		label: '',
		selector: 'body',
		width: 960,
		height: 500,
		legend: 480,
		marginright: 80,
		marginleft: 50,
		ylegend: 'jumpCount',
		dateformat: '%Y-%m-%dT%H:%M:%S.%LZ'
	}, options);

	var margin = {top: 20, right: options.marginright, bottom: 50, left: options.marginleft},
	    width = options.width - margin.left - margin.right,
	    height = options.height - margin.top - margin.bottom;

	var parseDate = d3.time.format(options.dateformat).parse;

	var x = d3.time.scale()
	    .range([0, width]);

	var y = d3.scale.linear()
	    .range([height, 0]);

	var color = d3.scale.category10();

	var xAxis = d3.svg.axis()
	    .scale(x)
	    .ticks(5)
	    .innerTickSize(-height)
	    .outerTickSize(0)
	    .orient("bottom");

	var yAxis = d3.svg.axis()
	    .scale(y)
	    .orient("left");

	var line = d3.svg.line()
	    .interpolate("basis")
	    .x(function(d) { return x(d.timestamp); })
	    .y(function(d) { return y(d.temperature); });

var svg = d3.select(options.selector).append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	    .attr("class", "graph-svg-component")
	  .append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.json(options.json, function(error, data) {
	  if (error) throw error;
	  console.log('json data', data);

	  color.domain(d3.keys(data[0]).filter(function(key) { return key !== "timestamp"; }));

	  data.forEach(function(d) {
	    d.timestamp = parseDate(d.timestamp);
	  });

	  color.domain(d3.keys(data[0]).filter(function(key) { return key !== "timestamp"; }));

	  var cities = color.domain().map(function(name) {
	    return {
	      name: name,
	      values: data.map(function(d) {
	        return {timestamp: d.timestamp, temperature: +d[name]};
	      })
	    };
	  });

	  x.domain(d3.extent(data, function(d) { return d.timestamp; }));

	  y.domain([
	    d3.min(cities, function(c) { return d3.min(c.values, function(v) { return v.temperature; }); }),
	    d3.max(cities, function(c) { return d3.max(c.values, function(v) { return v.temperature; }); })
	  ]);

	  svg.append("g")
	      .attr("class", "x axis")
	      .attr("transform", "translate(0," + height + ")")
	      .call(xAxis);

	  svg.append("g")
	      .attr("class", "y axis")
	      .call(yAxis)
	    .append("text")
	      .attr("transform", "rotate(-90)")
	      .attr("y", 6)
	      .attr("dy", ".71em")
	      .style("text-anchor", "end")
	      .text(options.ylegend)
	      .style("font-size","10px");

	  var city = svg.selectAll(".city")
	      .data(cities)
	    .enter().append("g")
	      .attr("class", "city");

	  city.append("path")
	      .attr("class", "line")
	      .attr("d", function(d) { return line(d.values); })
	      .attr("data-legend",function(d) { return d.name})
	      .style("stroke", function(d) { return color(d.name); });

	  city.append("text")
	      .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
	      .attr("transform", function(d) { return "translate(" + x(d.value.timestamp) + "," + y(d.value.temperature) + ")"; })
	      .attr("x", 3)
	      .attr("dy", ".35em")
	      .style("font-size","10px")
	      .text(function(d) { return d.name; });

	  legend = svg.append("g")
	    .attr("class","legend")
	    .attr("transform","translate(50,10)")
	    .style("font-size","10px")
	    .call(d3.legend)

	svg.append("text")
	        .attr("x", (width / 2))
	        .attr("y", options.legend - (margin.top / 2))
	        .attr("text-anchor", "middle")
	        .style("font-size", "14px")
	        .text(options.label);
	});
}

graphJumps({ /* Trade Hubs */
    width: 1160,
    height: 340,
    marginright: 40,
    marginleft: 40,
    selector: '.d3-graph-jumps-tradehubs',
    json: '/api/map/jumps/tradehubs'
});

graphJumps({ /* Jita */
    width: 1160,
    height: 340,
    marginright: 40,
    marginleft: 40,
    selector: '.d3-graph-jumps-30000142',
    json: '/api/map/jumps/30000142'
});

graphJumps({ /* Amarr */
    width: 1160,
    height: 340,
    marginright: 40,
    marginleft: 40,
    selector: '.d3-graph-jumps-30002187',
    json: '/api/map/jumps/30002187'
});

graphJumps({ /* Dodixie */
    width: 1160,
    height: 340,
    marginright: 40,
    marginleft: 40,
    selector: '.d3-graph-jumps-30002659',
    json: '/api/map/jumps/30002659'
});

graphJumps({ /* Rens */
    width: 1160,
    height: 340,
    marginright: 40,
    marginleft: 40,
    selector: '.d3-graph-jumps-30002510',
    json: '/api/map/jumps/30002510'
});

graphPrice({ /* Hek */
    width: 1160,
    height: 340,
    marginright: 40,
    marginleft: 40,
    selector: '.d3-graph-jumps-30002053',
    json: '/api/map/jumps/30002053'
});

graphJumps({ /* Delve shipJumps */
    width: 580,
    height: 340,
    marginright: 40,
    marginleft: 40,
    ylegend: 'SUM_shipJumps',
    selector: '.d3-graph-shipjumps-10000060',
    json: '/api/map/jumps/region/10000060'
});

graphJumps({ /* Delve npckills */
    width: 580,
    height: 340,
    marginright: 40,
    marginleft: 40,
    ylegend: 'SUM_npcKills',
    selector: '.d3-graph-npckills-10000060',
    json: '/api/map/npckills/region/10000060'
});

graphJumps({ /* Delve shipkills */
    width: 580,
    height: 340,
    marginright: 40,
    marginleft: 40,
    ylegend: 'SUM_shipKills',
    selector: '.d3-graph-shipkills-10000060',
    json: '/api/map/shipkills/region/10000060'
});

graphJumps({ /* Delve podkills */
    width: 580,
    height: 340,
    marginright: 40,
    marginleft: 40,
    ylegend: 'SUM_podKills',
    selector: '.d3-graph-shipkills-10000060',
    json: '/api/map/podkills/region/10000060'
});