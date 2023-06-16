class Hamburger {
    constructor() {
      this.mobileMenu = document.getElementById('mobile');
      this.mainMenu = document.getElementById('menu');
      this.menuButton = document.getElementById('menu-button');
      this.xButton = document.getElementById('x-button');
      this.sizes = {
        width: window.innerWidth,
        height: window.innerHeight
      };
      this.mobileMenu.classList.add("hidden");
      this.menuItems = document.getElementById('app__container-header-mobile__menu');
    }
  
    checkMenu() {
      if (window.innerWidth < 1000) {
        this.mobileMenu.classList.remove('hidden');
        this.mainMenu.classList.add('hidden');
      } else {
        this.mobileMenu.classList.add('hidden');
        this.mainMenu.classList.remove('hidden');
      }
    }
  
    toggleMenu() {
      if (this.menuItems.classList.contains("showMenu")) {
        this.menuItems.classList.remove("showMenu");
        this.menuItems.classList.add("hideMenu");
        this.xButton.style.display = "none";
        this.menuButton.style.display = "block";
      } else {
        this.menuItems.classList.remove("hideMenu");
        this.menuItems.classList.add("showMenu");
        this.xButton.style.display = "block";
        this.menuButton.style.display = "none";
      }
    }
  }
  
  export default Hamburger;
  