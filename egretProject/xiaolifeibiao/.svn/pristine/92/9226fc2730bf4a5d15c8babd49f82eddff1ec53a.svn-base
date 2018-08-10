var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ChushouSDK = (function () {
    function ChushouSDK() {
        // 火树
        this.gameRoomId = "";
        this.role = "";
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
        console.log("csAuthRequest");
        csAuthRequest("{\"h5AppName\" : \"" + ModuleConfig.compile.chushou_h5AppName + "\",\"launchMode\" : \"" + chushouGameConfig.launchMode + "\",\"inviteMode\" : \"" + chushouGameConfig.inviteMode + "\",\"gameRoomId\" : \"" + chushouGameConfig.gameRoomId + "\"}", function (data) {
            console.log("cb csAuthRequest");
            console.log(data);
            var dataObj = JSON.parse(data);
            _this.csAuthRequestData = dataObj;
            if (cb) {
                cb(dataObj);
            }
        });
    };
    ChushouSDK.prototype.csJoinRoom = function (cb) {
        console.log("csJoinRoom " + this.gameRoomId);
        csJoinRoom("{\"accessToken\" : \"" + this.csAuthRequestData.accessToken + "\",\"gameRoomId\" : \"" + this.gameRoomId + "\",\"role\" : \"" + this.csAuthRequestData.role + "\"}", function (data) {
            console.log("cb csJoinRoom");
            console.log(data.toString());
            if (cb) {
                cb(JSON.parse(data));
            }
        });
    };
    ChushouSDK.prototype.csQuitRoom = function (cb) {
        console.log("csQuitRoom");
        csQuitRoom("{\"accessToken\" : \"" + this.csAuthRequestData.accessToken + "\",\"gameRoomId\" : \"" + this.gameRoomId + "\"}", function (data) {
            console.log("cb csQuitRoom");
            if (cb) {
                cb(JSON.parse(data));
            }
        });
    };
    ChushouSDK.prototype.csInviteToGame = function (cb) {
        console.log("csInviteToGame");
        csInviteToGame("{\"accessToken\" : \"" + this.csAuthRequestData.accessToken + "\",\"gameRoomId\" : \"" + this.gameRoomId + "\",\"inviteMode\" : \"" + chushouGameConfig.inviteMode + "\",\"title\" : \"" + this.title + "\",\"description\" : \"" + this.description + "\",\"image\" : \"" + this.image + "\"}", function (data) {
            console.log("cb csInviteToGame");
            if (cb) {
                cb(JSON.parse(data));
            }
        });
    };
    ChushouSDK.prototype.csKickOutUser = function (cb) {
        console.log("csKickOutUser");
        csKickOutUser("{\"accessToken\" : \"" + this.csAuthRequestData.accessToken + "\",\"targetUid\" : \"sl23859\",\"gameRoomId\" : \"" + this.gameRoomId + "\"}", function (data) {
            console.log("cb csKickOutUser");
            if (cb) {
                cb(JSON.parse(data));
            }
        });
    };
    ChushouSDK.prototype.csShareRoom = function (cb) {
        console.log("csShareRoom");
        csShareRoom("{\"accessToken\" : \"" + this.csAuthRequestData.accessToken + "\",\"gameRoomId\" : \"" + this.gameRoomId + "\",\"title\" : \"" + this.title + "\",\"description\" : \"" + this.description + "\",\"image\" : \"" + this.image + "\"}", function (data) {
            console.log("cb csShareRoom");
            if (cb) {
                cb(JSON.parse(data));
            }
        });
    };
    ChushouSDK.prototype.csShareRecord = function (cb) {
        console.log("csShareRecord");
        csShareRecord("{\"accessToken\" : \"" + this.csAuthRequestData.accessToken + "\",\"gameRecordId\" : \"119844\",\"title\" : \"" + this.title + "\",\"description\" : \"" + this.description + "\",\"image\" : \"" + this.image + "\"}", function (data) {
            console.log("cb csShareRecord");
            if (cb) {
                cb(JSON.parse(data));
            }
        });
    };
    ChushouSDK.prototype.csGetFriendList = function (cb) {
        console.log("csGetFriendList");
        csGetFriendList("{\"accessToken\" : \"" + this.csAuthRequestData.accessToken + "\",\"numPerPage\" : \"10\",\"breakpoint\" : \"18823-ffgh-cc08\"}", function (data) {
            console.log("cb csGetFriendList");
            if (cb) {
                cb(JSON.parse(data));
            }
        });
    };
    ChushouSDK.prototype.csGetUserRelationship = function (targetUid, cb) {
        var targetUids = "";
        for (var i = 0; i < targetUid.length; i++) {
            targetUids += targetUid[i];
            if (i != targetUid.length - 1) {
                targetUids += ",";
            }
        }
        console.log("csGetUserRelationship");
        csGetUserRelationship("{\"accessToken\" : \"" + this.csAuthRequestData.accessToken + "\",\"users\" : \"" + targetUids + "\"}", function (data) {
            console.log("cb csGetUserRelationship");
            if (cb) {
                cb(JSON.parse(data));
            }
        });
    };
    ChushouSDK.prototype.csFollowUser = function (targetUid, cb) {
        console.log("csFollowUser");
        csFollowUser("{\"accessToken\" : \"" + this.csAuthRequestData.accessToken + "\",\"targetUid\" : \"" + targetUid + "\"}", function (data) {
            console.log("cb csFollowUser");
            if (cb) {
                cb(JSON.parse(data));
            }
        });
    };
    ChushouSDK.prototype.csEnableMic = function (cb) {
        console.log("csEnableMic");
        csEnableMic("{\"accessToken\" : \"" + this.csAuthRequestData.accessToken + "\",\"enableMic\" : " + this.enableMic + "}", function (data) {
            console.log("cb csEnableMic");
            if (cb) {
                cb(JSON.parse(data));
            }
        });
    };
    ChushouSDK.prototype.csEnableAudioOutput = function (cb) {
        console.log("csEnableAudioOutput");
        csEnableAudioOutput("{\"accessToken\" : \"" + this.csAuthRequestData.accessToken + "\",\"enableAudioOutput\" : \"" + this.enableAudioOutput + "\"}", function (data) {
            console.log("cb csEnableAudioOutput");
            if (cb) {
                cb(JSON.parse(data));
            }
        });
    };
    ChushouSDK.prototype.onUserVolumeUpdate = function (cb) {
        console.log("onUserVolumeUpdate");
        onUserVolumeUpdate(function (data) {
            console.log("cb onUserVolumeUpdate");
            if (cb) {
                cb(JSON.parse(data));
            }
        });
    };
    ChushouSDK.prototype.csExitGame = function (cb) {
        console.log("csExitGame " + this.csAuthRequestData.accessToken);
        this.csQuitRoom();
        csExitGame("{\"accessToken\" : \"" + this.csAuthRequestData.accessToken + "\"}");
    };
    /**
     * @param progress [0,100]
     */
    ChushouSDK.prototype.csNotifyLoadProgress = function (progress, cb) {
        console.log("csNotifyLoadProgress");
        csNotifyLoadProgress("{\"total\" : \"100\",\"progress\" : \"" + progress + "\"}");
    };
    ChushouSDK.prototype.onNetworkStatusChange = function (cb) {
        console.log("onNetworkStatusChange");
        onNetworkStatusChange(function (data) {
            console.log("cb onNetworkStatusChange");
            if (cb) {
                cb(JSON.parse(data));
            }
        });
    };
    ChushouSDK.prototype.csGetAPIVersionInfo = function (cb) {
        console.log("csGetAPIVersionInfo");
        csGetAPIVersionInfo("{\"h5AppName\" : \"" + ModuleConfig.compile.chushou_h5AppName + "\",\"launchMode\" : \"" + chushouGameConfig.launchMode + "\",\"inviteMode\" : \"" + chushouGameConfig.inviteMode + "\",\"gameRoomId\" : \"" + this.gameRoomId + "\"}", function (data) {
            console.log("cb csGetAPIVersionInfo");
            if (cb) {
                cb(JSON.parse(data));
            }
        });
    };
    ChushouSDK.prototype.csInvokeRecharge = function (cb) {
        console.log("csInvokeRecharge");
        csInvokeRecharge("{\"accessToken\" : \"" + this.csAuthRequestData.accessToken + "\",\"paymentScene\" : \"1\"}", function (data) {
            console.log("cb csInvokeRecharge");
            if (cb) {
                cb(JSON.parse(data));
            }
        });
    };
    ChushouSDK.prototype.onBalanceChanged = function (cb) {
        console.log("onBalanceChanged");
    };
    ChushouSDK.prototype.csPurchaseProps = function (cb) {
        console.log("csPurchaseProps");
        csPurchaseProps("{\"accessToken\" : \"" + this.csAuthRequestData.accessToken + "\",\"cpOrderId\" : \"prop7865421\",\"cpPropName\" : \"\u53CC\u500D\u79EF\u5206\u5361\",\"cpPropId\" : \"1\",\"payAmount\" : \"500\"}", function (data) {
            console.log("cb csPurchaseProps");
            if (cb) {
                cb(JSON.parse(data));
            }
        });
    };
    ChushouSDK.prototype.csPayEntryFee = function (cpOrderId, cpPropId, cpPropName, cb) {
        console.log("csPayEntryFee");
        csPayEntryFee("{\"accessToken\" : \"" + this.csAuthRequestData.accessToken + "\",\"cpOrderId\" : \"" + cpOrderId + "\",\"cpPropName\" : \"" + cpPropName + "\",\"cpPropId\" : \"" + cpPropId + "\"}", function (data) {
            console.log("cb csPayEntryFee");
            if (cb) {
                cb(JSON.parse(data));
            }
        });
    };
    ChushouSDK.prototype.csCheckEntryFee = function (cb) {
        console.log("csCheckEntryFee");
        csCheckEntryFee("{\"accessToken\" : \"" + this.csAuthRequestData.accessToken + "\"}", function (data) {
            console.log("cb csCheckEntryFee");
            if (cb) {
                cb(JSON.parse(data));
            }
        });
    };
    return ChushouSDK;
}());
__reflect(ChushouSDK.prototype, "ChushouSDK");
//# sourceMappingURL=ChushouSDK.js.map