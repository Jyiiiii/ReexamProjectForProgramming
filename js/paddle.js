export default class Paddle {
  constructor(x, y, width, height, radius) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.radius = radius;
  }

  draw() {
    push();
    translate(this.x, this.y);
    fill(51, 132, 53);
    rect(0, 0, this.width, this.height, this.radius);
    pop();
  }
}
