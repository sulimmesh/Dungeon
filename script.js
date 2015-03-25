var UP = "87", DOWN = "83", LEFT = "65", RIGHT = "68", X = 6, Y = 6, xSize = 10, ySize = 10,
	mazeW = 500, mazeH = 500;
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
var xPos, yPos;
var zombieArray = [];

//zombie object
function zombie(zombieX, zombieY) {
	this.X = zombieX;
	this.Y = zombieY;
}


//var itemPos = [100,50];

window.addEventListener("load",init);
document.addEventListener('keydown',move);

function init() {
	drawLevel();
	genZombie();
	xPos = 6;
	yPos = 6;
	ctx.fillStyle = "blue";
	ctx.fillRect(xPos,yPos,xSize,ySize);
	var zombieInterval = setInterval(moveZombie, 1500);
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

function drawPlayer(xPos,yPos) {
	ctx.fillStyle = "blue";
	ctx.fillRect(xPos,yPos,xSize,ySize);
}

function drawZombie(zombie) {
	ctx.fillStyle = "green";
	ctx.fillRect(zombie.X,zombie.Y,xSize,ySize);
}

function genZombie() {
	var count = 0;
	var imgData = ctx.getImageData(0,0,mazeW,mazeH);
	var data = imgData.data;
	while (count < 5) {
		var randomX = Math.floor(Math.random() * (501-100)) + 100;
		var randomY = Math.floor(Math.random() * (501-100)) + 100;
		var wall = isWall(randomX, randomY);
		if (wall == 0) {
			count++;
			//console.log(randomX, randomY);
			var newZombie = new zombie(randomX, randomY);
			zombieArray[zombieArray.length] = newZombie;
		}
	}

	for (var i = 0; i < zombieArray.length; i++) {
		drawZombie(zombieArray[i]);
	}
}

function moveZombie() {
	var delX, delY, wall, targetX, targetY;
	clearZombie();
	drawLevel();
	drawPlayer(xPos,yPos);
	for (var i = 0; i < zombieArray.length; i++) {
		var newDir = Math.floor(Math.random() * (4-1) + 1);
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
			drawZombie(zombieArray[i]);
		} else {
			drawZombie(zombieArray[i]);
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
		var targetX = delX+xPos;
		var targetY = delY+yPos;
		var wall = isWall(targetX,targetY);
		if (wall == 0) {
		clear();
		drawLevel();
		for (var i = 0; i < zombieArray.length; i++) {
			drawZombie(zombieArray[i]);
		}
		xPos = targetX;
		yPos = targetY;
		drawPlayer(xPos,yPos);
		/* if (itemPos[0] >= xPos-X && itemPos[0] <= xPos+X 
			&& itemPos[1] >- yPos-Y && itemPos[1] <= yPos+Y) {
			var data = document.getElementById("data-item");
			data.setAttribute("data-item","item stuff");
		} */
		//making random item to pick up
		/*var itemX = 100;
		var itemY = 50;
		ctx.fillRect(itemX,itemY,XSIZE,YSIZE);*/	
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
