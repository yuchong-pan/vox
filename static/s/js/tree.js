var update;

function genTree(treeData) {

    // ************** Generate the tree diagram	 *****************
    var margin = {top: 20, right: 120, bottom: 20, left: 120},
        width = $("body").width() - margin.right - margin.left,
        height = $("#slider-wrapper").offset().top - margin.top - margin.bottom;
        
    var i = 0,
        duration = 750,
        root;

    var tree = d3.layout.tree()
        .size([height, width]);

    var diagonal = d3.svg.diagonal()
        .projection(function(d) { return [d.y, d.x]; });

    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.right + margin.left)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    root = treeData[0];
    root.x0 = height / 2;
    root.y0 = 0;
      
    update(root);

    d3.select(self.frameElement).style("height", $("#slider-wrapper").offset().top + "px");

    update = function(source) {

      // Compute the new tree layout.
      var nodes = tree.nodes(root).reverse(),
          links = tree.links(nodes);

      // Normalize for fixed-depth.
      nodes.forEach(function(d) { d.y = d.depth * 180; });

      // Update the nodes…
      var node = svg.selectAll("g.node")
          .data(nodes, function(d) { return d.id || (d.id = ++i); });

      // Enter any new nodes at the parent's previous position.
      var nodeEnter = node.enter().append("g")
          .attr("class", "node")
          .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
          .on("click", click);

      nodeEnter.append("circle")
          .attr("r", 1e-6)
          .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

      nodeEnter.append("text")
          .attr("x", function(d) { return d.children || d._children ? -13 : 13; })
          .attr("dy", ".35em")
          .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
          .text(function(d) { return d.keywords[0]; })
          .attr("class", "sm-text")
          .style("fill-opacity", 1e-6);

      nodeEnter.append("text")
          .style("display", "none")
          .attr("class", "node-name")
          .text(function(d) { return d.name; });

      // Transition nodes to their new position.
      var nodeUpdate = node.transition()
          .duration(duration)
          .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

      nodeUpdate.select("circle")
          .attr("r", 10)
          .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

      nodeUpdate.select("text")
          .style("fill-opacity", 1);

      // Transition exiting nodes to the parent's new position.
      var nodeExit = node.exit().transition()
          .duration(duration)
          .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
          .remove();

      nodeExit.select("circle")
          .attr("r", 1e-6);

      nodeExit.select("text")
          .style("fill-opacity", 1e-6);

      // Update the links…
      var link = svg.selectAll("path.link")
          .data(links, function(d) { return d.target.id; });

      // Enter any new links at the parent's previous position.
      link.enter().insert("path", "g")
          .attr("class", "link")
          .attr("d", function(d) {
            var o = {x: source.x0, y: source.y0};
            return diagonal({source: o, target: o});
          });

      // Transition links to their new position.
      link.transition()
          .duration(duration)
          .attr("d", diagonal);

      // Transition exiting nodes to the parent's new position.
      link.exit().transition()
          .duration(duration)
          .attr("d", function(d) {
            var o = {x: source.x, y: source.y};
            return diagonal({source: o, target: o});
          })
          .remove();

      // Stash the old positions for transition.
      nodes.forEach(function(d) {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    }

    // Toggle children on click.
    function click(d) {
        var all = $(".node");
        for (var i = 0; i < all.length; i++) {
            if (all.eq(i).children(".lg-text").css("display") == "block") { // large
                smallNode(i);
            } else if (all.eq(i).children(".node-name").text() == d.name) { // name == current's
                if (all.eq(i).children(".sm-text").css("display") == "block") { // small
                    largeNode(i);
                } else { // large
                    smallNode(i);
                }
            }
        }
        $("#slider").slider("setValue", d.start_time);
    }
}

function addKeywords(data) {
    function addKeyword(nodeName, data) {
        for (var i = 0; i < data[nodeName].keywords.length; i++) {
            d3.selectAll(".node:nth-of-type(" + (data[nodeName].node_id + 1) + ")").append("text")
                .attr("class", "lg-text")
                .text(data[nodeName].keywords[i])
                .attr("x", -50)
                .attr("dy", -60 + i * 20)
                .style("display", "none");
        }
    }
    for (var i in data) {
        addKeyword(i, data);
    }
}

function largeNode(i) {
    d3.selectAll(".node:nth-of-type(" + (i + 1) + ") .sm-text").style("display", "none");
    d3.selectAll(".node:nth-of-type(" + (i + 1) + ") circle").attr("r", 100);
    d3.selectAll(".node:nth-of-type(" + (i + 1) + ") .lg-text").style("display", "block");
}

function smallNode(i) {
    d3.selectAll(".node:nth-of-type(" + (i + 1) + ") .lg-text").style("display", "none");
    d3.selectAll(".node:nth-of-type(" + (i + 1) + ") circle").attr("r", 10);
    d3.selectAll(".node:nth-of-type(" + (i + 1) + ") .sm-text").style("display", "block");
}
