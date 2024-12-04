class Enemy {
  constructor(x, y, img, type, ctx) {
    this.x = x;
    this.y = y;
    this.w = 50;
    this.h = 50;
    this.img = img;
    this.ctx = ctx;
    this.speedX = 5;
    this.speedY = 0;
    this.type = type;
  }

  update() {
    this.x -= this.speedX;
  }

  draw() {
    this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  }

  newPosition() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  top() {
    return this.y;
  }

  bottom() {
    return this.y + this.h;
  }

  left() {
    return this.x;
  }

  right() {
    return this.x + this.w;
  }
}
