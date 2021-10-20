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
const colors=["blue","teal","red","orange","purple","green","yellow"];

//Bunny constructor
class Bunny{
  constructor(x, y, height, width, color, name, gender){
    this.x=x;
    this.y=y;
    this.height=height;
    this.width=width;
    this.speed=3; 
    this.velX=0;
    this.velY=0;
    this.color=color;
    this.name=name;
    this.gender=gender;
  }

  //moves bunnies
  moveBunny(){
    //random movement
    let direction = getDirection(4);
    if (direction === 0) {
        //right
        this.velX=this.speed;
    } else if (direction === 1) {
      //up
        this.velY=this.speed;
    } else if (direction === 2) {
      //left
        this.velX=-this.speed;
      } else if (direction === 3) { 
      //down
        this.velY=-this.speed; 
    }

    //? being used?
    this.x += this.velX;
    this.y += this.velY;

    //collision detection for left/right wall
    if (this.x >= cWidth - this.width) {
      this.x = cWidth - this.width;
      this.velX--;
    } else if (this.x <= 0) {
      this.x = 0;
      this.velX++
    }

    //collision detection for top/bottom
    if (this.y >= cHeight - this.height) {
      this.y = cHeight - this.height;
      this.velY--
    } else if (this.y <= 0) {
      this.y = 0;
      this.velY++
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
      //filter bunny out of bunnies Array
    }

    fight(){
      //logic: if two males or two females meet, one dies
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

//randomly chooses color from colors array 
function colorPicker(){
  return colors[Math.floor(Math.random()*colors.length)]
}
//generates an int (coordinate) between 0 and 500
function locationPicker(){
  return  Math.floor(Math.random() * 500)
}
//randomly selects a name from rabbitNames
function namePicker(){
  return rabbitNames[Math.floor(Math.random()*rabbitNames.length)]
}

//starts simulation when Start button is clicked
document.getElementById("start-btn").addEventListener("click",function() {
  console.log(Math.floor(Math.random()*colors.length))
  for (let index = 0; index <= 4; index++) {
    bunniesArray[index]=new Bunny(locationPicker(), locationPicker(), 20, 20, colorPicker(), namePicker())
    console.log(bunniesArray[index])
  }
  update();
}); 


// window.addEventListener("load", function() {
//   console.log(Math.floor(Math.random()*colors.length))
//   for (let index = 0; index <= 4; index++) {
//     bunniesArray[index]=new Bunny(locationPicker(), locationPicker(), 20, 20, colorPicker(), namePicker())
//     console.log(bunniesArray[index])
//   }
//   update();
// });