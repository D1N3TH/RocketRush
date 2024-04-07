/*******************************************************/
//Name: Rocket Rush
// Written by Dineth
/*******************************************************/
console.log("%c Rocket Rush", "color: blue;");

//Screen size
const SCREEN_WIDTH = 600;
const SCREEN_HEIGHT = 300;

//Player
let player;
const PLAYER_WIDTH = 80;
const PLAYER_HEIGHT = 80;

//Missiles
let missiles;
const MISSILE_WIDTH = 150;
const MISSILE_HEIGHT = 25;

//Coins
const COIN_WIDTH = 50;
const COIN_HEIGHT = 50;

//Other variables
let screenSelector = "start";
let score = 0;
let coinCount = 0;
let nextSpawn = 0;
let spawnDist = 0 + 1;

//Load images in advance
function preload() {
    gameBackground = loadImage('Images/background.jpg');
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

    score = 0;
    coinCount = 0;
}

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
        text("wrong screen - you shouldnt get here", 50, 5)
        console.log("wrong screen - you shouldnt get here")
    }
}

//Create missiles
function newMissile() {
    //create a new missile object with the following properties
    missile = new Sprite((SCREEN_WIDTH - 100), SCREEN_HEIGHT - MISSILE_HEIGHT / 2, MISSILE_WIDTH, MISSILE_HEIGHT, 'k');
    missile.addImage(missileI);
    missileI.resize(200, 200)
    missile.vel.x = -10;
    missile.x = 1400;
    missile.y = Math.round(random(20, 0 + SCREEN_WIDTH));
    missiles.add(missile);
}

//Player dies if collision with missile
function youDead(_player, _missile) {
    //change the screen to the end screen and remove the player and missiles
    screenSelector = "end";
    player.remove();
    missiles.removeAll();
}

function newCoin() {
    //create a new coin object with the following properties
    coin = new Sprite((SCREEN_WIDTH - 100), SCREEN_HEIGHT - COIN_HEIGHT / 2, COIN_WIDTH, COIN_HEIGHT, 'k');
    coin.addImage(coinI);
    coin.collides(player, playerHitCoin);
    coinI.resize(COIN_WIDTH, COIN_HEIGHT);
    coin.vel.x = -10;
    coin.x = 1400;
    coin.y = Math.round(random(20, 0 + SCREEN_WIDTH));
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

    // Check for coin collision
    if (player.collides(coin, playerHitCoin)) {
        playerHitCoin();
    }

    textSize(32);
    fill(255);
    stroke(0);
    strokeWeight(4);
    text(score, 50, 50);
    text("Coins: " + coinCount, 50, 100);
}

function playerHitCoin() {
    console.log("addCoin")
    coinCount++;
    coins.remove(coin);
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
    //create a new player object and add it to game
    player = new Sprite(PLAYER_WIDTH * 1.2, SCREEN_HEIGHT / 2, PLAYER_WIDTH, PLAYER_HEIGHT, 'd');
    player.addImage(playerI);
    player.collides(missiles, youDead);
    playerI.resize(80, 80);
    //reset score and coinCount to 0 at the start of each run
    score = 0;
    coinCount = 0;
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
