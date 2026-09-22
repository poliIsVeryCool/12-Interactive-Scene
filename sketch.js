// Project Title   Interactive Project
// Your Name(s)    Policron Willard Aggabao
// Date            September 21st

// Variable Delcare
let bhp = 500

let pX = 300
let pY = 450
let pW = 50
let pH = 80

let bX = 300
let bY = 450
let bW = 500
let bH = 500

function setup() {
  createCanvas(600, 800);
  background(0);
  ellipseMode(CENTER);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  textFont("bazooka");
  frameRate(60);
}

function draw() {
  background(0);
  noFill()
  stroke(255)
  strokeWeight(10)
  rect(bX, bY, bW, bH,3)
  fill(255)
  strokeWeight(0)
  drawBoss()
  bossHealth(bhp)
  bossName("Your Mom")
  drawPlayer(pX, pY, pW, pH)
  movePlayer()
}

function drawBoss() {
  rect(300, 100, 50, 50)
}

function bossHealth(hp) {
  fill('red');
  rect(300, 15, hp, 20);
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

function drawPlayer(x, y, w, h) {
  rect(x, y, w, h)
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
  if(pX + pW / 2 >= bX + bW / 2) {  // restrictions   // right wall
    pX = bX + bW / 2 - pW / 2
  }
  if(pX - pW / 2 <= bX - bW / 2) {  // left wall
    pX = bX - bW / 2 + pW / 2
  }
  if(pY + pH / 2 >= bY + bH / 2) {  // bottom wall
    pY = bY + bH / 2 - pH / 2
  }
  if(pY - pH / 2 <= bY - bH / 2) {  // top wall
    pY = bY - bH / 2 + pH / 2
  }
}
