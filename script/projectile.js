class Projectile {
    constructor(x, y, ctx) {
      this.x = x;
      this.y = y;
      this.w = 30;
      this.h = 20;
      this.speedX = 7;
      this.ctx = ctx;
      this.img = new Image();
      this.img.src = 'docs/assets/images/passport.png';
    }
  
    update() {
      this.x += this.speedX;
    }
  
    draw() {
      this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
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
  