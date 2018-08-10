class MyCDM extends ChushouDataModel { // MyChushouDataModel

	private static _instance: MyCDM;
	static get instance(): MyCDM {
		if (!this._instance) {
			this._instance = new MyCDM();
		}
		return this._instance;
	}

	public constructor() {
		super()
		if (chushouGameConfig.launchMode == "50") { // 闯关模式
			this.gameStyle = 5
			this.DoCompetitionAuthRequest()
		}
		else if (chushouGameConfig.launchMode == "60") { // 闯关回放模式
			this.gameStyle = 6
			var request = new egret.HttpRequest()
			request.responseType = egret.HttpResponseType.TEXT
			request.open("http://dev-game.u17games.com:12025/getreplaydomain", egret.HttpMethod.GET)
			request.send()
			request.addEventListener(egret.Event.COMPLETE, this.getConnectData, this)
		}
	}

	public DoCompetitionAuthRequest() {
		ChushouSDK.instance.csAuthRequest((data: any) => {
			var request = new egret.HttpRequest()
			request.responseType = egret.HttpResponseType.TEXT
			let myUrl: string = "http://dev-game.u17games.com:12025/getdomain?open_id=" + ChushouSDK.instance.csAuthRequestData.openUid
			request.open(myUrl, egret.HttpMethod.GET)
			request.send()
			request.addEventListener(egret.Event.COMPLETE, this.getConnectData, this)
			this.CsAuthRequestCallBack()
		})
	}

	public ConnectLANServerForCompetition() {
		this.gameStyle = 5
		var request = new egret.HttpRequest()
		request.responseType = egret.HttpResponseType.TEXT
		request.open("http://192.168.1.194:12010/getdomain?open_id=1", egret.HttpMethod.GET)
		request.send()
		request.addEventListener(egret.Event.COMPLETE, this.getConnectData, this)
	}

	public ConnectLANServerForReplay() {
		this.gameStyle = 6
		var request = new egret.HttpRequest()
		request.responseType = egret.HttpResponseType.TEXT
		request.open("http://192.168.1.194:12010/getreplaydomain", egret.HttpMethod.GET)
		request.send()
		request.addEventListener(egret.Event.COMPLETE, this.getConnectData, this)
	}

	private connectUrl: string
	private getConnectData(event: egret.Event) {
		var request = <egret.HttpRequest>event.currentTarget
		let data = JSON.parse(request.response)
		// egret.log("connect: " + `${data.type == 1 ? "ws" : "wss"}://${data.domain}:${data.port}`)
		this.connectUrl = `${data.type == 1 ? "ws" : "wss"}://${data.domain}:${data.port}`
		ZJ.SocketManager.instance.connectByUrl(this.connectUrl)
	}

	protected extendOnData(protoID: number, data: any) {
		switch (protoID) {
			case 10002:
				if (data.result == 1 || data.result == 3) {
					ChushouSDK.instance.csExitGame()
				}
				else {
					if (data.result == 0) {
						this.myReconnectTicket = data.ticket
					}
					this.doAction(this.OnData10002, data)
				}
				break;
			default:
				break
		}
	}

	private isReconnect = false
	public reconnect10002() {
		egret.log("do Reconnect")
		ZJ.SocketManager.instance.connectByUrl(this.connectUrl)
		this.isReconnect = true
	}
}