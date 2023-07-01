import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TextureLoader } from 'three';


class InfoThree {
  constructor() {
    this.height = window.innerHeight;
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.loader = new GLTFLoader();
    this.init();
  }

  init() {
    document.getElementById('info').style.height = this.height + 'px';
    document.querySelector('.app__container-info__canvas').style.height = '100%';
    document.querySelector('.app__container-info__canvas').style.width = '100%';

    this.backgroundSetup();
    this.setupLights();
    this.addObject();
    this.setupCamera();
    this.renderScene();
  }

  backgroundSetup() {
    this.renderer.setClearColor(0x000000, 1);
  }
  

  addObject() {
    const self = this;
    this.loader.load("./saturn.glb", function (model) {
      model.scene.position.set(0, 0, 2);
      model.scene.scale.set(0.3, 0.3, 0.3);
      console.log(model.scene)


      const bodyMaterial = new THREE.MeshStandardMaterial({
        roughness: 0.4,
        metalness: 0.6,
        side: THREE.DoubleSide,
      });

      const ringMaterial = new THREE.MeshStandardMaterial({
        roughness: 0.4,
        metalness: 0.7,
        side: THREE.DoubleSide,
      });
  

      const textureLoader = new THREE.TextureLoader();
      const bodyTexture = textureLoader.load("/Saturn_body.jpg");
      const ringTexture = textureLoader.load("/Saturn_ring.png");
  

      bodyMaterial.map = bodyTexture;
      ringMaterial.map = ringTexture;
      bodyMaterial.aoMap = bodyTexture;
      ringMaterial.aoMap = ringTexture;
  

      model.scene.traverse(function (child) {
        if (child.isMesh) {
          if (child.name === "Cube") {
            child.material = bodyMaterial;
          } else if (child.name === "Circle") {
            child.material = ringMaterial;
          }
        }
      });

  
      self.scene.add(model.scene);
      self.animateSaturn();
      self.renderScene();
    });
  }
  

  setupCamera() {
    this.camera.position.set(0, 0, 5);
  }
  


  setupLights() {

    const ambientLight = new THREE.AmbientLight(0x808080, 0.6); 
    this.scene.add(ambientLight);
  

    const directionalLight = new THREE.DirectionalLight(0xffe6c0, 0.2);
    directionalLight.position.set(-1, 0, 1);
    this.scene.add(directionalLight);

    const directionalLight2 = new THREE.DirectionalLight(0xffe6c0, 0.2);
    directionalLight2.position.set(1, 0, -1);

    this.scene.add(directionalLight2);
  }
  
  

  animateSaturn() {
    requestAnimationFrame(this.animateSaturn.bind(this));
  

    this.scene.rotation.z += 0.004;
    this.scene.rotation.y += 0.004;
    this.scene.rotation.x += 0.002;

    this.renderScene();
  }

  renderScene() {
    document.querySelector('.app__container-info__canvas').appendChild(this.renderer.domElement);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.render(this.scene, this.camera);
  }
}

export default InfoThree;
