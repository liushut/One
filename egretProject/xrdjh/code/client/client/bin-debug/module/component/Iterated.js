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
var Iterated = (function (_super) {
    __extends(Iterated, _super);
    function Iterated() {
        var _this = _super.call(this) || this;
        _this.P1_BORN = [-20, 100];
        _this.P2_BORN = [1100, 100];
        _this.TIME_WALK = 600;
        _this.TIME_WALK_ONCE = _this.TIME_WALK / 6;
        _this.X_WALK = 110;
        _this.isPlaying = false;
        _this.skinName = "IteratedSkin";
        return _this;
    }
    // ui控件
    Iterated.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    Iterated.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        var p1 = new Peep();
        this.addChild(p1);
        p1.scaleX = 0.8;
        p1.scaleY = 0.8;
        p1.x = this.P1_BORN[0];
        p1.y = this.P1_BORN[1];
        this.p1 = p1;
        var p2 = new Peep();
        this.addChild(p2);
        p2.scaleX = -0.8;
        p2.scaleY = 0.8;
        p2.x = this.P2_BORN[0];
        p2.y = this.P2_BORN[1];
        this.p2 = p2;
        var payoff = new Payoff();
        this.addChild(payoff);
        payoff.showMachine(true);
        payoff.horizontalCenter = 0;
        payoff.y = 50;
    };
    Iterated.prototype.startGame = function (p1Answer, p2Answer) {
        if (this.allowCall()) {
            this.isPlaying = true;
            var result = this.getResult(p1Answer, p2Answer);
            this.goForward(result);
            ZJ.EventManager.instance.dispatchEvent(new ZJ.CommonEvent(EventName.ITERATED_ROUND_START));
        }
    };
    /**
     * @returns [result1,result2,eye1,eye2]
     */
    Iterated.prototype.getResult = function (p1Answer, p2Answer) {
        var result = [];
        var hezuo = "";
        var shengfu = "";
        if (p1Answer == GlobalData.ANSWER_COOPERATE) {
            if (p2Answer == GlobalData.ANSWER_COOPERATE) {
                result.push({ result: GlobalData.RESULT_HEZUO_PING, eye: GlobalData.EYE_HEZUO_PING }, { result: GlobalData.RESULT_HEZUO_PING, eye: GlobalData.EYE_HEZUO_PING });
            }
            else if (p2Answer == GlobalData.ANSWER_CHEAT) {
                result.push({ result: GlobalData.RESULT_HEZUO_FU, eye: GlobalData.EYE_HEZUO_FU }, { result: GlobalData.RESULT_QIPIAN_SHENG, eye: GlobalData.EYE_QIPIAN_SHENG });
            }
        }
        else if (p1Answer == GlobalData.ANSWER_CHEAT) {
            if (p2Answer == GlobalData.ANSWER_COOPERATE) {
                result.push({ result: GlobalData.RESULT_QIPIAN_SHENG, eye: GlobalData.EYE_QIPIAN_SHENG }, { result: GlobalData.RESULT_HEZUO_FU, eye: GlobalData.EYE_HEZUO_FU });
            }
            else if (p2Answer == GlobalData.ANSWER_CHEAT) {
                result.push({ result: GlobalData.RESULT_QIPIAN_PING, eye: GlobalData.EYE_QIPIAN_PING }, { result: GlobalData.RESULT_QIPIAN_PING, eye: GlobalData.EYE_QIPIAN_PING });
            }
        }
        result[0].answer = p1Answer;
        result[1].answer = p2Answer;
        return result;
    };
    Iterated.prototype.goForward = function (result) {
        var _this = this;
        egret.Tween.get(this.p1, { loop: true }).call(function () {
            // 拿出coin
            _this.p1.playShowCoin();
            _this.p2.playShowCoin();
        })
            .wait(this.p1.TIME_COIN_SHOW + this.p1.TIME_COIN_WAIT).call(function () {
            // 走过去
            _this.p1.playWalk(_this.TIME_WALK_ONCE);
            _this.p2.playWalk(_this.TIME_WALK_ONCE);
        }).to({ x: this.P1_BORN[0] + this.X_WALK }, this.TIME_WALK).call(function () {
            // 放入coin
            _this.p1.playPutCoin(result[0].answer);
            _this.p2.playPutCoin(result[1].answer);
        }).wait(this.p1.TIME_COIN_PUT).call(function () {
            // 出结果
            _this.p1.setResult(result[0].result);
            _this.p2.setResult(result[1].result);
        }).wait(500).call(function () {
            // 走回去
            _this.p1.playWalk(_this.TIME_WALK_ONCE);
            _this.p2.playWalk(_this.TIME_WALK_ONCE);
        }).to({ x: this.P1_BORN[0] }, this.TIME_WALK).call(function () {
            // 拿回coin
            _this.p1.playTakeBackCoin();
            _this.p2.playTakeBackCoin();
            // 更新眼睛
            _this.p1.setEye(result[0].eye);
            _this.p2.setEye(result[1].eye);
            ZJ.EventManager.instance.dispatchEvent(new ZJ.CommonEvent(EventName.ITERATED_ROUND_END));
        }).wait(1000);
        egret.Tween.get(this.p2, { loop: true }).wait(this.p1.TIME_COIN_SHOW + this.p1.TIME_COIN_WAIT)
            .to({ x: this.P2_BORN[0] - this.X_WALK }, this.TIME_WALK)
            .wait(this.p1.TIME_COIN_PUT)
            .wait(500).to({ x: this.P2_BORN[0] }, this.TIME_WALK).wait(1000);
    };
    /**
     * 是否允许调用。在public方法中应加入该判断，防止被打乱节奏。
     */
    Iterated.prototype.allowCall = function () {
        return !this.isPlaying;
    };
    /**
     * 正常处理返回0
     */
    Iterated.prototype.onDestroy = function () {
        return 0;
    };
    return Iterated;
}(ZJ.ComponentBase));
__reflect(Iterated.prototype, "Iterated");
//# sourceMappingURL=Iterated.js.map