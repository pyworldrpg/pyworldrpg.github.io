// Class to control movement of the character
class MovePerson extends GameAsset {
    constructor(config){
        super(config);
        this.remainingMove = 0;
        
        //Array mapping the controller signal to the movements
        this.direction = { 
            "up": ["y", -1],
            "down": ["y", 1],
            "left": ["x", -1],
            "right": ["x", 1],
        }
    }

    // the main movement function that checks if the position the user is moving to is a barrier, is interactable etc.
    movement(state){

        //if the user is in a scene it prevents any movement
        if(state.map.isScene) {
            return; 
        }

        //the movement updates the animation depending on the direction the user is moving in
        //up would show the player's back down would show the front of the player etc.
        if(this.remainingMove > 0){
            this.updatePosition();
        } else {
            //Checks if the user is pressing a key and sets the animation of the character according to the key pressed
            if(state.key && state.key !== "press" && (this.move_direction = state.key)){
                if(state.map.isBarrier(this.x, this.y, this.move_direction)){
                    this.sprite.setAnim("static-"+this.move_direction);
                    return;
                } else if(state.map.isInteraction(this.x, this.y, this.move_direction)){
                    this.sprite.setAnim("static-"+this.move_direction);
                    return;
                }
            }
            //checks that if the remaining number of pixels left to move is 0, then it resets the next pixel in order
            //to keep the grid based movement used throughout the game
            if(this.remainingMove === 0 && state.key && state.key !== "press"){
                this.move_direction = state.key;
                this.remainingMove = 16;
            }  
            //updates the sprite resulting in the correct animation
            this.updateSprite(state);
        }
    }

    // Funciton to update the position of the character using the grid based movement (player moves 16 pixels)
    // for every single key press
    updatePosition(){
        const [axis, movement] = this.direction[this.move_direction];
        this[axis] += movement;
        this.remainingMove -= 1;

        if(this.remainingMove === 0){
            utils.createEvent("NotMoving", {});
        }
    }

    // Function to update the sprite based on the movement state. move_direction is mapped based on a key press
    // where KeyW results in up, KeyS results in down etc.
    updateSprite(state){
        if(this.remainingMove === 0 && !state.key){
            this.sprite.setAnim("static-"+this.move_direction)
            return;
        }

        if(this.remainingMove > 0){
            this.sprite.setAnim("walking-"+this.move_direction);
        }


    }
}