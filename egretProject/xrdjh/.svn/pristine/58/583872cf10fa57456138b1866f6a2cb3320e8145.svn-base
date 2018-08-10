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
var GameView8 = (function (_super) {
    __extends(GameView8, _super);
    // 常量 
    function GameView8() {
        var _this = _super.call(this) || this;
        _this.skinName = "GameView8Skin";
        return _this;
    }
    GameView8.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    // 变量
    GameView8.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.noise_characters.textFlow = ZJ.LangUtil.getHtmlText("noise_characters");
        this.char_tf2t.textFlow = ZJ.LangUtil.getHtmlText("character_tf2t");
        this.char_pavlov.textFlow = ZJ.LangUtil.getHtmlText("character_pavlov");
        this.char_random.textFlow = ZJ.LangUtil.getHtmlText("character_random");
        this.noise_characters_end.textFlow = ZJ.LangUtil.getHtmlText("noise_characters_end");
        this.noise_characters_btn.label = ZJ.LangUtil.getText("noise_characters_btn");
        this.noise_characters_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onnoise_characters_btn, this);
        this.nextStep();
    };
    GameView8.prototype.onnoise_characters_btn = function () {
        ModuleUtil.openViewWithScratch(UIName.Game8, UIName.Game9);
    };
    GameView8.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
        return 0;
    };
    return GameView8;
}(GameViewBase));
__reflect(GameView8.prototype, "GameView8");
//# sourceMappingURL=GameView8.js.map