//the OOP structure(import,export & setup and the states setting)were learned from the course website and lab4:catch me

//some logical ideas for how to build this game were inspired from https://www.youtube.com/watch?v=3GLirU3SkDM
//the codes were all written by ourselves and the video was just help us for the logical
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
let gameScore = 0;
let lives = ["❤️", "❤️", "❤️"];

const input_name = document.getElementById("input_name");
//const save_button = document.getElementById("save_button");
const high_scores = JSON.parse(localStorage.getItem("high_scores")) || [];

function setup() {
  createCanvas(400, 600);
  startButton = new Button(width - 280, height - 150, 150, 50, 30, "Start");
  restartButton = new Button(width - 250, height - 370, 120, 45, 30, "Again");
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
    lives.pop();
    ball.newPosition();
    ball.update();
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

function resultScreen(result) {
  restartButton.draw();
  textSize(50);
  fill(51, 132, 53);
  text(result, 200, 150);

  textSize(20);
  fill(255, 255, 255);
  text("You got : " + gameScore + " points", 200, 200);

  textSize(30);
  text("High Scores", 200, 400);

  document.getElementById("score_list").innerHTML = high_scores
    .map((score) => {
      return `<li>${score.name}     ${score.score}</li>`;
    })
    .join("");
}

document.getElementById("save_button").onclick = function () {
  const scores = {
    score: gameScore,
    name: input_name.value,
  };

  high_scores.push(scores);
  high_scores.sort(function (a, b) {
    return b.score - a.score;
  });
  high_scores.splice(5);
  localStorage.setItem("high_scores", JSON.stringify(high_scores));
  console.log(high_scores);
};

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
    document.getElementById("input_name").style.visibility = "hidden";
    document.getElementById("save_button").style.visibility = "hidden";
  } else if (state === "game") {
    gameScreen();
    document.getElementById("input_name").style.visibility = "hidden";
    document.getElementById("save_button").style.visibility = "hidden";
  } else if (state === "success") {
    resultScreen(resultScreen1.result);
    document.getElementById("input_name").style.visibility = "visible";
    document.getElementById("save_button").style.visibility = "visible";
  } else if (state === "fail") {
    resultScreen(resultScreen2.result);
    document.getElementById("input_name").style.visibility = "visible";
    document.getElementById("save_button").style.visibility = "visible";
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
      lives = ["❤️", "❤️", "❤️"];
      gameScore = 0;
      setup();
    }
  } else if (state === "fail") {
    if (restartButton.hitTest(mouseX, mouseY)) {
      state = "game";
      lives = ["❤️", "❤️", "❤️"];
      gameScore = 0;

      setup();
    }
  }
}
window.mouseClicked = mouseClicked;
