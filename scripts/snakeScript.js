//Script for snake game  

// if the canvas is showing
let canvasActive = false;
// if the game is paused
let gamePaused = false;

// Game context is what you draw things onto
let gameContext;
let ctx; // just an abbreviation

// Keys that are pressed
var keys = [];
var keyDown = function(e) {
    keys[e.keyCode] = true;
}
var keyUp = function(e) {
    keys[e.keyCode] = false;
}

//Start a new game
var activateGame = function() {

    canvasActive = true;
    gameCanvas = document.getElementById('snakeCanvas');
    gameContext = gameCanvas.getContext("2d");
    ctx = gameContext;
    // Add event listeners for keypresses
    document.addEventListener("keydown", keyDown);
    document.addEventListener("keyup", keyUp);
    //create a new snake
    createSnake();
    interval = setInterval(drawGame, 100);
}

var deactivateGame = function() {
    canvasActive = false;
}

var createSnake = function() {
    snake = new Snake(gameCanvas.width / 2, gameCanvas.height / 2);
}

var Snake = function(xpos, ypos) {
    this.x = xpos;
    this.y = ypos;
    this.size = 10;
    // Center x and center y
    this.cx = this.x - this.size/2;
    this.cy = this.y - this.size/2;

    // Speed is the max speed, velocity is current speed in given direction
    this.speed = 2.5;
    this.xvel = 0;
    this.yvel = 0;

    this.color = "#0EFF0E";

    this.addVelocity = function() {
        console.log("adding");
        // Up
        if (keys[38]) {
            console.log("up");
            if (this.yvel > -this.speed) {
                this.yvel-=0.01;
            }
        }
        // Down
        if (keys[40]) {
            console.log("down");
            if (this.yvel < this.speed) {
                this.yvel+=0.01;
            }
        }
        // Left
        if (keys[37]) {
            console.log("left");
            if (this.xvel > -this.speed) {
                this.xvel-=0.01;
            }
        }
        // Righx
        if (keys[39]) {
            console.log("right");
            if (this.xvel < this.speed) {
                this.xvel+=0.01;
            }
        }
    }

    this.draw = function() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }

    this.update = function() {
        // Calculate velocity and check for input
        this.addVelocity();

        // Update variables
        this.x+=this.xvel;
        this.y+=this.yvel;
        this.cx = this.x - this.size/2;
        this.cy = this.y - this.size/2;
        
        // Draw the snake
        this.draw();
    }
}

var drawGame = function(gameContext) {

    // While the canvas is active draw things
    if (canvasActive) {
        
        // While the game is not paused update things
        if(!gamePaused) {
            snake.update();
        }

        // Its okay to draw things to the screen while not paused because they won't be updated
        snake.draw();

        if (gamePaused) {
            // Draw Text on screen
            ctx.font = '36px Serif';
            ctx.fillStyle = "#FFFFFF"; // white
            ctx.fillText("Paused", gameCanvas.width / 2, gameCanvas.height / 2);
        }

    }
}