// Enemies our player must avoid
var Enemy = function(x, y, speed) {
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

    this.addEnemy(this, player.level);

    this.x += this.speed * dt;

    //Start back at the begining when the end of the canvas is reached
    if (this.x >= 505) {
        this.x = 0;
        this.speed = getRandomInt(80, 200);
    }

    this.collision();

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Add additional enemies to increase difficulty
Enemy.prototype.addEnemy = function(enemy, level){
    if (enemy.x >= (120 - (level*10)) && level > 1) {
        var rowOneEnemyCount = allEnemies.filter(function(item) {
                    return item.y == 45;
                }).length,
            rowTwoEnemyCount = allEnemies.filter(function(item) {
                    return item.y == 130;
                }).length,
            rowThreeEnemyCount = allEnemies.filter(function(item) {
                    return item.y == 230;
                }).length;

        if (allEnemies.length < level + 2) {
            if (rowThreeEnemyCount < level) {
                allEnemies.push(new Enemy(0, 215, getRandomInt((40*level), 100*level)));
            }
            if (rowTwoEnemyCount < level) {
                allEnemies.push(new Enemy(0, 130, getRandomInt((40*level), 200*level)));
            }
            if (rowOneEnemyCount < level) {
                allEnemies.push(new Enemy(0, 45, getRandomInt((40*level), 200*level)));
            }
        }
    }
};

// If enemy collides with player, send player back to the begining
Enemy.prototype.collision = function() {
    if (player.x >= (Math.round(this.x) - 70) &&
        player.x <= (Math.round(this.x) + 70) &&
        player.y == this.y) {
        player.y = 300;
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 300;
    this.score = 0;
    this.level = 1;
};

Player.prototype.update = function() {

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(input) {
    //Allow player to move in all 4 directions within the board
    if (input == 'left' && this.x > 0) {
        this.x -= 100;
    }
    if (input == 'up' && this.y > 0) {
        this.y -= 85;
    }
    if (input == 'right' && this.x < 400) {
        this.x += 100;
    }
    if (input == 'down' && this.y < 350) {
        this.y += 85;
    }

    player.win();
};

Player.prototype.win = function() {
    // Player scores 1 point every time they cross the road successfully
    if (this.y == -40) {
        this.y = 300;
        this.score++;
        playerScoreElem.innerHTML = 'Score: ' + this.score;
    }

    if (this.score <= 3) {
        this.level = 1;
        playerLevelElem.innerHTML = 'Level: ' + this.level;
    }
    if (this.score > 3 && this.score <= 6) {
        this.level = 2;
        playerLevelElem.innerHTML = 'Level: ' + this.level;
    }
    if (this.score > 6 && this.score <= 9) {
        this.level = 3;
        playerLevelElem.innerHTML = 'Level: ' + this.level;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];

//Create 3 initial enemies at each y level
allEnemies.push(new Enemy(0, 45, 80));
allEnemies.push(new Enemy(0, 130, 125));
allEnemies.push(new Enemy(0, 215, 175));

//Use a random int, this is used for speed settings
var getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};

// Place the player object in a variable called player
var player = new Player();

var playerScoreElem = document.querySelector('#playerScore');
var playerLevelElem = document.querySelector('#playerLevel');

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
