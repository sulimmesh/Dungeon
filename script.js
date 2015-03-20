var UP = "87", DOWN = "83", LEFT = "65", RIGHT = "68", X = 5, Y = 5, XSIZE = 10, YSIZE = 5;
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
var xPos, yPos;

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
	clear();
	ctx.fillStyle = "black";
	xPos = xPos+delX;
	yPos = yPos+delY;
	ctx.fillRect(xPos,yPos,XSIZE,YSIZE);
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