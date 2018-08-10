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
var CommentsView = (function (_super) {
    __extends(CommentsView, _super);
    function CommentsView() {
        var _this = _super.call(this) || this;
        _this.skinName = "CommentsViewSkin";
        return _this;
    }
    CommentsView.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.back_button.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            ZJ.UIManager.instance.destroyView(UIName.Comments);
        }, this);
    };
    return CommentsView;
}(GameViewBase));
__reflect(CommentsView.prototype, "CommentsView");
//# sourceMappingURL=CommentsView.js.map