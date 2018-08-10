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
var TestView = (function (_super) {
    __extends(TestView, _super);
    function TestView() {
        var _this = _super.call(this) || this;
        _this.skinName = "TestViewSkin";
        return _this;
    }
    TestView.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.initA();
        this.initB();
        this.btnFather.scaleX = 0.5;
        this.btnFather.scaleY = 0.5;
        var bbb = new ZJ.Vector3(1, 2, 3);
        this.blueBtn.x = bbb.x;
        this.blueBtn.y = bbb.y;
        ZJ.UIManager.instance.openView(UIName.xxx).setData({
            a: 111,
            b: 222,
            c: 333
        });
        ZJ.UIManager.instance.destroyView();
        this.addEventListener(egret.Event.ENTER_FRAME, function () {
        }, this);
    };
    TestView.prototype.initA = function () {
    };
    TestView.prototype.initB = function () {
    };
    TestView.prototype.setData = function (data) {
        this.pa = data.a;
        this.pb = data.b;
        var a = setInterval(function () {
        }, 200);
        setTimeout();
        var button;
        button.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
        }, this);
    };
    TestView.prototype.updata = function () {
    };
    TestView.prototype.onDestory = function () {
        clearInterval(a);
        this.removeEventListener(egret.Event.ENTER_FRAME, this.updata, this);
        return _super.prototype.onDestroy.call(this);
    };
    return TestView;
}(ZJ.ViewBase));
__reflect(TestView.prototype, "TestView");
//# sourceMappingURL=TestView.js.map