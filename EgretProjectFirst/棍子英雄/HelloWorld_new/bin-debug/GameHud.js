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
/**
 */
var GameHud = (function (_super) {
    __extends(GameHud, _super);
    function GameHud() {
        var _this = _super.call(this) || this;
        _this.usingTool = false;
        _this.init();
        return _this;
    }
    GameHud.prototype.init = function () {
        this.stageH = egret.MainContext.instance.stage.stageHeight;
        this.stageW = egret.MainContext.instance.stage.stageWidth;
        this.setUI();
    };
    // 设置界面
    GameHud.prototype.setUI = function () {
        var stageW = this.stageW;
        var stageH = this.stageH;
        // 分数背景
        var scoreBg = new egret.Bitmap();
        scoreBg.texture = RES.getRes("scoreBg_png");
        this.addChild(scoreBg);
        scoreBg.anchorOffsetX = scoreBg.width / 2;
        scoreBg.x = this.stageW / 2;
        scoreBg.y = scoreBg.height / 2;
        //// 道具背景
        var toolBg = new egret.Bitmap();
        toolBg.texture = RES.getRes("scoreBg_png");
        this.addChild(toolBg);
        toolBg.anchorOffsetX = 0.5;
        toolBg.x = stageW / 2;
        toolBg.y = scoreBg.height * 2;
        this.toolBg = toolBg;
        // 道具图标
        var toolIcon = new egret.Bitmap();
        toolIcon.texture = RES.getRes("propres1_png");
        this.addChild(toolIcon);
        toolIcon.anchorOffsetX = 0.5;
        toolIcon.x = toolBg.x;
        toolIcon.y = toolBg.y;
        toolIcon.touchEnabled = true;
        toolIcon.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.toolIconCallback, this);
        toolIcon.addEventListener(egret.TouchEvent.TOUCH_END, this.toolIconCallback, this);
        toolIcon.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.toolIconCallback, this);
        //// 道具开关提示
        var toolTips = new egret.Bitmap();
        toolTips.texture = RES.getRes("propres2_png");
        this.addChild(toolTips);
        toolTips.anchorOffsetX = 0.5;
        toolTips.x = toolBg.x;
        toolTips.y = toolBg.y + toolBg.height / 2 + toolTips.height * 2;
        this.toolTips = toolTips;
        // 初始分数标签
        var scoreLabel = new egret.TextField();
        this.addChild(scoreLabel);
        scoreLabel.x = scoreBg.x;
        scoreLabel.y = scoreBg.y + scoreBg.height / 2;
        scoreLabel.size = 100;
        scoreLabel.textAlign = "center";
        scoreLabel.text = "0";
        scoreLabel.anchorOffsetX = scoreLabel.width / 2;
        scoreLabel.anchorOffsetY = scoreLabel.height / 2;
        this.scoreLabel = scoreLabel;
        //// 初始道具个数标签
        var toolNumLabel = new egret.TextField();
        this.addChild(toolNumLabel);
        toolNumLabel.anchorOffsetX = toolNumLabel.anchorOffsetY = 0.5;
        toolNumLabel.x = toolBg.x + toolBg.width * 0.2;
        toolNumLabel.y = toolBg.y + toolBg.height / 2;
        toolNumLabel.size = 60;
        toolNumLabel.textAlign = "center";
        toolNumLabel.text = "x 0";
        this.toolNumLabel = toolNumLabel;
        //// 复活次数标签
        var revivalNumLabel = new egret.TextField();
        this.addChild(revivalNumLabel);
        revivalNumLabel.anchorOffsetX = revivalNumLabel.anchorOffsetY = 0.5;
        revivalNumLabel.x = stageW * 0.8;
        revivalNumLabel.y = toolBg.y - (toolBg.y - scoreBg.y - scoreBg.height) / 2;
        revivalNumLabel.size = 40;
        revivalNumLabel.textAlign = "center";
        revivalNumLabel.text = "复活: x0";
        this.revivalNumLabel = revivalNumLabel;
        //// 获取道具礼包按钮
        var toolGift = new egret.Bitmap();
        toolGift.texture = RES.getRes("gunzi_png");
        this.addChild(toolGift);
        toolGift.anchorOffsetX = toolGift.anchorOffsetY = 0.5;
        toolGift.anchorOffsetX = 0.5;
        toolGift.x = stageW * 0.2;
        toolGift.y = revivalNumLabel.y;
        toolGift.touchEnabled = true;
        toolGift.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.toolGiftCallback, this);
        toolGift.addEventListener(egret.TouchEvent.TOUCH_END, this.toolGiftCallback, this);
        toolGift.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.toolGiftCallback, this);
    };
    GameHud.prototype.toolIconCallback = function (evt) {
        if (evt.type == egret.TouchEvent.TOUCH_BEGIN) {
            //console.log("touch begin");
            evt.currentTarget.scaleX = 1.05;
            evt.currentTarget.scaleY = 1.05;
        }
        else if (evt.type == egret.TouchEvent.TOUCH_END) {
            //console.log("touch ended");
            evt.currentTarget.scaleX = 1.0;
            evt.currentTarget.scaleY = 1.0;
            if (!this.usingTool) {
                this.toolTips.texture = RES.getRes("propres3_png");
            }
            else {
                this.toolTips.texture = RES.getRes("propres2_png");
            }
            this.usingTool = !this.usingTool;
        }
        else if (evt.type == egret.TouchEvent.TOUCH_RELEASE_OUTSIDE) {
            //console.log("touch cancel");
            evt.currentTarget.scaleX = 1.0;
            evt.currentTarget.scaleY = 1.0;
        }
    };
    GameHud.prototype.toolGiftCallback = function (evt) {
        if (evt.type == egret.TouchEvent.TOUCH_BEGIN) {
            //console.log("touch begin");
            evt.currentTarget.scaleX = 1.05;
            evt.currentTarget.scaleY = 1.05;
        }
        else if (evt.type == egret.TouchEvent.TOUCH_END) {
            //console.log("touch ended");
            evt.currentTarget.scaleX = 1.0;
            evt.currentTarget.scaleY = 1.0;
        }
        else if (evt.type == egret.TouchEvent.TOUCH_RELEASE_OUTSIDE) {
            //console.log("touch cancel");
            evt.currentTarget.scaleX = 1.0;
            evt.currentTarget.scaleY = 1.0;
        }
    };
    return GameHud;
}(egret.Sprite));
__reflect(GameHud.prototype, "GameHud");
//# sourceMappingURL=GameHud.js.map