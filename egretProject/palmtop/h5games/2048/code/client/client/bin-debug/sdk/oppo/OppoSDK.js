var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var OppoSDK = (function () {
    function OppoSDK() {
        this.gameInfo = {}; //查询到的对局信息
        this.gameKey = "xxx"; //cp game key
        this.msgChannel = null;
        this.onMicStatusChangedData = {};
        this.onSpeakerStatusChangedData = {};
    }
    Object.defineProperty(OppoSDK, "instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new OppoSDK();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    //-----------game logic-----------------
    //初始化lib库
    OppoSDK.prototype.init = function (mode) {
        var _this = this;
        // addlistener
        this.msgChannel = BattlePlatform.msgChannel;
        this.msgChannel.setRecvCallback(function (cmd, param) {
            console.log("java cmd:" + cmd + param);
            switch (cmd) {
                case "infoRsp":
                    _this.gameInfo = BattlePlatform.jsonToObj(param);
                    if (_this.infoRsp) {
                        _this.infoRsp();
                    }
                    break;
                case "onMicStatusChanged":
                    _this.onMicStatusChangedData = BattlePlatform.jsonToObj(param);
                    if (_this.onMicStatusChanged) {
                        _this.onMicStatusChanged(_this.onMicStatusChangedData);
                    }
                    break;
                case "onSpeakerStatusChanged":
                    _this.onSpeakerStatusChangedData = BattlePlatform.jsonToObj(param);
                    if (_this.onSpeakerStatusChanged) {
                        _this.onSpeakerStatusChanged(_this.onSpeakerStatusChangedData);
                    }
                    break;
            }
        });
        // init
        var data = { "libVer": BattlePlatform.version, "mode": mode };
        this.msgChannel.send("init", BattlePlatform.objToJson(data));
    };
    //获取对局信息请求
    OppoSDK.prototype.infoReq = function () {
        this.msgChannel.send("infoReq", BattlePlatform.objToJson({ "gameKey": this.gameKey }));
    };
    //强制退出
    OppoSDK.prototype.forceQuit = function (reason, message) {
        var data = {};
        data.reason = reason;
        data.message = message;
        var json = BattlePlatform.objToJson(data);
        this.msgChannel.send("forceQuit", json);
    };
    //写数据白板
    OppoSDK.prototype.writeBlackboard = function (key, value) {
        var data = {};
        data.key = key;
        data.value = value;
        var json = BattlePlatform.objToJson(data);
        this.msgChannel.send("writeBlackboard", json);
    };
    return OppoSDK;
}());
__reflect(OppoSDK.prototype, "OppoSDK");
//# sourceMappingURL=OppoSDK.js.map