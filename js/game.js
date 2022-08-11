import Button from "./button.js";
import Paddle from "./paddle.js";
// import Bricks from "./bricks.js";

let state = "start";
let startButton;
let restartButton;
let paddle;

function setup() {
  createCanvas(400, 600);
  startButton = new Button(width - 280, height - 150, 150, 50, 30, "start");
  restartButton = new Button(width - 280, height - 450, 150, 50, 30, "again");
  paddle = new Paddle(width - 350, 500, 150, 30, 20);
}

window.setup = setup;

function startScreen() {
  //game titles
  textSize(60);
  textAlign(CENTER);
  fill(255, 255, 255);
  noStroke();
  text("BreakOut", 0, 250, width, 100);

  startButton.draw();
}

function gameScreen() {
  textSize(20);
  fill(255, 255, 255);
  text("score:", 50, 30);
  text("❤️:", 350, 30);

  startButton.draw();
  paddle.draw();

  //draw bricks
  let brickWidth = 65;
  let margin = 12;
  let bx = margin;
  let by = 80 + margin;
  let brickHeight = 30;
  for (let i = 0; i < 5; i++) {
    fill(149, 75, 12);
    rect(bx, 50, brickWidth, 30);
    bx = bx + brickWidth + margin;
  }
  for (let i = 0; i < 4; i++) {
    rect(12, by, 65, brickHeight);
    by = by + brickHeight + margin;
  }
  for (let i = 0; i < 4; i++) {
    rect(24 + brickWidth, by - 4 * (12 + brickHeight), 65, brickHeight);
    by = by + brickHeight + margin;
  }
  for (let i = 0; i < 4; i++) {
    rect(
      bx - 3 * (12 + brickWidth),
      by - 8 * (12 + brickHeight),
      65,
      brickHeight
    );
    by = by + brickHeight + margin;
  }
  for (let i = 0; i < 4; i++) {
    rect(
      bx - 2 * (12 + brickWidth),
      by - 12 * (12 + brickHeight),
      65,
      brickHeight
    );
    by = by + brickHeight + margin;
  }
  for (let i = 0; i < 4; i++) {
    rect(bx - (12 + brickWidth), by - 16 * (12 + brickHeight), 65, brickHeight);
    by = by + brickHeight + margin;
  }
}
//for save the highscores score这里要改

//Parts of the following codes are got from the course website-"Build a coin flip game with highscore"
function highscoreSave() {
  const nameElement = document.getElementById("name");
  let highscore = { name: nameElement.value, score: "" };

  if (localStorage.highscore === undefined) {
    localStorage.highscore = JSON.stringify([]);
  }
  let highscoreArray = JSON.parse(localStorage.highscore);
  highscoreArray.push(highscore);
  localStorage.highscore = JSON.stringify(highscoreArray);

  displayHighScores();
}

function displayHighScores() {
  const listElement = document.getElementById("scoreList");
  if (localStorage.highscore !== undefined) {
    let highscoreArray = JSON.parse(localStorage.highscore);
    highscoreArray.sort();
  }

  for (let score of highscoreArray) {
    const item = document.createElement("li");
    item.innerText = highscore.name + highscore.score;
  }

  listElement.appendChild(item);
}

function resultScreen() {
  restartButton.draw();
  textSize(30);
  text("Your score:0", 150, 100);
  const buttonElement = document.getElementById("saveButton");
  buttonElement.addEventListener("click", function () {
    highscoreSave();
  });

  displayHighScores();
}

//for each state
function draw() {
  background(128, 168, 219);

  if (state === "start") {
    startScreen();
  } else if (state === "game") {
    gameScreen();
  } else if (state === "result") {
    resultScreen();
  }
}

window.draw = draw;

function mouseClicked() {
  if (state === "start") {
    if (startButton.hitTest(mouseX, mouseY)) {
      state = "game";
    }
  } else if (state === "result") {
    if (restartButton.hitTest(mouseX, mouseY)) {
      state = "game";
    }
  } else if (state === "game") {
    if (startButton.hitTest(mouseX, mouseY)) {
      state = "result";
    }
  }
}
window.mouseClicked = mouseClicked;
