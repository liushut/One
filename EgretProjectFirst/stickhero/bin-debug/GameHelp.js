var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
//道具类  
var GameHelp = (function (_super) {
    __extends(GameHelp, _super);
    function GameHelp() {
        var _this = _super.call(this) || this;
        _this.usingTool = false; //是否使用道具
        _this.stageH = egret.MainContext.instance.stage.stageHeight;
        _this.stageW = egret.MainContext.instance.stage.stageWidth;
        _this.init();
        return _this;
    }
    GameHelp.prototype.init = function () {
        var stageW = this.stageW;
        var stageH = this.stageH;
        // 分数背景
        var scoreBg = new egret.Bitmap();
        scoreBg.texture = RES.getRes("scoreBg_png");
        this.addChild(scoreBg);
        scoreBg.anchorOffsetX = scoreBg.width / 2;
        scoreBg.x = this.stageW / 2;
        scoreBg.y = scoreBg.height / 2;
        // 初始分数标签
        var scoreLabel = new egret.TextField();
        this.addChild(scoreLabel);
        scoreLabel.x = scoreBg.x;
        scoreLabel.y = scoreBg.y + scoreBg.height / 2;
        scoreLabel.size = 100;
        scoreLabel.textAlign = "center";
        scoreLabel.text = "0";
        scoreLabel.anchorOffsetX = scoreLabel.width / 2;
        scoreLabel.anchorOffsetY = scoreLabel.height / 2;
        this.scoreLabel = scoreLabel;
        console.log("this.scoreLabel创建");
    };
    return GameHelp;
}(egret.Sprite));
__reflect(GameHelp.prototype, "GameHelp");
//# sourceMappingURL=GameHelp.js.map