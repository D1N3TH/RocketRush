/*******************************************************/
//Name: Rocket Rush
// Written by Dineth
/*******************************************************/
console.log("%c Rocket Rush", "color: blue;");

//Player
let player;
const PLAYER_WIDTH = 80;
const PLAYER_HEIGHT = 80;

//Rockets
let rockets;
const ROCKET_WIDTH = 150;
const ROCKET_HEIGHT = 25;

const SCREEN_WIDTH = 1000;
const SCREEN_HEIGHT = 500;

//Coins
const COIN_DIAMETER = 50;

//Other variables
let screenSelector = "start";
let score = 0;
let coinCount = 0;
let nextSpawn = 0;
let spawnDist = 1;
let lives = 3;
let userNameIsInvalid = true;
let userName;
let scoreIncrementCounter = 0; // Counter to control score incrementation speed
const SCORE_INCREMENT_DELAY = 5; // Adjust this value to control the speed of score incrementation


//Load images in advance
function preload() {
    gameBackground = loadImage('Images/gameBackground.jpg');
    startBackground = loadImage('Images/startBackground.jpg');
    instructionsBackground = loadImage('Images/instructions.jpg')
    rocketI = loadImage('Images/rocket.png');
    playerI = loadImage('Images/player.png');
    coinI = loadImage('Images/coin.png');
    heartI = loadImage('Images/heart.png');
}
/*******************************************************/
// setup()
/*******************************************************/
// Create the player and the groups of rockets and coins
function setup() {
    console.log("setup: ");
    new Canvas(SCREEN_WIDTH, SCREEN_HEIGHT)

    // Add gravity to the world
    world.gravity.y = 20;

    // Create groups of rockets and coins
    rockets = new Group();
    coins = new Group();

    //Create the floor
    floor = new Sprite(SCREEN_WIDTH / 2, SCREEN_HEIGHT, SCREEN_WIDTH, 4, 's')
    floor.color = color('black')

    //Create the ceiling
    ceiling = new Sprite(0, 0, SCREEN_WIDTH * 2, 4, 's')
    ceiling.color = color('black')

    // Initialize the score and lives variables
    score = 0;
    coinCount = 0;
    lives = 3;

    askUserName();

    //Image resizing
    rocketI.resize(200, 50);
    playerI.resize(80, 80);
    coinI.resize(COIN_DIAMETER, COIN_DIAMETER);
    heartI.resize(50, 0);
    
document.addEventListener("keydown", function(event) {
    if (event.code === "Enter") {
        if (screenSelector === "start" || screenSelector === "instructions" || screenSelector === "end") {
            screenSelector = "game";
            resetGame();
        }
    } else if (event.code === "KeyI" && screenSelector === "start") {
        console.log("Key pressed!");
        screenSelector = "instructions";
        instructions();
    } else if (event.code === "KeyB" && screenSelector === "instructions") {
        screenSelector = "start";
    } else if (event.code === "KeyH" && screenSelector === "end") {
        screenSelector = "start";
    }
});
}
/*******************************************************/
// draw()
/*******************************************************/
//Screen Selectors
function draw() {
    // Run the appropriate function based on the current screen
    if (screenSelector == "game") {
        gameScreen();
    } else if (screenSelector == "end") {
        endScreen();
    } else if (screenSelector == "start") {
        startScreen();
    } else if (screenSelector == "instructions") {
        instructions();
    } else if (screenSelector == "young") {
        tooYoung();
    } else {
        text("wrong screen - you shouldnt get here", 50, 5)
        console.log("wrong screen - you shouldnt get here")
    }
}

function playerControls() {
    //Player controls for flying jetpack
    document.addEventListener("keydown", function(event) {
        if (event.code === 'ArrowUp' || event.code === 'KeyW') {
            player.vel.y = -10;
        }
    });

    document.addEventListener("keyup", function(event) {
        if (event.code === 'ArrowUp' || event.code === 'KeyW') {
            player.vel.y = 0;
        }
    });
}

//Create rockets
function newRocket() {
    //create a new rocket object with the following properties
    rocket = new Sprite((SCREEN_WIDTH + 50), Math.round(random(20, SCREEN_HEIGHT)), ROCKET_WIDTH, ROCKET_HEIGHT, 'k');
    rocket.addImage(rocketI);
    rocket.vel.x = -5;
    rockets.add(rocket);
}

//Player loses life if collision with rocket
function loseLife(_player, _rocket) {
    //remove the rocket
    _rocket.remove();

    lives--; // Decrease the lives variable by 1 when the player collides with a rocket
}

function newCoin() {
    //create a new coin object with the following properties
    coin = new Sprite((SCREEN_WIDTH + 50), Math.round(random(20, SCREEN_WIDTH)), COIN_DIAMETER, COIN_DIAMETER, 'k');
    coin.addImage(coinI);
    coin.vel.x = -5;
    coins.add(coin);
}

