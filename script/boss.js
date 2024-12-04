class Boss {
  constructor(ctx) {
    this.ctx = ctx;
    this.w = 100;
    this.h = 150;
    this.x = ctx.canvas.width - this.w;
    this.y = ctx.canvas.height - this.h;
    this.health = 10;
    this.speedX = 0;
    this.img = new Image();
    this.img.src = "docs/assets/images/lord-boss.png";
    this.projectiles = [];
    this.attackInterval = 100;
    this.framesSinceLastAttack = 0;
    this.isJumping = false;
    this.jumpSpeed = 0;
    this.gravity = 0.5;
    this.jumpStrength = -10;
    this.state = "intro";
    this.introDuration = 180;
    this.introTimer = 0;
    this.shootIntervalIntro = 60;
  }

  update() {
    if (this.state === "intro") {
      this.introTimer++;
      if (this.introTimer % this.shootIntervalIntro === 0) {
        this.shootMultiple();
      }
      if (this.introTimer >= this.introDuration) {
        this.state = "approach";
        this.speedX = -2;
      }
    } else if (this.state === "approach") {
      this.x += this.speedX;
      const approachTargetX = 500;
      if (this.x <= approachTargetX) {
        this.x = approachTargetX;
        this.speedX = 0;
        this.state = "fight";
      }
      this.framesSinceLastAttack++;
      if (
        this.framesSinceLastAttack >= this.attackInterval &&
        Math.random() < 0.5
      ) {
        this.shoot();
        this.framesSinceLastAttack = 0;
      }
    } else if (this.state === "fight") {
      if (this.isJumping) {
        this.y += this.jumpSpeed;
        this.jumpSpeed += this.gravity;
        if (this.y >= this.ctx.canvas.height - this.h) {
          this.y = this.ctx.canvas.height - this.h;
          this.isJumping = false;
          this.jumpSpeed = 0;
        }
      } else {
        if (Math.random() < 0.01) {
          this.isJumping = true;
          this.jumpSpeed = this.jumpStrength;
        }
      }
      this.framesSinceLastAttack++;
      if (this.framesSinceLastAttack >= this.attackInterval) {
        this.shoot();
        this.framesSinceLastAttack = 0;
      }
    }
    for (let i = 0; i < this.projectiles.length; i++) {
      this.projectiles[i].update();
      if (this.projectiles[i].x + this.projectiles[i].w < 0) {
        this.projectiles.splice(i, 1);
        i--;
      }
    }
  }

  draw() {
    this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    for (let projectile of this.projectiles) {
      projectile.draw();
    }
  }

  shoot() {
    const projectileX = this.x;
    const minY = this.ctx.canvas.height - this.h - 50;
    const maxY = this.ctx.canvas.height - 100;
    const projectileY = Math.max(minY, Math.min(maxY, this.y + this.h / 2));
    const projectile = new BossProjectile(projectileX, projectileY, this.ctx);
    this.projectiles.push(projectile);
  }
  

  shootMultiple() {
    const numProjectiles = 1;
    for (let i = 0; i < numProjectiles; i++) {
      const projectileX = this.x;
      const projectileY = this.y + Math.random() * this.h;
      const projectile = new BossProjectile(projectileX, projectileY, this.ctx);
      this.projectiles.push(projectile);
    }
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
