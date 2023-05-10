function setup() {
    createCanvas(500, 500);
  }
  
  function draw() {
    background(255);
    drawboard(8, 50, 50, 400);
  }
  
  function drawboard(n, x, y, size) {
    const squareSize = size / n;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        const xPos = x + j * squareSize;
        const yPos = y + i * squareSize;
        if ((i + j) % 2 === 0) { // sum is even then
          fill(255);
        } else {
          fill(0);
        }
        rect(xPos, yPos, squareSize, squareSize);
      }
    }
  }
  