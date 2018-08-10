var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Dragon = (function () {
    function Dragon() {
    }
    Dragon.prototype.init = function () {
        var dragonbonesData = RES.getRes("RobotGame_1_json");
        var textureData = RES.getRes("texture_json");
        var texture = RES.getRes("texture_png");
        //  let egretFctory:
    };
    return Dragon;
}());
__reflect(Dragon.prototype, "Dragon");
