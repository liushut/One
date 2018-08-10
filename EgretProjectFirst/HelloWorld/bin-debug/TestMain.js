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
/*
create by ls 20180623
 */
var TestMain = (function (_super) {
    __extends(TestMain, _super);
    function TestMain() {
        var _this = _super.call(this) || this;
        console.log("修改了文档");
        //添加方块实例
        var rect = new Rect();
        _this.addChild(rect);
        rect.type = RectType.NOCLICKABLE;
        return _this;
        // rect.onClick();
    }
    return TestMain;
}(egret.DisplayObjectContainer));
__reflect(TestMain.prototype, "TestMain");
//# sourceMappingURL=TestMain.js.map