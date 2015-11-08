
// Constant variables for movement control
var XMOVE = 101;
var YMOVE = 83;

// Initial start position of player
var PSTARTX = 203;
var PSTARTY = 380;

// Boundary of player so it stays on grass or stone
var MINPX = 1;
var MINPY = 48;
var MAXPX = 405;
var MAXPY = 380;

// Offset pixels for player sprite
var POFFSETX = 15;
var POFFSETY = 60;

// Start and end for bug
var BUGEND = 505;
var BUGSTART = -100;

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
    if (this.x >= BUGEND) {
        this.x = BUGSTART; // return enemy to the left side
        var randomrow = generateRandom(3,0); //get a random number between 0 and 2
        this.y = 60 + randomrow * YMOVE; //put enemy in random row
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

player.prototype.update = function() {
    return true;
};

// Draw the player on the screen, required method for game
player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Input handler for the player
// Parameter: keyDirection, one of four directions for character movement
player.prototype.handleInput = function(keyDirection) {
    // Coordinates

    switch (keyDirection) {
        case 'left':
            this.x = (this.x != MINPX) ? this.x - XMOVE : this.x;
            break;
        case 'up':
            if (this.y == MINPY) {
                this.y = PSTARTY;
                this.x = PSTARTX;
            }
            else this.y = this.y - YMOVE;
            break;
        case 'right':
            this.x = (this.x != MAXPX) ? this.x + XMOVE : this.x;
            break;
        case 'down':
            this.y = (this.y != MAXPY) ? this.y + YMOVE : this.y;
            break;
    }

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var randomrow = generateRandom(3,0);//get a random number between 0 and 2
y = 60 + randomrow * YMOVE;
var enemy = new Enemy(-100,y,100)
allEnemies.push(enemy);

// Place player
var player = new player(PSTARTX, PSTARTY);

function generateRandom(x,y) {
    return Math.floor(Math.random() *x + y);
}

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

