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
    var ComponentBase = (function (_super) {
        __extends(ComponentBase, _super);
        function ComponentBase() {
            return _super.call(this) || this;
            // this.skinName = Util.getClassName(this) + "Skin";
        }
        /**
         * 正常处理返回0
         */
        ComponentBase.prototype.onDestroy = function () {
            return 0;
        };
        return ComponentBase;
    }(eui.Component));
    ZJ.ComponentBase = ComponentBase;
    __reflect(ComponentBase.prototype, "ZJ.ComponentBase", ["eui.UIComponent", "egret.DisplayObject"]);
})(ZJ || (ZJ = {}));
//# sourceMappingURL=ComponentBase.js.map