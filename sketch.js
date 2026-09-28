// Project Title   Interactive Project
// Your Name(s)    Policron Willard Aggabao
// Date            September 21st
// I think I bit off more that I could chew for this one
// Update: Yes you did

// Variables Delcared
let bossX = 300;
let previousX = 0;
let bossLocation = [100, 200, 300, 400, 500];
let bossMoved = 0;
let selection = 0;
let bossY = 150;
let bossW = 50;
let bossH = 50;
let maxBossHealth = 250;
let bossHealth = maxBossHealth;
let bossHit = false;
let attackNumber = 1;
let attackMode = 1;
let attacked = true;
let projectileRow1 = 200;
let projectileRow1Hit = false;
let projectileRow2 = 700;
let projectileRow2Hit = false;
let projectileRow3 = 50;
let projectileRow3Hit = false;
let projectileRow4 = 550;
let projectileRow4Hit = false;

let pX = 300;
let pY = 450;
let pW = 50;
let pH = 50;
let maxPlayerHealth = 100;
let playerHealth = maxPlayerHealth;

let bX = 300;
let bY = 450;
let bW = 500;
let bH = 500;

let ammo = 6;
let bulletX;
let bulletY;
let fired = false;

let timeCheck = 0;
let timeChecked = false;

let bulletPos;
let bulletVel;
let oldPlayerPos;
let oldMousePos;

let playerPos;
let projectilePos;
let projectileVel;
let projectileAcc;
let projectilePos1;
let projectileVel1;
let projectileAcc1;
let decay = 255;
let decay1 = 255;
let projectileHit = false;
let projectileHit1 = false;

let started = false;
let win = false;
let lose = false;
let difficulty = 0;
let difficultySet = 0;
let button1 = 0;
let button2 = 0;
let button3 = 0;
let button4 = 0;
let button5 = 0;
let button6 = 0;
let button7 = 0;
let delay = 60;

function setup() {  // sets up modes and sets up vectors
  createCanvas(600, 800);
  background(0);
  fill(255);
  ellipseMode(CENTER);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  textFont("bazooka");
  textSize(20);
  imageMode(CENTER);
  frameRate(60);

  // set up vectors
  bulletPos = createVector(pX, pY);
  bulletVel = createVector(0, 0);
  oldPlayerPos = createVector(pX, pY);
  oldMousePos = createVector(mouseX, mouseY);

  projectilePos = createVector(bX - bH / 2, bossY);
  projectileVel = createVector(0, 0);
  projectileAcc = createVector(0, 0);
  projectilePos1 = createVector(bX + bH / 2, bossY);
  projectileVel1 = createVector(0, 0);
  projectileAcc1 = createVector(0, 0);
  playerPos = createVector(pX, pY);
}

function draw() {
  background(0);

  start();  // start screen

  if (started == true && win == false && lose == false) {
    playerBox(); // draws box that restricts player

    projectilePhysics();  // handles projectile calcs

    drawBoss(bossX, bossY, bossW, bossH); // draws boss
    bossBar(300, 50, "placeHolder", maxBossHealth, bossHealth);  // call boss bar

    attackCycle(); // cycles attacks

    player(pX, pY, pW, pH);  // draws player
    playerHealthBar(400, 750, maxPlayerHealth, playerHealth);   // call player hp bar

    bullets();  // controls bullets
  }
  winLose();  // win lose cons
}

function drawBoss(x, y, w, h) {  // draws boss
  fill('red');
  rect(x, y, w, h);
  fill(255);
}

function bossBar(x, y, name, maxHP, hp) { // draws boss bar
  fill(50, 0, 0);
  rect(x, y, maxHP, 20);
  fill("red");
  rectMode(CORNER);
  rect(x - maxHP / 2, y - 10, hp, 20);
  rectMode(CENTER);
  textSize(32);
  text(name, x, y - 30);
  textSize(20);
  fill(255);
  text(hp, x - 30, y + 25);
  text("/", x, y + 25);
  text(maxHP, x + 30, y + 25);
}

