class GameView extends ZJ.ViewBase {
    public constructor() {
        super();
        this.skinName = "GameViewSkin";
    }

    // 常量 
    private INTERVAL = 50; // 帧间隔（毫秒）
    private INTERVAL_PING = 30000; // ping间隔（毫秒）
    private TOUCH_INTERVAL = 180; // 触摸间隔 (毫秒)      150
    private DOUBLE_TAP_INTERVAL = 500; //双击间隔 (毫秒)
    private TOUCH_DESC_INTERVAL = 140;   //每次加速减少时间间隔 (毫秒)      140
    private TOUCH_MIN_INTERVAL = 50;    //每次触摸最少间隔时间 (毫秒)
    private TOUCH_MIN_DOWNINTERVAL = 70;//向下触摸最少间隔时间 (毫秒)
    private TOUCH_MIN_ROTATEINTERVAL = 120; //旋转最少间隔时间 (毫秒)


    // ui控件
    private leftBtn: eui.Button;
    private rightBtn: eui.Button;
    private downBtn: eui.Button;
    private fallBtn: eui.Button;
    private rotateBtn: eui.Button;
    private tetris1Group: eui.Group;
    private tetris2Group: eui.Group;

    private nextGroup: eui.Group;
    private doubleNextGroup: eui.Group;

    private texiaoGroup: eui.Group;
    private texiaoPosGroup: eui.Group;

    private head1: eui.Image;
    private name1: eui.Label;
    private voice1: eui.Image;
    private sex1: eui.Image;

    private head2: eui.Image;
    private name2: eui.Label;
    private voice2: eui.Image;
    private sex2: eui.Image;

    private guideBg:eui.Image;
    private daojishiGroup:eui.Group;
    private speedGroup:eui.Group;
    private speedTipGroup:eui.Group;
    private speedTip:eui.Image;
    private guideMask:eui.Image;

    private gCenter:eui.Group;

    protected partAdded(partName: string, instance: any): void {
        super.partAdded(partName, instance);
    }

    // 变量
    private isTouchLeft: boolean = false;
    private isTouchRight: boolean = false;
    private isTouchDown: boolean = false;
    private isTouchRotate: boolean = false;
    private hasTouchMoveLeft: boolean = false;   //是否有持续向左移动
    private hasTouchMoveRight: boolean = false;  //是否有持续向右移动
    private hasTouchMoveDown: boolean = false;   //是否有持续向下移动
    private hasTouchRotate: boolean = false;     //是否有旋转
    private touchLeftTime = 0;
    private touchRightTime = 0;
    private touchDownTime = 0;
    private touchRotateTime = 0;
    private lastTouchTapTime = 0;
    private addCount = 0;

    private timeOnEnterFrame: number = 0;
    private tetris1: Tetris;
    private tetris2: Tetris;
    private replay: eui.Group;

    private texiaoPosArray: Array<ZJ.Vector3> = [];
    private bgmVolume = 0.5;    //BGM开始音量
    private bgmAddVolume = 0.1; //BGM加速提升音量

    private playerId: number;
    private player1: any;
    private player2: any;

    private defSpeedTipTopY:number;

    //临时AI等级控制测试按钮
    // AILevel1Btn: eui.Button;
    // AILevel2Btn: eui.Button;
    // AILevel3Btn: eui.Button;
    // log: eui.Label;

