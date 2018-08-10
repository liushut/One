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
var ZJ;
(function (ZJ) {
    /**
     * 倒数。目前只支持显示00:00格式。
     */
    var CountDown = (function (_super) {
        __extends(CountDown, _super);
        function CountDown() {
            var _this = _super.call(this) || this;
            _this.cb = null; // 结束callback
            _this.leftSecond = 0;
            _this.intervalID = 0;
            _this.isPause = false;
            _this.skinName = "CountDownSkin";
            return _this;
        }
        CountDown.prototype.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        CountDown.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        CountDown.prototype.start = function (second) {
            var _this = this;
            this.stop();
            this.isPause = false;
            this.leftSecond = second;
            this.count();
            this.intervalID = setInterval(function () { _this.count(); }, 1000);
        };
        CountDown.prototype.pause = function () {
            this.isPause = true;
        };
        CountDown.prototype.resume = function () {
            this.isPause = false;
        };
        CountDown.prototype.stop = function () {
            clearInterval(this.intervalID);
        };
        CountDown.prototype.setSecond = function (second) {
            // todo 待扩展
            // let days = second / 1000 / 60 / 60 / 24; 
            // let hours = second / 1000 / 60 / 60 % 24;
            var minutes = Math.floor(second / 60) % 60;
            var seconds = second % 60;
            var minutesStr = this.checkTime(minutes);
            var secondsStr = this.checkTime(seconds);
            this.label.text = ZJ.Util.strFormat("{0}:{1}", minutesStr, secondsStr);
        };
        CountDown.prototype.count = function () {
            this.setSecond(this.leftSecond);
            if (this.leftSecond == 0) {
                this.stop();
                if (this.cb != null) {
                    this.cb();
                }
                return;
            }
            if (this.isPause) {
                return;
            }
            this.leftSecond--;
        };
        CountDown.prototype.checkTime = function (i) {
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        };
        /**
         * 销毁前调用
         */
        CountDown.prototype.OnDestroy = function () {
            this.cb = null;
            this.stop();
        };
        return CountDown;
    }(eui.Component));
    ZJ.CountDown = CountDown;
    __reflect(CountDown.prototype, "ZJ.CountDown", ["eui.UIComponent", "egret.DisplayObject"]);
})(ZJ || (ZJ = {}));
//# sourceMappingURL=CountDown.js.map