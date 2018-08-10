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
var testbtn = (function (_super) {
    __extends(testbtn, _super);
    function testbtn() {
        var _this = _super.call(this) || this;
        _this.skinName = "testbtnSkin";
        return _this;
    }
    return testbtn;
}(ZJ.ComponentBase));
__reflect(testbtn.prototype, "testbtn");
//# sourceMappingURL=testbtn.js.map