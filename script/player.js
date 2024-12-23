/** @type {HTMLCanvasElement} */

class Player {
  constructor(x, y, w, h, ctx) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.ctx = ctx;
    this.speedX = 0;
    this.gravity = 0.5;
    this.speedY = 0;
    this.isGrounded = false;
    this.jumpTimer = 0;
    this.jumpForce = 10;
    this.animationSpeed = 5;
    this.animation = 0;
    this.isPowerUpActive = false;
    this.powerUpTimer = null;
    this.difficultyIncreased = false;
    this.enemySpawnInterval = 120;

    const img1 = new Image();
    const img2 = new Image();
    const img3 = new Image();
    const img4 = new Image();
    const img5 = new Image();
    const img6 = new Image();
    const img7 = new Image();
    const img8 = new Image();
    const img9 = new Image();
    const img10 = new Image();
    const img11 = new Image();
    const img12 = new Image();

    img1.addEventListener("load", () => {});
    img1.src = "docs/assets/images/frame_00_delay-0.08s.png";
    img2.addEventListener("load", () => {});
    img2.src = "docs/assets/images/frame_01_delay-0.08s.png";
    img3.addEventListener("load", () => {});
    img3.src = "docs/assets/images/frame_02_delay-0.08s.png";
    img4.addEventListener("load", () => {});
    img4.src = "docs/assets/images/frame_03_delay-0.08s.png";
    img5.addEventListener("load", () => {});
    img5.src = "docs/assets/images/frame_04_delay-0.08s.png";
    img6.addEventListener("load", () => {});
    img6.src = "docs/assets/images/frame_05_delay-0.08s.png";
    img7.addEventListener("load", () => {});
    img7.src = "docs/assets/images/frame_06_delay-0.08s.png";
    img8.addEventListener("load", () => {});
    img8.src = "docs/assets/images/frame_07_delay-0.08s.png";
    img9.addEventListener("load", () => {});
    img9.src = "docs/assets/images/frame_08_delay-0.08s.png";
    img10.addEventListener("load", () => {});
    img10.src = "docs/assets/images/frame_09_delay-0.08s.png";
    img11.addEventListener("load", () => {});
    img11.src = "docs/assets/images/frame_10_delay-0.08s.png";
    img12.addEventListener("load", () => {});
    img12.src = "docs/assets/images/frame_11_delay-0.08s.png";

    this.img = img1;
    this.images = [
      img1,
      img2,
      img3,
      img4,
      img5,
      img6,
      img7,
      img8,
      img9,
      img10,
      img11,
      img12,
    ];
  }

  activatePowerUp() {
    if (this.isPowerUpActive) return;

    this.isPowerUpActive = true;
    document.getElementById("canvas").classList.add("shroom");

    this.animationSpeed = 5;
    document.getElementById("canvas").classList.remove("weed-effect");
    document.getElementById("canvas").classList.remove("coke-effect");

    this.powerUpTimer = setTimeout(() => {
      this.isPowerUpActive = false;
      document.getElementById("canvas").classList.remove("shroom");
    }, 10000);
  }

  draw(frames) {
    if (frames % this.animationSpeed === 1) {
      this.animation = (this.animation + 1) % this.images.length;
    }
    this.img = this.images[this.animation];
    this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  }

  newPosition() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0) {
      this.x = 0;
    } else if (this.x + this.w > 1200) {
      this.x = 1200 - this.w;
    }

    if (this.y < 0) {
      this.y = 0;
    } else if (this.y + this.h > 500) {
      this.y = 500 - this.h;
    }
  }

  top() {
    return this.y;
  }

  bottom() {
    return this.y + this.h;
  }

  left() {
    return this.x + 10;
  }

  right() {
    return this.x + this.w - 10;
  }

  animateJump() {
    this.y += this.speedY;
    const groundLevelY = this.ctx.canvas.height - this.h;
    if (this.y + this.h < this.ctx.canvas.height) {
      this.speedY += this.gravity;
      this.isGrounded = false;
    } else {
      this.speedY = 0;
      this.isGrounded = true;
      this.y = groundLevelY;
    }
  }

  jump() {
    console.log(this.jumpTimer);
    if (this.isGrounded && this.jumpTimer === 0) {
      this.jumpTimer = 1;
      this.speedY = -this.jumpForce;
      console.log(this.jumpTimer);
    } else if (this.jumpTimer > 0 && this.jumpTimer < 1) {
      this.jumpTimer++;
      this.speedY = -this.jumpForce - this.jumpTimer / 50;
    }
  }

  update() {
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  crashWith(otherObj) {
    return !(
      this.bottom() < otherObj.top() ||
      this.top() > otherObj.bottom() ||
      this.right() < otherObj.left() ||
      this.left() > otherObj.right()
    );
  }

  shoot() {
    const projectile = new Projectile(
      this.x + this.w,
      this.y + this.h / 2,
      this.ctx
    );
    game.projectiles.push(projectile);
  }
}
