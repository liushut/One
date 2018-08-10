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
//自己写的背景类
var Stage = (function (_super) {
    __extends(Stage, _super);
    function Stage() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    Stage.prototype.init = function () {
        var bg = new egret.Bitmap();
        bg.texture = RES.getRes("stage_png");
        bg.anchorOffsetX = bg.width / 2;
        this.addChild(bg);
        this.StageSprite = bg;
    };
    Object.defineProperty(Stage.prototype, "StageSprite", {
        get: function () {
            return this.stageSprite;
        },
        set: function (bg) {
            this.stageSprite = bg;
        },
        enumerable: true,
        configurable: true
    });
    return Stage;
}(egret.Sprite));
__reflect(Stage.prototype, "Stage");
//# sourceMappingURL=Stage.js.map