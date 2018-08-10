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
//棍子类
var Stick = (function (_super) {
    __extends(Stick, _super);
    function Stick(kind) {
        var _this = _super.call(this) || this;
        _this.stickSprite = new egret.Bitmap();
        _this.init(kind);
        return _this;
    }
    Stick.prototype.init = function (kind) {
        this.stageWidth = egret.MainContext.instance.stage.stageWidth;
        this.stageHeight = egret.MainContext.instance.stage.stageHeight;
        this.growRate = 6;
        // let sprite = this.stickSprite;
        // let  timer = new egret.Timer(1000/60,0);
        //锚点为右下角然后旋转
        if (kind == 1) {
            var sprite = new egret.Bitmap();
            sprite.texture = RES.getRes("stick1_png");
            this.addChild(sprite);
            sprite.scaleX = 2;
            sprite.anchorOffsetX = sprite.width;
            sprite.anchorOffsetY = sprite.height;
            this.stickSprite = sprite;
            var timer = new egret.Timer(1000 / 60, 0);
            timer.addEventListener(egret.TimerEvent.TIMER, this.growHeight, this);
            this.timer = timer;
        }
        else if (kind == 2) {
            var sprite = new egret.Bitmap();
            sprite.texture = RES.getRes("lovered_png");
            this.addChild(sprite);
            sprite.width = 5;
            sprite.height = 5;
            sprite.scaleX = 3;
            this.stickSprite = sprite;
            var timer = new egret.Timer(1000 / 60, 0);
            timer.addEventListener(egret.TimerEvent.TIMER, this.growWidth, this);
            this.timer = timer;
        }
        //   this.timer = timer;
        //   this.addChild(sprite);
    };
    Stick.prototype.growHeight = function () {
        //如果超过屏幕一半  停止
        var dis = this.scaleY * this.stickSprite.height;
        if (dis >= this.stageHeight / 2) {
            console.log("超出屏幕一半");
            return;
        }
        this.scaleY += this.growRate;
        console.log("在屏幕Y之内");
    };
    Stick.prototype.growWidth = function () {
        if (this.stickSprite.width * this.scaleX >= this.stageWidth / 2) {
            console.log("x超出屏幕一半");
            return;
        }
        this.scaleX += this.growRate;
        console.log("在屏幕x之内");
    };
    return Stick;
}(egret.Sprite));
__reflect(Stick.prototype, "Stick");
//# sourceMappingURL=Stick.js.map