let scene, camera, renderer, cube;
let textureLoader = new THREE.TextureLoader();
let isAnimating = true;

function init() {
    // Create the scene
    scene = new THREE.Scene();

    const loader = new THREE.TextureLoader();
    loader.load('eine-wueste-cartoon-hintergrund-illustrationen-fuer-kinder-cartoon-stil-ai-generiert_755721-513.jpg.avif', function(texture) {
        scene.background = texture;
    });

    // Set up the camera
    camera = new THREE.PerspectiveCamera(45, 1, 0.3, 100);
    camera.position.set(0, 0, 5);

    // Create the WebGL renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(800, 600);
    document.getElementById('scene-container').appendChild(renderer.domElement);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    // Load the texture for the cube
    const structureTexture = textureLoader.load('newTexture1.jpg');

    // Create materials with textures for each face
    const materials = [
        new THREE.MeshBasicMaterial({ color: 0x000000, map: structureTexture }),
        new THREE.MeshBasicMaterial({ color: 0xff0000, map: structureTexture }),
        new THREE.MeshBasicMaterial({ color: 0x00ff00, map: structureTexture }),
        new THREE.MeshBasicMaterial({ color: 0x0000ff, map: structureTexture }),
        new THREE.MeshBasicMaterial({ color: 0xffff00, map: structureTexture }),
        new THREE.MeshBasicMaterial({ color: 0xff00ff, map: structureTexture })
    ];

    // Create the cube and apply transformations
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    cube = new THREE.Mesh(geometry, materials);
    cube.scale.set(2, 2, 2); // Scale the cube
    cube.position.set(1, 1, -2); // Move the cube
    scene.add(cube);

    // Event listeners for controlling the animation
    document.addEventListener('keydown', function(event) {
        if (event.key === 'w') {
            isAnimating = true;
        } else if (event.key === 's') {
            isAnimating = false;
        }
    });

    // Event listeners for camera controls
    const radiusSlider = document.getElementById('radius-slider');
    const thetaSlider = document.getElementById('theta-slider');
    const phiSlider = document.getElementById('phi-slider');
    radiusSlider.addEventListener('input', updateCamera);
    thetaSlider.addEventListener('input', updateCamera);
    phiSlider.addEventListener('input', updateCamera);

    // Event listeners for camera properties
    const nearSlider = document.getElementById('near-slider');
    const farSlider = document.getElementById('far-slider');
    const fovySlider = document.getElementById('fovy-slider');
    const aspectSlider = document.getElementById('aspect-slider');
    nearSlider.addEventListener('input', updateCameraProperties);
    farSlider.addEventListener('input', updateCameraProperties);
    fovySlider.addEventListener('input', updateCameraProperties);
    aspectSlider.addEventListener('input', updateCameraProperties);

    updateCamera(); // Initialize the camera based on default values
    updateCameraProperties(); // Initialize camera properties based on default values

    animate();
}

// Update camera position based on user input
function updateCamera() {
    const radius = document.getElementById('radius-slider').value;
    const theta = document.getElementById('theta-slider').value;
    const phi = document.getElementById('phi-slider').value;

    document.getElementById('radius-info').innerText = radius;
    document.getElementById('theta-info').innerText = theta;
    document.getElementById('phi-info').innerText = phi;

    const thetaRad = THREE.MathUtils.degToRad(theta);
    const phiRad = THREE.MathUtils.degToRad(phi);

    camera.position.x = radius * Math.sin(thetaRad) * Math.cos(phiRad);
    camera.position.y = radius * Math.cos(thetaRad);
    camera.position.z = radius * Math.sin(thetaRad) * Math.sin(phiRad);

    camera.lookAt(0, 0, 0);
}

// Update camera properties (near, far, fovy, aspect)
function updateCameraProperties() {
    const near = document.getElementById('near-slider').value;
    const far = document.getElementById('far-slider').value;
    const fovy = document.getElementById('fovy-slider').value;
    const aspect = document.getElementById('aspect-slider').value;

    camera.near = parseFloat(near);
    camera.far = parseFloat(far);
    camera.fov = parseFloat(fovy);
    camera.aspect = parseFloat(aspect);

    document.getElementById('near-info').innerText = near;
    document.getElementById('far-info').innerText = far;
    document.getElementById('fovy-info').innerText = fovy;
    document.getElementById('aspect-info').innerText = aspect;

    camera.updateProjectionMatrix(); // Important: Update the camera projection matrix
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    if (isAnimating) {
        cube.rotation.x += 0.05;
        cube.rotation.y += 0.02;
    }

    renderer.render(scene, camera);
}

// Initialize the scene
init();
