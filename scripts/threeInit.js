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

        this.tshirtModel = null


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

        

        this.scaler = (this.sizes.width < 1000 && this.sizes.width>=700) ? 0.8 : (this.sizes.width < 700) ? 0.5 : 1;

        this.camera.position.set(0, 0, 1.3);
        this.loader = new GLTFLoader();
        this.webGlRenderer = new WebGlRenderer();
        this.division = document.querySelector('.app__container-hero__tshirt');


        this.init();
    }


    

    init() {
        const self = this;
        console.log(this.scaler);
        console.log(this.sizes.width)
        


        this.loader.load('/shirt_baked.glb', function (gltf) {
            gltf.scene.traverse(function (child) {
                if (child.isMesh) {
                    child.scale.set(self.scaler, self.scaler, self.scaler);
                    child.position.set(-0.15, 0, 0);
                    child.name = 'tshirt'

                    const fabricTexture = new THREE.TextureLoader().load('/fabric4.png');
                    fabricTexture.wrapS = THREE.RepeatWrapping;
                    fabricTexture.wrapT = THREE.RepeatWrapping;
                    fabricTexture.repeat.set(1, 1);

                    child.material = new THREE.MeshStandardMaterial({
                        map: fabricTexture,
                        roughness: 0.9,
                        metalness: 0.8,
                        aoMap: fabricTexture,
                        aoMapIntensity: 1,
                        side: THREE.DoubleSide,
                    });

                    child.castShadow = true;
                    child.receiveShadow = true;

                }
            });

            const myObject = new THREE.Group()


            const logoTexture = new THREE.TextureLoader().load('/spaceMan.png');
            const logoMaterial = new THREE.MeshBasicMaterial({ map: logoTexture, transparent: true });
            const logoGeometry = new THREE.PlaneGeometry(4, 4);
            const logo = new THREE.Mesh(logoGeometry, logoMaterial);
            logo.name='logo'
            logo.position.set(-0.11, 0.08, 0.135);
            logo.scale.set(0.021, 0.021, 0.021);
            logo.castShadow = false;
            
            myObject.add(gltf.scene,logo)
            myObject.name = 'model'
            myObject.castShadow = true
            myObject.receiveShadow = true


            self.tshirtModel = myObject

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
        }
    }

    setupLights() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(new THREE.Color(0xff577f), 0.03);
        directionalLight.position.set(1, 0, -1);
        this.scene.add(directionalLight);

        const directionalLight2 = new THREE.DirectionalLight(new THREE.Color(0xff577f), 1);
        directionalLight2.position.set(-1, 0, 1);
        this.scene.add(directionalLight2);
    }


    addSpaceBackground() {
        this.scene.background = new THREE.Color(0x000000);
        this.generateRandomStars();
        this.scene.add(this.tshirtModel)
        this.animate();
      }


    generateRandomStars() {
        const numStars = 5000;
        let lastStar = null
        const starGeometry = new THREE.SphereGeometry(0.001);
        const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
      
        for (let i = 0; i < numStars; i++) {
          const star = new THREE.Mesh(starGeometry, starMaterial);
          star.name = 'star';
          if(i === 69){lastStar = star}
            

          const x = THREE.MathUtils.randFloatSpread(2);
          const y = THREE.MathUtils.randFloatSpread(2);
          const z = THREE.MathUtils.randFloatSpread(2);
      
          star.position.set(x, y, z);
          this.scene.add(star);
        }
      }
      
    animate = () => {
        requestAnimationFrame(this.animate);
        const startRotation = 0.02;
        const rotationSpeed = 0.001;
      
        this.scene.traverse((child) => {
          if (child instanceof THREE.Group && child.name === 'model') {
            if (child.rotation.x <= startRotation) {
              this.rotationDirection = 1;
            } else if (child.rotation.x >= startRotation + 0.3) {
              this.rotationDirection = -1;
            }
            child.rotation.x += rotationSpeed * this.rotationDirection;
            child.rotation.y += rotationSpeed * this.rotationDirection;
            child.rotation.z += (rotationSpeed * this.rotationDirection)/50;
          }
        });
      
        this.renderer.render(this.scene, this.camera);
      };
      
    
    


    
    
}

export default ThreeInit;


