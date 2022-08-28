//Script for snake game  

// if the canvas is showing
let canvasActive = false;
// if the game is paused
let gamePaused = false;

// Game context is what you draw things onto
let gameContext;
let ctx; // just an abbreviation

// Last Key pressed is the direction
var currentDirection;
var keyDown = function(e) {

    // check if a key that can scroll the page is pressed
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.code)) {
        // disable page scrolling for the key (default action)
        e.preventDefault();
        // Set the current direction for the snake
        currentDirection = e.keyCode;
    }

}

//Start a new game
var activateGame = function() {

    // allow for Showing the canvas
    canvasActive = true;
    // Get the canvas and context
    gameCanvas = document.getElementById('snakeCanvas');
    gameContext = gameCanvas.getContext("2d");
    ctx = gameContext; // abbreviate the context

    // Add event listeners for keypresses
    document.addEventListener("keydown", keyDown);
    currentDirection = 0; // reset current direction so snake doesn't start moving on startup

    //create a new snake
    createSnake();
    // new timer
    interval = setInterval(drawGame, 10);
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

    // Speed is the max speed
    this.speed = 0.5;

    this.color = "#0EFF0E";

    this.move = function() {
        // Up
        if (currentDirection == 38) {
           this.y -= this.speed;
        }
        // Down
        if (currentDirection == 40) {
            this.y += this.speed;
        }
        // Left
        if (currentDirection == 37) {
            this.x -= this.speed;
        }
        // Right
        if (currentDirection == 39) {
            this.x += this.speed;
        }
    }

    this.draw = function() {
        // Fill style sets the color
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }

    this.update = function() {
        // Calculate velocity and check for input
        this.move();

        // Update variables
        this.cx = this.x - this.size/2;
        this.cy = this.y - this.size/2;
        
        // Draw the snake
        this.draw();
    }
}

var drawGame = function(gameContext) {

    // While the canvas is active draw things
    if (canvasActive) {
        
        // set the color to black and draw the background every frame
        ctx.fillStyle = "#000000";
        ctx.fillRect(-1, -1, gameCanvas.width + 2, gameCanvas.height + 2);

        // While the game is not paused update things
        if(!gamePaused) {
            // Player
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