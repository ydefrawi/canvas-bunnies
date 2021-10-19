//!instantiate multiple rabbits that draw at separate coordinates, that move independently, and have certain collision mechanics

(function() {
    var requestAnimationFrame = window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame;

  window.requestAnimationFrame = requestAnimationFrame;
})();


let canvas = document.getElementById("bunnies")
let ctx = canvas.getContext("2d")

let cWidth = 500
let cHeight = 500

canvas.width = cWidth;
canvas.height = cHeight;


class BunnyFactory{
  constructor(){ 
  }
  createMale(){
    return new Bunny(randomInt(), randomInt(),  10, 10)
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
    this.velY=0
    this.jumping=false;
  }
}

const bob=new Bunny(cWidth/2, cHeight/2, 20, 20)

// player = {
//     x: cWidth / 2,
//     y: cHeight - 5,
//     width: 5,
//     height: 5,
//     speed: 3,
//     velX: 0,
//     velY: 0,
//     jumping: false
//   }

// let keys = []
// let friction = 0.8
// let gravity = 0.2;



function update() {
  // // check keys
  // if (keys[38] || keys[32]) {
  //   // up arrow or space
  //   if (!player.jumping) {
  //     player.jumping = true;
  //     player.velY = -player.speed * 2;
  //   }
  // }

  // if (keys[39]) { // right arrow
  //   if (player.velX < player.speed) {
  //     player.velX++;
  //   }
  // }
  // if (keys[37]) {
  //   // left arrow
  //   if (player.velX > -player.speed) {
  //     player.velX--;
  //   }
  // }

  // player.velX *= friction;

  // player.velY += gravity;

  bob.x += bob.velX;
  bob.y += bob.velY;

  //collision detection for left/right side
  if (bob.x >= cWidth - bob.width) {
    bob.x = cWidth - bob.width;
  } else if (bob.x <= 0) {
    bob.x = 0;
  }
  
//jumping
  if (bob.y >= cHeight - bob.height) {
    bob.y = cHeight - bob.height;
    bob.jumping = false;
  }

//draws rectangle
  ctx.clearRect(0, 0, cWidth, cHeight);
  ctx.fillStyle = "red";
  ctx.fillRect(bob.x, bob.y, bob.width, bob.height);

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