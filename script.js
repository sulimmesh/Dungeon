var UP = "87", DOWN = "83", LEFT = "65", RIGHT = "68", X = 10, Y = 5, XSIZE = 10, YSIZE = 5;
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
var xPos, yPos;
var itemPos = [100,50];

window.addEventListener("load",init);
document.addEventListener('keydown',move);

function init() {
	xPos = 1;
	yPos = 1;
	ctx.fillStyle = "black";
	ctx.fillRect(xPos,yPos,XSIZE,YSIZE);
}

function clear() {
	ctx.clearRect(0,0,300,300);
}

function reDraw(delX, delY) {
	if (xPos+delX > 0 && xPos+delX < 300 && 
		yPos+delY > 0 && yPos+delY < 150) {
		clear();
		ctx.fillStyle = "black";
		xPos = xPos+delX;
		yPos = yPos+delY;
		ctx.fillRect(xPos,yPos,XSIZE,YSIZE);
		if (itemPos[0] >= xPos-X && itemPos[0] <= xPos+X 
			&& itemPos[1] >- yPos-Y && itemPos[1] <= yPos+Y) {
			var data = document.getElementById("data-item");
			data.setAttribute("data-item","item stuff");
		}
		//making random item to pick up
		var itemX = 100;
		var itemY = 50;
		ctx.fillRect(itemX,itemY,XSIZE,YSIZE);

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