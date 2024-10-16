let scene, camera, renderer, cube;
let textureLoader = new THREE.TextureLoader();

function init() {
    // Create the scene
    scene = new THREE.Scene();

    const loader = new THREE.TextureLoader();
    loader.load('eine-wueste-cartoon-hintergrund-illustrationen-fuer-kinder-cartoon-stil-ai-generiert_755721-513.jpg.avif', function(texture) {
        scene.background = texture;
    });

    // Set up the camera (FOV, aspect ratio, near and far clipping)
    camera = new THREE.PerspectiveCamera(
        75, 
        800 / 600, 
        0.1, 
        1000
    );
    camera.position.set(0, 0, 5); // Kamera-Position ändern

    // Create the WebGL renderer and attach it to the DOM
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(800, 600);
    document.getElementById('scene-container').appendChild(renderer.domElement);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    // Load the texture with the structure
    const structureTexture = textureLoader.load('newTexture1.jpg'); // Transparent structure texture

    // Create materials with the structure texture
    const materials = [
        new THREE.MeshBasicMaterial({ color: 0x000000, map: structureTexture }), // black with structure
        new THREE.MeshBasicMaterial({ color: 0xff0000, map: structureTexture }), // red with structure
        new THREE.MeshBasicMaterial({ color: 0x00ff00, map: structureTexture }), // green with structure
        new THREE.MeshBasicMaterial({ color: 0x0000ff, map: structureTexture }), // blue with structure
        new THREE.MeshBasicMaterial({ color: 0xffff00, map: structureTexture }), // yellow with structure
        new THREE.MeshBasicMaterial({ color: 0xff00ff, map: structureTexture })  // magenta with structure
    ];

    // Create the cube with different materials on each face
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);

    // Start the animation loop
    animate();
}

function animate() {
    requestAnimationFrame(animate);

    // Rotate the cube for better visibility of all faces
    cube.rotation.x += 0.05;
    cube.rotation.y += 0.02;

    renderer.render(scene, camera);
}

// Initialize the scene
init();