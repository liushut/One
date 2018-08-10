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
var LoadingView = (function (_super) {
    __extends(LoadingView, _super);
    function LoadingView() {
        var _this = _super.call(this) || this;
        _this.intervalID = 0;
        _this.ran1 = 0;
        _this.ran2 = 0;
        _this.skinName = "resource/eui_skins/view/LoadingView.exml";
        return _this;
    }
    LoadingView.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    LoadingView.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        // bg异步，先用黑色挡着。
        var black = ZJ.ShapeUtil.getRect(0x000, 1, this.stage.stageWidth, this.stage.stageHeight);
        this.black.addChild(black);
    };
    LoadingView.prototype.onProgress = function (current, total) {
        this.load1.text = Math.floor(current / total * 100) + "%";
    };
    LoadingView.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
        clearInterval(this.intervalID);
        return 0;
    };
    return LoadingView;
}(ZJ.ViewBase));
__reflect(LoadingView.prototype, "LoadingView");
//# sourceMappingURL=LoadingView.js.map