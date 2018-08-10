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
var Peep = (function (_super) {
    __extends(Peep, _super);
    function Peep() {
        var _this = _super.call(this) || this;
        _this.EYE_DAIJI = "daiji";
        _this.EYE_YUN = "yun";
        _this.Y_WALK = -20;
        _this.COIN_BORN = [135, 280];
        _this.COIN_SHOW = [_this.COIN_BORN[0] + 90, _this.COIN_BORN[1] - 90];
        _this.COIN_PUT_COOPERATE = [_this.COIN_SHOW[0] + 45, _this.COIN_SHOW[1] + 80];
        _this.COIN_PUT_CHEAT = [_this.COIN_SHOW[0] + 30, _this.COIN_SHOW[1] + 50];
        _this.TIME_COIN_SHOW = 100;
        _this.TIME_COIN_WAIT = 200;
        _this.TIME_COIN_PUT = 200;
        _this.daijiInterval = 0;
        _this.isDaiji = true;
        _this.skinName = "PeepSkin";
        return _this;
    }
    Peep.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    Peep.prototype.childrenCreated = function () {
        var _this = this;
        _super.prototype.childrenCreated.call(this);
        ZJ.ResManager.instance.loadMovieClip("peep", "peep", function (mc) {
            _this.mcEye = mc;
            _this.gMcEye.addChild(_this.mcEye);
            var ranTime = Math.random() * 1000 + 1500;
            _this.daijiInterval = egret.setInterval(function () {
                if (_this.isDaiji) {
                    var ran = Math.random();
                    if (ran > 0.4) {
                        _this.mcEye.gotoAndPlay(_this.EYE_DAIJI, 1);
                    }
                }
            }, _this, ranTime);
        });
        this.guocheng.visible = false;
        this.coin.visible = false;
    };
    Peep.prototype.setResult = function (guocheng) {
        this.setDaiji(false);
        this.guocheng.visible = true;
        this.gEye.visible = false;
        this.guocheng.source = guocheng;
    };
    Peep.prototype.setEye = function (eye) {
        this.setDaiji(true);
        this.guocheng.visible = false;
        this.gEye.visible = true;
        this.eye.source = eye;
    };
    Peep.prototype.setDaiji = function (isDaiji) {
        this.isDaiji = isDaiji;
    };
    Peep.prototype.playWalk = function (time) {
        egret.Tween.get(this.gVertical).to({ y: this.Y_WALK }, time).to({ y: 0 }, time)
            .to({ y: this.Y_WALK }, time).to({ y: 0 }, time)
            .to({ y: this.Y_WALK }, time).to({ y: 0 }, time);
    };
    Peep.prototype.playShowCoin = function () {
        this.coin.visible = true;
        egret.Tween.get(this.coin).to({ x: this.COIN_SHOW[0], y: this.COIN_SHOW[1] }, this.TIME_COIN_SHOW, egret.Ease.circOut);
    };
    Peep.prototype.playPutCoin = function (answer) {
        var _this = this;
        var put = null;
        if (answer == GlobalData.ANSWER_COOPERATE) {
            put = this.COIN_PUT_COOPERATE;
            egret.Tween.get(this.coin).to({ x: put[0], y: put[1] }, this.TIME_COIN_PUT).call(function () {
                _this.coin.visible = false;
            });
        }
        else if (answer == GlobalData.ANSWER_CHEAT) {
            put = this.COIN_PUT_CHEAT;
            egret.Tween.get(this.coin).to({ x: put[0], y: put[1] }, this.TIME_COIN_PUT, egret.Ease.circInOut)
                .to({ x: this.COIN_SHOW[0], y: this.COIN_SHOW[1] }, 100);
        }
    };
    Peep.prototype.playTakeBackCoin = function () {
        var _this = this;
        egret.Tween.get(this.coin).to({ x: this.COIN_BORN[0], y: this.COIN_BORN[1] }, 100, egret.Ease.circOut).call(function () {
            _this.coin.visible = false;
        });
    };
    /**
     * 正常处理返回0
     */
    Peep.prototype.onDestroy = function () {
        egret.clearInterval(this.daijiInterval);
        return 0;
    };
    return Peep;
}(ZJ.ComponentBase));
__reflect(Peep.prototype, "Peep");
//# sourceMappingURL=Peep.js.map