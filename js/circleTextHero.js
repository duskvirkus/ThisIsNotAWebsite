// JavaScript Document

var loadCircles = true;
var renderCircles = true;
var circlesTable;
var count = 0;
var circles = [];

function preload() {
	this.circlesTable = loadTable("./js/Data/circlesTable-1.csv", "csv", "header");
}

function setup () {
	createCanvas(400, 400);
	resizeCanvas(window.innerWidth, window.innerHeight);
	//console.log("loaded");
}

function draw () {
	background(255);

	var inputX, inputY, inputR;
	var circle;
	if(this.loadCircles) {
		for(var i = 0; i < this.circlesTable.getRowCount(); i++) {
			inputX = (this.circlesTable.getNum(i, "xCol"));
			inputY = (this.circlesTable.getNum(i, "yCol"));
			inputR = (this.circlesTable.getNum(i, "rCol"));
			circle = new Circle(inputX, inputY, inputR);
			this.circles.push(circle);
		}
		this.loadCircles = false;
		console.log(millis());
	}

	if(this.renderCircles){
		//console.log("render circles!")
		background(255);
		for(var i = 0; i < this.circles.length; i++) {
			var circle = this.circles[i];
			circle.behaviors();
			circle.update();
			circle.display();
		}
	}
}
