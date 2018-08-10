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
var MessageView = (function (_super) {
    __extends(MessageView, _super);
    function MessageView() {
        var _this = _super.call(this) || this;
        //Scoller中元素对应的数据
        _this.time = 0;
        _this.skinName = "MessageViewSkin";
        return _this;
    }
    MessageView.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        //点击发送功能
        this.send_button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.send, this);
        this.back_button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
        this.showAllContent_button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showAllContent, this);
        this.message_label.touchEnabled = true;
        this.message_label.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            ZJ.UIManager.instance.openView(UIName.Comments);
        }, this);
    };
    //显示全部内容
    MessageView.prototype.showAllContent = function () {
        ZJ.UIManager.instance.openView(UIName.Comments);
    };
    //后退
    MessageView.prototype.back = function () {
        ZJ.UIManager.instance.destroyView(UIName.Message);
    };
    //发送评论功能
    MessageView.prototype.send = function () {
        this.message_label.text = this.textInput.text;
        this.textInput.text = "";
    };
    MessageView.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
        return 0;
    };
    return MessageView;
}(GameViewBase));
__reflect(MessageView.prototype, "MessageView");
//# sourceMappingURL=MessageView.js.map