
/** Constants for the game */
// Constant variables for movement control
var XMOVE = 101;
var YMOVE = 83;

// Initial start position of player
var PSTARTX = 202;
var PSTARTY = 375;

// Boundary of player so it stays on grass or stone
var MINPX = 0;
var MINPY = 43;
var MAXPX = 404;
var MAXPY = 375;

// Offset pixels for player sprite
var POFFSETX = 50;
var POFFSETY = 60;

// Start and end X-coord for enemy
var ENEMYEND = 505;
var ENEMYSTART = -100;

// Offset pixels for enemy sprite
var EOFFSETX = 70;
var EOFFSETY = 2;

// Maximum number of enemies in game
var MAXENEMIES = 4;

// Score variables
var score = 0;
var highScore = 0;

// Array of bug enemies
var allEnemies = [];

/**
* @description Enemy instance for the game
* @constructor
*/
var Enemy = function() {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // Call the reset function to set speed and initial position
    this.reset();
};

/**
* @description Update the enemy's position, required method for game
* @param (number} dt - a time delta between ticks
*/
Enemy.prototype.update = function(dt) {
    // Movement multiplied by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    // Reset enemy when it reaches the end of the screen
    if (this.x >= ENEMYEND) {
        this.reset();
    }
    // Collision detected if enemy is same row as player AND the left
    // and right sides of enemy and player are within bounds
    // Reset player and score if there is a collision
    if (player.y == (this.y - EOFFSETY)) {
        if (((player.x <= (this.x + EOFFSETX)) && (player.x >= this.x)) || (((player.x + POFFSETX) >= this.x) && (player.x<= this.x))) {
            score = 0;
            player.reset();
        }
    }
};

/**
* @description Reset/initiate enemy position and speed
*/
Enemy.prototype.reset = function() {
    this.x = ENEMYSTART; // return enemy to the left side
    // Put enemy in random paved row
    var randomrow = generateRandom(0,3);
    this.y = 45 + randomrow * YMOVE;
    // Set random speed for enemy
    this.speed = generateRandom(2,9) * 50;
};

/**
* @description Draw the enemy on the screen, required method for game
*/
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
* @description Player instance for the game
* @constructor
*/
var Player = function() {
    // The image/sprite for our player, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
    // Call the reset function to set start position
    this.reset();
};

/**
* @description Required in game engine. Intentionally empty
*/
Player.prototype.update = function() {};

/**
* @description Place player at start position and refresh score
*/
Player.prototype.reset = function() {
    this.x = PSTARTX;
    this.y = PSTARTY;
    $("span#score").text(score.toString());
    $("span#highScore").text(highScore.toString());
};

/**
* @description Draw the player on the screen, required method for game
*/
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
* @description Input handler for the player
* @param {string} keyInput, one of four directions for character movement,
* one of five choices to change player character sprite
*/
Player.prototype.handleInput = function(keyInput) {
    switch (keyInput) {
        // Move player left unless at left-most edge
        case 'left':
            this.x = (this.x != MINPX) ? this.x - XMOVE : this.x;
            break;
        // If upward movements reaches river, reset player position
        // to start and update score. Otherwise, move player up.
        case 'up':
            if (this.y == MINPY) {
                score = score + 1; // increase score
                // update highScore if new score is higher
                highScore = (score > highScore) ? score: highScore;
                this.reset();
            }
            else {
                this.y = this.y - YMOVE;
            }
            break;
        // Move player right unless at right-most edge
        case 'right':
            this.x = (this.x != MAXPX) ? this.x + XMOVE : this.x;
            break;
        // Move player down unless at bottom-most edge
        case 'down':
            this.y = (this.y != MAXPY) ? this.y + YMOVE : this.y;
            break;
        // Change player sprite
        case 'boy':
            this.sprite = 'images/char-boy.png';
            break;
        case 'cat-girl':
            this.sprite = 'images/char-cat-girl.png';
            break;
        case 'horn-girl':
            this.sprite = 'images/char-horn-girl.png';
            break;
        case 'pink-girl':
            this.sprite = 'images/char-pink-girl.png';
            break;
        case 'princess-girl':
            this.sprite = 'images/char-princess-girl.png';
            break;
    }

};

/**
* @description Random whole number generator between two parameters
* @param {number} x
* @param {number} y
* @returns Random whole number between x and y
*/
function generateRandom(x,y) {
    return Math.floor(Math.random() * y + x);
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
for (i = 0; i < MAXENEMIES; i++) {
    allEnemies.push(new Enemy());
}

// Place the player object in a variable called player
var player = new Player();

/**
* @description Listen for key press for movement and char select
* sends the keys to your Player.handleInput() method
*/
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        49: 'boy',
        50: 'cat-girl',
        51: 'horn-girl',
        52: 'pink-girl',
        53: 'princess-girl'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

