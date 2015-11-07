
// Constant variables for movement control
var XMOVE = 100;
var YMOVE = 83;

// Initial start position of player
var PSTARTX = 202;
var PSTARTY = 380;

// Offset pixels for player sprite
var POFFSETX = 15;
var POFFSETY = 60;

// Array of bug enemies
var allEnemies = [];


// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    if (this.x % canvas.width === 0) {
        this.x = 0; // return enemy to the left side
        var randomrow = generateRandom(3,0); //get a random number between 0 and 2
        this.y = 65 + randomrow * YMOVE; //put enemy in random row
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var player = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    // The image/sprite for our player, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
};

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
player.prototype.update = function() {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    return true;
};

// Draw the player on the screen, required method for game
player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Input handler for the player
// Parameter: keyDirection, one of four directions for character movement
player.prototype.handleInput = function(keyDirection) {
    switch (keyDirection) {
        case 'left':
            this.x = this.x - XMOVE;
            break;
        case 'up':
            this.y = this.y - YMOVE;
            break;
        case 'right':
            this.x = this.x + XMOVE;
            break;
        case 'down':
            this.y = this.y + YMOVE;
            break;

    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// Place player
var player = new player(PSTARTX, PSTARTY);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

