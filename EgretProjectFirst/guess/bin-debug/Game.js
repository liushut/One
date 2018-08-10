var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Game = (function () {
    function Game() {
        this.hero = new Hero();
        this.monster = new Monster();
    }
    Game.prototype.init = function () {
        var i = this.monster.judgeHero(this.hero);
        if (i < 0) {
            console.log("game over");
        }
    };
    return Game;
}());
__reflect(Game.prototype, "Game");
