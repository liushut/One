class OppoSDK {
    public constructor() {
    }
    private static _instance: OppoSDK;
    static get instance(): OppoSDK {
        if (!this._instance) {
            this._instance = new OppoSDK();
        }
        return this._instance;
    }

    public gameInfo: {
        code?: number, message?: string, gameId?: string, tableId?: string, tableToken?: string,
        players?: { uid?: string, name?: string, headIcon?: string, sex?: string, micStatus?: number, speakerStatus?: number, tag?: number }[]
    } = {}       //查询到的对局信息
    public gameKey = "xxx";    //cp game key
    public msgChannel = null;

    public onMicStatusChangedData: { uid?: any, status?: any } = {}
    public onSpeakerStatusChangedData: { uid?: any, status?: any } = {}

    public infoRsp: () => void;
    public onMicStatusChanged: (data: any) => void;
    public onSpeakerStatusChanged: (data: any) => void;

    //-----------game logic-----------------

    //初始化lib库
    public init(mode) {
        // addlistener
        this.msgChannel = BattlePlatform.msgChannel;
        this.msgChannel.setRecvCallback((cmd, param) => {
            console.log("java cmd:" + cmd + param);
            switch (cmd) {
                case "infoRsp":
                    this.gameInfo = BattlePlatform.jsonToObj(param);
                    if (this.infoRsp) {
                        this.infoRsp();
                    }
                    break;
                case "onMicStatusChanged":
                    this.onMicStatusChangedData = BattlePlatform.jsonToObj(param);
                    if (this.onMicStatusChanged) {
                        this.onMicStatusChanged(this.onMicStatusChangedData);
                    }
                    break;
                case "onSpeakerStatusChanged":
                    this.onSpeakerStatusChangedData = BattlePlatform.jsonToObj(param);
                    if (this.onSpeakerStatusChanged) {
                        this.onSpeakerStatusChanged(this.onSpeakerStatusChangedData);
                    }
                    break;
            }
        })

        // init
        var data = { "libVer": BattlePlatform.version, "mode": mode };
        this.msgChannel.send("init", BattlePlatform.objToJson(data));
    }

    //获取对局信息请求
    public infoReq() {
        this.msgChannel.send("infoReq", BattlePlatform.objToJson({ "gameKey": this.gameKey }));
    }

    //强制退出
    public forceQuit(reason, message) {
        var data: any = {};
        data.reason = reason;
        data.message = message;
        var json = BattlePlatform.objToJson(data);
        this.msgChannel.send("forceQuit", json);
    }

    //写数据白板
    public writeBlackboard(key, value) {
        var data: any = {};
        data.key = key;
        data.value = value;
        var json = BattlePlatform.objToJson(data);
        this.msgChannel.send("writeBlackboard", json);
    }


    //---------------game init -----------------------------


}