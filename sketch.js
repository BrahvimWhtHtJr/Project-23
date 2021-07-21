let helicopterIMG, helicopterSprite, packageSprite, packageIMG;
let pkg, gnd;

const ENGINE = Matter.Engine;
const WORLD = Matter.World;
const BODIES = Matter.Bodies;
const BODY = Matter.Body;
const RUNNER = Matter.RUNNER;

function preload() {
	helicopterIMG = loadImage("helicopter.png");
	packageIMG = loadImage("package.png");
}

let boxes = [];
let cx = 0.0, cy = 0.0, scr = 0.0, qx = 0.0, qy = 0.0;
function setup() {
	createCanvas(windowWidth - 5, windowHeight - 5);
	// fullscreen(true);

	cx = width * 0.5;
	cy = height * 0.5;
	scr = width / height;
	qx = cx * 0.5;
	qy = cy * 0.5;

	engine = ENGINE.create();
	world = engine.world;

	packageBody = BODIES.circle(cx, qy + helicopterIMG.width * 0.25, 5, { restitution: 0.4, angle: QUARTER_PI, isStatic: true });
	WORLD.add(world, packageBody);
	console.log(packageBody);


	//Create a Ground
	ground = BODIES.rectangle(cx, height - height / 20, width, 50, { isStatic: true });
	WORLD.add(world, ground);

	Matter.Runner.run(engine);

	//Styling:
	rectMode(CENTER);
	ellipseMode(RADIUS);
	imageMode(CENTER);


}

let x = 0;
let s = 5;
let ifDropped = false;
function draw() {
	background(0);

	if (!ifDropped) {
		if (keyIsPressed)
			s += 0.5;
		if (keyIsDown(37)) {
			x -= s;
			Matter.Body.translate(packageBody, { x: -s, y: 0 });
		}
		if (keyIsDown(39)) {
			x += s;
			Matter.Body.translate(packageBody, { x: s, y: 0 });
		}
	}

	push();
	translate(cx, qy)
	translate(x, 0);
	scale(scr * 0.5);
	image(helicopterIMG, 0, 0);
	pop();

	// if (!(packageBody.x < cx + 225 && packageBody.x > cx - 225 && packageBody.y > qy * 0.25)) {
	if (ifDropped) {
		push();
		translate(packageBody.position.x, packageBody.position.y);
		scale(0.01953125 * 5);
		scale(scr);
		rotate(packageBody.angle);
		translate(0, -5);
		image(packageIMG, 0, 0);
		// ellipse(0, 0, 5);
		pop();
	}

	push();
	translate(cx, height - qy * 0.25);
	fill(255, 0, 0);
	rect(0, 0, 450, 20);
	pop();
}



// function windowResized() {
// 	resizeCanvas(windowWidth - 5, windowHeight - 5);
// 	// fullscreen(true);
// 	cx = width * 0.5;
// 	cy = height * 0.5;
// 	qx = cx * 0.5;
// 	qy = cy * 0.5;
// 	scr = width / height;
// }


function keyPressed() {
	if (keyCode == 40) {
		BODY.setStatic(packageBody, false);
		if (!ifDropped)
			BODY.applyForce(packageBody, { x: 0.0, y: 0.0 }, { x: random(-0.000001, 0.000001), y: random(-0.00001, 0.00001) });
		ifDropped = true;
	}
}

function keyReleased() {
	s = 5;
}