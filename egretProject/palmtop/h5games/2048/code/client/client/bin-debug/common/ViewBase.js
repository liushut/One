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
    var ViewBase = (function (_super) {
        __extends(ViewBase, _super);
        function ViewBase() {
            return _super.call(this) || this;
        }
        ViewBase.prototype.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        ViewBase.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        ViewBase.prototype.setData = function (data) {
        };
        ViewBase.prototype.show = function () {
        };
        ViewBase.prototype.onProgress = function (current, total) {
        };
        /**
         * 销毁界面时会被调用，一般重写进行回收操作。
         * 返回0表示正常结束。
         * 【注意】全局事件必须remove（例如EventManager和ENTER_FRAME），timeout必须clear。
         */
        ViewBase.prototype.onDestroy = function () {
            return _super.prototype.onDestroy.call(this);
        };
        return ViewBase;
    }(ZJ.ComponentBase));
    ZJ.ViewBase = ViewBase;
    __reflect(ViewBase.prototype, "ZJ.ViewBase", ["RES.PromiseTaskReporter"]);
})(ZJ || (ZJ = {}));
//# sourceMappingURL=ViewBase.js.map