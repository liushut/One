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
var NumCountDown = (function (_super) {
    __extends(NumCountDown, _super);
    function NumCountDown() {
        var _this = _super.call(this) || this;
        _this.cb = null; // 结束callback
        _this.leftSecond = 0;
        _this.intervalID = 0;
        _this.isPause = false;
        _this.skinName = "NumCountDownSkin";
        return _this;
    }
    NumCountDown.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    NumCountDown.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    NumCountDown.prototype.start = function (second) {
        var _this = this;
        this.stop();
        this.isPause = false;
        this.leftSecond = second;
        this.count();
        this.intervalID = setInterval(function () { _this.count(); }, 1000);
    };
    NumCountDown.prototype.pause = function () {
        this.isPause = true;
    };
    NumCountDown.prototype.stop = function () {
        this.label.text = "";
        clearInterval(this.intervalID);
    };
    NumCountDown.prototype.count = function () {
        this.label.text = this.leftSecond.toString();
        if (this.leftSecond == 0) {
            this.stop();
            if (this.cb != null) {
                this.cb();
            }
            return;
        }
        if (this.isPause) {
            return;
        }
        this.leftSecond--;
    };
    /**
     * 销毁前调用
     */
    NumCountDown.prototype.OnDestroy = function () {
        this.cb = null;
        this.stop();
    };
    return NumCountDown;
}(eui.Component));
__reflect(NumCountDown.prototype, "NumCountDown", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=NumCountDown.js.map