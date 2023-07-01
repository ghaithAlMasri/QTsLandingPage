import WebGL from 'three/addons/capabilities/WebGL.js';

class WebGlRendererChecker {
    check() {
        if (WebGL.isWebGLAvailable()) {
            return true;
        } else {
            const warning = WebGL.getWebGLErrorMessage();
            document.getElementsByClassName('app__container-hero__tshirt').appendChild(warning);
        }
    }
}

export default WebGlRendererChecker;
