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
var GameView12 = (function (_super) {
    __extends(GameView12, _super);
    // 常量 
    function GameView12() {
        var _this = _super.call(this) || this;
        _this.skinName = "GameView12Skin";
        return _this;
    }
    GameView12.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    // 变量
    GameView12.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        // 0
        this.setHtmlText(this.outro_1, "outro_1");
        this.setBtnHtmlText(this.outro_1_btn, "outro_1_btn");
        this.outro_1_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onoutro_1_btn, this);
        // 1
        this.setHtmlText(this.outro_2_credits, "outro_2_credits");
        this.setHtmlText(this.outro_2, "outro_2");
        this.setBtnHtmlText(this.outro_2_btn, "outro_2_btn");
        this.outro_2_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onoutro_2_btn, this);
        this.nextStep();
    };
    GameView12.prototype.onoutro_1_btn = function () {
        this.nextStep();
    };
    GameView12.prototype.onoutro_2_btn = function () {
        ModuleUtil.openViewWithScratch(UIName.Game12, UIName.Game13);
    };
    GameView12.prototype.step0 = function () {
        this.outro_2.visible = false;
        this.outro_2_credits.visible = false;
        this.outro_2_btn.visible = false;
        this.img.visible = false;
    };
    GameView12.prototype.step1 = function () {
        this.outro_1.visible = false;
        this.outro_1_btn.visible = false;
        this.fadeIn(this.outro_2, 100);
        this.fadeIn(this.img, 200);
        this.fadeIn(this.outro_2_credits, 200);
        this.fadeIn(this.outro_2_btn, 2000);
    };
    GameView12.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
        return 0;
    };
    return GameView12;
}(GameViewBase));
__reflect(GameView12.prototype, "GameView12");
//# sourceMappingURL=GameView12.js.map