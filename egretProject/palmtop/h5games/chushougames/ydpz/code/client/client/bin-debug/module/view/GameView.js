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
var GameView = (function (_super) {
    __extends(GameView, _super);
    function GameView() {
        var _this = _super.call(this) || this;
        _this.qiuS = new QiuS();
        _this.qiuB = new QiuB(); //黄球
        _this.qiuB1 = new QiuB(); //黄球1 
        _this.qsY = 1500; //绿色小球（射击小球）的初始y值
        _this.guanshu = 1; //关数
        _this.isOnce = true;
        _this.resource = ZJ.ResManager.instance.loadDragonBones("hs"); //资源加载
        _this.disMax = 0; //两个圆球之间的距离的最大值
        _this.disMin = 0; //两个圆球之间的距离的最小值
        _this.qbTime1 = 0; //黄球1运动半个来回的时间
        _this.countDown = 1; //绿球下落到底端的时间
        _this.moveDistace = 0;
        _this.health = 1; //生命值
        _this.time = 0;
        _this.table = ZJ.TableManager.instance.tables[xlsx.cfg_c_ydpz]; ////得到这张表
        _this.nextDistance = []; //下一关的数据
        _this.nextTime = 0;
        _this.nextTimeMin = 0;
        _this.nextTimeMax = 0;
        _this.nextDisMax = 0;
        _this.nextDisMin = 0;
        _this.nextCountDown = 0;
        _this.qiusX = 0;
        _this.qiusY = 0;
        _this.smallX = 0;
        _this.smallY = 0;
        _this.tailArray = []; //图片承载group数组。
        _this.tailImgArray = []; //图片数组
        _this.ls = ZJ.ResManager.instance.loadDragonBones("ls");
        //跳跃间隔时间，背景与绿球的共同运动
        _this.runTime = 250;
        _this.isRun = false;
        _this.blank = 0;
        _this.continuePerfect = 0;
        _this.winId = 1;
        _this.friendRank = 2; //好友排名
        _this.rank = 1; //游戏排名
        _this.weekScore = 0; //查询本周最高分
        _this.score = 0; //得分
        _this.isFirst = true; //是不是第一次加载
        //点击屏幕后
        _this.speedQius = 3; //绿球速度
        _this.flag = false;
        _this.DISTANCE = [];
        _this.id = 1;
        _this.count_down = 0;
        _this.heightTothis = 0;
        _this.skinName = "GameViewSkin";
        return _this;
    }
    ; //绿球
    GameView.prototype.loadAudio = function () {
        // 1、audio接口
        // ZJ.AudioManager.Instance.play("sendAudio")
        // 2、MP3（格式工厂44100hz 96kbps） 
        // 3、遇到问题及时说 
        // 4、image
        // let a = new eui.Image()
        // a.source = "xiaoqiu_png"
        // 5、以res为例子，很多可以尝试ZJ.xxxx，例如ZJ.ResManager.instance.loadExistRes 
        // 6、沟通 1q一下他 2说明 
        // ZJ.GoPool.instance.setDesign(GoConfig.Test, ()=>{
        // let a = new eui.Image()
        // a.source = "xiaoqiu_png"
        // return a;
        // })
        // ZJ.GoPool.instance.get(GoConfig.Test)
        // ZJ.GoPool.instance.push(GoConfig.Test, a)
        var img = ZJ.ResManager.instance.loadExistRes("xiaoqiu_png");
        var rect = new egret.Rectangle(2, 82, 130, 43);
        img.scale9Grid = rect;
    };
    GameView.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    GameView.prototype.runOnChange = function () {
        this.X = this.qiuB.x; //黄球x  y  在动画变化函数中实时更新
        this.Y = this.qiuB.y;
        this.X1 = this.qiuB1.x; //黄球1x  y  在动画变化函数中实时更新
        this.Y1 = this.qiuB1.y;
    };
    GameView.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        ZJ.UIManager.instance.destroyView(UIName.Loading);
        this.bgAll.touchEnabled = false;
        this.loadTable(this.guanshu);
        this.loadAudio();
        this.backUI();
        if (ModuleConfig.compile.danji) {
            this.countToDown();
            this.nextG();
            this.showTopAndButtom();
        }
        else {
            this.initCDM();
        }
        console.log("children create");
    };
    GameView.prototype.initCDM = function () {
        this.countToDown();
        this.showTopAndButtom();
        this.callBack();
    };
    GameView.prototype.callBack = function () {
        var _this = this;
        var model = MyCDM.instance;
        model.CsAuthRequestCallBack = function () {
            console.log("CsAuthRequestCallBack");
        };
        model.OnData11003 = function (data) {
            // 游戏开始逻辑
            _this.nextG();
        };
        model.SendProcessData11010({
            processData: this.score,
        });
        model.OnData11010 = function (data) {
            _this.myAny = data.pcocessData;
        };
        model.SendScoredData11011({
            score: this.score,
            resultData: []
        });
        model.OnData11011 = function (data) {
            _this.score = data.score;
            _this.myAny = data.resultData;
        };
        model.OnData11012 = function (data) {
            //得到胜利玩家Id
            _this.winId = data.winPlayerId;
            _this.friendRank = data.friendRank;
            _this.rank = data.rank;
            console.log("胜利玩家" + _this.winId);
            console.log("返回通知" + data.result);
        };
        model.GetHighestScore11008(); //查询玩家最高分
        model.OnData11008 = function (data) {
            _this.weekScore = data.weekScore;
        };
    };
    GameView.prototype.nextG = function () {
        this.addEventListener(egret.Event.ENTER_FRAME, this.runBg, this); //帧事件
        this.addOther();
        this.createQiuS();
        this.createQiuB();
        this.createQiuB1();
    };
    GameView.prototype.showTopAndButtom = function () {
        var w = this.stage.stageWidth;
        var h = this.stage.stageHeight;
        var num = w / 154; //个数 7
        //上部分的锯齿
        for (var i = 0; i <= num / 2 + 1; i++) {
            if (i == 0) {
                var img = new eui.Image("danjuchi_png");
                var rect_1 = new egret.Rectangle(22, 116, 136, 7);
                img.scale9Grid = rect_1;
                img.width = 154;
                img.height = 450;
                img.anchorOffsetX = img.width / 2;
                img.x = this.topFather.width / 2;
                img.y = 123;
                img.scaleY = -1;
                this.topFather.addChild(img);
            }
            else {
                var img = new eui.Image("danjuchi_png");
                var rect_2 = new egret.Rectangle(22, 116, 136, 7);
                img.width = 154;
                img.height = 450;
                img.scaleY = -1;
                img.scale9Grid = rect_2;
                img.anchorOffsetX = img.width / 2;
                img.x = this.topFather.width / 2 + i * img.width;
                img.y = 123;
                this.topFather.addChild(img);
                var img1 = new eui.Image("danjuchi_png");
                var rect1 = new egret.Rectangle(22, 116, 136, 7);
                img1.width = 154;
                img1.height = 450;
                img1.anchorOffsetX = img1.width / 2;
                img1.scaleY = -1;
                img1.scale9Grid = rect1;
                img1.x = this.topFather.width / 2 + i * (-img1.width);
                img1.y = 123;
                this.topFather.addChild(img1);
            }
        }
        //下部分的锯齿
        for (var i = 0; i <= num / 2 + 1; i++) {
            if (i == 0) {
                var img = new eui.Image("danjuchi_png");
                var rect = new egret.Rectangle(22, 116, 136, 7);
                img.scale9Grid = rect;
                img.width = 154;
                img.height = 450;
                img.anchorOffsetX = img.width / 2;
                img.x = this.backFather.width / 2;
                this.backFather.addChild(img);
            }
            else {
                var img = new eui.Image("danjuchi_png");
                var rect_3 = new egret.Rectangle(22, 116, 136, 7);
                img.scale9Grid = rect_3;
                img.width = 154;
                img.height = 450;
                img.anchorOffsetX = img.width / 2;
                img.x = this.backFather.width / 2 + i * img.width;
                this.backFather.addChild(img);
                var img1 = new eui.Image("danjuchi_png");
                var rect1 = new egret.Rectangle(22, 116, 136, 7);
                img1.scale9Grid = rect1;
                img1.width = 154;
                img1.height = 450;
                img1.anchorOffsetX = img1.width / 2;
                img1.x = this.backFather.width / 2 - img1.width * i;
                this.backFather.addChild(img1);
            }
            this.backFather.x = this.bgAll.width / 2;
        }
        if (w / h < 9 / 16) {
            // this.blank = h - 1920;
            // this.topFather.y = this.blank / 2;
            // this.backFather.y = h - this.blank / 2 - 123;
            // this.qsY = this.backFather.y - 300;
        }
        else {
            // this.topFather.y = 0;
            // this.backFather.y = this.bgAll.height - 123;
            // this.qsY = this.backFather.y - 300;
        }
    };
    GameView.prototype.setFlag = function (choose) {
        this.flag = choose;
    };
    GameView.prototype.tailShow = function (jugde) {
        if (jugde == 0) {
            console.log("tailArray 显示 ");
            var _loop_1 = function (i, len) {
                var tail = this_1.tailArray[i];
                egret.Tween.get(tail).wait(16 * i).call(function () {
                    var tw = egret.Tween.get(tail);
                    tw.to({ y: 180 }, 70).
                        to({ y: 400, alpha: 0.7 }, 100);
                    // to({ y: 240 }, 70).
                    // to({ y: 400, alpha: 0.8 }, 120, egret.Ease.sineIn);
                });
                //图片数组 做缩放
                var tailImg = this_1.tailImgArray[i];
                egret.Tween.get(tailImg).wait(16 * i).call(function () {
                    var tw = egret.Tween.get(tailImg);
                    tw.to({ scaleX: 0.7, scaleY: 0.7 }, 70, egret.Ease.sineIn).
                        to({ scaleX: 0, scaleY: 0 }, 100, function (x) {
                        return 1 - Math.pow(1 - x, 2);
                    });
                    // to({scaleX:0.4,scaleY:0.4},50).
                    // to({ scaleX: 0, scaleY: 0 }, 130)
                    // to({ scaleX: 0.4, scaleY: 0.4 }, 70).
                    // to({ scaleX: 0, scaleY: 0 }, 120);
                });
                // 	.call(
                // 	()=>{egret.Tween.get(tail).to({y:this.qiuS.height + 300,scaleX:0.1,scaleY:0.1},50)});
                // }
            };
            var this_1 = this;
            //图片下的group做移动
            for (var i = 0, len = this.tailArray.length; i < len; i++) {
                _loop_1(i, len);
            }
        }
        else {
            //恢复原来的样子
            console.log("tailArray 隐藏 ");
            for (var i = 0; i < this.tailArray.length; i++) {
                var tail = this.tailArray[i];
                tail.x = this.qiuS.width / 2;
                tail.y = this.qiuS.height / 2;
                tail.scaleX = 1;
                tail.scaleY = 1;
                tail.alpha = 1;
                this.tailImgArray[i].scaleX = 1;
                this.tailImgArray[i].scaleY = 1;
            }
        }
    };
    GameView.prototype.setClick = function () {
        var _this = this;
        if (!this.flag) {
            return;
        }
        this.setFlag(false);
        egret.Tween.removeTweens(this.qiuS); //停止下落
        ZJ.AudioManager.Instance.play("sendAudio", 1, 1);
        this.tailShow(0);
        var tw = egret.Tween.get(this.qiuS, { onChange: this.crash, onChangeObj: this }); //crash是实时变化，在里面所做动作记得removeTween。不让执行后续操作
        tw.to({ y: this.topFather.y + 200 }, 350, egret.Ease.quadIn) //quartIn   this.myT
            .call(function () {
            _this.crashAfter(_this.qiuS.x, _this.qiuS.y);
        }, this);
    };
    // private  myT:(t: number) => number = this.acceleRator(3);//返回一个函数，调用myT的时候才调用闭包函数。
    GameView.prototype.acceleRator = function (t) {
        //  return function (t) {
        console.log(t); //0 - 1的一个值
        return t / 9;
        // };
    };
    GameView.prototype.countToDown = function () {
        this.bgAll.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.setClick, this);
        console.log("countDown");
    };
    GameView.prototype.backUI = function () {
        this.score = 0;
        this.health = 1;
        this.scoreBitLabel.text = this.score.toString();
        this.bg1.alpha = 0.5;
        this.bg2.alpha = 0.5;
    };
    GameView.prototype.loadTable = function (passid) {
        if (passid > 20) {
            passid = 20;
        }
        var init = this.table[passid][xlsx.c_ydpz_distance];
        this.DISTANCE = JSON.parse(init);
        var tmpd = ZJ.MathUtil.randomRange(this.DISTANCE[0], this.DISTANCE[1] + 1); //返回min max中 随机数
        this.time = JSON.parse(this.table[passid][xlsx.c_ydpz_time]);
        this.disMax = this.DISTANCE[1]; //距离最大值
        this.disMin = this.DISTANCE[0]; //最小值
        this.timeMin = this.time[0];
        this.timeMax = this.time[1];
        this.countDown = this.table[passid][xlsx.c_ydpz_count_down];
        // egret.log("time: " + this.time)
        // egret.log("dis: " + this.disMin + " " + this.disMax)
        //下一关的配置
        var next = this.table[passid + 1][xlsx.c_ydpz_distance];
        this.nextDistance = JSON.parse(next);
        var temp = ZJ.MathUtil.randomRange(this.nextDistance[0], this.nextDistance[1] + 1);
        this.nextTime = JSON.parse(this.table[passid + 1][xlsx.c_ydpz_time]);
        this.nextDisMax = this.nextDistance[1];
        this.nextDisMin = this.nextDistance[0];
        this.nextTimeMax = this.nextTime[1];
        this.nextTimeMin = this.nextTime[0];
        this.nextCountDown = this.table[passid + 1][xlsx.c_ydpz_count_down];
    };
    GameView.prototype.change = function () {
        this.smallX = this.qiuS.x;
        this.smallY = this.qiuS.y;
    };
    GameView.prototype.shadowArray = function () {
        for (var i = 0; i < 100; i++) {
            var tail = new eui.Image;
            // let img = ZJ.ResManager.instance.loadExistRes("xiaoqiu2_png");
            tail.source = "xiaoqiu2_png";
            tail.scaleX = 0.95;
            tail.scaleY = 0.95;
            tail.width = this.qiuS.width;
            tail.height = this.qiuS.height;
            tail.anchorOffsetX = tail.width / 2;
            tail.anchorOffsetY = tail.height / 2;
            tail.x = this.qiuS.width / 2;
            tail.y = this.qiuS.height / 2;
            var group = new eui.Group();
            group.width = tail.width;
            group.height = tail.height;
            group.anchorOffsetX = tail.width / 2;
            group.anchorOffsetY = tail.height / 2;
            group.x = tail.x;
            group.y = tail.y;
            group.addChild(tail);
            this.qiuS.addChild(group); //确保在球的下面
            this.tailArray.push(group);
            this.tailImgArray.push(tail);
        }
    };
    //创建绿色发射球
    GameView.prototype.createQiuS = function () {
        if (this.isFirst) {
            this.qiuS.anchorOffsetX = this.qiuS.width / 2;
            this.qiuS.anchorOffsetY = this.qiuS.height / 2;
            this.qiuS.x = this.bgAll.width / 2;
            this.qiuS.y = this.qsY - 100;
            this.bgAll.addChild(this.qiuS);
            this.shadowArray(); //拖尾数组出现
            var imgQius = new eui.Image("xiaoqiu_png"); //小球图片
            imgQius.width = this.qiuS.width;
            imgQius.height = this.qiuS.height;
            imgQius.anchorOffsetX = imgQius.width / 2;
            imgQius.anchorOffsetY = imgQius.height / 2;
            imgQius.x = this.qiuS.width / 2;
            imgQius.y = this.qiuS.height / 2;
            this.qiuS.addChild(imgQius);
            var maskImg = new eui.Image("daqiu_png"); //大球图片
            this.qiuS.addChild(maskImg);
            maskImg.width = this.qiuS.width;
            maskImg.height = this.qiuS.height;
            maskImg.x = this.qiuS.width / 2;
            maskImg.y = this.qiuS.height / 2;
            maskImg.anchorOffsetX = maskImg.width / 2;
            maskImg.anchorOffsetY = maskImg.height / 2;
            this.qiuS.addChild(maskImg);
            this.maskImg = maskImg;
            this.maskImg.alpha = 0;
            this.isFirst = false;
        }
        this.setFlag(true); //可以点击
        //这是绿色球碰到锯齿后  
        if (this.guanshu == 1) {
            this.isOnce = true;
            this.qiuS.y = this.qsY;
        }
        else {
            this.isOnce = false;
            egret.Tween.removeTweens(this.qiuS);
            this.maskImg.alpha = 1;
            egret.Tween.get(this.qiuS).to({ y: this.qsY }, this.runTime);
            egret.Tween.get(this.maskImg).to({ alpha: 0 }, this.runTime);
        }
    };
    //创建黄色球
    GameView.prototype.createQiuB1 = function () {
        if (this.guanshu == 1) {
            this.qiuB1.y = -1000;
        }
        this.qiuB1.anchorOffsetX = this.qiuB.width / 2;
        this.qiuB1.anchorOffsetY = this.qiuB.height / 2;
        this.bgAll.addChild(this.qiuB1);
        this.qiuB1.x = this.qiuB1.width;
        if (this.qiuB1.y < 0) {
            var nextMinY = this.qsY - this.qiuS.width / 2 - this.nextDisMin; //黄球1初始yMin
            var nextMaxY = this.qsY - this.qiuS.width / 2 - this.nextDisMax; //黄初始1yMax
            this.qby1 = nextMaxY + (this.nextDisMax - this.nextDisMin) * Math.random(); //最终黄球1初始值
            //要第二关的关卡配置 
            this.heightTothis = this.bgAll.height - this.qsY;
            this.speed = Math.random() + 1; //来回的速度    通过这个修改动画
            this.qbTime1 = (this.nextTimeMin + (this.nextTimeMax - this.nextTimeMin) * Math.random()) / 2; //黄球运动半个来回的时间
            this.qiuB1.x = this.qiuB1.width;
            this.qbRunF(this.qiuB1, this.qbTime1, this.speed); //左右
        }
        if (this.guanshu % 2 == 0) {
            this.qbRun(this.qiuB1, this.qbTime1, this.speed); //左右
        }
    };
    GameView.prototype.createQiuB = function () {
        this.qiuB.anchorOffsetX = this.qiuB.width / 2;
        this.qiuB.anchorOffsetY = this.qiuB.height / 2;
        this.bgAll.addChild(this.qiuB);
        //两个另起一段的相同属性动画会覆盖，要么remove，要么 to  call
        //以下做往返运动
        if (this.guanshu == 1) {
            var minY = this.qsY - this.qiuS.width / 2 - this.disMin; //黄球初始yMin
            var maxY = this.qsY - this.qiuS.width / 2 - this.disMax; //黄初始yMax
            this.qbY = maxY + (this.disMax - this.disMin) * Math.random(); //最终黄球初始值
            this.heightTothis = this.bgAll.height - this.qsY;
            this.speed = Math.random() + 1; //来回的速度    通过这个修改动画
            this.qbTime = (this.timeMin + (this.timeMax - this.timeMin) * Math.random()) / 2; //黄球运动半个来回的时间
            this.qiuB.x = this.bgAll.width - this.qiuB.width;
            this.qiuB.y = this.qbY;
            this.qbRun(this.qiuB, this.qbTime, this.speed); //右左
        }
        else {
            if (this.qiuB.y < 0) {
                var minY = this.qsY - this.qiuS.width / 2 - this.nextDisMin; //黄球初始yMin
                var maxY = this.qsY - this.qiuS.width / 2 - this.nextDisMax; //黄初始yMax
                this.qbY = maxY + (this.nextDisMax - this.nextDisMin) * Math.random(); //最终黄球初始值
                this.heightTothis = this.bgAll.height - this.qsY;
                this.speed = Math.random() + 1; //来回的速度    通过这个修改动画
                this.qbTime = (this.nextTimeMin + (this.nextTimeMax - this.nextTimeMin) * Math.random()) / 2; //黄球运动半个来回的时间
            }
            var i = Math.random();
            egret.Tween.removeTweens(this.qiuB);
            if (i > 0.5) {
                this.qbRunF(this.qiuB, this.qbTime, this.speed); //右左
            }
            else {
                this.qbRun(this.qiuB, this.qbTime, this.speed);
            }
        }
    };
    //设置黄色球运动速度的曲线
    GameView.prototype.setPath = function (t) {
        return egret.Ease.getPowInOut(2); //先固定有减速的。
    };
    //黄色球水平运动（left - right）左 - 右
    GameView.prototype.qbRun = function (qb, time, speed) {
        egret.Tween.get(qb, { onChange: this.runOnChange, onChangeObj: this })
            .to({ x: qb.width / 2 }, time, this.setPath(speed))
            .call(function () {
            egret.Tween.get(qb, { onChange: this.runOnChange, onChangeObj: this }).
                to({ x: this.bgAll.width - qb.width / 2 }, time, this.setPath(speed))
                .call(function () {
                qb.x = this.bgAll.width - qb.width / 2;
                this.qbRun(qb, time, this.speed);
            }, this);
        }, this);
    };
    //黄色球水平运动（right - left）右 - 左
    GameView.prototype.qbRunF = function (qb, time, speed) {
        egret.Tween.get(qb, { onChange: this.runOnChange, onChangeObj: this })
            .to({ x: this.bgAll.width - qb.width / 2 }, time, this.setPath(speed))
            .call(function () {
            egret.Tween.get(qb, { onChange: this.runOnChange, onChangeObj: this }).
                to({ x: this.qiuB.width / 2 }, time, this.setPath(speed))
                .call(function () {
                qb.x = qb.width / 2;
                this.qbRunF(qb, time, this.speed);
            }, this);
        }, this);
    };
    //碰撞到上下边后
    GameView.prototype.crashAfter = function (aX, aY) {
        egret.Tween.removeAllTweens();
        this.tailShow(1);
        ZJ.AudioManager.Instance.play("deathAudio", 1, 1);
        ZJ.AudioManager.Instance.stop("sendAudio");
        this.guanshu = 1;
        this.loadTable(this.guanshu);
        this.health--;
        this.ls.x = aX;
        this.ls.y = aY;
        this.ls.animation.play("", 1);
        this.bgAll.addChild(this.ls);
        //同步分数    最高分没有从服务器得到
        MyCDM.instance.SendScoredData11011({
            score: this.score,
            resultData: []
        });
        if (this.health == 0) {
            this.qiuB.alpha = 0;
            this.qiuS.alpha = 0;
            this.scoreBitLabel.alpha = 0;
            MyCDM.instance.SendGameResult11012({
                winPlayerId: this.winId,
            });
            ZJ.UIManager.instance.openView(UIName.Settle).setData({
                score: this.score,
                weekScore: this.weekScore,
                rank: this.rank,
                friendRank: this.friendRank
            });
        }
        this.nextG();
    };
    //两球碰撞
    GameView.prototype.crash = function () {
        var a = this.qiuB.width / 2 + this.qiuS.width / 2;
        var b = this.qiuB1.width / 2 + this.qiuS.width / 2;
        var distance = Math.sqrt(Math.pow(this.qiuS.y - this.Y, 2) + Math.pow(this.qiuS.x - this.X, 2));
        var distance1 = Math.sqrt(Math.pow(this.qiuS.y - this.Y1, 2) + Math.pow(this.qiuS.x - this.X1, 2));
        if (distance <= a || distance1 <= b) {
            for (var i = 0; i < this.tailArray.length; i++) {
                var tail = this.tailArray[i];
                egret.Tween.removeTweens(tail);
                ;
                egret.Tween.removeTweens(this.tailImgArray[i]);
                ;
            }
            this.tailShow(1);
            var skewing = Math.abs(this.qiuB.x - this.qiuS.x);
            var ske = Math.abs(this.qiuB1.x - this.qiuS.x);
            if (this.isOnce) {
                if (skewing <= this.qiuS.width * 0.025 || ske <= this.qiuS.width * 0.025) {
                    this.score += 5;
                    console.log("加5分");
                    ZJ.AudioManager.Instance.play("comboAudio", 1, 1);
                    ZJ.AudioManager.Instance.stop("sendAudio");
                    this.startGroup.alpha = 1;
                    egret.setTimeout(function () {
                        this.startGroup.alpha = 0;
                    }, this, 800);
                    this.continuePerfect++;
                }
                else {
                    this.continuePerfect = 0;
                }
            }
            else {
                if (skewing <= this.qiuS.width * 0.025 || ske <= this.qiuS.width * 0.025) {
                    this.score += 3;
                    console.log("加3分");
                    this.hitGroup.alpha = 1;
                    egret.setTimeout(function () {
                        this.hitGroup.alpha = 0;
                    }, this, 800);
                    this.continuePerfect++;
                    ZJ.AudioManager.Instance.play("comboAudio", 1, 1);
                    ZJ.AudioManager.Instance.stop("sendAudio");
                    if (this.continuePerfect >= 2) {
                        var combo = this.continuePerfect - 1;
                        var comboScore = combo * 1;
                        this.score += comboScore;
                        //
                        this.comboNum.text = comboScore.toString();
                        this.comboGroups.alpha = 1;
                        this.hitGroup.alpha = 0;
                        this.startGroup.alpha = 0;
                        egret.setTimeout(function () {
                            this.comboGroups.alpha = 0;
                        }, this, 800);
                    }
                }
                else {
                    this.continuePerfect = 0;
                }
            }
            ZJ.AudioManager.Instance.play("collisionAudio", 1, 0.75);
            ZJ.AudioManager.Instance.stop("sendAudio");
            this.score += 1;
            this.guanshu++;
            this.scoreBitLabel.text = this.score.toString();
            this.loadTable(this.guanshu); //加载
            //爆炸后转换球
            this.jugdeBallQB();
            egret.Tween.removeTweens(this.qiuS); //停止动画
            MyCDM.instance.SendProcessData11010({
                processData: this.score,
            });
            this.createQiuS();
        }
    };
    GameView.prototype.jugdeBallQB = function () {
        var _this = this;
        this.resource.animation.play("", 1);
        this.isRun = true;
        egret.setTimeout(function () { _this.isRun = false; }, this, this.runTime);
        if (this.qiuB.y > 0) {
            this.resource.x = this.X;
            this.resource.y = this.Y;
            this.bgAll.addChild(this.resource);
            this.qiuB.y = -1000;
            egret.Tween.removeTweens(this.qiuB); //动画不停止不行
            this.createQiuB(); //重新创建动画
            egret.Tween.get(this.qiuB1).to({ y: this.qby1 }, this.runTime, egret.Ease.quartOut).call(function () {
                _this.qiuB1.y = _this.qby1;
                egret.Tween.get(_this.qiuB1).to({ y: _this.qby1 + _this.heightTothis }, _this.countDown);
                egret.Tween.get(_this.qiuS, { onChange: _this.change, onChangeObj: _this })
                    .to({ y: _this.backFather.y - _this.qiuS.width / 2 }, _this.countDown).call(function () {
                    _this.crashAfter(_this.qiuS.x, _this.backFather.y - _this.qiuS.width / 2); //碰到上下边
                }, _this);
            });
        }
        else if (this.qiuB.y <= 0) {
            this.resource.x = this.X1;
            this.resource.y = this.Y1;
            this.bgAll.addChild(this.resource);
            this.qiuB1.y = -1000;
            egret.Tween.removeTweens(this.qiuB1);
            this.createQiuB1();
            egret.Tween.get(this.qiuB).to({ y: this.qbY }, this.runTime, egret.Ease.quartOut).call(function () {
                _this.qiuB.y = _this.qbY;
                egret.Tween.get(_this.qiuB).to({ y: _this.qbY + _this.heightTothis }, _this.countDown);
                egret.Tween.get(_this.qiuS, { onChange: _this.change, onChangeObj: _this })
                    .to({ y: _this.backFather.y - _this.qiuS.width / 2 }, _this.countDown).call(function () {
                    _this.crashAfter(_this.qiuS.x, _this.backFather.y - _this.qiuS.width / 2); //碰到上下边
                }, _this);
            });
        }
    };
    //背景运动
    GameView.prototype.runBg = function () {
        if (!this.isRun) {
            this.bg1.y += 1;
            this.bg2.y += 1;
        }
        else {
            this.bg1.y += 50;
            this.bg2.y += 50;
        }
        if (this.bg1.y >= this.stage.stageHeight) {
            this.bg1.y = this.bg2.y - 2340;
        }
        else if (this.bg2.y >= this.stage.stageHeight) {
            this.bg2.y = this.bg1.y - 2340;
        }
    };
    //下一关
    GameView.prototype.addOther = function () {
        this.bgAll.addChild(this.scoreBitLabel);
        this.scoreBitLabel.text = this.score.toString();
    };
    //设置配置表   
    GameView.passID = 1;
    return GameView;
}(ZJ.ViewBase));
__reflect(GameView.prototype, "GameView");
//# sourceMappingURL=GameView.js.map