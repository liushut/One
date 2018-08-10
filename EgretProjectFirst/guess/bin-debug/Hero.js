var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Hero = (function () {
    function Hero() {
        this.x = 0;
        this.y = 0;
        this.speed = 0;
        this.jump = 0;
        this.init();
    }
    Hero.prototype.init = function () {
        this.speed = 2;
        this.jump = 100;
    };
    return Hero;
}());
__reflect(Hero.prototype, "Hero");