function attack(number) {  // holds attack patterns
  noFill();
  stroke("red");
  strokeWeight(10);
  textSize(90);
  if (number == 1) {  // left hit
    if (timeChecked == false) {
      timeCheck = frameCount;
      timeChecked = !timeChecked;
    }
    if (frameCount >= timeCheck + delay + 30) {
      fill("red");
      if (pX - pW / 2 < bX) {// hit box
        playerHealth -= 10;
        timeChecked = false;
        attacked = !attacked;
      } else {
        timeChecked = false;
        attacked = !attacked;
      }
    }
    rect(bX - bW / 4, bY, bW / 2, bH);
    text("!", bX - bW / 4, bY);
  }

  if (number == 2) {  // right hit
    if (timeChecked == false) {
      timeCheck = frameCount;
      timeChecked = !timeChecked;
    }
    if (frameCount >= timeCheck + delay + 30) {
      fill("red");
      if (pX + pW / 2 > bX) { // hit box
        playerHealth -= 10;
        timeChecked = false;
        attacked = !attacked;
      } else {
        timeChecked = false;
        attacked = !attacked;
      }
    }
    rect(bX + bW / 4, bY, bW / 2, bH);
    text("!", bX + bW / 4, bY);
  }

  if (number == 3) {  // top hit
    if (timeChecked == false) {
      timeCheck = frameCount;
      timeChecked = !timeChecked;
    }
    if (frameCount >= timeCheck + delay + 30) {
      fill("red");
      if (pY - pH / 2 < bY) { // hit box
        playerHealth -= 10;
        timeChecked = false;
        attacked = !attacked;
      } else {
        timeChecked = false;
        attacked = !attacked;
      }
    }
    rect(bX, bY - bH / 4, bW, bH / 2);
    text("!", bX, bY - bH / 4);
  }

  if (number == 4) {  // bottom hit
    if (timeChecked == false) {
      timeCheck = frameCount;
      timeChecked = !timeChecked;
    }
    if (frameCount >= timeCheck + delay + 30) {
      fill("red");
      if (pY + pH / 2 > bY) { // hit box
        playerHealth -= 10;
        timeChecked = false;
        attacked = !attacked;
      } else {
        timeChecked = false;
        attacked = !attacked;
      }
    }
    rect(bX, bY + bH / 4, bW, bH / 2);
    text("!", bX, bY + bH / 4);
  }
  textSize(20);
  strokeWeight(0);
  stroke(255);
  fill(255);

  if (number == 5) {
    fill("blue");
    if (projectileRow1 < 700 && projectileRow2 > 200) {
      let projectileIndex1 = 1;
      while (projectileIndex1 <= 3) {  // draws top row
        rect((bX - bW / 2) + (projectileIndex1 - 1) * 250, projectileRow1, 100, 15);
        if (pX - pW / 2 < (bX - bW / 2) + ((projectileIndex1 - 1) * 250) + 50 && pX + pW / 2 > (bX - bW / 2) + ((projectileIndex1 - 1) * 250) - 50 && pY - pH / 2 < projectileRow1 + 7.5 && pY + pH / 2 > projectileRow1 - 7.5 && projectileRow1Hit == false) {
          projectileRow1Hit = !projectileRow1Hit;
          playerHealth -= 10;  // hit box
        }
        projectileRow1 += 2;  // moves row
        projectileIndex1 += 1;
      }
      let projectileIndex2 = 1;
      while (projectileIndex2 <= 2) {  // draws bottom row
        rect((bX - bW / 2) + (projectileIndex2 - 1) * 250 + 125, projectileRow2, 100, 15);
        if (pX - pW / 2 < (bX - bW / 2) + (projectileIndex2 - 1) * 250 + 175 && pX + pW / 2 > (bX - bW / 2) + ((projectileIndex2 - 1) * 250) + 75 && pY - pH / 2 < projectileRow2 + 7.5 && pY + pH / 2 > projectileRow2 - 7.5 && projectileRow2Hit == false) {
          projectileRow2Hit = !projectileRow2Hit;
          playerHealth -= 10;  // hit box
        }
        projectileRow2 -= 3;  // moves row
        projectileIndex2 += 1;
      }
    }
    if (projectileRow1 >= 700 && projectileRow2 <= 200) {
      attacked = true;  // stops attack patter when rows hit opposite sides
    }
    fill(255);
  }

  if (number == 6) {
    fill("blue");
    if (projectileRow3 < 550 && projectileRow4 > 50) {
      let projectileIndex3 = 1;
      while (projectileIndex3 <= 3) { // draws left row
        rect(projectileRow3, (bY - bH / 2) + (projectileIndex3 - 1) * 250, 15, 100);
        if (pX - pW / 2 < projectileRow3 + 7.5 && pX + pH / 2 > projectileRow3 - 7.5 && pY - pH / 2 < (bY - bH / 2) + (projectileIndex3 - 1) * 250 + 50 && pY + pH / 2 > (bY - bH / 2) + (projectileIndex3 - 1) * 250 - 50 && projectileRow3Hit == false) {
          projectileRow3Hit = !projectileRow3Hit;
          playerHealth -= 10;  // hitbox
        }
        projectileRow3 += 2;  // moves row
        projectileIndex3 += 1;
      }
      let projectileIndex4 = 1;
      while (projectileIndex4 <= 2) {  // draws right row
        rect(projectileRow4, (bY - bH / 2) + (projectileIndex4 - 1) * 250 + 125, 15, 100);
        if (pX - pW / 2 < projectileRow4 + 7.5 && pX + pH / 2 > projectileRow4 - 7.5 && pY - pH / 2 < (bY - bH / 2) + (projectileIndex4 - 1) * 250 + 175 && pY + pH / 2 > (bY - bH / 2) + (projectileIndex4 - 1) * 250 + 75 && projectileRow4Hit == false) {
          projectileRow4Hit = !projectileRow4Hit;
          playerHealth -= 10;  // hit box
        }
        projectileRow4 -= 3;   // moves row
        projectileIndex4 += 1;
      }
    }
    if (projectileRow3 >= 550 && projectileRow4 <= 50) {
      attacked = true;
      projectileRow3 = 50;
      projectileRow3Hit = false;  // stops attack pattern when rows hit opposite wall
      projectileRow4 = 550;
      projectileRow4Hit = false;
    }
    fill(255);
  }

  if (number == 7) {
    if (decay > 0 || decay1 > 0) {
      if (timeChecked == false) {
        timeCheck = frameCount;
        timeChecked = !timeChecked;
      }
      if (frameCount >= timeCheck + delay) {// timer before projectiles move
        projectilePos.add(projectileVel);  // moves pink projectile
        projectilePos1.add(projectileVel1);  // moves cyan projectile
        decay -= 1;
        decay1 -= 1;  // changes projectiles opacity before deletion
      }
      fill(255, 0, 255, decay)
      circle(projectilePos.x, projectilePos.y, 50);  // pink projectile
      if (dist(pX, pY, projectilePos.x, projectilePos.y) < 25 + pW / 2 && projectileHit == false) {
        playerHealth -= 10;  // hitbox
        projectileHit = !projectileHit;
        decay = 0;
      }

      fill(0, 255, 255, decay1);
      circle(projectilePos1.x, projectilePos1.y, 50);
      if (dist(pX, pY, projectilePos1.x, projectilePos1.y) < 25 + pW / 2 && projectileHit1 == false) {
        playerHealth -= 10;  // hitbox
        projectileHit1 = !projectileHit1;
        decay1 = 0;
      }
    }
    if (decay <= 50 && decay1 <= 50) {  // stops attack pattern when both projectiles disapear
      timeChecked = false;
      attacked = true;
    }
    fill(255);
  }
}

