import Button from "./button.js";
import Paddle from "./paddle.js";
import Bricks from "./bricks.js";

let state = "start";
let startButton;
let restartButton;
let paddle;
let brick;

function setup() {
  createCanvas(400, 600);
  startButton = new Button(width - 280, height - 150, 150, 50, 30, "start");
  restartButton = new Button(width - 280, height - 450, 150, 50, 30, "again");
  paddle = new Paddle(width - 350, 500, 150, 30, 20);
  brick = new Bricks(width - 380, height - 550, 70, 30);
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
  paddle.draw();
  brick.draw();
}

function resultScreen() {
  restartButton.draw();
  textSize(30);
  text("Your score:", 150, 100);
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
