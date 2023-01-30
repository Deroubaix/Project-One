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
    }
  
    clear() {
      this.backgroundImage.src = "docs/assets/images/street3.png";
      this.ctx.drawImage(this.backgroundImage, 0, 0, 700, 700);
    }
  
    drawScore() {
      ctx.font = "20px Helvetica";
      ctx.fillStyle = "white";
      ctx.fillText(`Score: ${this.score}`, 80, 30);
    }
  
    updateScore() {
      if (this.frames % 10 === 0) {
        this.score++;
      }
    }
  
    updateEnemies() {
      for (let i = 0; i < this.enemies.length; i++) {
        this.enemies[i].y += 2;
        this.enemies[i].draw();
      }
  
      if (this.frames % 100 === 0) {
        let randomSize = Math.floor(Math.random() * (250 - 100) + 100);
  
        let randomX = Math.floor(Math.random() * (500 - 100) + 100);
  
        this.enemies.push(new Enemy(randomX, 0, randomSize, 30, "red", this.ctx));
      }
    }
  
    checkGameOver() {
      const crashed = this.enemies.some((enemy) => {
        return this.player.crashWith(enemy);
      });
  
      if (crashed) {
        ctx.fillStyle = "black";
        ctx.fillRect(50, 200, 400, 250);
        ctx.font = "32px Helvetica";
        ctx.fillStyle = "red";
        ctx.fillText(`YOU GOT SCAMMED`, 90, 300);
        ctx.fillStyle = "white";
        ctx.fillText(`Your final score`, 135, 350);
        ctx.fillText(`${this.score}`, 230, 400);
        this.stop();
      }
    }
  }