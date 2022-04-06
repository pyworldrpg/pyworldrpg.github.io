class GameAsset {
    constructor(asset_config){
        this.x = asset_config.x || 0;
        this.y = asset_config.y || 0;
        this.move_direction = asset_config.direction || "down";
        this.cut_x = asset_config.cut_x || 32;
        this.cut_y = asset_config.cut_y || 32;
        this.sprite = new Sprite({
            gameAsset: this,
            resize_scale: asset_config.resize_scale,
            src: asset_config.src,
        })
        this.dialogue = asset_config.dialogue || {};
    }

    resize(){

    }

    movement(){

    }
}