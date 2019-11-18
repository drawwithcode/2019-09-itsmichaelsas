var spaceship;
var meteora;
var meteore = [];
var amountOfMeteores = 200;
var counter = 0;
let timer = 14;

function preload(){
  spaceship = loadImage('spaceship.png');
  meteora = loadImage('meteora.png');
  angleMode(DEGREES);
}

function setup() {
  createCanvas(windowWidth,windowHeight);

    for(var i = 0; i < amountOfMeteores; i++) {
      var movingRocks = new MeteorFlow();
      meteore.push(movingRocks);
    }
}

function draw() {
  background(20, 60, 100);

  image(spaceship, map(rotationY, -180, 180, 0, width), map(rotationX, -180, 180, 0, height), 70, 70);

  push();
    for (var i = 0; i < meteore.length; i++) {
      var j = meteore[i];
      j.move();
      j.display();
    }
  pop();

  push();
    textFont('Orbitron');
    textSize(10);
    fill(255);
    textStyle('black 900');
    text(counter + 'touches', 10, 15);
    text('Move the device to move the spaceship', 10, 25);
    text('Touch to remove the meteorites', 10, 35);
    text(timer, 10, 45);
  pop();

  push();
    // set a countdown to end the game
    if (frameCount % 60 === 0  && timer > 0 ) {
      timer --;
    }
    //at countdown ended clear the sketch and show the final score
    if (timer === 0 ) {
      clear();
      background(20, 60, 100);
      textFont('Orbitron');
      textSize(40);
      fill(255);
      textStyle('black 900');
      text('GAME OVER', 30, height/3);
      text('score' + counter, 30, height/2);
      text('reload to play', 30, height/2 + 100);
      noLoop();
    }
    if (timer === 0 && counter === 200) {
      clear();
      background(20, 60, 100);
      textFont('Orbitron');
      textSize(40);
      fill(255);
      textStyle('black 900');
      text('CONGRATS', 30, height/3);
      text('You destroied', 30, height/2);
      text('everything!', 30, height/2 + 100);
      text('reload to play', 30, height/2 + 200);
      noLoop();
    }
  pop();
}

//remove meteorites and update the score
function touchStarted(){
    if (counter < 200){
      meteore.splice(0, 2);
      counter ++ ;
    }

}

//set up the metorites and behaviour
function MeteorFlow() {
  this.x = random(windowWidth);
  this.y = -500*random();
  this.diameter = random(5, 40);
  this.speedY = random(1, 4);

  //meteor changes direction
  if (random(5) > 4) {
    this.speedX = random(-2, 2);
  } else {
    this.speedX = 0;
  }

  this.move = function() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  this.display = function() {
    image(meteora, this.x - (this.diameter) / 2, this.y - (this.diameter) / 2, this.diameter, this.diameter);
  }
}
