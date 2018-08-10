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
var YYLoadingView = (function (_super) {
    __extends(YYLoadingView, _super);
    function YYLoadingView() {
        var _this = _super.call(this) || this;
        // private loadingAnim: ImgAnim;
        _this.intervalID = 0;
        _this.ran1 = 0;
        _this.ran2 = 0;
        return _this;
    }
    YYLoadingView.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        // bg异步，先用黑色挡着。
        var black = ZJ.ShapeUtil.getRect(0x000, 1, this.stage.stageWidth, this.stage.stageHeight);
        this.addChild(black);
        var bg = new eui.Image();
        bg.source = "loading_bg_png";
        bg.height = 1920;
        // bg.width = 1080;
        bg.percentWidth = 100;
        this.addChild(bg);
        bg.horizontalCenter = 0;
        var x = -180;
        var y = 500;
        // let dx = 200;
        // let dy = 180;
        // let fontSize = 100;
        // let head1 = new eui.Image();
        // head1.source = "p1_png";
        // head1.horizontalCenter = x;
        // head1.y = y;
        // this.addChild(head1);
        // let head2 = new eui.Image();
        // head2.source = "p2_png";
        // head2.horizontalCenter = x;
        // head2.y = y + dy;
        // this.addChild(head2);
        // this.load1 = new eui.Label();
        // this.load1.horizontalCenter = x + dx;
        // this.load1.y = y;
        // this.load1.size = fontSize;
        // this.addChild(this.load1);
        // this.load2 = new eui.Label();
        // this.load2.horizontalCenter = x + dx;
        // this.load2.y = y + dy;
        // this.load2.size = fontSize;
        // this.addChild(this.load2);
        //加载帧动画
        // this.loadingAnim = new ImgAnim(['logo_1_png', 'logo_2_png', 'logo_3_png', 'logo_4_png', 'logo_5_png', 'logo_6_png',]);
        // this.loadingAnim.horizontalCenter = 0;
        // this.loadingAnim.y = y + 0;
        // this.loadingAnim.scaleX = 1.5;
        // this.loadingAnim.scaleY = 1.5;
        // this.addChild(this.loadingAnim);
        // this.loadingAnim.interval = 120;
        // this.loadingAnim.play();
        var gLangren = new eui.Group();
        this.addChild(gLangren);
        gLangren.horizontalCenter = 0;
        gLangren.y = y;
        ZJ.ResManager.instance.loadMovieClip("yylangren", "yylangren", function (mc) {
            gLangren.addChild(mc);
            mc.scaleX = 1.5;
            mc.scaleY = 1.5;
            mc.x = -195;
            mc.gotoAndPlay("tiao", -1);
        });
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
    };
    YYLoadingView.prototype.startCount = function () {
        var _this = this;
        this.intervalID = setInterval(function () {
            _this.ran2 = Math.min(_this.ran2 + Math.random() * 8 + 2, 99);
            // this.load2.text = Math.floor(this.ran2).toString() + "%";
            _this.progress.value = Math.floor((_this.ran1 + _this.ran2) / 2);
        }, 200);
    };
    YYLoadingView.prototype.onProgress = function (current, total) {
        // this.load1.text = Math.floor(current / total * 100) + "%";
        this.ran1 = Math.floor(current / total * 100);
        this.progress.value = Math.floor((this.ran1 + this.ran2) / 2);
    };
    YYLoadingView.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
        clearInterval(this.intervalID);
        // this.loadingAnim.pause();
        return 0;
    };
    return YYLoadingView;
}(ZJ.ViewBase));
__reflect(YYLoadingView.prototype, "YYLoadingView");
//# sourceMappingURL=YYLoadingView.js.map