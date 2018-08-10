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
//这个类用来做问题的字使用
var Word = (function (_super) {
    __extends(Word, _super);
    function Word() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onclick_tap, _this);
        return _this;
    }
    Word.prototype.onclick_tap = function () {
        SoundManager.Shared().PlayClick();
        SceneGame.Shared().onclick_word(this);
    };
    Word.prototype.setWordText = function (value) {
        this.lb_text.text = value;
    };
    Word.prototype.getWordText = function () {
        return this.lb_text.text;
    };
    return Word;
}(eui.Component));
__reflect(Word.prototype, "Word");
//# sourceMappingURL=Word.js.map