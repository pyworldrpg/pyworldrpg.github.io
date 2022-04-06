window.Support = {
    ClearCache: {
        name: "Clear Cache",
        description: "Clears all caches increasing health by 15",
        onSelf: true,
        completed: [
            {type: "dialogue", dialogue:"PLAYER cleared cache and gained 15 HEALTH"},
            {type: "statChanges", health_gain: 15}
        ]
    },
    Counselling: {
        name: "Counselling",
        description: "Talk to a counsellor and improve your mental\nhealth, gains 20 HEALTH",
        completed: [
            {type: "dialogue", dialogue:"PLAYER got counselling and gained 20 HEALTH"},
            {type: "statChanges", health_gain: 20}
        ]
    },
    debug: {
        name: "Debug",
        description: "Fixing errors in code, healing self",
        completed: [
            {type: "dialogue", dialogue:"PLAYER debugged code, restoring 20 HEALTH"},
            {type: "statChanges", health_gain: 20}
        ]
    },
    gdb: {
        name: "gdb",
        description: "C++ calls for gdb to help, restoring health",
        completed: [
            {type: "dialogue", dialogue:"gdb helped C of the Sulp, healing it"},
            {type: "statChanges", health_gain: 20}
        ]
    },
    JVM: {
        name: "JVM",
        description: "Java-n restarts the JVM",
        completed: [
            {type: "dialogue", dialogue:"Java-n restarted the JVM and rebuilt all files healing 30 HEALTH"},
            {type: "statChanges", health_gain: 30}
        ]
    },
    Repair: {
        name: "Repair",
        description: "Bot repairs itself",
        completed: [
            {type: "dialogue", dialogue:"Bot tried to repair itself, recovering 5 HEALTH"},
            {type: "statChanges", health_gain: 5}
        ]
    },
    ImportLib: {
        name: "Import Libraries",
        description: "Import libraries to help with the fight",
        completed: [
            {type: "dialogue", dialogue:"PythOS imported a library, healing itself for 20 HEALTH"},
            {type: "statChanges", health_gain: 20}
        ]
    },
    Antivirus: {
        name: "Windows Defender",
        description: "Windows scans PC for threats using its Anti-virus, recovering health",
        completed: [
            {type: "dialogue", dialogue:"Windows Defender scanned for threats, healing Windows for 10 HEALTH"},
            {type: "statChanges", health_gain: 10}
        ]
    },
    Settings: {
        name: "Adjust Settings",
        description: "Windows adjusted its settings, healing itself",
        completed: [
            {type: "dialogue", dialogue:"Windows updated settings, healed Windows for 15 HEALTH"},
            {type: "statChanges", health_gain: 15}
        ]
    },
    Caffeine: {
        name: "A Drink of Coffee",
        description: "Drink coffee, temporarily removes fatigue from sleep deprivation",
        completed: [
            {type: "dialogue", dialogue:"Programmer drank coffee, feeling more awake than before, gaining 20 HEALTH"},
            {type: "statChanges", health_gain: 20}
        ]
    },
    
}