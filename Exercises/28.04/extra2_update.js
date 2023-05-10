function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  let time = hour(); // get the current hour of the simulation time

  //  if it is day or night based on the simulation time
  let night = !(time >= 7 && time < 19);

  //if the lights should be on or off based on the simulation time
  let lightsOn = (time >= 6 && time < 7.5) || (time >= 16.5 && time < 22);

  // if the car should be parked or not based on the simulation time
  let carParked = (time >= 17 && time < 19);

  fill(255); // set color to white for the windows 

  // house
  translate(50, 150);
  rect(0, 0, 200, 100);
  triangle(0, 0, 100, -50, 200, 0);

  // windows
  if (!night || lightsOn) {
    // turn the lights on for the windows when it is not day or the lights are on
    fill(255, 255, 0);
  } else {
    fill(255);
  }
  translate(20, 20);
  rect(0, 0, 30, 50);
  rect(30, 0, 30, 50);
  translate(100, 0);
  rect(0, 0, 30, 50);
  rect(30, 0, 30, 50);

  fill(255); // set color to white for the windows 

  resetMatrix();
  // car
  if (carParked) {
    translate(260, 220); // park the car in the garage when carParked is true
  } else {
    // otherwise, use the car to go to work
    translate(50, 300);
  }
  beginShape();
  vertex(0, 0);
  vertex(20, 0);
  vertex(30, -30);
  vertex(100, -30);
  vertex(110, 0);
  vertex(130, 0);
  vertex(130, 20);
  vertex(0, 20);
  endShape(CLOSE);

  circle(30, 20, 20);
  circle(100, 20, 20);

  if (!night || lightsOn) {
    // turn the lights on when it is not day or the lights are on
    fill(255, 255, 0);
  } else {
    fill(255);
  }
  circle(130, 10, 10);
}
