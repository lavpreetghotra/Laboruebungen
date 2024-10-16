const canvas = document.getElementById("polygonCanvas");
const ctx = canvas.getContext("2d");
let vertices = [];
let isDrawing = false;

// Farbe und Linienbreite aus den Steuerelementen
const colorPicker = document.getElementById("colorPicker");
const lineWidthInput = document.getElementById("lineWidth");

// Fangen Sie an, ein Polygon zu zeichnen, indem Sie auf das Canvas klicken
canvas.addEventListener("click", (event) => {
    const x = event.offsetX;
    const y = event.offsetY;
    
    if (!isDrawing) {
        isDrawing = true;
    }
    
    vertices.push({ x, y });
    
    if (vertices.length > 1) {
        ctx.beginPath();
        ctx.moveTo(vertices[vertices.length - 2].x, vertices[vertices.length - 2].y);
        ctx.lineTo(x, y);
        ctx.strokeStyle = colorPicker.value;
        ctx.lineWidth = lineWidthInput.value;
        ctx.stroke();
    }
});

// Zeichne das Polygon fertig, wenn die rechte Maustaste gedrückt wird
canvas.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    if (vertices.length > 2) {
        ctx.beginPath();
        ctx.moveTo(vertices[vertices.length - 1].x, vertices[vertices.length - 1].y);
        ctx.lineTo(vertices[0].x, vertices[0].y);
        ctx.stroke();
        isDrawing = false;
    }
});

// Füllen Sie das Polygon mit dem Scanline-Algorithmus
document.getElementById("fillPolygon").addEventListener("click", () => {
    if (vertices.length < 3) return; // Ein Polygon muss mindestens 3 Eckpunkte haben

    ctx.fillStyle = colorPicker.value;

    // Einfacher Scanline-Algorithmus zum Füllen des Polygons
    const scanlineFill = (vertices) => {
        let minY = Math.min(...vertices.map(v => v.y));
        let maxY = Math.max(...vertices.map(v => v.y));

        for (let y = minY; y <= maxY; y++) {
            let intersections = [];
            for (let i = 0; i < vertices.length; i++) {
                let v1 = vertices[i];
                let v2 = vertices[(i + 1) % vertices.length];
                
                if (v1.y < y && v2.y >= y || v2.y < y && v1.y >= y) {
                    let x = v1.x + ((y - v1.y) * (v2.x - v1.x)) / (v2.y - v1.y);
                    intersections.push(x);
                }
            }

            intersections.sort((a, b) => a - b);

            for (let i = 0; i < intersections.length; i += 2) {
                if (intersections[i + 1]) {
                    ctx.beginPath();
                    ctx.moveTo(intersections[i], y);
                    ctx.lineTo(intersections[i + 1], y);
                    ctx.strokeStyle = ctx.fillStyle;
                    ctx.stroke();
                }
            }
        }
    };

    scanlineFill(vertices);
    vertices = []; // Nach dem Füllen zurücksetzen
});
