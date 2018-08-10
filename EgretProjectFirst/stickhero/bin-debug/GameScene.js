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
//# sourceMappingURL=GameScene.js.map