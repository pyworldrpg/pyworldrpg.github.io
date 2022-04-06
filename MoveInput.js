// Class to control player movements
class MoveInput {
    constructor() {
        //The mapping of the keys being used and the current directions that the user has inputted
        //for the game
        this.currDirections = [];
        this.keymap = {
            "KeyW": "up",
            "KeyA": "left",
            "KeyS": "down",
            "KeyD": "right",
            "KeyQ": "press",
        }
    }

    // Returns the direction that the player is supposed to move to for the next movement
    get dir() {
        return this.currDirections[0];
    }

    //initializes the move inputs
    init(){
        var keyP
        // calls the websocket connection and reads the data sent through the arduino
        connection.onmessage = e => {
            if(e.data === 'left'){
                // console.log("A")
                keyP = "left"
                this.currDirections.unshift(keyP)
            } 
            else if(e.data === 'right'){
                // console.log("D")
                keyP = "right"
                this.currDirections.unshift(keyP)
            } 
            else if(e.data === 'up'){
                // console.log("W")
                keyP = "up"
                this.currDirections.unshift(keyP)
            } 
            else if(e.data === 'down'){
                // console.log("S")
                keyP = "down"
                this.currDirections.unshift(keyP)
            } 
            else if(e.data === 'still'){
                // console.log("still")
                // keyP = "still"
                this.currDirections = []
                console.log(this.currDirections)
            }
            else if(e.data === 'Enter'){
                keyP = "press"
                console.log(keyP)
                this.currDirections.unshift(keyP)
            }
            else if(e.data === 'release'){
                // console.log("S")
                keyP = "release"
            }
        }
        
        // Adds a keyEvenListener to listen to keyboard presses
        document.addEventListener("keydown", key => {
            const pressedKey = this.keymap[key.code];
            if(pressedKey && this.currDirections.indexOf(pressedKey) === -1){
                this.currDirections.unshift(pressedKey)
            }
        })

        // Adds a keyEvenListener to listen to keyboard releases
        document.addEventListener("keyup", key => {
            const pressedKey = this.keymap[key.code];
            const i = this.currDirections.indexOf(pressedKey);
            if(i > -1){
                this.currDirections.splice(i, 1);
            }
        })
    }
}