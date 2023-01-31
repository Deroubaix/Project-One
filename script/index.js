/** @type {HTMLCanvasElement} */

const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

const startButton = document.getElementById("start-button");
const targetDiv = document.getElementById("game-intro")
const targetCanvas = document.getElementById("game-board")

const targetRestart = document.getElementById("restart")
const restartButton = document.getElementById("restart-button")

const player = new Component(250, 600, 75, 75, "Image", ctx);

targetRestart.classList.add("hidden")

const game = new Game(ctx, 1200, 350, player);
startButton.onclick = function () {
  
  document.getElementById("game-intro").classList.add("hidden")
document.getElementById("canvas").classList.remove("hidden")

  game.start(); 
/*   if (targetDiv.style.display !== "none") {
  if (targetDiv.style.display !== "none" && targetCanvas.style.display !== "none") {
    targetDiv.style.display = "none"
    targetCanvas.style.display = "block"
  } else {
    targetDiv.style.display = "block"
    targetDiv.style.display = "block" 
    targetCanvas.style.display = "none"
  }
 }; */
};

restartButton.onclick = function() {
  const game = new Game(ctx, 1200, 350, player);
   if (targetRestart.style.display !== "none") {
       targetRestart.style.display = "none"
       game.start()
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
