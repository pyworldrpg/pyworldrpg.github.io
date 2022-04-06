class Transitions {
    // Transition to fade out of current screen
    fadeOut(){
        this.transition_element.classList.add("fade-out");
        this.transition_element.addEventListener("animationend", () => {
            this.transition_element.remove();
        }, {once: true});
    }
    // Creates a transition from one frame to next in the html file
    createTransition(container, callback){
        this.transition_element = document.createElement("div");
        this.transition_element.classList.add("Transition");

        container.appendChild(this.transition_element);

        this.transition_element.addEventListener("animationend", () => {
            callback();
        }, {once: true});
    }
}