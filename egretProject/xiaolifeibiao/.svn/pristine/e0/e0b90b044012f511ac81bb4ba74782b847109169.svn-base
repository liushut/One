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
var ChushouLoadingView = (function (_super) {
    __extends(ChushouLoadingView, _super);
    function ChushouLoadingView() {
        var _this = _super.call(this) || this;
        // private loadingAnim: ImgAnim;
        _this.intervalID = 0;
        _this.ran1 = 0;
        _this.ran2 = 0;
        _this.SEND_PROGRESS = 10; // progress改变多少次发协议，可根据加载资源量调整
        _this.progressIndex = 0; // 当前progress记数
        return _this;
    }
    ChushouLoadingView.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        // bg异步，先用黑色挡着。
        var black = ZJ.ShapeUtil.getRect(0x000, 1, this.stage.stageWidth, this.stage.stageHeight);
        this.addChild(black);
    };
    ChushouLoadingView.prototype.startCount = function () {
        var _this = this;
        this.intervalID = setInterval(function () {
            _this.ran2 = Math.min(_this.ran2 + Math.random() * 8 + 2, 99);
            // this.load2.text = Math.floor(this.ran2).toString() + "%";
            _this.progress.value = Math.floor((_this.ran1 + _this.ran2) / 2);
        }, 200);
    };
    ChushouLoadingView.prototype.onProgress = function (current, total) {
        // this.load1.text = Math.floor(current / total * 100) + "%";
        // this.ran1 = Math.floor(current / total * 100);
        // this.progress.value = Math.floor((this.ran1 + this.ran2) / 2);
        if (this.progressIndex == this.SEND_PROGRESS - 1) {
            ChushouSDK.instance.csNotifyLoadProgress(current / total * 100);
        }
        this.progressIndex = ++this.progressIndex % this.SEND_PROGRESS;
    };
    ChushouLoadingView.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
        return 0;
    };
    return ChushouLoadingView;
}(ZJ.ViewBase));
__reflect(ChushouLoadingView.prototype, "ChushouLoadingView");
//# sourceMappingURL=ChushouLoadingView.js.map