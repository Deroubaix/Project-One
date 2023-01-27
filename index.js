/** @type {HTMLCanvasElement} */

const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 700;


let player = new Component(250, 350, 50, 90, ctx)

document.addEventListener("keydown", (e)=> {
switch(e.code){
 case "ArrowLeft":
 player.speedX -=3
 break;
 case "ArrowRight":
 player.speedX +=3
 break;
 case "ArrowUp":
 player.speedY -=3
 break;
 case "ArrowDown":
 player.speedY +=3
}
})

document.addEventListener("keyup", () => {
player.speedX = 0;
player.speedY = 0;
})

window.onload = () => {
const game = new Game(ctx, canvas.width, canvas.height, player);
document.getElementById('start-button').onclick = () => {
startGame();
game.start();
};

function startGame() {}
};