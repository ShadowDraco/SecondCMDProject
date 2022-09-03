//Script for snake game  

// if the canvas is showing
let canvasActive = false;
// if the game is paused
let gamePaused = false;

// Game context is what you draw things onto
let gameContext;
let ctx; // just an abbreviation

let snake;
let apple;
let interval;
let timer;
let gameSize = 20;

// Elements on the page that show the game score
let scoreEls = document.querySelectorAll('.game-score');

// Last Key pressed is the direction
var currentDirection;
let firstKey = false;
var keyDown = function(e) {

    // check if a key that can scroll the page is pressed
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.code)) {
        // disable page scrolling for the key (default action)
        e.preventDefault();
        // Set the current direction for the snake
        currentDirection = e.keyCode;

        // if the first key hasn't been pressed yet don't spawn the 
        // first snake part so the game doesn't reset over and over
        if (!firstKey) {
            firstKey = true;
        }
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
    firstKey = false; // no first key is pressed

    //create a new snake and an apple
    createSnake();
    // new timer
    timer = 490;
    clearInterval(interval);
    interval = setInterval(drawGame, timer);
}

var deactivateGame = function() {
    canvasActive = false;
}

var checkScore = function() {
    // check if a person is signed in to set the score

    if (JSON.parse(sessionStorage.getItem('signedIn'))) {

        let userIndex;
        let localUsers = JSON.parse(localStorage.getItem('allUsers'));
        let localScores = JSON.parse(localStorage.getItem('allScores'));

        for (let i = 0; i < localUsers.length; i++) {
            if (localUsers[i] == user) {
                userIndex = i;
                break;
            }
        }

        // Set global scores in local storage
        let localUser = localUsers[userIndex];
        let localScore = localScores[userIndex];

        // Set scores for current session
        let currentScore = JSON.parse(sessionStorage.getItem('currentTopScore'));
        // Check if the game that just happened has a new top score
        if (snake.score > currentScore) {
            sessionStorage.setItem('currentTopScore', snake.score);
        }

        // set top score for user 
        // check the current user compared to the local storage list of users and then set that users's top score
        if (snake.score > localScore) {
        // add a top score for the user
            localScores[userIndex] = snake.score;
            localStorage.setItem('allScores', JSON.stringify(localScores));
        }

        // set the all time global high score
        if (snake.score > JSON.parse(localStorage.getItem('allTimeScore'))) {
            localStorage.setItem('allTimeScore', snake.score);
        }

        console.log('signed in');
        console.log(currentScore);
        console.log(user);
        console.log(localUser);
        console.log(snake.score);
        console.log(localScore);

        console.log(localUsers);
        console.log(localScores);
    }
}

var resetGame = function() {
  
    currentDirection = 0; // reset current direction so snake doesn't start moving on startup
    firstKey = false; // no first key is pressed

    //create a new snake and an apple
    createSnake();
    // new timer
    timer = 490;
    clearInterval(interval);
    interval = setInterval(drawGame, timer);

}

var gameOver = function() {
    // save the score and show the reset screen
    checkScore();
    resetGame();
    
}

var pauseGame = function(e) {
    
    if (gamePaused) {
        gamePaused = false;
    } else {
        gamePaused = true;
    }
}

var createSnake = function() {
    // give the apple a position before the snake schecks it
    apple = new Apple();
    apple.update();
    snake = new Snake(gameCanvas.width / 2, gameCanvas.height / 2);

}

var SnakePart = function(xpos, ypos) {
    // current
    this.x = xpos;
    this.y = ypos;
    //previous
    this.pY = this.x;
    this.pY = this.y;

    this.update = function(xpos, ypos) {
        // Set previous position
        this.pX = this.x;
        this.pY = this.y;
        // update Current Position
        this.x = xpos;
        this.y = ypos;
    }
}

