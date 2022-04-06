/***
 * Contains the turn loop code for the fights. Controls what the users do during a turn,
 * checks when a fights is over, who won, whose turn it is and updates the stats of the correct
 * user accordingly
 */

class Turn {
    constructor({fight, onAction, onDeath}) {
        this.fight = fight;
        this.onAction = onAction;
        this.onDeath = onDeath;
        this.player = "mc";
    }

    async turn(){
        const activePlayer = this.fight.fighters[this.player];
        const activeEnemy = this.fight.fighters[(this.player === "mc" ? "enemy" : "mc")];

        const turnCompletion = await this.onAction({
            type: "turnCompletion",
            activePlayer, 
            activeEnemy
        })

        const events = turnCompletion.attack.completed;
        for(let i = 0; i < events.length; i++){
            const event = {
                ...events[i],
                turnCompletion,
                attack: turnCompletion.attack,
                activePlayer,
                activeEnemy: turnCompletion.activeEnemy
            }
            await this.onAction(event);
        }

        this.player = (this.player === "mc" ? "enemy" : "mc");

        //checks for death of the correct fighter and adds the blinking animation to them
        const death =  turnCompletion.activeEnemy.health <= 0;
        if(death){
            await this.onAction({
                type: "dialogue", dialogue: `${turnCompletion.activeEnemy.name} has been defeated!`
            })
            if(turnCompletion.activeEnemy.player === "mc") {
                document.getElementById("mc").classList.add("death-anim");
                document.getElementById("mc-hud").classList.add("death-anim");
                await this.onAction({
                    type: "dialogue", dialogue: "You have lost the battle! Level up and try again"
                })
            } else {
                let xpMult = this.fight.fighters["mc"].xpBooster ? 2 : 1;
                const xp = Math.round(turnCompletion.activeEnemy.gainXp * xpMult * (1 + this.fight.fighters["mc"].level/10));
                await this.onAction({
                    type: "dialogue",
                    dialogue: `${turnCompletion.activeEnemy.death_msg}`
                })
                document.getElementById("enemy").classList.add("death-anim");
                document.getElementById("enemy-hud").classList.add("death-anim");
                
                await this.onAction({
                    type: "gainXp",
                    xp,
                    activeEnemy: this.fight.fighters["mc"]
                })                
                console.log("Typing")
                await this.onAction({
                    type: "dialogue", dialogue: `You have won the battle! Gained ${xp} xp`
                })

            }
            this.onDeath(turnCompletion.activeEnemy);
            return;
        }

        this.turn();
    }

    //initializes the turns
    async init() {
        await this.onAction({
            type: "dialogue",
            dialogue: `${this.fight.enemy.intro_msg}`
        })
        
        this.turn();

        
    }
}