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
var Test = (function (_super) {
    __extends(Test, _super);
    function Test() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/eui_skins/TestSkin.exml";
        _this.init();
        _this.animator();
        console.log(_this.x + "1");
        return _this;
    }
    Test.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.testScorller.viewport.validateNow();
        this.testScorller.viewport.scrollV = 40;
    };
    Test.prototype.init = function () {
        var list = new eui.List();
        list.dataProvider = new eui.ArrayCollection([1, 2, 3, 4, 5]);
        var scroller = new eui.Scroller();
        scroller.height = 160;
        scroller.viewport = list;
        this.addChild(scroller);
        this.testScorller = scroller;
        var btn = new eui.Button();
        btn.x = 200;
        this.addChild(btn);
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.moveScroller, this);
    };
    Test.prototype.moveScroller = function () {
        //点击按钮后改变滚动的位置
        var sc = this.testScorller;
        sc.viewport.scrollV += 10;
        if ((sc.viewport.scrollV + sc.height) >= sc.viewport.contentHeight) {
            console.log("滚动到底部了");
        }
    };
    Test.prototype.animator = function () {
        egret.Tween.get(this, { onChange: this.on, onChangeObj: this }).to({ x: 1000 }, 10000);
    };
    Test.prototype.on = function () {
        console.log(this.x);
    };
    return Test;
}(eui.Component));
__reflect(Test.prototype, "Test");
