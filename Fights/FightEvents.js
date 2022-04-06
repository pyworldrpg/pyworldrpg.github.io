class FightEvents {
    constructor(event, fight) {
        this.event = event;
        this.fight = fight;
    }

    dialogue(resolve){

        const text = this.event.dialogue.replace("PLAYER", this.event.activePlayer?.name);

        const dialogue = new Dialogue({
            text,
            onComplete: () => {
                resolve();
            }
        });
        dialogue.init(this.fight.fight_element)
    }

    statChanges(resolve){
        let enemy = null;
        const {activePlayer, activeEnemy, attack_dmg, health_gain, health_steal, xpBoost} = this.event;
        if(attack_dmg) {
            activeEnemy.updateStats({
                health: activeEnemy.health - attack_dmg
            })

            if(activeEnemy.id === "mc-hud")
                document.getElementById("mc").classList.add("reg-damage-taken");
            else 
                document.getElementById("enemy").classList.add("reg-damage-taken");
            enemy = activeEnemy;

            setTimeout(() =>{
                if(enemy.id === "mc-hud")
                    document.getElementById("mc").classList.remove("reg-damage-taken");
                else 
                    document.getElementById("enemy").classList.remove("reg-damage-taken");
                resolve();
            }, 700); 
        } else if (health_gain) {
            let healthGained = (activePlayer.health + health_gain > activePlayer.maxHealth) ? activePlayer.maxHealth : activePlayer.health + health_gain;

            activePlayer.updateStats({
                health: healthGained
            })

            if(activePlayer.id === "mc-hud")
                document.getElementById("mc").classList.add("reg-health-gain");
            else 
                document.getElementById("enemy").classList.add("reg-health-gain");

            setTimeout(() =>{
                if(activePlayer.id === "mc-hud")
                    document.getElementById("mc").classList.remove("reg-health-gain");
                else 
                    document.getElementById("enemy").classList.remove("reg-health-gain");
                resolve();
            }, 1500); 
        } else if (health_steal) {
            let healthStolen = (activePlayer.health + health_steal > activePlayer.maxHealth) ? activePlayer.maxHealth : activePlayer.health + health_steal;
            console.log(activePlayer)
            console.log(activeEnemy)
            activePlayer.updateStats({
                health: healthStolen
            })

            activeEnemy.updateStats({
                health: activeEnemy.health - health_steal
            })

            if(activePlayer.id === "mc-hud"){
                document.getElementById("mc").classList.add("reg-health-gain");
                document.getElementById("enemy").classList.add("reg-health-steal");
            }
            else {
                document.getElementById("enemy").classList.add("reg-health-gain");
                document.getElementById("mc").classList.add("reg-health-steal");
            }
            setTimeout(() =>{
                if(activePlayer.id === "mc-hud"){
                    document.getElementById("mc").classList.remove("reg-health-gain");
                    document.getElementById("enemy").classList.remove("reg-health-steal");
                }
                else {
                    document.getElementById("enemy").classList.remove("reg-health-gain");
                    document.getElementById("mc").classList.remove("reg-health-steal");
                }
                resolve();
            }, 1500); 
        } else if(xpBoost) {
            console.log("Boost")
            console.log(activePlayer.xpBooster)
            activePlayer.updateStats({
                xpBooster: true
            })
            console.log(activePlayer.xpBooster)
            document.getElementById("mc").classList.add("reg-xp-boost");
            setTimeout(() =>{
                document.getElementById("mc").classList.remove("reg-xp-boost");
                resolve();
            }, 1500); 
        }

        
    }

    gainXp(resolve){
        let xpGained = this.event.xp;
        const {activeEnemy} = this.event;
        
        const gain = () => {
            if(xpGained > 0) {
                xpGained--;
                activeEnemy.experience+=1;
                if(activeEnemy.experience === activeEnemy.maxExperience){
                    activeEnemy.experience = 0;
                    activeEnemy.level++;
                    activeEnemy.maxExperience *= (activeEnemy.level * 1.5)
                }

                activeEnemy.updateStats();
                requestAnimationFrame(gain);
                return;
            }
            resolve();
        }
        requestAnimationFrame(gain);
    }


    turnCompletion(resolve){

        const turnCompletion = new TurnCompletion({
            activePlayer: this.event.activePlayer,
            activeEnemy: this.event.activeEnemy,
            onTurnComplete: takeTurn => {
                resolve(takeTurn)
            }
        })

        turnCompletion.init(this.fight.fight_element);
    }

    init(resolve){
        this[this.event.type](resolve);
    }
}