function attackCycle() {  //  controls cycle of attacks
  if (attacked == false) {
    attack(attackNumber)  // boss attacks
  }

  if (attacked == true) {
    if (timeChecked == false) {  // starts timer before next attack and sets up boss movement
      timeCheck = frameCount;
      timeChecked = !timeChecked;
      previousX = bossX;
      selection = random(bossLocation);
    }
    if (frameCount >= timeCheck + delay) {  // attack selection
      timeChecked = false;
      attackMode = random([1, 2, 3]);
      if (attackMode == 1) {
        attackNumber = random([1, 2, 3, 4]);
      }
      if (attackMode == 2) {
        attackNumber = random([5, 6]);
      }
      if (attackMode == 3) {
        attackNumber = 7;
      }
      attacked = !attacked;
    }
    projectileRow1 = 200;   // reset all attack variables
    projectileRow1Hit = false;
    projectileRow2 = 700;
    projectileRow2Hit = false;
    projectileRow3 = 50;
    projectileRow3Hit = false;
    projectileRow4 = 550;
    projectileRow4Hit = false;
    projectileHit = false;
    projectileHit1 = false;
    decay = 255;
    decay1 = 255;
    projectilePos = createVector(bX - bH / 2, bossY);
    projectilePos1 = createVector(bX + bH / 2, bossY);
    bossX += (selection - previousX) / (delay + 1);  // moves boss position

  }
}

