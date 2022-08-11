export default class Ball {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  draw() {
    push();
    translate(this.x, this.y);
    fill(255, 197, 98);
    ellipse(0, 0, this.radius);
    pop();
  }

  bouceHitEdge() {
    if (this.x + this.radius >= width) {
      //when hit right edge
      this.x *= -1;
    } else if (this.x - this.radius <= 0) {
      //left
      this.x *= -1;
    } else if (this.y - this.radius <= 0) {
      //top
      this.y *= -1;
    }
  }

  update() {
    this.x += 4;
    this.y -= 4;
  }
}
