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
    /**
     * 支持根据不同后端发送协议。参考setCompany。
     */
    var SocketManager = (function (_super) {
        __extends(SocketManager, _super);
        function SocketManager() {
            var _this = _super.call(this) || this;
            _this.socket = null;
            _this.ProtoBufRoot = new protobuf.Root();
            _this.send = null;
            _this.onSocketData = null;
            _this.getProtoByID = null;
            _this._company = 1;
            // 火树 end
            //===================== 游爱 begin
            _this.clientIndex = 0;
            return _this;
        }
        Object.defineProperty(SocketManager, "instance", {
            get: function () {
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        SocketManager.prototype.init = function () {
            // this.parseProto(); // 旧
            this.parseProtoByText(ModuleConfig.protoText); // 新
            this.socket = new egret.WebSocket();
            this.socket.type = egret.WebSocket.TYPE_BINARY;
            this.setCompany(1);
            this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onSocketData, this);
            this.socket.addEventListener(egret.Event.CONNECT, this.onSocketConnect, this);
            return 0;
        };
        Object.defineProperty(SocketManager.prototype, "connected", {
            get: function () {
                return this.socket.connected;
            },
            enumerable: true,
            configurable: true
        });
        SocketManager.prototype.parseProto = function () {
            // 旧
            // let ProtoBufRoot = this.ProtoBufRoot;
            // let protoFiles = ModuleConfig.protoFiles;
            // for (let i = 0, len = protoFiles.length; i < len; ++i) {
            // 	let protoStr: string = RES.getRes(protoFiles[i]);
            // 	protobuf.parse(protoStr, ProtoBufRoot);
            // }
        };
        SocketManager.prototype.parseProtoByText = function (text) {
            protobuf.parse(text, this.ProtoBufRoot);
        };
        /**
         * socket版本
         * 1:火树（默认） 2:游爱 3:阿里
         */
        SocketManager.prototype.setCompany = function (company) {
            this._company = company;
            switch (company) {
                case 2:
                    this.send = this.sendYouai;
                    this.onSocketData = this.onSocketDataYouai;
                    this.getProtoByID = this.getProtoByIDYouai;
                    break;
                case 3:
                    this.send = this.sendAli;
                    this.getProtoByID = this.getProtoByIDHuoshu;
                    break;
                default:
                    this.send = this.sendHuoshu;
                    this.onSocketData = this.onSocketDataHuoshu;
                    this.getProtoByID = this.getProtoByIDHuoshu;
            }
        };
        SocketManager.prototype.connect = function (host, port) {
            this.socket.connect(host, port);
        };
        SocketManager.prototype.connectByUrl = function (url) {
            this.socket.connectByUrl(url);
        };
        SocketManager.prototype.close = function () {
            this.socket.close();
        };
        SocketManager.prototype.onSocketConnect = function (e) {
            var event = new egret.Event(ZJ.CommonEventName.SOCKET_CONNECTED);
            this.dispatchEvent(event);
        };
        SocketManager.prototype.buildSmallShitByID = function (protoID, data) {
            var proto = this.getProtoByID(protoID, true);
            var shit = this.buildSmallShit(proto, data);
            return shit;
        };
        SocketManager.prototype.decodeShitByID = function (protoID, data) {
            var proto = this.getProtoByID(protoID, false);
            var shit = this.decodeShit(proto, data);
            return shit;
        };
        SocketManager.prototype.buildSmallShit = function (proto, data) {
            // 塞数据
            var info = proto.create(data);
            var proto1 = proto.encode(info);
            var buffer = proto1.finish();
            return buffer;
        };
        SocketManager.prototype.decodeShit = function (proto, data) {
            // decode
            var shit = proto.decode(data);
            return shit;
        };
        //===================== 火树 begin
        SocketManager.prototype.sendHuoshu = function (protoID, data) {
            if (data === void 0) { data = {}; }
            // console.log("send: " + protoID)
            // console.log(JSON.stringify(data))
            var protoData = this.buildSmallShitByID(protoID, data);
            var bufferSocket = new egret.ByteArray();
            bufferSocket.writeInt(protoData.byteLength);
            bufferSocket.writeShort(protoID);
            bufferSocket._writeUint8Array(protoData);
            this.socket.writeBytes(bufferSocket);
        };
        SocketManager.prototype.onSocketDataHuoshu = function (e) {
            // 读数据
            var socketBytes = new egret.ByteArray();
            this.socket.readBytes(socketBytes);
            var len = socketBytes.readInt();
            var protoID = socketBytes.readShort();
            var protoData = this.decodeShitByID(protoID, socketBytes.bytes.subarray(6)); // 6 for int+short
            // console.log("receive: " + protoID)
            // console.log(JSON.stringify(protoData))
            var event = new ZJ.SocketDataEvent(ZJ.CommonEventName.SOCKET_DATA);
            event.data = { data: protoData, protoID: protoID };
            this.dispatchEvent(event);
        };
        SocketManager.prototype.getProtoByIDHuoshu = function (protoID, isCS) {
            var p = Math.floor(protoID / 1000);
            var pName = "p" + p;
            var protoFile = pName + "_proto";
            var protoName = "";
            var cs = "";
            if (isCS) {
                cs = "cs_";
            }
            else {
                cs = "sc_";
            }
            protoName = cs + protoID;
            // 构建ProtoBufRoot
            var ProtoBufRoot = ZJ.SocketManager.instance.ProtoBufRoot;
            // 取出协议
            var oneProto = ProtoBufRoot.lookupType(protoName);
            return oneProto;
        };
        SocketManager.prototype.sendYouai = function (protoID, data) {
            if (data === void 0) { data = {}; }
            var smallData = this.buildSmallShitByID(protoID, data);
            var bigData = this.buildSmallShitByID(99999, {
                messageId: protoID,
                clientIndex: this.clientIndex++,
                data: smallData
            });
            // 转成egret的websocket参数格式
            var bufferSocket = new egret.ByteArray(bigData);
            this.socket.writeBytes(bufferSocket);
        };
        SocketManager.prototype.onSocketDataYouai = function (e) {
            // 读数据
            var socketBytes = new egret.ByteArray();
            this.socket.readBytes(socketBytes);
            var data99999 = this.decodeShitByID(99999, socketBytes.bytes);
            var error = "";
            var data = {};
            var result = data99999.result;
            var protoID = data99999.messageId;
            if (data99999.result) {
                data = this.decodeShitByID(data99999.messageId, data99999.data);
            }
            else {
                error = ZJ.Util.Utf8ArrayToStr(data99999.data);
            }
            var event = new ZJ.SocketDataEvent(ZJ.CommonEventName.SOCKET_DATA);
            event.data = { data99999: data99999, error: error, result: result, data: data, protoID: protoID };
            this.dispatchEvent(event);
        };
        /**
         * isCS: true:发送 false:接收
         */
        SocketManager.prototype.getProtoByIDYouai = function (protoID, isCS) {
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
            // 构建ProtoBufRoot
            var ProtoBufRoot = ZJ.SocketManager.instance.ProtoBufRoot;
            // 取出协议
            var oneProto = ProtoBufRoot.lookupType(protoName);
            return oneProto;
        };
        // 游爱 end
        //===================== 阿里 begin
        SocketManager.prototype.sendAli = function (protoID, data) {
            if (data === void 0) { data = {}; }
            // console.log("send: " + protoID)
            // console.log(data)
            var protoData = this.buildSmallShitByID(protoID, data);
            var bufferSocket = new egret.ByteArray();
            bufferSocket.writeInt(protoData.byteLength);
            bufferSocket.writeShort(protoID);
            bufferSocket._writeUint8Array(protoData);
            ALISDK.CatcherSDK.instance().sendData(bufferSocket.buffer);
        };
        SocketManager.prototype.onSocketDataAli = function (buffer) {
            // 读数据
            var socketBytes = new egret.ByteArray(buffer);
            var len = socketBytes.readInt();
            var protoID = socketBytes.readShort();
            var protoData = this.decodeShitByID(protoID, socketBytes.bytes.subarray(6)); // 6 for int+short
            console.log("receive: " + protoID);
            console.log(protoData);
            var event = new ZJ.SocketDataEvent(ZJ.CommonEventName.SOCKET_DATA);
            event.data = { data: protoData, protoID: protoID };
            this.dispatchEvent(event);
        };
        SocketManager.prototype.connectByUrlAli = function (data) {
            var _this = this;
            ALISDK.CatcherSDK.init({
                url: "ws://" + data.ip + ":" + data.port + "/ws/game",
                gameVersion: "0.0.1",
                gameId: '123123',
                messageType: 'ARRAYBUFFER'
            });
            ALISDK.CatcherSDK.instance()
                .on('CONNECT', function (e) {
                var event = new ZJ.ChannelDataEvent(ZJ.CommonEventName.CHANNEL_DATA);
                event.data = { eventName: 'CONNECT', event: e };
                _this.dispatchEvent(event);
            })
                .on('PROGRESS', function (e) {
                var event = new ZJ.ChannelDataEvent(ZJ.CommonEventName.CHANNEL_DATA);
                event.data = { eventName: 'PROGRESS', event: e };
                _this.dispatchEvent(event);
            })
                .on('READY', function (e) {
                var event = new ZJ.ChannelDataEvent(ZJ.CommonEventName.CHANNEL_DATA);
                event.data = { eventName: 'READY', event: e };
                _this.dispatchEvent(event);
            })
                .on('KICK', function (e) {
                var event = new ZJ.ChannelDataEvent(ZJ.CommonEventName.CHANNEL_DATA);
                event.data = { eventName: 'KICK', event: e };
                _this.dispatchEvent(event);
            })
                .on('GAMEOVER', function (e) {
                var event = new ZJ.ChannelDataEvent(ZJ.CommonEventName.CHANNEL_DATA);
                event.data = { eventName: 'GAMEOVER', event: e };
                _this.dispatchEvent(event);
            })
                .on('BREAK', function (e) {
                var event = new ZJ.ChannelDataEvent(ZJ.CommonEventName.CHANNEL_DATA);
                event.data = { eventName: 'BREAK', event: e };
                _this.dispatchEvent(event);
            })
                .on('CONTINUE', function (e) {
                var event = new ZJ.ChannelDataEvent(ZJ.CommonEventName.CHANNEL_DATA);
                event.data = { eventName: 'CONTINUE', event: e };
                _this.dispatchEvent(event);
            })
                .on('ERROR', function (e) {
                var event = new ZJ.ChannelDataEvent(ZJ.CommonEventName.CHANNEL_DATA);
                event.data = { eventName: 'ERROR', event: e };
                _this.dispatchEvent(event);
            })
                .on('MIC_CHANGE', function (e) {
                var event = new ZJ.ChannelDataEvent(ZJ.CommonEventName.CHANNEL_DATA);
                event.data = { eventName: 'MIC_CHANGE', event: e };
                _this.dispatchEvent(event);
            })
                .on('AUDIO_CHANGE', function (e) {
                var event = new ZJ.ChannelDataEvent(ZJ.CommonEventName.CHANNEL_DATA);
                event.data = { eventName: 'AUDIO_CHANGE', event: e };
                _this.dispatchEvent(event);
            })
                .on('MESSAGE', function (msg) {
                _this.onSocketDataAli(msg.data);
            }).start();
            var delay = function (s) { return new Promise(function (res) { return setTimeout(res, s * 1000); }); };
            // Promise.resolve().then(() => {
            // 	ALISDK.CatcherSDK.instance().updateProgress(ALISDK.CatcherSDK.ProgressState.PROGRESSING, 0);
            // })
            // 	.then(() => delay(0.5))
            // 	.then(() => {
            // 		ALISDK.CatcherSDK.instance().updateProgress(ALISDK.CatcherSDK.ProgressState.PROGRESSING, 25);
            // 	})
            // 	.then(() => delay(0.5))
            // 	.then(() => {
            // 		ALISDK.CatcherSDK.instance().updateProgress(ALISDK.CatcherSDK.ProgressState.PROGRESSING, 75);
            // 	})
            // 	.then(() => delay(0.5))
            // 	.then(() => {
            // 		ALISDK.CatcherSDK.instance().updateProgress(ALISDK.CatcherSDK.ProgressState.PROGRESSING, 100);
            // 	})
            // 	.then(() => delay(1))
            // 	.then(() => {
            // 		ALISDK.CatcherSDK.instance().updateProgress(ALISDK.CatcherSDK.ProgressState.COMPLETED);
            // 	});
        };
        SocketManager._instance = new SocketManager();
        return SocketManager;
    }(egret.EventDispatcher));
    ZJ.SocketManager = SocketManager;
    __reflect(SocketManager.prototype, "ZJ.SocketManager");
})(ZJ || (ZJ = {}));
//# sourceMappingURL=SocketManager.js.map