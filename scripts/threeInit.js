import WebGlRenderer from './WebglChecker';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

class ThreeInit {
    constructor() {
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        this.scene = new THREE.Scene();
        this.sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        }




        window.onresize = window.onload = () => {
            this.sizes = {
                width: window.innerWidth,
                height: window.innerHeight
            };
        };


        this.camera = new THREE.PerspectiveCamera(
            35,
            this.sizes.width / this.sizes.height,
            1,
            1000
        );

        

        this.scaler = 1;
        this.camera.position.set(0, 0, 1.3);
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
                    child.position.set(-0.45, 0, 0);

                    const fabricTexture = new THREE.TextureLoader().load('/fabric4.png');
                    fabricTexture.wrapS = THREE.RepeatWrapping;
                    fabricTexture.wrapT = THREE.RepeatWrapping;
                    fabricTexture.repeat.set(1, 1);

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
            logo.position.set(-0.4, 0.08, 0.135);
            logo.scale.set(0.025, 0.025, 0.025);
            logo.castShadow = false;
            self.scene.add(logo);
            self.addSpaceBackground()
        }, undefined, function (error) {
            console.error(error);
        });

        this.renderer.setSize(this.division.clientWidth, this.division.clientHeight);
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
        const ambientLight = new THREE.AmbientLight(0x000, 1);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(new THREE.Color(0xff577f), 0.03);
        directionalLight.position.set(1, 0, -1);
        this.scene.add(directionalLight);

        const directionalLight2 = new THREE.DirectionalLight(new THREE.Color(0xff577f), 1);
        directionalLight2.position.set(-1, 0, 1);
        this.scene.add(directionalLight2);
    }

    animate = () => {
        requestAnimationFrame(this.animate);

        const startRotation = 0;
        const rotationSpeed = 0.002;

        if (this.scene.rotation.y <= startRotation) {
            this.rotationDirection = 1;
        } else if (this.scene.rotation.y >= startRotation + 0.3) {
            this.rotationDirection = -1;
        }

        this.scene.rotation.y += rotationSpeed * this.rotationDirection;

        this.renderer.render(this.scene, this.camera);
    };

    addSpaceBackground() {
        const textureLoader = new THREE.TextureLoader();
        const spaceTexture = textureLoader.load('/space.jpg');

        this.scene.background = spaceTexture;
    }


    
    
}

export default ThreeInit;


