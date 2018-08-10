declare let chushouGameConfig: {
    launchMode: any,
    inviteMode: any,
    gameRoomId: any
};
// ⽤户API列表
declare function csAuthRequest(data: string, callback:(data:string)=>void): void;
declare function csJoinRoom(data: string, callback:(data:string)=>void): void;
declare function csQuitRoom(data: string, callback:(data:string)=>void): void;
declare function csInviteToGame(data: string, callback:(data:string)=>void): void;
declare function csKickOutUser(data: string, callback:(data:string)=>void): void;
// 社交API列表
declare function csShareRoom(data: string, callback:(data:string)=>void): void;
declare function csShareRecord(data: string, callback:(data:string)=>void): void;
declare function csGetFriendList(data: string, callback:(data:string)=>void): void;
declare function csGetUserRelationship(data: string, callback:(data:string)=>void): void;
declare function csFollowUser(data: string, callback:(data:string)=>void): void;
// 连⻨API列表
declare function csEnableMic(data: string, callback:(data:string)=>void): void;
declare function csEnableAudioOutput(data: string, callback:(data:string)=>void): void;
declare function onUserVolumeUpdate(callback:(data:string)=>void): void;
// 应⽤/设备 API列表
declare function csExitGame(data: string): void;
declare function csNotifyLoadProgress(data: string): void;
declare function onNetworkStatusChange(callback:(data:string)=>void): void;
declare function csGetAPIVersionInfo(data: string, callback:(data:string)=>void): void;
// 付费API列表
declare function csInvokeRecharge(data: string, callback:(data:string)=>void): void;
declare function onBalanceChanged(callback:(data:string)=>void): void;
declare function csPurchaseProps(data: string, callback:(data:string)=>void): void;
declare function csPayEntryFee(data: string, callback:(data:string)=>void): void;
declare function csCheckEntryFee(data: string, callback:(data:string)=>void): void;


