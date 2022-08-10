export default class Bricks {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw() {
    push();
    translate(this.x, this.y);
    fill(149, 75, 12);
    rect(0, 0, this.width, this.height);
    pop();
  }
}
