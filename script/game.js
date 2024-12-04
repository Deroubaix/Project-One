/** @type {HTMLCanvasElement} */

const imgWeed = new Image();
imgWeed.src = "docs/assets/images/weed.png";

const imgCoke = new Image();
imgCoke.src = "docs/assets/images/coke.png";

const imgMushroom = new Image();
imgMushroom.src = "docs/assets/images/mushroom.png";

class Game {
  constructor(ctx, width, height, player) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.player = player;
    this.intervalId = null;
    this.frames = 0;
    this.enemies = [];
    this.passports = [];
    this.passportsCollected = 0;
    this.boss = null;
    this.score = 0;
    this.lives = 5;
    this.targetPassports = 20;
    this.backgroundImage = new Image();
    this.backgroundImage.src = "docs/assets/images/lisboa-skyline.png";
    this.difficultyIncreased = false;
    this.enemySpawnInterval = 120;
    this.bossBattleStarted = false;
    this.projectiles = [];
    this.playerInvincible = false;
    this.invincibilityDuration = 60;
    this.invincibilityTimer = 0;
    this.initialize();

    const img0 = new Image();
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
    const img13 = new Image();
    const img14 = new Image();
    const img15 = new Image();
    const img16 = new Image();
    const img17 = new Image();
    const img18 = new Image();
    const img19 = new Image();
    const img20 = new Image();
    const img21 = new Image();
    const img22 = new Image();
    const img23 = new Image();

    img0.addEventListener("load", () => {});
    img0.src = "docs/assets/images/heart/frame_00_delay-0.04s.gif";
    img1.addEventListener("load", () => {});
    img1.src = "docs/assets/images/heart/frame_01_delay-0.04s.gif";
    img2.addEventListener("load", () => {});
    img2.src = "docs/assets/images/heart/frame_02_delay-0.04s.gif";
    img3.addEventListener("load", () => {});
    img3.src = "docs/assets/images/heart/frame_03_delay-0.04s.gif";
    img4.addEventListener("load", () => {});
    img4.src = "docs/assets/images/heart/frame_04_delay-0.04s.gif";
    img5.addEventListener("load", () => {});
    img5.src = "docs/assets/images/heart/frame_05_delay-0.04s.gif";
    img6.addEventListener("load", () => {});
    img6.src = "docs/assets/images/heart/frame_06_delay-0.04s.gif";
    img7.addEventListener("load", () => {});
    img7.src = "docs/assets/images/heart/frame_07_delay-0.04s.gif";
    img8.addEventListener("load", () => {});
    img8.src = "docs/assets/images/heart/frame_08_delay-0.04s.gif";
    img9.addEventListener("load", () => {});
    img9.src = "docs/assets/images/heart/frame_09_delay-0.04s.gif";
    img10.addEventListener("load", () => {});
    img10.src = "docs/assets/images/heart/frame_10_delay-0.04s.gif";
    img11.addEventListener("load", () => {});
    img11.src = "docs/assets/images/heart/frame_11_delay-0.04s.gif";
    img12.addEventListener("load", () => {});
    img12.src = "docs/assets/images/heart/frame_12_delay-0.04s.gif";
    img13.addEventListener("load", () => {});
    img13.src = "docs/assets/images/heart/frame_13_delay-0.04s.gif";
    img14.addEventListener("load", () => {});
    img14.src = "docs/assets/images/heart/frame_14_delay-0.04s.gif";
    img15.addEventListener("load", () => {});
    img15.src = "docs/assets/images/heart/frame_15_delay-0.04s.gif";
    img16.addEventListener("load", () => {});
    img16.src = "docs/assets/images/heart/frame_16_delay-0.04s.gif";
    img17.addEventListener("load", () => {});
    img17.src = "docs/assets/images/heart/frame_17_delay-0.04s.gif";
    img18.addEventListener("load", () => {});
    img18.src = "docs/assets/images/heart/frame_18_delay-0.04s.gif";
    img19.addEventListener("load", () => {});
    img19.src = "docs/assets/images/heart/frame_19_delay-0.04s.gif";
    img20.addEventListener("load", () => {});
    img20.src = "docs/assets/images/heart/frame_20_delay-0.04s.gif";
    img21.addEventListener("load", () => {});
    img21.src = "docs/assets/images/heart/frame_21_delay-0.04s.gif";
    img22.addEventListener("load", () => {});
    img22.src = "docs/assets/images/heart/frame_22_delay-0.04s.gif";
    img23.addEventListener("load", () => {});
    img23.src = "docs/assets/images/heart/frame_23_delay-0.04s.gif";

