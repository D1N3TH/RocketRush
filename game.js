/*******************************************************/
//Name: Rocket Rush
// Written by Dineth
/*******************************************************/
console.log("%c Rocket Rush", "color: blue;");

const screenWidth = 600;
const screenHeight = 300;

var screenSelector = "start";
var player;

const playerWidth = 40;
const playerHeight = 40;
/*******************************************************/
// setup()
/*******************************************************/
function setup(){
    console.log("setup: ");
     cnv = new Canvas(windowWidth, windowHeight)
     
         floor = new Sprite(windowWidth/2, windowHeight, windowWidth, 4, 's')
    floor.color = color('black')
    world.gravity.y=50;

    document.addEventListener("keydown", function(event) {
    console.log("Key pressed! + player.y");
    if (screenSelector == "start" || screenSelector == "end"){
        screenSelector="game"
        resetGame();
    }else{
        if (player.y > 270) {
        console.log("Key pressed!");
        player.vel.y = -20;
            }
        }
    });
    
    document.addEventListener("keydown", function(event){
        if(event.code === 'ArrowLeft') {
            player.vel.x = -10;
        }
        else if(event.code === 'ArrowRight') {
            player.vel.x = 10;
        }
    });
    document.addEventListener("keyup", function(event) {
        if(event.code === 'ArrowRight') {
            player.vel.x = 0;
        }
        else if(event.code === 'ArrowLeft')
        player.vel.x = 0;
    })
    
    document.addEventListener("keydown", function(event) {
        if(event.code === 'ArrowUp') {
            player.vel.y = -10;
        }
        else if(event.code === 'ArrowDown') {
            player.vel.y = 10;
        }
    });
    document.addEventListener("keyup", function(event) {
        if(event.code === 'ArrowUp') {
            player.vel.y = 0;
        }
        else if(event.code === 'ArrowDown')
        player.vel.y = 0;
    });
/*******************************************************/
// draw()
/*******************************************************/
function draw(){
    background("grey")
}

function startScreen(){
    console.log("Start screen")
    background("white");

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
    startBackground = loadImage("startImage.jpg");
    back1 = createSprite(300,160,200,50);
    back1.addImage(startBackground);}
    }
    
    function resetGame(){
    }
/*******************************************************/
//  END OF APP
/*******************************************************/
