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
var SceneLevels = (function (_super) {
    __extends(SceneLevels, _super);
    function SceneLevels() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/eui_skins/SceneLevelsSkin.exml";
        _this.Back_Btn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClick, _this);
        return _this;
        // this.initMap();
    }
    SceneLevels.prototype.onClick = function () {
    };
    SceneLevels.prototype.initMap = function () {
        var row = 20;
        var col = 10;
        var spanX = this.stage.stageHeight / col;
        var spanY = this.stage.stageHeight / row;
        var group = new eui.Group(); //地图背景
        group.width = 720;
        group.height = (spanY * 400); //算出最大尺寸
        //初始箭头
        this.img_arrow = new eui.Image();
        this.img_arrow.source = RES.getRes("PageDownBtn_png");
        this.img_arrow.anchorOffsetX = 124 / 2 - group.getChildAt(0).width / 2;
        this.img_arrow.anchorOffsetY = 76;
        this.img_arrow.touchEnabled = false;
        this.img_arrow.x = group.getChildAt(0).x;
        this.img_arrow.y = group.getChildAt(0).y;
        group.addChild(this.img_arrow);
        //填充背景
        for (var i = 0; i < (group.height / 1138); i++) {
            var img = new eui.Image();
            img.source = RES.getRes("GameBG2_jpg");
            img.y = i * 1138;
            img.touchEnabled = false;
            this.group_levels.addChildAt(img, 0); //全部在一个层级
        }
        //以正弦曲线绘制关卡图标
        for (var i = 0; i < 400; i++) {
            var icon = new LevelIcon();
            icon.Level = i + 1;
            icon.y = spanY * i / 2;
            icon.x = Math.sin(icon.y / 180 * Math.PI) * 200 + group.width / 2;
            icon.y += spanY * i / 2;
            icon.y = group.height - icon.y - spanY;
            group.addChild(icon);
            icon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_level, this);
        }
        //开启位图缓存
        group.cacheAsBitmap = true;
        this.group_levels.addChild(group);
        //卷动到最底层
        this.group_levels.scrollV = group.height - 1100;
    };
    SceneLevels.prototype.onClick_level = function (e) {
        var icon = e.currentTarget;
        console.log(icon.Level);
        this.img_arrow.x = icon.x;
        this.img_arrow.y = icon.y;
    };
    return SceneLevels;
}(eui.Component));
__reflect(SceneLevels.prototype, "SceneLevels");
