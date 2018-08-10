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
var GameView13 = (function (_super) {
    __extends(GameView13, _super);
    // 常量 
    function GameView13() {
        var _this = _super.call(this) || this;
        _this.skinName = "GameView13Skin";
        return _this;
    }
    GameView13.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    // 变量
    GameView13.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.setHtmlText(this.credits, "credits");
        this.setBtnHtmlText(this.game_mode, "game_mode");
        this.game_mode.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ongame_mode, this);
        this.setBtnHtmlText(this.sandbox_mode, "sandbox_mode");
        this.sandbox_mode.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onsandbox_mode, this);
        this.nextStep();
    };
    GameView13.prototype.ongame_mode = function () {
        // ModuleUtil.openViewWithScratch(UIName.Game13, UIName.Game1)
        var scratch = ZJ.UIManager.instance.openView(UIName.Scratch);
        scratch.setData({ customFunc: function () {
                var game1 = ZJ.UIManager.instance.openView(UIName.Game1);
                game1.nextStep(3);
                ZJ.UIManager.instance.destroyView(UIName.Game13);
            } });
    };
    GameView13.prototype.onsandbox_mode = function () {
        ModuleUtil.openViewWithScratch(UIName.Game13, UIName.Game10);
    };
    GameView13.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
        return 0;
    };
    return GameView13;
}(GameViewBase));
__reflect(GameView13.prototype, "GameView13");
//# sourceMappingURL=GameView13.js.map