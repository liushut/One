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
var GameViewBase = (function (_super) {
    __extends(GameViewBase, _super);
    function GameViewBase() {
        var _this = _super.call(this) || this;
        // 常量 
        _this.FADEIN_TIME = 500;
        _this.step = -1;
        return _this;
    }
    // ui控件
    GameViewBase.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    // 变量
    GameViewBase.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    GameViewBase.prototype.fadeIn = function (component, delay, cb) {
        if (delay === void 0) { delay = 100; }
        if (cb === void 0) { cb = null; }
        component.visible = true;
        component.alpha = 0;
        var tw = egret.Tween.get(component).wait(delay).to({ alpha: 1 }, this.FADEIN_TIME);
        if (cb) {
            tw.call(cb, this);
        }
    };
    /**
     * 主要用于同一按钮的下一步，其他情况建议指定参数，提高可读性。
     */
    GameViewBase.prototype.nextStep = function (forceStep) {
        if (forceStep === void 0) { forceStep = -1; }
        if (forceStep != -1) {
            this.step = forceStep;
        }
        else {
            ++this.step;
        }
        var str = "step" + this.step;
        if (this[str]) {
            console.log(str);
            this[str]();
        }
    };
    GameViewBase.prototype.setHtmlText = function (label, textID) {
        label.textFlow = ZJ.LangUtil.getHtmlText(textID);
    };
    GameViewBase.prototype.setLabelText = function (label, textID) {
        label.text = ZJ.LangUtil.getText(textID);
    };
    GameViewBase.prototype.setBtnHtmlText = function (btn, textID) {
        this.setHtmlText(btn.labelDisplay, textID);
    };
    GameViewBase.prototype.setBtnText = function (btn, textID) {
        btn.label = ZJ.LangUtil.getText(textID);
    };
    GameViewBase.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
        return 0;
    };
    return GameViewBase;
}(ZJ.ViewBase));
__reflect(GameViewBase.prototype, "GameViewBase");
//# sourceMappingURL=GameViewBase.js.map