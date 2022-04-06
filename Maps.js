class Maps {
    //Constructor for Maps that takes a map config parameter which holds data in the form of JSON
    //to be used in the class
    constructor(map_config){
        //the game assets for the specific map being created
        this.gameAssets = map_config.gameAssets;
        //the barriers on the maps
        this.barriers = map_config.barriers || {};
        //image drawings
        this.subLayer = new Image();
        this.subLayer.src = map_config.subSrc;
        this.superLayer = new Image();
        this.superLayer.src = map_config.superSrc;
        //the collision map for the barriers
        this.collision_map = map_config.collision_map || {};
        //a map all locations on the game that can be interacted with (eg. players)
        this.interaction_map = map_config.interaction_map || {};
        this.interaction_dialogue = map_config.interaction_dialogue || {};
        //a map of locations on the game that result in events
        this.event_map = map_config.map_changes || {};
        //a map of locations on the game that result in dialogues
        this.dialogue_map = map_config.dialogue_map || {};
        this.dialogue_id = map_config.id;
        this.dialogue = new Dialogue({
            text: null,
            id: this.dialogue_id,
        })
        //a latch and toggle used to check if a an area can be interacted with
        this.latch = false;
        this.toggle = false;

        this.pyworld = null;

        this.isScene = false;
    }

    //draws the bottom layer of the map
    drawSubLayer(context, cut_x, cut_y, scale_x, scale_y){
        context.drawImage(this.subLayer, 
            0, 0, cut_x, 
            cut_y, 0, 0, 
            scale_x, scale_y);
    }

    //draws the top layer of the map
    drawSuperLayer(context, cut_x, cut_y, scale_x, scale_y){
        context.drawImage(this.superLayer, 
            0, 0, cut_x, 
            cut_y, 0, 0, 
            scale_x, scale_y);
    }

    //starts a scene that includes various events such as dialogues, fights and map changes
    async startScene(event){
        this.isScene = true;

        for(let i = 0; i < event.length; i++){
            const handleEvent = new Events({
                event: event[i],
                map: this,
            })
            // console.log(handleEvent);
            await handleEvent.init();
            // if(callback === "lost-fight")
            //     break;
        }
        
        this.isScene = false;
    }

    //checks if an area on the map is a barrier
    isBarrier(currX, currY, dir){
        const {x,y} = utils.nextPos(currX, currY, dir);
        return this.collision_map[`${x},${y}`] || false;
    }

    //checks if an area on the map can be ineracted with
    isInteraction(currX, currY, dir){
        const {x,y} = utils.nextPos(currX, currY, dir);
        this.dialogue.dialogue_text = this.interaction_dialogue[`${x},${y}`];
        if(this.dialogue_map[`${x},${y}`] || false){
            if(!this.latch) {
                this.latch = true;
                this.toggle = !this.toggle;
                if(this.toggle && this.dialogue.element_counter === 0) {
                    this.dialogue.init(document.querySelector(".rpg-container"), true);
                    this.dialogue.element_counter++;
                } 
            }
        } else if(this.dialogue.element_counter === 1 && !this.interaction_map[`${x},${y}`]){
            this.latch = false;
            this.toggle = !this.toggle;
            document.getElementById(this.dialogue_id).remove();
            this.dialogue.element_counter = 0;
        }
        return this.interaction_map[`${x},${y}`] || false;
    }

    //allows the user to interact
    interact(){
        const nextPos = utils.nextPos(this.gameAssets["mc"].x, this.gameAssets["mc"].y, mc.move_direction);
        const matchOnMap = Object.values(this.gameAssets).find(asset => {
            return `${nextPos.x},${nextPos.y}` === `${asset.x},${asset.y}`
        })
        if(!this.isScene && matchOnMap && matchOnMap.dialogue.length){

            const scene = matchOnMap.dialogue.find(s => {
                return (s.progression || []).every(progress => {
                    return window.mc.player.progress[progress];
                })
            })

            // console.log(scene);

            scene && this.startScene(scene.events)
        }
    }

    //checks for changes in maps
    isMapChange(){
        const mc = this.gameAssets["mc"];
        const match = this.event_map[`${mc.x},${mc.y}`];
        if(match){
            this.startScene(match[0].events);
        }
    }

}

// A set of data containing the Map information including the characters on the map
// the various events and progression that can happen and the all the collision, interaction
// and event maps used for the specific map

