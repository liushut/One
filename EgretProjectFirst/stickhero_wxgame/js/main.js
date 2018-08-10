var egret = window.egret;var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this.createView();
        return _this;
    }
    LoadingUI.prototype.createView = function () {
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = 300;
        this.textField.width = 480;
        this.textField.height = 100;
        this.textField.textAlign = "center";
    };
    LoadingUI.prototype.onProgress = function (current, total) {
        this.textField.text = "Loading..." + current + "/" + total;
    };
    return LoadingUI;
}(egret.Sprite));
__reflect(LoadingUI.prototype, "LoadingUI", ["RES.PromiseTaskReporter"]);
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var AssetAdapter = (function () {
    function AssetAdapter() {
    }
    /**
     * @language zh_CN
     * 解析素材
     * @param source 待解析的新素材标识符
     * @param compFunc 解析完成回调函数，示例：callBack(content:any,source:string):void;
     * @param thisObject callBack的 this 引用
     */
    AssetAdapter.prototype.getAsset = function (source, compFunc, thisObject) {
        function onGetRes(data) {
            compFunc.call(thisObject, data, source);
        }
        if (RES.hasRes(source)) {
            var data = RES.getRes(source);
            if (data) {
                onGetRes(data);
            }
            else {
                RES.getResAsync(source, onGetRes, this);
            }
        }
        else {
            RES.getResByUrl(source, onGetRes, this, RES.ResourceItem.TYPE_IMAGE);
        }
    };
    return AssetAdapter;
}());
__reflect(AssetAdapter.prototype, "AssetAdapter", ["eui.IAssetAdapter"]);
var FailedLayer = (function (_super) {
    __extends(FailedLayer, _super);
    function FailedLayer() {
        var _this = _super.call(this) || this;
        _this.stageH = 0;
        _this.stageW = 0;
        _this.init();
        return _this;
    }
    FailedLayer.prototype.init = function () {
        this.stageW = egret.MainContext.instance.stage.stageWidth;
        this.stageH = egret.MainContext.instance.stage.stageHeight;
        this.setUI();
    };
    //设置UI
    FailedLayer.prototype.setUI = function () {
        var stageW = this.stageW;
        var stageH = this.stageH;
        var currentScore = GameManager.getCurScore();
        //绘制背景。
        var shp = new egret.Shape();
        shp.graphics.beginFill(0x000000, 0.7);
        shp.graphics.drawRect(0, 0, stageW, stageH);
        shp.graphics.endFill();
        this.addChild(shp);
        //添加成绩背景
        var scoreBg = new egret.Bitmap();
        scoreBg.texture = RES.getRes("uires_3_png");
        scoreBg.anchorOffsetX = scoreBg.width / 2;
        scoreBg.anchorOffsetY = scoreBg.height / 2;
        scoreBg.x = stageW / 2;
        scoreBg.y = scoreBg.height * 1.3;
        this.addChild(scoreBg);
        //添加结束标题
        var title = new egret.Bitmap();
        title.texture = RES.getRes("uires_9_png");
        title.anchorOffsetX = title.width / 2;
        title.anchorOffsetY = title.height / 2;
        title.x = stageW / 2;
        title.y = title.height * 1.5;
        this.addChild(title);
        //添加当前分数标签
        var curScoreLabel = new egret.TextField();
        this.addChild(curScoreLabel);
        curScoreLabel.x = scoreBg.x;
        curScoreLabel.y = scoreBg.y - scoreBg.height / 8;
        curScoreLabel.size = 110;
        curScoreLabel.textAlign = "center";
        curScoreLabel.text = "" + currentScore;
        curScoreLabel.anchorOffsetX = curScoreLabel.width / 2;
        curScoreLabel.anchorOffsetY = curScoreLabel.height / 2;
        //添加最佳分数标签
        var maxScoreLabel = new egret.TextField();
        this.addChild(maxScoreLabel);
        maxScoreLabel.x = scoreBg.x - scoreBg.width / 8;
        maxScoreLabel.y = scoreBg.y + scoreBg.height * 5 / 16;
        maxScoreLabel.size = 100;
        maxScoreLabel.textColor = 0x000000;
        maxScoreLabel.textAlign = "center";
        //先获取存档的分数
        var maxScoreStr = egret.localStorage.getItem("maxScore");
        var maxScore = Number(maxScoreStr);
        maxScoreLabel.text = "" + maxScore;
        maxScoreLabel.anchorOffsetX = maxScoreLabel.width / 2;
        maxScoreLabel.anchorOffsetY = maxScoreLabel.height / 2;
        //添加排名标签
        var rankLabel = new egret.TextField();
        this.addChild(rankLabel);
        rankLabel.x = scoreBg.x + scoreBg.width / 8;
        rankLabel.y = scoreBg.y + scoreBg.height * 5 / 16;
        rankLabel.size = 50;
        rankLabel.textColor = 0x000000;
        rankLabel.textAlign = "center";
        rankLabel.anchorOffsetX = rankLabel.width / 2;
        rankLabel.anchorOffsetY = rankLabel.height / 2;
        if (maxScore < currentScore) {
            maxScore = currentScore;
            egret.localStorage.setItem("maxScore", maxScore.toString());
            rankLabel.text = "1";
        }
        else if (currentScore < maxScore) {
            rankLabel.text = "比上次成绩差";
        }
        //添加分享微信
        var wechat = new egret.Bitmap;
        wechat.texture = RES.getRes("weixinhaoyou_png");
        this.addChild(wechat);
        wechat.anchorOffsetX = wechat.width / 2;
        wechat.anchorOffsetY = wechat.height / 2;
        wechat.x = stageW / 4;
        wechat.y = stageH / 2;
        wechat.touchEnabled = true;
        wechat.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.shareBtnCallback, this);
        wechat.addEventListener(egret.TouchEvent.TOUCH_END, this.shareBtnCallback, this);
        wechat.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.shareBtnCallback, this);
        var shareBtn2 = new egret.Bitmap();
        shareBtn2.texture = RES.getRes("weixinpyquan_png");
        this.addChild(shareBtn2);
        shareBtn2.anchorOffsetX = shareBtn2.width / 2;
        shareBtn2.anchorOffsetY = shareBtn2.height / 2;
        shareBtn2.x = stageW * 0.75;
        shareBtn2.y = stageH / 2;
        shareBtn2.touchEnabled = true;
        shareBtn2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.shareBtnCallback, this);
        shareBtn2.addEventListener(egret.TouchEvent.TOUCH_END, this.shareBtnCallback, this);
        shareBtn2.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.shareBtnCallback, this);
        //  添加返回主菜单按钮
        var homeBtn = new egret.Bitmap();
        homeBtn.texture = RES.getRes("uires_8_png");
        this.addChild(homeBtn);
        homeBtn.anchorOffsetX = homeBtn.width / 2;
        homeBtn.anchorOffsetY = homeBtn.height / 2;
        homeBtn.x = stageW / 6;
        homeBtn.y = stageH / 2 + homeBtn.height * 1.5;
        homeBtn.touchEnabled = true;
        homeBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.homeBtnCallback, this);
        homeBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.homeBtnCallback, this);
        homeBtn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.homeBtnCallback, this);
        var restartBtn = new egret.Bitmap();
        restartBtn.texture = RES.getRes("uires_5_png");
        this.addChild(restartBtn);
        restartBtn.anchorOffsetX = restartBtn.width / 2;
        restartBtn.anchorOffsetY = restartBtn.height / 2;
        restartBtn.x = stageW * 5 / 6;
        restartBtn.y = homeBtn.y;
        restartBtn.touchEnabled = true;
        restartBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.restartBtnCallback, this);
        restartBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.restartBtnCallback, this);
        restartBtn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.restartBtnCallback, this);
        //  添加更多游戏按钮
        var moreGame = new egret.Bitmap();
        moreGame.texture = RES.getRes("scoreBg_png");
        this.addChild(moreGame);
        moreGame.anchorOffsetX = moreGame.width / 2;
        moreGame.anchorOffsetY = moreGame.height / 2;
        moreGame.scaleX = moreGame.scaleY = 1.5;
        moreGame.x = stageW / 2;
        moreGame.y = homeBtn.y;
        //  添加文本
        var moreGameLabel = new egret.TextField();
        this.addChild(moreGameLabel);
        moreGameLabel.x = moreGame.x;
        moreGameLabel.y = moreGame.y;
        moreGameLabel.size = 80;
        moreGameLabel.textAlign = "center";
        moreGameLabel.bold = true;
        moreGameLabel.text = "更多游戏";
        moreGameLabel.touchEnabled = true;
        moreGameLabel.anchorOffsetX = moreGameLabel.width / 2;
        moreGameLabel.anchorOffsetY = moreGameLabel.height / 2;
        moreGameLabel.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.moreGameCallback, this);
        moreGameLabel.addEventListener(egret.TouchEvent.TOUCH_END, this.moreGameCallback, this);
        moreGameLabel.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.moreGameCallback, this);
        //  添加分享提示
        this.shareTips = new ShareTips();
    };
    FailedLayer.prototype.shareBtnCallback = function (event) {
        if (event.type == egret.TouchEvent.TOUCH_BEGIN) {
            event.currentTarget.scaleX = 1.1;
            event.currentTarget.scaleY = 1.1;
        }
        else if (event.type == egret.TouchEvent.TOUCH_END) {
            event.currentTarget.scaleX = 1;
            event.currentTarget.scaleY = 1;
            this.addChild(this.shareTips);
        }
        else if (event.type == egret.TouchEvent.TOUCH_RELEASE_OUTSIDE) {
            //console.log("touch cancel");
            event.currentTarget.scaleX = 1.0;
            event.currentTarget.scaleY = 1.0;
        }
    };
    FailedLayer.prototype.homeBtnCallback = function (evt) {
        if (evt.type == egret.TouchEvent.TOUCH_BEGIN) {
            //console.log("touch begin");
            evt.currentTarget.scaleX = 1.05;
            evt.currentTarget.scaleY = 1.05;
        }
        else if (evt.type == egret.TouchEvent.TOUCH_END) {
            //console.log("touch ended");
            evt.currentTarget.scaleX = 1.0;
            evt.currentTarget.scaleY = 1.0;
            //  添加开始界面，删除游戏界面
            egret.MainContext.instance.stage.removeChildren();
            var layer = new StartScene();
            egret.MainContext.instance.stage.addChild(layer);
        }
        else if (evt.type == egret.TouchEvent.TOUCH_RELEASE_OUTSIDE) {
            //console.log("touch cancel");
            evt.currentTarget.scaleX = 1.0;
            evt.currentTarget.scaleY = 1.0;
        }
    };
    //重新开始
    FailedLayer.prototype.restartBtnCallback = function (evt) {
        if (evt.type == egret.TouchEvent.TOUCH_BEGIN) {
            evt.currentTarget.scaleX = 1.1;
            evt.currentTarget.scaleY = 1.1;
        }
        else if (evt.type == egret.TouchEvent.TOUCH_END) {
            evt.currentTarget.scaleX = 1;
            evt.currentTarget.scaleY = 1;
            var game = new GameScene;
            egret.MainContext.instance.stage.removeChildren();
            egret.MainContext.instance.stage.addChild(game);
        }
    };
    //更多游戏回调
    FailedLayer.prototype.moreGameCallback = function (evt) {
        if (evt.type == egret.TouchEvent.TOUCH_BEGIN) {
            evt.currentTarget.scaleX = 1.1;
            evt.currentTarget.scaleY = 1.1;
        }
        else if (evt.type == egret.TouchEvent.TOUCH_END) {
            evt.currentTarget.scaleX = 1;
            evt.currentTarget.scaleY = 1;
            //打开新窗口
            window.open("http://www.4399.com");
        }
    };
    return FailedLayer;
}(egret.Sprite));
__reflect(FailedLayer.prototype, "FailedLayer");
//道具类  
var GameHelp = (function (_super) {
    __extends(GameHelp, _super);
    function GameHelp() {
        var _this = _super.call(this) || this;
        _this.usingTool = false; //是否使用道具
        _this.stageH = egret.MainContext.instance.stage.stageHeight;
        _this.stageW = egret.MainContext.instance.stage.stageWidth;
        _this.init();
        return _this;
    }
    GameHelp.prototype.init = function () {
        var stageW = this.stageW;
        var stageH = this.stageH;
        // 分数背景
        var scoreBg = new egret.Bitmap();
        scoreBg.texture = RES.getRes("scoreBg_png");
        this.addChild(scoreBg);
        scoreBg.anchorOffsetX = scoreBg.width / 2;
        scoreBg.x = this.stageW / 2;
        scoreBg.y = scoreBg.height / 2;
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
        console.log("this.scoreLabel创建");
    };
    return GameHelp;
}(egret.Sprite));
__reflect(GameHelp.prototype, "GameHelp");
//游戏管理类
var GameManager = (function () {
    function GameManager() {
    }
    GameManager.setHeroIndex = function (val) {
        this.heroIndex = val;
    };
    GameManager.getHeroIndex = function () {
        return this.heroIndex;
    };
    GameManager.setCurScore = function (val) {
        this.curScore = val;
    };
    GameManager.getCurScore = function () {
        return this.curScore;
    };
    GameManager.heroIndex = 1; //英雄索引
    GameManager.curScore = 0; //当前分数
    return GameManager;
}());
__reflect(GameManager.prototype, "GameManager");
//游戏界面
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super.call(this) || this;
        _this.stageW = 0;
        _this.stageH = 0;
        _this.stageOriginX = 0; //原点x
        _this.isRunning = false;
        _this.curStage = 1; //当前台阶
        _this.isPerfect = false;
        _this.needFallDown = false; //英雄是否掉落
        _this.curScore = 0;
        _this.init();
        return _this;
    }
    GameScene.prototype.init = function () {
        this.stageW = egret.MainContext.instance.stage.stageWidth;
        this.stageH = egret.MainContext.instance.stage.stageHeight;
        this.stageOriginX = this.stageW / 6;
        //添加背景
        this.bgLayer = new BgLayer(true);
        this.addChild(this.bgLayer);
        //添加操作层
        this.gameHelp = new GameHelp();
        this.addChild(this.gameHelp);
        //添加台阶
        this.addStage();
        //创建棍子
        this.addStick();
        //创建英雄
        this.addHero();
        //添加红点
        this.addRedPoint();
        //添加perfect提示
        this.addPerfect();
        //开启监听
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    };
    //添加棍子
    GameScene.prototype.addStick = function () {
        var stick1 = new Stick(1);
        var stick2 = new Stick(1);
        this.addChild(stick1);
        this.addChild(stick2);
        console.log("添加了棍子");
        this.stick1 = stick1;
        this.stick2 = stick2;
        var stickTool = new Stick(2);
        stickTool.visible = false;
        this.addChild(stickTool);
        this.stickTool = stickTool;
    };
    //添加英雄
    GameScene.prototype.addHero = function () {
        var stage1 = this.stage1;
        var stage2 = this.stage2;
        var hero = new Hero(GameManager.getHeroIndex());
        this.addChild(hero);
        hero.x = stage1.StageSprite.width * stage1.scaleX * 0.7;
        hero.y = stage1.y;
        this.hero = hero;
        console.log("创建英雄");
    };
    //添加红点
    GameScene.prototype.addRedPoint = function () {
        var redPoint = new egret.Bitmap();
        redPoint.texture = RES.getRes("lovered_png");
        redPoint.anchorOffsetX = redPoint.width / 2;
        redPoint.scaleX = redPoint.scaleY = 1.5;
        redPoint.x = this.stage2.x;
        redPoint.y = this.stage2.y;
        this.addChild(redPoint);
        this.redPoint = redPoint;
    };
    GameScene.prototype.addPerfect = function () {
        var perfect = new egret.Bitmap();
        perfect.texture = RES.getRes("scoreAdd1_png");
        perfect.anchorOffsetX = perfect.width / 2;
        perfect.anchorOffsetY = perfect.height;
        this.addChild(perfect);
        this.perfect = perfect;
    };
    //添加台阶
    GameScene.prototype.addStage = function () {
        var stage1 = new Stage();
        var stage2 = new Stage();
        this.addChild(stage1);
        this.addChild(stage2);
        stage1.scaleX = 30;
        stage1.x = stage1.StageSprite.width * stage1.scaleX / 2;
        stage1.y = this.stageH - stage1.height;
        stage2.scaleX = 30;
        stage2.x = stage2.StageSprite.width * stage2.scaleX / 2 + this.stageW / 2;
        stage2.y = this.stageH - stage2.height;
        this.stage1 = stage1;
        this.stage2 = stage2;
    };
    GameScene.prototype.onTouchBegin = function (event) {
        var gameHelp = this.gameHelp;
        var curStage = this.curStage;
        var stick1 = this.stick1;
        var stick2 = this.stick2;
        var stickTool = this.stickTool;
        var stage1 = this.stage1;
        var stage2 = this.stage2;
        this.isRunning = true;
        if (curStage == 1) {
            if (stick1.visible == false) {
                stick1.visible = true;
            }
            stick1.scaleY = 1;
            stick1.rotation = 0;
            stick1.x = stage1.x + stage1.StageSprite.width * stage1.scaleX / 2;
            stick1.y = stage1.y + stick1.stickSprite.width * stick1.scaleX / 2;
            if (gameHelp.usingTool) {
                stickTool.scaleX = 1;
                stickTool.x = stick1.x;
                stickTool.y = stick1.y;
                stickTool.visible = true;
                stickTool.timer.start();
            }
            stick1.timer.start();
        }
        else if (curStage == 2) {
            if (stick2.visible == false) {
                stick2.visible = true;
            }
            stick2.scaleY = 1;
            stick2.rotation = 0;
            stick2.x = stage2.x + stage2.StageSprite.width * stage2.scaleX / 2;
            stick2.y = stage2.y + stick2.stickSprite.width * stick2.scaleX / 2;
            if (gameHelp.usingTool) {
                stickTool.scaleX = 1;
                stickTool.x = stick2.x;
                stickTool.y = stick2.y;
                stickTool.visible = true;
                stickTool.timer.start();
            }
            stick2.timer.start();
        }
    };
    GameScene.prototype.onTouchEnd = function (event) {
        var gamehelp = this.gameHelp;
        var stick1 = this.stick1;
        var stick2 = this.stick2;
        var stickTool = this.stickTool;
        var hero = this.hero;
        if (!this.isRunning)
            return;
        this.touchEnabled = false;
        if (stick1.timer.running) {
            stick1.timer.stop();
        }
        if (stick2.timer.running) {
            stick2.timer.stop();
        }
        if (stickTool.timer.running) {
            stickTool.timer.stop();
        }
        //播放踢棍子的动画
        hero.heroMC.movieClipData = hero.mcDataFactory.generateMovieClipData("kick");
        hero.heroMC.play(1);
        hero.heroMC.addEventListener(egret.Event.COMPLETE, this.heroKickDone, this);
    };
    //踢完动画的回调
    GameScene.prototype.heroKickDone = function () {
        this.hero.heroMC.removeEventListener(egret.Event.COMPLETE, this.heroKickDone, this);
        if (this.curStage == 1) {
            var stick1 = egret.Tween.get(this.stick1);
            stick1.to({ rotation: 90 }, 300).call(this.heroMove, this); //heroMove函数中的this是现在传递进去的this
        }
        else if (this.curStage == 2) {
            egret.Tween.get(this.stick2).to({ rotation: 90 }, 300).call(this.heroMove, this);
        }
    };
    GameScene.prototype.heroMove = function () {
        var gameHelp = this.gameHelp;
        var stick1 = this.stick1;
        var stick2 = this.stick2;
        var stage1 = this.stage1;
        var stage2 = this.stage2;
        var stickTool = this.stickTool;
        var hero = this.hero;
        var redPoint = this.redPoint;
        hero.y -= 10;
        //如果使用了道具，更新道具
        if (gameHelp.usingTool) {
            stickTool.visible = false;
        }
        var stickLenth = 0; //棍子长度
        var disNextStageLeft = 0; //下个台阶的左边的距离
        var disNextStageRight = 0; //下个台阶右边距离
        var disRedPointLeft = 0; //红点的左边
        var disRedPointRight = 0; //红点的右边
        var heroX = 0; //英雄移动的x终点
        var heroY = 0; //英雄移动的y终点
        //如果当前台阶为1，则移动到台阶2 计算距离 有可能掉下去
        if (this.curStage == 1) {
            //如果棍子没有达到下一个台阶，则英雄掉落，棍子旋转到180度。
            stickLenth = stick1.scaleY * stick1.stickSprite.height;
            disNextStageLeft = stage2.x - stage1.x - stage1.StageSprite.width * stage1.scaleX / 2 - stage2.StageSprite.width * stage2.scaleX / 2;
            disNextStageRight = disNextStageLeft + stage2.StageSprite.width * stage2.scaleX;
            disRedPointLeft = disNextStageLeft + stage2.StageSprite.width * stage2.scaleX / 2 - redPoint.width * redPoint.scaleX / 2;
            disRedPointRight = disRedPointLeft + redPoint.width * redPoint.scaleX;
            //砸中红点
            if (stickLenth >= disRedPointLeft && stickLenth <= disRedPointRight) {
                this.isPerfect = true;
                this.showPerfect();
                //设置英雄移动终点
                heroX = stage2.x + stage2.StageSprite.width * stage2.scaleX / 2 - hero.heroSprite.width;
                heroY = stage2.y;
            }
            else if (stickLenth >= disNextStageLeft && stickLenth <= disNextStageRight) {
                heroX = stage2.x + stage2.StageSprite.width * stage2.scaleX / 2 - hero.heroSprite.width;
                heroY = stage2.y;
            }
            else {
                heroX = stick1.x + stick1.stickSprite.height * stick1.scaleY;
                heroY = stick1.y;
                this.needFallDown = true;
            }
        }
        else if (this.curStage == 2) {
            // 如果棍子没有达到下一个台阶，则英雄掉落，棍子旋转到180度。
            stickLenth = stick2.stickSprite.height * stick2.scaleY;
            disNextStageLeft = stage1.x - stage2.x - stage2.StageSprite.width * stage2.scaleX / 2
                - stage1.StageSprite.width * stage1.scaleX / 2;
            disNextStageRight = disNextStageLeft + stage1.StageSprite.width * stage1.scaleX;
            disRedPointLeft = disNextStageLeft + stage1.StageSprite.width * stage1.scaleX / 2
                - redPoint.width * redPoint.scaleX / 2;
            disRedPointRight = disRedPointLeft + redPoint.width * redPoint.scaleX;
            if (stickLenth >= disRedPointLeft && stickLenth <= disRedPointRight) {
                this.isPerfect = true;
                this.showPerfect();
                heroX = stage1.x + stage1.StageSprite.width * stage1.scaleX / 2 - hero.heroSprite.width;
                heroY = stage1.y;
            }
            else if (stickLenth >= disNextStageLeft && stickLenth <= disNextStageRight) {
                heroX = stage1.x + stage1.StageSprite.width * stage1.scaleX / 2 - hero.heroSprite.width;
                heroY = stage1.y;
            }
            else {
                heroX = stick2.x + stick2.stickSprite.height * stick2.scaleY;
                heroY = stick2.y;
                this.needFallDown = true;
            }
        }
        //英雄和背景同时移动
        hero.heroMC.movieClipData = this.hero.mcDataFactory.generateMovieClipData("walk");
        hero.heroMC.play(-1);
        egret.Tween.get(hero).to({ x: heroX, y: heroY }, 1000).call(this.heroMovedCallBack, this);
    };
    //显示完美
    GameScene.prototype.showPerfect = function () {
        if (!this.isPerfect)
            return;
        var perfect = this.perfect;
        var redPoint = this.redPoint;
        perfect.alpha = 1;
        perfect.x = redPoint.x;
        perfect.y = redPoint.y;
        var tw = egret.Tween.get(perfect);
        tw.to({ x: perfect.x, y: perfect.y - perfect.height * 10, scaleX: perfect.scaleX * 5, scaleY: perfect.scaleY * 5, alpha: 0 }, 500);
    };
    //英雄移动后的判断逻辑
    GameScene.prototype.heroMovedCallBack = function () {
        var hero = this.hero;
        //背景停止移动
        this.bgLayer.timer.stop();
        //播放英雄站立动画
        hero.heroMC.movieClipData = hero.mcDataFactory.generateMovieClipData("stay");
        hero.heroMC.play(-1);
        //判断是否掉落
        if (this.needFallDown) {
            if (this.curStage == 1) {
                var tw_1 = egret.Tween.get(this.stick1);
                tw_1.to({ rotation: 180 }, 300);
            }
            else if (this.curStage == 2) {
                var tw_2 = egret.Tween.get(this.stick2);
                tw_2.to({ rotation: 180 }, 300);
            }
            var tw = egret.Tween.get(this.hero);
            tw.to({ y: this.stageH + hero.heroSprite.height }, 300).call(this.heroFallDown, this);
            return;
        }
        this.moveStage();
    };
    //台阶移动
    GameScene.prototype.moveStage = function () {
        var stage1 = this.stage1;
        var stage2 = this.stage2;
        var stick1 = this.stick1;
        var stick2 = this.stick2;
        var moveDis = 0;
        var redPoint = this.redPoint;
        var hero = this.hero;
        if (this.curStage == 1) {
            //计算需要移动的距离为 0 到 台阶中点的距离。
            moveDis = stage2.x + stage2.StageSprite.width * stage2.scaleX / 2 - this.stageOriginX;
        }
        else if (this.curStage == 2) {
            moveDis = stage1.x + stage1.StageSprite.width * stage1.scaleX / 2 - this.stageOriginX;
        }
        //stage1移除
        var stage1Tw = egret.Tween.get(stage1);
        stage1Tw.to({ x: stage1.x - moveDis }, 300);
        //stage2移动到x     
        var stage2Tw = egret.Tween.get(stage2);
        stage2Tw.to({ x: stage2.x - moveDis }, 300);
        //红点   线段    讲道理应该都放在stage上面 作为子节点。
        var redPointTw = egret.Tween.get(redPoint);
        redPointTw.to({ x: redPoint.x - moveDis }, 300);
        var stick1Tw = egret.Tween.get(stick1);
        stick1Tw.to({ x: stick1.x - moveDis }, 300);
        var stick2Tw = egret.Tween.get(stick2);
        stick2Tw.to({ x: stick2.x - moveDis }, 300);
        //英雄到达后  还要产生一个新的位置。
        var heroTw = egret.Tween.get(hero);
        heroTw.to({ x: hero.x - moveDis }, 300)
            .call(this.moveStagedCallBack, this); //台阶移动结束，产生新的台阶
    };
    //台阶移动结束，产生新的 更新分数
    GameScene.prototype.moveStagedCallBack = function () {
        //更新分数    红底分数翻倍
        var score = 1;
        if (this.isPerfect) {
            score = 2;
            this.isPerfect = false;
        }
        this.curScore += score;
        GameManager.setCurScore(this.curScore);
        this.gameHelp.scoreLabel.text = "" + this.curScore;
        console.log("得分" + this.curScore);
        var tw = egret.Tween.get(this.gameHelp.scoreLabel)
            .to({ scaleX: 1.5, scaleY: 1.5 }, 200)
            .to({ scaleX: 1, scaleY: 1 }, 200);
        if (this.curStage == 1) {
            this.curStage = 2;
            this.randomSetStage(this.stage1);
        }
        else if (this.curStage == 2) {
            this.curStage = 1;
            this.randomSetStage(this.stage2);
        }
    };
    GameScene.prototype.randomSetStage = function (nextStage) {
        var stageW = this.stageW;
        var stageOriginx = this.stageOriginX;
        var redPoint = this.redPoint;
        var hero = this.hero;
        //更新下一个台阶设置
        var nextScaleX = Math.floor(Math.random() * 31 + 10); //随机设置宽度
        nextStage.scaleX = nextScaleX;
        nextStage.x = stageW + nextStage.StageSprite.width; //新的初始位置
        redPoint.x = nextStage.x;
        //随机一个屏幕内的位置,在当前stage的右边   动画移动进去
        var posRandom = Math.floor(Math.random() * (stageW - nextStage.StageSprite.width * nextStage.StageSprite.scaleX - stageOriginx - hero.heroSprite.width)
            + stageOriginx + nextStage.StageSprite.width * nextStage.scaleX / 2 + hero.heroSprite.width);
        //移动
        var tw = egret.Tween.get(nextStage);
        tw.to({ x: posRandom }, 300).call(this.stepOver, this);
        var tw2 = egret.Tween.get(redPoint);
        tw2.to({ x: posRandom }, 300);
    };
    GameScene.prototype.stepOver = function () {
        this.touchEnabled = true;
        this.isRunning = false;
        //  清除所有缓动动画
        egret.Tween.removeAllTweens();
    };
    GameScene.prototype.heroFallDown = function () {
        this.hero.visible = false;
        //不再掉落
        this.needFallDown = false;
        //屏幕震动
        var tw = egret.Tween.get(this);
        tw.to({ x: this.x + 20, y: this.y + 20 }, 100, egret.Ease.bounceOut);
        tw.to({ x: this.x - 20, y: this.y - 20 }, 100, egret.Ease.bounceIn);
        tw.to({ x: this.x + 20, y: this.y + 20 }, 100, egret.Ease.bounceOut);
        tw.to({ x: this.x - 20, y: this.y - 20 }, 100, egret.Ease.bounceIn);
        tw.to({ x: this.x + 20, y: this.y + 20 }, 100, egret.Ease.bounceOut);
        tw.to({ x: this.x - 20, y: this.y - 20 }, 100, egret.Ease.bounceIn);
        tw.call(this.showContinueTip, this);
    };
    //结束
    GameScene.prototype.showContinueTip = function () {
        console.log("结束逻辑");
        var end = new FailedLayer();
        // egret.MainContext.instance.stage.addChild(end);
        this.parent.addChild(end);
    };
    return GameScene;
}(egret.DisplayObjectContainer));
__reflect(GameScene.prototype, "GameScene");
//自己的英雄类
var Hero = (function (_super) {
    __extends(Hero, _super);
    function Hero(heroType) {
        var _this = _super.call(this) || this;
        _this.heroSprite = new egret.Bitmap(); //英雄图片
        _this.init(heroType);
        return _this;
    }
    Hero.prototype.init = function (heroType) {
        var herosprite = RES.getRes("hero0" + heroType); //图片
        var tempBit = new egret.Bitmap();
        tempBit.texture = herosprite;
        this.heroSprite = tempBit;
        this.animation(heroType);
    };
    Hero.prototype.animation = function (heroType) {
        var movieJson = RES.getRes("hero" + heroType + "_json"); //json
        var moviePng = RES.getRes("hero" + heroType + "_png"); //图集
        var mcFactoty = new egret.MovieClipDataFactory(movieJson, moviePng);
        var mcHero = new egret.MovieClip(mcFactoty.generateMovieClipData("stay"));
        this.addChild(mcHero);
        mcHero.play(-1);
        this.anchorOffsetX = 0;
        this.anchorOffsetY = this.heroSprite.height / 2;
        this.mcDataFactory = mcFactoty;
        this.heroMC = mcHero;
    };
    return Hero;
}(egret.Sprite));
__reflect(Hero.prototype, "Hero");
/**
 * 背景层
 */
