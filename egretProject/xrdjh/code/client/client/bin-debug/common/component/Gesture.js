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
    var Gesture = (function (_super) {
        __extends(Gesture, _super);
        function Gesture() {
            var _this = _super.call(this) || this;
            _this.INTERVAL = 60;
            _this.DISTANCE = 20;
            _this.pastTime = 0;
            _this.lastPos = new ZJ.Vector3();
            _this.nowPos = new ZJ.Vector3();
            _this.isBegin = false;
            _this.intervalID = 0;
            return _this;
        }
        Gesture.prototype.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        Gesture.prototype.childrenCreated = function () {
            var _this = this;
            _super.prototype.childrenCreated.call(this);
            this.layer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            this.layer.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            this.layer.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            this.intervalID = setInterval(function () {
                _this.onInterval();
            }, this.INTERVAL);
        };
        Gesture.prototype.onInterval = function () {
            if (this.isBegin) {
                var deltaX = this.nowPos.x - this.lastPos.x;
                var deltaY = this.nowPos.y - this.lastPos.y;
                var absX = Math.abs(deltaX);
                var absY = Math.abs(deltaY);
                var data = {};
                if (absX > absY) {
                    if (absX > this.DISTANCE) {
                        if (deltaX > 0) {
                            // console.log("右");
                            data.direct = ZJ.CommonConfig.RIGHT;
                        }
                        else {
                            // console.log("左");
                            data.direct = ZJ.CommonConfig.LEFT;
                        }
                        this.isBegin = false;
                    }
                }
                else {
                    if (absY > this.DISTANCE) {
                        if (deltaY > 0) {
                            // console.log("下");
                            data.direct = ZJ.CommonConfig.DOWN;
                        }
                        else {
                            // console.log("上");
                            data.direct = ZJ.CommonConfig.UP;
                        }
                        this.isBegin = false;
                    }
                }
                if (!this.isBegin) {
                    var e = new egret.Event(ZJ.CommonEventName.GESTURE_DIRECT);
                    e.data = data;
                    ZJ.EventManager.instance.dispatchEvent(e);
                }
                this.lastPos.x = this.nowPos.x;
                this.lastPos.y = this.nowPos.y;
            }
        };
        Gesture.prototype.onTouchBegin = function (e) {
            this.pastTime = 0;
            this.nowPos.x = e.stageX;
            this.nowPos.y = e.stageY;
            this.lastPos.x = e.stageX;
            this.lastPos.y = e.stageY;
            this.isBegin = true;
        };
        Gesture.prototype.onTouchEnd = function (e) {
            this.isBegin = false;
        };
        Gesture.prototype.onTouchMove = function (e) {
            this.nowPos.x = e.stageX;
            this.nowPos.y = e.stageY;
        };
        Gesture.prototype.OnDestroy = function () {
            clearInterval(this.intervalID);
            return 0;
        };
        return Gesture;
    }(ZJ.ComponentBase));
    ZJ.Gesture = Gesture;
    __reflect(Gesture.prototype, "ZJ.Gesture");
})(ZJ || (ZJ = {}));
//# sourceMappingURL=Gesture.js.map