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
        _this.sel_vel = 0; //选关界面关卡的标签
        _this.LevelIcons = [];
        _this.skinName = "resource/eui_skins/SceneLeveslSkin.exml";
        _this.BackBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClick, _this);
        _this.initMap();
        return _this;
    }
    SceneLevels.Shared = function () {
        if (SceneLevels.shared == null) {
            SceneLevels.shared = new SceneLevels();
        }
        return SceneLevels.shared;
    };
    SceneLevels.prototype.onClick = function () {
        this.parent.addChild(SceneBegin.Shared());
        this.parent.removeChild(this);
    };
    SceneLevels.prototype.reviewMap = function () {
        for (var i = 0; i < 400; i++) {
            var milestone = LevelDataManager.Shared().Milestone;
            var icon = this.LevelIcons[i];
            icon.enabled = i < milestone;
            if (icon.enabled) {
                icon.change(1);
                this.img_arrow.x = this.currentIcon.x;
                this.img_arrow.y = this.currentIcon.y;
                this.sel_vel = this.currentIcon.Level;
            }
            else {
                icon.change(2);
            }
        }
    };
    SceneLevels.prototype.initMap = function () {
        var row = 20;
        var col = 10;
        var spanX = 1080 / col; //计算x间隔
        var spanY = 1920 / row; //计算y间隔
        var group = new eui.Group(); //地图背景
        group.width = 1080;
        group.height = (spanY * 400); //算出最大尺寸   
        //填充背景
        for (var i = 0; i < (group.height / 1920); i++) {
            var img = new eui.Image();
            img.source = RES.getRes("GameBG2_jpg");
            img.width = 1080;
            img.height = 1920;
            img.y = i * 1920;
            img.touchEnabled = false;
            this.group_levels.addChildAt(img, 0); //全部在一个层级
        }
        var milestone = LevelDataManager.Shared().Milestone;
        //以正弦曲线绘制关卡图标
        for (var i = 0; i < 400; i++) {
            var icon = new LevelIcon();
            icon.Level = i + 1; //设置关数
            icon.y = spanY * i / 2;
            icon.x = Math.sin(icon.y / 180 * Math.PI) * 200 + group.width / 2;
            icon.y += spanY * i / 2;
            icon.y = group.height - icon.y - spanY;
            group.addChild(icon);
            icon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick_level, this);
            //根据进度设置关卡显示
            icon.enabled = i < milestone;
            if (icon.enabled) {
                icon.change(1);
            }
            else {
                icon.change(2);
            }
            //保存到数组中
            this.LevelIcons.push(icon);
        }
        //开启位图缓存
        //    group.cacheAsBitmap = true;
        this.group_levels.addChild(group);
        //卷动到最底层
        this.group_levels.scrollV = group.height - 1100;
        //初始箭头
        this.img_arrow = new eui.Image();
        this.img_arrow.source = RES.getRes("PageDownBtn_png");
        console.log("dfd");
        this.img_arrow.anchorOffsetX = 124 / 2 - group.getChildAt(0).width / 2;
        this.img_arrow.anchorOffsetY = 76;
        this.img_arrow.touchEnabled = false;
        this.img_arrow.x = group.getChildAt(0).x;
        this.img_arrow.y = group.getChildAt(0).y;
        group.addChild(this.img_arrow);
    };
    SceneLevels.prototype.onClick_level = function (e) {
        var icon = e.currentTarget;
        if (this.sel_vel != icon.Level) {
            console.log(icon.Level);
            this.img_arrow.x = icon.x;
            this.img_arrow.y = icon.y;
            this.sel_vel = icon.Level; //设置关数标签
        }
        else {
            //进入并开始游戏
            this.parent.addChild(SceneGame.Shared());
            SceneGame.Shared().InitLevel(icon.Level);
            this.currentIcon = icon;
            this.parent.removeChild(this);
        }
    };
    //打开指定的关卡，如果大于最远关卡，则保存数据也跟着调整
    SceneLevels.prototype.OpenLevel = function (level) {
        var icon = this.LevelIcons[level - 1];
        icon.enabled = true;
        //同时将选定目标标记于其上
        this.img_arrow.x = icon.x;
        this.img_arrow.y = icon.y;
        this.sel_vel = icon.Level;
        if (level > LevelDataManager.Shared().Milestone) {
            LevelDataManager.Shared().Milestone = level;
        }
    };
    return SceneLevels;
}(eui.Component));
__reflect(SceneLevels.prototype, "SceneLevels");
//# sourceMappingURL=SceneLevels.js.map