// Function to update position of rockets and coins
function updateSprites() {
    for (let i = rockets.length - 1; i >= 0; i--) {
        if (rockets[i].position.x < -ROCKET_WIDTH / 2) {
            rockets[i].position.x = SCREEN_WIDTH + ROCKET_WIDTH / 2;
            rockets[i].position.y = Math.round(random(20, SCREEN_WIDTH - 20));
        }
    }
    for (let i = coins.length - 1; i >= 0; i--) {
        if (coins[i].position.x < -COIN_DIAMETER / 2) {
            coins[i].position.x = SCREEN_WIDTH + COIN_DIAMETER / 2;
            coins[i].position.y = Math.round(random(20, SCREEN_WIDTH - 20));
        }
    }
}

function playerHitCoin(_coin, _player) {
    console.log("addCoin")
    coinCount++;
    _coin.remove();
}

function tooYoung() {
    background(startBackground);
}

// Ask the user for their name
function askUserName() {
    while (userNameIsInvalid) {
        userName = prompt("Hello there, \n what is your name?");
        if (userName == null) {
            stopPropogation();
        }
        if (userName == " " || userName == "" || !isNaN(userName)) {
            alert("The username was invalid. You must enter a valid username.");
        } else {
            userNameIsInvalid = false;
        }
    }
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
    text("Hello " + userName + ", welcome to Rocket Rush!", 400, 200);
    textSize(24);
    text("Press Enter to Start", 600, 300);
    text("Press I for Instructions", 600, 350);
}

//Instructions screen
function instructions() {
    console.log("instructions")
    background(instructionsBackground)
    allSprites.visible = false;
    textSize(32);
    fill(255);
    stroke(0);
    strokeWeight(4);
    textSize(24);
    text("Press B to go back", 100, 450);
    text("Press Enter to Play", 700, 450);

}

// During the game
function gameScreen() {
    background(gameBackground);
    allSprites.visible = true;

    // Increment the score increment counter
    scoreIncrementCounter++;

    // Increment the score if the counter reaches the delay threshold
    if (scoreIncrementCounter >= SCORE_INCREMENT_DELAY) {
        score++;
        scoreIncrementCounter = 0; // Reset the counter
    }

    if (frameCount > nextSpawn) {
        newRocket();
        newCoin();
        nextSpawn = frameCount + random(40, 100);
    }

    updateSprites();

    // Update player's position based on controls
    playerControls();

    // Display hearts for lives
    for (let i = 0; i < lives; i++) {
        image(heartI, 540 + i * 40, 15, 50, 50); // Adjust position and size as needed
    }

    // Check for collisions with rockets
    for (let i = rockets.length - 1; i >= 0; i--) {
        let m = rockets[i];
        m.position.x += m.velocity.x;
        m.position.y += m.velocity.y;

        // Check for collision between player and rocket
        if (player.overlap(m)) {
            // Remove the rocket
            m.remove();

            // Lose life and if run out of lives, change to end screen
            if (lives <= 1) {
                screenSelector = "end";
            }
            lives--; // Decrease the lives variable by 1 when the player collides with a rocket
        }
    }

    // Check for coin collision
    for (let i = coins.length - 1; i >= 0; i--) {
        let c = coins[i];
        c.position.x += c.velocity.x;
        c.position.y += c.velocity.y;

        // Check for collision between player and coin
        if (screenSelector === "game" && player.overlap(c)) {
            // Remove the coin
            c.remove();

            // Increase the coin count
            coinCount++;
        }
    }

    textSize(32);
    fill(255);
    stroke(0);
    strokeWeight(4);
    text("Score: " + score, 50, 50);
    text("Coins: " + coinCount, 250, 50);
    text("Lives:", 450, 50); // Display the number of lives next to the score
}


//Game over screen
function endScreen() {
    console.log("YouDied")
    background("grey")
    allSprites.visible = false;
    coins.vel.x = 0;
    rockets.vel.x = 0;
    textSize(50);
    fill(255);
    stroke(0);
    strokeWeight(4);
    text("Game Over!", 375, 100);
    textSize(24);
    text("Your score was: " + score, 400, 200);
    text("You collected " + coinCount + " coins.", 400, 230);
    textSize(30);
    text("Press Enter to restart", 550, 400);
    text("Press H to go back Home", 100, 400)
}

function resetGame() {
    // Check if the player sprite exists and remove it
    if (player) {
        player.remove();
    }

    // Clear existing rockets and coins
    rockets.remove();
    coins.remove();

    //create a new player object and add it to game
    player = new Sprite(PLAYER_WIDTH * 1.2, SCREEN_HEIGHT / 2, PLAYER_WIDTH, PLAYER_HEIGHT, 'd');
    player.addImage(playerI);
    player.collides(rockets, loseLife);
    //reset score and coinCount to 0 at the start of each run
    score = 0;
    coinCount = 0;
    lives = 3; // Reset the lives variable to 3 at the start of each run
}
/*******************************************************/
//  END OF APP
/*******************************************************/
