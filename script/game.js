/** @type {HTMLCanvasElement} */

class Game {
  constructor(ctx, width, height, player) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.player = player;
    this.intervalId = null;
    this.frames = 0;
    this.enemies = [];
    this.score = 0;
    this.lives = 5;
    this.livesImg = new Image();
    this.livesImg.src = "/docs/assets/images/life.png";
    this.backgroundImage = new Image();
  }

  start() {
    this.intervalId = setInterval(this.update, 1000 / 60);
  }

  update = () => {
    this.frames++;
    this.clear();
    this.player.newPosition();
    this.player.animateJump();
    this.player.draw(this.frames);
    this.updateEnemies();
    this.checkGameOver();
    this.drawScore();
    this.updateScore();
    this.drawLives();
  };

  stop() {
    clearInterval(this.intervalId);
    targetRestart.classList.remove("hidden");
  }

  clear() {
    this.backgroundImage.src = "docs/assets/images/lisboa-skyline.png";
    this.ctx.clearRect(0, 0, 1200, 450);
    this.ctx.drawImage(this.backgroundImage, 0, 0, 1200, 450);
  }

  drawLives() {
    if (this.lives === 5) {
      this.ctx.drawImage(this.livesImg, 10, 30);
      this.ctx.drawImage(this.livesImg, 40, 30);
      this.ctx.drawImage(this.livesImg, 70, 30);
      this.ctx.drawImage(this.livesImg, 100, 30);
      this.ctx.drawImage(this.livesImg, 130, 30);
    } else if (this.lives === 4) {
      this.ctx.drawImage(this.livesImg, 10, 30);
      this.ctx.drawImage(this.livesImg, 40, 30);
      this.ctx.drawImage(this.livesImg, 70, 30);
      this.ctx.drawImage(this.livesImg, 100, 30);
    } else if (this.lives === 3) {
      this.ctx.drawImage(this.livesImg, 10, 30);
      this.ctx.drawImage(this.livesImg, 40, 30);
      this.ctx.drawImage(this.livesImg, 70, 30);
    } else if (this.lives === 2) {
      this.ctx.drawImage(this.livesImg, 10, 30);
      this.ctx.drawImage(this.livesImg, 40, 30);
    } else if (this.lives === 1) {
      this.ctx.drawImage(this.livesImg, 10, 30);
    } else {
    }
  }

  drawScore() {
    ctx.font = "20px Helvetica";
    ctx.fillStyle = "black";
    ctx.fillText(`Score: ${this.score}`, 12, 20);
  }

  screenScore() {
    this.ctx.fillStyle = "black"
    ctx.fillRect(305, 175, 590, 140);
    ctx.fillStyle = "#ffd300";
    ctx.font = "40px Helvetica";
    ctx.textAlign = "center";
    ctx.fillText("Your Score: " + this.score, canvas.width / 2, canvas.height / 2 + 30);
  }

  updateScore() {
    if (this.frames % 10 === 0) {
      this.score++;
    }
  }

  updateEnemies() {
    for (let i = 0; i < this.enemies.length; i++) {
      this.enemies[i].x -= 2;
      this.enemies[i].draw();
    }

    if (this.frames % 240 === 0) {
      console.log("Create enemy");
      let randomSize = Math.floor(Math.random() * (250 - 100) + 100);

      let randomX = 1400 + Math.floor(Math.random() * (400 - 100) + 100);

      this.enemies.push(
        new Enemy(randomX, 400, randomSize, 30, "red", this.ctx)
      );
    }
  }

  checkGameOver() {
    for (let i = 0; i < this.enemies.length; i++) {
      if (this.player.crashWith(this.enemies[i])) {
        this.enemies.splice(i, 1);
        this.lives--;
      }
    }
    if (this.lives === 0) {
      this.stop();
      targetRestart.style.display = "block";
      this.screenScore()
      this.player.update();
    }
  }
}
