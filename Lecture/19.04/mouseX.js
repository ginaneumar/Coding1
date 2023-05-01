let num;

function setup() {
  num = 1; 
  createCanvas(800,300); 
  textAlign(CENTER,CENTER);
}

function draw() {
  if (mouseX < 400) {
    background(237,34,93); //red
  } else {
    background(23,34,93); //blue
  }
  
  textSize(48);
  textAlign(CENTER, CENTER);
  if(mouseX > 400){
    ellipse(400,150,150);
    //text("FIRST C TRUE", width/2, height/2);
  } else if(mouseX > 200) {
    rect(300, 100, 150);
    //text("SECOND C TRUE", width/2, height/2);
  } else {
    background(0,128,255);
    strokeWeight(4);
    stroke(0);
    line(width/2, 0, width/2, height);
    line(0, height/2, width, height/2);
    fill(255);
    textSize(60);
    //text("FALSE",width/2, height/2)
  }
}
