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
    this.backgroundImage = new Image();

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
      
      img0.addEventListener("load", () => {})
      img0.src = "/docs/assets/images/heart/frame_00_delay-0.04s.gif";
      img1.addEventListener("load", () => {})
      img1.src = "/docs/assets/images/heart/frame_01_delay-0.04s.gif";
      img2.addEventListener("load", () => {})
      img2.src = "/docs/assets/images/heart/frame_02_delay-0.04s.gif";
      img3.addEventListener("load", () => {})
      img3.src = "/docs/assets/images/heart/frame_03_delay-0.04s.gif";
      img4.addEventListener("load", () => {})
      img4.src = "/docs/assets/images/heart/frame_04_delay-0.04s.gif";
      img5.addEventListener("load", () => {})
      img5.src = "/docs/assets/images/heart/frame_05_delay-0.04s.gif";
      img6.addEventListener("load", () => {})
      img6.src = "/docs/assets/images/heart/frame_06_delay-0.04s.gif";
      img7.addEventListener("load", () => {})
      img7.src = "/docs/assets/images/heart/frame_07_delay-0.04s.gif";
      img8.addEventListener("load", () => {})
      img8.src = "/docs/assets/images/heart/frame_08_delay-0.04s.gif";
      img9.addEventListener("load", () => {})
      img9.src = "/docs/assets/images/heart/frame_09_delay-0.04s.gif";
      img10.addEventListener("load", () => {})
      img10.src = "/docs/assets/images/heart/frame_10_delay-0.04s.gif";
      img11.addEventListener("load", () => {})
      img11.src = "/docs/assets/images/heart/frame_11_delay-0.04s.gif";
      img12.addEventListener("load", () => {})
      img12.src = "/docs/assets/images/heart/frame_12_delay-0.04s.gif";
      img13.addEventListener("load", () => {})
      img13.src = "/docs/assets/images/heart/frame_13_delay-0.04s.gif";
      img14.addEventListener("load", () => {})
      img14.src = "/docs/assets/images/heart/frame_14_delay-0.04s.gif";
      img15.addEventListener("load", () => {})
      img15.src = "/docs/assets/images/heart/frame_15_delay-0.04s.gif";
      img16.addEventListener("load", () => {})
      img16.src = "/docs/assets/images/heart/frame_16_delay-0.04s.gif";
      img17.addEventListener("load", () => {})
      img17.src = "/docs/assets/images/heart/frame_17_delay-0.04s.gif";
      img18.addEventListener("load", () => {})
      img18.src = "/docs/assets/images/heart/frame_18_delay-0.04s.gif";
      img19.addEventListener("load", () => {})
      img19.src = "/docs/assets/images/heart/frame_19_delay-0.04s.gif";
      img20.addEventListener("load", () => {})
      img20.src = "/docs/assets/images/heart/frame_20_delay-0.04s.gif";
      img21.addEventListener("load", () => {})
      img21.src = "/docs/assets/images/heart/frame_21_delay-0.04s.gif";
      img22.addEventListener("load", () => {})
      img22.src = "/docs/assets/images/heart/frame_22_delay-0.04s.gif";
      img23.addEventListener("load", () => {})
      img23.src = "/docs/assets/images/heart/frame_23_delay-0.04s.gif";
  
      this.img = img1;
      this.images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12,
                     img13, img14, img15, img16, img17, img18,img19,img20,img21,img22,img23]
    }
  
    drawLives(frames) {
      this.img = this.images[Math.floor(frames % 30 / 3.75)]
      if (this.lives === 5) {
        this.ctx.drawImage(this.img, 10, 30);
        this.ctx.drawImage(this.img, 40, 30);
        this.ctx.drawImage(this.img, 70, 30);
        this.ctx.drawImage(this.img, 100, 30);
        this.ctx.drawImage(this.img, 130, 30);
      } else if (this.lives === 4) {
        this.ctx.drawImage(this.img, 10, 30);
        this.ctx.drawImage(this.img, 40, 30);
        this.ctx.drawImage(this.img, 70, 30);
        this.ctx.drawImage(this.img, 100, 30);
      } else if (this.lives === 3) {
        this.ctx.drawImage(this.img, 10, 30);
        this.ctx.drawImage(this.img, 40, 30);
        this.ctx.drawImage(this.img, 70, 30);
      } else if (this.lives === 2) {
        this.ctx.drawImage(this.img, 10, 30);
        this.ctx.drawImage(this.img, 40, 30);
      } else if (this.lives === 1) {
        this.ctx.drawImage(this.img, 10, 30);
      }
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
    ctx.fillStyle = "white";
    ctx.fillText(`Score: ${this.score}`, 60, 20);
  }

  screenScore() {
    this.ctx.fillStyle = "black"
    ctx.fillRect(305, 175, 590, 140);
    ctx.fillStyle = "#ffd300";
    ctx.font = "40px Helvetica";
    ctx.textAlign = "center";
    ctx.fillText("Your Score: " + this.score, canvas.width / 2, canvas.height / 2 + 30);

    if (this.screenScore() === true) {
      this.drawScore() === false
    } 
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
