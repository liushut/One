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
var YuanJiao = (function (_super) {
    __extends(YuanJiao, _super);
    function YuanJiao() {
        var _this = _super.call(this) || this;
        _this.id = 0;
        _this.skinName = "YuanJiaoSkin";
        return _this;
    }
    return YuanJiao;
}(eui.Component));
__reflect(YuanJiao.prototype, "YuanJiao", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=YuanJiao.js.map