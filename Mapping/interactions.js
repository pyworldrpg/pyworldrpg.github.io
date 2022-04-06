const blocked_safezone = {
    [utils.convertXY(5,4)]: true,
    [utils.convertXY(12,4)]: true,
    [utils.convertXY(15,4)]: true,
}

const safezone_dialogue = {
    [utils.convertXY(5,4)] : "Talk to Eddy [E]",
    [utils.convertXY(4,4)] : "Talk to Eddy [E]",
    [utils.convertXY(6,4)] : "Talk to Eddy [E]",
    [utils.convertXY(5,3)] : "Talk to Eddy [E]",
    [utils.convertXY(5,5)] : "Talk to Eddy [E]",
    [utils.convertXY(12,5)] : "Talk to Emma [E]",
    [utils.convertXY(11,4)] : "Talk to Emma [E]",
    [utils.convertXY(14,5)] : "Talk to Alex [E]",
    [utils.convertXY(15,5)] : "Talk to Alex [E]",
}

const safezone_dialogue_blk = {
    [utils.convertXY(5,4)] : true,
    [utils.convertXY(4,4)] : true,
    [utils.convertXY(6,4)] : true,
    [utils.convertXY(5,3)] : true,
    [utils.convertXY(5,5)] : true,
    [utils.convertXY(12,5)] : true,
    [utils.convertXY(11,4)] : true,
    [utils.convertXY(14,5)] : true,
    [utils.convertXY(15,5)] : true,
}