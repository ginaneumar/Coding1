const canvas = document.querySelector('canvas');
      const ctx = canvas.getContext('2d');

      // Kreis definition
      const width = 500;
      const height = 500;
      const size = 50;

      canvas.width = width;
      canvas.height = height;

      for (let i = 0; i < 10; i++) { // 10x10 Matrix
        for (let j = 0; j < 10; j++) { // i und j, um jede Position in der Matrix abzudecken.
          const x = i * size; // x koordinaten jedes Kreises
          const y = j * size; // y koordinaten jedes Kreises
          const red = i * 25;
          const green = j * 25;
          const blue = 255 - (i * 25);

          ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
          // setzt die Füllfarbe des Kontextobjekts auf die zuvor berechnete RGB-Farbe.
          ctx.beginPath();
          ctx.arc(x + size / 2, y + size / 2, size / 2, 0, 2 * Math.PI); // Kreise zeichnen
          ctx.fill();
        }
      }
