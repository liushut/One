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
var ImgAnim = (function (_super) {
    __extends(ImgAnim, _super);
    function ImgAnim(array) {
        var _this = _super.call(this) || this;
        /**
         * 间隔时间(毫秒)
         */
        _this.interval = 0;
        /**
         * 重复播放
         */
        _this.loop = true;
        /**
         * 当前播放下标位置
         */
        _this.index = 0;
        _this.imgArray = array;
        _this.source = array[0];
        return _this;
    }
    ImgAnim.prototype.play = function () {
        var self = this;
        this.id = setInterval(function () {
            self.index++;
            if (self.index >= self.imgArray.length) {
                if (self.loop) {
                    self.index = 0;
                }
                else {
                    self.stop();
                }
            }
            self.source = self.imgArray[self.index];
        }, this.interval, this);
    };
    ImgAnim.prototype.replay = function () {
        this.index = 0;
        clearInterval(this.id);
        this.play();
    };
    ImgAnim.prototype.pause = function () {
        clearInterval(this.id);
    };
    ImgAnim.prototype.stop = function () {
        this.index = 0;
        clearInterval(this.id);
    };
    return ImgAnim;
}(eui.Image));
__reflect(ImgAnim.prototype, "ImgAnim");
//# sourceMappingURL=ImgAnim.js.map