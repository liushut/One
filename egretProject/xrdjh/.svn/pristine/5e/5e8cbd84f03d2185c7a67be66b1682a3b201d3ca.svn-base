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
var GameView2 = (function (_super) {
    __extends(GameView2, _super);
    // 常量 
    function GameView2() {
        var _this = _super.call(this) || this;
        _this.skinName = "GameView2Skin";
        return _this;
    }
    GameView2.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    // 变量
    GameView2.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        // Score Text ID
        var scoreTextID = "";
        var score = GlobalData.score;
        if (score == 49)
            scoreTextID = "5";
        else if (score >= 34)
            scoreTextID = "4";
        else if (score >= 22)
            scoreTextID = "3";
        else if (score >= 8)
            scoreTextID = "2";
        else if (score == 7)
            scoreTextID = "1";
        else
            scoreTextID = "x";
        scoreTextID = "iterated_score_" + scoreTextID;
        this.score2.text = GlobalData.score.toString();
        this.iterated_score_start.textFlow = ZJ.LangUtil.getHtmlText("iterated_score_start");
        this.iterated_score_end.textFlow = ZJ.LangUtil.parseHtmlText(ZJ.LangUtil.getText(scoreTextID) + " " +
            ZJ.LangUtil.getText("iterated_score_end") + "\n" + ZJ.LangUtil.getText("who_were"));
        this.tft.textFlow = ZJ.LangUtil.getHtmlText("character_tft");
        this.all_d.textFlow = ZJ.LangUtil.getHtmlText("character_all_d");
        this.all_c.textFlow = ZJ.LangUtil.getHtmlText("character_all_c");
        this.grudge.textFlow = ZJ.LangUtil.getHtmlText("character_grudge");
        this.prober.textFlow = ZJ.LangUtil.getHtmlText("character_prober");
        this.characters_teaser.textFlow = ZJ.LangUtil.getHtmlText("characters_teaser");
        this.characters_button.label = ZJ.LangUtil.getText("characters_button");
        this.characters_button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.oncharacters_button, this);
    };
    GameView2.prototype.oncharacters_button = function () {
        ModuleUtil.openViewWithScratch(UIName.Game2, UIName.Game3);
    };
    GameView2.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
        return 0;
    };
    return GameView2;
}(GameViewBase));
__reflect(GameView2.prototype, "GameView2");
//# sourceMappingURL=GameView2.js.map