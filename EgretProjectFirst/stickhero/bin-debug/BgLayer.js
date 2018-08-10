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
/**
 * 背景层
 */
var BgLayer = (function (_super) {
    __extends(BgLayer, _super);
    function BgLayer(bgMove) {
        var _this = _super.call(this) || this;
        _this.init(bgMove);
        return _this;
    }
    BgLayer.prototype.init = function (bgMove) {
        //当前屏幕大小
        var bgWidth = egret.MainContext.instance.stage.stageWidth;
        var bgHeight = egret.MainContext.instance.stage.stageHeight;
        //随机背景
        var bgIndex = Math.floor(Math.random() * 5 + 1);
        var curBg = new egret.Bitmap();
        curBg.texture = RES.getRes("bg" + bgIndex + "_jpg");
        this.addChild(curBg);
        this.bg1 = curBg;
        if (bgMove) {
            var bg2 = new egret.Bitmap();
            bg2.texture = RES.getRes("bg" + bgIndex + "_jpg");
            bg2.x = this.bg1.x + this.bg1.width;
            this.addChild(bg2);
            this.bg2 = bg2;
            //创建计时器
            var timer = new egret.Timer(1000 / 60, 0);
            timer.addEventListener(egret.TimerEvent.TIMER, this.bgMove, this);
            this.timer = timer;
            this.timer.start();
        }
        //背景图2要添加月亮
        if (bgIndex == 2) {
            var moon = new egret.Bitmap();
            moon.texture = RES.getRes("moon_png");
            this.addChild(moon);
            moon.y = moon.height / 10;
        }
    };
    BgLayer.prototype.bgMove = function () {
        var speed = 3;
        var bg1 = this.bg1;
        var bg2 = this.bg2;
        this.bg1.x -= speed;
        this.bg2.x -= speed;
        //背景循环   
        //如果完全出屏幕了
        if (bg1.x <= (-bg1.width)) {
            bg1.x = bg2.x + bg1.width;
        }
        else if (bg2.x <= (-bg2.width)) {
            bg2.x = bg1.x + bg2.width;
        }
    };
    return BgLayer;
}(egret.DisplayObjectContainer));
__reflect(BgLayer.prototype, "BgLayer");
//# sourceMappingURL=BgLayer.js.map