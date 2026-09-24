// Project Title   Interactive Project
// Your Name(s)    Policron Willard Aggabao
// Date            September 21st

// Variables Delcared
let maxBossHealth = 500
let bossHealth = 300

let pX = 300
let pY = 450
let pW = 50
let pH = 50
let maxPlayerHealth = 100
let playerHealth = 70

let bX = 300
let bY = 450
let bW = 500
let bH = 500

let ammo = 6
let bulletX
let bulletY
let fired = false
let fireCooldown = 60

let bulletImg
let bossImgs = []
let playerImgs = []

let timeCheck = 0

let bulletPos
let bulletVel
let oldPlayerPos
let oldMousePos

function setup() {
  createCanvas(600, 800);
  background(0);
  ellipseMode(CENTER);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  textFont("bazooka");
  textSize(20)
  imageMode(CENTER)
  frameRate(60);
  // load imgs
  bulletImg = loadImage("bullet.png")

  // vectors 
  bulletPos = createVector(pX, pY)  // cordinate relative to origin
  bulletVel = createVector(0, 0)
  oldPlayerPos = createVector(pX, pY)
  oldMousePos = createVector(mouseX, mouseY)
}

function draw() {
  background(0);

  bulletVel = oldMousePos.sub(oldPlayerPos)  // direction the bullet will move
  bulletVel.setMag(5)   // fixed speed bullet trravel
  console.log(bulletVel.x)
  text(bulletVel, 300, 500)  // delete this later

  oldPlayerPos = createVector(pX, pY)
  oldMousePos = createVector(mouseX, mouseY) // delete this later

  noFill()
  stroke(255)
  strokeWeight(10)
  rect(bX, bY, bW, bH)  // player box
  fill(255)
  strokeWeight(0)

  drawBoss(300, 150)
  bossBar(300, 50, "placeHolder", maxBossHealth, bossHealth)  // call boss bar

  player(pX, pY, pW, pH)
  playerHealthBar(400, 750, maxPlayerHealth, playerHealth)   // call player hp bar

  let bulletIndex = 0
  while (bulletIndex < ammo) {  // ammo display
    drawBullet((bulletIndex + 1) * 30 + 25, 750)
    bulletIndex += 1
  }

  if (bulletPos.x - 10 > width || bulletPos.x + 10 < 0 || bulletPos.y - 40 > height || bulletPos.y + 40 < 0) {
    fired = false
  }

  if (fired == true) {
    drawBullet(bulletPos.x, bulletPos.y)  // moves fired bullet
    moveBullet()
  }

  if(keyIsDown(82) && ammo == 0) {
    ammo = 6
  }
}

function drawBoss(x, y) {
  fill('red')
  rect(x, y, 50, 50)
  fill(255)
}

function bossBar(x, y, name, maxHP, hp) {
  fill(50, 0, 0)
  rect(x, y, maxHP, 20)
  fill("red")
  rectMode(CORNER)
  rect(x - maxHP / 2, y - 10, hp, 20);
  rectMode(CENTER)
  textSize(32)
  text(name, x, y - 30);
  textSize(20)
  fill(255)
  text(hp, x - 20, y + 25)
  text("/", x, y + 25)
  text(maxHP, x + 20, y + 25)
}

function player(x, y, w, h) {
  fill(0, 255, 255)
  rect(x, y, w, h)  // draw player
  fill(255)

  // player movement
  if (keyIsDown(65) == true) {  // A movement
    pX -= 10
  }
  if (keyIsDown(68) == true) {  // D movement
    pX += 10
  }
  if (keyIsDown(87) == true) {  // W movement
    pY -= 10
  }
  if (keyIsDown(83) == true) {  // S movement
    pY += 10
  }
  // restriction
  if (pX + pW / 2 >= bX + bW / 2) {  // right wall
    pX = bX + bW / 2 - pW / 2
  }
  if (pX - pW / 2 <= bX - bW / 2) {  // left wall
    pX = bX - bW / 2 + pW / 2
  }
  if (pY + pH / 2 >= bY + bH / 2) {  // bottom wall
    pY = bY + bH / 2 - pH / 2
  }
  if (pY - pH / 2 <= bY - bH / 2) {  // top wall
    pY = bY - bH / 2 + pH / 2
  }
}

function playerHealthBar(x, y, maxhp, hp) {
  fill('red')
  rect(x, y, maxhp, 50)
  fill("green")
  rectMode(CORNER)
  rect(x - maxhp / 2, y - 25, hp, 50)
  rectMode(CENTER)
  fill(255)
  text(hp, x - 20, y + 40)
  text("/", x, y + 40)
  text(maxhp, x + 20, y + 40)

}

function drawBullet(x, y) {
  fill('yellow')
  image(bulletImg, x, y, 20, 80)
  fill(255)
}

function moveBullet() {
  bulletPos = bulletPos.add(bulletVel)
}

function mousePressed() {
  if (ammo > 0 && fired == false) {
    ammo -= 1
    oldPlayerPos.set(pX, pY)
    oldMousePos.set(mouseX, mouseY)
    bulletPos.set(pX, pY)
    fired = true
  }
}