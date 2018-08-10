class ChushouSDK {
	public constructor() {
	}
	private static _instance: ChushouSDK;
	static get instance(): ChushouSDK {
		if(!this._instance){
			this._instance = new ChushouSDK();
		}
		return this._instance;
	}

	// 火树
	public gameRoomId = ""
	public role = ""
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
		console.log("csAuthRequest")
		csAuthRequest(`{"h5AppName" : "${ModuleConfig.compile.chushou_h5AppName}","launchMode" : "${chushouGameConfig.launchMode}","inviteMode" : "${chushouGameConfig.inviteMode}","gameRoomId" : "${chushouGameConfig.gameRoomId}"}`, (data: string) => {
			console.log("cb csAuthRequest")
			console.log(data)
			let dataObj = JSON.parse(data)
			this.csAuthRequestData = dataObj;
			if (cb) { cb(dataObj) }
		})
	}
	public csJoinRoom(cb?: (data: any) => void): void {
		console.log("csJoinRoom " + this.gameRoomId)
		csJoinRoom(`{"accessToken" : "${this.csAuthRequestData.accessToken}","gameRoomId" : "${this.gameRoomId}","role" : "${this.csAuthRequestData.role}"}`, (data: string) => {
			console.log("cb csJoinRoom")
			console.log(data.toString())
			if (cb) { cb(JSON.parse(data)) }
		})
	}
	public csQuitRoom(cb?: (data: any) => void): void {
		console.log("csQuitRoom")
		csQuitRoom(`{"accessToken" : "${this.csAuthRequestData.accessToken}","gameRoomId" : "${this.gameRoomId}"}`, (data: string) => {
			console.log("cb csQuitRoom")
			if (cb) { cb(JSON.parse(data)) }
		})
	}
	public csInviteToGame(cb?: (data: any) => void): void {
		console.log("csInviteToGame")
		csInviteToGame(`{"accessToken" : "${this.csAuthRequestData.accessToken}","gameRoomId" : "${this.gameRoomId}","inviteMode" : "${chushouGameConfig.inviteMode}","title" : "${this.title}","description" : "${this.description}","image" : "${this.image}"}`, (data: string) => {
			console.log("cb csInviteToGame")
			if (cb) { cb(JSON.parse(data)) }
		})
	}
	public csKickOutUser(cb?: (data: any) => void): void {
		console.log("csKickOutUser")
		csKickOutUser(`{"accessToken" : "${this.csAuthRequestData.accessToken}","targetUid" : "sl23859","gameRoomId" : "${this.gameRoomId}"}`, (data: string) => {
			console.log("cb csKickOutUser")
			if (cb) { cb(JSON.parse(data)) }
		})
	}
	public csShareRoom(cb?: (data: any) => void): void {
		console.log("csShareRoom")
		csShareRoom(`{"accessToken" : "${this.csAuthRequestData.accessToken}","gameRoomId" : "${this.gameRoomId}","title" : "${this.title}","description" : "${this.description}","image" : "${this.image}"}`, (data: string) => {
			console.log("cb csShareRoom")
			if (cb) { cb(JSON.parse(data)) }
		})
	}
	public csShareRecord(cb?: (data: any) => void): void {
		console.log("csShareRecord")
		csShareRecord(`{"accessToken" : "${this.csAuthRequestData.accessToken}","gameRecordId" : "119844","title" : "${this.title}","description" : "${this.description}","image" : "${this.image}"}`, (data: string) => {
			console.log("cb csShareRecord")
			if (cb) { cb(JSON.parse(data)) }
		})
	}
	public csGetFriendList(cb?: (data: any) => void): void {
		console.log("csGetFriendList")
		csGetFriendList(`{"accessToken" : "${this.csAuthRequestData.accessToken}","numPerPage" : "10","breakpoint" : "18823-ffgh-cc08"}`, (data: string) => {
			console.log("cb csGetFriendList")
			if (cb) { cb(JSON.parse(data)) }
		})
	}
	public csGetUserRelationship(targetUid:Array<string>, cb?: (data: any) => void): void {
		let targetUids:string = "";
		for(let i=0; i < targetUid.length; i++){
			targetUids += targetUid[i];
			if(i != targetUid.length - 1){
				targetUids += ",";
			}
		}
		console.log("csGetUserRelationship")
		csGetUserRelationship(`{"accessToken" : "${this.csAuthRequestData.accessToken}","users" : "${targetUids}"}`, (data: string) => {
			console.log("cb csGetUserRelationship")
			if (cb) { cb(JSON.parse(data)) }
		})
	}
	public csFollowUser(targetUid:string, cb?: (data: any) => void): void {
		console.log("csFollowUser")
		csFollowUser(`{"accessToken" : "${this.csAuthRequestData.accessToken}","targetUid" : "${targetUid}"}`, (data: string) => {
			console.log("cb csFollowUser")
			if (cb) { cb(JSON.parse(data)) }
		})
	}
	public csEnableMic(cb?: (data: any) => void): void {
		console.log("csEnableMic")
		csEnableMic(`{"accessToken" : "${this.csAuthRequestData.accessToken}","enableMic" : ${this.enableMic}}`, (data: string) => {
			console.log("cb csEnableMic")
			if (cb) { cb(JSON.parse(data)) }
		})
	}
	public csEnableAudioOutput(cb?: (data: any) => void): void {
		console.log("csEnableAudioOutput")
		csEnableAudioOutput(`{"accessToken" : "${this.csAuthRequestData.accessToken}","enableAudioOutput" : "${this.enableAudioOutput}"}`, (data: string) => {
			console.log("cb csEnableAudioOutput")
			if (cb) { cb(JSON.parse(data)) }
		})
	}
	public onUserVolumeUpdate(cb?: (data: any) => void): void {
		console.log("onUserVolumeUpdate")
		onUserVolumeUpdate((data: string) => {
			console.log("cb onUserVolumeUpdate")
			if (cb) { cb(JSON.parse(data)) }
		})
	}
	public csExitGame(cb?: (data: any) => void): void {
		console.log("csExitGame " + this.csAuthRequestData.accessToken)
		this.csQuitRoom()
		csExitGame(`{"accessToken" : "${this.csAuthRequestData.accessToken}"}`)
	}
	/**
	 * @param progress [0,100]
	 */
	public csNotifyLoadProgress(progress: number, cb?: (data: string) => void): void {
		console.log("csNotifyLoadProgress")
		csNotifyLoadProgress(`{"total" : "100","progress" : "${progress}"}`)
	}
	public onNetworkStatusChange(cb?: (data: any) => void): void {
		console.log("onNetworkStatusChange")
		onNetworkStatusChange((data: string) => {
			console.log("cb onNetworkStatusChange")
			if (cb) { cb(JSON.parse(data)) }
		})
	}
	public csGetAPIVersionInfo(cb?: (data: any) => void): void {
		console.log("csGetAPIVersionInfo")
		csGetAPIVersionInfo(`{"h5AppName" : "${ModuleConfig.compile.chushou_h5AppName}","launchMode" : "${chushouGameConfig.launchMode}","inviteMode" : "${chushouGameConfig.inviteMode}","gameRoomId" : "${this.gameRoomId}"}`, (data: string) => {
			console.log("cb csGetAPIVersionInfo")
			if (cb) { cb(JSON.parse(data)) }
		})
	}
	public csInvokeRecharge(cb?: (data: any) => void): void {
		console.log("csInvokeRecharge")
		csInvokeRecharge(`{"accessToken" : "${this.csAuthRequestData.accessToken}","paymentScene" : "1"}`, (data: string) => {
			console.log("cb csInvokeRecharge")
			if (cb) { cb(JSON.parse(data)) }
		})
	}
	public onBalanceChanged(cb?: (data: any) => void): void {
		console.log("onBalanceChanged")
	}
	public csPurchaseProps(cb?: (data: any) => void): void {
		console.log("csPurchaseProps")
		csPurchaseProps(`{"accessToken" : "${this.csAuthRequestData.accessToken}","cpOrderId" : "prop7865421","cpPropName" : "双倍积分卡","cpPropId" : "1","payAmount" : "500"}`, (data: string) => {
			console.log("cb csPurchaseProps")
			if (cb) { cb(JSON.parse(data)) }
		})
	}
	public csPayEntryFee(cpOrderId, cpPropId, cpPropName, cb?: (data: any) => void): void {
		console.log("csPayEntryFee")
		csPayEntryFee(`{"accessToken" : "${this.csAuthRequestData.accessToken}","cpOrderId" : "${cpOrderId}","cpPropName" : "${cpPropName}","cpPropId" : "${cpPropId}"}`, (data: string) => {
			console.log("cb csPayEntryFee")
			if (cb) { cb(JSON.parse(data)) }
		})
	}
	public csCheckEntryFee(cb?: (data: any) => void): void {
		console.log("csCheckEntryFee")
		csCheckEntryFee(`{"accessToken" : "${this.csAuthRequestData.accessToken}"}`, (data: string) => {
			console.log("cb csCheckEntryFee")
			if (cb) { cb(JSON.parse(data)) }
		})
	}
}