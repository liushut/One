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
var LevelIcon = (function (_super) {
    __extends(LevelIcon, _super);
    function LevelIcon() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/eui_skins/LevelIconSkin.exml";
        return _this;
    }
    Object.defineProperty(LevelIcon.prototype, "Level", {
        get: function () {
            return parseInt(this.lb_level.text);
        },
        set: function (text) {
            this.lb_level.text = text.toString();
        },
        enumerable: true,
        configurable: true
    });
    LevelIcon.prototype.change = function (num) {
        if (num == 1) {
            this.gs_select_1.alpha = 1;
            this.gs_select_dis.alpha = 0;
        }
        else {
            this.gs_select_1.alpha = 0;
            this.gs_select_dis.alpha = 1;
        }
    };
    return LevelIcon;
}(eui.Button));
__reflect(LevelIcon.prototype, "LevelIcon");
//# sourceMappingURL=LevelIcon.js.map