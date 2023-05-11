document.getElementById("spin-button").addEventListener("click", () => {
  var wheel = document.getElementById("wheel");
  var result = document.getElementById("result");
  var angle = Math.floor(Math.random() * 1080 + 720);
  wheel.style.transition = "transform 3s ease-out";
  wheel.style.transform = "rotate(" + angle + "deg)";

  console.log(wheel);
  // Wait for the transition to finish before calculating the result
  setTimeout(function () {
    // Normalize the angle to be between 0 and 359
    var normalizedAngle = angle % 360;
    console.log(normalizedAngle);
    // Calculate the result
    var resultSegment = Math.floor(normalizedAngle / 60) + 1;
    result.innerText = "You landed on segment " + resultSegment + "!";
  }, 3000);
});
