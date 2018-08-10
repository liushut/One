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
var Rect = (function (_super) {
    __extends(Rect, _super);
    function Rect() {
        var _this = _super.call(this) || this;
        //绘制颜色  1 黑蓝   2白红 hei bai hong lan
        //颜色数值
        _this._colors = [0x000000, 0xffffff, 0xff0000, 0x0000ff];
        //当前显示颜色  数组下标
        _this._currentColor = 1;
        _this._type = RectType.NOCLICKABLE; //默认为不能被点击
        _this.touchEnabled = true;
        _this.draw();
        return _this;
    }
    //绘制方法
    Rect.prototype.draw = function () {
        var tw = Data.getRectWidth();
        this.width = 100;
        this.height = 100;
        this.graphics.lineStyle(1, 0x000000);
        this.graphics.beginFill(this._colors[this._currentColor]);
        this.graphics.drawRect(0, 0, tw, tw);
        this.graphics.endFill();
    };
    Object.defineProperty(Rect.prototype, "type", {
        get: function () {
            return this._type;
        },
        set: function (e) {
            this._type = e;
            if (this._type == RectType.NOCLICKABLE) {
                this._currentColor = 1;
            }
            else {
                this._currentColor = 0;
            }
            this.draw();
        },
        enumerable: true,
        configurable: true
    });
    Rect.prototype.onRectClick = function () {
        if (this._type == RectType.NOCLICKABLE) {
            this._currentColor = 3;
        }
        else {
            this._currentColor = 2;
        }
        this.draw();
    };
    return Rect;
}(egret.Sprite));
__reflect(Rect.prototype, "Rect");
//# sourceMappingURL=Rect.js.map