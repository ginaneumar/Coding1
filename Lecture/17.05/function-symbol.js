const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

function drawMoon() {
  const moonRadius = Math.min(width, height) * 0.4;
  const moonCenterX = width / 2;
  const moonCenterY = height / 2;

  // Full moon
  ctx.beginPath();
  ctx.arc(moonCenterX, moonCenterY, moonRadius, 0, Math.PI * 2);
  ctx.fillStyle = "rgb(255, 255, 255)";
  ctx.fill();
  ctx.closePath();

  // Texture
  const textureRadius = moonRadius * 0.8;
  const numDots = 100; // Adjust the number of dots for slower animation
  const dotSize = 2;

  for (let i = 0; i < numDots; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.random() * textureRadius;
    const x = moonCenterX + radius * Math.cos(angle);
    const y = moonCenterY + radius * Math.sin(angle);
    const grayShade = Math.floor(Math.random() * 60) + 195; // Random shade of gray

    ctx.beginPath();
    ctx.arc(x, y, dotSize, 0, Math.PI * 2);
    ctx.fillStyle = `rgb(${grayShade}, ${grayShade}, ${grayShade})`;
    ctx.fill();
    ctx.closePath();
  }
}

function drawStars() {
  for (let i = 0; i < 80; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const radius = Math.random() * 2;

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fill();
    ctx.closePath();
  }
}

function animate() {
  ctx.fillStyle = "rgb(0, 0, 30)";
  ctx.fillRect(0, 0, width, height);

  drawMoon();
  drawStars();

  requestAnimationFrame(animate);
}

animate();
