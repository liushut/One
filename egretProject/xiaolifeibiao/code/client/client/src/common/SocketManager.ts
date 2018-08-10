module ZJ {
    /**
     * 支持根据不同后端发送协议。参考setCompany。
     */
	export class SocketManager extends egret.EventDispatcher {
		public constructor() {
			super();
		}
		private static _instance: SocketManager = new SocketManager();
		static get instance(): SocketManager {
			return this._instance;
		}

		private socket: egret.WebSocket = null;
		public init(): number {
			this.parseProto();
			this.socket = new egret.WebSocket();
			this.socket.type = egret.WebSocket.TYPE_BINARY;
			this.setCompany(1);

			this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onSocketData, this);
			this.socket.addEventListener(egret.Event.CONNECT, this.onSocketConnect, this);
			return 0;
		}

		public ProtoBufRoot = new protobuf.Root();
		private parseProto(): void {
			let ProtoBufRoot = this.ProtoBufRoot;
			let protoFiles = ModuleConfig.protoFiles;
			for (let i = 0, len = protoFiles.length; i < len; ++i) {
				let protoStr: string = RES.getRes(protoFiles[i]);
				protobuf.parse(protoStr, ProtoBufRoot);
			}
		}

		public send: (protoID: number, data?: any) => void = null;
		public onSocketData: (e: egret.Event) => void = null;
		public getProtoByID: (protoID: number, isCS: boolean) => protobuf.Type = null;
		private _company = 1;
        /**
         * socket版本
         * 1:火树（默认） 2:游爱 3:阿里
         */
		public setCompany(company: number): void {
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
		}

		public connect(host: string, port: number): void {
			this.socket.connect(host, port);
		}

		public connectByUrl(url: string): void {
			this.socket.connectByUrl(url);
		}

		public close(): void {
			this.socket.close();
		}

		private onSocketConnect(e: egret.Event): void {
			let event = new egret.Event(ZJ.CommonEventName.SOCKET_CONNECTED);
			this.dispatchEvent(event);
		}

		private buildSmallShitByID(protoID: number, data: any): Uint8Array {
			let proto = this.getProtoByID(protoID, true);
			let shit = this.buildSmallShit(proto, data);
			return shit;
		}

		private decodeShitByID(protoID: number, data: Uint8Array): any {
			let proto = this.getProtoByID(protoID, false);
			let shit = this.decodeShit(proto, data);
			return shit;
		}

		private buildSmallShit(proto: protobuf.Type, data: Object): Uint8Array {
			// 塞数据
			let info = proto.create(data);
			let proto1 = proto.encode(info);
			let buffer = proto1.finish();

			return buffer;
		}

		private decodeShit(proto: protobuf.Type, data: Uint8Array): any {
			// decode
			let shit: any = proto.decode(data);

			return shit;
		}

		//===================== 火树 begin
		private sendHuoshu(protoID: number, data: any = {}): void {
			console.log("send: " + protoID)
			console.log(JSON.stringify(data))
			let protoData = this.buildSmallShitByID(protoID, data);
			let bufferSocket: egret.ByteArray = new egret.ByteArray();
			bufferSocket.writeInt(protoData.byteLength);
			bufferSocket.writeShort(protoID);
			bufferSocket._writeUint8Array(protoData);
			this.socket.writeBytes(bufferSocket);
		}

		private onSocketDataHuoshu(e: egret.Event): void {
			// 读数据
			let socketBytes: egret.ByteArray = new egret.ByteArray();
			this.socket.readBytes(socketBytes);

			let len = socketBytes.readInt();
			let protoID = socketBytes.readShort();
			let protoData = this.decodeShitByID(protoID, socketBytes.bytes.subarray(6)); // 6 for int+short

			console.log("receive: " + protoID)
			console.log(JSON.stringify(protoData))
			let event = new ZJ.SocketDataEvent(ZJ.CommonEventName.SOCKET_DATA);
			event.data = { data: protoData, protoID: protoID };
			this.dispatchEvent(event);
		}


		private getProtoByIDHuoshu(protoID: number, isCS: boolean): protobuf.Type {
			let p = Math.floor(protoID / 1000)
			let pName = "p" + p
			let protoFile = pName + "_proto";

			let protoName = "";
			let cs = ""
			if (isCS) {
				cs = "cs_"
			}
			else {
				cs = "sc_"
			}
			protoName = cs + protoID


			// 构建ProtoBufRoot
			let ProtoBufRoot = ZJ.SocketManager.instance.ProtoBufRoot;

			// 取出协议
			const oneProto = ProtoBufRoot.lookupType(protoName);

			return oneProto;
		}
		// 火树 end


		//===================== 游爱 begin
		private clientIndex = 0;
		private sendYouai(protoID: number, data: any = {}): void {
			let smallData = this.buildSmallShitByID(protoID, data);
			let bigData = this.buildSmallShitByID(99999, {
				messageId: protoID
				, clientIndex: this.clientIndex++
				, data: smallData
			});


			// 转成egret的websocket参数格式
			let bufferSocket: egret.ByteArray = new egret.ByteArray(bigData);
			this.socket.writeBytes(bufferSocket);
		}

		private onSocketDataYouai(e: egret.Event): void {
			// 读数据
			let socketBytes: egret.ByteArray = new egret.ByteArray();
			this.socket.readBytes(socketBytes);

			let data99999: any = this.decodeShitByID(99999, socketBytes.bytes);
			let error = "";
			let data: any = {};
			let result: boolean = data99999.result;
			let protoID: number = data99999.messageId;
			if (data99999.result) {
				data = this.decodeShitByID(data99999.messageId, data99999.data)
			}
			else {
				error = Util.Utf8ArrayToStr(data99999.data);
			}

			let event = new ZJ.SocketDataEvent(ZJ.CommonEventName.SOCKET_DATA);
			event.data = { data99999: data99999, error: error, result: result, data: data, protoID: protoID };
			this.dispatchEvent(event);
		}

        /**
         * isCS: true:发送 false:接收
         */
		private getProtoByIDYouai(protoID: number, isCS: boolean): protobuf.Type {
			let protoFile = "";
			let protoName = "";
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
			let ProtoBufRoot = ZJ.SocketManager.instance.ProtoBufRoot;

			// 取出协议
			const oneProto = ProtoBufRoot.lookupType(protoName);

			return oneProto;
		}
		// 游爱 end

		//===================== 阿里 begin
		private sendAli(protoID: number, data: any = {}): void {
			// console.log("send: " + protoID)
			// console.log(data)
			let protoData = this.buildSmallShitByID(protoID, data);
			let bufferSocket: egret.ByteArray = new egret.ByteArray();
			bufferSocket.writeInt(protoData.byteLength);
			bufferSocket.writeShort(protoID);
			bufferSocket._writeUint8Array(protoData);
			ALISDK.CatcherSDK.instance().sendData(bufferSocket.buffer);
		}

		private onSocketDataAli(buffer: ArrayBuffer): void {
			// 读数据
			let socketBytes: egret.ByteArray = new egret.ByteArray(buffer);

			let len = socketBytes.readInt();
			let protoID = socketBytes.readShort();
			let protoData = this.decodeShitByID(protoID, socketBytes.bytes.subarray(6)); // 6 for int+short

			console.log("receive: " + protoID)
			console.log(protoData)
			let event = new ZJ.SocketDataEvent(ZJ.CommonEventName.SOCKET_DATA);
			event.data = { data: protoData, protoID: protoID };
			this.dispatchEvent(event);
		}

		public connectByUrlAli(data: { ip: string, port: string }): void {
			ALISDK.CatcherSDK.init({
				url: `ws://${data.ip}:${data.port}/ws/game`,
				gameVersion: "0.0.1",
				gameId: '123123',
				messageType: 'ARRAYBUFFER'
			});

			ALISDK.CatcherSDK.instance()
				.on('CONNECT', (e) => {
					let event = new ZJ.ChannelDataEvent(ZJ.CommonEventName.CHANNEL_DATA);
					event.data = { eventName: 'CONNECT', event: e };
					this.dispatchEvent(event)
				})
				.on('PROGRESS', (e) => {
					let event = new ZJ.ChannelDataEvent(ZJ.CommonEventName.CHANNEL_DATA);
					event.data = { eventName: 'PROGRESS', event: e };
					this.dispatchEvent(event)
				})
				.on('READY', (e) => {
					let event = new ZJ.ChannelDataEvent(ZJ.CommonEventName.CHANNEL_DATA);
					event.data = { eventName: 'READY', event: e };
					this.dispatchEvent(event)
				})
				.on('KICK', (e) => {
					let event = new ZJ.ChannelDataEvent(ZJ.CommonEventName.CHANNEL_DATA);
					event.data = { eventName: 'KICK', event: e };
					this.dispatchEvent(event)
				})
				.on('GAMEOVER', (e) => {
					let event = new ZJ.ChannelDataEvent(ZJ.CommonEventName.CHANNEL_DATA);
					event.data = { eventName: 'GAMEOVER', event: e };
					this.dispatchEvent(event)
				})
				.on('BREAK', (e) => {
					let event = new ZJ.ChannelDataEvent(ZJ.CommonEventName.CHANNEL_DATA);
					event.data = { eventName: 'BREAK', event: e };
					this.dispatchEvent(event)
				})
				.on('CONTINUE', (e) => {
					let event = new ZJ.ChannelDataEvent(ZJ.CommonEventName.CHANNEL_DATA);
					event.data = { eventName: 'CONTINUE', event: e };
					this.dispatchEvent(event)
				})
				.on('ERROR', (e) => {
					let event = new ZJ.ChannelDataEvent(ZJ.CommonEventName.CHANNEL_DATA);
					event.data = { eventName: 'ERROR', event: e };
					this.dispatchEvent(event)
				})
				.on('MIC_CHANGE', (e) => {
					let event = new ZJ.ChannelDataEvent(ZJ.CommonEventName.CHANNEL_DATA);
					event.data = { eventName: 'MIC_CHANGE', event: e };
					this.dispatchEvent(event)
				})
				.on('AUDIO_CHANGE', (e) => {
					let event = new ZJ.ChannelDataEvent(ZJ.CommonEventName.CHANNEL_DATA);
					event.data = { eventName: 'AUDIO_CHANGE', event: e };
					this.dispatchEvent(event)
				})
				.on('MESSAGE', (msg) => {
					this.onSocketDataAli(msg.data)
				}).start();

			const delay = (s: number) => new Promise((res) => setTimeout(res, s * 1000));

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
		}
		// 阿里 end
	}
}