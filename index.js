document.getElementById("create-wheel").addEventListener("click", function () {
  var numSegments = document.getElementById("num-segments").value;
  var segmentNames = document
    .getElementById("segment-names")
    .value.split(",")
    .map((name) => name.trim());
  if (segmentNames.length !== Number(numSegments)) {
    alert("Please enter exactly " + numSegments + " segment names.");
    return;
  }

  var colors = [
    "#ff0000",
    "#ff7f00",
    "#ffff00",
    "#00ff00",
    "#0000ff",
    "#4B0082",
    "#9400D3",
    "#8B4513",
    "#A52A2A",
    "#D2691E",
    "#8B008B",
    "#00008B",
  ];
  var data = Array.from({ length: numSegments }, (_, i) => ({
    color: colors[i % colors.length],
    name: segmentNames[i],
  }));

  var wheel = d3.select("#wheel");
  wheel.selectAll("*").remove();

  var pie = d3.pie().value(() => 1);
  var arc = d3.arc().innerRadius(0).outerRadius(50);

  var g = wheel.selectAll("g").data(pie(data)).enter().append("g");

  g.append("path")
    .attr("fill", (d) => d.data.color)
    .attr("d", arc);

  g.append("text")
    .attr("transform", function (d) {
      var _d = arc.centroid(d);
      _d[0] *= 1.5; //multiply by a constant factor
      _d[1] *= 1.5; //multiply by a constant factor
      return "translate(" + _d + ")";
    })
    .attr("dy", ".50em")
    .style("text-anchor", "middle")
    .text(function (d) {
      return d.data.name;
    });
});

document.getElementById("spin-button").addEventListener("click", function () {
  var numSegments = document.getElementById("num-segments").value;
  var segmentNames = document
    .getElementById("segment-names")
    .value.split(",")
    .map((name) => name.trim());

  var wheel = document.getElementById("wheel");
  var result = document.getElementById("result");
  var angle = Math.floor(Math.random() * 1080 + 720);
  wheel.style.transition = "transform 3s ease-out";
  wheel.style.transform = "rotate(" + angle + "deg)";

  // Wait for the transition to finish before calculating the result
  setTimeout(function () {
    // Normalize the angle to be between 0 and 359
    var normalizedAngle = angle % 360;
    // Calculate the result
    var resultSegment = Math.floor(normalizedAngle / (360 / numSegments));
    result.innerText = "You landed on " + segmentNames[resultSegment] + "!";
  }, 3000);
});
