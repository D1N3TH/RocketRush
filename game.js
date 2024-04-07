/*******************************************************/
//Name: Rocket Rush
// Written by Dineth
/*******************************************************/
console.log("%c Rocket Rush", "color: blue;");

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
let spawnDist = 1;
let lives = 3;

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
// Create the player and the groups of missiles and coins
function setup() {
    console.log("setup: ");
    cnv = new Canvas(windowWidth, windowHeight)

    // Add gravity to the world
    world.gravity.y = 10;
    
    SCREEN_WIDTH = windowWidth;
    SCREEN_HEIGHT = windowHeight;
    
    missiles = new Group();
    coins = new Group();

    floor = new Sprite(windowWidth / 2, windowHeight, windowWidth, 4, 's')
    floor.color = color('black')
    
    ceiling = new Sprite(0, 0, windowWidth * 2, 4, 's')
    ceiling.color = color('black')

    // Initialize the score and lives variables
    score = 0;
    coinCount = 0;
    lives = 3;
}
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

//Create missiles
function newMissile() {
    //create a new missile object with the following properties
    missile = new Sprite((SCREEN_WIDTH - 100), SCREEN_HEIGHT - MISSILE_HEIGHT / 2, MISSILE_WIDTH, MISSILE_HEIGHT, 'k');
    missile.addImage(missileI);
    missileI.resize(200, 200)
    missile.vel.x = -10;
    missile.x = 1400;
    missile.y = Math.round(random(20, SCREEN_WIDTH));
    missiles.add(missile);
}

//Player loses life if collision with missile
function loseLife(_player, _missile) {
    //Lose life and if run out of lives, change to end screen and remove the player and missiles
    if (lives < 1) {
    screenSelector = "end";
    player.remove();
    missiles.removeAll();
    }
    lives--; // Decrease the lives variable by 1 when the player collides with a missile
}

function newCoin() {
    //create a new coin object with the following properties
    coin = new Sprite((SCREEN_WIDTH - 100), SCREEN_HEIGHT - COIN_HEIGHT / 2, COIN_WIDTH, COIN_HEIGHT, 'k');
   coin.addImage(coinI);
    coin.collides(player, playerHitCoin);
    coinI.resize(COIN_WIDTH, COIN_HEIGHT);
    coin.vel.x = -10;
    coin.x = 1400;
    coin.y = Math.round(random(20, SCREEN_WIDTH));
    coins.add(coin);
}

function playerHitCoin() {
    console.log("addCoin")
    coinCount++;
    coins.remove(coin);
}

//Screen functions
/******************************************************/
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

//Instructions screen
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


//Create score
function gameScreen() {
    background(gameBackground);
    allSprites.visible = true;
    score++;
    if (frameCount > nextSpawn) {
        newMissile();
        newCoin();
        nextSpawn = frameCount + random(10, 30);
    }

    // Check for coin collision
    if (player.collides(coin, playerHitCoin)) {
        playerHitCoin();
    }

    textSize(32);
    fill(255);
    stroke(0);
    strokeWeight(4);
    text("Score: " + score, 50, 50);
    text("Coins: " + coinCount, 50, 100);
    text("Lives: " + lives, 50, 150); // Display the number of lives next to the score
}

//Game over screen
function endScreen() {
    console.log("YouDied")
    background("red")
    allSprites.visible = false;
    textSize(32);
    fill(255);
    stroke(0);
    strokeWeight(4);
    if (lives == 0) { // Switch to the end screen only if the player has no lives left
        text("You died! Better luck next time :-(", 50, 50);
        textSize(24);
        text("your score was: " + score, 50, 110);
        textSize(14);
        text("Press R to restart", 50, 150);
    } else {
        text("You hit a missile! You have " + lives + " lives left.", 50, 50);
        textSize(24);
        text("Press Enter to continue", 50, 110);
        screenSelector = "game";
    }
}

function resetGame() {
    //create a new player object and add it to game
    player = new Sprite(PLAYER_WIDTH * 1.2, SCREEN_HEIGHT / 2, PLAYER_WIDTH, PLAYER_HEIGHT, 'd');
    player.addImage(playerI);
    player.collides(missiles, loseLife);
    playerI.resize(80, 80);
    //reset score and coinCount to 0 at the start of each run
    score = 0;
    coinCount = 0;
    lives = 3; // Reset the lives variable to 3 at the start of each run
}
/*******************************************************/
//  END OF APP
/*******************************************************/
