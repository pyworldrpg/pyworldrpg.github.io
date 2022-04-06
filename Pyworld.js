class pyworld {
    //Constructor for the game's world
    constructor(world_config) {
        this.element = world_config.element;
        this.canvas = this.element.querySelector(".main-canvas");
        this.context = this.canvas.getContext("2d");
        this.context.imageSmoothingEnabled = false;
        this.map = null;
    }

    //main game loop that handles all animation and background image creation
    //is able to detect when certain events occur and then handles those events as necessary
    gameLoop() {
        const frame = () => {

            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

            this.map.drawSubLayer(this.context, 320, 180, 320, 180);
            Object.values(this.map.gameAssets).forEach(asset => {
                asset.movement({
                    key: this.moveInput.dir,
                    map: this.map,
                });
                asset.sprite.drawImg(this.context);
            });

            requestAnimationFrame(() => {
                frame();
            })
        }
        frame();
    }

    //Starts a specified Map from the /Images/Maps directory
    startMap(config){
        this.map = new Maps(config);
        this.map.pyworld = this;
    }

    //Checks the players position to see if they have moved to a location that prompts a map change
    playerPosCheck() {
        document.addEventListener("NotMoving", e => {
            this.map.isMapChange();
        })
    }

    //Checks if the player is attempting to interact with an npc or object
    playerActionCheck() {
        connection4.onmessage = e => {
            // console.log("hgfkjg")
            if(e.data === 'Enter'){
                this.map.interact();
            }
        }
        new KeyEventListener("Enter", () => {
            this.map.interact();
        })
    }
    
    //The init function starts the instance of pyworld and serves as the main function for the game to run
    async init() {
        this.startMap(window.Maps.SafeZone);
        this.titleScreen = new TitleScreen()
        await this.titleScreen.init(this.element)
        
        this.playerPosCheck();
        this.playerActionCheck();

        this.moveInput = new MoveInput();
        this.moveInput.init();
        
        this.gameLoop();

        this.map.startScene([
            {type: "dialogue", text: "Welcome to PyWorld. Talk to the man in the tuxedo to start your adventure"}
        ]);

    }
}