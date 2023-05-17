function grid(numX, numY, size) {
    const canvas = document.createElement("canvas");
    canvas.width = numX * size;
    canvas.height = numY * size;
    document.body.appendChild(canvas);
  
    const ctx = canvas.getContext("2d");
  
    for (let i = 0; i < numY; i++) {
      for (let j = 0; j < numX; j++) {
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc((j + 0.5) * size, (i + 0.5) * size, size / 2, 0, 2 * Math.PI);
        ctx.fill();
      }
    }
  }
  
  // Example usage
  grid(10, 30, 20);
  