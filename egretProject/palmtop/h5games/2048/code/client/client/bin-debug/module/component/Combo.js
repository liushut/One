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
var Combo = (function (_super) {
    __extends(Combo, _super);
    function Combo() {
        var _this = _super.call(this) || this;
        _this.skinName = "ComboSkin";
        return _this;
    }
    Combo.prototype.setCombo = function (combo) {
        this.comboLabel.text = "X" + combo.toString();
    };
    Combo.prototype.show = function () {
        var _this = this;
        this.scaleX = 0.5;
        this.scaleY = 0.5;
        var toTopTime = 350;
        var toNormalTime = 150;
        var waitTime = 500;
        var alphaUseTime = 500;
        egret.Tween.get(this).to({ scaleX: 1.1, scaleY: 1.1, verticalCenter: this.verticalCenter - 250 }, toTopTime).call(function () {
            egret.Tween.get(_this).to({ scaleX: 1, scaleY: 1, verticalCenter: _this.verticalCenter + 80 }, toNormalTime).wait(waitTime).call(function () {
                egret.Tween.get(_this).to({ alpha: 0 }, alphaUseTime).call(function () {
                    _this.parent.removeChild(_this);
                });
            }, _this);
        }, this);
    };
    return Combo;
}(eui.Component));
__reflect(Combo.prototype, "Combo", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=Combo.js.map