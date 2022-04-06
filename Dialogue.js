class Dialogue {
    //Initiaties all dialogue related code (the dialogue is where the npcs talk to the user)
    constructor({text, id, onComplete}){
        this.dialogue_text = text;
        this.dialogue_element = null;
        this.onComplete = onComplete;
        this.element_counter = 0;
        this.id = id;
    }

    // A dialogue to indicate that an area can be interacted with
    createInteraction(){
        this.dialogue_element = document.createElement("div");
        this.dialogue_element.classList.add("interaction");
        this.dialogue_element.setAttribute('id',this.id);
        this.dialogue_element.innerHTML = (
            `<p class="interaction_text"> ${this.dialogue_text}</p>`
        );

    }

    // Creates a dialogue for when players are talking and when certain events occur during fights
    createDialogue(){
        this.dialogue_element = document.createElement("div");
        this.dialogue_element.classList.add("dialogue");
        this.dialogue_element.setAttribute('id',this.id);
        this.dialogue_element.innerHTML = (
           `<p class="dialogue_text"></p>`
        );

        // A class that adds the typewriter animation to the dialogue
        this.typeWriteText = new TypeWriter({
            text: this.dialogue_text,
            speed: 35,
            text_element: this.dialogue_element.querySelector(".dialogue_text"),
        });
        let count = 0;
        // connection2.onmessage = e => {
        //     if(e.data === 'Enter'){
        //         this.displayDone();
        //     }
        // }

        this.eventListener = new KeyEventListener("Enter", () => {
            this.displayDone();
        });
    }

    //Checks if the dialogue has been dispaying the information on it and subsequently 
    //unbinds and listeners and removes the elements
    displayDone() {
        if(this.typeWriteText.effect_done){
            this.dialogue_element.remove();
            this.eventListener.unbindListener();
            this.onComplete();
        } else {
            this.typeWriteText.forceDone();
        }
    }

    //Initializes the dialogue
    init(container, isInteraction){
        if(isInteraction){
            this.createInteraction();
            container.appendChild(this.dialogue_element);
        }
        else {
            this.createDialogue();
            container.appendChild(this.dialogue_element);
            this.typeWriteText.init();
        }
    }
}