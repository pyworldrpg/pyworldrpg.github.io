class Fighter {
    //takes a fighter_config variable and sets the fighter's global variables
    //to be equal to the fighter_config variables provided
    //fighter_config would include information about the specific fighter including
    //health, experience and level
    constructor(fighter_config, fight){
        Object.keys(fighter_config).forEach(key => {
            this[key] = fighter_config[key];
        })
        this.fight = fight;
    }

    //gets the current health of a fighter
    get currHealth(){
        const health = (this.health / this.maxHealth * 100);
        return health > 0 ? health : 0;  
    }

    //gets the current experience that a fighter has
    get currExperience(){
        const experience = (this.experience / this.maxExperience * 100);
        return experience > 0 ? experience : 0;  
    }

    //sets the xp gained after a fight is done
    get gainXp(){
        return this.level * 6; //(1 + this.fight.level/10));
    }

    //updates the stats of the specified figter
    updateStats(stats = {}){
        if(stats)
            Object.keys(stats).forEach(key => {
                this[key] = stats[key];
            });

        //looks for the html element containing the stat updates and changes them accordingly in order to
        //show the stats to the user during a fight
        this.hud.querySelector(".fighter-level").innerText = this.level;
        this.healthRect.forEach(health => health.style.width = `${this.currHealth}%`);
        this.experienceRect.forEach(experience => experience.style.width = `${this.currExperience}%`);
    }
    

    init(container){
        //creates an instance of the fight using one of the assets and then putting HTMl elements
        //on top of it for level, health, experience etc.
        this.hud = document.createElement("div");
        this.hud.classList.add("Fighter");
        this.hud.setAttribute("id", this.id);
        this.hud.setAttribute("player", this.player);
        this.hud.innerHTML = (`
            <p class="fighter-name">${this.name}</p>
            <p class="fighter-level"></p>
            <svg viewBox="0 0 32 3" class="fighter-health">
                <rect x=0 y=0 width="0%" height =3 fill="#42d44a"/>
                <rect x=0 y=0 width="0%" height =1 fill="#49eb53"/>
            </svg>
            <svg viewBox="0 0 32 2" class="fighter-experience">
                <rect x=0 y=0 width="0%" height =2.5 fill="#32b1ba"/>
                <rect x=0 y=0 width="0%" height =1 fill="#32c4cf"/>
            </svg>
            <p class="fighter-effects></p>
        `);

        //updates the health and exprience svg's in order to provide the animation effect
        this.healthRect = this.hud.querySelectorAll(".fighter-health > rect");
        this.experienceRect = this.hud.querySelectorAll(".fighter-experience > rect");
        container.appendChild(this.hud);
        this.updateStats();
    }
}