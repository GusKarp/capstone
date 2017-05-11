var mouse = {x: 0, y: 0}
var score = 0
var scoreText = makeText("Score: -", 660, 50, 25, "sans-serif", "white", 1)
var player = makeImage("images/monsterhunter.png", 147, 147, 147, 47, 1)
var enemies = []
var enemies2 = []
var enemies3 = []
var missilesRight = []
var missilesLeft = []
var gameOver = false

function drawPlayer(){
  setX(player, mouse.x)
  setY(player, mouse.y)
}

function drawEverything(){
  drawPlayer()
  drawMissiles()
  drawEnemies()
  checkCollisionsPlayer()
  checkCollisionsMissiles()
  if(gameOver == false){
    requestAnimationFrame(drawEverything)
  }
}

function makeEnemies(){
  var enemy1 = makeImage("images/werewolf.png", 810, random(1, 400), 47, 47, 1)
  enemies.push(enemy1)
  if(gameOver == false){
    setTimeout(makeEnemies, 1000)
  }
}

function makeEnemies2(){
  var enemy2 = makeImage("images/ghost.png", -10, random(1, 400), 47, 47, 1)
  enemies2.push(enemy2)
  if(gameOver == false){
    setTimeout(makeEnemies2, 10000)
  }
}

function makeEnemies3(){
  var enemy3 = makeImage("images/vampire.png", -10, random(1, 400), 47, 47, 1)
  enemies3.push(enemy3)
  if(gameOver == false){
    setTimeout(makeEnemies3, 1000)
  }
}

function drawEnemies(){
  for(var i = 0; i < enemies.length;i++){
    move(enemies[i], -3, 0)
    if(getX(enemies[i]) < 1){
    setX(enemies[i], 800)
    }
  }
  for(var i = 0; i < enemies2.length;i++){
    move(enemies2[i], 3, 0)
    if(getX(enemies2[i]) > 800){
    setX(enemies2[i], -10)
    }
  }
  for(var i = 0; i < enemies3.length;i++){
    move(enemies3[i], 3, 0)
    if(getX(enemies3[i]) > 800){
    setX(enemies3[i], -10)
    }
  }
}

function fireMissiles(e){
    var width = 7
    var shell = makeImage("images/Blue_laser.png", 100, 150, 40, 40, 1)
    setX(shell, getX(player) + width - 10)
    setY(shell, getY(player) + width - 10)
    if(e.keyCode == 39){
      missilesRight.push(shell)
    }
    else if(e.keyCode == 37){
      missilesLeft.push(shell)
    }
}

document.addEventListener("keydown", fireMissiles)

function drawMissiles(){
    for(var i = 0;i < missilesRight.length; i++){
    move(missilesRight[i], 6, 0)
    }
    for(var i = 0;i < missilesLeft.length; i++){
    move(missilesLeft[i], -6, 0)
    }
}

function checkCollisionsPlayer(){
  for(var i = 0;i < enemies.length; i++){
    if(collide(player, enemies[i]) == true){
      removeElement(player)
      removeArrayElement(enemies, i)
      gameOver = true
    }
  }
  for(var i = 0;i < enemies2.length; i++){
    if(collide(player, enemies2[i]) == true){
      removeElement(player)
      removeArrayElement(enemies2, i)
      gameOver = true
    }
  }
  for(var i = 0;i < enemies3.length; i++){
    if(collide(player, enemies3[i]) == true){
      removeElement(player)
      removeArrayElement(enemies3, i)
      gameOver = true
    }
  }
}


function checkCollisionsMissiles() {
    for (var i = 0; i < missilesRight.length; i++){
      for (var j = 0; j < enemies.length; j++) {
        if (collide(missilesRight[i], enemies[j], 0, -20) == true) {
                drawExplosion(getX(missilesRight[i]), getY(missilesRight[i]))
                removeArrayElement(missilesRight, i)
                removeArrayElement(enemies, j)
                i = i + 1
                j = j + 1
                score = score + 1
                scoreText.innerHTML = score
            }
        }
    }
    for (var i = 0; i < missilesLeft.length; i++){
      for (var j = 0; j < enemies3.length; j++) {
        if (collide(missilesLeft[i], enemies3[j], 0, -20) == true) {
                drawExplosion(getX(missilesLeft[i]), getY(missilesLeft[i]))
                removeArrayElement(missilesLeft, i)
                removeArrayElement(enemies3, j)
                i = i + 1
                j = j + 1
                score = score + 1
                scoreText.innerHTML = score
            }
        }
    }
}

drawEverything()
makeEnemies()
makeEnemies2()
makeEnemies3()
