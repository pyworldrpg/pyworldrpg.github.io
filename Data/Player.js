/**
 * Player details for game. Stores the level and containes health max health and fight action options
 * And also controls the progression of the character through the game
 */
class Player {
    constructor(){
        this.player = {
            health: 100,
            maxHealth: 100,
            experience: 0,
            maxExperience: 100,
            level: 1,
            effects: null,
            xpBooster: false,
            id: "mc-hud",
            name: "Py",
            player: "mc",
            attacks: ["gc", "FactoryReset"],
            support: [ "ClearCache", "Counselling"],
            special: ["hacks", "Overclock"],
            playerTurn: true,
            progress: {
            }
        }
    }
}

window.mc = new Player();