function player(x, y, w, h) { // draws player
  fill(0, 255, 255);
  rect(x, y, w, h);  // draw player
  fill(255);

  // player movement
  if (keyIsDown(65) == true) {  // A movement
    pX -= 10;
  }
  if (keyIsDown(68) == true) {  // D movement
    pX += 10;
  }
  if (keyIsDown(87) == true) {  // W movement
    pY -= 10;
  }
  if (keyIsDown(83) == true) {  // S movement
    pY += 10;
  }
  // restriction
  if (pX + pW / 2 >= bX + bW / 2) {  // right wall
    pX = bX + bW / 2 - pW / 2;
  }
  if (pX - pW / 2 <= bX - bW / 2) {  // left wall
    pX = bX - bW / 2 + pW / 2;
  }
  if (pY + pH / 2 >= bY + bH / 2) {  // bottom wall
    pY = bY + bH / 2 - pH / 2;
  }
  if (pY - pH / 2 <= bY - bH / 2) {  // top wall
    pY = bY - bH / 2 + pH / 2;
  }
}

function playerHealthBar(x, y, maxhp, hp) {  // draws player hp bar
  fill('red');
  rect(x, y, maxhp, 50);
  fill("green");
  rectMode(CORNER);
  rect(x - maxhp / 2, y - 25, hp, 50);
  rectMode(CENTER);
  fill(255);
  text(hp, x - 20, y + 40);
  text("/", x, y + 40);
  text(maxhp, x + 20, y + 40);

}

function playerBox() { // creates box that restricts player movement
  noFill();
  stroke(255);
  strokeWeight(10);
  rect(bX, bY, bW, bH);  // player box
  fill(255);
  strokeWeight(0);
}

function drawBullet(x, y) {  // draws bullet
  fill("yellow");
  rect(x, y, 20, 80);
  fill(255);
}

function bullets() {  // creates moves and displays bullets
  let bulletIndex = 0;
  while (bulletIndex < ammo) {  // ammo display
    drawBullet((bulletIndex + 1) * 30 + 25, 750);
    bulletIndex += 1;
  }

  if (bulletPos.x - 10 > width || bulletPos.x + 10 < 0 || bulletPos.y - 40 > height || bulletPos.y + 40 < 0) {
    fired = false;  // delete bullet when off screen
    bossHit = false;
  }

  if (fired == true) {
    drawBullet(bulletPos.x, bulletPos.y);
    bulletPos = bulletPos.add(bulletVel);  // moves fired bullet
  }

  if (bulletPos.x + 10 > bossX - bossW / 2 && bulletPos.x - 10 < bossX + bossW / 2 && bulletPos.y - 40 < bossY + bossH / 2 && bulletPos.y + 40 > bossY - bossH / 2 && bossHit == false) {
    bossHealth -= 5;
    bossHit = !bossHit;  // boss hit box
  }

  if (keyIsDown(32) && ammo == 0) {  // reload
    ammo = 6;
  }
}

function projectilePhysics() {  // projectile physics calcs
  bulletVel = p5.Vector.sub(oldMousePos, oldPlayerPos);  // calculates bullet velocity
  bulletVel.setMag(20);   // fixed speed bullet trravel

  playerPos.set(pX, pY);
  projectileVel.add(projectileAcc);  // calculates projectile velocity
  projectileVel.limit(12);  // limits projectile velocity
  projectileAcc = p5.Vector.sub(playerPos, projectilePos);  // caluates projectile acceleration toward player
  projectileAcc.setMag(3);  // limits projectile acceleration

  projectileVel1.add(projectileAcc1);  // calculates projectile1 velocity
  projectileVel1.limit(7);  // limits projectile1 velocity
  projectileAcc1 = p5.Vector.sub(playerPos, projectilePos1);  // caluates projectile1 acceleration toward player
  projectileAcc1.setMag(5);  // limits projectile acceleration
}

function start() {  // start screen
  if (timeChecked == false) {
    timeCheck = frameCount
    timeChecked = !timeChecked
  }
  if (started == false && frameCount >= timeCheck + 60) {
    background(0);
    textSize(40);
    text("placeHolder", 300, 200);
    textSize(20);
    text("i was too lazy to make a name", 300, 250);
    text("Difficulty", 300, 350);
    fill(button1);
    rect(300, 400, 200, 50);  // difficulty selector
    fill(button2);
    rect(300, 475, 200, 50);
    fill(button3);
    rect(300, 550, 200, 50);
    noStroke();
    fill(255);
    textSize(30);
    text("Easy", 300, 400);
    text("Hard", 300, 475);
    text("Impossible", 300, 550);
    textSize(20);
    if (mouseX >= 200 && mouseX <= 400 && mouseY <= 425 && mouseY >= 375) {
      button1 = 100
      if (mouseIsPressed == true) {
        difficulty = 0;
        timeChecked = false
        started = !started;
      }
    } else {
      button1 = 0
    }
    if (mouseX >= 200 && mouseX <= 400 && mouseY <= 500 && mouseY >= 450) {
      button2 = 100
      if (mouseIsPressed == true) {
        difficulty = 1;
        timeChecked = false
        started = !started;
      }
    } else {
      button2 = 0
    }
    if (mouseX >= 200 && mouseX <= 475 && mouseY <= 575 && mouseY >= 525) {
      button3 = 100
      if (mouseIsPressed == true) {
        difficulty = 2;
        timeChecked = false
        started = !started;
      }
    } else {
      button3 = 0
    }
    difficultySettings(); // changes things to fit difficulty
  }
}

