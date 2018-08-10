var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ZJ;
(function (ZJ) {
    var CommonConfig = (function () {
        function CommonConfig() {
        }
        CommonConfig.FRAME = 30;
        CommonConfig.UP = 0;
        CommonConfig.DOWN = 1;
        CommonConfig.LEFT = 2;
        CommonConfig.RIGHT = 3;
        return CommonConfig;
    }());
    ZJ.CommonConfig = CommonConfig;
    __reflect(CommonConfig.prototype, "ZJ.CommonConfig");
    var CommonEventName = (function () {
        function CommonEventName() {
        }
        CommonEventName.TABLE_LOADED = "TABLE_LOADED";
        CommonEventName.SOCKET_CONNECTED = "SOCKET_CONNECTED";
        CommonEventName.SOCKET_DATA = "SOCKET_DATA";
        CommonEventName.GESTURE_DIRECT = "GESTURE_DIRECT";
        /**
         * 渠道事件数据
         */
        CommonEventName.CHANNEL_DATA = "CHANNEL_DATA";
        return CommonEventName;
    }());
    ZJ.CommonEventName = CommonEventName;
    __reflect(CommonEventName.prototype, "ZJ.CommonEventName");
})(ZJ || (ZJ = {}));
//# sourceMappingURL=CommonConfig.js.map