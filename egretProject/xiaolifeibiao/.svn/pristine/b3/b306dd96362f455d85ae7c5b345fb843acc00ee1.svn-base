var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ChushouDataModel = (function () {
    function ChushouDataModel() {
        this.INTERVAL_PING = 30000; // ping间隔（毫秒）
        /**
         * 0 不联网；
         * 1 单机；
         * 2 1v1；
         * 3 多人对战；
         */
        this.gameStyle = 0;
        this.sbIsFriend = false;
        this.intervalPing = 0;
        ZJ.SocketManager.instance.addEventListener(ZJ.CommonEventName.SOCKET_CONNECTED, this.onConnect, this);
        ZJ.SocketManager.instance.addEventListener(ZJ.CommonEventName.SOCKET_DATA, this.onData, this);
        if (chushouGameConfig.launchMode == "20") {
            this.gameStyle = 1;
            ZJ.SocketManager.instance.connectByUrl(ModuleConfig.ws + "://" + ModuleConfig.ip + ":" + ModuleConfig.singlePort);
        }
        else if (chushouGameConfig.launchMode == "30") {
            this.gameStyle = 2;
            ZJ.SocketManager.instance.connectByUrl(ModuleConfig.ws + "://" + ModuleConfig.ip + ":" + ModuleConfig.doublePort);
        }
    }
    Object.defineProperty(ChushouDataModel, "instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new ChushouDataModel();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    ChushouDataModel.prototype.onConnect = function () {
        var _this = this;
        ChushouSDK.instance.csAuthRequest(function (data) {
            egret.log();
            _this.login10000();
            _this.ping11004();
            _this.csAuthRequestCallBack();
        });
    };
    ChushouDataModel.prototype.onData = function (e) {
        var _this = this;
        var data = e.data.data;
        console.log(JSON.stringify(data));
        switch (e.data.protoID) {
            case 10000:
                // 客户端登录进入游戏的返回
                if (data.result == 0) {
                    this.match10001();
                    this.doAction(this.onData10000, data);
                }
                else {
                    ChushouSDK.instance.csExitGame();
                }
                break;
            case 10001:
                // 客户端匹配进入房间的返回
                if (data.result == 0) {
                    this.doAction(this.onData10001, data);
                    if (this.gameStyle == 2) {
                        ChushouSDK.instance.gameRoomId = data.roomId;
                        ChushouSDK.instance.csJoinRoom(function (data) {
                            if (data.code == 0) {
                                _this.gamePreStart11002();
                            }
                            else {
                                // 触手sdk进入房间接口返回谜之错误
                                ChushouSDK.instance.csExitGame();
                            }
                        });
                    }
                    else if (this.gameStyle == 1) {
                        this.gamePreStart11002();
                    }
                }
                else if (data.result == 2) {
                    // 房间人数已满
                    ChushouSDK.instance.csExitGame();
                }
                else {
                    // 失败
                    ChushouSDK.instance.csExitGame();
                }
                break;
            case 11002:
                // 准备开始游戏的返回
                if (data.result == 0) {
                    this.doAction(this.onData11002, data);
                }
                else {
                    // 失败
                    ChushouSDK.instance.csExitGame();
                }
                break;
            case 11003:
                // 服务端通知开始游戏倒计时
                if (this.gameStyle == 2) {
                    if (data.playerInfos[0].openId == ChushouSDK.instance.csAuthRequestData.openUid) {
                        this.myData = data.playerInfos[0];
                        this.sbData = data.playerInfos[1];
                    }
                    else {
                        this.myData = data.playerInfos[1];
                        this.sbData = data.playerInfos[0];
                    }
                    ChushouSDK.instance.csGetUserRelationship([this.sbData.openId], function (data) {
                        _this.sbIsFriend = false;
                        if (data.code == 0) {
                            if (data.users[0].relationship != 0) {
                                _this.sbIsFriend = true;
                            }
                        }
                    });
                }
                else if (this.gameStyle == 1) {
                    this.myData = data.playerInfos[0];
                }
                this.doAction(this.onData11003, data);
                break;
            case 11005:
                // 获取当前开局状态的返回
                this.doAction(this.onData11005, data);
                break;
            case 11006:
                // 获取游戏数据的返回
                this.doAction(this.onData11006, data);
                break;
            case 11007:
                // 再来一局的返回，若双方均已发送来一局，会推送11003到客户端
                this.doAction(this.onData11007, data);
                break;
            case 11008:
                // 查询玩家最高分的返回
                this.doAction(this.onData11008, data);
                break;
            case 11009:
                // 后端推送玩家请求再来一局
                this.doAction(this.onData11009, data);
                break;
            case 11010:
                // 客户端同步游戏过程包的返回
                this.doAction(this.onData11010, data);
                break;
            case 11011:
                // 客户端同步游戏结算点数据包(后端校验包)的返回
                this.doAction(this.onData11011, data);
                break;
            case 11012:
                // 游戏结果通知的返回
                this.doAction(this.onData11012, data);
            default:
                break;
        }
    };
    ChushouDataModel.prototype.doAction = function (func, data) {
        if (func) {
            func(data);
        }
    };
    ChushouDataModel.prototype.login10000 = function () {
        egret.log("do Login");
        ZJ.SocketManager.instance.send(10000, {
            openId: ChushouSDK.instance.csAuthRequestData.openUid, sign: "sign", timestamp: ZJ.Util.timeStamp(), appId: ModuleConfig.compile.chushou_appid,
            params: [ChushouSDK.instance.csAuthRequestData.nickname, ChushouSDK.instance.csAuthRequestData.gender, ChushouSDK.instance.csAuthRequestData.avatar]
        });
    };
    ChushouDataModel.prototype.match10001 = function () {
        egret.log("do Match");
        if (this.gameStyle == 1) {
            ZJ.SocketManager.instance.send(10001, {
                gameMode: this.gameStyle, matchType: 1
            });
        }
        else if (this.gameStyle == 2) {
            ZJ.SocketManager.instance.send(10001, {
                gameMode: this.gameStyle, matchType: 2, matchId: ChushouSDK.instance.csAuthRequestData.csGroupId.toString()
            });
        }
    };
    ChushouDataModel.prototype.gamePreStart11002 = function () {
        egret.log("do Ready");
        ZJ.SocketManager.instance.send(11002);
    };
    ChushouDataModel.prototype.ping11004 = function () {
        egret.log("do Ping");
        this.intervalPing = setInterval(function () {
            ZJ.SocketManager.instance.send(11004);
        }, this.INTERVAL_PING);
    };
    ChushouDataModel.prototype.getGameState11005 = function () {
        if (this.gameStyle == 0) {
            return;
        }
        egret.log("get game state");
        ZJ.SocketManager.instance.send(11005);
    };
    ChushouDataModel.prototype.getPlayerData11006 = function () {
        if (this.gameStyle == 0) {
            return;
        }
        egret.log("get player data");
        ZJ.SocketManager.instance.send(11006);
    };
    ChushouDataModel.prototype.playAgain11007 = function () {
        if (this.gameStyle == 0) {
            return;
        }
        egret.log("play again");
        ZJ.SocketManager.instance.send(11007);
    };
    ChushouDataModel.prototype.getHighestScore11008 = function () {
        if (this.gameStyle == 0) {
            return;
        }
        egret.log("get highest score");
        ZJ.SocketManager.instance.send(11008);
    };
    ChushouDataModel.prototype.sendProcessData11010 = function (data) {
        if (this.gameStyle == 0) {
            return;
        }
        egret.log("send process data");
        ZJ.SocketManager.instance.send(11010, {
            processData: ZJ.Util.objToByteArray(data.processData).bytes
        });
    };
    ChushouDataModel.prototype.sendScoredData11011 = function (data) {
        if (this.gameStyle == 0) {
            return;
        }
        egret.log("do Upload Score : " + data.score);
        ZJ.SocketManager.instance.send(11011, {
            score: data.score,
            resultData: ZJ.Util.objToByteArray(data.resultData).bytes
        });
    };
    ChushouDataModel.prototype.sendGameResult11012 = function (data) {
        if (this.gameStyle == 0) {
            return;
        }
        egret.log("win id : " + data.winPlayerId);
        ZJ.SocketManager.instance.send(11012, {
            winPlayerId: data.winPlayerId
        });
    };
    ChushouDataModel.prototype.sendFriendList = function (data) {
        if (this.gameStyle == 0) {
            return;
        }
        egret.log("send friendList : " + data.openId);
        ZJ.SocketManager.instance.send(11014, {
            openId: data.openId
        });
    };
    return ChushouDataModel;
}());
__reflect(ChushouDataModel.prototype, "ChushouDataModel");
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
//# sourceMappingURL=ChushouDataModel.js.map