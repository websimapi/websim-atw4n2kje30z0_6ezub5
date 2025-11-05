import * as THREE from 'three';

class SceneManager {
    constructor(canvas) {
        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });

        this.sun = null;

        this.init();
    }

    init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.camera.position.set(0, 5, 20);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(50, 50, 50);
        this.scene.add(directionalLight);

        // Sun
        const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
        const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xfdb813 });
        this.sun = new THREE.Mesh(sunGeometry, sunMaterial);
        this.sun.position.set(30, 20, -50);
        this.scene.add(this.sun);

        // Ground
        const groundGeometry = new THREE.PlaneGeometry(200, 200);
        const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x228B22, roughness: 0.8 });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -10;
        this.scene.add(ground);

        window.addEventListener('resize', this.onWindowResize.bind(this));
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    updateWeather(weatherData) {
        // Simple visualization: change background color based on condition
        switch (weatherData.condition) {
            case 'Sunny':
                this.scene.background = new THREE.Color(0x87CEEB); // Sky blue
                this.sun.visible = true;
                break;
            case 'Rainy':
                this.scene.background = new THREE.Color(0x778899); // Light slate gray
                this.sun.visible = false;
                break;
            case 'Snowy':
                this.scene.background = new THREE.Color(0xDCDCDC); // Gainsboro
                this.sun.visible = false;
                break;
            default:
                this.scene.background = new THREE.Color(0x87CEEB);
                this.sun.visible = true;
        }
    }

    animate() {
        this.renderer.render(this.scene, this.camera);
    }
}

export default SceneManager;