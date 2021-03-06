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
var SceneBegin = (function (_super) {
    __extends(SceneBegin, _super);
    function SceneBegin() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/eui_skins/SceneBeginSkin.exml";
        _this.StartBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            console.log("点击按钮咯");
            _this.parent.addChild(SceneLevels.Shared());
            _this.parent.removeChild(_this);
            SoundManager.Shared().PlayClick();
        }, _this);
        _this.btn_setting.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onclick_setting, _this);
        //开始播放音乐
        SoundManager.Shared().PlyaBGM();
        return _this;
    }
    SceneBegin.Shared = function () {
        if (SceneBegin.shared == null) {
            SceneBegin.shared = new SceneBegin();
        }
        return SceneBegin.shared;
    };
    SceneBegin.prototype.onclick_setting = function () {
        SoundManager.Shared().PlayClick();
        this.addChild(GameSetting.Shared());
    };
    return SceneBegin;
}(eui.Component));
__reflect(SceneBegin.prototype, "SceneBegin");
//# sourceMappingURL=SceneBegin.js.map