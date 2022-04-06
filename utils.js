const utils = {
    canvasScale(num){
        return num * 16;
    },
    convertXY(x,y){
        return `${x*16-16},${y*16-16}`
    },
    nextPos(initX, initY, dir){
        let x = initX;
        let y = initY;
        const gridBox = 16;
        if(dir === "left"){
            x -= gridBox;
        } else if(dir === "right"){
            x += gridBox;
        } else if(dir === "up"){
            y -= gridBox;
        } else if(dir === "down"){
            y += gridBox;
        }
        return {x,y};
    },
    createEvent(name, detail){
        const event = new CustomEvent(name, {
            detail
        });
        document.dispatchEvent(event);
    },
}