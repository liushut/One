class ChushouSDK {
	public constructor() {
	}
	private static _instance: ChushouSDK;
	static get instance(): ChushouSDK {
		if (!this._instance) {
			this._instance = new ChushouSDK();
		}
		return this._instance;
	}

	// 火树
	public gameRoomId = ""
	public role = ""
	public h5AppName = "hsdailyshot"
	public title = "分享标题"
	public image = "/resource/assets/egret_icon.png"
	public description = "分享描述"
	public enableMic = "1"
	public enableAudioOutput = "1"

	/**
	 * "code" : "1", 
	*"errMsg" : "该⽤户已被封禁",
	* "openUid" : "sl10702",
	*"accessToken" : "${this.csAuthRequestData.accessToken}",
	* "nickname" : "POTUS",
	*"gender" : "male"
	* "currencyName" : "触⼿⾖",
	*"balance" : "2345678",
	* "avatar" : "https://chushou.tv/avatar/10702.jpg",
	*"inviteMode" : "${chushouGameConfig.inviteMode}",
	*"gameRoomId" : "${this.gameRoomId}",
	*"csGroupId" : "624189",
	*"csGroupMemberCount" : "2",
	* "role" : "0",
	* "hostOpenUid" : "sl10702"
	 */
	public csAuthRequestData = null;

	public csAuthRequest(cb?: (data: any) => void): void {
		this.log("csAuthRequest")
		csAuthRequest(`{"h5AppName" : "${this.h5AppName}","launchMode" : "${chushouGameConfig.launchMode}","inviteMode" : "${chushouGameConfig.inviteMode}","gameRoomId" : "${chushouGameConfig.gameRoomId}"}`, (data: string) => {
			this.log("cb csAuthRequest")
			this.log(data)
			let dataObj = JSON.parse(data)
			this.csAuthRequestData = dataObj;
			if (cb) { cb(dataObj) }
		})
	}
	public csJoinRoom(cb?: (data: any) => void): void {
		this.log("csJoinRoom " + this.gameRoomId)
		csJoinRoom(`{"accessToken" : "${this.csAuthRequestData.accessToken}","gameRoomId" : "${this.gameRoomId}","role" : "${this.csAuthRequestData.role}"}`, (data: string) => {
			this.log("cb csJoinRoom")
			this.log(data.toString())
			if (cb) { cb(JSON.parse(data)) }
		})
	}
	public csQuitRoom(cb?: (data: any) => void): void {
		this.log("csQuitRoom")
		csQuitRoom(`{"accessToken" : "${this.csAuthRequestData.accessToken}","gameRoomId" : "${this.gameRoomId}"}`, (data: string) => {
			this.log("cb csQuitRoom")
			if (cb) { cb(JSON.parse(data)) }
		})
	}
	public csInviteToGame(cb?: (data: any) => void): void {
		this.log("csInviteToGame")
		csInviteToGame(`{"accessToken" : "${this.csAuthRequestData.accessToken}","gameRoomId" : "${this.gameRoomId}","inviteMode" : "${chushouGameConfig.inviteMode}","title" : "${this.title}","description" : "${this.description}","image" : "${this.image}"}`, (data: string) => {
			this.log("cb csInviteToGame")
			if (cb) { cb(JSON.parse(data)) }
		})
	}
	public csKickOutUser(cb?: (data: any) => void): void {
		this.log("csKickOutUser")
		csKickOutUser(`{"accessToken" : "${this.csAuthRequestData.accessToken}","targetUid" : "sl23859","gameRoomId" : "${this.gameRoomId}"}`, (data: string) => {
			this.log("cb csKickOutUser")
			if (cb) { cb(JSON.parse(data)) }
		})
	}
	public csShareRoom(cb?: (data: any) => void): void {
		this.log("csShareRoom")
		csShareRoom(`{"accessToken" : "${this.csAuthRequestData.accessToken}","gameRoomId" : "${this.gameRoomId}","title" : "${this.title}","description" : "${this.description}","image" : "${this.image}"}`, (data: string) => {
			this.log("cb csShareRoom")
			if (cb) { cb(JSON.parse(data)) }
		})
	}
	public csShareRecord(cb?: (data: any) => void): void {
		this.log("csShareRecord")
		csShareRecord(`{"accessToken" : "${this.csAuthRequestData.accessToken}","gameRecordId" : "119844","title" : "${this.title}","description" : "${this.description}","image" : "${this.image}"}`, (data: string) => {
			this.log("cb csShareRecord")
			if (cb) { cb(JSON.parse(data)) }
		})
	}
	public csGetFriendList(cb?: (data: any) => void): void {
		this.log("csGetFriendList")
		csGetFriendList(`{"accessToken" : "${this.csAuthRequestData.accessToken}","numPerPage" : "10","breakpoint" : "18823-ffgh-cc08"}`, (data: string) => {
			this.log("cb csGetFriendList")
			if (cb) { cb(JSON.parse(data)) }
		})
	}
	public csGetUserRelationship(targetUid: Array<string>, cb?: (data: any) => void): void {
		let targetUids: string = "";
		for (let i = 0; i < targetUid.length; i++) {
			targetUids += targetUid[i];
			if (i != targetUid.length - 1) {
				targetUids += ",";
			}
		}
		this.log("csGetUserRelationship")
		csGetUserRelationship(`{"accessToken" : "${this.csAuthRequestData.accessToken}","users" : "${targetUids}"}`, (data: string) => {
			this.log("cb csGetUserRelationship")
			if (cb) { cb(JSON.parse(data)) }
		})
	}
	public csFollowUser(targetUid: string, cb?: (data: any) => void): void {
		this.log("csFollowUser")
		csFollowUser(`{"accessToken" : "${this.csAuthRequestData.accessToken}","targetUid" : "${targetUid}"}`, (data: string) => {
			this.log("cb csFollowUser")
			if (cb) { cb(JSON.parse(data)) }
		})
	}
	public csEnableMic(cb?: (data: any) => void): void {
		this.log("csEnableMic")
		csEnableMic(`{"accessToken" : "${this.csAuthRequestData.accessToken}","enableMic" : ${this.enableMic}}`, (data: string) => {
			this.log("cb csEnableMic")
			if (cb) { cb(JSON.parse(data)) }
		})
	}
	public csEnableAudioOutput(cb?: (data: any) => void): void {
		this.log("csEnableAudioOutput")
		csEnableAudioOutput(`{"accessToken" : "${this.csAuthRequestData.accessToken}","enableAudioOutput" : "${this.enableAudioOutput}"}`, (data: string) => {
			this.log("cb csEnableAudioOutput")
			if (cb) { cb(JSON.parse(data)) }
		})
	}
	public onUserVolumeUpdate(cb?: (data: any) => void): void {
		this.log("onUserVolumeUpdate")
		onUserVolumeUpdate((data: string) => {
			this.log("cb onUserVolumeUpdate")
			if (cb) { cb(JSON.parse(data)) }
		})
	}
	public csExitGame(cb?: (data: any) => void): void {
		this.log("csExitGame " + this.csAuthRequestData.accessToken)
		this.csQuitRoom()
		csExitGame(`{"accessToken" : "${this.csAuthRequestData.accessToken}"}`)
	}
	/**
	 * @param progress [0,100]
	 */
	public csNotifyLoadProgress(progress: number, cb?: (data: string) => void): void {
		this.log("csNotifyLoadProgress")
		let a = typeof csNotifyLoadProgress
		if (a == "function") {
			console.log('haha doprogress')
			csNotifyLoadProgress(`{"total" : "100","progress" : "${progress}"}`)
			console.log('haha progress done')
		}
		else{
			console.log('haha protected')
		}
	}
	public onNetworkStatusChange(cb?: (data: any) => void): void {
		this.log("onNetworkStatusChange")
		onNetworkStatusChange((data: string) => {
			this.log("cb onNetworkStatusChange")
			if (cb) { cb(JSON.parse(data)) }
		})
	}
	public csGetAPIVersionInfo(cb?: (data: any) => void): void {
		this.log("csGetAPIVersionInfo")
		csGetAPIVersionInfo(`{"h5AppName" : "${this.h5AppName}","launchMode" : "${chushouGameConfig.launchMode}","inviteMode" : "${chushouGameConfig.inviteMode}","gameRoomId" : "${this.gameRoomId}"}`, (data: string) => {
			this.log("cb csGetAPIVersionInfo")
			if (cb) { cb(JSON.parse(data)) }
		})
	}
	/**
	 * @param paymentScene 0-直接拉起充值场景, 1-表示购买道具场景, 2-表示支付对局入场费场景
	 */
	public csInvokeRecharge(paymentScene, cb?: (data: any) => void): void {
		this.log("csInvokeRecharge")
		csInvokeRecharge(`{"accessToken" : "${this.csAuthRequestData.accessToken}","paymentScene" : "${paymentScene}"}`, (data: string) => {
			this.log("cb csInvokeRecharge")
			if (cb) { cb(JSON.parse(data)) }
		})
	}
	public onBalanceChanged(cb?: (data: any) => void): void {
		this.log("onBalanceChanged")
	}
	public csPurchaseProps(cb?: (data: any) => void): void {
		this.log("csPurchaseProps")
		csPurchaseProps(`{"accessToken" : "${this.csAuthRequestData.accessToken}","cpOrderId" : "prop7865421","cpPropName" : "双倍积分卡","cpPropId" : "1","payAmount" : "500"}`, (data: string) => {
			this.log("cb csPurchaseProps")
			if (cb) { cb(JSON.parse(data)) }
		})
	}
	public csPayEntryFee(cpOrderId, cpPropId, cpPropName, cb?: (data: any) => void): void {
		this.log("csPayEntryFee")
		csPayEntryFee(`{"accessToken" : "${this.csAuthRequestData.accessToken}","cpOrderId" : "${cpOrderId}","cpPropName" : "${cpPropName}","cpPropId" : "${cpPropId}"}`, (data: string) => {
			this.log("cb csPayEntryFee")
			if (cb) { cb(JSON.parse(data)) }
		})
	}
	public csCheckEntryFee(cb?: (data: any) => void): void {
		this.log("csCheckEntryFee")
		csCheckEntryFee(`{"accessToken" : "${this.csAuthRequestData.accessToken}"}`, (data: string) => {
			this.log("cb csCheckEntryFee")
			if (cb) { cb(JSON.parse(data)) }
		})
	}
	public csRecordReport(gameResult: string, cb?: (data: any) => void): void {
		this.log("csRecordReport")
		csRecordReport(`{"accessToken" : "${this.csAuthRequestData.accessToken}","openUid" : "${this.csAuthRequestData.openUid}","gameResult" : "${gameResult}" , "gameRecordId" : "${chushouGameConfig.gameRecordId}"}`)
	}
	public log(str: string) {
		console.log(str)
	}
}