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
var ZJ;
(function (ZJ) {
    /**
     * 作用跟egret.Event雷同，主要是为了在构造函数前置位传data。
     */
    var CommonEvent = (function (_super) {
        __extends(CommonEvent, _super);
        function CommonEvent(type, data, bubbles, cancelable) {
            return _super.call(this, type, bubbles, cancelable, data) || this;
        }
        return CommonEvent;
    }(egret.Event));
    ZJ.CommonEvent = CommonEvent;
    __reflect(CommonEvent.prototype, "ZJ.CommonEvent");
})(ZJ || (ZJ = {}));
//# sourceMappingURL=CommonEvent.js.map