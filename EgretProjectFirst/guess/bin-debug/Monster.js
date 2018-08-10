var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Monster = (function () {
    function Monster() {
        this.x = 0;
        this.y = 0;
        this.dx = 0;
        this.dy = 0;
    }
    Monster.prototype.init = function () {
        this.dx = 100;
        this.dy = 100;
    };
    Monster.prototype.judgeHero = function (hero) {
        if (hero.x > this.x && hero.x < (this.x + this.dx)) {
            return -1; //游戏结束
        }
    };
    return Monster;
}());
__reflect(Monster.prototype, "Monster");