function winLose() {  // win and lose conditions and screens
  if (bossHealth <= 0) {  // win con
    win = true;
  }
  if (win == true) {  // win screen and restart
    background(0);
    textSize(40);
    text("YOU WIN", 300, 200);
    stroke(255);
    fill(button4);
    rect(300, 400, 300, 50);  // difficulty selector
    fill(button5);
    rect(300, 475, 300, 50);
    fill(255);
    textSize(30);
    text("Retry", 300, 400);
    text("Return To Start Screen", 300, 475);
    textSize(20);
    if (mouseX >= 150 && mouseX <= 450 && mouseY <= 425 && mouseY >= 375) {
      button4 = 100
      if (mouseIsPressed == true) {
        reset();
        win = false;
      }
    } else {
      button4 = 0
    }
    if (mouseX >= 150 && mouseX <= 450 && mouseY <= 500 && mouseY >= 450) {
      button5 = 100
      if (mouseIsPressed == true) {
        reset();
        win = false;
        started = false;
      }
    } else {
      button5 = 0
    }
  }

  if (playerHealth <= 0) {  // lose con
    lose = true;
  }
  if (lose == true) {  // lose screen and restart
    background(0);
    textSize(40);
    text("YOU SUCK", 300, 200);
    stroke(255);
    fill(button6);
    rect(300, 400, 300, 50);  // difficulty selector
    fill(button7);
    rect(300, 475, 300, 50);
    fill(255);
    textSize(30);
    text("Retry", 300, 400);
    text("Return To Start Screen", 300, 475);
    textSize(20);
    if (mouseX >= 150 && mouseX <= 450 && mouseY <= 425 && mouseY >= 375) {
      button6 = 100
      if (mouseIsPressed == true) {
        reset();
        lose = false;
      }
    } else {
      button6 = 0
    }
    if (mouseX >= 150 && mouseX <= 450 && mouseY <= 500 && mouseY >= 450) {
      button7 = 100
      if (mouseIsPressed == true) {
        reset();
        lose = false;
        started = false;
      }
    } else {
      button7 = 0
    }
  }
}

function difficultySettings() {  // handles difficulty settings
  if (difficulty == 0) {
    maxBossHealth = 250;
    maxPlayerHealth = 100;  // easy
    bossHealth = 250;
    playerHealth = 100;
    delay = 60;
  }
  if (difficulty == 1) {
    maxBossHealth = 500;
    maxPlayerhealth = 100; // hard
    bossHealth = 500;
    playerHealth = 100;
    delay = 30;
  }
  if (difficulty == 2) {
    maxBossHealth = 500;  // impossible
    maxPlayerHealth = 10;
    bossHealth = 500;
    playerHealth = 10;
    delay = 0;
  }
}

function reset() {  // resets all variables before restarting the game
  bossHealth = maxBossHealth;
  bossHit = false;
  playerHealth = maxPlayerHealth;
  pX = bX;
  pY = bY;
  ammo = 6;
  fired = false;
  bulletPos.set(pX, pY);
  attacked == true;
  projectileRow1 = 200;
  projectileRow1Hit = false;
  projectileRow2 = 700;
  projectileRow2Hit = false;
  projectileRow3 = 50;
  projectileRow3Hit = false;
  projectileRow4 = 550;
  projectileRow4Hit = false;
  projectileHit = false;
  projectileHit1 = false;
  decay = 255;
  decay1 = 255;
  projectilePos = createVector(bX - bH / 2, bossY);
  projectilePos1 = createVector(bX + bH / 2, bossY);
  timeChecked = false;
}

function mousePressed() {  // sets things up to fire the bullet
  if (started == true && win == false && lose == false) {
    if (ammo > 0 && fired == false) {
      ammo -= 1;
      oldPlayerPos.set(pX, pY);
      oldMousePos.set(mouseX, mouseY);
      bulletPos.set(pX, pY);
      fired = true;
    }
  }
}

function keyPressed() {  // logs keyCode
  console.log(keyCode);
}