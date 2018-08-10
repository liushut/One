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
var FlyBlock = (function (_super) {
    __extends(FlyBlock, _super);
    function FlyBlock() {
        var _this = _super.call(this) || this;
        _this.posArray = [];
        //变量
        _this.curIndex = 0;
        // private rotateArray:Array<number> = [-28, -45, -90, -135, -160];
        _this.rotateArray = [-105, -105];
        // private moveTimeArray:Array<number> = [0, 90, 100, 80, 40];
        _this.moveTimeArray = [0, 320]; //320
        _this.moveTotalTime = 0;
        _this.callBack = null;
        _this.skinName = "FlyBlockSkin";
        for (var i = 0; i < _this.moveTimeArray.length; i++) {
            _this.moveTotalTime += _this.moveTimeArray[i];
        }
        return _this;
    }
    FlyBlock.prototype.play = function (pArray, particleSystem, hasBlock) {
        if (hasBlock === void 0) { hasBlock = true; }
        this.particleSystem = particleSystem;
        //完成动画初始化
        this.posArray = pArray;
        this.ball.visible = true;
        this.tail.scaleY = 0.1;
        this.tail.visible = true;
        this.tail.source = "tail_png";
        this.light_point.visible = true;
        this.horizontalCenter = this.posArray[0].x;
        this.verticalCenter = this.posArray[0].y;
        this.rotation = this.rotateArray[0];
        var array = ["J", "L", "Z", "S", "T", "O", "I"];
        if (hasBlock) {
            this.ball_block.source = "block_" + array[ZJ.MathUtil.randomRange(0, array.length)] + "_png";
            this.ball_block.scaleX = 0;
            this.ball_block.scaleY = 0;
            this.ball_block.rotation = 0;
            this.ball_block.visible = true;
            egret.Tween.get(this.ball_block).to({ scaleX: 1, scaleY: 1 }, this.moveTimeArray[1]);
            egret.Tween.get(this.ball_block).to({ rotation: 150 }, this.moveTotalTime);
        }
        this.particleSystem.emitterX = this.posArray[0].x;
        this.particleSystem.emitterY = this.posArray[0].y;
        this.particleSystem.start();
        this.moveNextPos();
    };
    FlyBlock.prototype.moveNextPos = function () {
        var _this = this;
        this.curIndex++;
        if (this.curIndex >= this.posArray.length) {
            this.light_point.visible = false;
            this.ball_block.visible = false;
            setTimeout(function () {
                _this.tail.visible = false;
            }, 50);
            if (this.callBack != null) {
                this.callBack(this.ball);
            }
            this.particleSystem.stop();
        }
        else {
            var posGroup = this.posArray[this.curIndex];
            egret.Tween.get(this.particleSystem).to({ emitterX: posGroup.x, emitterY: posGroup.y }, this.moveTimeArray[this.curIndex]);
            egret.Tween.get(this).to({ horizontalCenter: posGroup.x, verticalCenter: posGroup.y, rotation: this.rotateArray[this.curIndex] }, this.moveTimeArray[this.curIndex]).call(function () {
                _this.moveNextPos();
            });
            if (this.curIndex == 1) {
                egret.Tween.get(this.tail).to({ scaleY: 1 }, this.moveTimeArray[this.curIndex] / 2);
            }
            // else if(this.curIndex == 2){
            //     this.tail.source = "tail2_png";
            // }
        }
    };
    return FlyBlock;
}(eui.Component));
__reflect(FlyBlock.prototype, "FlyBlock", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=FlyBlock.js.map