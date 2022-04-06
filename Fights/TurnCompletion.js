class TurnCompletion{
    constructor({activePlayer, activeEnemy, onTurnComplete}){
        this.activePlayer = activePlayer;
        this.activeEnemy = activeEnemy;
        this.onTurnComplete = onTurnComplete;
    }
    // Menu options in fight scene, controls button presses in menu
    menuOptions() {

        const goBack = {
            option: "Go Back",
            description: "Go to previous menu",
            performAction: () => {
                this.menu.setMenuOptions(this.menuOptions().main)
            }
        };

        return {
            main: [
                {
                    option: "Attack",
                    description: "Select an attack to use",
                    performAction: () => {
                        this.menu.setMenuOptions(this.menuOptions().attack)
                    }
                },
                {
                    option: "Support",
                    description: "Select a support item to use",
                    performAction: () => {
                        this.menu.setMenuOptions(this.menuOptions().support)
                    }
                },
                {
                    option: "Special",
                    description: "Select a special action to perform",
                    performAction: () => {
                        this.menu.setMenuOptions(this.menuOptions().special)
                    }
                }
            ],
            attack: [
                ...this.activePlayer.attacks.map(key => {
                    const attack = Attacks[key];
                    return {
                        option: attack.name,
                        description: attack.description,
                        performAction: () => {
                            this.submitAction(attack)
                        }
                    }
                }),
                goBack
            ],
            support: [
                ...this.activePlayer.support.map(key => {
                    const support = Support[key];
                    if(support)
                        return {
                            option: support.name,
                            description: support.description,
                            performAction: () => {
                                this.submitAction(support)
                            }
                        }
                }),
                goBack
            ],
            special: [
                ...this.activePlayer.special.map(key => {
                    const special = Special[key];
                    if(special)
                        return {
                            option: special.name,
                            description: special.description,
                            performAction: () => {
                                this.submitAction(special)
                            }
                        }
                }),
                goBack
            ]
        }
    }

    //submits a selected action
    submitAction(attack){
        if(this.activePlayer.playerTurn)
            this.menu.clearMenu();
        this.onTurnComplete({
            attack, 
            activeEnemy: attack.onSelf ? this.activePlayer : this.activeEnemy
        })
    }

    // Picks a random move for enemy to perform
    enemyTurn(){
        let turnType = Math.floor(Math.random() * 3);
        let moveType = 0
        switch (turnType){
            case 0:
                console.log("Attack")
                let attack_len = this.activePlayer.attacks.length;
                if(attack_len === 0) break;
                moveType = Math.floor(Math.random() * (attack_len));
                this.submitAction(Attacks[this.activePlayer.attacks[moveType]]);
                break;
            case 1:
                console.log("Support")
                if(this.activePlayer.health === this.activePlayer.maxHealth){
                    this.submitAction(Attacks[this.activePlayer.attacks[0]]);
                    break;
                }
                console.log("Support")
                let support_len = this.activePlayer.support.length;
                if(support_len === 0) break;
                console.log("Support")
                moveType = Math.floor(Math.random() * (support_len));   
                console.log("Support")
                console.log(Support[this.activePlayer.support[moveType]])
                this.submitAction(Support[this.activePlayer.support[moveType]]);
                break;
            case 2: 
                console.log("Special")
                let special_len = this.activePlayer.special.length;
                if(special_len === 0) break;
                moveType = Math.floor(Math.random() * (special_len));
                this.submitAction(Special[this.activePlayer.special[moveType]]);
                break;
        }
            
        
    }

    // Container for menu that contains actions
    menu(container){
        this.menu = new MenuUI();
        this.menu.init(container);
        this.menu.setMenuOptions(this.menuOptions().main);
    }

    init(container){

        if(this.activePlayer.playerTurn){
            this.menu(container);
        } else {
            this.enemyTurn();
        }

    }
}