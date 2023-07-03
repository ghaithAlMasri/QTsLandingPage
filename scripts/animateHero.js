import anime from 'animejs/lib/anime.es.js';

class AnimateHero {
  constructor(delay) {
    this.delay = delay;
    this.textWrapper = document.querySelector('.ml2');
    this.textWrapper.innerHTML = this.textWrapper.textContent.replace(/\S/g, "<span style='color: #fff;' class='letter'>$&</span>");
    this.prevdel = null
    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.animate();
          this.delay = 1000

        }
      });
    });


    const targetElement = document.querySelector('.app__container-info__texts');
    this.intersectionObserver.observe(targetElement);


    this.animate()
    this.delay = 1000

  }


  animate() {
    anime({
      targets: '.no-padding',
      opacity: [0, 1],
      opacity: [0, 1],
      duration: 1500,
      delay: this.delay,
      easing: 'linear'
    });

    anime({
      targets: '.neuralthreads',
      translateX: [-100, 0],
      opacity: [0,1],
      easing: 'spring(0,10,0.41,4)',
      duration: 500,
      delay: this.delay,
    });

    anime({
      targets: '.thought',
      opacity: [0,1],
      easing: 'linear',
      duration: 1500,
      delay: this.delay,
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

    anime({
      targets: '.app__container-hero__button-up',
      opacity: [0, 1],
      duration: 700,
      delay: this.delay,
    });

    anime({
      targets: '.app__container-hero__button-down',
      opacity: [0, 1],
      duration: 700,
      delay: this.delay,
    });
    anime({
      targets: '.app__container-info__image',
      scale: [0, 1],
      opacity: [0, 0.25, 0.5, 1],
      easing: 'easeInOutExpo',
      duration: 2000,
    });
    anime({
      targets: '.first-usage-text',
      scale: [0,1],
      opacity: [0,1],
      easing: 'easeInOutExpo',
      duration: 1000
    });
    anime({
      targets: '.first-usage-text-inner',
      opacity: [0,1],
      easing: 'easeInOutExpo',
      duration: 500,
      delay: 1000,
    });
    anime({
      targets: '.second-usage-text',
      scale: [0,1],
      opacity: [0,1],
      easing: 'easeInOutExpo',
      duration: 1000,
      delay:1000
    });
    anime({
      targets: '.second-usage-text-inner',
      opacity: [0,1],
      easing: 'easeInOutExpo',
      duration: 500,
      delay: 2000,
    });
    anime({
      targets: '.third-usage-text',
      scale: [0,1],
      opacity: [0,1],
      easing: 'easeInOutExpo',
      duration: 1000,
      delay:2000
    });
    anime({
      targets: '.third-usage-text-inner',
      opacity: [0,1],
      easing: 'easeInOutExpo',
      duration: 500,
      delay: 3000,
    });




  }
}

export default AnimateHero;
