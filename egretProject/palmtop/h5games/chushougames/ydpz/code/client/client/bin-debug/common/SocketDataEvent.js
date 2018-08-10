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
    var SocketDataEvent = (function (_super) {
        __extends(SocketDataEvent, _super);
        function SocketDataEvent(type, bubbles, cancelable, data) {
            var _this = _super.call(this, type, bubbles, cancelable, data) || this;
            /**
             * result: yy 服务器是否正确处理
             * error: yy 服务器没正确处理时的错误文本
             * data99999: yy 返回的大协议中的数据
             */
            _this.data = null;
            return _this;
        }
        return SocketDataEvent;
    }(egret.Event));
    ZJ.SocketDataEvent = SocketDataEvent;
    __reflect(SocketDataEvent.prototype, "ZJ.SocketDataEvent");
})(ZJ || (ZJ = {}));
//# sourceMappingURL=SocketDataEvent.js.map