var BgLayer = (function (_super) {
    __extends(BgLayer, _super);
    function BgLayer(bgMove) {
        var _this = _super.call(this) || this;
        _this.init(bgMove);
        return _this;
    }
    BgLayer.prototype.init = function (bgMove) {
        //当前屏幕大小
        var bgWidth = egret.MainContext.instance.stage.stageWidth;
        var bgHeight = egret.MainContext.instance.stage.stageHeight;
        //随机背景
        var bgIndex = Math.floor(Math.random() * 5 + 1);
        var curBg = new egret.Bitmap();
        curBg.texture = RES.getRes("bg" + bgIndex + "_jpg");
        this.addChild(curBg);
        this.bg1 = curBg;
        if (bgMove) {
            var bg2 = new egret.Bitmap();
            bg2.texture = RES.getRes("bg" + bgIndex + "_jpg");
            bg2.x = this.bg1.x + this.bg1.width;
            this.addChild(bg2);
            this.bg2 = bg2;
            //创建计时器
            var timer = new egret.Timer(1000 / 60, 0);
            timer.addEventListener(egret.TimerEvent.TIMER, this.bgMove, this);
            this.timer = timer;
            this.timer.start();
        }
        //背景图2要添加月亮
        if (bgIndex == 2) {
            var moon = new egret.Bitmap();
            moon.texture = RES.getRes("moon_png");
            this.addChild(moon);
            moon.y = moon.height / 10;
        }
    };
    BgLayer.prototype.bgMove = function () {
        var speed = 3;
        var bg1 = this.bg1;
        var bg2 = this.bg2;
        this.bg1.x -= speed;
        this.bg2.x -= speed;
        //背景循环   
        //如果完全出屏幕了
        if (bg1.x <= (-bg1.width)) {
            bg1.x = bg2.x + bg1.width;
        }
        else if (bg2.x <= (-bg2.width)) {
            bg2.x = bg1.x + bg2.width;
        }
    };
    return BgLayer;
}(egret.DisplayObjectContainer));
__reflect(BgLayer.prototype, "BgLayer");
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.start, _this);
        return _this;
    }
    Main.prototype.start = function () {
        this.loadingUI = new LoadingUI();
        this.stage.addChild(this.loadingUI);
        //初始化资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.CONFIG_LOAD_ERROR, this.onConfigLoadError, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    Main.prototype.onConfigLoadError = function (event) {
        console.log("配置加载错误");
    };
    //配置加载完成，加载组
    Main.prototype.onConfigComplete = function (event) {
        //移除资源加载库的监听事件
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        //添加各种预加载事件监听
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceLoadProgress, this);
        //开始加载
        RES.loadGroup("preload");
    };
    Main.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingUI);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceLoadProgress, this);
        }
        this.gameStart();
    };
    Main.prototype.gameStart = function () {
        var game = new StartScene();
        egret.MainContext.instance.stage.addChild(game);
    };
    Main.prototype.onResourceLoadError = function (event) {
        console.log("资源组加载错误");
    };
    Main.prototype.onResourceLoadProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingUI.onProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
