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
        _this._colors = [0x000000, 0xffffff, 0xff0000, 0x0000ff]; //颜色数组
        _this._type = RectType.NOCLICKABLE; //初始化为不可触摸
        _this.touchEnabled = true;
        _this.darw();
        return _this;
    }
    Rect.prototype.darw = function () {
        this.width = Data.getRectWidth();
        this.height = Data.getRectWidth();
        this.graphics.lineStyle(1, 0x000000);
        this.graphics.beginFill(this._colors[this._currentColor]);
        this.graphics.drawRect(0, 0, this.width, this.width);
        this.graphics.endFill();
    };
    Object.defineProperty(Rect.prototype, "type", {
        get: function () {
            return this._type;
        },
        set: function (type) {
            this._type = type;
            if (type != this._type) {
                if (this._type == RectType.CLICKABLE) {
                    this._currentColor = 0; //可以点击
                }
                else {
                    this._currentColor = 1; //不可点击
                }
                this.darw();
            }
        },
        enumerable: true,
        configurable: true
    });
    Rect.prototype.onClick = function () {
        if (this._type == RectType.CLICKABLE) {
            this._currentColor = 3;
        }
        else {
            this._currentColor = 2;
        }
        this.darw();
    };
    return Rect;
}(egret.Sprite));
__reflect(Rect.prototype, "Rect");
//# sourceMappingURL=Rect.js.map