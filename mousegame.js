var mouse = {x: 0, y: 0}
var score = 0
var scoreText = makeText("Score: -", 660, 50, 25, "sans-serif", "white", 1)
var player = makeImage("images/spaceship.png", 47, 47, 47, 47, 1)
var enemies = []
var missiles = []
var gameOver = false

function drawPlayer(){
  setX(player, mouse.x)
  setY(player, mouse.y)
}

function drawEverything(){
  drawPlayer()
  drawEnemies()
  drawMissiles()
  checkCollisionsPlayer()
  checkCollisionsMissiles()
  if(gameOver == false){
    requestAnimationFrame(drawEverything)
  }
}

function makeEnemies(){
  var enemy = makeImage("images/octopus.gif", 810, random(1, 400), 47, 47, 1)
  enemies.push(enemy)
  if(gameOver == false){
    setTimeout(makeEnemies, 1000)
  }
}

function drawEnemies(){
  for(var i = 0; i < enemies.length;i++){
    move(enemies[i], -3, 0)
    if(getX(enemies[i]) < 1){
    setX(enemies[i], 800)
    }
  }
}

function fireMissiles(){
    var width = 7
    var shell = makeImage("images/missile.png", 100, 150, 40, 40, 1)
    setX(shell, getX(player) + width - 10)
    setY(shell, getY(player) + width - 10)
    missiles.push(shell)
}

document.addEventListener("click", fireMissiles)

function drawMissiles(){
  for(var i = 0;i < missiles.length; i++){
    move(missiles[i], 6, 0)
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
}


function checkCollisionsMissiles() {
    for (var i = 0; i < missiles.length; i++){
      for (var j = 0; j < enemies.length; j++) {
        if (collide(missiles[i], enemies[j], 0, -20) == true) {
                drawExplosion(getX(missiles[i]), getY(missiles[i]))
                removeArrayElement(missiles, i)
                removeArrayElement(enemies, j)
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
