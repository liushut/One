/**
 * Created by egret on 2016/1/26.
 */
var AboutUI = (function (_super) {
    __extends(AboutUI, _super);
    function AboutUI() {
        _super.call(this);
        this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
        this.skinName = "resource/custom_skins/aboutUISkin.exml";
    }
    var d = __define,c=AboutUI,p=c.prototype;
    p.uiCompHandler = function () {
        var _this = this;
        console.log("\t\tAboutUI uiCompHandler");
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.dispatchEventWith(GameEvents.EVT_CLOSE_ABOUT);
        }, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function (evt) {
            if (evt.stageX > 94 && evt.stageX < 194 && evt.stageY > 314 && evt.stageY < 414) {
                Toast.launch("美术：刘国萍\n程序：王建文\n策划：范承鑫");
            }
        }, this);
    };
    return AboutUI;
})(eui.Component);
egret.registerClass(AboutUI,'AboutUI');
//# sourceMappingURL=AboutUI.js.map