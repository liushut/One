class ChushouDataModel {
	private INTERVAL_PING = 5000; // ping间隔（毫秒）

	/**
	 * 0 不联网；
	 * 1 单机；
	 * 2 1v1；
	 * 3 多人对战；
	 * 5 闯关模式
	 * 6 回放模式
	 */
	public gameStyle = 0
	public myData: PlayerInfo
	public sbData: PlayerInfo
	public sbIsFriend = false

	/**
     * 触手授权返回
	 */
	public CsAuthRequestCallBack: () => void
	/**
     * 触手进房间后的返回
	 */
	public CsJoinRoomCallBack: () => void

	/**
	 * 客户端登录进入游戏的返回
	 */
	public OnData10000: (data: any) => void
	/**
	 * 客户端匹配进入房间的返回
	 */
	public OnData10001: (data: any) => void
	/**
	 * 获取商品订单信息的返回
	 */
	public OnData10010: (data: any) => void
	/**
	 * 准备开始游戏的返回
	 */
	public OnData11002: (data: any) => void
	/**
	 * 服务端通知开始游戏倒计时
	 */
	public OnData11003: (data: any) => void
	/**
	 * 获取当前开局状态的返回
	 */
	public OnData11005: (data: any) => void
	/**
	 * 获取游戏数据的返回
	 */
	public OnData11006: (data: any) => void
	/**
	 * 再来一局的返回，若双方均已发送来一局，会推送11003到客户端
	 */
	public OnData11007: (data: any) => void
	/**
	 * 查询玩家最高分的返回
	 */
	public OnData11008: (data: any) => void
	/**
	 * 后端推送玩家请求再来一局
	 */
	public OnData11009: (data: any) => void
	/**
	 * 客户端同步游戏过程包的返回
	 */
	public OnData11010: (data: any) => void
	/**
	 * 客户端同步游戏结算点数据包(后端校验包)的返回
	 */
	public OnData11011: (data: any) => void
	/**
	 * 游戏结果通知的返回
	 */
	public OnData11012: (data: any) => void

	public constructor() {
		ZJ.SocketManager.instance.addEventListener(ZJ.CommonEventName.SOCKET_CONNECTED, this.onConnect, this)
		ZJ.SocketManager.instance.addEventListener(ZJ.CommonEventName.SOCKET_DATA, this.onData, this)
		if (chushouGameConfig.launchMode == "20") { // 单人模式
			this.gameStyle = 1
			ZJ.SocketManager.instance.connectByUrl(`${ModuleConfig.ws}://${ModuleConfig.ip}:${ModuleConfig.singlePort}`);
		}
		else if (chushouGameConfig.launchMode == "30") { // 双人模式
			this.gameStyle = 2
			ZJ.SocketManager.instance.connectByUrl(`${ModuleConfig.ws}://${ModuleConfig.ip}:${ModuleConfig.doublePort}`);
		}
	}

	public onConnect() {
		ChushouSDK.instance.csAuthRequest((data: any) => {
			this.login10000()
			this.ping11004()
			this.CsAuthRequestCallBack()
		})
	}

	protected onData(e: ZJ.SocketDataEvent) {
		let data = e.data.data

		console.log(e.data.protoID)
		console.log(JSON.stringify(data))

		switch (e.data.protoID) {
			case 10000:
				// 客户端登录进入游戏的返回
				if (data.result == 0) {
					if (this.gameStyle != 5 && this.gameStyle != 6) {
						this.match10001()
					}
					this.doAction(this.OnData10000, data)
				}
				else {
					ChushouSDK.instance.csExitGame()
				}
				break
			case 10001:
				// 客户端匹配进入房间的返回
				if (data.result == 0) {
					this.doAction(this.OnData10001, data)
					if (this.gameStyle == 2) {
						ChushouSDK.instance.gameRoomId = data.roomId
						ChushouSDK.instance.csJoinRoom((data: any) => {
							if (data.code == 0) {
								this.gamePreStart11002()
							}
							else {
								// 触手sdk进入房间接口返回谜之错误
								ChushouSDK.instance.csExitGame()
							}
						})
					}
					else if (this.gameStyle == 1) {
						this.gamePreStart11002()
					}
				}
				else if (data.result == 2) {
					// 房间人数已满
					ChushouSDK.instance.csExitGame()
				}
				else {
					// 失败
					ChushouSDK.instance.csExitGame()
				}
				break
			case 10010:
				//订单信息获取成功
				if (data.result == 0) {
					// console.log("订单ID:" + data.cpOrderId + "," + "商品ID:" + data.cpPropId + ", 商品名:" + data.cpPropName);
					ChushouSDK.instance.csPayEntryFee(data.cpOrderId, data.cpPropId, data.cpPropName, (data: any) => {
						if (data.code == "0") {
							console.log("成功扣除入场费");
						} else {
							if (data.code == "100") console.log("触手豆余额不足");
							console.log(data.code + "," + data.errMsg);
						}
					});
				} else {
					console.log("商品不存在");
				}
				this.doAction(this.OnData10010, data)
				break
			case 11002:
				// 准备开始游戏的返回
				if (data.result == 0) {
					this.doAction(this.OnData11002, data)
				}
				else {
					// 失败
					ChushouSDK.instance.csExitGame()
				}
				break
			case 11003:
				// 服务端通知开始游戏倒计时
				if (this.gameStyle == 2) {
					//双方都加入游戏，扣除入场费
					//获取入场费订单信息
					ZJ.SocketManager.instance.send(10010, {
						cpPropId: "11"
					});

					if (data.playerInfos[0].openId == ChushouSDK.instance.csAuthRequestData.openUid) {
						this.myData = data.playerInfos[0]
						this.sbData = data.playerInfos[1]
					}
					else {
						this.myData = data.playerInfos[1]
						this.sbData = data.playerInfos[0]
					}
					ChushouSDK.instance.csGetUserRelationship([this.sbData.openId], (data: any) => {
						this.sbIsFriend = false
						if (data.code == 0) {
							if (data.users[0].relationship != 0) {
								this.sbIsFriend = true
							}
						}
					})
				}
				else if (this.gameStyle == 1) {
					this.myData = data.playerInfos[0]
				}
				this.doAction(this.OnData11003, data)
				break
			case 11005:
				// 获取当前开局状态的返回
				this.doAction(this.OnData11005, data)
				break
			case 11006:
				// 获取游戏数据的返回
				this.doAction(this.OnData11006, data)
				break
			case 11007:
				// 再来一局的返回，若双方均已发送来一局，会推送11003到客户端
				this.doAction(this.OnData11007, data)
				break
			case 11008:
				// 查询玩家最高分的返回
				this.doAction(this.OnData11008, data)
				break
			case 11009:
				// 后端推送玩家请求再来一局
				this.doAction(this.OnData11009, data)
				break
			case 11010:
				// 客户端同步游戏过程包的返回
				this.doAction(this.OnData11010, data)
				break
			case 11011:
				// 客户端同步游戏结算点数据包(后端校验包)的返回
				this.doAction(this.OnData11011, data)
				break
			case 11012:
				// 游戏结果通知的返回
				this.doAction(this.OnData11012, data)
			default:
				this.extendOnData(e.data.protoID, data)
				break
		}
	}

	protected extendOnData(protoID: number, data: any) {

	}

	protected doAction(func: (data: any) => void, data: any) {
		if (func) {
			func(data)
		}
	}

	protected login10000() {
		egret.log("do Login")
		ZJ.SocketManager.instance.send(10000, {
			openId: ChushouSDK.instance.csAuthRequestData.openUid, sign: "sign", timestamp: ZJ.Util.timeStamp(), appId: ModuleConfig.compile.chushou_appid
			, params: [ChushouSDK.instance.csAuthRequestData.nickname, ChushouSDK.instance.csAuthRequestData.gender, ChushouSDK.instance.csAuthRequestData.avatar]
		})
	}

	protected match10001() {
		egret.log("do Match")
		if (this.gameStyle == 1) {
			ZJ.SocketManager.instance.send(10001, {
				gameMode: this.gameStyle,
				matchType: 1
			})
		}
		else if (this.gameStyle == 2) {
			ZJ.SocketManager.instance.send(10001, {
				gameMode: this.gameStyle,
				matchType: 2,
				matchId: ChushouSDK.instance.csAuthRequestData.csGroupId.toString()
			})
		}
	}

	protected gamePreStart11002() {
		egret.log("do Ready")
		ZJ.SocketManager.instance.send(11002)
	}

	protected intervalPing = 0;
	protected ping11004() {
		egret.log("do Ping")
		this.intervalPing = setInterval(
			() => {
				ZJ.SocketManager.instance.send(11004)
			}, this.INTERVAL_PING)
	}

	public GetGameState11005() {
		if (this.gameStyle == 0) {
			return
		}
		egret.log("get game state")
		ZJ.SocketManager.instance.send(11005)
	}

	public GetPlayerData11006() {
		if (this.gameStyle == 0) {
			return
		}
		egret.log("get player data")
		ZJ.SocketManager.instance.send(11006)
	}

	public PlayAgain11007() {
		if (this.gameStyle == 0) {
			return
		}
		egret.log("play again")
		ZJ.SocketManager.instance.send(11007)
	}

	public GetHighestScore11008() {
		if (this.gameStyle == 0) {
			return
		}
		egret.log("get highest score")
		ZJ.SocketManager.instance.send(11008)
	}

	public SendProcessData11010(data: Data11010) {
		if (this.gameStyle == 0) {
			return
		}

		ZJ.SocketManager.instance.send(11010, {
			processData: ZJ.Util.objToByteArray(data.processData).bytes
		});
	}

	public SendScoredData11011(data: Data11011) {
		if (this.gameStyle == 0) {
			return
		}
		egret.log("do Upload Score : " + data.score)
		ZJ.SocketManager.instance.send(11011, {
			score: data.score,
			resultData: ZJ.Util.objToByteArray(data.resultData).bytes
		})
	}

	public SendGameResult11012(data: Data11012) {
		if (this.gameStyle == 0) {
			return
		}
		egret.log("win id : " + data.winPlayerId)
		ZJ.SocketManager.instance.send(11012, {
			winPlayerId: data.winPlayerId
		})
	}

	public SendFriendList(data: Data11014) {
		if (this.gameStyle == 0) {
			return
		}
		egret.log("send friendList : " + data.openId)
		ZJ.SocketManager.instance.send(11014, {
			openId: data.openId
		})
	}
}

