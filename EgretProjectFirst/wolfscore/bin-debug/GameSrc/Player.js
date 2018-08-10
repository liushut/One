var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Player = (function () {
    function Player(type) {
        this.userId = 2;
        this.userName = "教书先生";
        this.url = '';
        this.type = "b";
        this.score = 0;
        this.blood = 0;
        this.isDie = false;
        this.comboNum = 0;
        this.highComobNum = 0;
        this.perfect = 0;
        this.good = 0;
        this.miss = 0;
        this.isHalfLeave = false;
        this.type = type;
    }
    return Player;
}());
__reflect(Player.prototype, "Player");
//# sourceMappingURL=Player.js.map