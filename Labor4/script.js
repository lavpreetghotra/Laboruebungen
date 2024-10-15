function drawPixel(ctx, x, y) {
    ctx.fillStyle = 'black';
    ctx.fillRect(x, y, 1, 1);
}

function drawAxes(ctx, width, height) {
    ctx.beginPath();
    ctx.strokeStyle = 'gray';
    
    // X-Achse (horizontal) durch die Mitte
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    
    // Y-Achse (vertikal) durch die Mitte
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    
    ctx.stroke();
    
    // Achsenbeschriftung
    ctx.fillStyle = 'black';
    ctx.font = '14px Arial';

    // X-Achse beschriften (rechts am Rand)
    ctx.fillText('x', width - 10, height / 2 - 10);
    
    // Y-Achse beschriften (oben am Rand)
    ctx.fillText('y', width / 2 + 10, 10);
}

function bresenhamLine(ctx, x1, y1, x2, y2) {
    let dx = Math.abs(x2 - x1);
    let dy = Math.abs(y2 - y1);
    let sx = (x1 < x2) ? 1 : -1;
    let sy = (y1 < y2) ? 1 : -1;
    let err = dx - dy;

    while (true) {
        // Pixel im mittig verschobenen Koordinatensystem zeichnen
        drawPixel(ctx, x1 + 200, 200 - y1);  // x1 nach rechts, y1 nach oben
        if (x1 === x2 && y1 === y2) break;
        let e2 = 2 * err;
        if (e2 > -dy) {
            err -= dy;
            x1 += sx;
        }
        if (e2 < dx) {
            err += dx;
            y1 += sy;
        }
    }
}

document.getElementById('drawLine').addEventListener('click', function() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Canvas löschen

    // Achsen erneut zeichnen
    drawAxes(ctx, canvas.width, canvas.height);

    let x1 = parseInt(document.getElementById('x1').value);
    let y1 = parseInt(document.getElementById('y1').value);
    let x2 = parseInt(document.getElementById('x2').value);
    let y2 = parseInt(document.getElementById('y2').value);

    if (!isNaN(x1) && !isNaN(y1) && !isNaN(x2) && !isNaN(y2)) {
        bresenhamLine(ctx, x1, y1, x2, y2);
    } else {
        alert("Bitte geben Sie gültige Zahlen ein.");
    }
});

// Beim Laden der Seite Achsen zeichnen
window.onload = function() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    // Achsen zeichnen
    drawAxes(ctx, canvas.width, canvas.height);
};
    