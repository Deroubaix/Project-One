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
      this.livesImg.src = "/docs/assets/images/live.png";
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
      this.player.draw();
      
      this.updateEnemies();
      this.checkGameOver();
      this.drawScore();
      this.updateScore();
      this.drawLives()
    };
  
    stop() {
      clearInterval(this.intervalId);
      targetRestart.classList.remove("hidden")
    }
  
    clear() {
      this.backgroundImage.src = "docs/assets/images/lisboa_preview_rev_1.png";
      this.ctx.clearRect(0, 0 , 1200, 350);
      this.ctx.drawImage(this.backgroundImage, 0, -125, 1200, 475);
    }

    drawLives() {
 if (this.lives === 5){
   this.ctx.drawImage(this.livesImg, 45, 45)
   this.ctx.drawImage(this.livesImg, 80, 45)
   this.ctx.drawImage(this.livesImg, 115, 45)
   this.ctx.drawImage(this.livesImg, 150, 45)
   this.ctx.drawImage(this.livesImg, 185, 45)
 } else if (this.lives === 4){
  this.ctx.drawImage(this.livesImg, 45, 45)
  this.ctx.drawImage(this.livesImg, 80, 45)
  this.ctx.drawImage(this.livesImg, 115, 45)
  this.ctx.drawImage(this.livesImg, 150, 45)
 } else if (this.lives === 3){
  this.ctx.drawImage(this.livesImg, 45, 45)
  this.ctx.drawImage(this.livesImg, 80, 45)
  this.ctx.drawImage(this.livesImg, 115, 45)
 } else if (this.lives === 2){
  this.ctx.drawImage(this.livesImg, 45, 45)
  this.ctx.drawImage(this.livesImg, 80, 45)
 } else if (this.lives === 1){
  this.ctx.drawImage(this.livesImg, 45, 45)  
  }
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
  
      if (this.frames % 240  === 0) {
        console.log("Create enemy")
        let randomSize = Math.floor(Math.random() * (250 - 100) + 100);
  
        let randomX = 1200 +  Math.floor(Math.random() * (300 - 100) + 100)
  
        this.enemies.push(new Enemy(randomX, 300, randomSize, 30, "red", this.ctx));
      }
    }
  
    checkGameOver() {
      const crashed = this.enemies.some((enemy) => {
        return this.player.crashWith(enemy);
      });
  
      if (crashed) {
/*         this.stop();
        targetRestart.style.display = "block" */
        this.lives--;
      }
    }
  }
