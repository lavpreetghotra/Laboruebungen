// Function to implement Bresenham's Line Algorithm
function drawLine(x1, y1, x2, y2) {
    const canvas = document.getElementById('bresenhamCanvas');
    const ctx = canvas.getContext('2d');

    // Clear the canvas before each new drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Convert coordinates to canvas system where the origin is in the center
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    x1 = Math.floor(x1) + centerX;
    y1 = centerY - Math.floor(y1); // Reverse Y to match typical coordinate system
    x2 = Math.floor(x2) + centerX;
    y2 = centerY - Math.floor(y2);

    // Bresenham's algorithm
    const dx = Math.abs(x2 - x1);
    const dy = Math.abs(y2 - y1);
    const sx = (x1 < x2) ? 1 : -1;
    const sy = (y1 < y2) ? 1 : -1;
    let err = dx - dy;

    while (true) {
        ctx.fillRect(x1, y1, 1, 1); // Draw pixel at (x1, y1)

        if (x1 === x2 && y1 === y2) break;
        const e2 = 2 * err;
        if (e2 > -dy) {
            err -= dy;
            x1 += sx;
        }
        if (e2 < dx) {
            err += dx;
            y1 += sy;
        }
    }

    // Draw the axes for better visualization
    drawAxes();
}

// Function to draw the axes on the canvas
function drawAxes() {
    const canvas = document.getElementById('bresenhamCanvas');
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Draw x-axis
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(canvas.width, centerY);
    ctx.strokeStyle = 'black';
    ctx.stroke();

    // Draw y-axis
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, canvas.height);
    ctx.strokeStyle = 'black';
    ctx.stroke();
}

// Event listener for the draw line button
document.getElementById('drawLineButton').addEventListener('click', function() {
    const x1 = parseInt(document.getElementById('x1').value);
    const y1 = parseInt(document.getElementById('y1').value);
    const x2 = parseInt(document.getElementById('x2').value);
    const y2 = parseInt(document.getElementById('y2').value);

    drawLine(x1, y1, x2, y2);
});

// Initialize canvas with axes
drawAxes();
