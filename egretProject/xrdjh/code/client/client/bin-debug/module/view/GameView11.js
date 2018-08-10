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
var GameView11 = (function (_super) {
    __extends(GameView11, _super);
    // 常量 
    function GameView11() {
        var _this = _super.call(this) || this;
        _this.skinName = "GameView11Skin";
        return _this;
    }
    GameView11.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    // 变量
    GameView11.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.setHtmlText(this.conclusion_0, "conclusion_0");
        this.setHtmlText(this.conclusion_0123, "conclusion_0123");
        this.setHtmlText(this.conclusion_4, "conclusion_4");
        this.setBtnHtmlText(this.conclusion_btn, "conclusion_btn");
        this.conclusion_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onconclusion_btn, this);
        this.nextStep();
    };
    GameView11.prototype.onconclusion_btn = function () {
        ModuleUtil.openViewWithScratch(UIName.Game11, UIName.Game12);
    };
    GameView11.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
        return 0;
    };
    return GameView11;
}(GameViewBase));
__reflect(GameView11.prototype, "GameView11");
//# sourceMappingURL=GameView11.js.map