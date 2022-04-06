class Sprite {
    // Init sprite animation for movements of character
    constructor(sprite_config){

        this.image = new Image();
        this.image.src = sprite_config.src;
        this.image.onload = () => {
            this.loadImage = true;
        }
        // Defines movement frames of sprite
        this.anim = sprite_config.anim || {
            "static-down": [[0,0]],
            "static-up": [[0,2]],
            "static-left": [[2,1]],
            "static-right": [[0,1]],
            "walking-down": [[1,0],[0,0],[3,0],[0,0]],
            "walking-up": [[1,2],[0,2],[3,2],[0,2]],
            "walking-left": [[2,1],[3,1],[2,1],[3,1]],
            "walking-right": [[0,1],[1,1],[0,1],[1,1]],
        }

        this.currAnim = "static-down";
        this.currAnimFrame = 0;
        this.frameLimit = sprite_config.frameLimit || 8;
        this.frameProgress = this.frameLimit;
        this.gameAsset = sprite_config.gameAsset;
        this.resize_scale = sprite_config.resize_scale;
    }

    //gets the animation frame for the sprite
    get animFrame(){
        return this.anim[this.currAnim][this.currAnimFrame];
    }
    // Sets frame of animation for sprite
    setAnim(key) {
        if(this.currAnim !== key){
            this.currAnim = key;
            this.currAnimFrame = 0;
            this.frameProgress = this.frameLimit;
        }
    }

    //updates the animation during a user's movement
    updateAnim(){
        if (this.frameProgress > 0){
            this.frameProgress -= 1;
            return;
        }

        this.frameProgress = this.frameLimit;
        this.currAnimFrame +=1;

        if(this.animFrame === undefined){
            this.currAnimFrame = 0;
        }
    }

    // draws the image onto the canvas using context.drawImage
    drawImg(context){

        const img_x = this.gameAsset.x;
        const img_y = this.gameAsset.y;

        const [x, y] = this.animFrame;

        this.loadImage && context.drawImage(
            this.image, x * 32, y * 32, 
            this.gameAsset.cut_x, this.gameAsset.cut_y, 
            img_x, img_y, 
            this.gameAsset.cut_x * this.resize_scale, 
            this.gameAsset.cut_y * this.resize_scale);
        
        this.updateAnim();
    }
}