export default class Ball {
  constructor(x, y, radius, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speedX = speedX;
    this.speedY = speedY;
  }

  draw() {
    push();
    translate(this.x, this.y);
    fill(255, 197, 98);
    ellipse(0, 0, this.radius * 2);
    pop();
  }

  update() {
    this.x = this.x + this.speedX;
    this.y = this.y - this.speedY;
  }

  bouceHitEdge() {
    if (this.x + this.radius < 0 || this.x + this.radius > 400) {
      //when hit right OR left edge
      this.speedX *= -1;
    } else if (this.y + this.radius < 0) {
      //top
      this.speedY *= -1;
    } else if (this.y + this.radius > 600) {
      this.speedX = 0;
      this.speedY = 0;
    }
  }
}
