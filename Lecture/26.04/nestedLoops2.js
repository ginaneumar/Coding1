const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = 500;
const height = 500;
const size = 50;

canvas.width = width;
canvas.height = height;

for (let i = 0; i < 10; i++) { 
  for (let j = 0; j < 10; j++) { 
    const x = i * size; 
    const y = j * size; 
    const red = i * 25;
    const green = j * 25;
    const blue = 255 - (i * 25);

    ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
    ctx.beginPath();
    ctx.arc(x + size / 2, y + size / 2, size / 2, 0, 2 * Math.PI);
    ctx.fill();
  }
}

canvas.addEventListener('mousemove', event => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  const x = Math.floor(mouseX / size);
  const y = Math.floor(mouseY / size);

  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);


  ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
  ctx.beginPath();
  ctx.arc(x * size + size / 2, y * size + size / 2, size / 2, 0, 2 * Math.PI);
  ctx.fill();
});
