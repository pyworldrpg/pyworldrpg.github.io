window.Special = {    
    DrainPower: {
        name: "Power Drain",
        description: "Player steals 15 health from opponent",
        completed: [
            {type: "dialogue", dialogue:"PLAYER used Power Drain and stole 15 health"},
            {type: "statChanges", health_steal: 15}
        ]
    },
    Overclock: {
        name: "Overclock",
        description: "Doubles the experience you get after winning\nthe match",
        completed: [
            {type: "dialogue", dialogue:"PLAYER has overclocked their systems"},
            {type: "statChanges", xpBoost: true}
        ]
    },
    hacks: {
        name: "Hacks",
        description: "Hacks the enemy, dealing massive damage\nand healing some of damage dealt",
        completed: [
            {type: "dialogue", dialogue:"You hacked the enemy's servers dealing damage\nwhile also stealing data and health"},
            {type: "statChanges", attack_dmg: 20},
            {type: "statChanges", health_steal: 10}
        ]
    },
    SIGKILL: {
        name: "SIGKILL",
        description: "C of the Sulp killed the signal, dealing\nmassive damage and healing some of damage dealt",
        completed: [
            {type: "dialogue", dialogue:"C of the Sulp killed the signal, dealing\nmassive damage and healing some of damage dealt"},
            {type: "statChanges", attack_dmg: 40},
            {type: "statChanges", health_steal: 15}
        ]
    },
    GradleBuild: {
        name: "Gradle Build Failed",
        description: "Fails the player's gradle build dealing damage",
        completed: [
            {type: "dialogue", dialogue:"Java-n rebuilt their gradle and destroyed your\ngradle dealing damage and stealing health"},
            {type: "statChanges", attack_dmg: 35},
            {type: "statChanges", health_steal: 10}
        ]
    },
    struct: {
        name: "Struct",
        description: "C++ created a struct to help",
        completed: [
            {type: "dialogue", dialogue:"C of the Sulp created a Struct to help\nstore data"},
            {type: "statChanges", health_steal: 20}
        ]
    },
    MachineLearning: {
        name: "Machine Learning",
        description: "Python calls for Pytorch to do machine learning",
        completed: [
            {type: "dialogue", dialogue:"PythOS called Pytorch to create a neural network\nto steal 30 HEALTH"},
            {type: "statChanges", health_steal: 30}
        ]
    },
    BlueScreen: {
        name: "Blue Screen of Death",
        description: "A problem you cannot handle, deals fatal damage",
        completed: [
            {type: "dialogue", dialogue:"Windows caused a Blue Screen, dealing 35 DMG"},
            {type: "statChanges", attack_dmg: 35}
        ]
    },
    Project: {
        name: "CPEN 212 Lab",
        description: "Programmer started the CPEN 212 Lab, resulting in\nstress dealing 40 DMG and healing the programmer for 10 HEALTH",
        completed: [
            {type: "dialogue", dialogue:"Programmer started the CPEN 212 Lab, resulting in\nstress dealing 40 DMG and healing the programmer for 10 HEALTH"},
            {type: "statChanges", attack_dmg: 40},
            {type: "statChanges", health_gain: 10}
        ]
    }
}