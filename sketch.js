// Project Title   Interactive Project
// Your Name(s)    Policron Willard Aggabao
// Date            September 21st
// I bit off more that I could chew for this one

// Variables Delcared
let bossX = 300
let bossY = 150
let bossW = 50
let bossH = 50
let maxBossHealth = 500
let bossHealth = 10
let bossHit = false
let attackNumber = 1
let attacked = true
let projectileRow1 = 200
let projectileRow1Hit = false
let projectileRow2 = 700
let projectileRow2Hit = false

let pX = 300
let pY = 450
let pW = 50
let pH = 50
let maxPlayerHealth = 100
let playerHealth = 100

let bX = 300
let bY = 450
let bW = 500
let bH = 500

let ammo = 6
let bulletX
let bulletY
let fired = false

let timeCheck = 0
let timeChecked = false

let bulletPos
let bulletVel
let oldPlayerPos
let oldMousePos

let win = false
let lose = false

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

  // vectors 
  bulletPos = createVector(pX, pY)  // cordinate relative to origin
  bulletVel = createVector(0, 0)
  oldPlayerPos = createVector(pX, pY)
  oldMousePos = createVector(mouseX, mouseY)
}

function draw() {
  background(0);

  bulletVel = p5.Vector.sub(oldMousePos, oldPlayerPos)
  bulletVel.setMag(20)   // fixed speed bullet trravel
  if (win == false && lose == false) {
    noFill()
    stroke(255)
    strokeWeight(10)
    rect(bX, bY, bW, bH)  // player box
    fill(255)
    strokeWeight(0)

    drawBoss(bossX, bossY, bossW, bossH)
    bossBar(300, 50, "placeHolder", maxBossHealth, bossHealth)  // call boss bar

    if (attacked == false) {
      attack(5)  // boss attack
    }

    if (attacked == true) {
      if (timeChecked == false) {
        timeCheck = frameCount
        timeChecked = !timeChecked
      }
      if (frameCount >= timeCheck + 60) {
        timeChecked = false
        attackNumber = random([1, 2, 3, 4, 5])
        projectileRow1 = 200
        projectileRow1Hit = false
        projectileRow2 = 700
        projectileRow2Hit = false
        attacked = !attacked
      }
    }

    player(pX, pY, pW, pH)
    playerHealthBar(400, 750, maxPlayerHealth, playerHealth)   // call player hp bar

    let bulletIndex = 0
    while (bulletIndex < ammo) {  // ammo display
      drawBullet((bulletIndex + 1) * 30 + 25, 750)
      bulletIndex += 1
    }

    if (bulletPos.x - 10 > width || bulletPos.x + 10 < 0 || bulletPos.y - 40 > height || bulletPos.y + 40 < 0) {
      fired = false  // delete bullet when off screen
      bossHit = false
    }

    if (fired == true) {
      drawBullet(bulletPos.x, bulletPos.y)  // moves fired bullet
      moveBullet()
    }

    if (bulletPos.x + 10 > bossX - bossW / 2 && bulletPos.x - 10 < bossX + bossW / 2 && bulletPos.y - 40 < bossY + bossH / 2 && bulletPos.y + 40 > bossY - bossH / 2 && bossHit == false) {
      bossHealth -= 10
      bossHit = !bossHit  // boss hit box
    }

    if (keyIsDown(32) && ammo == 0) {  // reload
      ammo = 6
    }
  }

  if (win == true) {  // win screen
    background(0)
    textSize(40)
    text("YOU WIN", 300, 400)
    textSize(20)
    text('press "r" to restart', 300, 450)
    if (keyIsDown(82)) {
      bossHealth = 500
      bossHit = false
      playerHealth = 100
      pX = bX
      pY = bY
      ammo = 6
      fired = false
      bulletPos.set(pX, pY)
      attacked == true
      projectileRow1 = 200
      projectileRow1Hit = false
      projectileRow2 = 700
      projectileRow2Hit = false
      timeChecked = false
      win = false
    }
  }

  if (lose == true) {  // lose screen
    background(0)
    textSize(40)
    text("YOU LOSE", 300, 400)
    textSize(20)
    text('press "r" to restart', 300, 450)
    if (keyIsDown(82)) {
      bossHealth = 500
      bossHit = false
      playerHealth = 100
      pX = bX
      pY = bY
      ammo = 6
      fired = false
      bulletPos.set(pX, pY)
      attacked == true
      projectileRow1 = 200
      projectileRow1Hit = false
      projectileRow2 = 700
      projectileRow2Hit = false
      timeChecked = false
      lose = false
    }
  }

  if (bossHealth <= 0) {  // win con
    win = true
  }

  if (playerHealth <= 0) {  // lose con
    lose = true
  }
}

