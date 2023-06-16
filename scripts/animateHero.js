import anime from 'animejs/lib/anime.es.js';

class AnimateHero {
  constructor() {
    this.textWrapper = document.querySelector('.ml2');
    this.textWrapper.innerHTML = this.textWrapper.textContent.replace(/\S/g, "<span style='color: #fff;' class='letter'>$&</span>");
    this.animate()
  }

  animate() {
    anime({
      targets: '.no-padding',
      translateX: [100, 0],
      translateZ: [100, 0],
      opacity: [0, 1],
      duration: 1000,
      delay: 5000,
      easing: 'linear'
    });

    anime({
      targets: '.neuralthreads',
      translateX: [-100, 0],
      easing: 'spring(0,10,0.41,4)',
      duration: 100,
      delay: 5000,

    });
    anime({
      targets: '.thought',
      translateY: [100, 0],
      easing: 'linear',
      duration: 1000,
      delay: 5000,
    });

    anime.timeline({ loop: true })
      .add({
        targets: '.ml2 .letter',
        scale: [4, 1],
        opacity: [0, 1],
        translateZ: 0,
        easing: "easeOutExpo",
        duration: 250,
        delay: (el, i) => 70 * i
      }).add({
        targets: '.ml2',
        opacity: 0,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 250
      });
  }

}


export default AnimateHero
