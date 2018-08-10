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
var TestView = (function (_super) {
    __extends(TestView, _super);
    function TestView() {
        return _super.call(this) || this;
    }
    TestView.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    TestView.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        ZJ.UIManager.instance.destroyView(UIName.Loading);
        // ZJ.SocketManager.instance.addEventListener(ZJ.CommonEventName.SOCKET_CONNECTED, this.onSocketConnected, this)
        // ZJ.SocketManager.instance.addEventListener(ZJ.CommonEventName.SOCKET_DATA, this.onSocketData, this)
        this.initChushouTest();
        // ZJ.SocketManager.instance.connectByUrl(`ws://${ModuleConfig.ip}:${ModuleConfig.port}`);
        // this.initHitTest()
        // this.initFeibiao();
    };
    TestView.prototype.initFeibiao = function () {
        var img = new eui.Image();
        // img.source = ""
    };
    TestView.prototype.initHitTest = function () {
        var _this = this;
        // let btn1 = ZJ.ShapeUtil.getRect(0x123123, 1, 100, 50)
        var btn1 = new eui.Button();
        this.addChild(btn1);
        btn1.x = 0;
        btn1.y = 100;
        // btn1.width = 100
        // btn1.height = 50
        // let btn2 = ZJ.ShapeUtil.getRect(0x321321, 1, 100, 50)
        var btn2 = new eui.Button();
        this.addChild(btn2);
        btn2.x = 20;
        btn2.y = 100;
        // btn2.width = 100
        // btn2.height = 50
        setTimeout(function () {
            console.log(_this.myHitTest(btn1, btn2));
        }, 1000);
    };
    TestView.prototype.myHitTest = function (obj1, obj2) {
        var rect1 = obj1.getBounds();
        var rect2 = obj2.getBounds();
        rect1.x = obj1.x;
        rect1.y = obj1.y;
        rect2.x = obj2.x;
        rect2.y = obj2.y;
        return rect1.intersects(rect2);
    };
    TestView.prototype.onSocketConnected = function () {
        console.log("onSocketConnected");
    };
    TestView.prototype.onSocketData = function (e) {
        console.log("onSocketData");
    };
    // chushou test
    TestView.prototype.initChushouTest = function () {
        var sdk = new ChushouSDK();
        var x0 = 100;
        var y0 = 200;
        var dx = 600;
        var dy = 250;
        var xMax = 4;
        var labels = ["csAuthRequest", "csJoinRoom", "csQuitRoom", "csInviteToGame", "csKickOutUser",
            "csShareRoom", "csShareRecord", "csGetFriendList", "csGetUserRelationship", "csFollowUser",
            "csEnableMic", "csEnableAudioOutput", "onUserVolumeUpdate",
            "csExitGame", "csNotifyLoadProgress", "onNetworkStatusChange", "csGetAPIVersionInfo",
            "csInvokeRecharge", "onBalanceChanged", "csPurchaseProps", "csPayEntryFee", "csCheckEntryFee",
            "cs_10000", "cs_10001", "无视，进入游戏"];
        var ons = [sdk.csAuthRequest, sdk.csJoinRoom, sdk.csQuitRoom, sdk.csInviteToGame, sdk.csKickOutUser,
            sdk.csShareRoom, sdk.csShareRecord, sdk.csGetFriendList, sdk.csGetUserRelationship, sdk.csFollowUser,
            sdk.csEnableMic, sdk.csEnableAudioOutput, sdk.onUserVolumeUpdate,
            sdk.csExitGame, sdk.csNotifyLoadProgress, sdk.onNetworkStatusChange, sdk.csGetAPIVersionInfo,
            sdk.csInvokeRecharge, sdk.onBalanceChanged, sdk.csPurchaseProps, sdk.csPayEntryFee, sdk.csCheckEntryFee,
            this.cs_10000, this.cs_10001, this.enterGame];
        var btns = [];
        for (var i = 0, len = labels.length; i < len; ++i) {
            var btn = this.getChushouBtn();
            btn.x = x0 + i % xMax * dx;
            btn.y = y0 + Math.floor(i / xMax) * dy;
            btn.label = labels[i];
            btn.addEventListener(egret.TouchEvent.TOUCH_TAP, ons[i], this);
        }
    };
    TestView.prototype.getChushouBtn = function () {
        var btn = new eui.Button();
        this.addChild(btn);
        btn.width = 400;
        btn.height = 150;
        btn.labelDisplay.size = 40;
        return btn;
    };
    TestView.prototype.cs_10000 = function () {
        console.log("cs_10000");
        ZJ.SocketManager.instance.send(10000, { openId: "2333", sign: "sign", timestamp: ZJ.Util.timeStamp(), appId: 1234, params: "params" });
    };
    TestView.prototype.cs_10001 = function () {
        console.log("cs_10001");
        ZJ.SocketManager.instance.send(10001, { gameMode: 1, matchType: 1, matchId: 3 });
    };
    TestView.prototype.enterGame = function () {
        ZJ.UIManager.instance.openView(UIName.Game);
        ZJ.UIManager.instance.destroyView(UIName.Test);
    };
    TestView.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
        return 0;
    };
    return TestView;
}(ZJ.ViewBase));
__reflect(TestView.prototype, "TestView");
//# sourceMappingURL=TestView.js.map