var Snake = function(xpos, ypos) {
    //current position
    this.x = xpos;
    this.y = ypos;
    // Previous posistions
    this.pX = this.x;
    this.pY = this.y;
    this.size = gameSize;

    // Speed is the distance of the game's grid pieces
    this.speed = gameSize;
    // how many apples are eaten
    this.score = 0;

    this.color = "#0EFF0E";

    this.firstPart = false;
    this.parts = [];

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

    this.addPart = function() {
        console.log('new part');
        console.log(this.parts[this.parts.length-1].pX, this.parts[this.parts.length-1].pY);
        this.parts.push(new SnakePart(this.parts[this.parts.length-1].pX, this.parts[this.parts.length-1].pY));
    }

    this.draw = function() {
        // Fill style sets the color
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);

        for (let i = 0; i < this.parts.length; i++) {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.parts[i].x, this.parts[i].y, gameSize, gameSize);
        }
    }

    this.update = function() {

        // Dont spawn the first snake part until after the first direction is set 
        if (firstKey && !this.firstPart) {
            // Add the first Part
            this.parts.push(new SnakePart(this.pX, this.pY));
            this.firstPart = true;
            console.log('first part spawned');
        }
        // set the previous x
        this.pX = this.x;
        this.pY = this.y;
    
        // Update snake parts
        // The first part can't be updated with the others because of the -1
        if (firstKey) {
            this.parts[0].update(this.pX, this.pY);   
        }

        for (let i = 1; i < this.parts.length; i++) {
            let prevPart = this.parts[i-1];
            let part = this.parts[i];
            part.update(prevPart.pX, prevPart.pY);
        }

        // check for input and move
        this.move();
        
        // Draw the snake
        this.draw();
    }
}

var Apple = function() {

    this.x = 0;
    this.y = 0;
    this.size = gameSize;

    this.draw = function() {
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }

    this.update = function() {
        this.x = Math.round((Math.random() * gameCanvas.width - gameSize) / gameSize) * gameSize;
        this.y = Math.round((Math.random() * gameCanvas.height - gameSize) / gameSize) * gameSize;

        if(this.x < gameSize || this.y < gameSize) {
            this.update();
        }
    }
}

var checkCollisions = function() {

    // Check the snake and apple positions
    if (snake.x == apple.x && snake.y == apple.y) {
            
        apple.update();
        snake.score++;
        snake.addPart();

        scoreEls.forEach(function (el) { 
            el.innerText = "Score: " + snake.score; 
        });

        if (timer > 80) {
            timer-=50;
            clearInterval(interval);
            interval = setInterval(drawGame, timer);
        }
    }

    // check snake parts
    snake.parts.forEach(function (part) {
        if (part.x == snake.x && part.y == snake.y) {
            gameOver();
        }
    });
}

var drawGrid = function() {
    // Draw the game grid every frame]
    
    for (let i = 0; i < gameCanvas.width/snake.size; i++) {
        ctx.beginPath();
        ctx.strokeStyle = 'gray';

        // horizontal lines
        ctx.moveTo(0, snake.size * i);
        ctx.lineTo(gameCanvas.width, snake.size * i);
        ctx.stroke();

        // vertical lines
        ctx.moveTo(snake.size * i, 0);
        ctx.lineTo(snake.size * i, gameCanvas.height);
        ctx.stroke();
    }
}

var drawGame = function(gameContext) {

    // While the canvas is active draw things
    if (canvasActive) {

        // While the game is not paused update things
        if(!gamePaused) {
            // Player
            snake.update();
            checkCollisions();
        }

        // set the color to black and draw the background every frame
        ctx.fillStyle = "#000000";
        ctx.fillRect(-1, -1, gameCanvas.width + 2, gameCanvas.height + 2);
    
        drawGrid();
        // Its okay to draw things to the screen while not paused because they won't be updated
        apple.draw();
        snake.draw();

        if (gamePaused) {
            // Draw Text on screen
            ctx.font = '36px Serif';
            ctx.fillStyle = "#FFFFFF"; // white
            ctx.fillText("Paused", gameCanvas.width / 2, gameCanvas.height / 2);
        }

    }
}