    this.images = [];
    for (let i = 0; i <= 23; i++) {
      const img = new Image();
      img.src = `docs/assets/images/heart/frame_${String(i).padStart(
        2,
        "0"
      )}_delay-0.04s.gif`;
      this.images.push(img);
    }
  }

  initialize() {
    this.intervalId = null;
    this.frames = 0;
    this.enemies = [];
    this.passports = [];
    this.passportsCollected = 0;
    this.boss = null;
    this.score = 0;
    this.lives = 5;
    this.difficultyIncreased = false;
    this.bossBattleStarted = false;
    this.enemySpawnInterval = 120;
  }

  start() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.intervalId = setInterval(() => this.update(), 1000 / 60);
    this.frames = 0;
    this.drawScore();
    this.drawLives(this.frames);
  }

  stop() {
    clearInterval(this.intervalId);
    const gameOverScreen = document.getElementById("restart");
    const victoryScreen = document.getElementById("victory");
    if (this.lives <= 0) {
      gameOverScreen.classList.remove("hidden");
    }
    if (!victoryScreen.classList.contains("hidden")) {
      victoryScreen.classList.add("hidden");
    }
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.drawImage(this.backgroundImage, 0, 0, this.width, this.height);
  }

  reset() {
    this.initialize();
  }

  update = () => {
    this.frames++;
    this.clear();
    this.player.newPosition();
    this.player.animateJump();
    this.player.draw(this.frames);
    this.updateEnemies();
    this.updatePassports();
    this.checkGame();
    this.drawScore();
    this.updateScore();
    this.drawLives(this.frames);
    this.updateScore();
    this.updateProjectiles();
    this.drawBossHealth();

    if (this.passportsCollected >= 10 && !this.difficultyIncreased) {
      this.increaseDifficulty();
      this.difficultyIncreased = true;
    }

    if (this.passportsCollected >= 20 && !this.bossBattleStarted) {
      this.spawnBoss();
      this.bossBattleStarted = true;
    }

    if (this.boss) {
      this.boss.update(this.player.x);
      this.boss.draw();

      for (let i = 0; i < this.boss.projectiles.length; i++) {
        const projectile = this.boss.projectiles[i];
        if (this.checkCollision(projectile, this.player)) {
          this.lives--;
          this.boss.projectiles.splice(i, 1);
          i--;
        }
      }

      if (this.player.crashWith(this.boss)) {
        this.lives--;
      }

      if (this.boss && this.boss.health <= 0) {
        this.winGame();
        return;
      }
    }
    if (this.lives <= 0) {
      this.stop();
      return;
    }
  };

  drawScore() {
    this.ctx.save();
    this.ctx.font = "20px Helvetica";
    this.ctx.fillStyle = "white";
    this.ctx.textAlign = "left";
    this.ctx.textBaseline = "top";

    const xOffset = 20;
    const yScore = 30;
    const yPassports = 60;

    this.ctx.fillText(`Score: ${this.score}`, xOffset, yScore);
    this.ctx.fillText(
      `Passports: ${this.passportsCollected}`,
      xOffset,
      yPassports
    );

    this.ctx.restore();
  }

  drawLives(frames) {
    this.ctx.save();
    this.img = this.images[Math.floor((frames % 30) / 3.75)];
    const xStart = 15;
    const y = 90;
    const spacing = 25;
    for (let i = 0; i < this.lives; i++) {
      this.ctx.drawImage(this.img, xStart + i * spacing, y);
    }
    this.ctx.restore();
  }

  drawBossHealth() {
    if (this.boss) {
      this.ctx.save();
      const barWidth = 200;
      const barHeight = 20;
      const x = this.width - barWidth - 20;
      const y = 20;
      this.ctx.strokeStyle = "black";
      this.ctx.strokeRect(x, y, barWidth, barHeight);
      this.ctx.fillStyle = "red";
      this.ctx.fillRect(x, y, this.boss.health * (barWidth / 10), barHeight);
      this.ctx.restore();
    }
  }

  screenScore() {
    const gameOverScreen = document.getElementById("restart");
    gameOverScreen.classList.remove("hidden");
  }

  updateScore() {
    if (this.frames % 10 === 0) {
      this.score++;
    }
  }

  increaseDifficulty() {
    this.enemies.forEach((enemy) => {
      enemy.speedX *= 1.2;
    });
    this.enemySpawnInterval = 100;
  }

  spawnBoss() {
    this.enemies = [];
    this.passports = [];
    this.boss = new Boss(this.ctx);
    this.displayBossMessage();
  }

  displayBossMessage() {
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = "#ffd300";
    this.ctx.font = "50px Helvetica";
    this.ctx.textAlign = "center";
    this.ctx.fillText("Boss Battle!", this.width / 2, this.height / 2);

    setTimeout(() => {}, 2000);
  }

  updateEnemies() {
    for (let i = 0; i < this.enemies.length; i++) {
      this.enemies[i].update();
      this.enemies[i].draw();
      if (this.enemies[i].x + this.enemies[i].w < 0) {
        this.enemies.splice(i, 1);
        i--;
      }
    }

    if (!this.bossBattleStarted) {
      if (this.frames % this.enemySpawnInterval === 0) {
        const randomX = 1200 + Math.floor(Math.random() * 200);
        const enemyHeight = 50;
        const groundLevelY = this.height - enemyHeight;
        const fixedY = groundLevelY;
        const isMushroomAllowed =
          !this.player.isPowerUpActive && this.player.animationSpeed === 5;
        const randomChance = Math.random();

        if (isMushroomAllowed && randomChance < 0.1) {
          this.enemies.push(
            new Enemy(randomX, fixedY, imgMushroom, "mushroom", this.ctx)
          );
        } else {
          if (randomChance < 0.5) {
            this.enemies.push(
              new Enemy(randomX, fixedY, imgWeed, "weed", this.ctx)
            );
          } else {
            this.enemies.push(
              new Enemy(randomX, fixedY, imgCoke, "coke", this.ctx)
            );
          }
        }
      }
    }
  }

  updatePassports() {
    for (let i = 0; i < this.passports.length; i++) {
      this.passports[i].update();
      this.passports[i].draw();

      if (this.passports[i].x + this.passports[i].w < 0) {
        this.passports.splice(i, 1);
        i--;
      }
    }

    if (!this.bossBattleStarted) {
      if (this.frames % 200 === 0) {
        const randomX = 1200;
        const groundLevelY = this.height - this.player.h;
        const maxJumpHeight = 100;

        const maxPassportY = groundLevelY - maxJumpHeight;
        const minPassportY = maxPassportY + 30;
        const randomY =
          Math.random() * (minPassportY - maxPassportY) + maxPassportY;

        if (randomY < 0) randomY = 0;
        if (randomY + 30 > this.height) randomY = this.height - 30;

        this.passports.push(new Passport(randomX, randomY, this.ctx));
      }
    }
  }

  updateProjectiles() {
    for (let i = 0; i < this.projectiles.length; i++) {
      const projectile = this.projectiles[i];
      projectile.update();
      projectile.draw();
      if (projectile.x > this.width) {
        this.projectiles.splice(i, 1);
        i--;
      } else if (this.boss && this.checkCollision(projectile, this.boss)) {
        this.boss.health--;
        this.projectiles.splice(i, 1);
        i--;
      }
    }
  }

  checkGame() {
    if (!this.bossBattleStarted) {
      for (let i = 0; i < this.enemies.length; i++) {
        if (this.player.crashWith(this.enemies[i])) {
          const enemy = this.enemies[i];
          this.enemies.splice(i, 1);

          if (enemy.type === "mushroom") {
            this.player.activatePowerUp();
          } else if (!this.player.isPowerUpActive) {
            if (enemy.type === "coke") {
              this.player.animationSpeed = 2;
              document.getElementById("canvas").classList.add("coke-effect");
              setTimeout(() => {
                this.player.animationSpeed = 5;
                document
                  .getElementById("canvas")
                  .classList.remove("coke-effect");
              }, 5000);
            } else if (enemy.type === "weed") {
              this.player.animationSpeed = 10;
              document.getElementById("canvas").classList.add("weed-effect");
              setTimeout(() => {
                this.player.animationSpeed = 5;
                document
                  .getElementById("canvas")
                  .classList.remove("weed-effect");
              }, 5000);
            }

            this.lives--;
          }
        }
      }
    }

    for (let i = 0; i < this.passports.length; i++) {
      if (this.player.crashWith(this.passports[i])) {
        this.passports.splice(i, 1);
        this.passportsCollected += 1;
        this.score += 10;
        i--;
      }
    }

    if (this.lives <= 0) {
      this.stop();
    }
  }

  checkCollision(obj1, obj2) {
    return !(
      obj1.bottom() < obj2.top() ||
      obj1.top() > obj2.bottom() ||
      obj1.right() < obj2.left() ||
      obj1.left() > obj2.right()
    );
  }

  winGame() {
    clearInterval(this.intervalId);
    const gameOverScreen = document.getElementById("restart");
    if (!gameOverScreen.classList.contains("hidden")) {
      gameOverScreen.classList.add("hidden");
    }
    const victoryScreen = document.getElementById("victory");
    victoryScreen.classList.remove("hidden");
    const finalScoreElement = document.getElementById("final-score");
    finalScoreElement.textContent = this.score;
  }
}
