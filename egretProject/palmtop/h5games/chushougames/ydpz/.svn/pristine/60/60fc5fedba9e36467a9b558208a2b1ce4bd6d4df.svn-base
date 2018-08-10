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
        let x0 = 100;
        let y0 = 200;
        let dx = 600;
        let dy = 250;
        let xMax = 3;
        let labels = ["csAuthRequest", "csJoinRoom", "csQuitRoom", "csInviteToGame", "csKickOutUser"
            , "csShareRoom", "csShareRecord", "csGetFriendList", "csGetUserRelationship", "csFollowUser"
            , "csEnableMic", "csEnableAudioOutput", "onUserVolumeUpdate"
            , "csExitGame", "onNetworkStatusChange", "csGetAPIVersionInfo"
            , "cs_10000", "cs_10001", "无视，进入游戏"];
        let ons = [this.csAuthRequest, this.csJoinRoom, this.csQuitRoom, this.csInviteToGame, this.csKickOutUser
            , this.csShareRoom, this.csShareRecord, this.csGetFriendList, this.csGetUserRelationship, this.csFollowUser
            , this.csEnableMic, this.csEnableAudioOutput, this.onUserVolumeUpdate
            , this.csExitGame, this.onNetworkStatusChange, this.csGetAPIVersionInfo
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
    private csAuthRequest(): void {
        console.log("csAuthRequest")
        csAuthRequest(`{"h5AppName" : "五⼦棋","launchMode" : "10","inviteMode" : "10","gameRoomId" : "1084"}`, (data: string) => {
            console.log("cb csAuthRequest")
        })
    }
    private csJoinRoom(): void {
        console.log("csJoinRoom")
        csJoinRoom(`{"accessToken" : "89d57e62acg45b33","gameRoomId" : "1084","role" : "0"}`, (data: string) => {
            console.log("cb csJoinRoom")
        })
    }
    private csQuitRoom(): void {
        console.log("csQuitRoom")
        csQuitRoom(`{"accessToken" : "89d57e62acg45b33","gameRoomId" : "1084"}`, (data: string) => {
            console.log("cb csQuitRoom")
        })
    }
    private csInviteToGame(): void {
        console.log("csInviteToGame")
        csInviteToGame(`{"accessToken" : "89d57e62acg45b33","gameRoomId" : "1084","inviteMode" : "10","title" : "触⼿五⼦棋","description" : "我正在触⼿玩五⼦棋，快来围观吧","image" : "/9j/4RMQRXhpZgAATU0AKgAAA"}`, (data: string) => {
            console.log("cb csInviteToGame")
        })
    }
    private csKickOutUser(): void {
        console.log("csKickOutUser")
        csKickOutUser(`{"accessToken" : "89d57e62acg45b33","targetUid" : "sl23859","gameRoomId" : "1084"}`, (data: string) => {
            console.log("cb csKickOutUser")
        })
    }
    private csShareRoom(): void {
        console.log("csShareRoom")
        csShareRoom(`{"accessToken" : "89d57e62acg45b33","gameRoomId" : "1084","title" : "触⼿五⼦棋","description" : "我正在触⼿玩五⼦棋，快来围观吧","image" : "/9j/4RMQRXhpZgAATU0AKgAAA"}`, (data: string) => {
            console.log("cb csShareRoom")
        })
    }
    private csShareRecord(): void {
        console.log("csShareRecord")
        csShareRecord(`{"accessToken" : "89d57e62acg45b33","gameRecordId" : "119844","title" : "触⼿五⼦棋","description" : "我在触⼿五⼦棋获得了最强王者称号","image" : "/9j/4RMQRXhpZgAATU0AKgAAA"}`, (data: string) => {
            console.log("cb csShareRecord")
        })
    }
    private csGetFriendList(): void {
        console.log("csGetFriendList")
        csGetFriendList(`{"accessToken" : "89d57e62acg45b33","numPerPage" : "10","breakpoint" : "18823-ffgh-cc08"}`, (data: string) => {
            console.log("cb csGetFriendList")
        })
    }
    private csGetUserRelationship(): void {
        console.log("csGetUserRelationship")
        csGetUserRelationship(`{"accessToken" : "89d57e62acg45b33","users" : "10785,491721"}`, (data: string) => {
            console.log("cb csGetUserRelationship")
        })
    }
    private csFollowUser(): void {
        console.log("csFollowUser")
        csFollowUser(`{"accessToken" : "89d57e62acg45b33","targetUid" : "sl10785"}`, (data: string) => {
            console.log("cb csFollowUser")
        })
    }
    private csEnableMic(): void {
        console.log("csEnableMic")
        csEnableMic(`{"accessToken" : "89d57e62acg45b33","enableMic" : "1"}`, (data: string) => {
            console.log("cb csEnableMic")
        })
    }
    private csEnableAudioOutput(): void {
        console.log("csEnableAudioOutput")
        csEnableAudioOutput(`{"accessToken" : "89d57e62acg45b33","enableAudioOutput" : "1"}`, (data: string) => {
            console.log("cb csEnableAudioOutput")
        })
    }
    private onUserVolumeUpdate(): void {
        console.log("onUserVolumeUpdate")
        onUserVolumeUpdate((data: string) => {
            console.log("cb onUserVolumeUpdate")
        })
    }
    private csExitGame(): void {
        console.log("csExitGame")
        csExitGame(`{"accessToken" : "89d57e62acg45b33"}`)
    }
    private onNetworkStatusChange(): void {
        console.log("onNetworkStatusChange")
        onNetworkStatusChange((data: string) => {
            console.log("cb onNetworkStatusChange")
        })
    }
    private csGetAPIVersionInfo(): void {
        console.log("csGetAPIVersionInfo")
        csGetAPIVersionInfo(`{"h5AppName" : "五⼦棋","launchMode" : "10","inviteMode" : "10","gameRoomId" : "1084"}`, (data: string) => {
            console.log("cb csGetAPIVersionInfo")
        })
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