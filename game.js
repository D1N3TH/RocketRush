/*******************************************************/
//Name: Rocket Rush
// Written by Dineth
/*******************************************************/
console.log("%c Rocket Rush", "color: blue;");

//Screen size
const screenWidth = 600;
const screenHeight = 300;

//Player
var player;
const playerWidth = 80;
const playerHeight = 80;

//Missiles
var missiles;
var missileWidth = 150;
var missileHeight = 25;

var coinWidth = 50;
var coinHeight = 50;

//Other variables
var screenSelector = "start";
var score = 0;
var nextSpawn = 0;
var spawnDist = 0 + 1;

//Load images in advance
function preload() {
    gameBackground = loadImage('Images/GameBackground.webp');
    startBackground = loadImage('Images/startImage.jpg');
    missileI = loadImage('Images/missile.png');
    playerI = loadImage('Images/jetpack.png');
    coinI = loadImage('Images/coin.png');
}
/*******************************************************/
// setup()
/*******************************************************/
function setup() {
    console.log("setup: ");
    cnv = new Canvas(windowWidth, windowHeight)

    missiles = new Group();
    coins = new Group();

    floor = new Sprite(windowWidth / 2, windowHeight, windowWidth, 4, 's')
    floor.color = color('black')
    ceiling = new Sprite(0, 0, windowWidth * 2, 4, 's')
    ceiling.color = color('black')
    world.gravity.y = 10;

};

//Player controls for flying jetpack
document.addEventListener("keydown", function(event) {
    if (event.code === 'ArrowUp') {
        player.vel.y = -10;
    }
});

document.addEventListener("keyup", function(event) {
    if (event.code === 'ArrowUp') {
        player.vel.y = 0;
    }
});

document.addEventListener("keydown", function(event) {
    if (event.code === 'KeyW') {
        player.vel.y = -10;
    }
});

document.addEventListener("keyup", function(event) {
    if (event.code === 'KeyW') {
        player.vel.y = 0;
    }
});
/*******************************************************/
// draw()
/*******************************************************/
//Screen Selectors
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

//Create missiles
function newMissile() {
    missile = new Sprite((screenWidth - 100), screenHeight - missileHeight / 2, missileWidth, missileHeight, 'k');
    missile.addImage(missileI);
    missileI.resize(200, 200)
    missile.vel.x = -10;
    missile.x = 1400;
    missile.y = Math.round(random(20, 0 + screenWidth));
    missiles.add(missile);
}

//Player dies if collision with missile
function youDead(_player, _missile) {
    screenSelector = "end";
    player.remove();
    missiles.removeAll();
}

function newCoin() {
    coin = new Sprite((screenWidth - 100), screenHeight - coinHeight / 2, coinWidth, coinHeight, 'k');
    coin.addImage(coinI);
    coinI.resize(coinWidth, coinHeight)
    coin.vel.x = -10;
    coin.x = 1400;
    coin.y = Math.round(random(20, 0 + screenWidth));
    coins.add(coin);
}

//Welcomes the user to game
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

//Create score
function gameScreen() {
    background(gameBackground);
    allSprites.visible = true;
    score++;
    if (frameCount > nextSpawn) {
        newMissile();
        newCoin();
        nextSpawn = frameCount + random(10, 100);
    }

    textSize(32);
    fill(255);
    stroke(0);
    strokeWeight(4);
    text(score, 50, 50);
}

//Change to this screen when player dies
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
    player.addImage(playerI);
    player.collides(missiles, youDead);
    playerI.resize(80, 80);
    score = 0;
}

//Teaches how to to play the game
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
