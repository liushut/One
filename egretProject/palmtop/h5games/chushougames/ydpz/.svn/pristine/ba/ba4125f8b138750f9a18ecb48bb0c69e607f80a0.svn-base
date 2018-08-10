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
var ReadyGo = (function (_super) {
    __extends(ReadyGo, _super);
    function ReadyGo() {
        var _this = _super.call(this) || this;
        _this.READY_TIME = 2000;
        _this.GO_TIME = 500;
        _this.cb = null; // 结束callback
        _this.skinName = "ReadyGoSkin";
        return _this;
    }
    ReadyGo.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    ReadyGo.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    ReadyGo.prototype.start = function () {
        var _this = this;
        this.stop();
        egret.Tween.get(this.ready).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 400).wait(500).to({ alpha: 0 }, 500).call(function () {
            egret.Tween.get(_this.go).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 200).wait(300).to({ alpha: 0 }, 300).call(function () {
                if (_this.cb != null) {
                    _this.cb();
                }
            }, _this);
        }, this);
    };
    ReadyGo.prototype.stop = function () {
        egret.Tween.removeTweens(this.ready);
        egret.Tween.removeTweens(this.go);
        this.ready.alpha = 0;
        this.ready.scaleX = 0.8;
        this.ready.scaleY = 0.8;
        this.go.alpha = 0;
        this.go.scaleX = 2;
        this.go.scaleY = 2;
    };
    /**
     * 销毁前调用
     */
    ReadyGo.prototype.OnDestroy = function () {
        this.cb = null;
        this.stop();
    };
    return ReadyGo;
}(eui.Component));
__reflect(ReadyGo.prototype, "ReadyGo", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=ReadyGo.js.map