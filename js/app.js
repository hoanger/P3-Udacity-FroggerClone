
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

// Start and end for enemy
var ENEMYEND = 505;
var ENEMYSTART = -100;

// Offset pixels for enemy sprite
var EOFFSETX = 70;
var EOFFSETY = 2;

// Maximum number of enemies in game
var MAXENEMIES = 4;

// Array of bug enemies
var allEnemies = [];


// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.reset();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    if (this.x >= ENEMYEND) {
        this.reset();
    }
    // Collision detected if enemy is same row as player AND the left and right sides of enemy and player are within bounds
    if (player.y == (this.y - EOFFSETY)) {
        if (((player.x <= (this.x + EOFFSETX)) && (player.x >= this.x)) || (((player.x + POFFSETX) >= this.x) && (player.x<= this.x))) {
            console.log("Game Over");
            player.reset();
        }
    }
};

// Initiate or reset enemy position
Enemy.prototype.reset = function() {
    this.x = ENEMYSTART; // return enemy to the left side
    //put enemy in random stone row
    var randomrow = generateRandom(0,3);
    this.y = 45 + randomrow * YMOVE;
    this.speed = generateRandom(2,9) * 50;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.reset();
    // The image/sprite for our player, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {};

Player.prototype.reset = function() {
    this.x = PSTARTX;
    this.y = PSTARTY;
    console.log('Go!');
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Input handler for the player
// Parameter: keyDirection, one of four directions for character movement
Player.prototype.handleInput = function(keyInput) {
    switch (keyInput) {
        case 'left':
            this.x = (this.x != MINPX) ? this.x - XMOVE : this.x;
            break;
        case 'up':
            if (this.y == MINPY) {
                console.log("Winner winner chicken dinner");
                this.y = PSTARTY;
                this.x = PSTARTX;
            }
            else {
                this.y = this.y - YMOVE;
            }
            break;
        case 'right':
            this.x = (this.x != MAXPX) ? this.x + XMOVE : this.x;
            break;
        case 'down':
            this.y = (this.y != MAXPY) ? this.y + YMOVE : this.y;
            break;
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

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
for (i = 0; i < MAXENEMIES; i++) {
    allEnemies.push(new Enemy());
}


// Place the player object in a variable called player
var player = new Player();

function generateRandom(x,y) {
    return Math.floor(Math.random() * y + x);
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
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

