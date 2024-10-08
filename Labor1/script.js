window.onload = function() {
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');
    
    // Title text
    ctx.font = '25px Roboto bolder';
    ctx.fillStyle = 'green';
    ctx.strokeStyle = 'black';
    ctx.fillText('My first Canvas 2D Drawing', 90, 40); 

    // Draw house body
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.strokeRect(90, 150, 120, 100);

    // Draw door
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.fillRect(130, 200, 30, 50);
    ctx.strokeRect(130, 200, 30, 50);

    // Draw small rectangle inside door
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.fillRect(140, 215, 10, 15);
    ctx.strokeRect(140, 215, 10, 15);

    // Draw window
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeRect(175, 160, 25, 15);

    // Draw roof
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(75, 150);
    ctx.lineTo(150, 80);
    ctx.lineTo(225, 150);
    ctx.closePath();
    ctx.lineWidth = 5;
    ctx.stroke();
    
    // Draw tree trunk
    ctx.fillStyle = 'brown';
    ctx.fillRect(280, 150, 10, 100);

    // Draw tree top with four circles (oben, links, rechts, unten)
    ctx.fillStyle = 'green';
    ctx.strokeStyle = 'green';
    
    // Oberer Kreis
    ctx.beginPath();
    ctx.arc(285, 135, 30, 0, Math.PI * 2, true);
    ctx.fill();
    
    // Linker Kreis
    ctx.beginPath();
    ctx.arc(265, 160, 30, 0, Math.PI * 2, true);
    ctx.fill();
    
    // Rechter Kreis
    ctx.beginPath();
    ctx.arc(305, 160, 30, 0, Math.PI * 2, true);
    ctx.fill();
    
    // Unterer Kreis 
    ctx.beginPath();
    ctx.arc(285, 169, 30, 0, Math.PI * 2, true);
    ctx.fill();
    
    // Draw car body
    ctx.fillStyle = "#ADD8E6"; // Hellblau für den Innenbereich des Autos
    ctx.strokeStyle = 'blue'; // Dunkelblau für die Umrandung
    ctx.beginPath();
    ctx.moveTo(150, 300); // Startpunkt
    ctx.lineTo(150, 270); // Linke Seite des Autos
    ctx.lineTo(180, 270); // Fensterbereich
    ctx.lineTo(200, 255); // Schräge für das Dach
    ctx.lineTo(250, 260); // Rechts vom Dach
    ctx.arcTo(270, 265, 280, 400, 20); // Abgerundete Ecke hinten
    ctx.lineTo(272, 300); // Hintere Unterseite
    
    // Unterseite des Autos, mit zwei Aussparungen für die Räder
    ctx.lineTo(255, 300);
    ctx.arc(245, 300, 10, 0, Math.PI, false); // Hinterrad
    ctx.lineTo(200, 300);
    ctx.arc(180, 300, 10, 0, Math.PI, false); // Vorderrad
    ctx.lineTo(150, 300); // Schließen der Form
    
    ctx.lineWidth = 3;
    ctx.fill(); // Innenbereich des Autos füllen
    ctx.stroke(); // Umrandung zeichnen



};
