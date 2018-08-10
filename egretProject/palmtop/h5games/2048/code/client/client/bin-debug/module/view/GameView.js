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
        // 常量 
        _this.INTERVAL = 50; // 帧间隔（毫秒）
        _this.INTERVAL_PING = 30000; // ping间隔（毫秒）
        _this.TOUCH_INTERVAL = 180; // 触摸间隔 (毫秒)      150
        _this.DOUBLE_TAP_INTERVAL = 500; //双击间隔 (毫秒)
        _this.TOUCH_DESC_INTERVAL = 140; //每次加速减少时间间隔 (毫秒)      140
        _this.TOUCH_MIN_INTERVAL = 50; //每次触摸最少间隔时间 (毫秒)
        _this.TOUCH_MIN_DOWNINTERVAL = 70; //向下触摸最少间隔时间 (毫秒)
        _this.TOUCH_MIN_ROTATEINTERVAL = 120; //旋转最少间隔时间 (毫秒)
        // 变量
        _this.isTouchLeft = false;
        _this.isTouchRight = false;
        _this.isTouchDown = false;
        _this.isTouchRotate = false;
        _this.hasTouchMoveLeft = false; //是否有持续向左移动
        _this.hasTouchMoveRight = false; //是否有持续向右移动
        _this.hasTouchMoveDown = false; //是否有持续向下移动
        _this.hasTouchRotate = false; //是否有旋转
        _this.touchLeftTime = 0;
        _this.touchRightTime = 0;
        _this.touchDownTime = 0;
        _this.touchRotateTime = 0;
        _this.lastTouchTapTime = 0;
        _this.addCount = 0;
        _this.timeOnEnterFrame = 0;
        _this.texiaoPosArray = [];
        _this.bgmVolume = 0.5; //BGM开始音量
        _this.bgmAddVolume = 0.1; //BGM加速提升音量
        _this.intervalPing = 0;
        _this.skinName = "GameViewSkin";
        return _this;
    }
    GameView.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    //临时AI等级控制测试按钮
    // AILevel1Btn: eui.Button;
    // AILevel2Btn: eui.Button;
    // AILevel3Btn: eui.Button;
    // log: eui.Label;
    GameView.prototype.childrenCreated = function () {
        var _this = this;
        _super.prototype.childrenCreated.call(this);
        if (ModuleConfig.compile.danji) {
            ZJ.AudioManager.Instance.playBgm(0, this.bgmVolume);
        }
        else {
            //联网模式默认静音
            ZJ.AudioManager.Instance.isMute = true;
        }
        // this.label = new eui.Label();
        // this.label.text = "12312312";
        // this.label.horizontalCenter = 0;
        // this.label.y = 100;
        // this.addChild(this.label);
        // this.label.size = 40;
        this.leftBtn.iconDisplay.horizontalCenter = 30;
        this.rightBtn.iconDisplay.horizontalCenter = -30;
        this.fallBtn.iconDisplay.verticalCenter = -5;
        this.downBtn.iconDisplay.verticalCenter = 0;
        //给头像添加遮罩
        setTimeout(function () {
            ZJ.ShapeUtil.setArcMask(_this.head1, _this.head1.width / 2, 0, 1, true, _this.head1.width / 2, _this.head2.height / 2);
            ZJ.ShapeUtil.setArcMask(_this.head2, _this.head2.width / 2, 0, 1, true, _this.head2.width / 2, _this.head2.height / 2);
        }, 50);
        //临时测试UI
        // this.AILevel1Btn = new eui.Button();
        // this.AILevel2Btn = new eui.Button();
        // this.AILevel3Btn = new eui.Button();
        // this.AILevel1Btn.skinName = "MyButtonSkin";
        // this.AILevel2Btn.skinName = "MyButtonSkin";
        // this.AILevel3Btn.skinName = "MyButtonSkin";
        // this.AILevel1Btn.horizontalCenter = -130;
        // this.AILevel1Btn.y = 100;
        // this.AILevel1Btn.label = "1级";
        // this.AILevel2Btn.horizontalCenter = 0;
        // this.AILevel2Btn.y = 100;
        // this.AILevel2Btn.label = "2级";
        // this.AILevel3Btn.horizontalCenter = 130;
        // this.AILevel3Btn.y = 100;
        // this.AILevel3Btn.label = "3级";
        // this.addChild(this.AILevel1Btn);
        // this.addChild(this.AILevel2Btn);
        // this.addChild(this.AILevel3Btn);
        // this.AILevel1Btn.addEventListener("touchTap", () => {
        //     this.tetris2.setAILevel(1);
        //     this.log.text = "当前AI等级1";
        // }, this);
        // this.AILevel2Btn.addEventListener("touchTap", () => {
        //     this.tetris2.setAILevel(2);
        //     this.log.text = "当前AI等级2";
        // }, this);
        // this.AILevel3Btn.addEventListener("touchTap", () => {
        //     this.tetris2.setAILevel(3);
        //     this.log.text = "当前AI等级3";
        // }, this);
        // this.log = new eui.Label();
        // this.log.horizontalCenter = 0;
        // this.log.y = 170;
        // this.log.size = 40;
        // this.log.text = "当前AI等级3";
        // this.addChild(this.log);
        //临时测试UI完毕
        if (ModuleConfig.compile.danji) {
            ZJ.UIManager.instance.destroyView(UIName.Loading);
            // this.onDanji();
        }
        else {
            this.connect();
        }
        for (var i = 0; i < this.texiaoPosGroup.numChildren; i++) {
            var posG = this.texiaoPosGroup.getChildAt(i);
            this.texiaoPosArray.push(new ZJ.Vector3(posG.horizontalCenter, posG.verticalCenter));
        }
        this.tetris1 = new Tetris();
        this.tetris1.nextTetrisGroup = this.nextGroup;
        this.tetris1.doubleNextTetrisGroup = this.doubleNextGroup;
        this.tetris1Group.addChild(this.tetris1);
        this.tetris1.x = 28;
        this.tetris1.y = 50;
        this.tetris1.addEventListener(EventName.GAME_OVER, function () {
            _this.tetris2.isOver = true;
            //播放音效
            ZJ.AudioManager.Instance.play("death");
            if (ZJ.AudioManager.Instance.bgm == "danger") {
                ZJ.AudioManager.Instance.stopBgm();
            }
            if (ModuleConfig.compile.danji) {
                // (<eui.Label>this.replay.getChildAt(1)).text = "失败";
                _this.replay.getChildAt(0).source = "fail_png";
                _this.replay.getChildAt(1).text = "";
                _this.replay.visible = true;
            }
        }, this);
        this.tetris1.addEventListener(EventName.SPEED_READY, function () {
            _this.readySpeedEvent();
        }, this);
        this.tetris1.addEventListener(EventName.SPEED, function (e) {
            var channel = ZJ.AudioManager.Instance.getChannel("bgm");
            if (channel != null) {
                var volume = channel.volume;
                volume += _this.bgmAddVolume;
                if (volume > 1) {
                    volume = 1;
                }
                channel.volume = volume;
            }
            _this.updateSpeedTip(e.data);
        }, this);
        this.tetris1.addEventListener(EventName.SPECIAL_X, function (e) {
            setTimeout(function () {
                _this.playFlyBlock();
            }, 100);
            if (ModuleConfig.compile.danji || _this.player2.isRobot == 1) {
                setTimeout(function () {
                    _this.tetris2.addObsBlock(e.data.uprow);
                }, 600);
            }
            if (e.data.combo >= 1) {
                _this.createComboEffect(e.data.combo);
            }
        }, this);
        // this.tetris1.setAI(true);
        this.tetris2 = new Tetris();
        if (ModuleConfig.compile.danji) {
            this.tetris2.setAI(true);
        }
        this.tetris2Group.addChild(this.tetris2);
        this.tetris2.x = 1;
        this.tetris2.y = 0;
        this.tetris2.scaleX = 0.38;
        this.tetris2.scaleY = 0.385;
        this.tetris2.addEventListener(EventName.GAME_OVER, function () {
            if (ModuleConfig.compile.danji) {
                _this.tetris1.isOver = true;
                _this.replay.getChildAt(0).source = "win_png";
                _this.replay.getChildAt(1).text = "";
                _this.replay.visible = true;
            }
            else {
                if (_this.player2.isRobot == 1) {
                    ZJ.SocketManager.instance.send(11012, { winPlayerId: _this.playerId });
                }
            }
        }, this);
        this.tetris2.addEventListener(EventName.SPECIAL_X, function (e) {
            if (ModuleConfig.compile.danji || _this.player2.isRobot == 1) {
                setTimeout(function () {
                    _this.tetris1.addObsBlock(e.data.uprow);
                }, 300);
            }
        }, this);
        this.replay.visible = false;
        this.replay.addEventListener("touchTap", function () {
            if (ModuleConfig.compile.danji) {
                _this.replay.visible = false;
                _this.tetris1.seed = ZJ.Util.timeStamp();
                _this.tetris2.seed = _this.tetris1.seed;
                _this.tetris1.rePlay();
                _this.tetris2.rePlay();
                if (ZJ.AudioManager.Instance.bgm != "bgm") {
                    ZJ.AudioManager.Instance.stopBgm();
                    ZJ.AudioManager.Instance.bgm = "bgm";
                    ZJ.AudioManager.Instance.playBgm(0, _this.bgmVolume);
                }
                else {
                    var channel = ZJ.AudioManager.Instance.getChannel("bgm");
                    channel.volume = _this.bgmVolume;
                }
                _this.guideBg.alpha = 1;
                _this.guideBg.visible = true;
                _this.guideMask.alpha = 0.5;
                _this.guideMask.visible = true;
                _this.updateSpeedTip(1);
                _this.countDownToPlay(3);
            }
        }, this);
        //向左移动
        this.leftBtn.addEventListener("touchBegin", function (e) {
            // if (!this.hasTouchMoveLeft) {
            this.tetris1.moveLeft();
            // } else {
            // this.hasTouchMoveLeft = false;
            // }
        }, this);
        this.leftBtn.addEventListener("touchBegin", function (e) {
            this.isTouchLeft = true;
            this.leftBtn.icon = "left_click_png";
        }, this);
        this.leftBtn.addEventListener("touchEnd", function (e) {
            this.isTouchLeft = false;
            this.touchLeftTime = 0;
            this.addCount = 0;
            this.leftBtn.icon = "left_png";
        }, this);
        this.leftBtn.addEventListener("touchReleaseOutside", function (e) {
            this.isTouchLeft = false;
            this.touchLeftTime = 0;
            this.addCount = 0;
            this.leftBtn.icon = "left_png";
        }, this);
        //向右移动
        this.rightBtn.addEventListener("touchBegin", function (e) {
            // if (!this.hasTouchMoveRight) {
            this.tetris1.moveRight();
            // } else {
            // this.hasTouchMoveRight = false;
            // }
        }, this);
        this.rightBtn.addEventListener("touchBegin", function (e) {
            this.isTouchRight = true;
            this.rightBtn.icon = "right_click_png";
        }, this);
        this.rightBtn.addEventListener("touchEnd", function (e) {
            this.isTouchRight = false;
            this.touchRightTime = 0;
            this.addCount = 0;
            this.rightBtn.icon = "right_png";
        }, this);
        this.rightBtn.addEventListener("touchReleaseOutside", function (e) {
            this.isTouchRight = false;
            this.touchRightTime = 0;
            this.addCount = 0;
            this.rightBtn.icon = "right_png";
        }, this);
        //向下移动
        this.downBtn.addEventListener("touchBegin", function (e) {
            // if (!this.hasTouchMoveDown) {
            // let curTime = egret.getTimer();
            // if (curTime - this.lastTouchTapTime < this.DOUBLE_TAP_INTERVAL) {
            //双击直接到地底下
            // this.tetris1.moveFastDown();
            // this.lastTouchTapTime = 0;
            // } else {
            // this.tetris1.moveTetris(Dir.down);
            this.tetris1.moveDown();
            // this.lastTouchTapTime = curTime;
            // }
            // } else {
            // this.hasTouchMoveDown = false;
            // }
        }, this);
        this.downBtn.addEventListener("touchBegin", function (e) {
            this.isTouchDown = true;
            this.downBtn.icon = "down_click_png";
        }, this);
        this.downBtn.addEventListener("touchEnd", function (e) {
            this.tetris1.hasTouchDown = false;
            if (this.isTouchDown) {
                this.tetris1.time = 0;
            }
            this.isTouchDown = false;
            this.touchDownTime = 0;
            this.addCount = 0;
            this.downBtn.icon = "down_png";
        }, this);
        this.downBtn.addEventListener("touchReleaseOutside", function (e) {
            this.tetris1.hasTouchDown = false;
            if (this.isTouchDown) {
                this.tetris1.time = 0;
            }
            this.isTouchDown = false;
            this.touchDownTime = 0;
            this.addCount = 0;
            this.downBtn.icon = "down_png";
        }, this);
        //快速降落
        this.fallBtn.addEventListener("touchBegin", function (e) {
            this.tetris1.moveFastDown();
        }, this);
        this.fallBtn.addEventListener("touchBegin", function (e) {
            this.fallBtn.iconDisplay.source = "fall_click_png";
        }, this);
        this.fallBtn.addEventListener("touchEnd", function (e) {
            this.fallBtn.icon = "fall_png";
        }, this);
        this.fallBtn.addEventListener("touchReleaseOutside", function (e) {
            this.fallBtn.icon = "fall_png";
        }, this);
        //旋转按钮
        this.rotateBtn.addEventListener("touchBegin", function (e) {
            // if (!this.hasTouchRotate) {
            this.tetris1.rotateOnce();
            // } else {
            // this.hasTouchRotate = false;
            // }
        }, this);
        this.rotateBtn.addEventListener("touchBegin", function (e) {
            this.isTouchRotate = true;
            this.rotateBtn.icon = "rotate_click_png";
        }, this);
        this.rotateBtn.addEventListener("touchEnd", function (e) {
            this.isTouchRotate = false;
            this.touchRotateTime = 0;
            this.addCount = 0;
            this.rotateBtn.icon = "rotate_png";
        }, this);
        this.rotateBtn.addEventListener("touchReleaseOutside", function (e) {
            this.isTouchRotate = false;
            this.touchRotateTime = 0;
            this.addCount = 0;
            this.rotateBtn.icon = "rotate_png";
        }, this);
        //向对方发送数据
        if (!ModuleConfig.compile.danji) {
            this.tetris1.addEventListener(EventName.MOVE_LEFT, function (e) {
                ZJ.SocketManager.instance.send(11010, {
                    processData: ZJ.Util.objToByteArray({
                        playerId: _this.playerId,
                        cmd: TetrisCmd.moveleft
                    }).bytes
                });
            }, this);
            this.tetris1.addEventListener(EventName.MOVE_RIGHT, function (e) {
                ZJ.SocketManager.instance.send(11010, {
                    processData: ZJ.Util.objToByteArray({
                        playerId: _this.playerId,
                        cmd: TetrisCmd.moveright
                    }).bytes
                });
            }, this);
            this.tetris1.addEventListener(EventName.MOVE_DOWN, function (e) {
                ZJ.SocketManager.instance.send(11010, {
                    processData: ZJ.Util.objToByteArray({
                        playerId: _this.playerId,
                        cmd: TetrisCmd.movedown
                    }).bytes
                });
            }, this);
            this.tetris1.addEventListener(EventName.MOVE_FAST_DOWN, function (e) {
                ZJ.SocketManager.instance.send(11010, {
                    processData: ZJ.Util.objToByteArray({
                        playerId: _this.playerId,
                        cmd: TetrisCmd.movefastdown
                    }).bytes
                });
            }, this);
            this.tetris1.addEventListener(EventName.ROTATE, function (e) {
                ZJ.SocketManager.instance.send(11010, {
                    processData: ZJ.Util.objToByteArray({
                        playerId: _this.playerId,
                        cmd: TetrisCmd.rotate
                    }).bytes
                });
            }, this);
            this.tetris1.addEventListener(EventName.ADD_OBS_BLOCK, function (e) {
                ZJ.SocketManager.instance.send(11010, {
                    processData: ZJ.Util.objToByteArray({
                        playerId: _this.playerId,
                        cmd: TetrisCmd.addObsBlockMySelf,
                        data: e.data
                    }).bytes
                });
            }, this);
            this.tetris1.addEventListener(EventName.SPECIAL_X, function (e) {
                ZJ.SocketManager.instance.send(11010, {
                    processData: ZJ.Util.objToByteArray({
                        playerId: _this.playerId,
                        cmd: TetrisCmd.addObsBlockToEnemy,
                        data: e.data.uprow
                    }).bytes
                });
            }, this);
            this.tetris1.addEventListener(EventName.GAME_OVER, function (e) {
                // ZJ.SocketManager.instance.send(11010, {
                //     processData: ZJ.Util.objToByteArray({
                //         playerId: this.playerId,
                //         cmd: TetrisCmd.gameover,
                //         data: 1
                //     }).bytes
                // });
                ZJ.SocketManager.instance.send(11012, {
                    winPlayerId: _this.player2.playerId
                });
            }, this);
            this.tetris1.addEventListener(EventName.MOVE_END_EVENT, function (e) {
                // ZJ.SocketManager.instance.send(11010, {
                //     processData: ZJ.Util.objToByteArray({
                //         playerId: this.playerId,
                //         cmd: TetrisCmd.checkData,
                //         data: e.data
                //     }).bytes
                // });
                ZJ.SocketManager.instance.send(11011, {
                    playerScore: e.data.clearRow,
                    resultData: ZJ.Util.objToByteArray({
                        data: e.data.data
                    }).bytes,
                    level: e.data.level,
                    score2: e.data.clearMoreRowCount
                });
            }, this);
        }
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        this.timeOnEnterFrame = egret.getTimer();
        this.lastTouchTapTime = this.DOUBLE_TAP_INTERVAL * -1;
        ZJ.SocketManager.instance.addEventListener(ZJ.CommonEventName.SOCKET_CONNECTED, this.onSocketConnected, this);
        ZJ.SocketManager.instance.addEventListener(ZJ.CommonEventName.SOCKET_DATA, this.onSocketData, this);
        ZJ.SocketManager.instance.addEventListener(ZJ.CommonEventName.CHANNEL_DATA, this.onChannelData, this);
        if (!ModuleConfig.compile.danji) {
            this.tetris1.isPlay = false;
            this.tetris2.isPlay = false;
            if (ModuleConfig.compile.ali) {
                // ALISDK.CatcherSDK.instance().updateProgress(ALISDK.CatcherSDK.ProgressState.COMPLETED, 100);
            }
        }
        else {
            this.tetris1.seed = ZJ.Util.timeStamp();
            this.tetris2.seed = this.tetris1.seed;
            this.tetris1.rePlay();
            this.tetris2.rePlay();
            this.countDownToPlay(3);
        }
        //进入后台声音处理
        this.stage.addEventListener(egret.Event.ACTIVATE, function () {
            if (!_this.tetris1.isOver) {
                var volume = 1;
                if (ZJ.AudioManager.Instance.bgm == "bgm") {
                    volume = _this.bgmVolume;
                }
                ZJ.AudioManager.Instance.playBgm(0, volume);
            }
        }, this);
        this.stage.addEventListener(egret.Event.DEACTIVATE, function () {
            ZJ.AudioManager.Instance.stopAll();
        }, this);
    };
    //帧事件
    GameView.prototype.onEnterFrame = function (e) {
        var now = egret.getTimer();
        var time = this.timeOnEnterFrame;
        var pass = now - time;
        if (this.isTouchLeft) {
            this.touchLeftTime += pass;
            if (this.touchLeftTime >= this.TOUCH_INTERVAL - this.addCount * this.TOUCH_DESC_INTERVAL && this.touchLeftTime >= this.TOUCH_MIN_INTERVAL) {
                this.touchLeftTime = 0;
                this.addCount = 1;
                for (var i = 0; i < this.addCount; i++) {
                    this.tetris1.moveLeft();
                }
                this.hasTouchMoveLeft = true;
            }
        }
        if (this.isTouchRight) {
            this.touchRightTime += pass;
            if (this.touchRightTime >= this.TOUCH_INTERVAL - this.addCount * this.TOUCH_DESC_INTERVAL && this.touchRightTime >= this.TOUCH_MIN_INTERVAL) {
                this.touchRightTime = 0;
                this.addCount = 1;
                for (var i = 0; i < this.addCount; i++) {
                    this.tetris1.moveRight();
                }
                this.hasTouchMoveRight = true;
            }
        }
        if (this.isTouchDown) {
            this.touchDownTime += pass;
            if (this.touchDownTime >= this.TOUCH_INTERVAL - this.addCount * this.TOUCH_DESC_INTERVAL && this.touchDownTime >= this.TOUCH_MIN_DOWNINTERVAL) {
                this.touchDownTime = 0;
                this.addCount = 1;
                for (var i = 0; i < this.addCount; i++) {
                    this.tetris1.moveDown();
                }
                this.hasTouchMoveDown = true;
                this.tetris1.hasTouchDown = true;
            }
        }
        // if (this.isTouchRotate) {
        //     this.touchRotateTime += pass;
        //     if (this.touchRotateTime >= this.TOUCH_INTERVAL - this.addCount * this.TOUCH_DESC_INTERVAL && this.touchRotateTime >= this.TOUCH_MIN_ROTATEINTERVAL) {
        //         this.touchRotateTime = 0;
        //         this.addCount = 1;
        //         for (let i = 0; i < this.addCount; i++) {
        //             this.tetris1.rotateOnce();
        //         }
        //         this.hasTouchRotate = true;
        //     }
        // }
        this.timeOnEnterFrame = egret.getTimer();
    };
    /**生成飞方块特效*/
    GameView.prototype.playFlyBlock = function () {
        var _this = this;
        if (this.flyParticles == null) {
            var texture = RES.getRes("texiao1_png");
            var config = RES.getRes("texiao1_json");
            this.flyParticles = new particle.GravityParticleSystem(texture, config);
            var group = new eui.Group();
            group.horizontalCenter = 0;
            group.verticalCenter = 0;
            this.addChild(group);
            group.addChild(this.flyParticles);
        }
        var flyBlock = new FlyBlock();
        this.texiaoGroup.addChild(flyBlock);
        flyBlock.callBack = function (ball) {
            //移动结束
            ZJ.ResManager.instance.loadMovieClip("baodian", "baodian", function (mc, mcFac) {
                mc.play(1);
                flyBlock.addChild(mc);
                mc.x = ball.x;
                mc.y = ball.y;
                mc.scaleX = 4;
                mc.scaleY = 4;
                mc.rotation = -flyBlock.rotation;
                mc.addEventListener(egret.MovieClipEvent.FRAME_LABEL, function (e) {
                    if (e.frameLabel == "@end") {
                        flyBlock.removeChild(mc);
                        flyBlock.parent.removeChild(flyBlock);
                    }
                }, _this);
            });
        };
        flyBlock.play(this.texiaoPosArray, this.flyParticles);
    };
    /**生成飞方块特效*/
    GameView.prototype.playFlyBlockToSpeedTip = function () {
        var _this = this;
        if (this.flyParticles2 == null) {
            var texture = RES.getRes("texiao1_png");
            var config = RES.getRes("texiao1_json");
            this.flyParticles2 = new particle.GravityParticleSystem(texture, config);
            var group = new eui.Group();
            group.horizontalCenter = 0;
            group.verticalCenter = 0;
            this.addChild(group);
            group.addChild(this.flyParticles2);
        }
        var flyBlock = new FlyBlock();
        this.texiaoGroup.addChild(flyBlock);
        var pArray = [new ZJ.Vector3(this.speedGroup.horizontalCenter, this.speedGroup.verticalCenter),
            new ZJ.Vector3(this.speedTipGroup.horizontalCenter + 80, this.speedTipGroup.verticalCenter)];
        for (var i = 0; i < flyBlock.rotateArray.length; i++) {
            flyBlock.rotateArray[i] = -115;
        }
        flyBlock.callBack = function (ball) {
            //移动结束
            ZJ.ResManager.instance.loadMovieClip("baodian2", "baodian2", function (mc, mcFac) {
                mc.play(1);
                flyBlock.addChild(mc);
                mc.x = ball.x;
                mc.y = ball.y;
                mc.scaleX = 4;
                mc.scaleY = 4;
                mc.rotation = -flyBlock.rotation;
                mc.addEventListener(egret.MovieClipEvent.FRAME_LABEL, function (e) {
                    if (e.frameLabel == "@end") {
                        flyBlock.removeChild(mc);
                        flyBlock.parent.removeChild(flyBlock);
                    }
                }, _this);
            });
        };
        flyBlock.play(pArray, this.flyParticles2, false);
    };
    /**创建一个combo特效*/
    GameView.prototype.createComboEffect = function (comboNum) {
        var combo = new Combo();
        combo.setCombo(comboNum);
        combo.horizontalCenter = 300;
        combo.verticalCenter = 280;
        this.addChild(combo);
        combo.show();
    };
    GameView.prototype.sendPing = function () {
        if (!ModuleConfig.compile.danji) {
            this.intervalPing = setInterval(function () {
                ZJ.SocketManager.instance.send(11004);
            }, this.INTERVAL_PING);
        }
    };
    GameView.prototype.sendLogin = function () {
        // if (!ModuleConfig.compile.danji) {
        //     ZJ.SocketManager.instance.send(11000, {
        //         openId: yyGameConfig.openId,
        //         nickname: yyGameConfig.nickname,
        //         avatarUrl: yyGameConfig.avatarUrl,
        //         timestamp: yyGameConfig.timestamp,
        //         sign: yyGameConfig.sign,
        //     })
        // }
    };
    GameView.prototype.connect = function () {
        // if (!ModuleConfig.compile.danji) {
        //     let url = `ws://${ModuleConfig.ip}:${ModuleConfig.port}`
        //     ZJ.SocketManager.instance.connectByUrl(url)
        // }
    };
    GameView.prototype.onSocketConnected = function () {
        // this.sendPing();
        // this.sendLogin();
        // ZJ.UIManager.instance.destroyView(UIName.YYLoading);
        // ZJ.UIManager.instance.destroyView(UIName.Loading);
    };
    GameView.prototype.onSocketData = function (e) {
        var aji = e.data;
        switch (aji.protoID) {
            case 11000:
                //返回登录结果
                this.onLogin(aji.data);
                break;
            case 11001:
                //返回匹配结果
                this.onMatchRoom(aji.data);
                break;
            case 11002:
                //返回准备游戏结果
                this.onReadyGame(aji.data);
                break;
            case 11003:
                //返回开始倒计时
                this.onCountDown(aji.data);
                ZJ.UIManager.instance.destroyView(UIName.Loading);
                break;
            case 11010:
                //游戏过程数据包
                this.onReceiveGameData(aji.data);
                break;
            case 11011:
                //游戏校验数据包
                this.onReceiveCheckData(aji.data);
                break;
            case 11012:
                //游戏胜利数据包
                this.onReceiveWin(aji.data);
                break;
        }
    };
    GameView.prototype.onChannelData = function (e) {
        var eventName = e.data.eventName;
        var event = e.data.event;
        console.log('onChannelData ' + eventName);
        switch (eventName) {
            case 'CONNECT':
                break;
            case 'PROGRESS':
                break;
            case 'READY':
                this.sendPing();
                this.readyGame();
                break;
            case 'KICK':
                break;
            case 'GAMEOVER':
                break;
            case 'BREAK':
                break;
            case 'CONTINUE':
                break;
            case 'ERROR':
                break;
            case 'MIC_CHANGE':
                this.onMicChange(event);
                break;
            case 'AUDIO_CHANGE':
                this.onAudioChange(event);
                break;
        }
    };
    /** 登陆数据返回*/
    GameView.prototype.onLogin = function (data) {
        console.log("登录结果:" + data.result + ", 玩家id:" + data.playerId);
        this.playerId = data.playerId;
        //登录成功,分配playerId,进入房间
    };
    /** 申请进入匹配房间 */
    GameView.prototype.matchRoom = function (matchId) {
        ZJ.SocketManager.instance.send(11001, {
            matchId: matchId
        });
    };
    /** 进入匹配房间*/
    GameView.prototype.onMatchRoom = function (data) {
        console.log("匹配房间结果:" + data.result + ", 生成房间id:" + data.roomId + ", 匹配id:" + data.matchId);
    };
    /** 准备游戏 */
    GameView.prototype.readyGame = function () {
        ZJ.SocketManager.instance.send(11002, {});
    };
    /** 准备游戏结果 */
    GameView.prototype.onReadyGame = function (data) {
        console.log("准备游戏结果:" + data.result);
        this.playerId = data.playerId;
        // wei
        this.tetris1.seed = data.seeds[0];
        this.tetris2.seed = data.seeds[0];
        this.tetris2.setReceiver(true);
    };
    /** 双方准备成功, 开始倒计时 */
    GameView.prototype.onCountDown = function (data) {
        console.log("开始倒计时:" + data.readyTime);
        this.visible = true;
        // wei
        for (var i = 0; i < data.playerInfos.length; i++) {
            if (data.playerInfos[i].playerId == this.playerId) {
                this.player1 = data.playerInfos[i];
            }
            else {
                this.player2 = data.playerInfos[i];
                if (this.player2.isRobot == 1) {
                    this.tetris2.setAI(true);
                    var level = this.player2.robotLevel;
                    if (level == null || level == NaN) {
                        level = 2;
                    }
                    if (level == 0) {
                        level = ZJ.MathUtil.randomRange(1, 4, this.tetris2.seed);
                    }
                    this.tetris2.setAILevel(level);
                }
            }
        }
        this.tetris1.battleTimes = this.player1.battleTimes;
        this.tetris2.battleTimes = this.player2.battleTimes;
        if (this.player1.battleTimes < 10) {
            this.guideBg.visible = true;
            this.guideMask.visible = true;
        }
        else {
            this.guideBg.visible = false;
            this.guideMask.visible = false;
            this.daojishiGroup.verticalCenter = -143;
        }
        if (this.player1.avatarUrl != "") {
            this.head1.source = this.player1.avatarUrl;
        }
        else {
            if (this.player1.gender == 2) {
                this.head1.source = "girl_png";
            }
        }
        if (this.player2.avatarUrl != "") {
            this.head2.source = this.player2.avatarUrl;
        }
        else {
            if (this.player2.gender == 1) {
                this.head2.source = "boy_png";
            }
        }
        this.updateSex(this.player1, this.player1.gender);
        this.updateSex(this.player2, this.player2.gender);
        this.tetris1.rePlay();
        this.tetris2.rePlay();
        //倒数3秒再开始
        this.countDownToPlay(3);
    };
    /** 接收游戏过程数据 */
    GameView.prototype.onReceiveGameData = function (data) {
        var array = new egret.ByteArray(data.processData);
        var prodata = JSON.parse(array.readUTF());
        var sendTetris;
        var otherTetris;
        if (data.playerId == this.playerId) {
            sendTetris = this.tetris1;
            otherTetris = this.tetris2;
        }
        else {
            sendTetris = this.tetris2;
            otherTetris = this.tetris1;
        }
        var cmd = prodata.cmd;
        //来自玩家2的操作
        if (sendTetris == this.tetris2) {
            if (cmd == TetrisCmd.moveleft) {
                sendTetris.pushCmd(cmd, null);
            }
            else if (cmd == TetrisCmd.moveright) {
                sendTetris.pushCmd(cmd, null);
            }
            else if (cmd == TetrisCmd.movedown) {
                sendTetris.pushCmd(cmd, null);
            }
            else if (cmd == TetrisCmd.movefastdown) {
                sendTetris.pushCmd(cmd, null);
            }
            else if (cmd == TetrisCmd.rotate) {
                sendTetris.pushCmd(cmd, null);
            }
            else if (cmd == TetrisCmd.addObsBlockToEnemy) {
                var row = prodata.data;
                otherTetris.addObsBlock(row);
            }
            else if (cmd == TetrisCmd.addObsBlockMySelf) {
                var row = prodata.data;
                sendTetris.addObsBlock(row);
            }
            else if (cmd == TetrisCmd.checkData) {
                this.onReceiveCheckData(prodata.data);
            }
        }
        // if (cmd == TetrisCmd.gameover) {
        //     this.gameOver(data.playerId, prodata.data);
        // }
    };
    /** 接收游戏结算数据 */
    GameView.prototype.onReceiveCheckData = function (data) {
        var playerId = data.playerId;
        if (playerId == this.player2.playerId) {
            var array = new egret.ByteArray(data.resultData);
            var resultData = JSON.parse(array.readUTF());
            this.tetris2.pushCmd(TetrisCmd.checkData, resultData.data);
        }
        // this.tetris2.pushCmd(TetrisCmd.checkData, data);
    };
    /** 接收游戏胜利数据 */
    GameView.prototype.onReceiveWin = function (data) {
        var result = data.result;
        var winPlayerId = data.winPlayerId;
        if (result == 0) {
            var str = void 0;
            if (winPlayerId == this.playerId) {
                str = "win_png";
            }
            else {
                str = "fail_png";
            }
            this.tetris1.isOver = true;
            this.tetris2.isOver = true;
            this.replay.visible = true;
            this.replay.getChildAt(0).source = str;
            this.replay.getChildAt(1).text = "";
            ZJ.AudioManager.Instance.stopBgm();
        }
        else {
            console.log("结果通知返回失败");
        }
    };
    /** 语音状态改变 */
    GameView.prototype.onMicChange = function (data) {
        var infos = data.statusList;
        for (var i = 0; i < infos.length; i++) {
            var info = infos[i];
            var player = void 0;
            if (info.openId == this.player1.openId) {
                player = this.player1;
            }
            else {
                player = this.player2;
            }
            var state = info.micStatus;
            this.updateVoice(player, state);
        }
    };
    /** 音乐状态转变 */
    GameView.prototype.onAudioChange = function (data) {
        ZJ.AudioManager.Instance.isMute = !data.audioStatus;
    };
    //更新玩家的性别
    GameView.prototype.updateSex = function (player, sex) {
        var sexIg;
        if (player == this.player1) {
            sexIg = this.sex1;
        }
        else {
            sexIg = this.sex2;
        }
        if (sex == 1) {
            sexIg.source = "boy_png";
        }
        else {
            sexIg.source = "girl_png";
        }
    };
    //更新玩家的语音状态
    GameView.prototype.updateVoice = function (player, state) {
        var voice;
        if (player == this.player1) {
            voice = this.voice1;
        }
        else {
            voice = this.voice2;
        }
        if (state == true) {
            voice.source = "voice_open_png";
        }
        else {
            voice.source = "voice_close_png";
        }
    };
    /**倒数n秒开始游戏 */
    GameView.prototype.countDownToPlay = function (second) {
        var _this = this;
        //倒数3秒再开始
        this.tetris1.isPlay = false;
        this.tetris2.isPlay = false;
        // let numCountDown = new NumCountDown();
        // this.addChild(numCountDown);
        // numCountDown.horizontalCenter = 0;
        // numCountDown.verticalCenter = -135;
        // numCountDown.cb = ()=>{
        //     this.tetris1.isPlay = true;
        //     this.tetris2.isPlay = true;
        //     numCountDown.OnDestroy();
        //     this.removeChild(numCountDown);
        //     if(ModuleConfig.compile.danji || this.player2.isRobot == 1){
        //         setTimeout(()=>{
        //             this.tetris2.AIDoSomething();
        //         }, 200);
        //     }
        // };
        // numCountDown.start(second);
        //3s后
        var daojishi = ZJ.ResManager.instance.loadDragonBones("daojishi");
        this.daojishiGroup.addChild(daojishi);
        daojishi.addDBEventListener(dragonBones.EventObject.COMPLETE, function (e) {
            if (_this.guideBg.visible) {
                egret.Tween.get(_this.guideBg).to({ alpha: 0 }, 200).call(function () {
                    _this.guideBg.visible = false;
                });
                egret.Tween.get(_this.guideMask).to({ alpha: 0 }, 200).call(function () {
                    _this.guideMask.visible = false;
                });
            }
            _this.tetris1.isPlay = true;
            _this.tetris2.isPlay = true;
            _this.tetris1.createRandomTetris();
            _this.tetris2.createRandomTetris();
            // if(ModuleConfig.compile.danji || this.player2.isRobot == 1){
            //     this.tetris2.createRandomTetris();
            //     // this.tetris2.AIDoSomething();
            // }
            _this.daojishiGroup.removeChild(daojishi);
        }, this);
        daojishi.animation.play("newAnimation", 1);
    };
    /**准备加速事件 */
    GameView.prototype.readySpeedEvent = function () {
        var _this = this;
        var anim = ZJ.ResManager.instance.loadDragonBones("sudu");
        this.speedGroup.addChild(anim);
        anim.animation.play("newAnimation", -1);
        setTimeout(function () {
            _this.playFlyBlockToSpeedTip();
        }, 2500);
        setTimeout(function () {
            anim.animation.stop();
            _this.speedGroup.removeChild(anim);
        }, 2500);
    };
    /**更新速度提示信息 */
    GameView.prototype.updateSpeedTip = function (speed) {
        var _this = this;
        if (speed < 1)
            speed = 1;
        else if (speed > 5)
            speed = 5;
        if (this.speedTip.source == "speed" + speed + "_png")
            return;
        var tip = new eui.Image;
        tip.source = "speed" + speed + "_png";
        if (this.defSpeedTipTopY == null) {
            this.defSpeedTipTopY = this.speedTip.top;
        }
        this.speedTipGroup.addChild(tip);
        tip.horizontalCenter = this.speedTip.horizontalCenter;
        tip.top = this.defSpeedTipTopY + 70;
        ZJ.ShapeUtil.setRectMask(tip, this.speedTip.x, this.defSpeedTipTopY, tip.width * 1.5, tip.height * 1.5);
        ZJ.ShapeUtil.setRectMask(this.speedTip, this.speedTip.x, this.defSpeedTipTopY - this.speedTip.height * 0.25, this.speedTip.width * 1.5, this.speedTip.height * 1.5);
        egret.Tween.get(tip).to({ top: this.defSpeedTipTopY }, 400);
        egret.Tween.get(this.speedTip).to({ top: this.defSpeedTipTopY - 70 }, 400).call(function () {
            _this.speedTipGroup.removeChild(_this.speedTip.mask);
            _this.speedTipGroup.removeChild(_this.speedTip);
            _this.speedTip = tip;
        });
    };
    GameView.prototype.onDestroy = function () {
        clearInterval(this.intervalPing);
        ZJ.SocketManager.instance.removeEventListener(ZJ.CommonEventName.SOCKET_CONNECTED, this.onSocketConnected, this);
        ZJ.SocketManager.instance.removeEventListener(ZJ.CommonEventName.SOCKET_DATA, this.onSocketData, this);
        ZJ.SocketManager.instance.removeEventListener(ZJ.CommonEventName.CHANNEL_DATA, this.onChannelData, this);
        return 0;
    };
    return GameView;
}(ZJ.ViewBase));
__reflect(GameView.prototype, "GameView");
//# sourceMappingURL=GameView.js.map