interface Data11010 {
	processData: any
}

interface Data11011 {
	score: number
	resultData: any
}

interface Data11012 {
	winPlayerId: number
}

interface Data11014 {
	openId: any
}

interface PlayerInfo {
	playerId: number          // 玩家Id
	openId: string            // 平台账号
	nickname: string          // 昵称
	avatarUrl: string         // 头像url
	gender: string			  // 性别
	isRobot: number           // 是否机器人：1是机器人，0不是机器人
	battleTimes: number       // 战斗次数
}

/* 使用实例
private initDataModel() {
	let model = ChushouDataModel.instance
	model.csAuthRequestCallBack = () => {
		ChushouSDK.instance.csGetFriendList((data: string) => {
			let d = data as any
			let l = d.friends as Array<any>
			let r = []
			for (let i = 0; i < l.length; i++) {
				r.push(l[i].openUid as string)
			}
			ChushouDataModel.instance.sendFriendList({
				openId: r
			})
		})
	}
	model.onData11003 = (data: any) => {
		if (model.myData.battleTimes < 10) {
			this.showTeach()
		}
		else {
			this.showCountAnimation()
		}

		if (model.gameStyle == 1) {
			model.getHighestScore11008()
		}
		else if (model.gameStyle == 2) {
			this.myAvatarImage.source = model.myData.avatarUrl
			this.sbAvatarImage.source = model.sbData.avatarUrl
		}
	}
	model.onData11007 = (data: any) => {
		ChushouDataModel.instance.getHighestScore11008()
	}
	model.onData11008 = (data: any) => {
		this.weekTopScore = data.weekScore
	}
	model.onData11012 = (data: any) => {
		if (data.result == 0) {
			let id = data.winPlayerId
			this.gameRank = data.rank
			this.friendRank = data.friendRank
			if (this.lifeCount <= 0) {
				let settleview = ZJ.UIManager.instance.openView(UIName.Settle) as SettleView
				settleview.setData({ score: this.score, top: this.weekTopScore, friend: this.friendRank, game: this.gameRank })
				egret.clearTimeout(this.showSettleViewBackCountID)
			}
		}
	}
}
*/