let ampel;

function setup() {
  createCanvas(400, 400);
  ampel = 'green';
}

function draw() {
  background(0);

  if (ampel === 'red') {
    fill(255, 0, 0);
    ellipse(width / 2, height / 4, 100); //obere hälfte
  } else if (ampel === 'yellow') {
    fill(255, 255, 0);
    ellipse(width / 2, height / 2, 100); // durch 2 damit Mitte
  } else {
    fill(0, 255, 0);
    ellipse(width / 2, 3 * height / 4, 100); //untere hälfte 
  }
}

function mouseMoved() {
  if (mouseX < width / 3) { //größer als ein Drittel dann rot
    ampel = 'red';
  } else if (mouseX > 2 * width / 3) { //kleiner als ein Drittel dann grün
    ampel = 'green';
  } else { 
    ampel = 'yellow'; // sonst 
  }
}