/** @type {HTMLCanvasElement} */

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const startButton = document.getElementById("start-button");
const targetDiv = document.getElementById("game-intro");
const targetCanvas = document.getElementById("game-board");
const targetRestart = document.getElementById("restart");
const restartButton = document.getElementById("restart-button");
const quitButton = document.getElementById("quit-button");
const restartButtonVictory = document.getElementById("restart-button-victory");
const quitButtonVictory = document.getElementById("quit-button-victory");
const victoryScreen = document.getElementById("victory");

let player = new Player(0, 0, 100, 100, ctx);
targetRestart.classList.add("hidden");

let game = new Game(ctx, 1200, 500, player);

startButton.onclick = function () {
  player = new Player(0, 0, 100, 100, ctx);
  game = new Game(ctx, canvas.width, canvas.height, player);
  document.getElementById("game-intro").classList.add("hidden");
  document.getElementById("canvas").classList.remove("hidden");
  const gameOverScreen = document.getElementById("restart");
  const victoryScreen = document.getElementById("victory");
  gameOverScreen.classList.add("hidden");
  victoryScreen.classList.add("hidden");

  game.start();
};

restartButton.onclick = function () {
  if (game && game.stop) {
    game.stop();
  }
  player = new Player(0, 0, 100, 100, ctx);
  game = new Game(ctx, canvas.width, canvas.height, player);
  targetRestart.classList.add("hidden");
  const victoryScreen = document.getElementById("victory");
  victoryScreen.classList.add("hidden");

  game.start();
};

quitButton.onclick = function () {
  document.getElementById("game-intro").classList.remove("hidden");
  document.getElementById("canvas").classList.add("hidden");
  targetRestart.classList.add("hidden");
};

restartButtonVictory.onclick = function () {
  victoryScreen.classList.add("hidden");
  if (game && game.stop) {
    game.stop();
  }
  player = new Player(0, 0, 100, 100, ctx);
  game = new Game(ctx, canvas.width, canvas.height, player);
  game.start();
};

quitButtonVictory.onclick = function () {
  victoryScreen.classList.add("hidden");
  const gameOverScreen = document.getElementById("restart");
  if (!gameOverScreen.classList.contains("hidden")) {
    gameOverScreen.classList.add("hidden");
  }
  document.getElementById("game-intro").classList.remove("hidden");
  document.getElementById("canvas").classList.add("hidden");
};

document.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "ArrowUp":
      player.jump();
      break;
    case "ArrowLeft":
      player.speedX -= 2;
      break;
    case "ArrowRight":
      player.speedX += 2;
      break;
    case "Space":
      if (game && game.bossBattleStarted) {
        game.player.shoot();
      }
      break;
  }
});

document.addEventListener("keyup", (e) => {
  switch (e.code) {
    case "ArrowUp":
      player.jumpTimer = 0;
      break;
  }
  player.speedX = 0;
});
