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
    var EventManager = (function (_super) {
        __extends(EventManager, _super);
        function EventManager() {
            return _super.call(this) || this;
        }
        Object.defineProperty(EventManager, "instance", {
            get: function () {
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        EventManager.prototype.init = function () {
            return 0;
        };
        EventManager._instance = new EventManager();
        return EventManager;
    }(egret.EventDispatcher));
    ZJ.EventManager = EventManager;
    __reflect(EventManager.prototype, "ZJ.EventManager");
})(ZJ || (ZJ = {}));
//# sourceMappingURL=EventManager.js.map