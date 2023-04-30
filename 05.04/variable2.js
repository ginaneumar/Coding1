let x;
let y;
let z;
let dx;
let dy;
let speed;

function setup() {
  createCanvas(800,800);
  x = 300;
  y = 500;
  z = false;
  dx = 1;
  dy = 1;
  speed = 3;
} 

function draw() {
  background(220);
  fill(255);
  ellipse(x, y, 200, 200);
  fill(0);
  //eyes
  ellipse(x- 30, y - 30, 30, 30);//left eye
  ellipse(x + 30, y - 30, 30, 30);//right eye
  rectMode(CENTER);
  //mouth
  rect(x, y + 30, 100, 20);
  
  // Update position of circle if it's not under the mouse
  if (dist(mouseX, mouseY, x, y) > 100) {
    x += dx * speed;
    y += dy * speed;
  
    // Change the direction of the circle if it reaches the edge of canvas
    if (x < 0 || x > width) {
      dx = -dx;
    }
    if (y < 0 || y > height) {
      dy = -dy;
    }
  }
}

function mouseMoved() {
  // Change the speed of the circle if the mouse is over it
  if (dist(mouseX, mouseY, x, y) < 100) {
    speed = 10;
  } else {
    speed = 3;
  }
}

//doesnt work properly how i want it, but its okay. 
