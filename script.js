//!instantiate multiple rabbits that draw at separate coordinates, that move independently, and have certain collision mechanics

(function() {
    var requestAnimationFrame = window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame;

  window.requestAnimationFrame = requestAnimationFrame;
})();


let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")

let cWidth = 500
let cHeight = 500

canvas.width = cWidth;
canvas.height = cHeight;


class BunnyFactory{
  constructor(){ 
  }
  createBunny(){
    return new Bunny(cWidth/2, cHeight/2, 20, 20)
  }
}

class Bunny{
  constructor(x, y, height, width){
    this.x=x;
    this.y=y;
    this.height=height;
    this.width=width;
    this.speed=3; 
    this.velX=0;
    this.velY=0;
  }

  
}

const bob=new Bunny(cWidth/2, cHeight/2, 20, 20)

function getDirection(max) {
	return Math.floor(Math.random() * max);
}

//draws rectangle
function drawBunny(color){
  ctx.fillStyle = "red";
  ctx.fillRect(bob.x, bob.y, bob.width, bob.height);
}

function moveBunny(){
  let direction = getDirection(4);

	if (direction === 0) {
	    bob.x+=bob.width
	} else if (direction === 1) {
	    bob.y+=bob.height
	} else if (direction === 2) {
	    bob.x+=-bob.width
	} else if (direction === 3) {
	    bob.y+=-bob.height
	}
}

function update() {

  bob.x += bob.velX;
  bob.y += bob.velY;

  //collision detection for left/right side
  if (bob.x >= cWidth - bob.width) {
    bob.x = cWidth - bob.width;
  } else if (bob.x <= 0) {
    bob.x = 0;
  }

  //todo: collision detection for top/bottom

  ctx.clearRect(0, 0, cWidth, cHeight);
  drawBunny();
  moveBunny();
  requestAnimationFrame(update);
}

// document.body.addEventListener("keydown", function(e) {
//   keys[e.keyCode] = true;
// });

// document.body.addEventListener("keyup", function(e) {
//   keys[e.keyCode] = false;
// });

window.addEventListener("load", function() {
  update();
});