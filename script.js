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
const colors=["blue","teal","red","orange","purple","pink"];

// class BunnyFactory{
//   constructor(){ 
//   }
//   createBunny(){
//     return new Bunny(cWidth/2, cHeight/2, 20, 20)
//   }
// }

class Bunny{
  constructor(x, y, height, width, color, name){
    this.x=x;
    this.y=y;
    this.height=height;
    this.width=width;
    this.speed=3; 
    this.velX=0;
    this.velY=0;
    this.color=color;
    this.name=name;

  }

  moveBunny(){
    //collision detection for left/right wall
    if (this.x >= cWidth - this.width) {
      this.x = cWidth - this.width;
    } else if (this.x <= 0) {
      this.x = 0;
    }

    if (this.y >= cHeight - this.height) {
      this.y = cHeight - this.height;
    } else if (this.y <= 0) {
      this.y = 0;
    }

    //todo: collision detection for top/bottom

    //? not being used
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
    drawBunny(){
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
}
    //mingle
    mingle(){
      //logic: two bunnies interact when they collide
    }

    die(){
      //filter bunny out of bunniesArray
    }

    fight(){
      //
    }
}


function getDirection(max) {
	return Math.floor(Math.random() * max);
}


function update() {

  ctx.clearRect(0, 0, cWidth, cHeight);
  bunniesArray.forEach((bunny) => {
    bunny.drawBunny();
    bunny.moveBunny();
  });

  //todo if two bunnies collide, call appropriate function

  requestAnimationFrame(update);
}

// document.body.addEventListener("keydown", function(e) {
//   keys[e.keyCode] = true;
// });

// document.body.addEventListener("keyup", function(e) {
//   keys[e.keyCode] = false;
// });

window.addEventListener("load", function() {
  console.log(Math.floor(Math.random()*colors.length))
  for (let index = 0; index <= 4; index++) {
    bunniesArray[index]=new Bunny(cWidth/2, cHeight/2, 20, 20, colors[Math.floor(Math.random()*colors.length)], rabbitNames[Math.floor(Math.random()*rabbitNames.length)])
    console.log(bunniesArray[index])
  }
  update();
});