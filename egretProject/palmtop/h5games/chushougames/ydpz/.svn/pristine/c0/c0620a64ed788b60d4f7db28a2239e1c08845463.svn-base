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
var AliLoadingView = (function (_super) {
    __extends(AliLoadingView, _super);
    function AliLoadingView() {
        var _this = _super.call(this) || this;
        // private loadingAnim: ImgAnim;
        _this.intervalID = 0;
        _this.ran1 = 0;
        _this.ran2 = 0;
        _this.SEND_PROGRESS = 6; // progress改变多少次发协议，可根据加载资源量调整
        _this.progressIndex = 0; // 当前progress记数
        return _this;
    }
    AliLoadingView.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        // bg异步，先用黑色挡着。
        var black = ZJ.ShapeUtil.getRect(0x000, 1, this.stage.stageWidth, this.stage.stageHeight);
        this.addChild(black);
        var y = 500;
        //进度条
        var pb = new eui.ProgressBar();
        pb.skinName = "YYLoadingPBSkin";
        this.progress = pb;
        this.progress.width = 450;
        this.progress.height = 62;
        this.progress.minimum = 0;
        this.progress.maximum = 100;
        this.progress.horizontalCenter = 0;
        this.progress.y = y + 435;
        this.progress.scaleX = 1.3;
        this.progress.scaleY = 1.3;
        this.progress.labelFunction = function (number, maxNumber) {
            return number + "%";
        };
        this.addChild(this.progress);
        var ig = new eui.Image();
        ig.source = "load_img03_png";
        ig.horizontalCenter = 0;
        ig.y = y + 630;
        ig.width = 510;
        ig.height = 100;
        ig.alpha = 0.2;
        this.addChild(ig);
        this.load3 = new eui.Label();
        this.load3.text = "等待对手加入游戏...";
        this.load3.horizontalCenter = 0;
        this.load3.y = y + 660;
        this.load3.size = 40;
        this.load3.textColor = 0xffffff;
        this.addChild(this.load3);
        this.startCount();
        ZJ.SocketManager.instance.connectByUrlAli({ ip: ModuleConfig.ip, port: ModuleConfig.port });
    };
    AliLoadingView.prototype.startCount = function () {
        var _this = this;
        this.intervalID = setInterval(function () {
            _this.ran2 = Math.min(_this.ran2 + Math.random() * 8 + 2, 99);
            // this.load2.text = Math.floor(this.ran2).toString() + "%";
            _this.progress.value = Math.floor((_this.ran1 + _this.ran2) / 2);
        }, 200);
    };
    AliLoadingView.prototype.onProgress = function (current, total) {
        this.ran1 = Math.floor(current / total * 100);
        var aji = Math.floor(current / total * 100);
        if (aji == 100) {
            ALISDK.CatcherSDK.instance().updateProgress(ALISDK.CatcherSDK.ProgressState.COMPLETED, aji);
        }
        else {
            if (this.progressIndex == this.SEND_PROGRESS - 1) {
                ALISDK.CatcherSDK.instance().updateProgress(ALISDK.CatcherSDK.ProgressState.PROGRESSING, aji);
            }
            this.progressIndex = ++this.progressIndex % this.SEND_PROGRESS;
        }
    };
    AliLoadingView.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
        return 0;
    };
    return AliLoadingView;
}(ZJ.ViewBase));
__reflect(AliLoadingView.prototype, "AliLoadingView");
//# sourceMappingURL=AliLoadingView.js.map