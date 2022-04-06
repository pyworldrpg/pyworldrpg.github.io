class TitleScreen {
    constructor() {
    }
    
    // Gets the user selected option on the title screen
    getOptions(resolve) {
      return [
        { 
          option: "New Game",
          description: "Start a new coding adventure!",
          performAction: () => {
            this.close();
            resolve();
          }
        },
      ].filter(v => v);
    }
  
    //Create the title screen div to hold the logo and NEW GAME button
    createElement() {
      this.element = document.createElement("div");
      this.element.classList.add("TitleScreen");
      this.element.innerHTML = (`
        <img class="TitleScreen_logo" src="/Images/Logo/logo.png" alt="PyWorld" />
      `)
  
    }
  
    // Close the title screen and change scene to new map
    close() {
      this.keyboardMenu.clearMenu();
      this.element.remove();
    }
    
    // init method to create the element and call
    init(container) {
      return new Promise(resolve => {
        this.createElement();
        container.appendChild(this.element);
        this.keyboardMenu = new MenuUI();
        this.keyboardMenu.init(this.element);
        this.keyboardMenu.setMenuOptions(this.getOptions(resolve))
      })
    }
  
  }