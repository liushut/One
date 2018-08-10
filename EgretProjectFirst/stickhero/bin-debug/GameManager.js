var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
//游戏管理类
var GameManager = (function () {
    function GameManager() {
    }
    GameManager.setHeroIndex = function (val) {
        this.heroIndex = val;
    };
    GameManager.getHeroIndex = function () {
        return this.heroIndex;
    };
    GameManager.setCurScore = function (val) {
        this.curScore = val;
    };
    GameManager.getCurScore = function () {
        return this.curScore;
    };
    GameManager.heroIndex = 1; //英雄索引
    GameManager.curScore = 0; //当前分数
    return GameManager;
}());
__reflect(GameManager.prototype, "GameManager");
//# sourceMappingURL=GameManager.js.map