    protected childrenCreated(): void {
        super.childrenCreated();

        if (ModuleConfig.compile.danji) {
            ZJ.AudioManager.Instance.playBgm(0, this.bgmVolume);
        }else{
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
        setTimeout(()=>{
            ZJ.ShapeUtil.setArcMask(this.head1, this.head1.width / 2, 0, 1, true, this.head1.width / 2, this.head2.height / 2);
            ZJ.ShapeUtil.setArcMask(this.head2, this.head2.width / 2, 0, 1, true, this.head2.width / 2, this.head2.height / 2);
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

        for (let i = 0; i < this.texiaoPosGroup.numChildren; i++) {
            let posG = this.texiaoPosGroup.getChildAt(i) as eui.Group;
            this.texiaoPosArray.push(new ZJ.Vector3(posG.horizontalCenter, posG.verticalCenter));
        }

        this.tetris1 = new Tetris();
        this.tetris1.nextTetrisGroup = this.nextGroup;
        this.tetris1.doubleNextTetrisGroup = this.doubleNextGroup;
        this.tetris1Group.addChild(this.tetris1);
        this.tetris1.x = 28;
        this.tetris1.y = 50;

        this.tetris1.addEventListener(EventName.GAME_OVER, () => {

            this.tetris2.isOver = true;
            //播放音效
            ZJ.AudioManager.Instance.play("death");
            if (ZJ.AudioManager.Instance.bgm == "danger") {
                ZJ.AudioManager.Instance.stopBgm();
            }
            if (ModuleConfig.compile.danji) {
                // (<eui.Label>this.replay.getChildAt(1)).text = "失败";
                (<eui.Image>this.replay.getChildAt(0)).source = "fail_png";
                (<eui.Label>this.replay.getChildAt(1)).text = "";
                this.replay.visible = true;
            }
        }, this);
        this.tetris1.addEventListener(EventName.SPEED_READY, () => {
            this.readySpeedEvent();
        }, this);
        this.tetris1.addEventListener(EventName.SPEED, (e:egret.Event) => {
            let channel = ZJ.AudioManager.Instance.getChannel("bgm");
            if (channel != null) {
                let volume = channel.volume;
                volume += this.bgmAddVolume;
                if (volume > 1) {
                    volume = 1;
                }
                channel.volume = volume;
            }
            this.updateSpeedTip(e.data);
        }, this);
        this.tetris1.addEventListener(EventName.SPECIAL_X, (e: egret.Event) => {
            setTimeout(() => {
                this.playFlyBlock();
            }, 100);
            if (ModuleConfig.compile.danji || this.player2.isRobot == 1) {
                setTimeout(() => {
                    this.tetris2.addObsBlock(e.data.uprow);
                }, 600);
            }
            if (e.data.combo >= 1) {
                this.createComboEffect(e.data.combo);
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
        this.tetris2.addEventListener(EventName.GAME_OVER, () => {
            if (ModuleConfig.compile.danji) {
                this.tetris1.isOver = true;
                (<eui.Image>this.replay.getChildAt(0)).source = "win_png";
                (<eui.Label>this.replay.getChildAt(1)).text = "";
                this.replay.visible = true;
            } else {
                if (this.player2.isRobot == 1) {
                    ZJ.SocketManager.instance.send(11012, { winPlayerId: this.playerId })
                }
            }
        }, this);
        this.tetris2.addEventListener(EventName.SPECIAL_X, (e: egret.Event) => {
            if (ModuleConfig.compile.danji || this.player2.isRobot == 1) {
                setTimeout(() => {
                    this.tetris1.addObsBlock(e.data.uprow);
                }, 300);
            }
        }, this);




        this.replay.visible = false;
        this.replay.addEventListener("touchTap", () => {
            if(ModuleConfig.compile.danji){
                this.replay.visible = false;
                this.tetris1.seed = ZJ.Util.timeStamp();
                this.tetris2.seed = this.tetris1.seed;

                this.tetris1.rePlay();
                this.tetris2.rePlay();
                if (ZJ.AudioManager.Instance.bgm != "bgm") {
                    ZJ.AudioManager.Instance.stopBgm();
                    ZJ.AudioManager.Instance.bgm = "bgm";
                    ZJ.AudioManager.Instance.playBgm(0, this.bgmVolume);
                } else {
                    let channel = ZJ.AudioManager.Instance.getChannel("bgm");
                    channel.volume = this.bgmVolume;
                }

                this.guideBg.alpha = 1;
                this.guideBg.visible = true;
                this.guideMask.alpha = 0.5;
                this.guideMask.visible = true;
                this.updateSpeedTip(1);
                this.countDownToPlay(3);
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
            this.tetris1.addEventListener(EventName.MOVE_LEFT, (e: egret.Event) => {
                ZJ.SocketManager.instance.send(11010, {
                    processData: ZJ.Util.objToByteArray({
                        playerId: this.playerId,
                        cmd: TetrisCmd.moveleft
                    }).bytes
                });
            }, this);
            this.tetris1.addEventListener(EventName.MOVE_RIGHT, (e: egret.Event) => {
                ZJ.SocketManager.instance.send(11010, {
                    processData: ZJ.Util.objToByteArray({
                        playerId: this.playerId,
                        cmd: TetrisCmd.moveright
                    }).bytes
                });
            }, this);
            this.tetris1.addEventListener(EventName.MOVE_DOWN, (e: egret.Event) => {
                ZJ.SocketManager.instance.send(11010, {
                    processData: ZJ.Util.objToByteArray({
                        playerId: this.playerId,
                        cmd: TetrisCmd.movedown
                    }).bytes
                });
            }, this);
            this.tetris1.addEventListener(EventName.MOVE_FAST_DOWN, (e: egret.Event) => {
                ZJ.SocketManager.instance.send(11010, {
                    processData: ZJ.Util.objToByteArray({
                        playerId: this.playerId,
                        cmd: TetrisCmd.movefastdown
                    }).bytes
                });
            }, this);
            this.tetris1.addEventListener(EventName.ROTATE, (e: egret.Event) => {
                ZJ.SocketManager.instance.send(11010, {
                    processData: ZJ.Util.objToByteArray({
                        playerId: this.playerId,
                        cmd: TetrisCmd.rotate
                    }).bytes
                });
            }, this);
            this.tetris1.addEventListener(EventName.ADD_OBS_BLOCK, (e: egret.Event) => {
                ZJ.SocketManager.instance.send(11010, {
                    processData: ZJ.Util.objToByteArray({
                        playerId: this.playerId,
                        cmd: TetrisCmd.addObsBlockMySelf,
                        data: e.data
                    }).bytes
                });
            }, this);
            this.tetris1.addEventListener(EventName.SPECIAL_X, (e: egret.Event) => {
                ZJ.SocketManager.instance.send(11010, {
                    processData: ZJ.Util.objToByteArray({
                        playerId: this.playerId,
                        cmd: TetrisCmd.addObsBlockToEnemy,
                        data: e.data.uprow
                    }).bytes
                });
            }, this);
            this.tetris1.addEventListener(EventName.GAME_OVER, (e: egret.Event) => {
                // ZJ.SocketManager.instance.send(11010, {
                //     processData: ZJ.Util.objToByteArray({
                //         playerId: this.playerId,
                //         cmd: TetrisCmd.gameover,
                //         data: 1
                //     }).bytes
                // });
                ZJ.SocketManager.instance.send(11012, {
                    winPlayerId: this.player2.playerId
                });
            }, this);
            this.tetris1.addEventListener(EventName.MOVE_END_EVENT, (e: egret.Event) => {
                // ZJ.SocketManager.instance.send(11010, {
                //     processData: ZJ.Util.objToByteArray({
                //         playerId: this.playerId,
                //         cmd: TetrisCmd.checkData,
                //         data: e.data
                //     }).bytes
                // });
                ZJ.SocketManager.instance.send(11011, {
                    playerScore: e.data.clearRow,
                    resultData:ZJ.Util.objToByteArray({
                        data: e.data.data
                    }).bytes,
                    level:e.data.level,
                    score2:e.data.clearMoreRowCount
                });
            }, this);
        }


        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        this.timeOnEnterFrame = egret.getTimer();
        this.lastTouchTapTime = this.DOUBLE_TAP_INTERVAL * -1;

        ZJ.SocketManager.instance.addEventListener(ZJ.CommonEventName.SOCKET_CONNECTED, this.onSocketConnected, this)
        ZJ.SocketManager.instance.addEventListener(ZJ.CommonEventName.SOCKET_DATA, this.onSocketData, this)
        ZJ.SocketManager.instance.addEventListener(ZJ.CommonEventName.CHANNEL_DATA, this.onChannelData, this)

        if (!ModuleConfig.compile.danji) {
            this.tetris1.isPlay = false;
            this.tetris2.isPlay = false;
            if(ModuleConfig.compile.ali){
                // ALISDK.CatcherSDK.instance().updateProgress(ALISDK.CatcherSDK.ProgressState.COMPLETED, 100);
            }
        } else {
            this.tetris1.seed = ZJ.Util.timeStamp();
            this.tetris2.seed = this.tetris1.seed;
            this.tetris1.rePlay();
            this.tetris2.rePlay();
            this.countDownToPlay(3);
        }


        //进入后台声音处理
        this.stage.addEventListener(egret.Event.ACTIVATE,()=>{
            if(!this.tetris1.isOver){
                let volume = 1;
                if(ZJ.AudioManager.Instance.bgm == "bgm"){
                    volume = this.bgmVolume;
                }
                ZJ.AudioManager.Instance.playBgm(0, volume);
            }
        },this);
        this.stage.addEventListener(egret.Event.DEACTIVATE,()=>{
            ZJ.AudioManager.Instance.stopAll();
        },this);


    }



    //帧事件
    private onEnterFrame(e: egret.Event) {
        var now = egret.getTimer();
        var time = this.timeOnEnterFrame;
        var pass = now - time;

        if (this.isTouchLeft) {
            this.touchLeftTime += pass;
            if (this.touchLeftTime >= this.TOUCH_INTERVAL - this.addCount * this.TOUCH_DESC_INTERVAL && this.touchLeftTime >= this.TOUCH_MIN_INTERVAL) {
                this.touchLeftTime = 0;
                this.addCount = 1;
                for (let i = 0; i < this.addCount; i++) {
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
                for (let i = 0; i < this.addCount; i++) {
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
                for (let i = 0; i < this.addCount; i++) {
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
    }



    flyParticles: particle.GravityParticleSystem;
    /**生成飞方块特效*/
    public playFlyBlock() {
        if (this.flyParticles == null) {
            var texture = RES.getRes("texiao1_png");
            var config = RES.getRes("texiao1_json");
            this.flyParticles = new particle.GravityParticleSystem(texture, config);
            let group = new eui.Group();
            group.horizontalCenter = 0;
            group.verticalCenter = 0;
            this.addChild(group);
            group.addChild(this.flyParticles);
        }
        let flyBlock = new FlyBlock();
        this.texiaoGroup.addChild(flyBlock);
        flyBlock.callBack = (ball)=>{
            //移动结束
            ZJ.ResManager.instance.loadMovieClip("baodian", "baodian", (mc:egret.MovieClip, mcFac:egret.MovieClipDataFactory)=>{
                mc.play(1);
                flyBlock.addChild(mc);
                mc.x = ball.x;
                mc.y = ball.y;
                mc.scaleX = 4;
                mc.scaleY = 4;
                mc.rotation = -flyBlock.rotation;
                mc.addEventListener(egret.MovieClipEvent.FRAME_LABEL,(e:egret.MovieClipEvent)=>{
                    if(e.frameLabel == "@end"){
                        flyBlock.removeChild(mc);
                        flyBlock.parent.removeChild(flyBlock);
                    }
                },this);
            });
        };
        flyBlock.play(this.texiaoPosArray, this.flyParticles);
    }


    flyParticles2: particle.GravityParticleSystem;
    /**生成飞方块特效*/
    public playFlyBlockToSpeedTip() {
        if (this.flyParticles2 == null) {
            var texture = RES.getRes("texiao1_png");
            var config = RES.getRes("texiao1_json");
            this.flyParticles2 = new particle.GravityParticleSystem(texture, config);
            let group = new eui.Group();
            group.horizontalCenter = 0;
            group.verticalCenter = 0;
            this.addChild(group);
            group.addChild(this.flyParticles2);
        }
        let flyBlock = new FlyBlock();
        this.texiaoGroup.addChild(flyBlock);
        let pArray:Array<ZJ.Vector3> = [new ZJ.Vector3(this.speedGroup.horizontalCenter, this.speedGroup.verticalCenter),
                                        new ZJ.Vector3(this.speedTipGroup.horizontalCenter + 80, this.speedTipGroup.verticalCenter)];
        for(let i=0; i < flyBlock.rotateArray.length; i++){
            flyBlock.rotateArray[i] = -115;
        }
        flyBlock.callBack = (ball)=>{
            //移动结束
            ZJ.ResManager.instance.loadMovieClip("baodian2", "baodian2", (mc:egret.MovieClip, mcFac:egret.MovieClipDataFactory)=>{
                mc.play(1);
                flyBlock.addChild(mc);
                mc.x = ball.x;
                mc.y = ball.y;
                mc.scaleX = 4;
                mc.scaleY = 4;
                mc.rotation = -flyBlock.rotation;
                mc.addEventListener(egret.MovieClipEvent.FRAME_LABEL,(e:egret.MovieClipEvent)=>{
                    if(e.frameLabel == "@end"){
                        flyBlock.removeChild(mc);
                        flyBlock.parent.removeChild(flyBlock);
                    }
                },this);
            });
        };
        flyBlock.play(pArray, this.flyParticles2, false);
    }



    /**创建一个combo特效*/
    private createComboEffect(comboNum: number) {
        let combo = new Combo();
        combo.setCombo(comboNum);
        combo.horizontalCenter = 300;
        combo.verticalCenter = 280;
        this.addChild(combo);
        combo.show();
    }


    private intervalPing = 0;
    private sendPing() {
        if (!ModuleConfig.compile.danji) {
            this.intervalPing = setInterval(
                () => {
                    ZJ.SocketManager.instance.send(11004);
                }, this.INTERVAL_PING
            )
        }
    }

    private sendLogin() {
        // if (!ModuleConfig.compile.danji) {
        //     ZJ.SocketManager.instance.send(11000, {
        //         openId: yyGameConfig.openId,
        //         nickname: yyGameConfig.nickname,
        //         avatarUrl: yyGameConfig.avatarUrl,
        //         timestamp: yyGameConfig.timestamp,
        //         sign: yyGameConfig.sign,
        //     })
        // }
    }

    private connect(): void {
        // if (!ModuleConfig.compile.danji) {
        //     let url = `ws://${ModuleConfig.ip}:${ModuleConfig.port}`
        //     ZJ.SocketManager.instance.connectByUrl(url)
        // }
    }
    private onSocketConnected(): void {
        // this.sendPing();
        // this.sendLogin();
        // ZJ.UIManager.instance.destroyView(UIName.YYLoading);
        // ZJ.UIManager.instance.destroyView(UIName.Loading);
    }

    private onSocketData(e: ZJ.SocketDataEvent): void {
        let aji = e.data;

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
    }

    private onChannelData(e: ZJ.ChannelDataEvent): void {
        let eventName = e.data.eventName
        let event = e.data.event
        console.log('onChannelData ' + eventName)
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
    }


    /** 登陆数据返回*/
    private onLogin(data: any) {
        console.log("登录结果:" + data.result + ", 玩家id:" + data.playerId);
        this.playerId = data.playerId;
        //登录成功,分配playerId,进入房间
    }


    /** 申请进入匹配房间 */
    private matchRoom(matchId: number) {
        ZJ.SocketManager.instance.send(11001, {
            matchId: matchId
        });
    }


    /** 进入匹配房间*/
    private onMatchRoom(data: any) {
        console.log("匹配房间结果:" + data.result + ", 生成房间id:" + data.roomId + ", 匹配id:" + data.matchId);
    }


    /** 准备游戏 */
    private readyGame() {
        ZJ.SocketManager.instance.send(11002, {
        });
    }


    /** 准备游戏结果 */
    private onReadyGame(data: any) {
        console.log("准备游戏结果:" + data.result);
        this.playerId = data.playerId;
        // wei
        this.tetris1.seed = data.seeds[0];
        this.tetris2.seed = data.seeds[0];
        this.tetris2.setReceiver(true);
    }

    /** 双方准备成功, 开始倒计时 */
    private onCountDown(data: any) {
        console.log("开始倒计时:" + data.readyTime);
        this.visible = true;
        // wei
        for (let i = 0; i < data.playerInfos.length; i++) {
            if (data.playerInfos[i].playerId == this.playerId) {
                this.player1 = data.playerInfos[i];
            } else {
                this.player2 = data.playerInfos[i]
                if (this.player2.isRobot == 1) {
                    this.tetris2.setAI(true);
                    let level = this.player2.robotLevel;
                    if(level == null || level == NaN){
                        level = 2;
                    }
                    if(level == 0){
                        level = ZJ.MathUtil.randomRange(1, 4, this.tetris2.seed);
                    }
                    this.tetris2.setAILevel(level);
                }
            }
        }
        this.tetris1.battleTimes = this.player1.battleTimes;
        this.tetris2.battleTimes = this.player2.battleTimes;
        if(this.player1.battleTimes < 10){
            this.guideBg.visible = true;
            this.guideMask.visible = true;
        }else{
            this.guideBg.visible = false;
            this.guideMask.visible = false;
            this.daojishiGroup.verticalCenter = -143;
        }

        if (this.player1.avatarUrl != "") {
            this.head1.source = this.player1.avatarUrl;
        }else {
            if(this.player1.gender == 2){
                this.head1.source = "girl_png";
            }
        }
        if (this.player2.avatarUrl != "") {
            this.head2.source = this.player2.avatarUrl;
        }else {
            if(this.player2.gender == 1){
                this.head2.source = "boy_png";
            }
        }
        this.updateSex(this.player1, this.player1.gender);
        this.updateSex(this.player2, this.player2.gender);
        this.tetris1.rePlay();
        this.tetris2.rePlay();

        //倒数3秒再开始
        this.countDownToPlay(3);
    }


    /** 接收游戏过程数据 */
    private onReceiveGameData(data: any) {
        let array = new egret.ByteArray(data.processData);
        let prodata = JSON.parse(array.readUTF());
        let sendTetris: Tetris;
        let otherTetris: Tetris;
        if (data.playerId == this.playerId) {
            sendTetris = this.tetris1;
            otherTetris = this.tetris2;
        } else {
            sendTetris = this.tetris2;
            otherTetris = this.tetris1;
        }
        let cmd = prodata.cmd;
        //来自玩家2的操作
        if (sendTetris == this.tetris2) {
            if (cmd == TetrisCmd.moveleft) {
                sendTetris.pushCmd(cmd, null);
            } else if (cmd == TetrisCmd.moveright) {
                sendTetris.pushCmd(cmd, null);
            } else if (cmd == TetrisCmd.movedown) {
                sendTetris.pushCmd(cmd, null);
            } else if (cmd == TetrisCmd.movefastdown) {
                sendTetris.pushCmd(cmd, null);
            } else if (cmd == TetrisCmd.rotate) {
                sendTetris.pushCmd(cmd, null);
            } else if (cmd == TetrisCmd.addObsBlockToEnemy) {
                let row = prodata.data;
                otherTetris.addObsBlock(row);
            } else if (cmd == TetrisCmd.addObsBlockMySelf) {
                let row = prodata.data;
                sendTetris.addObsBlock(row);
            } else if(cmd == TetrisCmd.checkData){
                this.onReceiveCheckData(prodata.data);
            }
        }
        // if (cmd == TetrisCmd.gameover) {
        //     this.gameOver(data.playerId, prodata.data);
        // }
    }


    /** 接收游戏结算数据 */
    private onReceiveCheckData(data: any) {
        let playerId = data.playerId;
        if(playerId == this.player2.playerId){
            let array = new egret.ByteArray(data.resultData);
            let resultData = JSON.parse(array.readUTF());
            this.tetris2.pushCmd(TetrisCmd.checkData, resultData.data);
        }
        // this.tetris2.pushCmd(TetrisCmd.checkData, data);
    }


    /** 接收游戏胜利数据 */
    private onReceiveWin(data: any) {
        let result = data.result;
        let winPlayerId = data.winPlayerId;
        if (result == 0) {
            let str;
            if (winPlayerId == this.playerId) {
                str = "win_png";
            } else {
                str = "fail_png";
            }
            this.tetris1.isOver = true;
            this.tetris2.isOver = true;
            this.replay.visible = true;
            (<eui.Image>this.replay.getChildAt(0)).source = str;
            (<eui.Label>this.replay.getChildAt(1)).text = "";
            ZJ.AudioManager.Instance.stopBgm();
        } else {
            console.log("结果通知返回失败");
        }
    }


    /** 语音状态改变 */
    private onMicChange(data: any) {
        let infos = data.statusList;
        for (let i = 0; i < infos.length; i++) {
            let info = infos[i];
            let player;
            if (info.openId == this.player1.openId) {
                player = this.player1;
            } else {
                player = this.player2;
            }
            let state: boolean = info.micStatus;
            this.updateVoice(player, state);
        }
    }


    /** 音乐状态转变 */
    private onAudioChange(data: any) {
        ZJ.AudioManager.Instance.isMute = !data.audioStatus;
    }



    //更新玩家的性别
    private updateSex(player, sex) {
        let sexIg: eui.Image;
        if (player == this.player1) {
            sexIg = this.sex1;
        } else {
            sexIg = this.sex2;
        }
        if (sex == 1) {
            sexIg.source = "boy_png";
        } else {
            sexIg.source = "girl_png";
        }
    }


    //更新玩家的语音状态
    private updateVoice(player, state: boolean) {
        let voice: eui.Image;
        if (player == this.player1) {
            voice = this.voice1;
        } else {
            voice = this.voice2;
        }
        if (state == true) {
            voice.source = "voice_open_png";
        } else {
            voice.source = "voice_close_png";
        }
    }


    /**倒数n秒开始游戏 */
    private countDownToPlay(second: number){
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
        let daojishi = ZJ.ResManager.instance.loadDragonBones("daojishi");
        this.daojishiGroup.addChild(daojishi);
        daojishi.addDBEventListener(dragonBones.EventObject.COMPLETE, (e:dragonBones.EgretEvent)=>{
            if(this.guideBg.visible){
                egret.Tween.get(this.guideBg).to({alpha:0}, 200).call(()=>{
                    this.guideBg.visible = false;
                });
                egret.Tween.get(this.guideMask).to({alpha:0}, 200).call(()=>{
                    this.guideMask.visible = false;
                });
            }
            this.tetris1.isPlay = true;
            this.tetris2.isPlay = true;
            this.tetris1.createRandomTetris();
            this.tetris2.createRandomTetris();
            // if(ModuleConfig.compile.danji || this.player2.isRobot == 1){
            //     this.tetris2.createRandomTetris();
            //     // this.tetris2.AIDoSomething();
            // }
            this.daojishiGroup.removeChild(daojishi);
        }, this);
        daojishi.animation.play("newAnimation", 1);
    }


    /**准备加速事件 */
    private readySpeedEvent(){
        let anim = ZJ.ResManager.instance.loadDragonBones("sudu");
        this.speedGroup.addChild(anim);
        anim.animation.play("newAnimation", -1);
        setTimeout(()=>{
            this.playFlyBlockToSpeedTip();
        }, 2500);
        setTimeout(()=>{
            anim.animation.stop();
            this.speedGroup.removeChild(anim);   
        }, 2500); 
    }



    /**更新速度提示信息 */
    private updateSpeedTip(speed:number){
        if(speed < 1) speed = 1;
        else if(speed > 5) speed = 5;
        if(this.speedTip.source == "speed"+speed+"_png") return;
        let tip = new eui.Image;
        tip.source = "speed" + speed + "_png";
        if(this.defSpeedTipTopY == null){
            this.defSpeedTipTopY = this.speedTip.top;
        }
        this.speedTipGroup.addChild(tip);
        tip.horizontalCenter = this.speedTip.horizontalCenter;
        tip.top = this.defSpeedTipTopY + 70;

        ZJ.ShapeUtil.setRectMask(tip, this.speedTip.x, this.defSpeedTipTopY, tip.width * 1.5, tip.height * 1.5);
        ZJ.ShapeUtil.setRectMask(this.speedTip, this.speedTip.x, this.defSpeedTipTopY - this.speedTip.height * 0.25, this.speedTip.width * 1.5, this.speedTip.height * 1.5);
           
        egret.Tween.get(tip).to({top:this.defSpeedTipTopY}, 400);
        egret.Tween.get(this.speedTip).to({top:this.defSpeedTipTopY - 70}, 400).call(()=>{
            this.speedTipGroup.removeChild(this.speedTip.mask as egret.DisplayObject);
            this.speedTipGroup.removeChild(this.speedTip);
            this.speedTip = tip;
        });
    }



    public onDestroy(): number {
        clearInterval(this.intervalPing);
        ZJ.SocketManager.instance.removeEventListener(ZJ.CommonEventName.SOCKET_CONNECTED, this.onSocketConnected, this)
        ZJ.SocketManager.instance.removeEventListener(ZJ.CommonEventName.SOCKET_DATA, this.onSocketData, this)
        ZJ.SocketManager.instance.removeEventListener(ZJ.CommonEventName.CHANNEL_DATA, this.onChannelData, this)
        return 0;
    }
}
