//Creates the UI used in fights
class MenuUI {
    constructor(){
        // sets the options that are available to the user to select in the MenuUI (attack, support, special etc.)
        this.menuOptions = [];
        // the key pressed when the MenuUI is active
        this.upKey = null;
        this.downKey = null;
        this.highlight = null;
    }

    //Sets the MenuUI's interface to contain the various options that we want. Populates the data
    //based on the player's current available moves (Attacks would include things like Garbage collection
    //Special would include hacks etc.)
    setMenuOptions(menuOptions){
        this.menuOptions = menuOptions;
        this.menu_element.innerHTML = this.menuOptions.map((menuOptions, index) => {
            return (`
                <div class="menu-option">
                    <button data-button="${index}" data-description="${menuOptions.description}">
                        ${menuOptions.option}
                    </button>
                </div>
            `);
        }).join("");

        //goes through all the available buttons on the menu UI which have been determined 
        //by menu options and adds event listeners for mouse clicks, hovers and when the 
        //specific button is being focused on
        this.menu_element.querySelectorAll("button").forEach(btn => {

            btn.addEventListener("click", () => {
                const selected = this.menuOptions[ Number(btn.dataset.button) ];
                selected.performAction();
            })
            btn.addEventListener("mouseenter", () => {
                btn.focus();
            })
            btn.addEventListener("focus", () => {
                this.focusedOption = btn;
                // displays the description for the current focused button's menu option
                this.descText.innerText = btn.dataset.description;
            })
        })

        //delay used to set a specific button to be focused
        setTimeout(() => {
            this.menu_element.querySelector("button[data-button]").focus();
        }, 10);
    }

    clearMenu() {
        this.menu_element.remove();
        this.description.remove();
        this.upKey.unbindListener();
        this.downKey.unbindListener();
    }

    init(container){
        //Sets the menu UI's elements to hold the menu options and the subsequent description
        this.menu_element = document.createElement("div");
        this.menu_element.classList.add("Menu");
        this.description = document.createElement("div");
        this.description.classList.add("MenuDescription");
        this.description.innerHTML = (`<p>Hello</p>`);
        this.descText = this.description.querySelector("p");

        //adds the description and menu UI to the container holding the game
        container.appendChild(this.description);
        container.appendChild(this.menu_element);

        //The listeners for the joystick and button events that are received via the server connection to port 8085
        var keyP
        //this count is used to only check the joystick data every six iterations of the onmessage listener function
        //as the joystick data is received incredibly fast, thus preventing the options on the MenuUI from toggling too fast
        var count = 0
        connection3.onmessage = e => {
            if(count % 6 === 0){
                if(e.data === 'up'){
                    keyP = "up"
                    //This code checks what the current and previous buttons are and then toggles
                    //to the right button if the joystick is moved up
                    const currOption = Number(this.focusedOption.getAttribute("data-button"));
                    const prevOption = Array.from(this.menu_element.querySelectorAll("button[data-button]")).reverse().find(b => {
                        return b.dataset.button < currOption;
                    });
                    prevOption?.focus();
                } 
                else if(e.data === 'down'){
                    //This code checks what the current and next buttons are and then toggles
                    //to the right button if the joystick is moved up
                    keyP = "down"
                    const currOption = Number(this.focusedOption.getAttribute("data-button"));
                    const nextOption = Array.from(this.menu_element.querySelectorAll("button[data-button]")).find(b => {
                        return b.dataset.button > currOption;
                    });
                    nextOption?.focus();
                }
                count = 0;
            }
            count++;
            //Checks if the button is clicked and selects that menu option
            if(e.data === 'Enter'){
                const selected = this.menuOptions[ Number(this.focusedOption.dataset.button) ];
                selected.performAction();
            }

        }

        //Key event listener for key W which checks for key w being clicked and then toggles the option up on the
        //menu UI
        this.upKey = new KeyEventListener("KeyW", () => {
            const currOption = Number(this.focusedOption.getAttribute("data-button"));
            const prevOption = Array.from(this.menu_element.querySelectorAll("button[data-button]")).reverse().find(b => {
                return b.dataset.button < currOption;
            });
            prevOption?.focus();
        });

        //Key event listener for key S which checks for key s being clicked and then toggles the option down on the
        //menu UI
        this.downKey = new KeyEventListener("KeyS", () => {
            const currOption = Number(this.focusedOption.getAttribute("data-button"));
            const nextOption = Array.from(this.menu_element.querySelectorAll("button[data-button]")).find(b => {
                return b.dataset.button > currOption;
            });
            nextOption?.focus();
        });
    }
}