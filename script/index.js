/** @type {HTMLCanvasElement} */

const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

const startButton = document.getElementById("start-button");
const targetDiv = document.getElementById("game-intro")
const targetCanvas = document.getElementById("game-board")

const targetRestart = document.getElementById("restart")
const restartButton = document.getElementById("restart-button")
const quitButton = document.getElementById("quit-button")
let player = new Component(0, 0, 75, 75, "Image", ctx);

targetRestart.classList.add("hidden")

let game = new Game(ctx, 1200, 450, player);

startButton.onclick = function () {
  game = new Game(ctx, 1200, 350, player);
  document.getElementById("game-intro").classList.add("hidden")
  document.getElementById("canvas").classList.remove("hidden")

  game.start(); 

};

restartButton.onclick = function() {
   player = new Component(0, 0, 75, 75, "Image", ctx);
   game = new Game(ctx, 1200, 450, player);
     if (targetRestart.style.display !== "none") {
       targetRestart.style.display = "none"
      } 
        game.start()  
}

quitButton.onclick = function() {
  document.getElementById("game-intro").classList.remove("hidden")
  document.getElementById("canvas").classList.add("hidden")
  if (targetRestart.style.display !== "none") {
    targetRestart.style.display = "none"
  } 

}

document.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "ArrowUp":
      player.jump();
      break;
    /* case "ArrowDown":
      player.speedY += 2
      break; */
    case "ArrowLeft":
      player.speedX -= 2
      break;
    case "ArrowRight":
      player.speedX += 2
      break;
  }
});

document.addEventListener("keyup", (e) => {
  switch (e.code) {
    case "ArrowUp":
      player.jumpTimer = 0;
      break;
    /* case "ArrowDown":
      player.speedY = 0;
      break; */
  }
  player.speedX = 0;
});
