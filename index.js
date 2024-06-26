const segmentNames = [
  "지하 푸드코트",
  "KFC",
  "한우해장",
  "고씨네",
  "국민식당",
  "누리한방삼계탕",
  "담미온",
  "맥도날드",
  "멧돌로만",
  "명품들깨칼국수",
  "바디쉐프",
  "버거리",
  "벳남미식",
  "봉추찜닭",
  "부대찌개대사관",
  "북촌손만두",
  "샐러디",
  "생어거스틴",
  "서호돈가스",
  "슬로우캘리",
  "아비꼬",
  "오한수 우육면가",
  "우림 더이룸푸드",
  "윤가네칼국수",
  "장터",
  "진순대국",
  "천하제육",
  "취쓰부",
  "큰맘할매순대국",
  "투마마김치찌개",
  "하이탕 마라탕",
  "한옥집김치찜",
  "한촌설렁탕",
];

let wheel;
let finished = false;
let wheelSpinning = false;

const generateRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const createWheel = () => {
  wheel = new Winwheel({
    numSegments: segmentNames.length,
    textOrientation: "vertical",
    segments: segmentNames.map((name) => ({
      fillStyle: generateRandomColor(),
      text: name,
    })),
    responsive: true,
    pointerAngle: 0,
    pointerGuide: {
      display: true,
      strokeStyle: "black",
      lineWidth: 3,
    },
    animation: {
      type: "spinToStop",
      duration: 3,
      spins: 8,
      // Remember to do something after the animation has finished specify callback function.
      callbackFinished: () => winAnimation(),
    },
  });
};

const bindEvent = () => {
  document.querySelector("body").addEventListener("click", () => {
    if (finished === true) {
      createWheel();
      finished = false;
      wheelSpinning = true;
      wheel.startAnimation();
      return;
    }
    if (wheelSpinning === true) {
      wheel.stopAnimation();
      return;
    }
    wheel.startAnimation();
    wheelSpinning = true;
  });
};

const alertPrize = () => {
  let winningSegment = wheel.getIndicatedSegment();
  alert(winningSegment.text);
};

const winAnimation = () => {
  // Get the number of the winning segment.
  let winningSegmentNumber = wheel.getIndicatedSegmentNumber();

  // Loop and set fillStyle of all segments to gray.
  for (let x = 1; x < wheel.segments.length; x++) {
    wheel.segments[x].fillStyle = "gray";
  }

  // Make the winning one yellow.
  wheel.segments[winningSegmentNumber].fillStyle = "yellow";
  wheel.segments[winningSegmentNumber].textFontSize = 48;

  // Call draw function to render changes.
  wheel.draw();

  finished = true;
  wheelSpinning = false;
};

createWheel();
bindEvent();
