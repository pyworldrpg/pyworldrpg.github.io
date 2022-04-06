/**
 * List of attacks that can be used by player and enemies
 */
window.Attacks = {
    /* Player */
    // Attack
    gc: {
        name: "Garbage Collection",
        description: "Collects garbage dealing 10 DMG",
        completed: [
            {type: "dialogue", dialogue:"PLAYER collected garbage"},
            {type: "statChanges", attack_dmg: 10}
        ]
    },
    FactoryReset: {
        name: "Factory Reset",
        description: "Factory Resets the opponents systems dealing a\n huge 30 DMG",
        completed: [
            {type: "dialogue", dialogue:"PLAYER reset the opponents systems"},
            {type: "statChanges", attack_dmg: 30}
        ]
    },
    circuitPy: {
        name: "Power Overload",
        description: "Overloads servos dealing a massive 15 DMG",
        completed: [
            {type: "dialogue", dialogue:"PLAYER overloaded power through CircuitPY"},
            {type: "statChanges", attack_dmg: 15}
        ]
    },
    // Support
    debug: {
        name: "Debug",
        description: "Fixing errors in code, healing self",
        completed: [
            {type: "dialogue", dialogue:"PLAYER debugged code, restoring health"},
            {type: "statChanges", health_gain: 20}
        ]
    },
    help: {
        name: "Call for Help",
        description: "Calling for a friend to help you, restore health",
        completed: [
            {type: "diaglogue", diaglogue:"PLAYER called for help, restoring health"},
            {type: "statChanges", health_gain: 20}
        ]
    },
    // Special
    hacks: {
        name: "Hacks",
        description: "Hack enemy to dealing massive damage and healing some of damage dealt",
        completed: [
            {type: "dialogue", dialogue:"PLAYER hacked enemy, dealing massive damage"},
            {type: "statChanges", attack_dmg: 40},
            {type: "statChanges", health_steal: 10}
        ]
    },
    stackovf: {
        name: "Stack Overflow",
        description: "Go to stackoverflow to find solutions, heal all damage dealt",
        completed: [
            {type: "dialogue", dialogue:"PLAYER visited stackoverflow"},
            {type: "statChanges", health_steal: 40}
        ]
    },
    /* C++ */
    // Attack
    SEGFAULT: {
        name: "SEGFAULT",
        description: "SEGMENTATION FAULT",
        completed: [
            {type: "dialogue", dialogue:"C of the Slup SEGFAULT'd you dealing 25 DMG"},
            {type: "statChanges", attack_dmg: 25}
        ]
    },
    DoubleFree: {
        name: "Double Free",
        description: "Double Free Detected in tcache 2",
        completed: [
            {type: "dialogue", dialogue:"C++ Double Free'd the PLAYER"},
            {type: "statChanges", attack_dmg: 20}
        ]
    },
    // Support
    gdb: {
        name: "gdb",
        description: "C++ calls for gdb to help, restoring health",
        completed: [
            {type: "dialogue", dialogue:"gdb helped C++, healing C++"},
            {type: "statChanges", health_gain: 10}
        ]
    },
    otherc: {
        name: "Other C programs",
        description: "Call C and C# to help, restoring health",
        completed: [
            {type: "dialogue", dialogue:"C++ called for C and C#, restoring health"},
            {type: "statChanges", health_gain: 20}
        ]
    },
    // Special
    struct: {
        name: "Struct",
        description: "C++ created a struct to help",
        completed: [
            {type: "dialogue", dialogue:"Struct created to help C++"},
            {type: "statChanges", attack_dmg: 20},
            {type: "statChanges", health_gain: 5}
        ]
    },
    memleak: {
        name: "Memory Leak",
        description: "Leaks memory from PLAYER, stealing health",
        completed: [
            {type: "dialogue", dialogue:"Leaked memory from PLAYER"},
            {type: "statChanges", health_steal: 20}
        ]
    },
    /* Java */
    // Attack
    PointerOfNull: {
        name: "Pointer of NULL",
        description: "Throws NULL pointer exception",
        completed: [
            {type: "dialogue", dialogue:"Java-n used the devestating exception Pointer of NULL dealind 20 DMG"},
            {type: "statChanges", attack_dmg: 20}
        ]
    },
    Lambda: {
        name: "Lambda Shot",
        description: "Shoots a Lambda function",
        completed: [
            {type: "dialogue", dialogue:"PythOS uses lambda shot dealing a devestating 35 DMG"},
            {type: "statChanges", attack_dmg: 35}
        ]
    },
    DoubleFree: {
        name: "Double Free",
        description: "Double Free Detected in tcache 2",
        completed: [
            {type: "dialogue", dialogue:"DOUBLE FREE OR CORRUPTION (CORE DUMPED)"},
            {type: "statChanges", attack_dmg: 40}
        ]
    },
    IllegalArgument: {
        name: "Illegal Argument",
        description: "Throws Illegal Argument Exception",
        completed: [
            {type: "dialogue", dialogue:"Java-n threw an Illegal Argument dealing 25 DMG"},
            {type: "statChanges", attack_dmg: 25}
        ]
    },
    Laser: {
        name: "BOT Laser",
        description: "Small laser attack",
        completed: [
            {type: "dialogue", dialogue:"Bot shot a small laser dealing 7 DMG"},
            {type: "statChanges", attack_dmg: 7}
        ]
    },
    Syntax: {
        name: "Syntax Error",
        description: "Error writing code",
        completed: [
            {type: "dialogue", dialogue:"PythOS caused a syntax error, dealing 20 DMG"},
            {type: "statChanges", attack_dmg: 20}
        ]
    },
    Corrupted: {
        name: "Corrupted Files",
        description: "Files in PC have been corrupted, damaging PLAYER",
        completed: [
            {type: "dialogue", dialogue:"Some files have been corrupted, and cannot\n be recovered dealing 20 DMG"},
            {type: "statChanges", attack_dmg: 20},
        ]
    },
    Update: {
        name: "Windows Update",
        description: "Windows forcing an update, dealing damage to PLAYER",
        completed: [
            {type: "dialogue", dialogue:"Windows forced an update dealing 15 DMG"},
            {type: "statChanges", attack_dmg: 15}
        ]
    },
    SpaghettiCode: {
        name: "Spaghetti Code",
        description: "Unorganized, buggy code, causes mental damage to PLAYER",
        completed: [
            {type: "dialogue", dialogue:"Programmer wrote bad code, causing psychological\ndamage dealing 30 DMG"},
            {type: "statChanges", attack_dmg: 25}
        ]
    },
    SleepDepr: {
        name: "Sleep Deprivation",
        description: "Takes away 3 hours of sleep time for PLAYER, dealing damage",
        completed: [
            {type: "dialogue", dialogue:"The Programmer's sleep deprivation caused you to\nbecome sleep deprived dealin 20 DMG"},
            {type: "statChanges", attack_dmg: 20}
        ]
    },
}