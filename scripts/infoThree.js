import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import WebGlChecker from './WebglChecker'
class InfoThree {
  constructor() {
    this.height = window.innerHeight;
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.loader = new GLTFLoader();
    this.moon = null;
    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    }
    this.sizing = this.sizes.width>=800 ? 0.07 : 0.12
    this.checker = new WebGlChecker()
    
    if(this.checker.check())
    this.init();
  }

  init() {
    document.getElementById('info').style.height = this.height + 'px';
    document.querySelector('.app__container-info__canvas').style.height = '100%';
    document.querySelector('.app__container-info__canvas').style.width = '100%';

    this.backgroundSetup();
    this.setupLights();
    this.generateRandomStars()
    this.addObject();
    this.setupCamera();
    // this.addObjects()
    this.renderScene();
  }

  backgroundSetup() {
    this.renderer.setClearColor(0x000000, 1);
  }

  addObject() {
    const self = this;
    this.loader.load('./the_moon.glb', function (model) {
      self.moon = model.scene;
      self.moon.position.set(1, -0.2, 0);
      self.moon.scale.set(self.sizing, self.sizing, self.sizing);

      self.scene.add(self.moon);
      self.animateMoon();
      self.renderScene();
    });
  }

  setupCamera() {
    this.camera.position.set(0, 0, 1);
  }



  addObjects() {
    const textureLoader = new THREE.TextureLoader();
    const spaceManTexture = textureLoader.load('/gen1.png');
  
    const spaceManGeometry = new THREE.PlaneGeometry(4, 4); // Adjust the size as needed
    const spaceManMaterial = new THREE.MeshBasicMaterial({ map: spaceManTexture, transparent: true });
  
    const spaceMan = new THREE.Mesh(spaceManGeometry, spaceManMaterial);
    spaceMan.position.set(0, 0, -10); // Adjust the position as needed
    spaceMan.scale.set(2, 2, 2); // Adjust the position as needed
    this.scene.add(spaceMan);
  
    // Create the red box helper
    const boxHelper = new THREE.BoxHelper(spaceMan, 0xff0000);
    this.scene.add(boxHelper);

  }

  setupLights() {
    const ambientLight = new THREE.AmbientLight(0x808080, 0.6);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(-1, 0, 1);
    this.scene.add(directionalLight);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight2.position.set(1, 0, -1);
    this.scene.add(directionalLight2);
  }

  animateMoon() {
    requestAnimationFrame(this.animateMoon.bind(this));

    if (this.moon) {
      this.moon.rotation.y += 0.0004;
    }

    this.renderScene();
  }


  renderScene() {
    document.querySelector('.app__container-info__canvas').appendChild(this.renderer.domElement);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.render(this.scene, this.camera);
  }

  generateRandomStars() {
    const numStars = 5000;
    let lastStar = null
    const starGeometry = new THREE.SphereGeometry(0.0006);
    const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
  
    for (let i = 0; i < numStars; i++) {
      const star = new THREE.Mesh(starGeometry, starMaterial);
      star.name = 'star';
      if (i === 69) { lastStar = star }
  
  
      const x = THREE.MathUtils.randFloatSpread(2);
      const y = THREE.MathUtils.randFloatSpread(2);
      const z = THREE.MathUtils.randFloatSpread(2);
  
      star.position.set(x, y, z);
      this.scene.add(star);
    }
  }
}

export default InfoThree;




