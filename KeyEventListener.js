// Handles the keyboard events
class KeyEventListener{
    constructor(key, callback){
        let keyUp = true;
        this.keyDown = function(event) {
            if(event.code === key){
                if(keyUp) {
                    keyUp = false;
                    callback();
                }
            }
        };
        //Assigns the variable keyup when a key is released
        this.keyUp = function(event) {
            if(event.code === key){
                keyUp = true;
            }
        };
        
        // calls the event listener when a key is pressed down
        document.addEventListener("keydown", this.keyDown);
        // calls the event listener when a key is released
        document.addEventListener("keyup", this.keyUp);
    }

    unbindListener() {
        document.removeEventListener("keydown", this.keyDown);
        document.removeEventListener("keyup", this.keyUp);
    }
}