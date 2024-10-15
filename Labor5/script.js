// Create the HTML structure dynamically
document.body.innerHTML = `
    <h1>Labor 5: Clipping mit dem Cohen-Sutherland-Algorithmus</h1>
    <div class="controls">
        <label for="colorPicker">Pen Color:</label>
        <input type="color" id="colorPicker" value="#8B0000">
        <label for="lineWidth">Pen Width:</label>
        <input type="range" id="lineWidth" min="1" max="10" value="2">
        <button id="clipBtn">Clip Line</button>
    </div>
    <div class="canvas-container">
        <canvas id="drawCanvas" width="500" height="500"></canvas>
        <div id="clippingRect"></div>
    </div>
`;

// Create and apply CSS dynamically
const style = document.createElement('style');
style.innerHTML = `
    body {
        font-family: Arial, sans-serif;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    h1 {
        margin-bottom: 10px;
    }
    .controls {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        border: 1px solid #ccc;
        padding: 10px;
        background-color: #f4f4f4;
        border-radius: 5px;
    }
    .controls label {
        margin-right: 10px;
    }
    .controls input[type="range"] {
        margin: 0 10px;
    }
    #clipBtn {
        margin-left: 10px;
        padding: 5px 10px;
        background-color: #f0f0f0;
        border: 1px solid #ccc;
        border-radius: 3px;
        cursor: pointer;
    }
    #clipBtn:hover {
        background-color: #ddd;
    }
    .canvas-container {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        margin-bottom: 20px;
    }
    canvas {
        border: 2px solid black;
    }
    #clippingRect {
        position: absolute;
        top: 100px;
        left: 100px;
        width: 300px;
        height: 300px;
        border: 2px solid black;
        background-color: rgba(255, 255, 255, 0.5);
        pointer-events: none;
    }
`;
document.head.appendChild(style);

// Canvas and drawing logic
const canvas = document.getElementById('drawCanvas');
const ctx = canvas.getContext('2d');
let drawing = false;
let startX = 0;
let startY = 0;
let endX = 0;
let endY = 0;
let color = '#8B0000';
let lineWidth = 2;

// Cohen-Sutherland algorithm boundaries
const clipBounds = { left: 100, right: 400, top: 100, bottom: 400 };

// Mouse events for drawing
canvas.addEventListener('mousedown', (e) => {
    drawing = true;
    startX = e.offsetX;
    startY = e.offsetY;
});

canvas.addEventListener('mousemove', (e) => {
    if (!drawing) return;
    endX = e.offsetX;
    endY = e.offsetY;
    redrawCanvas();
    drawLine(startX, startY, endX, endY);
});

canvas.addEventListener('mouseup', () => {
    drawing = false;
});

document.getElementById('colorPicker').addEventListener('input', (e) => {
    color = e.target.value;
});

document.getElementById('lineWidth').addEventListener('input', (e) => {
    lineWidth = e.target.value;
});

// Redraw the canvas
function redrawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeRect(clipBounds.left, clipBounds.top, 300, 300); // Clipping area
}

// Draw the line on the canvas
function drawLine(x1, y1, x2, y2) {
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

// Cohen-Sutherland Clipping Algorithm
function cohenSutherlandClip(x1, y1, x2, y2) {
    const INSIDE = 0; // 0000
    const LEFT = 1;   // 0001
    const RIGHT = 2;  // 0010
    const BOTTOM = 4; // 0100
    const TOP = 8;    // 1000

    // Function to compute the region code for a point (x, y)
    function computeOutCode(x, y) {
        let code = INSIDE;
        if (x < clipBounds.left) {
            code |= LEFT;
        } else if (x > clipBounds.right) {
            code |= RIGHT;
        }
        if (y < clipBounds.top) {
            code |= TOP;
        } else if (y > clipBounds.bottom) {
            code |= BOTTOM;
        }
        return code;
    }

    let outCode1 = computeOutCode(x1, y1);
    let outCode2 = computeOutCode(x2, y2);
    let accept = false;

    while (true) {
        if (!(outCode1 | outCode2)) {
            // Both endpoints are inside the clip area
            accept = true;
            break;
        } else if (outCode1 & outCode2) {
            // Both endpoints share an outside region, trivially reject
            break;
        } else {
            // At least one endpoint is outside the clip area
            let outCodeOut = outCode1 ? outCode1 : outCode2;
            let x, y;

            if (outCodeOut & TOP) {
                x = x1 + (x2 - x1) * (clipBounds.top - y1) / (y2 - y1);
                y = clipBounds.top;
            } else if (outCodeOut & BOTTOM) {
                x = x1 + (x2 - x1) * (clipBounds.bottom - y1) / (y2 - y1);
                y = clipBounds.bottom;
            } else if (outCodeOut & RIGHT) {
                y = y1 + (y2 - y1) * (clipBounds.right - x1) / (x2 - x1);
                x = clipBounds.right;
            } else if (outCodeOut & LEFT) {
                y = y1 + (y2 - y1) * (clipBounds.left - x1) / (x2 - x1);
                x = clipBounds.left;
            }

            if (outCodeOut === outCode1) {
                x1 = x;
                y1 = y;
                outCode1 = computeOutCode(x1, y1);
            } else {
                x2 = x;
                y2 = y;
                outCode2 = computeOutCode(x2, y2);
            }
        }
    }

    if (accept) {
        redrawCanvas();
        drawLine(x1, y1, x2, y2);
    }
}

// Button click event for clipping the line
document.getElementById('clipBtn').addEventListener('click', () => {
    cohenSutherlandClip(startX, startY, endX, endY);
});
