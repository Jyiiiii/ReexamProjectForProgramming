//import,export & setup and the states setting are learn from lab4
import Button from "./button.js";
import Paddle from "./paddle.js";
import Ball from "./ball.js";
import Brick from "./brick.js";

let state = "start";
let startButton;
let restartButton;
let saveButton;
let paddle;
let ball;
let brick;
let bricks = [];
let gameScore = 0;
let lives = ["❤️", "❤️", "❤️"];

function setup() {
  createCanvas(400, 600);
  startButton = new Button(width - 280, height - 150, 150, 50, 30, "start");
  restartButton = new Button(width - 250, height - 370, 120, 45, 30, "again");
  saveButton = new Button(width - 270, height - 250, 160, 45, 30, "save score");
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
        65, //(LENTH)
        30, //(WIDTH)
        5 //(POINTS)
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

function displayLives() {
  textSize(20);
  text(lives.join(""), 350, 30);
}

function gameScreen() {
  //ball
  ball.bouceHitEdge();
  ball.draw();

  //if ball drops down lose 1 life
  if (ball.y - ball.radius >= paddle.y + paddle.height) {
    lives.pop(1);
  } else if (lives.length === 0) {
    //when lose 3 lives->fail
    state = "fail";
  }

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
    ball.y + ball.radius >= paddle.y &&
    ball.y - ball.radius <= paddle.y + paddle.height / 4
  ) {
    ball.speedY *= -1;
  }

  //draw bricks
  //if the ball hit the bricks
  for (var i = 0; i < bricks.length; i++) {
    var brick = bricks[i];
    if (
      ball.x + ball.radius >= brick.x && //leftside of the brick
      ball.x - ball.radius <= brick.x + brick.width && //rightside
      ball.y - ball.radius <= brick.y + brick.height //bottom
    ) {
      bricks.splice(i, 1); //remove the hitted brick
      ball.speedY *= -1; //change the direction
      gameScore += brick.point; //update the score
    } else brick.draw();
  }

  //if clean all the bricks
  if (bricks.length === 0) {
    state = "success";
  }

  textSize(20);
  fill(255, 255, 255);
  displayLives();
  text("Score:" + gameScore, 50, 30);
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

function resultScreen(result) {
  restartButton.draw();
  textSize(40);
  fill(51, 132, 53);
  text(result, 200, 150);

  textSize(20);
  fill(255, 255, 255);
  text("You get:" + gameScore + "points", 200, 200);

  //texts for save score
  text("player:", 200, 320);
  saveButton.draw();

  //   const buttonElement = document.getElementById("saveButton");
  //   buttonElement.addEventListener("click", function () {
  //     highscoreSave();
  //   });

  //   displayHighScores();
}

let resultScreen1 = {
  result: "You win!!",
};

let resultScreen2 = {
  result: "Game Over",
};

//for each state
function draw() {
  background(128, 168, 219);

  if (state === "start") {
    startScreen();
  } else if (state === "game") {
    gameScreen();
  } else if (state === "success") {
    resultScreen(resultScreen1.result);
  } else if (state === "fail") {
    resultScreen(resultScreen2.result);
  }
}

window.draw = draw;

function mouseClicked() {
  if (state === "start") {
    if (startButton.hitTest(mouseX, mouseY)) {
      state = "game";
    }
  } else if (state === "success") {
    if (restartButton.hitTest(mouseX, mouseY)) {
      state = "game";
    }
  } else if (state === "fail") {
    if (startButton.hitTest(mouseX, mouseY)) {
      state = "game";
    }
  }
}
window.mouseClicked = mouseClicked;
