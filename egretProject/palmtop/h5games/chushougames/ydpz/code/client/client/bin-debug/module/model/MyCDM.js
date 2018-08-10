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
var MyCDM = (function (_super) {
    __extends(MyCDM, _super);
    function MyCDM() {
        var _this = _super.call(this) || this;
        _this.isReconnect = false;
        if (chushouGameConfig.launchMode == "50") {
            _this.gameStyle = 5;
            _this.DoCompetitionAuthRequest();
        }
        else if (chushouGameConfig.launchMode == "60") {
            _this.gameStyle = 6;
            var request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            request.open("http://dev-game.u17games.com:12025/getreplaydomain", egret.HttpMethod.GET);
            request.send();
            request.addEventListener(egret.Event.COMPLETE, _this.getConnectData, _this);
        }
        return _this;
    }
    Object.defineProperty(MyCDM, "instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new MyCDM();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    MyCDM.prototype.DoCompetitionAuthRequest = function () {
        var _this = this;
        ChushouSDK.instance.csAuthRequest(function (data) {
            var request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            var myUrl = "http://dev-game.u17games.com:12025/getdomain?open_id=" + ChushouSDK.instance.csAuthRequestData.openUid;
            request.open(myUrl, egret.HttpMethod.GET);
            request.send();
            request.addEventListener(egret.Event.COMPLETE, _this.getConnectData, _this);
            _this.CsAuthRequestCallBack();
        });
    };
    MyCDM.prototype.ConnectLANServerForCompetition = function () {
        this.gameStyle = 5;
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open("http://192.168.1.194:12010/getdomain?open_id=1", egret.HttpMethod.GET);
        request.send();
        request.addEventListener(egret.Event.COMPLETE, this.getConnectData, this);
    };
    MyCDM.prototype.ConnectLANServerForReplay = function () {
        this.gameStyle = 6;
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open("http://192.168.1.194:12010/getreplaydomain", egret.HttpMethod.GET);
        request.send();
        request.addEventListener(egret.Event.COMPLETE, this.getConnectData, this);
    };
    MyCDM.prototype.getConnectData = function (event) {
        var request = event.currentTarget;
        var data = JSON.parse(request.response);
        // egret.log("connect: " + `${data.type == 1 ? "ws" : "wss"}://${data.domain}:${data.port}`)
        this.connectUrl = (data.type == 1 ? "ws" : "wss") + "://" + data.domain + ":" + data.port;
        ZJ.SocketManager.instance.connectByUrl(this.connectUrl);
    };
    MyCDM.prototype.extendOnData = function (protoID, data) {
        switch (protoID) {
            case 10002:
                if (data.result == 1 || data.result == 3) {
                    ChushouSDK.instance.csExitGame();
                }
                else {
                    if (data.result == 0) {
                        this.myReconnectTicket = data.ticket;
                    }
                    this.doAction(this.OnData10002, data);
                }
                break;
            default:
                break;
        }
    };
    MyCDM.prototype.reconnect10002 = function () {
        egret.log("do Reconnect");
        ZJ.SocketManager.instance.connectByUrl(this.connectUrl);
        this.isReconnect = true;
    };
    return MyCDM;
}(ChushouDataModel));
__reflect(MyCDM.prototype, "MyCDM");
//# sourceMappingURL=MyCDM.js.map