var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ModuleUtil = (function () {
    function ModuleUtil() {
    }
    Object.defineProperty(ModuleUtil, "tables", {
        get: function () {
            return ZJ.TableManager.instance.tables;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * isCS: true:发送 false:接收
     * ps.游爱版本。若以后规范文件名可省略switch，从而放进socketmanager。
     */
    ModuleUtil.getProtoByID = function (protoID, isCS) {
        var protoFile = "";
        var protoName = "";
        if (isCS) {
            switch (protoID) {
                case 99999:
                    // 真·发送协议
                    protoName = "ClientCmdData";
                    break;
                case 1000:
                    protoName = "CmdLoginGameReqMsg";
                    break;
                case 1001:
                    protoName = "CmdPingReqMsg";
                    break;
                case 1300:
                    protoName = "CmdJumperUploadAnswerReqMsg";
                    break;
                case 1303:
                    protoName = "CmdJumperGameOverReqMsg";
                    break;
            }
        }
        else {
            switch (protoID) {
                case 99999:
                    // 真·发送协议
                    protoName = "ServerCmdData";
                    break;
                case 1000:
                    protoName = "CmdLoginGameRspMsg";
                    break;
                case 1001:
                    protoName = "CmdPingRspMsg";
                    break;
                case 1300:
                    protoName = "CmdJumperUploadAnswerRspMsg";
                    break;
                case 1303:
                    protoName = "CmdJumperGameOverRspMsg";
                    break;
                case 1399:
                    protoName = "CmdBroadcastJumperBC";
                    break;
            }
        }
        // todo 以后自己设计，建议协议文件名和包名有关联，如：
        // let p = Math.floor(protoID / 1000)
        // let pName = "p" + p
        // let protoFile = pName + "_proto";
        // let protoName = pName + ".cs_" + messageId;
        // 构建ProtoBufRoot
        var ProtoBufRoot = ZJ.SocketManager.instance.ProtoBufRoot;
        // 取出协议
        var oneProto = ProtoBufRoot.lookupType(protoName);
        return oneProto;
    };
    return ModuleUtil;
}());
__reflect(ModuleUtil.prototype, "ModuleUtil");
//# sourceMappingURL=ModuleUtil.js.map