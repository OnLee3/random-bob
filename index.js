const segmentNames = [
  "지하",
  "KFC",
  "고씨네",
  "누리한방삼계탕",
  "담미온",
  "맥도날드",
  "명품들깨칼국수",
  "바디쉐프",
  "버거리",
  "북촌손만두",
  "생어거스틴",
  "소용궁",
  "슬로우캘리",
  "오한수 우육면가",
  "윤가네칼국수",
  "장터",
  "제라진",
  "진순대국",
  "천하제육",
  "청해동태탕",
  "취쓰부",
  "큰맘할매순대국",
  "투마마김치찌개",
  "한옥집김치찜",
  "한촌설렁탕",
];

const colors = [
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
  "#ff0000",
];

const numSegments = segmentNames.length;

const createWheel = () => {
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
    .style("font-size", "1.5px")
    .text(function (d) {
      return d.data.name;
    });
};

document.getElementById("spin-button").addEventListener("click", function () {
  var wheel = document.getElementById("wheel");
  var result = document.getElementById("result");
  var angle = Math.floor(Math.random() * 1080 + 720);
  wheel.style.transition = "transform 3s ease-out";
  wheel.style.transform = "rotate(" + angle + "deg)";

  // Wait for the transition to finish before calculating the result
  setTimeout(function () {
    // Normalize the angle to be between 0 and 359, then align it to the top
    var normalizedAngle = (angle - 90) % 360;
    if (normalizedAngle < 0) normalizedAngle += 360; // if angle is negative, add 360 to normalize it

    // Calculate the result
    var resultSegment = Math.floor(normalizedAngle / (360 / numSegments));
    result.innerText = "You landed on " + segmentNames[resultSegment] + "!";
  }, 3000);
});

createWheel();
