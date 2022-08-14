//import,export & setup and the states setting are learn from lab4
import Button from "./button.js";
import Paddle from "./paddle.js";
import Ball from "./ball.js";
import Brick from "./brick.js";

let state = "start";
let startButton;
let restartButton;
let paddle;
let ball;
let brick;
let bricks = [];
let playScore = 0;

function setup() {
  createCanvas(400, 600);
  startButton = new Button(width - 280, height - 150, 150, 50, 30, "start");
  restartButton = new Button(width - 280, height - 450, 150, 50, 30, "again");
  paddle = new Paddle(width - 350, 500, 150, 30, 20);
  ball = new Ball(width - 300, 485, 15, 4, 4);
  //create bricks
  let margin = 12;
  for (let i = 0; i < 5; i++) {
    //columns
    for (let r = 0; r < 4; r++) {
      //rows
      brick = new Brick(
        12 + (margin + 65) * i, //12 is the margin to the right
        40 + (margin + 30) * r, //40 is the margin to the top
        65,
        30,
        10
      );
      bricks.push(brick);
    }
  }
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

  //   startButton.draw();

  //ball
  ball.bouceHitEdge();
  ball.draw();
  ball.update();

  //moving the paddle
  if (keyIsDown(39) && paddle.x + paddle.width < 400) {
    paddle.x += 3;
  } else if (keyIsDown(37) && paddle.x > 0) {
    paddle.x -= 3;
  }
  paddle.draw();
  //if the ball hit the paddle
  if (
    ball.x + ball.radius >= paddle.x &&
    ball.x - ball.radius <= paddle.x + paddle.width &&
    ball.y + ball.radius >= paddle.y
  ) {
    ball.speedY *= -1;
  }

  //draw bricks
  /*this line of coding is get idea from https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
  since we need to every brick from the array by the loop above*/
  bricks.forEach((brick) => brick.draw());

  //if the ball hit the bricks
  if (
    ball.x + ball.radius >= brick.x && //leftside of the brick
    ball.x - ball.radius <= brick.x + brick.width && //rightside
    ball.y - ball.radius <= brick.y + brick.height //bottom
  ) {
    ball.speedY *= -1;
    bricks.slice(i, 1);
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
