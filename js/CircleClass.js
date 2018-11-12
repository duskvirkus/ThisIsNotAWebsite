// JavaScript Document

function Circle(x, y, r){
	this.x = x;
	this.y = y;
	this.r = r;
	this.target = createVector(x, y);
	this.pos = createVector(x, y);
	this.vel = p5.Vector.random2D();
	this.acc = createVector();
	this.maxSpeed = 10;
	this.maxForce = 1;
	
	this.display = function() {
		push();
		translate(width/2, height/2);
		noStroke();
		fill(12,30,68);
		ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
		pop();
	}
	
	this.update = function() {
		this.pos.add(this.vel);
		this.vel.add(this.acc);
		this.acc.mult(0);
	}
	
	this.behaviors = function() {
		var mouse = createVector(mouseX - width/2, mouseY - height/2);
		var arrive = this.arrive(this.target);
		var flee = this.flee(mouse);
		
		arrive.mult(1);
		flee.mult(5);
		
		this.applyForce(arrive);
		this.applyForce(flee);
		
	}
	
	this.applyForce = function(f) {
		this.acc.add(f);
	}
	
	this.arrive = function(target) {
		var desired = p5.Vector.sub(target, this.pos);
		var speed = this.maxSpeed;
		var dist = desired.mag();
		if (dist < 100) {
			var speed = map(dist, 0, 100, 0, this.maxSpeed);
		}
		desired.setMag(speed);
		var steer = p5.Vector.sub(desired, this.vel);
		steer.limit(this.maxForce);
		return steer;
	}
	
	this.flee = function(target) {
		var desired = p5.Vector.sub(target, this.pos);
		var dist = desired.mag();
		if(dist < width/5) {		var desired =
			desired.setMag(this.maxSpeed);
			desired.mult(-1);
			var steer = p5.Vector.sub(desired, this.vel);
			steer.limit(this.maxForce);
			return steer;
		} else {
			return createVector(0,0);
		}
	}
}