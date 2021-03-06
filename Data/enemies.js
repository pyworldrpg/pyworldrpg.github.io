/**
 * Details for all enemies 
 */
window.Enemies = { 
    "PythOS": {
        name: "PythOS",
        src: "/Images/Enemies/snake.png",
        map_src: "url(/Images/Maps/RoomOfPy.png)",
        intro_msg: "You will facccce the conssssequencesssss of challenging me!!",
        death_msg: "The other fragmentors will never forgivee you! CUUURSSEEE YOUUU!!!!",
        width: "32px",
        anim_steps: 4,
        anim_pixels: "-128px",
        anim_seconds: "0.75s",
        scale: "scale(2.5)",
        health: 150,
        maxHealth: 150,
        experience: 50,
        id: "enemy-hud",
        maxExperience: 50,
        level: 12,
        player: "enemy",
        attacks: ["circuitPy", "Syntax"],
        support: ["ClearCache", "ImportLib"],
        special: ["DrainPower", "MachineLearning"]
    },
    "C of the Sulp": {
        name: "C of the Sulp",
        src: "/Images/Enemies/big_c++.png",
        map_src: "url(/Images/Maps/RoomOfPy.png)",
        intro_msg: "Core Dump (Segmentation Fault) - Error Found, Attempting removal",
        death_msg: "SIGKILL Initiated, Program: FRAGMENTATION - TERMINATED",
        width: "32px",
        anim_steps: 12,
        anim_pixels: "-384px",
        anim_seconds: "2s",
        scale: "scale(2.5)",
        health: 20,
        maxHealth: 300,
        experience: 50,
        id: "enemy-hud",
        maxExperience: 50,
        level: 32,
        player: "enemy",
        attacks: ["SEGFAULT", "DoubleFree"],
        support: ["debug", "gdb"],
        special: ["struct", "SIGKILL"]
    },
    "Java-n the Exception": {
        name: "Java-n the Exception",
        src: "/Images/Enemies/java.png",
        map_src: "url(/Images/Maps/RoomOfJava.png)",
        intro_msg: "I am Java-n the Exception, the prideful king of coffee!",
        death_msg: "Mark my words, the fragmentation will live on!!!",
        width: "48px",
        anim_steps: 4,
        anim_pixels: "-192px",
        anim_seconds: "0.75s",
        scale: "scale(2.5)",
        health: 25,
        maxHealth: 200,
        experience: 50,
        id: "enemy-hud",
        maxExperience: 50,
        level: 24,
        player: "enemy",
        attacks: ["PointerOfNull", "IllegalArgument"],
        support: ["ClearCache", "JVM"],
        special: ["GradleBuild"]
    },
    "The BOT": {
        name: "The BOT",
        src: "/Images/Enemies/bot.png",
        map_src: "url(/Images/Maps/Road.png)",
        intro_msg: "beep boop bEeEEp bOoOOpP BEEEEP BOOOOOPPP!!!",
        death_msg: "*Sad Robot Noises*",
        width: "40px",
        anim_steps: 4,
        scale: "scale(1.5)",
        anim_pixels: "-160px",
        anim_seconds: "0.75s",
        health: 25,
        maxHealth: 75,
        experience: 50,
        id: "enemy-hud",
        maxExperience: 50,
        level: 3,
        player: "enemy",
        attacks: ["Laser"],
        support: ["Repair"],
        special: ["DrainPower"]
    },
    "Sleepy": {
        name: "Sleepy the Programmer",
        src: "/Images/Enemies/programmer.png",
        map_src: "url(/Images/Maps/Road.png)",
        intro_msg: "ZZZzzzzz gotta finish the ZZZzzzzz CPEN 212 lab ZZZzzzz",
        death_msg: "I think I'm going to pass out now",
        width: "32px",
        anim_steps: 4,
        scale: "scale(2)",
        anim_pixels: "-128px",
        anim_seconds: "0.75s",
        health: 125,
        maxHealth: 125,
        experience: 50,
        id: "enemy-hud",
        maxExperience: 50,
        level: 10,
        player: "enemy",
        attacks: ["SpaghettiCode", "SleepDepr"],
        support: ["Caffeine"],
        special: ["Project"]
    },
    "Windows": {
        name: "Bill Gates",
        src: "/Images/Enemies/windows.png",
        map_src: "url(/Images/Maps/Road.png)",
        intro_msg: "Microsoft is greater than Mac and you're about to get smacked",
        death_msg: "*Windows XP shut down noises*",
        width: "32px",
        anim_steps: 4,
        scale: "scale(2)",
        anim_pixels: "-128px",
        anim_seconds: "0.75s",
        health: 100,
        maxHealth: 100,
        experience: 50,
        id: "enemy-hud",
        maxExperience: 50,
        level: 7,
        player: "enemy",
        attacks: ["Corrupted", "Update"],
        support: ["Settings", "Antivirus"],
        special: ["BlueScreen"]
    },

    
}