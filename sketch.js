// Project Title   Interactive Project
// Your Name(s)    Policron Willard Aggabao
// Date            September 21st

// Variable Delcare
let bhp = 500
let pX = 300
let pY = 750


function setup() {
  //This function get run once at the start of the program
  createCanvas(600, 800);
  background(0);
  // ellipseMode(CORNER);
  ellipseMode(CENTER);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  textFont("bazooka");
  frameRate(60);
}

function draw() {
  background(0);
  drawBoss()
  bossHealth(bhp)
  bossName("Your Mom")
  drawPlayer(pX, pY)
  movePlayer()
}

function drawBoss() {
  rect(300, 100, 50, 50)
}

function bossHealth(hp) {
  fill('red');
  rect(300, 15, hp, 20, 10);
  fill(255)
  stroke(0)
}

function bossName(name) {
  fill("red");
  textSize(32)
  text(name, 300, 50);
  textSize(14)
  fill(255)
}

function drawPlayer(x, y) {
  rect(x, y, 50, 80)
}

function movePlayer() {  // player movement
  if(keyIsDown(65) == true) {  // A
    pX -= 10
  }
  if(keyIsDown(68) == true) {  // D
    pX += 10
  }
  if(keyIsDown(87) == true) {  // W
    pY -= 10
  }
  if(keyIsDown(83) == true) {  // S
    pY += 10
  }
  //restrictions
}
