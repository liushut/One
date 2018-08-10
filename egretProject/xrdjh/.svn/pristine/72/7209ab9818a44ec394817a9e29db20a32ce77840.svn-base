class TestView extends ZJ.ViewBase {
    public constructor() {
        super();
    }

    protected partAdded(partName: string, instance: any): void {
        super.partAdded(partName, instance);
    }

    protected childrenCreated(): void {
        super.childrenCreated();

        ZJ.UIManager.instance.destroyView(UIName.Loading)

        // ZJ.SocketManager.instance.addEventListener(ZJ.CommonEventName.SOCKET_CONNECTED, this.onSocketConnected, this)
        // ZJ.SocketManager.instance.addEventListener(ZJ.CommonEventName.SOCKET_DATA, this.onSocketData, this)

        this.initChushouTest();
        // ZJ.SocketManager.instance.connectByUrl(`ws://${ModuleConfig.ip}:${ModuleConfig.port}`);

        // this.initHitTest()

        // this.initFeibiao();
    }
    private initFeibiao(){
        let img = new eui.Image();
        // img.source = ""
    }
    private initHitTest() {
        // let btn1 = ZJ.ShapeUtil.getRect(0x123123, 1, 100, 50)
        let btn1 = new eui.Button()
        this.addChild(btn1)
        btn1.x = 0
        btn1.y = 100
        // btn1.width = 100
        // btn1.height = 50

        // let btn2 = ZJ.ShapeUtil.getRect(0x321321, 1, 100, 50)
        let btn2 = new eui.Button()
        this.addChild(btn2)
        btn2.x = 20
        btn2.y = 100
        // btn2.width = 100
        // btn2.height = 50

        setTimeout(()=> {
            console.log(this.myHitTest(btn1, btn2));
        }, 1000);
    }

    public myHitTest(obj1: egret.DisplayObject, obj2: egret.DisplayObject): boolean {
        var rect1: egret.Rectangle = obj1.getBounds();
        var rect2: egret.Rectangle = obj2.getBounds();
        rect1.x = obj1.x;
        rect1.y = obj1.y;
        rect2.x = obj2.x;
        rect2.y = obj2.y;
        return rect1.intersects(rect2);
    }


    private onSocketConnected(): void {
        console.log("onSocketConnected")
    }
    private onSocketData(e: ZJ.SocketDataEvent): void {
        console.log("onSocketData")
    }

    // chushou test
    private initChushouTest() {
        let sdk = new ChushouSDK();
        let x0 = 100;
        let y0 = 200;
        let dx = 600;
        let dy = 250;
        let xMax = 4;
        let labels = ["csAuthRequest", "csJoinRoom", "csQuitRoom", "csInviteToGame", "csKickOutUser"
            , "csShareRoom", "csShareRecord", "csGetFriendList", "csGetUserRelationship", "csFollowUser"
            , "csEnableMic", "csEnableAudioOutput", "onUserVolumeUpdate"
            , "csExitGame", "csNotifyLoadProgress", "onNetworkStatusChange", "csGetAPIVersionInfo"
            , "csInvokeRecharge", "onBalanceChanged", "csPurchaseProps", "csPayEntryFee", "csCheckEntryFee"
            , "cs_10000", "cs_10001", "无视，进入游戏"];
        let ons = [sdk.csAuthRequest, sdk.csJoinRoom, sdk.csQuitRoom, sdk.csInviteToGame, sdk.csKickOutUser
            , sdk.csShareRoom, sdk.csShareRecord, sdk.csGetFriendList, sdk.csGetUserRelationship, sdk.csFollowUser
            , sdk.csEnableMic, sdk.csEnableAudioOutput, sdk.onUserVolumeUpdate
            , sdk.csExitGame, sdk.csNotifyLoadProgress, sdk.onNetworkStatusChange, sdk.csGetAPIVersionInfo
            , sdk.csInvokeRecharge, sdk.onBalanceChanged, sdk.csPurchaseProps, sdk.csPayEntryFee, sdk.csCheckEntryFee
            , this.cs_10000, this.cs_10001, this.enterGame];
        let btns: eui.Button[] = [];

        for (let i = 0, len = labels.length; i < len; ++i) {
            let btn: eui.Button = this.getChushouBtn()
            btn.x = x0 + i % xMax * dx;
            btn.y = y0 + Math.floor(i / xMax) * dy;
            btn.label = labels[i]
            btn.addEventListener(egret.TouchEvent.TOUCH_TAP, ons[i], this)
        }

    }
    private getChushouBtn(): eui.Button {
        let btn: eui.Button = new eui.Button();
        this.addChild(btn)
        btn.width = 400;
        btn.height = 150;
        (btn.labelDisplay as eui.Label).size = 40;
        return btn
    }
    


    private cs_10000(): void {
        console.log("cs_10000")
        ZJ.SocketManager.instance.send(10000, { openId: "2333", sign: "sign", timestamp: ZJ.Util.timeStamp(), appId: 1234, params: "params" })
    }
    private cs_10001(): void {
        console.log("cs_10001")
        ZJ.SocketManager.instance.send(10001, { gameMode: 1, matchType: 1, matchId: 3 })
    }
    private enterGame(): void {
        ZJ.UIManager.instance.openView(UIName.Game)
        ZJ.UIManager.instance.destroyView(UIName.Test)
    }


    public onDestroy(): number {
        super.onDestroy();

        return 0;
    }
}