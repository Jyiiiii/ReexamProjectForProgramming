// button for start & replay the game
export default class Button {
  constructor(x, y, width, height, radius, text) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.radius = radius;
    this.text = text;
  }

  draw() {
    push();
    translate(this.x, this.y);
    fill(255, 197, 98);
    rect(0, 0, this.width, this.height, this.radius);
    //for the text inside
    noStroke();
    fill(255, 255, 255);
    textAlign(CENTER);
    textSize(this.height / 2);
    text(this.text, 0, 15, this.width);
    pop();
  }

  //for clicked the button or not
  // x,y for the cordinate
  hitTest(x, y) {
    return (
      x > this.x &&
      x < this.x + this.width &&
      y > this.y &&
      y < this.y + this.height
    );
  }
}
