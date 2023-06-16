import WebGlRenderer from './WebglChecker';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
class ThreeInit {
    constructor() {
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            90,
            window.innerWidth / window.innerHeight,
            1.3,
            100
        );
        this.scaler = 18
        this.camera.position.set(0, 1, 6);
        this.loader = new GLTFLoader();
        this.webGlRenderer = new WebGlRenderer();
        this.division = document.querySelector('.app__container-hero__tshirt');
        this.init();
    }

    init() {
        const self = this;
        this.loader.load('/shirt_baked.glb', function (gltf) {
            gltf.scene.traverse(function (child) {
                if (child.isMesh) {
                    child.scale.set(self.scaler, self.scaler, self.scaler);

                    const fabricTexture = new THREE.TextureLoader().load('/fabric4.png');
                    fabricTexture.wrapS = THREE.RepeatWrapping;
                    fabricTexture.wrapT = THREE.RepeatWrapping;
                    fabricTexture.repeat.set(4, 4);

                    child.material = new THREE.MeshStandardMaterial({
                        map: fabricTexture,
                        roughness: 2,
                        metalness: 0.2,
                        side: THREE.DoubleSide,
                        // wireframe:true,
                    });

                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            self.scene.add(gltf.scene);

            const logoTexture = new THREE.TextureLoader().load('/spaceMan.png');
            const logoMaterial = new THREE.MeshBasicMaterial({ map: logoTexture, transparent: true });
            const logoGeometry = new THREE.PlaneGeometry(4, 4);
            const logo = new THREE.Mesh(logoGeometry, logoMaterial);
            logo.position.set(0.8, 1.1, 2.399);
            logo.scale.set(0.32, 0.32, 0.32);
            logo.castShadow = false;
            self.scene.add(logo);
        }, undefined, function (error) {
            console.error(error);
        });

        this.renderer.setSize(window.innerWidth / 1.5, window.innerHeight / 1.5);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setClearColor(0x000000, 0);
        this.renderer.shadowMap.enabled = true;
        this.division.appendChild(this.renderer.domElement);


        if (this.webGlRenderer.check()) {
            this.setupLights();
            this.animate();
        }
    }

    setupLights() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xfff, 0.5);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(new THREE.Color(0xffeedd), 1);
        directionalLight.position.set(-1, 0, 1);
        this.scene.add(directionalLight);

        const directionalLight2 = new THREE.DirectionalLight(new THREE.Color(0xffccaa), 1);
        directionalLight2.position.set(-1, 0, 1);
        this.scene.add(directionalLight2);
    }

    animate = () => {
        requestAnimationFrame(this.animate);

        // Specify the starting rotation angle in radians
        const startRotation = -0.3;

        // Set the rotation increment
        const rotationSpeed = 0.002;

        // Increment or decrement the rotation angle based on the direction
        if (this.scene.rotation.y <= startRotation) {
            this.rotationDirection = 1;
        } else if (this.scene.rotation.y >= startRotation + 0.3) {
            this.rotationDirection = -1;
        }

        this.scene.rotation.y += rotationSpeed * this.rotationDirection;

        this.renderer.render(this.scene, this.camera);
    };


}

export default ThreeInit;
