const canvas = document.getElementById("systemCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 600;

// Parameter für das Sonnensystem
const SUN_RADIUS_PROPORTION = 0.2;
const EARTH_RADIUS_PROPORTION = 0.25 * SUN_RADIUS_PROPORTION;
const MOON_RADIUS_PROPORTION = 0.25 * EARTH_RADIUS_PROPORTION;
const EARTH_SUN_DISTANCE_PROPORTION_SCREEN = 0.4;
const MOON_EARTH_DISTANCE_PROPORTION_SCREEN = 0.1;

let animationFrame;
let running = false;

const sun = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: SUN_RADIUS_PROPORTION * canvas.width,
    color: 'yellow'
};

// Berechnung: 1 Umlauf der Erde in 60 Sekunden (365 Tage)
const earthOrbit = {
    radius: EARTH_SUN_DISTANCE_PROPORTION_SCREEN * canvas.width,
    angle: 0,
    speed: (2 * Math.PI) / 3600 // 365 Tage in 60 Sekunden
};

// Berechnung: 1 Umlauf des Mondes in 27 Tagen (entspricht 0.164 Sekunden in der Animation)
const moonOrbit = {
    radius: MOON_EARTH_DISTANCE_PROPORTION_SCREEN * canvas.width,
    angle: 0,
    speed: (2 * Math.PI) / (7000 / 27) // Mond in 27 Tagen = 60 / 365 * 27 Sekunden
};

function drawCircle(x, y, radius, color) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawEarth(x, y, radius, sunX, sunY) {
    const angleToSun = Math.atan2(sunY - y, sunX - x);
    const gradient = ctx.createLinearGradient(
        x + radius * Math.cos(angleToSun), 
        y + radius * Math.sin(angleToSun), 
        x - radius * Math.cos(angleToSun), 
        y - radius * Math.sin(angleToSun)
    );
    gradient.addColorStop(0, 'yellow');
    gradient.addColorStop(1, 'blue');

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
}

function isMoonInShadow(earthX, earthY, moonX, moonY, sunX, sunY) {
    const earthToSunAngle = Math.atan2(sunY - earthY, sunX - earthX);
    const earthToMoonAngle = Math.atan2(moonY - earthY, moonX - earthX);
    const angleDifference = Math.abs(earthToSunAngle - earthToMoonAngle);
    return angleDifference < Math.PI / 6; // Beispielwert für den Schattenbereich
}

function drawSystem() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Sonne zeichnen
    drawCircle(sun.x, sun.y, sun.radius, sun.color);

    // Erde umkreist die Sonne
    const earthX = sun.x + earthOrbit.radius * Math.cos(earthOrbit.angle);
    const earthY = sun.y + earthOrbit.radius * Math.sin(earthOrbit.angle);
    drawEarth(earthX, earthY, EARTH_RADIUS_PROPORTION * canvas.width, sun.x, sun.y);

    // Mond umkreist die Erde
    const moonX = earthX + moonOrbit.radius * Math.cos(moonOrbit.angle);
    const moonY = earthY + moonOrbit.radius * Math.sin(moonOrbit.angle);
    const moonColor = isMoonInShadow(earthX, earthY, moonX, moonY, sun.x, sun.y) ? 'black' : 'gray';
    drawCircle(moonX, moonY, MOON_RADIUS_PROPORTION * canvas.width, moonColor);

    // Update der Winkel für die nächste Zeichnung
    earthOrbit.angle += earthOrbit.speed;
    moonOrbit.angle += moonOrbit.speed;

    if (running) {
        animationFrame = requestAnimationFrame(drawSystem);
    }
}

document.getElementById("startBtn").addEventListener("click", function() {
    if (!running) {
        running = true;
        drawSystem();
    }
});

document.getElementById("stopBtn").addEventListener("click", function() {
    running = false;
    cancelAnimationFrame(animationFrame);
});