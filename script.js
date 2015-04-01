//declaring direction and maze variables
var UP = "87", DOWN = "83", LEFT = "65", RIGHT = "68", X = 6, Y = 6, xSize = 10, ySize = 10,
	mazeW = 500, mazeH = 500;
//declaring the canvas
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
//declaring the player positioning
var xPos, yPos, player;
//declaring the intervals that will be used here
var walkInterval, genInterval, dataInterval;
//the zombie array
var zombieArray = [];
//declaring the data elements
var dataArray = [document.getElementById("data-lives"), document.getElementById("data-level"), 
	document.getElementById("data-score"), document.getElementById("data-timer")];
var timer = 0, score = 0;

//zombie object
function Zombie(zombieX, zombieY) {
	this.X = zombieX;
	this.Y = zombieY;
	this.drawColor = "green";
	this.direction = Math.floor(Math.random() * (4-1)) + 1;
}

//for now player is essentially the same as zombie. this will change as the game fills out
function Player(playerX, playerY) {
	this.X = playerX;
	this.Y = playerY;
	this.drawColor = "blue";
}


//var itemPos = [100,50];
//adding the event listeners
window.addEventListener("load",init);
document.addEventListener('keydown',move);

function init() {
	drawLevel();
	writeData();
	for (var i = 0; i <6; i++) {
		genZombie();
	}

	xPos = 6;
	yPos = 6;
	player = new Player(xPos,yPos);
	drawChar(player);
	walkInterval = setInterval(moveZombie, 1500);
	genInterval = setInterval(genZombie, 20000);
	dataInterval = setInterval(dataHandle, 1000);
}

function dataHandle() {
	timerTracker();
	scoreTracker();
	writeData();
}

function timerTracker() {
	timer++;
	var seconds = timer % 60; 
	var minutes = Math.floor(timer/60);
	var time;
	if (seconds > 9) {
		time = ""+minutes+":"+seconds;
	} else {
		time = ""+minutes+":0"+seconds; 
	}
	dataArray[3].setAttribute("data-item",time);
}

function scoreTracker() {

}

function writeData() {
	for (var i = 0; i < dataArray.length; i++) {
		dataArray[i].innerHTML = dataArray[i].getAttribute('data-item');
	}
}

function clear() {
	ctx.clearRect(0,0,mazeW,mazeH);
}

function clearZombie() {
	var x, y;
	for (var i = 0; i < zombieArray.length; i++) {
		x = zombieArray[i].X;
		y = zombieArray[i].Y;
		ctx.clearRect(x,y,xSize,ySize);
	}
}

function drawLevel() {
	var img = document.getElementById("maze");
	ctx.drawImage(img,0,0,mazeW,mazeH);
}

function drawChar(character) {
	ctx.fillStyle = character.drawColor;
	ctx.fillRect(character.X,character.Y,xSize,ySize);
}

function genZombie() {
	var imgData = ctx.getImageData(0,0,mazeW,mazeH);
	var data = imgData.data;
	var wall = 1;
	while(wall == 1) {
		var randomX = Math.floor(Math.random() * (501-0)) + 0;
		var randomY = Math.floor(Math.random() * (501-0)) + 0;
		wall = isWall(randomX, randomY);

		if (randomX < 100 && randomY < 100) {
			//protecting the player from zombies generating too close
			wall = 1;
		}
	}
	//console.log(randomX, randomY);
	var newZombie = new Zombie(randomX, randomY);
	zombieArray[zombieArray.length] = newZombie;
	drawChar(zombieArray[zombieArray.length-1]);
}

function moveZombie() {
	var delX, delY, wall, targetX, targetY;
	clearZombie();
	drawLevel();
	drawChar(player);
	for (var i = 0; i < zombieArray.length; i++) {
		//making a semi-random number for the new direction of the zombie
		//there is a 50% chance that the zombie will move in his old direction
		///or a 50% chance that he'll move in a new direction.
		//since this new direction also has a 1/4 chane to be the old direction
		//the actual chance of maintaining current direction is 3/4
		var randomDir = Math.floor(Math.random() * (4-1)) + 1;
		var flip = Math.floor(Math.random() * (2)) + 0;
		var dirArray = [zombieArray[i].direction, randomDir];
		var newDir = dirArray[flip];

		if (newDir == 1) {
			delX = 0;
			delY = -Y;
		} else if (newDir == 2) {
			delX = 0;
			delY = Y;
		} else if (newDir == 3) {
			delX = -X;
			delY = 0;		
		} else if (newDir == 4) {
			delX = X;
			delY = 0;
		}
		targetX = delX+zombieArray[i].X;
		targetY = delY+zombieArray[i].Y;
		wall = isWall(targetX, targetY);
		if (wall == 0) {
			zombieArray[i].X = targetX;		
			zombieArray[i].Y = targetY;
			drawChar(zombieArray[i]);
			//we only assign the new direction to the zombie if 
			//that direction is in white space
			zombieArray[i].direction = newDir;

		} else {
			//here we don't re-assign the direction, so the zombie will start
			//the next cycle with a 3/4 chance to continue moving towards the last direction
			drawChar(zombieArray[i]);
		}
	}
}

function isWall(targetX, targetY) {
	var imgData = ctx.getImageData(targetX, targetY, xSize, ySize);
	var data = imgData.data;
	var wall = 0;
	if (targetX >= 0 && targetX < mazeW && 
		targetY >= 0 && targetY < mazeH) {
		wall = 0;
	} else {
		wall = 1;
	}

	for (var i = 0; i < 4 * xSize * ySize; i += 4) {
		//console.log(data[i],data[i+1],data[i+2]);
		if (data[i] == 0 && data[i+1] == 0 && data[i+2] == 0) {
			wall = 1;
			break;
		} else {
			wall = 0;		
		}
	}
	return wall;
}

function reDraw(delX, delY) {
		var targetX = delX+player.X;
		var targetY = delY+player.Y;
		var wall = isWall(targetX,targetY);
		if (wall == 0) {
		clear();
		drawLevel();
		for (var i = 0; i < zombieArray.length; i++) {
			drawChar(zombieArray[i]);
		}
		player.X = targetX;
		player.Y = targetY;
		drawChar(player);
	}
}

function move(ev) {
	var delX, delY;
	var key = ev.keyCode;
	if (key == UP) {
		delX = 0;
		delY = -Y;
	} else if (key == DOWN) {
		delX = 0;
		delY = Y;
	} else if (key == LEFT) {
		delX = -X;
		delY = 0;		
	} else if (key == RIGHT) {
		delX = X;
		delY = 0;
	}

	if (delX != undefined && delY != undefined) {
		reDraw(delX, delY);
	}
}
