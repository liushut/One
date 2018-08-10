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
var ScratchView = (function (_super) {
    __extends(ScratchView, _super);
    function ScratchView() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._isIn = false;
        _this.skinName = "ScratchViewSkin";
        return _this;
    }
    // private gMcOut: eui.Group
    ScratchView.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    ScratchView.prototype.childrenCreated = function () {
        var _this = this;
        _super.prototype.childrenCreated.call(this);
        ZJ.ResManager.instance.loadMovieClip("scratch", "scratch", function (mc, mcFactory) {
            _this.mcIn = mc;
            _this.mcIn.addEventListener(egret.Event.COMPLETE, function (e) {
                if (_this._isIn) {
                    _this._isIn = false;
                    _this.mcIn.rotation = 180;
                    _this.mcIn.gotoAndPlay("out", 1);
                    if (_this._data.customFunc) {
                        _this._data.customFunc();
                    }
                    else {
                        ZJ.UIManager.instance.openView(_this._data.to);
                        ZJ.UIManager.instance.destroyView(_this._data.from);
                    }
                }
                else {
                    ZJ.UIManager.instance.destroyView(UIName.Scratch);
                }
            }, _this);
            // this.mcFactory = mcFactory;
            _this.mcIn.scaleX = 12;
            _this.mcIn.scaleY = 12;
            _this.gMcIn.addChild(_this.mcIn);
            _this.setData(_this._data);
        });
    };
    /**
     * @param data {from:销毁界面,to:打开界面,customFunc:自定义处理}
     */
    ScratchView.prototype.setData = function (data) {
        this._data = data;
        if (this._data && this.mcIn) {
            this._isIn = true;
            this.mcIn.rotation = 0;
            this.mcIn.gotoAndPlay("in", 1);
        }
    };
    ScratchView.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
        return 0;
    };
    return ScratchView;
}(ZJ.ViewBase));
__reflect(ScratchView.prototype, "ScratchView");
//# sourceMappingURL=ScratchView.js.map