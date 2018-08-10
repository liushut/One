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
var GroupRect = (function (_super) {
    __extends(GroupRect, _super);
    function GroupRect() {
        var _this = _super.call(this) || this;
        _this._currentBlackIndex = 0;
        _this._currentRow = 0;
        _this.createRects();
        return _this;
    }
    GroupRect.prototype.createRects = function () {
        this._rects = [];
        for (var i = 0; i < 4; i++) {
            var obj = new Rect();
            this._rects.push(obj);
            obj.x = i * Data.getRectWidth();
            this.addChild(obj);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickRect, this);
        }
    };
    GroupRect.prototype.createBlackRect = function () {
        this.init();
        var tw = Math.random();
        if (tw >= 0 && tw < 0.25) {
            this._currentBlackIndex = 0;
        }
        else if (tw >= 0.25 && tw < 0.5) {
            this._currentBlackIndex = 1;
        }
        else if (tw >= 0.5 && tw < 0.75) {
            this._currentBlackIndex = 2;
        }
        else if (tw >= 0.75 && tw <= 1) {
            this._currentBlackIndex = 3;
        }
        this._rects[this._currentBlackIndex].type = RectType.CLICKABLE; //随机黑方块可以点击
    };
    GroupRect.prototype.init = function () {
        for (var i = 0; i < 4; i++) {
            this._rects[i].type = RectType.NOCLICKABLE;
        }
    };
    GroupRect.prototype.onClickRect = function (e) {
        e.target.onRectClick(); //改变颜色
        if (e.target.type == RectType.NOCLICKABLE || this._currentRow != Data.getRectRow() - 2) {
            //发出gameover事件
            this.dispatchEventWith("gameOver");
        }
        else {
            this.dispatchEventWith("clickRight");
        }
    };
    GroupRect.prototype.move = function () {
        this._currentRow++; //行数+1
        if (this._currentRow == Data.getRectRow()) {
            this._currentRow = 0;
            this.createBlackRect();
        }
        this.y = this._currentRow * Data.getRectWidth();
    };
    return GroupRect;
}(egret.Sprite));
__reflect(GroupRect.prototype, "GroupRect");
//# sourceMappingURL=GroupRect.js.map