var UP = "87", DOWN = "83", LEFT = "65", RIGHT = "68", X = 6, Y = 6, xSize = 10, ySize = 10,
	mazeW = 500, mazeH = 500;
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
var xPos, yPos;
var itemPos = [100,50];

window.addEventListener("load",init);
document.addEventListener('keydown',move);

function init() {
	drawLevel();
	xPos = 6;
	yPos = 6;
	ctx.fillStyle = "blue";
	ctx.fillRect(xPos,yPos,xSize,ySize);
}

function clear() {
	ctx.clearRect(0,0,mazeW,mazeH);
}

function drawLevel() {
	var img = document.getElementById("maze");
	ctx.drawImage(img,0,0,mazeW,mazeH);
}

function isWall(delX, delY) {
	var imgData = ctx.getImageData(xPos+delX, yPos+delY, xSize, ySize);
	var data = imgData.data;
	var wall = 0;
	if (xPos+delX >= 0 && xPos+delX < mazeW && 
		yPos+delY >= 0 && yPos+delY < mazeH) {
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
		var wall = isWall(delX,delY);
		if (wall == 0) {
		clear();
		drawLevel();
		ctx.fillStyle = "blue";
		xPos = xPos+delX;
		yPos = yPos+delY;
		ctx.fillRect(xPos,yPos,xSize,ySize);
		if (itemPos[0] >= xPos-X && itemPos[0] <= xPos+X 
			&& itemPos[1] >- yPos-Y && itemPos[1] <= yPos+Y) {
			var data = document.getElementById("data-item");
			data.setAttribute("data-item","item stuff");
		}
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