//Controls the fights throughout the life of the game
class Fight {

    constructor({enemy, onComplete}){
        this.enemy = enemy;
        this.onComplete = onComplete;
        this.fighters = {}
        console.log((window.mc.player))
        this.addFighters(window.mc.player);
        this.addFighters(this.enemy);
    }

    //Adds fighters to a specific fight
    addFighters(fighter_config) {
        this.fighters[fighter_config.player] = new Fighter({
            ...fighter_config
        })
        console.log(this.fighters)
    }


    init(container){
        //Sets up the fight scene with the two fighters and the map being used
        this.fight_element = document.createElement("div");
        this.fight_element.classList.add("Fight");

        this.fight_element.innerHTML = (`
            <div class="fight-mc" id="mc">
                <img src="${'/Images/Characters/mc.png'}" alt="mc"/>
            </div>
            <div class="fight-enemy" style="background-image: url(${this.enemy.src});" id="enemy"/>                     
        `);

        document.querySelector(':root').style.setProperty('--width', this.enemy.width);
        document.querySelector(':root').style.setProperty('--steps', this.enemy.anim_steps);
        document.querySelector(':root').style.setProperty('--pixels', this.enemy.anim_pixels);
        document.querySelector(':root').style.setProperty('--seconds', this.enemy.anim_seconds);
        document.querySelector(':root').style.setProperty('--background-img', this.enemy.map_src);
        document.querySelector(':root').style.setProperty('--scale', this.enemy.scale);

        container.appendChild(this.fight_element);

        Object.keys(this.fighters).forEach(key => {
            let fighter = this.fighters[key];
            fighter.init(this.fight_element);
        })

        //Sets up the turn loop and checks for the fighter that has died at the end of the fight
        //Uses promises to resolve the events
        this.turn = new Turn({
            fight: this,
            onAction: event => {
                return new Promise(resolve => {
                    const fightEvent = new FightEvents(event, this);
                    fightEvent.init(resolve);
                })
            },
            onDeath: player => {
                console.log("Player")
                console.log(player)
                if(player.player === "enemy"){
                    const fighter = this.fighters["mc"];
                    console.log(fighter);
                    if(fighter){
                        window.mc.player.experience = fighter.experience;
                        window.mc.player.maxExperience = fighter.maxExperience;
                        window.mc.player.level = fighter.level;
                    }
                }
                this.fight_element.remove();
                this.onComplete(player.player === "enemy");
            } 
        });
        this.turn.init();
    }
}