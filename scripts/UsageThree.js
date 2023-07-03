import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import WebGlChecker from './WebglChecker';
import localImages from '../public';

class UsageThree {
    constructor() {
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.loader = new GLTFLoader();
        this.moon = null;
        this.sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        };
        this.checker = new WebGlChecker();
        this.gens = { ...localImages };
        this.gensNames = ['gen1', 'gen2', 'gen3', 'gen4', 'gen5', 'gen6'];
        if (this.checker.check()) this.init();
    }

    init() {
        document.getElementById('usage').style.height = this.height + 'px';
        document.querySelector('.app__container-usage__canvas').style.height = '100%';
        document.querySelector('.app__container-usage__canvas').style.width = '100%';

        this.backgroundSetup();
        this.setupLights();
        this.generateRandomStars();
        this.setupCamera();
        this.addObjects();
        this.animateLogos()
        this.renderScene();
    }

    backgroundSetup() {
        this.renderer.setClearColor(0x000000, 1);
    }

    setupCamera() {
        this.camera.position.set(0, 0, 1);
    }

    addObjects() {
        const self = this;

        this.loader.load('./moon.glb', function (model) {
            self.renderScene();
        });

        const textureLoader = new THREE.TextureLoader();

        for (let i = 0; i < 6; i++) {
            const logo = textureLoader.load(this.gens[this.gensNames[i]]);
            logo.magFilter = THREE.NearestFilter;
            logo.minFilter = THREE.LinearMipmapLinearFilter;

            const logoGeometry = new THREE.PlaneGeometry(40, 40);
            const logoMaterial = new THREE.MeshBasicMaterial({ map: logo, transparent: false });

            const image = new THREE.Mesh(logoGeometry, logoMaterial);
            image.name = 'logo'
            console.log(image.name);
            const randomX = THREE.MathUtils.randFloat(-8, 8);
            const randomY = THREE.MathUtils.randFloat(-3, 3);

            const randomSpeed = THREE.MathUtils.randFloat(-0.02, 0.02)

            image.position.set(randomX, randomY, -10);
            image.scale.set(0.1, 0.1, 0.1);
            image.userData.speedX = randomSpeed;
            image.userData.speedY = randomSpeed;
            this.scene.add(image);
        }
    }

    setupLights() {
        const ambientLight = new THREE.AmbientLight(0x808080, 0.6);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(1, 1, 1);
        this.scene.add(directionalLight);
    }

    renderScene() {
        document.querySelector('.app__container-usage__canvas').appendChild(this.renderer.domElement);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.render(this.scene, this.camera);
    }

    generateRandomStars() {
        const numStars = 5000;

        const starGeometry = new THREE.SphereGeometry(0.0006);
        const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

        for (let i = 0; i < numStars; i++) {
            const star = new THREE.Mesh(starGeometry, starMaterial);
            star.name = 'star';

            const x = THREE.MathUtils.randFloatSpread(2);
            const y = THREE.MathUtils.randFloatSpread(2);
            const z = THREE.MathUtils.randFloatSpread(2);

            star.position.set(x, y, z);
            this.scene.add(star);
        }
    }

    animateLogos = () => {
        requestAnimationFrame(this.animateLogos);
        const canvasWidth = this.sizes.width;
        const canvasHeight = this.sizes.height;
    
        this.scene.traverse((child) => {
            if (child.name === 'logo') {
                child.position.x += child.userData.speedX;
                child.position.y += child.userData.speedY;
                child.rotation.z += (child.userData.speedX + child.userData.speedY) / 10;
    
                if (child.position.x > canvasWidth / 100) {
                    child.position.x = canvasWidth / 100;
                    child.userData.speedX *= -1;
                } else if (child.position.x < -canvasWidth / 100) {
                    child.position.x = -canvasWidth / 100;
                    child.userData.speedX *= -1;
                }
    
                if (child.position.y > canvasHeight / 100) {
                    child.position.y = canvasHeight / 100;
                    child.userData.speedY *= -1;
                } else if (child.position.y < -canvasHeight / 100) {
                    child.position.y = -canvasHeight / 100;
                    child.userData.speedY *= -1;
                }
            }
        });
    
        this.renderer.render(this.scene, this.camera);
    }
    
    
    

}

export default UsageThree;
