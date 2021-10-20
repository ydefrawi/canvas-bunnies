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
const bunniesArray = [];

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

  moveBunny(){
    //collision detection for left/right wall
    if (this.x >= cWidth - this.width) {
      this.x = cWidth - this.width;
    } else if (this.x <= 0) {
      this.x = 0;
    }

    this.x += this.velX;
    this.y += this.velY;

    //random movement
    let direction = getDirection(4);

    if (direction === 0) {
        this.x+=this.width
    } else if (direction === 1) {
        this.y+=this.height
    } else if (direction === 2) {
        this.x+=-this.width
    } else if (direction === 3) {
        this.y+=-this.height
    }
  }

    //draws bunny
    drawBunny(color){
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
}
}

// const bob=new Bunny(cWidth/2, cHeight/2, 20, 20)

function getDirection(max) {
	return Math.floor(Math.random() * max);
}


function update() {

  //collision detection for left/right side


  //todo: collision detection for top/bottom

  ctx.clearRect(0, 0, cWidth, cHeight);

  bunniesArray.forEach((bunny) => {
    bunny.drawBunny();
    bunny.moveBunny();
    
  });
  // drawBunny();
  // moveBunny();
  requestAnimationFrame(update);
}

// document.body.addEventListener("keydown", function(e) {
//   keys[e.keyCode] = true;
// });

// document.body.addEventListener("keyup", function(e) {
//   keys[e.keyCode] = false;
// });

window.addEventListener("load", function() {
  for (let index = 0; index <= 4; index++) {
    bunniesArray[index]=new Bunny(cWidth/2, cHeight/2, 20, 20)
  }
  update();
});