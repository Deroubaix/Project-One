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
      this.count = 0;
      this.obstacle = 0;
    } 

  start() {
      this.intervalId = setInterval(this.update, 1000 / 60);
      this.drawScore()
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
  
  
    update = () => {
      this.frames++;
      this.clear();
      this.player.newPosition();
      this.player.animateJump();
      this.player.draw(this.frames);
      this.updateEnemies();
      this.checkGame();
      this.drawScore();
      this.updateScore();
      this.drawLives()
      console.log(this.player.animationSpeed)
    };

    updateScore() {
      if (this.frames % 10 === 0) {
        this.score++;
      }}
  
    stop() {
      clearInterval(this.intervalId);
      targetRestart.classList.remove("hidden")
    }
  
    clear() {
      this.backgroundImage.src = "docs/assets/images/lisboa-skyline.png";
      this.ctx.clearRect(0, 0 , 1200, 450);
      this.ctx.drawImage(this.backgroundImage, 0, 0, 1200, 450);
    }

  drawLives() {
    if (this.lives === 5){
      this.ctx.drawImage(this.livesImg, 0, 45)
      this.ctx.drawImage(this.livesImg, 30, 45)
      this.ctx.drawImage(this.livesImg, 60, 45)
      this.ctx.drawImage(this.livesImg, 90, 45)
      this.ctx.drawImage(this.livesImg, 120, 45)
    } else if (this.lives === 4){
     this.ctx.drawImage(this.livesImg, 0, 45)
     this.ctx.drawImage(this.livesImg, 30, 45)
     this.ctx.drawImage(this.livesImg, 60, 45)
     this.ctx.drawImage(this.livesImg, 90, 45)
    } else if (this.lives === 3){
     this.ctx.drawImage(this.livesImg, 0, 45)
     this.ctx.drawImage(this.livesImg, 30, 45)
     this.ctx.drawImage(this.livesImg, 60, 45)
    } else if (this.lives === 2){
     this.ctx.drawImage(this.livesImg, 0, 45)
     this.ctx.drawImage(this.livesImg, 30, 45)
    } else if (this.lives === 1){
     this.ctx.drawImage(this.livesImg, 0, 45)  
     } }

  
    drawScore() {
      ctx.font = "20px Helvetica";
      ctx.fillStyle = "black";
      ctx.fillText(`Score: ${this.score}`,5, 30);
    }
  
    updateScore() {
      if (this.frames % 10 === 0) {
        this.score++;
      }
    }
  
    updateEnemies() {
      for (let i = 0; i < this.enemies.length; i++) {
        this.enemies[i].x -= 5;
        this.enemies[i].draw();
      }
      
      let randomX = 1200 +  Math.floor(Math.random() * (400 - 100) + 100)

    if (this.frames % 70 === 0) {

      if (this.count === 0){
        this.enemies.push(new Enemy(randomX, 400, img1, "weed", this.ctx))
        this.count ++
      }else if (this.count === 1){
        this.enemies.push(new Enemy(randomX, 400, img2, "coke", this.ctx))
        this.count ++
      }else if (this.count === 2){
        this.enemies.push(new Enemy(randomX, 400, img3, "mushroom", this.ctx))
        this.count = 0
      }
    } 
  }
  
    checkGame() {
      for (let i = 0; i < this.enemies.length; i++) {
        if (this.player.crashWith(this.enemies[i])) {
          this.enemies.splice(i, 1);
          this.lives--;
          if (this.enemies[i].type == "coke"){ //weed
            this.player.animationSpeed = 15
          }  else if (this.enemies[i].type === "mushroom"){ //coke
            this.player.animationSpeed = 2
          }  else if (this.enemies[i].type === "weed"){ //mushroom
            document.getElementById("canvas").classList.add("shroom")
            document.getElementById("body").classList.add("shroom")

     setTimeout(() => {
              document.getElementById("canvas").classList.remove("shroom")
              document.getElementById("body").classList.remove("shroom")
            }, 10000)
          } 
        }
      } 
      
      if (this.lives === 0) {
        this.stop()
        targetRestart.style.display = "block"
        this.player.update()
        
      }
    }}
