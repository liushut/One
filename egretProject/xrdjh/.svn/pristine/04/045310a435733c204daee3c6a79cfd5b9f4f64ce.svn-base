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
var GameView10 = (function (_super) {
    __extends(GameView10, _super);
    // 常量 
    function GameView10() {
        var _this = _super.call(this) || this;
        _this.reproduceSteps = 0;
        _this.skinName = "GameView10Skin";
        return _this;
    }
    GameView10.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    // 变量
    GameView10.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.label_start.label = ZJ.LangUtil.getText("label_start");
        this.label_start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onlabel_start, this);
        this.label_step.label = ZJ.LangUtil.getText("label_step");
        this.label_step.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onlabel_step, this);
        this.label_reset.label = ZJ.LangUtil.getText("label_reset");
        this.label_reset.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onlabel_reset, this);
        this.setHtmlText(this.sandbox_end, "sandbox_end");
        this.setBtnText(this.sandbox_end_btn, "sandbox_end_btn");
        this.sandbox_end_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onsandbox_end_btn, this);
        this.nextStep();
    };
    GameView10.prototype.onsandbox_end_btn = function () {
        this.nextStep();
    };
    GameView10.prototype.onlabel_start = function () {
        // if (o.tournament.isAutoPlaying) {
        //     publish("tournament/autoplay/stop");
        // } else {
        //     publish("tournament/autoplay/start");
        // }
        // 临时
        this.onTournamentCompleted("reproduce");
    };
    GameView10.prototype.onTournamentCompleted = function (step) {
        if (step == "reproduce") {
            this.reproduceSteps++;
            if (this.reproduceSteps == 6) {
            }
        }
    };
    GameView10.prototype.onlabel_step = function () {
    };
    GameView10.prototype.onlabel_reset = function () {
    };
    GameView10.prototype.step0 = function () {
    };
    GameView10.prototype.step1 = function () {
        ModuleUtil.openViewWithScratch(UIName.Game10, UIName.Game11);
    };
    GameView10.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
        return 0;
    };
    return GameView10;
}(GameViewBase));
__reflect(GameView10.prototype, "GameView10");
//# sourceMappingURL=GameView10.js.map