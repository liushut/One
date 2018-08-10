"use strict"

var __bp = {
    //utils
    jsonToObj : function(json){
        return JSON.parse(json);
    },
    objToJson : function(obj){
        return JSON.stringify(obj);
    },
    //communication with native
    msgChannel : {
        _recvCb : null,
        setRecvCallback : function(callback){
            this._recvCb = callback;
        },
        onRecv : function (cmd,param) {
            if(this._recvCb){
                this._recvCb(cmd,param);
            }
        },
        send : function (cmd,param){
            if(param == null){
                param=""
            }
            var str = "js://sendToBPNative?cmd="+cmd+"&param="+param;
            return prompt(str);
        },    
        
    },
}

var BattlePlatform = {
    version : 1,
    msgChannel : __bp.msgChannel,
    jsonToObj : __bp.jsonToObj,
    objToJson : __bp.objToJson,
}

// module.exports = BattlePlatform;