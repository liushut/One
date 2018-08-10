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
var Payoff = (function (_super) {
    __extends(Payoff, _super);
    function Payoff() {
        var _this = _super.call(this) || this;
        _this.skinName = "PayoffSkin";
        return _this;
    }
    Payoff.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    // 变量
    Payoff.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.machine.visible = false;
    };
    Payoff.prototype.showMachine = function (isShow) {
        this.machine.visible = isShow;
    };
    return Payoff;
}(ZJ.ComponentBase));
__reflect(Payoff.prototype, "Payoff");
//# sourceMappingURL=Payoff.js.map