var DebugPlatform = (function () {
    function DebugPlatform() {
    }
    DebugPlatform.prototype.getUserInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, { nickName: "username" }];
            });
        });
    };
    DebugPlatform.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return DebugPlatform;
}());
__reflect(DebugPlatform.prototype, "DebugPlatform", ["Platform"]);
if (!window.platform) {
    window.platform = new DebugPlatform();
}
/**
 */
var ShareTips = (function (_super) {
    __extends(ShareTips, _super);
    function ShareTips() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    ShareTips.prototype.init = function () {
        this.setUI();
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnded, this);
    };
    ShareTips.prototype.setUI = function () {
        var stageW = egret.MainContext.instance.stage.stageWidth;
        var stageH = egret.MainContext.instance.stage.stageHeight;
        //  绘制背景
        var shp = new egret.Shape();
        shp.graphics.beginFill(0x000000, 0.85);
        shp.graphics.drawRect(0, 0, stageW, stageH);
        shp.graphics.endFill();
        this.addChild(shp);
        //  添加指向右上角的提示箭头
        var tips = new egret.Bitmap();
        tips.texture = RES.getRes("arrow_png");
        this.addChild(tips);
        tips.anchorOffsetX = tips.width;
        tips.scaleX = tips.scaleY = 2;
        tips.x = stageW;
        //  添加文本提示
        var tipsLabel = new egret.TextField();
        this.addChild(tipsLabel);
        tipsLabel.textAlign = "center";
        tipsLabel.text = "请点击右上角按钮\n选择[分享到朋友圈]";
        tipsLabel.size = 80;
        tipsLabel.anchorOffsetX = tipsLabel.width / 2;
        tipsLabel.x = stageW / 2;
        tipsLabel.y = tips.height * tips.scaleX;
    };
    // 触摸结束
    ShareTips.prototype.onTouchEnded = function (evt) {
        console.log("sharetips touch end");
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    return ShareTips;
}(egret.Sprite));
__reflect(ShareTips.prototype, "ShareTips");
//自己写的背景类
var Stage = (function (_super) {
    __extends(Stage, _super);
    function Stage() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    Stage.prototype.init = function () {
        var bg = new egret.Bitmap();
        bg.texture = RES.getRes("stage_png");
        bg.anchorOffsetX = bg.width / 2;
        this.addChild(bg);
        this.StageSprite = bg;
    };
    Object.defineProperty(Stage.prototype, "StageSprite", {
        get: function () {
            return this.stageSprite;
        },
        set: function (bg) {
            this.stageSprite = bg;
        },
        enumerable: true,
        configurable: true
    });
    return Stage;
}(egret.Sprite));
__reflect(Stage.prototype, "Stage");
/**
 * 开始场景
 * createBy @疯狂点馒头
 */
