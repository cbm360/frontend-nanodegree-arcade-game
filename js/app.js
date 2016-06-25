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

    this.x += this.speed * dt;

    //Add additional enemies to make the game move difficult
    // if (this.x >= 100) {
    //     var rowOneEnemyCount = allEnemies.filter(function(item) {
    //                 return item.y == 60;
    //             }).length,
    //         rowTwoEnemyCount = allEnemies.filter(function(item) {
    //                 return item.y == 60;
    //             }).length,
    //         rowThreeEnemyCount = allEnemies.filter(function(item) {
    //                 return item.y == 60;
    //             }).length;

    //     if (rowOneEnemyCount < 2 && allEnemies.length < 4) {
    //         allEnemies.push(new Enemy(0, 45, getRandomInt(80, 200)));
    //     }
    //     if (rowTwoEnemyCount < 2 && allEnemies.length < 4) {
    //         allEnemies.push(new Enemy(0, 130, getRandomInt(80, 200)));
    //     }
    //     if (rowThreeEnemyCount < 2 && allEnemies.length < 5) {
    //         allEnemies.push(new Enemy(0, 215, getRandomInt(80, 200)));
    //     }
    // }

    //Start back at the begining when the end of the canvas is reached
    if (this.x >= 505) {
        this.x = 0;
        this.speed = getRandomInt(80, 200);
    }

    //Collision with player send player back to the begining
    // if ((Math.round(this.x) + 75 == player.x || Math.round(this.x) - 75 == player.x) && this.y == player.y) {
    //     player.y = 300;
    // }
    if (player.x >= (Math.round(this.x) - 75)
    && player.x <= (Math.round(this.x) + 75)
    && player.y == this.y) {
        player.y = 300;
    }

    //Use a random speed setting between 50 and 150
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 300;
}

Player.prototype.update = function() {
    // Reset to begining if successfully cross the road
    if (this.y == -40) {
        this.y = 300;
    }

    // Collision with enemy
    var enemyX = new Array;
    for (var i in allEnemies) {
        enemyX.push(allEnemies[i].x);
    }
    function inArray(playerX, enemyX)
    {
        var count=enemyX.length;
        for(var i = 0; i < count; i++) {
            if(Math.round(enemyX[i]) == playerX){
                //console.log('colision');
                //player.y = 300;
            }
        }
        return false;
    }
    inArray(this.x, enemyX);

}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

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
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
 allEnemies = [];

allEnemies.push(new Enemy(0, 45, 80));
allEnemies.push(new Enemy(0, 130, 125));
allEnemies.push(new Enemy(0, 215, 175));


// Place the player object in a variable called player
var player = new Player();


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
