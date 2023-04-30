function setup() {
    createCanvas(400, 400);
  }
  
  function draw() {
    background(220);
    
    let centerX = width / 2;
    let centerY = height / 2;
    
    rect(centerX - 35, centerY - 30, 70, 60);
    rect(centerX - 15, centerY + 10, 30, 10);
    circle(centerX - 20, centerY, 20);
    circle(centerX + 10, centerY, 20);
  }