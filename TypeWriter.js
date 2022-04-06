class TypeWriter {
    constructor(text_config) {
        this.text_element = text_config.text_element;

        this.text = text_config.text;
        this.speed = text_config.speed || 60;

        this.timeout = null;
        this.effect_done = false;
    }

    revealChar(chars){
        const char = chars.splice(0,1)[0];
        char.span.classList.add("revealed");

        if(chars.length > 0){
            this.timeout = setTimeout(() => {
                this.revealChar(chars)
            }, char.delay);
        } else {
            this.effect_done = true;
        }
    }

    forceDone(){
        clearTimeout(this.timeout);
        this.effect_done = true;
        this.text_element.querySelectorAll("span").forEach(s => {
            s.classList.add("revealed");
        })
    }

    init(){
        let chars = [];
        this.text.split("").forEach(char => {
            let span = document.createElement("span");
            span.textContent = char;
            this.text_element.appendChild(span);

            chars.push({
                span,
                delay: char === " " ? 0 : this.speed
            });
        });

        this.revealChar(chars);
    }
}