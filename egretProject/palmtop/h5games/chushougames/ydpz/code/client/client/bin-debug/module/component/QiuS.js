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
var QiuS = (function (_super) {
    __extends(QiuS, _super);
    function QiuS() {
        var _this = _super.call(this) || this;
        _this.skinName = "QiuSSkin";
        return _this;
    }
    QiuS.prototype.childrenCreated = function () {
    };
    return QiuS;
}(eui.Component));
__reflect(QiuS.prototype, "QiuS", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=QiuS.js.map