/** @type {HTMLCanvasElement} */

class Game{
    constructor(ctx, width, height, player){
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.player = player;
        this.intervalId = null;
        this.frames = 0;
        this.obstacles = [];
  }

  start(){
        this.intervalId = setInterval(this.update, 1000/60);
  }

  update = () => {
        this.frames++
        this.clear();
        this.player.newPos();
        this.player.draw();
        this.updateObstacles();
        this.checkGameOver();
  }

  stop(){
      clearInterval(this.intervalId);
  }
  
  clear(){
      const background = new Image();
      background.src = "/docs/assets/images/street.png";
      ctx.drawImage(background, 0, 0, 500, 700); 
  }

  updateObstacles(){
      for (let i= 0; i< this.obstacles.length; i++){
          this.obstacles[i].x -= 2;
          this.obstacles[i].draw();
      }
      if(this.frames % 120 === 0){
          let randomSize = Math.floor(Math.random()* 150 - 10) + 10;
          let randomX = Math.floor(Math.random()* this.height -50 - randomSize);

          this.obstacles.push(new Obstacle (this.height, randomX,randomSize, randomSize, this.ctx))
      }
  }
  checkGameOver(){
      const crashed = this.obstacles.some((obstacle)=>{
          this.player.crashWith(obstacle)
      })
      if(crashed){
          this.stop();
      }
  }
}