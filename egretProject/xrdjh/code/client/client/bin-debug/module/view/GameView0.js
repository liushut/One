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
var GameView0 = (function (_super) {
    __extends(GameView0, _super);
    // 常量 
    function GameView0() {
        var _this = _super.call(this) || this;
        _this.skinName = "GameView0Skin";
        return _this;
    }
    GameView0.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    // 变量
    GameView0.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.title.textFlow = ZJ.LangUtil.getHtmlText("title");
        this.subtitle.textFlow = ZJ.LangUtil.getHtmlText("subtitle");
        this.intro.textFlow = ZJ.LangUtil.getHtmlText("intro");
        this.loading_done.label = ZJ.LangUtil.getText("loading_done");
        this.loading_done.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onloading_done, this);
        this.intro_button.label = ZJ.LangUtil.getText("intro_button");
        this.intro_button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onintro_button, this);
        ZJ.UIManager.instance.destroyView(UIName.Loading);
        this.step0();
        this.share_button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.share, this);
        this.sound_button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sound, this);
        this.message_button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.message, this);
        this.message_button.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.message, this);
    };
    GameView0.prototype.share = function (event) {
        console.log("share");
    };
    GameView0.prototype.sound = function (event) {
        console.log("sound");
    };
    GameView0.prototype.message = function (event) {
        if (event.type == egret.TouchEvent.TOUCH_TAP) {
            console.log("message");
            ZJ.UIManager.instance.openView(UIName.Message);
        }
        else if (event.type == egret.TouchEvent.TOUCH_MOVE) {
            if (event.stageX > 0 && event.stageX < this.width &&
                event.stageY > 0 && event.stageY < this.height) {
                this.message_button.x = event.stageX;
                this.message_button.y = event.stageY;
            }
        }
    };
    GameView0.prototype.onloading_done = function () {
        this.nextStep(1);
    };
    GameView0.prototype.onintro_button = function () {
        this.nextStep(2);
    };
    GameView0.prototype.step0 = function () {
        this.g0.visible = true;
        this.g1.visible = false;
    };
    GameView0.prototype.step1 = function () {
        this.g0.visible = false;
        this.g1.visible = true;
        this.fadeIn(this.intro, 200);
        this.fadeIn(this.intro_button, 700);
    };
    GameView0.prototype.step2 = function () {
        ModuleUtil.openViewWithScratch(UIName.Game0, UIName.Game1);
    };
    GameView0.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
        return 0;
    };
    return GameView0;
}(GameViewBase));
__reflect(GameView0.prototype, "GameView0");
//# sourceMappingURL=GameView0.js.map