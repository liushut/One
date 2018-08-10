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
var TimerPanel = (function (_super) {
    __extends(TimerPanel, _super);
    function TimerPanel() {
        var _this = _super.call(this) || this;
        _this._num = 20; //记录的次数
        _this._timers = 20; //剩余的秒数
        _this.draw();
        _this.creatTimer();
        return _this;
    }
    //绘制
    TimerPanel.prototype.draw = function () {
        this._txt = new egret.TextField();
        this._txt.width = egret.MainContext.instance.stage.stageWidth;
        this._txt.y = 100;
        this._txt.textColor = 0xff0000;
        this._txt.textAlign = egret.HorizontalAlign.CENTER;
        this._txt.text = "20'00'";
        this.addChild(this._txt);
    };
    TimerPanel.prototype.creatTimer = function () {
        this._timer = new egret.Timer(1000, this._num); //1s 记录的次数
        this._timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this._timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onTimerCom, this);
    };
    TimerPanel.prototype.onTimer = function () {
        this._timers -= 1;
        this._txt.text = this._timers + "'00'";
    };
    //时间到的回调
    TimerPanel.prototype.onTimerCom = function () {
        this._txt.text = "00'00'";
        this.dispatchEventWith("gameOver");
    };
    TimerPanel.prototype.start = function () {
        this._txt.text = "20'00'";
        this._timer.reset();
        this._timers = 20;
        this._timer.start();
    };
    TimerPanel.prototype.stop = function () {
        this._timer.stop();
    };
    return TimerPanel;
}(egret.Sprite));
__reflect(TimerPanel.prototype, "TimerPanel");
//# sourceMappingURL=TimerPanel.js.map