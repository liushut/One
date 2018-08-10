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
var GameView4 = (function (_super) {
    __extends(GameView4, _super);
    // 常量 
    function GameView4() {
        var _this = _super.call(this) || this;
        _this.skinName = "GameView4Skin";
        return _this;
    }
    GameView4.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    // 变量
    GameView4.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.evolution_intro.textFlow = ZJ.LangUtil.getHtmlText("evolution_intro");
        this.evolution_intro_1.textFlow = ZJ.LangUtil.getHtmlText("evolution_intro_1");
        this.evolution_intro_2.textFlow = ZJ.LangUtil.getHtmlText("evolution_intro_2");
        this.evolution_intro_3.textFlow = ZJ.LangUtil.getHtmlText("evolution_intro_3");
        this.evolution_intro_footer.textFlow = ZJ.LangUtil.getHtmlText("evolution_intro_footer");
        this.evolution_intro_button.label = ZJ.LangUtil.getText("evolution_intro_button");
        this.evolution_intro_button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onevolution_intro_button, this);
    };
    GameView4.prototype.onevolution_intro_button = function () {
        ModuleUtil.openViewWithScratch(UIName.Game4, UIName.Game5);
    };
    GameView4.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
        return 0;
    };
    return GameView4;
}(GameViewBase));
__reflect(GameView4.prototype, "GameView4");
//# sourceMappingURL=GameView4.js.map