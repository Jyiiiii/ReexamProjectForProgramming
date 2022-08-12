export default class Brick {
  constructor(x, y, width, height, point) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.point = point;
  }

  draw() {
    push();
    translate(this.x, this.y);
    fill(149, 75, 12);
    rect(0, 0, this.width, this.height);
    pop();
  }
}
