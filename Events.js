// Handles the event changes throughout the game with progression
class Events {
    constructor({map, event}){
        this.map = map;
        this.event = event;
    }

    //Dialogue event handler
    dialogue(resolve) {
        this.map.isProgress = false;
        const text = new Dialogue({
            text: this.event.text,
            onComplete: () => resolve()
        })
        text.init(document.querySelector(".rpg-container"), false);
    }

    // Scene change handler
    changeMap(resolve) {
        this.map.isProgress = false;
        const transition = new Transitions();
        transition.createTransition(document.querySelector(".rpg-container"), () => {
            this.map.pyworld.startMap(window.Maps[this.event.map]);
            resolve();  
            transition.fadeOut();
        });
    }

    // FIght scene handler
    fight(resolve) {
        this.map.isProgress = false;
        const fight = new Fight({
            enemy: Enemies[this.event.enemy],
            onComplete: (win) => {
                // console.log(win)
                resolve(win ? "won-fight" : "lost-fight" );
            }
        }) 
        fight.init(document.querySelector(".rpg-container"));
    }

    // Progess update handler
    progress(resolve){
        window.mc.player.progress[this.event.progression] = true;
        this.map.isProgress = true;
        console.log(window.mc.player.progress[this.event.progression])
        resolve();
    }

    init(){
        return new Promise(resolve => {
            this[this.event.type](resolve)
        })
    }
}