function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  let night = true;
  let lightsOn = false;
  let carParked = true;

  fill(255); // set color to white for the windows otherwise

  // house
  translate(50, 150);
  rect(0, 0, 200, 100);
  triangle(0, 0, 100, -50, 200, 0);

  // windows
  if (night || lightsOn) {
    // turn the lights on for the windows when it is night or the lights are on
    fill(255, 255, 0); // set color to yellow for the windows when it is night and lights are on
  } else {
    fill(255); // set color to white for the windows otherwise
  }

  translate(20, 20);
  rect(0, 0, 30, 50);
  rect(30, 0, 30, 50);
  translate(100, 0);
  rect(0, 0, 30, 50);
  rect(30, 0, 30, 50);

  fill(255); // set color to white for the windows otherwise

  resetMatrix();
  // car
  if (carParked) {
    translate(260, 220); // park the car in the garage when carParked is true
  } else {
    translate(50, 300); // otherwise, park the car outside the garage
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

  if (night || lightsOn) {
    // turn the lights on for the windows when it is night or the lights are on
    fill(255, 255, 0); // set the fill color to yellow for the headlights when it is night and lights are on
  } else {
    fill(255); // set the fill color to white for the headlights otherwise
  }
  circle(130, 10, 10);
}
