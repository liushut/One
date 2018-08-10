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
var SettleView = (function (_super) {
    __extends(SettleView, _super);
    function SettleView() {
        var _this = _super.call(this) || this;
        _this.SHOW_TIME = 3000;
        _this.model = MyCDM.instance;
        _this.skinName = "SettleViewSkin"; //决定皮肤的显示
        return _this;
    }
    SettleView.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    SettleView.prototype.initUI = function () {
        this.weekScoreImg.alpha = 0;
        this.weekScore.alpha = 0;
        this.scoreImg.alpha = 0;
        this.scoreBit.alpha = 0;
        this.smallWeekScore.alpha = 0;
        this.smallWeekScoreImg.alpha = 0;
    };
    SettleView.prototype.childrenCreated = function () {
        var _this = this;
        _super.prototype.childrenCreated.call(this);
        this.initUI();
        this.dikuan.alpha = 0.5;
        var black = ZJ.ShapeUtil.getRect(0x000000, 0.4, this.stage.stageWidth, this.stage.stageHeight);
        this.gBg.addChild(black);
        this.game = ZJ.UIManager.instance.openView(UIName.Game);
        this.restart.addEventListener("touchTap", function () {
            _this.game.qiuB.alpha = 1;
            _this.game.qiuS.alpha = 1;
            _this.game.scoreBitLabel.alpha = 1;
            ZJ.UIManager.instance.destroyView(UIName.Settle);
            _this.game.backUI();
            if (ModuleConfig.compile.danji) {
                _this.game.backUI();
            }
            else {
                _this.game.backUI();
                //发送11007
                MyCDM.instance.PlayAgain11007(); //发起再来一局
                MyCDM.instance.OnData11007 = function (data) {
                    //this.nextG();
                    if (data.result == 0) {
                        //this.nextG();//显示匹配成功
                        //ZJ.UIManager.instance.destroyView(UIName.Settle)
                        console.log("成功");
                    }
                    else if (data.result == 1) {
                        //告知玩家匹配失败，显示Log
                        console.log("失败");
                    }
                    else if (data.result == 3) {
                        //已经再来一局
                        console.log("已经开始");
                    }
                };
                //退出房间
                _this.phb.addEventListener("touchTap", function () {
                    ChushouSDK.instance.csExitGame();
                }, _this);
            }
        }, this);
    };
    SettleView.prototype.setData = function (data) {
        this.score = data.score;
        this.weekscore = data.weekScore;
        this.friend = data.friendRank; //朋友圈排名
        this.rank = data.rank; //游戏排名
        if (data.score > data.weekScore) {
            //显示本周最佳
            this.weekScore.text = data.score.toString();
            this.weekScore.alpha = 1;
            this.weekScoreImg.alpha = 1;
        }
        else {
            //显示本次得分和本周最佳
            this.scoreBit.text = this.score.toString();
            this.scoreImg.alpha = 1;
            this.scoreBit.alpha = 1;
            //本周最佳缩小
            this.smallWeekScore.text = this.score.toString();
            this.smallWeekScoreImg.alpha = 1;
            this.smallWeekScore.alpha = 1;
        }
    };
    SettleView.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
        return 0;
    };
    return SettleView;
}(ZJ.ViewBase));
__reflect(SettleView.prototype, "SettleView");
//# sourceMappingURL=SettleView.js.map