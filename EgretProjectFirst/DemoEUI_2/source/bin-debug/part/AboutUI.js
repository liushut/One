/**
 * Created by egret on 2016/1/26.
 */
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
var AboutUI = (function (_super) {
    __extends(AboutUI, _super);
    function AboutUI() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.uiCompHandler, _this);
        _this.skinName = "resource/custom_skins/aboutUISkin.exml";
        return _this;
    }
    AboutUI.prototype.uiCompHandler = function () {
        var _this = this;
        console.log("\t\tAboutUI uiCompHandler");
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.dispatchEventWith(GameEvents.EVT_CLOSE_ABOUT);
        }, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function (evt) {
            if (evt.stageX > 94 && evt.stageX < 194 && evt.stageY > 314 && evt.stageY < 414) {
                Toast.launch("美术：刘国萍\n程序：王建文\n策划：范承鑫");
            }
        }, this);
    };
    return AboutUI;
}(eui.Component));
__reflect(AboutUI.prototype, "AboutUI");
//# sourceMappingURL=AboutUI.js.map