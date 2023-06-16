import anime from 'animejs/lib/anime.es.js';

class AnimateHero{
    constructor(){
        this.animate()
    }

animate(){
    anime({
        targets: '.no-padding',
        translateX: [100,0],
        translateZ: [100,0],
        opacity: [0,1],
        duration: 1000,
        easing: 'linear'
      });

    anime({
        targets: '.neuralthreads',
        translateX: [-100,0],
        easing: 'spring(0,10,0.41,4)',
        duration: 100,
      });
    anime({
        targets: '.thought',
        translateY: [100,0],
        easing: 'linear',
        duration: 1000,
      });
    anime({
        targets: '.app__container-hero__tshirt',
        translateY: [-100,0],
        translateX: [-100,0],
        translateZ: [-100,0],
        easing: 'linear',
        duration: 800,
      });
}

}


export default AnimateHero
