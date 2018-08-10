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
var MyButton = (function (_super) {
    __extends(MyButton, _super);
    function MyButton() {
        var _this = _super.call(this) || this;
        _this.addEventListener("touchBegin", function () {
            _this.img.visible = false;
        }, _this);
        _this.addEventListener("touchEnd", function () {
            _this.img.visible = true;
        }, _this);
        _this.addEventListener("touchReleaseOutside", function () {
            _this.img.visible = true;
        }, _this);
        return _this;
    }
    return MyButton;
}(ZJ.ComponentBase));
__reflect(MyButton.prototype, "MyButton");
//# sourceMappingURL=MyButton.js.map