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
      this.backgroundImage = new Image();
    }
  
    start() {
      this.intervalId = setInterval(this.update, 1000 / 60);
    }
  
    update = () => {
      this.frames++;
      this.clear();
      this.player.newPosition();
      this.player.draw();
      this.updateEnemies();
      this.checkGameOver();
      this.drawScore();
      this.updateScore();
    };
  
    stop() {
      clearInterval(this.intervalId);
      targetRestart.classList.remove("hidden")
    }
  
    clear() {
      this.backgroundImage.src = "docs/assets/images/lisboa_preview_rev_1.png";
      this.ctx.drawImage(this.backgroundImage, 0, 0, 1200, 350);
    }
  
    drawScore() {
      ctx.font = "20px Helvetica";
      ctx.fillStyle = "black";
      ctx.fillText(`Score: ${this.score}`, 80, 30);
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
  
      if (this.frames % Math.floor(Math.random() * (50 - 10) + 10) === 0) {
        let randomSize = Math.floor(Math.random() * (250 - 100) + 100);
  
        let randomX = 1200
  
        this.enemies.push(new Enemy(randomX, 300, randomSize, 30, "red", this.ctx));
      }
    }
  
    checkGameOver() {
      const crashed = this.enemies.some((enemy) => {
        return this.player.crashWith(enemy);
      });
  
      if (crashed) {
        this.stop();
        targetRestart.style.display = "block"
      }
    }
  }
