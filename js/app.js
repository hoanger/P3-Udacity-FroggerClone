
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
var POFFSETX = 75;
var POFFSETY = 60;

// Start and end for enemy
var ENEMYEND = 505;
var ENEMYSTART = -100;

// Offset pixels for enemy sprite
var EOFFSETX = 80;
var EOFFSETY = 2;

// Array of bug enemies
var allEnemies = [];


// Enemies our player must avoid
var Enemy = function(speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.reset();
    this.speed = speed;
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
};

// Initiate or reset enemy position
Enemy.prototype.reset = function() {
    this.x = ENEMYSTART; // return enemy to the left side
    //put enemy in random stone row
    var randomrow = generateRandom(3,0);
    this.y = 45 + randomrow * YMOVE;
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
    this.x = x;
    this.y = y;
    // The image/sprite for our player, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-cat-girl.png';
};

Player.prototype.update = function() {
    // TODO: change action to handle dead player
    var badguy = allEnemies[0];
    if (this.y == (badguy.y - EOFFSETY)) {
        //console.log("! collision course !");
        if (((this.x <= (badguy.x + EOFFSETX)) && (this.x >= badguy.x)) || (((this.x + POFFSETX) >= badguy.x) && (this.x<= badguy.x))) {
            console.log("Die jor!");
        };
    };
    console.log("No more die-----------")
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Input handler for the player
// Parameter: keyDirection, one of four directions for character movement
Player.prototype.handleInput = function(keyDirection) {
    switch (keyDirection) {
        case 'left':
            this.x = (this.x != MINPX) ? this.x - XMOVE : this.x;
            break;
        case 'up':
            if (this.y == MINPY) {
                this.y = PSTARTY;
                this.x = PSTARTX;
            }
            else {
                this.y = this.y - YMOVE;
            };
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
var enemy = new Enemy(50)
allEnemies.push(enemy);

// Place player
var player = new Player(PSTARTX, PSTARTY);

function generateRandom(x,y) {
    return Math.floor(Math.random() * x + y);
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

