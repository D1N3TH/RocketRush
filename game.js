/*******************************************************/
//Name: Rocket Rush
// Written by Dineth
/*******************************************************/
console.log("%c Rocket Rush", "color: blue;");

const screenWidth = 600;
const screenHeight = 300;

var screenSelector = "start";
var player;
var score;
var nextSpawn;
var obstacles;

const playerWidth = 40;
const playerHeight = 40;

const obstacleWidth = playerWidth;
const obstacleHeight = playerHeight;

function preload(){
    gameBackground = loadImage('Images/GameBackground.webp');
    startBackground = loadImage('Images/startImage.jpg');
}
/*******************************************************/
// setup()
/*******************************************************/
function setup(){
    console.log("setup: ");
    cnv = new Canvas(windowWidth, windowHeight)
     
    floor = new Sprite(windowWidth/2, windowHeight, windowWidth, 4, 's')
    floor.color = color('black')
    world.gravity.y=10;
    
    document.addEventListener("keydown", function(event) {
    console.log("Key pressed! + player.y");
    if (screenSelector == "start" || screenSelector == "end"){
        screenSelector="game"
        resetGame();
    }else{
        if(player.y > 270) {
        console.log("Key pressed!");
        player.vel.y = -20;
            }
        }
    });
    
    document.addEventListener("keydown", function(event) {
        if(event.code === 'ArrowUp') {
            player.vel.y = -5;
        }
        else if(event.code === 'ArrowDown') {
            player.vel.y = 5;
        }
    });
    document.addEventListener("keyup", function(event) {
        if(event.code === 'ArrowUp') {
            player.vel.y = 0;
        }
        else if(event.code === 'ArrowDown')
        player.vel.y = 0;
    });
}
/*******************************************************/
// draw()
/*******************************************************/
function draw() {
    if(screenSelector == "game"){
        gameScreen();
    }else if(screenSelector == "end"){
        endScreen();
    }else if(screenSelector == "start"){
        startScreen();
    }else {
        text("wrong screen - you shouldnt get here", 50, 50);
        console.log("wrong screen - you shouldnt get here")
    }
}

function newObstacle(){
    obstacle = new Sprite((screenWidth -100), screenHeight - obstacleHeight/2, obstacleWidth, obstacleHeight, 'k');
    obstacle.color = color("lightgreen");
    obstacle.vel.x = -10;
    obstacles.add(obstacle);
}

function youDead(_player, _obstacle) {
    screenSelector = "end";
    player.remove();
    obstacles.removeAll();
}

function startScreen(){
    console.log("Start screen")
    background(startBackground);

    allSprites.visible = false;
    textSize(32);
    fill(255);
    stroke(0);
    strokeWeight(4);
    text("Welcome to the game", 50, 50);
    textSize(24);
    text("Press any key to start", 50, 110);
    }

function gameScreen(){
    background(gameBackground); 
    allSprites.visible = true;
    score++;
    if(frameCount> nextSpawn){
        newObstacle();
        nextSpawn = frameCount + random(10,100);
    }
    
    textSize(32);
    fill(255);
    stroke(0);
    strokeWeight(4);
    text(score, 50, 50);
}

function endScreen(){
    console.log("YouDied")
    background("red")
    allSprites.visible = false;
    textSize(32);
    fill(255);
    stroke(0);
    strokeWeight(4);
    text("You died! Too bad :-(", 50, 50);
    textSize(24);
    text("your score was: "+score, 50, 110);
    textSize(14);
    text("press any key to restart", 50, 150);
}

function resetGame(){
    player = new Sprite(playerWidth*1.2, screenHeight/2, playerWidth, playerHeight, 'd');
    player.color=color("yellow")
    player.collides(obstacles, youDead);
    score=0;
}
/*******************************************************/
//  END OF APP
/*******************************************************/
