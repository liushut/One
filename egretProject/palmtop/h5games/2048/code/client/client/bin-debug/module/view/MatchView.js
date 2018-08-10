var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var MatchView = (function (_super) {
    __extends(MatchView, _super);
    function MatchView() {
        var _this = _super.call(this) || this;
        _this.skinName = "MatchViewSkin";
        return _this;
    }
    MatchView.prototype.childrenCreated = function () {
        var _this = this;
        _super.prototype.childrenCreated.call(this);
        this.idInput.textDisplay.size = 80;
        this.idInput.textDisplay.textAlign = "center";
        this.idInput.textDisplay.verticalAlign = "middle";
        this.idInput.textDisplay.left = 0;
        this.idInput.textDisplay.right = 0;
        this.idInput.textDisplay.top = 0;
        this.idInput.textDisplay.bottom = 0;
        this.matchInput.textDisplay.size = 80;
        this.matchInput.textDisplay.textAlign = "center";
        this.matchInput.textDisplay.verticalAlign = "middle";
        this.matchInput.textDisplay.left = 0;
        this.matchInput.textDisplay.right = 0;
        this.matchInput.textDisplay.top = 0;
        this.matchInput.textDisplay.bottom = 0;
        this.login.addEventListener("touchTap", function () {
            _this.sendLogin();
            _this.log.text = "已点击登录";
        }, this);
        this.match.addEventListener("touchTap", function () {
            var inputText = _this.matchInput.text;
            _this.matchRoom(inputText);
            _this.log.text = "已点击匹配";
        }, this);
        this.ready.addEventListener("touchTap", function () {
            _this.readyGame();
            _this.log.text = "已点击准备";
        }, this);
        this.a10010.addEventListener("touchTap", function () {
            ZJ.SocketManager.instance.send(11010, {
                processData: ZJ.Util.objToByteArray("11010的数据").bytes
            });
            _this.log.text = "已点击发送11010";
        }, this);
        this.a10011.addEventListener("touchTap", function () {
            ZJ.SocketManager.instance.send(11011, {
                resultData: ZJ.Util.objToByteArray("11011的数据").bytes
            });
            _this.log.text = "已点击发送11011";
        }, this);
        this.log = new eui.Label();
        this.log.horizontalCenter = 450;
        this.log.verticalCenter = -200;
        this.log.textAlign = "center";
        this.log.verticalAlign = "middle";
        this.addChild(this.log);
    };
    MatchView.prototype.sendLogin = function () {
        // if (!ModuleConfig.compile.danji) {
        //     ZJ.SocketManager.instance.send(11000, {
        //         openId: this.idInput.text,
        //         nickname: yyGameConfig.nickname,
        //         avatarUrl: yyGameConfig.avatarUrl,
        //         timestamp: yyGameConfig.timestamp,
        //         sign: yyGameConfig.sign,
        //     })
        // }
    };
    /** 申请进入匹配房间 */
    MatchView.prototype.matchRoom = function (matchId) {
        ZJ.SocketManager.instance.send(11001, {
            matchId: matchId
        });
    };
    /** 准备游戏 */
    MatchView.prototype.readyGame = function () {
        ZJ.SocketManager.instance.send(11002, {});
    };
    return MatchView;
}(ZJ.ViewBase));
__reflect(MatchView.prototype, "MatchView");
//# sourceMappingURL=MatchView.js.map