//The progression is just a set of events with a tag that is needed to run that event
//A user obtains these tags by completing other events in the game
window.Maps = {
    SafeZone: {
        subSrc: "Images/Maps/SafeZone.png",
        superSrc: "Images/Maps/SafeZone.png",
        gameAssets: {
            Eddy: new GameAsset({
                x: utils.canvasScale(4),
                y: utils.canvasScale(4),
                resize_scale: 1,
                src: "Images/Characters/npc1.png",
                dialogue: [
                    {
                        progression: ["talked-eddy"],
                        events: [
                            {type:"dialogue", text:"Have you talked to the others yet?"},
                            {type:"progress", progression:"NONE"},
                        ]
                    },
                    {
                        events: [
                            {type:"dialogue", text:"Hello traveller. Welcome to this foresaken land."},
                            {type:"dialogue", text:"I'm Eddy, a fragment destroyer. As you can see, there is a lot wrong with this world."},
                            {type:"dialogue", text:"We call these \"glitches\", if you will, THE FRAGMENTATION."},
                            {type:"dialogue", text:"It's a deadly desecration that spreads rapidly and the cause of this is the THREE FRAGMENTORS"},
                            {type:"dialogue", text:"PythOS, Java-n the Exception and C of the Sulp, the three deadliest most evil forces in existence"},
                            {type:"dialogue", text:"We must destroy them and we could use any help we can get."},
                            {type:"dialogue", text:"Talk to the redhead Emma if you want to prevent this scourge from continuing"},
                            {type:"progress", progression:"talked-eddy"},
                        ]
                    }
                ]
            }),
            Emma: new GameAsset({
                x: utils.canvasScale(11),
                y: utils.canvasScale(4),
                resize_scale: 1,
                src: "Images/Characters/npc2.png",
                dialogue: [
                    {
                        progression: ["to-alex"],
                        events: [
                            {type:"dialogue", text:"Did'ya talk to Alex yet? She's over by the rocks. Hard to miss her with those golden locks of hers. Damn blondie"},
                            {type:"progress", progression:"NONE"},
                        ]
                    },
                    {
                        progression: ["beat-BOT"],
                        events: [
                            {type:"dialogue", text:"Nice work rook!! Didn't expect you to thrash the BOT like you did"},
                            {type:"dialogue", text:"Anyways let's get you set up with the blondie over by the rocks, Alex."},
                            {type:"dialogue", text:"She'll get you set up to fight some of the tough cookies that have been infected by the fragmentors"},
                            {type:"progress", progression:"to-alex"},
                        ]
                    },
                    {
                        progression: ["talked-emma"],
                        events: [
                            {type:"dialogue", text:"Well then! Let's try that one again shall we?"},
                            {type:"fight", enemy:"The BOT"},
                            {type:"progress", progression:"beat-BOT"},
                        ]
                    },
                    {
                        progression: ["talked-eddy"],
                        events: [
                            {type:"dialogue", text:"Hi! Py I presume? I'm Emma. We heard a new traveller was goin' to be comin' 'round these parts"},
                            {type:"dialogue", text:"Anyways, I betcha Eddy told you we're fragment destroyers. Well I guess you know the situation then"},
                            {type:"dialogue", text:"We're gonna need some muscles up in this fine establishment to destroy some Fragmentors if you know what I'm sayin'."},
                            {type:"dialogue", text:"Let's start by seeing what you're made of eh' rookie?"},
                            {type:"progress", progression:"talked-emma"},
                            {type:"fight", enemy:"The BOT"},
                            {type:"progress", progression:"beat-BOT"},
                        ]
                    },
                    {
                        events: [
                            {type:"dialogue", text:"Hi there! You might want to talk to Eddy first in order to understand the situation"},
                            {type:"progress", progression:"NONE"},
                        ]
                    }
                ]
            }),
            Alex: new GameAsset({
                x: utils.canvasScale(14),
                y: utils.canvasScale(4),
                resize_scale: 1,
                src: "Images/Characters/npc3.png",
                dialogue: [
                    {
                        progression: ["beat-c"],
                        events: [
                            {type:"dialogue", text:"YOU DIDDDD ITTTTT!!!!! I think I'm in love right now!!!"},
                            {type:"dialogue", text:"CONGRATS ON BEATING PYWORLD! MORE UPDATES TO COME IN THE FUTURE SO STAY TUNED!!!"},
                            {type:"progress", progression:"done-game"},
                        ]
                    },
                    {
                        progression: ["c-fight"],
                        events: [
                            {type:"dialogue", text:"Well then! Let's try that one again shall we?"},
                            {type:"fight", enemy:"C of the Sulp"},  
                            {type:"progress", progression:"beat-c"},
                        ]
                    },
                    {
                        progression: ["beat-javan"],
                        events: [
                            {type:"dialogue", text:"I can't believe you actually did it!!!"},
                            {type:"dialogue", text:"OH MY GOD! All we have left is C of the Sulp"},
                            {type:"dialogue", text:"We're about to beat the fragmentation!!!!"},
                            {type:"dialogue", text:"Take that S.O.B. downnnnn"},
                            {type:"progress", progression:"c-fight"},
                            {type:"fight", enemy:"C of the Sulp"},  
                            {type:"progress", progression:"beat-c"},
                        ]
                    },
                    {
                        progression: ["javan-fight"],
                        events: [
                            {type:"dialogue", text:"Well then! Let's try that one again shall we?"},
                            {type:"fight", enemy:"Java-n the Exception"},  
                            {type:"progress", progression:"beat-javan"},
                        ]
                    },
                    {
                        progression: ["beat-programmer"],
                        events: [
                            {type:"dialogue", text:"I'm getting super excited right now! That's the first time anyone went toe to toe with that crazy chick and won."},
                            {type:"dialogue", text:"Let's not stop. Destroy the second strongest of the fragmentors and we're super close to stopping this insane outbreak."},
                            {type:"dialogue", text:"He calls himself Java-n the Exception and oh boy is he an exception."},
                            {type:"dialogue", text:"You take him down and we might stand a chance against the strongest one C of the Sulp."},
                            {type:"dialogue", text:"Alrightyy! Let's do this!"},
                            {type:"progress", progression:"javan-fight"},
                            {type:"fight", enemy:"Java-n the Exception"},  
                            {type:"progress", progression:"beat-javan"},
                        ]
                    },
                    {
                        progression: ["programmer-fight"],
                        events: [
                            {type:"dialogue", text:"Well then! Let's try that one again shall we?"},
                            {type:"fight", enemy:"Sleepy"},  
                            {type:"progress", progression:"beat-programmer"},
                        ]
                    },
                    {
                        progression: ["beat-pythos"],
                        events: [
                            {type:"dialogue", text:"Nice work! Let's keep 'er goin' shall we. Next up, a crazed programmer. She's gone berserk after she got infected."},
                            {type:"dialogue", text:"Keeps blabbering about some CPEN 212 lab due date whatever that is..."},
                            {type:"progress", progression:"programmer-fight"},
                            {type:"fight", enemy:"Sleepy"},  
                            {type:"progress", progression:"beat-programmer"},
                        ]
                    },
                    {
                        progression: ["pythos-fight"],
                        events: [
                            {type:"dialogue", text:"Well then! Let's try that one again shall we?"},
                            {type:"fight", enemy:"PythOS"},  
                            {type:"progress", progression:"beat-pythos"},
                        ]
                    },
                    {
                        progression: ["beat-windows"],
                        events: [
                            {type:"dialogue", text:"Nice Work! I think you're ready for some Fragmentor action."},
                            {type:"dialogue", text:"Don't worry. He might boast alot bet he's the weakest of the three: PythOS"},
                            {type:"dialogue", text:"Kick him down to size for me will ya?"},
                            {type:"progress", progression:"pythos-fight"},
                            {type:"fight", enemy:"PythOS"},  
                            {type:"progress", progression:"beat-pythos"},

                        ]
                    },
                    {
                        progression: ["windows-fight"],
                        events: [
                            {type:"dialogue", text:"Well then! Let's try that one again shall we?"},
                            {type:"fight", enemy:"Windows"},
                            {type:"progress", progression:"beat-windows"},
                        ]
                    },
                    {
                        progression: ["to-alex"],
                        events: [
                            {type:"dialogue", text:"Well then! The rookie got the nod of approval from Emma?"},
                            {type:"dialogue", text:"I can tell you personally that's one heck of a thing to do."},
                            {type:"dialogue", text:"Anyways, let's get down to business. The name's Alex. You're here to take on some of the fragmected."},
                            {type:"dialogue", text:"You like that? It's a mix of fragmented and infected. Pretty smart huh?!"},
                            {type:"dialogue", text:"Moving on... you probably want to know how you can fight. Well, I do some voodoo magic and stuff and all of a sudden you'll be in a fight"},
                            {type:"dialogue", text:"Let's getcha started with on of our tougher customers first. Apparently he was some fancy shmancy billionaire named Bill Gates."},
                            {type:"dialogue", text:"Ended up getting infected and becoming the very thing he created, the Windows OS. No clue what that is to be honest. I never was a techy kinda gal"},
                            {type:"dialogue", text:"Anyways Good Luck! You'll need it"},
                            {type:"fight", enemy:"Windows"},
                            {type:"progress", progression:"beat-windows"},
                        ]
                    },
                    {
                        events: [
                            {type:"dialogue", text:"Hey! Have you talked to the other two yet?"},
                            {type:"progress", progression:"NONE"},
                        ]
                    },
                ]
            }),
            mc: new MovePerson({
                x: utils.canvasScale(4),
                y: utils.canvasScale(8),
                resize_scale: 1,
                src: "Images/Characters/mc.png"
            }),
        },
        collision_map: collision_safezone,
        interaction_map: blocked_safezone,
        interaction_dialogue: safezone_dialogue,
        dialogue_map: safezone_dialogue_blk,
        id: "safezone",
        map_changes: {
            [utils.convertXY(0,6)]: [
                {
                    events: [
                        {type: "changeMap", map: "RoomOfPy"},
                    ]
                }
            ]
        },
    },
 
}