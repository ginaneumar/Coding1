const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = 800;
const height = 600;
const size = 50; //größe einzelner Kreise
const hoverRadius = 1; //neue Variable für Hover-Radius

canvas.width = width;
canvas.height = height;

function drawCircle(x, y, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x + size / 2, y + size / 2, size / 2, 0, 2 * Math.PI);
  ctx.fill();
}

// Funktion zum Erzeugen einer Regenbogenfarbe basierend auf dem Abstand zum Mauscursor
function rainbowColor(x, y, mouseX, mouseY) {
  const dx = x * size + size / 2 - mouseX;
  const dy = y * size + size / 2 - mouseY;
  const dist = Math.sqrt(dx*dx + dy*dy);
  const hue = dist / hoverRadius; // Farbton hängt jetzt vom Abstand zum Mauszeiger / Hover-Radius ab
  return `hsl(${hue}, 50%, 50%)`; // HSL-Farbcode wird zurückgegeben
}

// Schleife zum Zeichnen der Anfangskreise
for (let i = 0; i < 20; i++) { 
  for (let j = 0; j < 20; j++) { 
    const x = i * size; 
    const y = j * size; 
    const color = `rgb(${i * 25}, ${j * 25}, ${255 - i * 25})`; // Definieren der Anfangsfarben
    drawCircle(x, y, color);
  }
}

canvas.addEventListener('mousemove', event => { //mouse Hover event
  const rect = canvas.getBoundingClientRect(); //mausposition zum canvas
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  // Schleife zum Neuzeichnen der Kreise mit veränderter Farbe
  for (let i = 0; i < 20; i++) { 
    for (let j = 0; j < 20; j++) { 
      const x = i * size; 
      const y = j * size; 
      const color = rainbowColor(i, j, mouseX, mouseY); // Aufruf der Funktion zur Erzeugung der Regenbogenfarbe
      drawCircle(x, y, color); // Kreis zeichnen
    }
  }
});