function drawBoss(x, y, w, h) {
  fill('red')
  rect(x, y, w, h)
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

function attack(number) {
  noFill()
  stroke("red")
  strokeWeight(10)
  textSize(90)
  if (number == 1) {  // left hit
    if (timeChecked == false) {
      timeCheck = frameCount
      timeChecked = !timeChecked
    }
    if (frameCount >= timeCheck + 60) {
      fill("red")
      if (pX - pW / 2 < bX) {// hit box
        playerHealth -= 10
        timeChecked = false
        attacked = !attacked
      } else {
        timeChecked = false
        attacked = !attacked
      }
    }
    rect(bX - bW / 4, bY, bW / 2, bH)
    text("!", bX - bW / 4, bY)
  }

  if (number == 2) {  // right hit
    if (timeChecked == false) {
      timeCheck = frameCount
      timeChecked = !timeChecked
    }
    if (frameCount >= timeCheck + 60) {
      fill("red")
      if (pX + pW / 2 > bX) { // hit box
        playerHealth -= 10
        timeChecked = false
        attacked = !attacked
      } else {
        timeChecked = false
        attacked = !attacked
      }
    }
    rect(bX + bW / 4, bY, bW / 2, bH)
    text("!", bX + bW / 4, bY)
  }

  if (number == 3) {  // top hit
    if (timeChecked == false) {
      timeCheck = frameCount
      timeChecked = !timeChecked
    }
    if (frameCount >= timeCheck + 60) {
      fill("red")
      if (pY - pH / 2 < bY) { // hit box
        playerHealth -= 10
        timeChecked = false
        attacked = !attacked
      } else {
        timeChecked = false
        attacked = !attacked
      }
    }
    rect(bX, bY - bH / 4, bW, bH / 2)
    text("!", bX, bY - bH / 4)
  }

  if (number == 4) {  // bottom hit
    if (timeChecked == false) {
      timeCheck = frameCount
      timeChecked = !timeChecked
    }
    if (frameCount >= timeCheck + 60) {
      fill("red")
      if (pY + pH / 2 > bY) { // hit box
        playerHealth -= 10
        timeChecked = false
        attacked = !attacked
      } else {
        timeChecked = false
        attacked = !attacked
      }
    }
    rect(bX, bY + bH / 4, bW, bH / 2)
    text("!", bX, bY + bH / 4)
  }
  textSize(20)
  strokeWeight(0)
  stroke(255)
  fill(255)

  if (number == 5) {
    fill("blue")
    if (projectileRow1 < 700 && projectileRow2 > 200) {
      let projectileIndex1 = 1
      while (projectileIndex1 <= 3) {
        rect((bX - bW / 2) + ((projectileIndex1 - 1) * 250), projectileRow1, 100, 15)
        if (pX - pW / 2 < (bX - bW / 2) + ((projectileIndex1 - 1) * 250) + 50 && pX + pW / 2 > (bX - bW / 2) + ((projectileIndex1 - 1) * 250) - 50 && pY - pH / 2 < projectileRow1 + 7.5 && pY + pH / 2 > projectileRow1 - 7.5 && projectileRow1Hit == false) {
          projectileRow1Hit = !projectileRow1Hit
          playerHealth -= 10
        }
        projectileRow1 += 2
        projectileIndex1 += 1
      }
      let projectileIndex2 = 1
      while (projectileIndex2 <= 2) {
        rect((bX - bW / 2) + ((projectileIndex2 - 1) * 250) + 125, projectileRow2, 100, 15)
        if (pX - pW / 2 < (bX - bW / 2) + ((projectileIndex2 - 1) * 250) + 175 && pX + pW / 2 > (bX - bW / 2) + ((projectileIndex2 - 1) * 250) + 75 && pY - pH / 2 < projectileRow2 + 7.5 && pY + pH / 2 > projectileRow2 - 7.5 && projectileRow2Hit == false) {
          projectileRow2Hit = !projectileRow2Hit
          playerHealth -= 10
        }
        projectileRow2 -= 3
        projectileIndex2 += 1
      }
    }
    if (projectileRow1 >= 700 && projectileRow2 <= 200) {
      attacked = true
    }
    fill(255)
  }
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
  fill("yellow")
  rect(x, y, 20, 80)
  fill(255)
}
function moveBullet() {
  bulletPos = bulletPos.add(bulletVel)  // moves bullet by adding bullets vel to bullet pos
}

function mousePressed() {
  if (ammo > 0 && fired == false) {  // sets things up to fire the bullet
    ammo -= 1
    oldPlayerPos.set(pX, pY)
    oldMousePos.set(mouseX, mouseY)
    bulletPos.set(pX, pY)
    fired = true
  }
}

function keyPressed() {  // logs keyCode
  console.log(keyCode)
}