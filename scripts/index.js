import Hamburger from './hamburgerMenu';
import ThreeInit from './threeInit';
import AnimateHero from './animateHero'
class MainClass {
  constructor() {
    this.delay = 0
    this.threeInit = new ThreeInit(this.sizes);
    this.hamburger = new Hamburger();
    this.animateHero = new AnimateHero(this.delay)
    this.hamburgerItems = document.getElementsByClassName('app__container-header-mobile__items');
    this.showLoadingScreen();
  }

  init() {
    // HEADER
    this.hamburger.checkMenu();
    this.handleMenuClick();
    window.onresize = () => {

      try {
        // this.threeInit.updateSizes();
        this.hamburger.checkMenu();
      } catch (error) {
        console.log(error);
      }
    };

    this.menuToggle = document.getElementById('menu-toggle').addEventListener(
      'click',
      this.hamburger.toggleMenu.bind(this.hamburger)
    );
    // END OF HEADER

    // HERO
    document.addEventListener('DOMContentLoaded', this.createTypeWriterEffect());
    // end of hero
  }

  handleMenuClick() {
    Array.from(this.hamburgerItems).forEach((element) => {
      element.addEventListener('click', this.hamburger.toggleMenu.bind(this.hamburger));
    });
  }

  createTypeWriterEffect() {
    const isAlpha = function (ch) {
      return /^[A-Z,",.']$/i.test(ch);
    };

    // GPT GENERATED WITH A LITTLE CLEANING HERE AND THERE

    // Get the element containing the text to type
    const typingDemo = document.querySelector('.typing-demo');

    // Get the text to type
    const text = typingDemo.innerHTML;

    // Clear the text content
    typingDemo.innerHTML = '';

    // Create a function to simulate typing effect
    function typeEffect(index) {
      if (index <= text.length) {
        if (isAlpha(text.substring(index - 1, index))) {
          // Update the text content with the next character
          typingDemo.innerHTML = text.substring(0, index);

          // Schedule the next character to be typed after a delay
          setTimeout(function () {
            typeEffect(index + 1);
          }, 100); // Adjust the typing speed by changing the delay value (in milliseconds)
        } else {
          setTimeout(function () {
            typeEffect(index + 1);
          }, 0); // Adjust the typing speed by changing the delay value (in milliseconds)
        }
      }
    }

    // Start the typing effect
    typeEffect(0);
  }

  hideLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    loadingScreen.style.display = 'none';
    document.querySelector('.app__container').style.display = 'block'
    this.init()
  }
  timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async showLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    loadingScreen.style.display = 'flex';
    document.querySelector('.app__container').style.display = 'none';
    await this.timeout(this.delay);
    this.hideLoadingScreen();
  }
  
}




const init = new MainClass();

export default MainClass;