var StartScene = (function (_super) {
    __extends(StartScene, _super);
    function StartScene() {
        var _this = _super.call(this) || this;
        _this.stage1Hero = 0;
        _this.stage2Hero = 1;
        _this.heroVector = new Array(); //英雄数组
        _this.canChoose = true;
        _this.curbg = 1;
        _this.curHero = 1;
        _this.stageWidth = 0;
        _this.stageHeight = 0;
        _this.isFirst = true;
        _this.setUI();
        return _this;
        //  开启fps
        //egret.Profiler.getInstance().run();
        // Profiler这个类已被删除，如果需要使用性能分析功能，请直接在```index.html```中修改```
        // data-show-fps="false"``` 关闭性能分析显示，```data-show-fps="true"``` 打开性能分析显示 ##...
        // this.addEventListener(egret.Event.ADDED_TO_STAGE,this.start,this);
    }
    // private start()
    // {
    //     this.loadingUI = new LoadingUI();
    //     this.stage.addChild(this.loadingUI);
    //     //初始化资源加载库
    //     RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
    //     RES.addEventListener(RES.ResourceEvent.CONFIG_LOAD_ERROR,this.onConfigLoadError,this);
    //      RES.loadConfig("resource/default.res.json","resource/")
    // }
    // private onConfigLoadError(event:RES.ResourceEvent)
    // {
    //     console.log("配置加载错误");
    // }
    // //配置加载完成，加载组
    // private onConfigComplete(event:RES.ResourceEvent)
    // {
    //     //移除资源加载库的监听事件
    //     RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
    //     //添加各种预加载事件监听
    //     RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
    //     RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onResourceLoadError,this);
    //     RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceLoadProgress,this);
    //     //开始加载
    //     RES.loadGroup("preload");
    // }
    // private onResourceLoadComplete(event:RES.ResourceEvent)
    // {
    //     if(event.groupName == "preload")
    //     {
    //         this.stage.removeChild(this.loadingUI);
    //         RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
    //         RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
    //         RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceLoadProgress, this);
    //     }
    //     this.setUI();
    // }
    // private onResourceLoadError(event:RES.ResourceEvent)
    // {
    //     console.log("资源组加载错误");
    // }
    // private onResourceLoadProgress(event:RES.ResourceEvent)
    // {
    //     if(event.groupName == "preload")
    //     {
    //         this.loadingUI.onProgress(event.itemsLoaded,event.itemsTotal);
    //     }
    // }
    //设置界面
    StartScene.prototype.setUI = function () {
        //获取屏幕大小
        this.stageWidth = egret.MainContext.instance.stage.stageWidth;
        this.stageHeight = egret.MainContext.instance.stage.stageHeight;
        var bgLayer = new BgLayer(false);
        this.addChild(bgLayer);
        //添加标题
        var title = new egret.Bitmap();
        title.texture = RES.getRes("uires1_png");
        this.addChild(title);
        title.anchorOffsetX = title.width / 2;
        title.anchorOffsetY = title.height / 2;
        title.x = this.stageWidth / 2;
        title.y = title.height;
        console.log("this.stageWidth", this.stageWidth);
        //开始按钮
        var beginBtn = new egret.Bitmap();
        beginBtn.texture = RES.getRes("uires2_png");
        this.addChild(beginBtn);
        beginBtn.anchorOffsetX = beginBtn.width / 2;
        beginBtn.anchorOffsetX = beginBtn.height / 2;
        beginBtn.x = this.stageWidth / 2;
        beginBtn.y = this.stageHeight / 2;
        //允许触摸
        beginBtn.touchEnabled = true;
        beginBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.beginBtnCallback, this);
        beginBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.beginBtnCallback, this);
        beginBtn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.beginBtnCallback, this);
        this.startBtn = beginBtn;
        //按钮上下移动
        this.moveUpDown(this.startBtn);
        //添加英雄选择台阶
        this.addHeroStage();
        //添加英雄切换按钮
        this.switchHero();
    };
    StartScene.prototype.switchHero = function () {
        var switchBtn = new egret.Bitmap();
        switchBtn.texture = RES.getRes("mainqiehuan");
        this.addChild(switchBtn);
        switchBtn.anchorOffsetX = switchBtn.width / 2;
        switchBtn.anchorOffsetY = switchBtn.height / 2;
        switchBtn.x = this.stageWidth / 4;
        switchBtn.y = 2 * this.stageHeight / 3;
        switchBtn.touchEnabled = true;
        switchBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.swithHeroCallBack, this);
        switchBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.swithHeroCallBack, this);
    };
    //切换事件
    StartScene.prototype.swithHeroCallBack = function (event) {
        if (event.type == egret.TouchEvent.TOUCH_BEGIN) {
            event.currentTarget.scaleX = 1.1;
            event.currentTarget.scaleY = 1.1;
        }
        else if (event.type == egret.TouchEvent.TOUCH_END) {
            event.currentTarget.scaleX = 1;
            event.currentTarget.scaleY = 1;
            this.touchEnd();
        }
    };
    //end后处理
    StartScene.prototype.touchEnd = function () {
        if (!this.canChoose)
            return;
        this.canChoose = false;
        //如果台阶1在屏幕中间，则将台阶1移出屏幕，台阶2进来屏幕中间。
        var stageW = this.stageWidth;
        var stageH = this.stageHeight;
        var stage1 = this.stage1;
        var stage2 = this.stage2;
        if (this.curbg == 1) {
            egret.Tween.get(stage1).to({ x: -stageW / 2 }, 1000).to({ x: stageW * 1.5 }, 0).call(this.chooseCallBack, this);
            egret.Tween.get(stage2).to({ x: stageW / 2 }, 1000);
            this.curbg = 2;
        }
        else if (this.curbg == 2) {
            egret.Tween.get(stage2).to({ x: -stageW / 2 }, 1000).to({ x: stageW * 1.5 }, 0).call(this.chooseCallBack, this);
            egret.Tween.get(stage1).to({ x: stageW / 2 }, 1000);
            this.curbg = 1;
        }
    };
    //切换后回调
    StartScene.prototype.chooseCallBack = function () {
        if (this.curbg == 1) {
            //移除英雄1，添加英雄3
            if (this.stage2Hero == 1) {
                this.heroVector[1].visible = false;
                this.heroVector[3].visible = true;
                this.stage2Hero = 3;
            }
            else if (this.stage2Hero == 3) {
                this.heroVector[3].visible = false;
                this.heroVector[1].visible = true;
                this.stage2Hero = 1;
            }
            //当前展示的英雄索引为下一个台阶上的英雄索引减1
            this.curHero = (this.stage2Hero - 1 + 4) % 4 + 1;
        }
        else if (this.curbg == 2) {
            if (this.stage1Hero == 2) {
                this.heroVector[0].visible = true;
                this.heroVector[2].visible = false;
                this.stage1Hero = 0;
            }
            else if (this.stage1Hero == 0) {
                this.heroVector[0].visible = false;
                this.heroVector[2].visible = true;
                this.stage1Hero = 2;
            }
            this.curHero = (this.stage1Hero - 1 + 4) % 4 + 1;
        }
        //可以继续切换
        this.canChoose = true;
    };
    //英雄选择台阶
    StartScene.prototype.addHeroStage = function () {
        //创建两个台阶
        this.stage1 = new Stage();
        this.stage2 = new Stage();
        var stageW = this.stageWidth;
        var stageH = this.stageHeight;
        var stageOne = this.stage1;
        var stageTwo = this.stage2;
        stageOne.StageSprite.scaleX = 40;
        stageTwo.StageSprite.scaleX = 40;
        stageOne.x = stageW / 2;
        stageTwo.x = stageOne.x + stageW;
        stageOne.y = stageH - stageOne.height;
        stageTwo.y = stageH - stageTwo.height;
        this.addChild(stageOne);
        this.addChild(stageTwo);
        var tempVector = this.heroVector;
        //创建4个英雄
        for (var i = 0; i < 4; i++) {
            var tempHero = new Hero(i + 1);
            tempVector.push(tempHero);
            if (i == 1 || i == 3) {
                stageTwo.addChild(tempVector[i]);
                if (i == 3) {
                    tempVector[i].visible = false;
                }
                this.stage2Hero = 1;
            }
            else {
                stageOne.addChild(tempVector[i]);
                if (i == 2) {
                    tempVector[i].visible = false;
                }
                this.stage1Hero = 0;
            }
        }
        // 添加英雄简介文本  
        var heroIntroduce1 = new egret.TextField();
        stageOne.addChild(heroIntroduce1);
        heroIntroduce1.textAlign = "center";
        heroIntroduce1.text = "一根棍子走天下";
        heroIntroduce1.size = 50;
        heroIntroduce1.y = stageOne.height * 0.65;
        heroIntroduce1.width = stageOne.width * 0.25;
        heroIntroduce1.anchorOffsetX = heroIntroduce1.textWidth / 2;
        heroIntroduce1.anchorOffsetY = heroIntroduce1.textHeight / 2;
        var heroIntroduce2 = new egret.TextField();
        stageTwo.addChild(heroIntroduce2);
        heroIntroduce1.textAlign = "center";
        heroIntroduce2.text = "多根棍子走天下";
        heroIntroduce2.size = 50;
        heroIntroduce2.y = heroIntroduce1.y;
        heroIntroduce2.width = heroIntroduce1.x;
        heroIntroduce2.anchorOffsetX = heroIntroduce2.textWidth / 2;
        heroIntroduce2.anchorOffsetY = heroIntroduce2.textHeight / 2;
    };
    //开始按钮后的回调函数
    StartScene.prototype.beginBtnCallback = function (event) {
        if (!this.canChoose)
            return;
        if (event.type == egret.TouchEvent.TOUCH_BEGIN) {
            event.currentTarget.scaleX = 1.1;
            event.currentTarget.scaleY = 1.1;
            //  this.btnClickSound.play(0,1);
            console.log("开始");
        }
        else if (event.type == egret.TouchEvent.TOUCH_END) {
            event.currentTarget.scaleX = 1;
            event.currentTarget.scaleY = 1;
            //进入游戏界面
            console.log("进入游戏界面");
            GameManager.setHeroIndex(this.curHero);
            this.parent.addChild(new GameScene());
            this.parent.removeChild(this);
        }
        else if (event.type == egret.TouchEvent.TOUCH_RELEASE_OUTSIDE) {
            event.currentTarget.scaleX = 1;
            event.currentTarget.scaleY = 1;
            console.log("取消");
        }
    };
    //按钮上下移动
    StartScene.prototype.moveUpDown = function (btn) {
        var stageH = this.stageWidth;
        var startBtn = this.startBtn;
        var tw = egret.Tween.get(btn);
        tw.to({ y: stageH / 2 + startBtn.height / 10 }, 1500).to({ y: stageH / 2 - startBtn.height / 10 }, 1500).call(this.moveUpDown, this, [btn]);
    };
    return StartScene;
}(egret.DisplayObjectContainer));
__reflect(StartScene.prototype, "StartScene");
//棍子类
var Stick = (function (_super) {
    __extends(Stick, _super);
    function Stick(kind) {
        var _this = _super.call(this) || this;
        _this.stickSprite = new egret.Bitmap();
        _this.init(kind);
        return _this;
    }
    Stick.prototype.init = function (kind) {
        this.stageWidth = egret.MainContext.instance.stage.stageWidth;
        this.stageHeight = egret.MainContext.instance.stage.stageHeight;
        this.growRate = 6;
        // let sprite = this.stickSprite;
        // let  timer = new egret.Timer(1000/60,0);
        //锚点为右下角然后旋转
        if (kind == 1) {
            var sprite = new egret.Bitmap();
            sprite.texture = RES.getRes("stick1_png");
            this.addChild(sprite);
            sprite.scaleX = 2;
            sprite.anchorOffsetX = sprite.width;
            sprite.anchorOffsetY = sprite.height;
            this.stickSprite = sprite;
            var timer = new egret.Timer(1000 / 60, 0);
            timer.addEventListener(egret.TimerEvent.TIMER, this.growHeight, this);
            this.timer = timer;
        }
        else if (kind == 2) {
            var sprite = new egret.Bitmap();
            sprite.texture = RES.getRes("lovered_png");
            this.addChild(sprite);
            sprite.width = 5;
            sprite.height = 5;
            sprite.scaleX = 3;
            this.stickSprite = sprite;
            var timer = new egret.Timer(1000 / 60, 0);
            timer.addEventListener(egret.TimerEvent.TIMER, this.growWidth, this);
            this.timer = timer;
        }
        //   this.timer = timer;
        //   this.addChild(sprite);
    };
    Stick.prototype.growHeight = function () {
        //如果超过屏幕一半  停止
        var dis = this.scaleY * this.stickSprite.height;
        if (dis >= this.stageHeight / 2) {
            console.log("超出屏幕一半");
            return;
        }
        this.scaleY += this.growRate;
        console.log("在屏幕Y之内");
    };
    Stick.prototype.growWidth = function () {
        if (this.stickSprite.width * this.scaleX >= this.stageWidth / 2) {
            console.log("x超出屏幕一半");
            return;
        }
        this.scaleX += this.growRate;
        console.log("在屏幕x之内");
    };
    return Stick;
}(egret.Sprite));
__reflect(Stick.prototype, "Stick");
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var ThemeAdapter = (function () {
    function ThemeAdapter() {
    }
    /**
     * 解析主题
     * @param url 待解析的主题url
     * @param onSuccess 解析完成回调函数，示例：compFunc(e:egret.Event):void;
     * @param onError 解析失败回调函数，示例：errorFunc():void;
     * @param thisObject 回调的this引用
     */
    ThemeAdapter.prototype.getTheme = function (url, onSuccess, onError, thisObject) {
        var _this = this;
        function onResGet(e) {
            onSuccess.call(thisObject, e);
        }
        function onResError(e) {
            if (e.resItem.url == url) {
                RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
                onError.call(thisObject);
            }
        }
        if (typeof generateEUI !== 'undefined') {
            egret.callLater(function () {
                onSuccess.call(thisObject, generateEUI);
            }, this);
        }
        else if (typeof generateEUI2 !== 'undefined') {
            RES.getResByUrl("resource/gameEui.json", function (data, url) {
                window["JSONParseClass"]["setData"](data);
                egret.callLater(function () {
                    onSuccess.call(thisObject, generateEUI2);
                }, _this);
            }, this, RES.ResourceItem.TYPE_JSON);
        }
        else {
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
            RES.getResByUrl(url, onResGet, this, RES.ResourceItem.TYPE_TEXT);
        }
    };
    return ThemeAdapter;
}());
__reflect(ThemeAdapter.prototype, "ThemeAdapter", ["eui.IThemeAdapter"]);
;window.Main = Main;