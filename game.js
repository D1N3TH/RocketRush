/*******************************************************/
//Name: Rocket Rush
// Written by Dineth
/*******************************************************/
console.log("%c Rocket Rush", "color: blue;");

const screenWidth = 600;
const screenHeight = 300;

var screenSelector = "start";
var player;
var score = 0;
var nextSpawn = 0;
var obstacles;
var spawnDist = 0 + 1;

const playerWidth = 40;
const playerHeight = 40;

const obstacleWidth = playerWidth;
const obstacleHeight = playerHeight;

function preload() {
    gameBackground = loadImage('Images/GameBackground.webp');
    startBackground = loadImage('Images/startImage.jpg');
}
/*******************************************************/
// setup()
/*******************************************************/
function setup() {
    console.log("setup: ");
    cnv = new Canvas(windowWidth, windowHeight)

    obstacles = new Group();

    floor = new Sprite(windowWidth / 2, windowHeight, windowWidth, 4, 's')
    floor.color = color('black')
    world.gravity.y = 10;

};

document.addEventListener("keydown", function(event) {
    if (event.code === 'ArrowUp') {
        player.vel.y = -5;
    } else if (event.code === 'ArrowDown') {
        player.vel.y = 5;
    }
});
document.addEventListener("keyup", function(event) {
    if (event.code === 'ArrowUp') {
        player.vel.y = 0;
    } else if (event.code === 'ArrowDown')
        player.vel.y = 0;
});

document.addEventListener("keydown", function(event) {
    if (event.code === 'KeyW') {
        player.vel.y = -5;
    } else if (event.code === 'KeyS') {
        player.vel.y = 5;
    }
});
document.addEventListener("keyup", function(event) {
    if (event.code === 'KeyW') {
        player.vel.y = 0;
    } else if (event.code === 'KeyS')
        player.vel.y = 0;
});
/*******************************************************/
// draw()
/*******************************************************/
function draw() {
    if (screenSelector == "game") {
        gameScreen();
    } else if (screenSelector == "end") {
        endScreen();
    } else if (screenSelector == "start") {
        startScreen();
    } else if (screenSelector == "instructions") {
        instructions();
    } else {
        text("wrong screen - you shouldnt get here", 50, 50);
        console.log("wrong screen - you shouldnt get here")
    }
}

function newObstacle() {
    obstacle = new Sprite((screenWidth - 100), screenHeight - obstacleHeight / 2, obstacleWidth, obstacleHeight, 'k');
    obstacle.color = color("lightgreen");
    obstacle.vel.x = -10;
    obstacles.add(obstacle);
}

function youDead(_player, _obstacle) {
    screenSelector = "end";
    player.remove();
    obstacles.removeAll();
}

function startScreen() {
    console.log("Start screen")
    background(startBackground);

    allSprites.visible = false;
    textSize(32);
    fill(255);
    stroke(0);
    strokeWeight(4);
    text("Welcome to Rocket Rush", 50, 50);
    textSize(24);
    text("Press Enter to Start", 50, 110);

    document.addEventListener("keydown", function(event) {
        if (event.code === "Enter") {
            console.log("Key pressed!");
            if (screenSelector == "start" || screenSelector == "end") {
                screenSelector = "game"
                resetGame();
            }
        }
    })

    document.addEventListener("keydown", function(event) {
        if (event.code === "KeyI") {
            console.log("Key pressed!");
            screenSelector = "instructions"
            instructions();
        }
    })
}

function gameScreen() {
    background(gameBackground);
    allSprites.visible = true;
    score++;
    if (frameCount > nextSpawn) {
        newObstacle();
        nextSpawn = frameCount + random(10, 100);
    }

    textSize(32);
    fill(255);
    stroke(0);
    strokeWeight(4);
    text(score, 50, 50);
}

function endScreen() {
    console.log("YouDied")
    background("red")
    allSprites.visible = false;
    textSize(32);
    fill(255);
    stroke(0);
    strokeWeight(4);
    text("You died! Better luck next time :-(", 50, 50);
    textSize(24);
    text("your score was: " + score, 50, 110);
    textSize(14);
    text("Press R to restart", 50, 150);
}

function resetGame() {
    player = new Sprite(playerWidth * 1.2, screenHeight / 2, playerWidth, playerHeight, 'd');
    player.color = color("yellow")
    player.collides(obstacles, youDead);
    score = 0;
}

function instructions() {
    console.log("instructions")
    background("red")
    allSprites.visible = false;
    textSize(32);
    fill(255);
    stroke(0);
    strokeWeight(4);
    text("Instructions");
    textSize(24);
    text("Use Up/Down Arrow Keys or W/S Keys to move player up and down");
    textSize(14);
    text("Avoid obstacles, collect coins, and try get a higher score");
}
/*******************************************************/
//  END OF APP
/*******************************************************/
