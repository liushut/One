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
    var Button = (function (_super) {
        __extends(Button, _super);
        function Button() {
            var _this = _super.call(this) || this;
            _this.skinName = "ZJButtonSkin";
            return _this;
        }
        Button.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            console.log(this.img);
            this.img["source"] = "w3_png";
        };
        return Button;
    }(eui.Button));
    ZJ.Button = Button;
    __reflect(Button.prototype, "ZJ.Button");
})(ZJ || (ZJ = {}));
//# sourceMappingURL=Button.js.map