var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

window.addEventListener("load",init);
document.addEventListener('keydown',move);

function init() {
	ctx.fillStyle = "black";
	ctx.fillRect(1,1,10,5);
}

function move(ev) {
	var key = ev.keyCode;
	console.log(key);
}