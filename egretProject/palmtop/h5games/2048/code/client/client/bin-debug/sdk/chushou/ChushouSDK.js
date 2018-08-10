var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ChushouSDK = (function () {
    function ChushouSDK() {
        // 火树
        this.gameRoomId = "";
        this.role = "";
        this.h5AppName = "hsdailyshot";
        this.title = "分享标题";
        this.image = "/resource/assets/egret_icon.png";
        this.description = "分享描述";
        this.enableMic = "1";
        this.enableAudioOutput = "1";
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
        this.csAuthRequestData = null;
    }
    Object.defineProperty(ChushouSDK, "instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new ChushouSDK();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    ChushouSDK.prototype.csAuthRequest = function (cb) {
        var _this = this;
        this.log("csAuthRequest");
        csAuthRequest("{\"h5AppName\" : \"" + this.h5AppName + "\",\"launchMode\" : \"" + chushouGameConfig.launchMode + "\",\"inviteMode\" : \"" + chushouGameConfig.inviteMode + "\",\"gameRoomId\" : \"" + chushouGameConfig.gameRoomId + "\"}", function (data) {
            _this.log("cb csAuthRequest");
            _this.log(data);
            var dataObj = JSON.parse(data);
            _this.csAuthRequestData = dataObj;
            if (cb) {
                cb(dataObj);
            }
        });
    };
    ChushouSDK.prototype.csJoinRoom = function (cb) {
        var _this = this;
        this.log("csJoinRoom " + this.gameRoomId);
        csJoinRoom("{\"accessToken\" : \"" + this.csAuthRequestData.accessToken + "\",\"gameRoomId\" : \"" + this.gameRoomId + "\",\"role\" : \"" + this.csAuthRequestData.role + "\"}", function (data) {
            _this.log("cb csJoinRoom");
            _this.log(data.toString());
            if (cb) {
                cb(JSON.parse(data));
            }
        });
    };
    ChushouSDK.prototype.csQuitRoom = function (cb) {
        var _this = this;
        this.log("csQuitRoom");
        csQuitRoom("{\"accessToken\" : \"" + this.csAuthRequestData.accessToken + "\",\"gameRoomId\" : \"" + this.gameRoomId + "\"}", function (data) {
            _this.log("cb csQuitRoom");
            if (cb) {
                cb(JSON.parse(data));
            }
        });
    };
    ChushouSDK.prototype.csInviteToGame = function (cb) {
        var _this = this;
        this.log("csInviteToGame");
        csInviteToGame("{\"accessToken\" : \"" + this.csAuthRequestData.accessToken + "\",\"gameRoomId\" : \"" + this.gameRoomId + "\",\"inviteMode\" : \"" + chushouGameConfig.inviteMode + "\",\"title\" : \"" + this.title + "\",\"description\" : \"" + this.description + "\",\"image\" : \"" + this.image + "\"}", function (data) {
            _this.log("cb csInviteToGame");
            if (cb) {
                cb(JSON.parse(data));
            }
        });
    };
    ChushouSDK.prototype.csKickOutUser = function (cb) {
        var _this = this;
        this.log("csKickOutUser");
        csKickOutUser("{\"accessToken\" : \"" + this.csAuthRequestData.accessToken + "\",\"targetUid\" : \"sl23859\",\"gameRoomId\" : \"" + this.gameRoomId + "\"}", function (data) {
            _this.log("cb csKickOutUser");
            if (cb) {
                cb(JSON.parse(data));
            }
        });
    };
    ChushouSDK.prototype.csShareRoom = function (cb) {
        var _this = this;
        this.log("csShareRoom");
        csShareRoom("{\"accessToken\" : \"" + this.csAuthRequestData.accessToken + "\",\"gameRoomId\" : \"" + this.gameRoomId + "\",\"title\" : \"" + this.title + "\",\"description\" : \"" + this.description + "\",\"image\" : \"" + this.image + "\"}", function (data) {
            _this.log("cb csShareRoom");
            if (cb) {
                cb(JSON.parse(data));
            }
        });
    };
    ChushouSDK.prototype.csShareRecord = function (cb) {
        var _this = this;
        this.log("csShareRecord");
        csShareRecord("{\"accessToken\" : \"" + this.csAuthRequestData.accessToken + "\",\"gameRecordId\" : \"119844\",\"title\" : \"" + this.title + "\",\"description\" : \"" + this.description + "\",\"image\" : \"" + this.image + "\"}", function (data) {
            _this.log("cb csShareRecord");
            if (cb) {
                cb(JSON.parse(data));
            }
        });
    };
    ChushouSDK.prototype.csGetFriendList = function (cb) {
        var _this = this;
        this.log("csGetFriendList");
        csGetFriendList("{\"accessToken\" : \"" + this.csAuthRequestData.accessToken + "\",\"numPerPage\" : \"10\",\"breakpoint\" : \"18823-ffgh-cc08\"}", function (data) {
            _this.log("cb csGetFriendList");
            if (cb) {
                cb(JSON.parse(data));
            }
        });
    };
    ChushouSDK.prototype.csGetUserRelationship = function (targetUid, cb) {
        var _this = this;
        var targetUids = "";
        for (var i = 0; i < targetUid.length; i++) {
            targetUids += targetUid[i];
            if (i != targetUid.length - 1) {
                targetUids += ",";
            }
        }
        this.log("csGetUserRelationship");
        csGetUserRelationship("{\"accessToken\" : \"" + this.csAuthRequestData.accessToken + "\",\"users\" : \"" + targetUids + "\"}", function (data) {
            _this.log("cb csGetUserRelationship");
            if (cb) {
                cb(JSON.parse(data));
            }
        });
    };
    ChushouSDK.prototype.csFollowUser = function (targetUid, cb) {
        var _this = this;
        this.log("csFollowUser");
        csFollowUser("{\"accessToken\" : \"" + this.csAuthRequestData.accessToken + "\",\"targetUid\" : \"" + targetUid + "\"}", function (data) {
            _this.log("cb csFollowUser");
            if (cb) {
                cb(JSON.parse(data));
            }
        });
    };
    ChushouSDK.prototype.csEnableMic = function (cb) {
        var _this = this;
        this.log("csEnableMic");
        csEnableMic("{\"accessToken\" : \"" + this.csAuthRequestData.accessToken + "\",\"enableMic\" : " + this.enableMic + "}", function (data) {
            _this.log("cb csEnableMic");
            if (cb) {
                cb(JSON.parse(data));
            }
        });
    };
    ChushouSDK.prototype.csEnableAudioOutput = function (cb) {
        var _this = this;
        this.log("csEnableAudioOutput");
        csEnableAudioOutput("{\"accessToken\" : \"" + this.csAuthRequestData.accessToken + "\",\"enableAudioOutput\" : \"" + this.enableAudioOutput + "\"}", function (data) {
            _this.log("cb csEnableAudioOutput");
            if (cb) {
                cb(JSON.parse(data));
            }
        });
    };
    ChushouSDK.prototype.onUserVolumeUpdate = function (cb) {
        var _this = this;
        this.log("onUserVolumeUpdate");
        onUserVolumeUpdate(function (data) {
            _this.log("cb onUserVolumeUpdate");
            if (cb) {
                cb(JSON.parse(data));
            }
        });
    };
    ChushouSDK.prototype.csExitGame = function (cb) {
        this.log("csExitGame " + this.csAuthRequestData.accessToken);
        this.csQuitRoom();
        csExitGame("{\"accessToken\" : \"" + this.csAuthRequestData.accessToken + "\"}");
    };
    /**
     * @param progress [0,100]
     */
    ChushouSDK.prototype.csNotifyLoadProgress = function (progress, cb) {
        this.log("csNotifyLoadProgress");
        csNotifyLoadProgress("{\"total\" : \"100\",\"progress\" : \"" + progress + "\"}");
    };
    ChushouSDK.prototype.onNetworkStatusChange = function (cb) {
        var _this = this;
        this.log("onNetworkStatusChange");
        onNetworkStatusChange(function (data) {
            _this.log("cb onNetworkStatusChange");
            if (cb) {
                cb(JSON.parse(data));
            }
        });
    };
    ChushouSDK.prototype.csGetAPIVersionInfo = function (cb) {
        var _this = this;
        this.log("csGetAPIVersionInfo");
        csGetAPIVersionInfo("{\"h5AppName\" : \"" + this.h5AppName + "\",\"launchMode\" : \"" + chushouGameConfig.launchMode + "\",\"inviteMode\" : \"" + chushouGameConfig.inviteMode + "\",\"gameRoomId\" : \"" + this.gameRoomId + "\"}", function (data) {
            _this.log("cb csGetAPIVersionInfo");
            if (cb) {
                cb(JSON.parse(data));
            }
        });
    };
    /**
     * @param paymentScene 0-直接拉起充值场景, 1-表示购买道具场景, 2-表示支付对局入场费场景
     */
    ChushouSDK.prototype.csInvokeRecharge = function (paymentScene, cb) {
        var _this = this;
        this.log("csInvokeRecharge");
        csInvokeRecharge("{\"accessToken\" : \"" + this.csAuthRequestData.accessToken + "\",\"paymentScene\" : \"" + paymentScene + "\"}", function (data) {
            _this.log("cb csInvokeRecharge");
            if (cb) {
                cb(JSON.parse(data));
            }
        });
    };
    ChushouSDK.prototype.onBalanceChanged = function (cb) {
        this.log("onBalanceChanged");
    };
    ChushouSDK.prototype.csPurchaseProps = function (cb) {
        var _this = this;
        this.log("csPurchaseProps");
        csPurchaseProps("{\"accessToken\" : \"" + this.csAuthRequestData.accessToken + "\",\"cpOrderId\" : \"prop7865421\",\"cpPropName\" : \"\u53CC\u500D\u79EF\u5206\u5361\",\"cpPropId\" : \"1\",\"payAmount\" : \"500\"}", function (data) {
            _this.log("cb csPurchaseProps");
            if (cb) {
                cb(JSON.parse(data));
            }
        });
    };
    ChushouSDK.prototype.csPayEntryFee = function (cpOrderId, cpPropId, cpPropName, cb) {
        var _this = this;
        this.log("csPayEntryFee");
        csPayEntryFee("{\"accessToken\" : \"" + this.csAuthRequestData.accessToken + "\",\"cpOrderId\" : \"" + cpOrderId + "\",\"cpPropName\" : \"" + cpPropName + "\",\"cpPropId\" : \"" + cpPropId + "\"}", function (data) {
            _this.log("cb csPayEntryFee");
            if (cb) {
                cb(JSON.parse(data));
            }
        });
    };
    ChushouSDK.prototype.csCheckEntryFee = function (cb) {
        var _this = this;
        this.log("csCheckEntryFee");
        csCheckEntryFee("{\"accessToken\" : \"" + this.csAuthRequestData.accessToken + "\"}", function (data) {
            _this.log("cb csCheckEntryFee");
            if (cb) {
                cb(JSON.parse(data));
            }
        });
    };
    ChushouSDK.prototype.csRecordReport = function (gameResult, cb) {
        var _this = this;
        this.log("csRecordReport");
        csRecordReport("{\"accessToken\" : \"" + this.csAuthRequestData.accessToken + "\",\"openUid\" : \"" + this.csAuthRequestData.openUid + "\",\"gameResult\" : \"" + gameResult + "\" , \"gameRecordId\" : \"" + chushouGameConfig.gameRecordId + "\"}", function (data) {
            _this.log("cb csRecordReport");
            if (cb) {
                cb(JSON.parse(data));
            }
        });
    };
    ChushouSDK.prototype.log = function (str) {
        console.log(str);
    };
    return ChushouSDK;
}());
__reflect(ChushouSDK.prototype, "ChushouSDK");
//# sourceMappingURL=ChushouSDK.js.map