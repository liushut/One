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
var Dir;
(function (Dir) {
    Dir[Dir["left"] = 0] = "left";
    Dir[Dir["right"] = 1] = "right";
    Dir[Dir["down"] = 2] = "down";
})(Dir || (Dir = {}));
var TetrisCmd;
(function (TetrisCmd) {
    TetrisCmd[TetrisCmd["rotate"] = 0] = "rotate";
    TetrisCmd[TetrisCmd["moveleft"] = 1] = "moveleft";
    TetrisCmd[TetrisCmd["moveright"] = 2] = "moveright";
    TetrisCmd[TetrisCmd["movedown"] = 3] = "movedown";
    TetrisCmd[TetrisCmd["movefastdown"] = 4] = "movefastdown";
    TetrisCmd[TetrisCmd["addObsBlockToEnemy"] = 5] = "addObsBlockToEnemy";
    TetrisCmd[TetrisCmd["addObsBlockMySelf"] = 6] = "addObsBlockMySelf";
    TetrisCmd[TetrisCmd["gameover"] = 7] = "gameover";
    TetrisCmd[TetrisCmd["checkData"] = 8] = "checkData";
})(TetrisCmd || (TetrisCmd = {}));
var Tetris = (function (_super) {
    __extends(Tetris, _super);
    function Tetris() {
        var _this = _super.call(this) || this;
        //常量
        _this.COL = 10; //列
        _this.ROW = 20; //行
        _this.BLOCK_WIDTH = 56.5; //一个方块的宽度	//56.7
        _this.BLOCK_HEIGHT = 56.2; //一个方块的高度	//56.3
        _this.SMALL_BLOCK_PERCENT = 0.55; //小方块的比例
        _this.DEF_INTERVAL = 700; //1帧间隔(毫秒)
        _this.TETRIS_NAMES = ["block_J", "block_L", "block_S", "block_Z", "block_T", "block_I", "block_O"]; //与tetrisInfo相对应
        _this.SPEED_INTERVAL = 100; //每次加速帧间隔 (毫秒)
        _this.MIN_INTERVAL = 100; //最小间隔 (毫秒)
        _this.SPEED_READY_TIME = 3000; //加速提示准备时间 (毫秒)
        _this.clear_row = 0; //消除行数
        _this.clear_moreRow_Count = 0; //多消次数(消除3行以上)
        _this.use_time = 0; //用时 结束时间减去开始时间
        _this.bornBeginPos = new Pos(0, 3); //出生位置
        _this.curBlockBeginPos = new Pos(0, 3); //当前俄罗斯方块坐标系原点
        _this.curBlockTetrisType = 0;
        _this.curBlockState = 0;
        _this.curBlockTetrisTypeName = ""; //当前俄罗斯方块类型名字 "T、S、Z等"
        _this.curBlockArray = []; //当前的方块
        _this.shadowBlocks = []; //影子方块
        _this.nextBlockArray = []; //下一个俄罗斯方块数组
        _this.doubleNextBlockArray = []; //下下个俄罗斯方块数组
        _this.timeOnEnterFrame = 0;
        _this.randomNumArray = []; //创建随机数队列, 缓存即将生成的方块状态 结构{tetrisType, state}
        _this.isOver = false;
        _this.isPlay = true;
        _this.isAI = false; //是否为电脑AI
        _this.isReceiver = false; //是否为接收者, 若是则只被动执行接收的命令, 不主动执行
        _this.addSpeedCount = 0; //方块下落加速次数
        _this.time = 0;
        _this.isDoMoveEndEvent = false; //是否正在执行方块无法移动消除检测事件
        _this.isMoveFastDown = false; //是否正在执行快速下落
        _this.hasTouchDown = false; //是否正在持续触摸下降按钮
        _this.combo = -1; //连续消除次数
        _this.interval = _this.DEF_INTERVAL;
        _this.hasReadySpeed = false; //是否已发出准备加速信号
        _this.speedLevel = 1; //加速等级
        //生成规则
        _this.curRanIndex = -1; //当前随机的下标
        _this.curRanCount = 0; //当前随机俄罗斯次数
        //缓冲命令池
        _this.cmdArray = []; //{cmdTetris,data}
        //动画
        _this.whitePanelArray = [];
        //AI
        _this.AIReadyRotateTimeArray = [250, 130, 90, 10]; //AI旋转前的准备时间, 分为3个等级
        _this.AIReadyMoveTimeArray = [200, 130, 90, 10]; //AI旋转后移动前的准备时间, 分为3个等级
        _this.AIReadyMoveFastDownTimeArray = [500, 370, 270, 10]; //AI移动后快速下落前的准备时间, 分为3个等级
        _this.AIRotateIntervalTimeArray = [250, 160, 120, 10]; //AI旋转的间隔时间, 分为3个等级
        _this.AIMoveIntervalTimeArray = [230, 140, 50, 10]; //AI移动的间隔时间, 分为3个等级
        _this.curAILevel = 3; //当前AI等级(共3个等级)
        _this.AIWrongProArray = [30, 15, 0, 0]; //AI出错的概率, 分为3个等级
        _this.seed = 0; //种子随机数
        _this.battleTimes = 0; //战斗次数
        //所有俄罗斯方块信息
        _this.tetrisInfo = [
            //J
            new TetrisInfo([[[0, 0, 0, 0], [0, 1, 1, 1], [0, 0, 0, 1], [0, 0, 0, 0]],
                [[0, 0, 1, 0], [0, 0, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]],
                [[0, 0, 0, 0], [0, 1, 0, 0], [0, 1, 1, 1], [0, 0, 0, 0]],
                [[0, 0, 1, 1], [0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 0, 0]]
            ]),
            //L
            new TetrisInfo([[[0, 0, 0, 0], [0, 1, 1, 1], [0, 1, 0, 0], [0, 0, 0, 0]],
                [[0, 1, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 0, 0]],
                [[0, 0, 0, 0], [0, 0, 0, 1], [0, 1, 1, 1], [0, 0, 0, 0]],
                [[0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 1], [0, 0, 0, 0]],
            ]),
            //S
            new TetrisInfo([[[0, 0, 0, 0], [0, 0, 1, 1], [0, 1, 1, 0], [0, 0, 0, 0]],
                [[0, 1, 0, 0], [0, 1, 1, 0], [0, 0, 1, 0], [0, 0, 0, 0]],
            ]),
            //Z
            new TetrisInfo([[[0, 0, 0, 0], [0, 1, 1, 0], [0, 0, 1, 1], [0, 0, 0, 0]],
                [[0, 0, 0, 1], [0, 0, 1, 1], [0, 0, 1, 0], [0, 0, 0, 0]],
            ]),
            //T
            new TetrisInfo([[[0, 0, 0, 0], [0, 1, 1, 1], [0, 0, 1, 0], [0, 0, 0, 0]],
                [[0, 0, 1, 0], [0, 1, 1, 0], [0, 0, 1, 0], [0, 0, 0, 0]],
                [[0, 0, 0, 0], [0, 0, 1, 0], [0, 1, 1, 1], [0, 0, 0, 0]],
                [[0, 0, 1, 0], [0, 0, 1, 1], [0, 0, 1, 0], [0, 0, 0, 0]],
            ]),
            //I
            new TetrisInfo([[[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
                [[0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0]],
            ]),
            //O
            new TetrisInfo([[[0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
            ]),
        ];
        _this.AIRotateIdArray = [];
        _this.AIMoveIdArray = [];
        _this.total_width = _this.BLOCK_WIDTH * _this.COL;
        _this.total_height = _this.BLOCK_HEIGHT * _this.ROW;
        _this.width = _this.total_width;
        _this.height = _this.total_height;
        //初始化数组
        _this.blocks = new Array();
        for (var i = 0; i < _this.ROW; i++) {
            _this.blocks[i] = new Array();
            for (var j = 0; j < _this.COL; j++) {
                _this.blocks[i][j] = null;
            }
        }
        _this.skinName = "";
        return _this;
    }
    Tetris.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    Tetris.prototype.childrenCreated = function () {
        var _this = this;
        _super.prototype.childrenCreated.call(this);
        ZJ.ResManager.instance.loadMovieClip("luodi", "luodi", function (mc, mcfac) {
            _this.luodiFactory = mcfac;
        });
        //临时提示Log
        // this.logLabel = new eui.Label();
        // this.logLabel.horizontalCenter = 0;
        // this.logLabel.verticalCenter = -750;
        // this.addChild(this.logLabel);
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    };
    Tetris.prototype.onEnterFrame = function (e) {
        if (!this.isPlay || this.isOver)
            return;
        var now = egret.getTimer();
        var time = this.timeOnEnterFrame;
        var pass = now - time;
        this.use_time += pass;
        //每隔一段时间加速事件间隔
        if (this.battleTimes >= 10 || ModuleConfig.compile.danji) {
            //发出准备加速信号
            if (this.use_time >= 60000 - this.SPEED_READY_TIME && this.use_time < 60000) {
                this.speedReadyEvent();
            }
            else if (this.use_time >= 90000 - this.SPEED_READY_TIME && this.use_time < 90000) {
                this.speedReadyEvent();
            }
            else if (this.use_time >= 90000 + 30000 * (this.addSpeedCount + 1) - this.SPEED_READY_TIME && this.use_time < 90000 + 30000 * (this.addSpeedCount + 1)) {
                this.speedReadyEvent();
            }
            if (this.use_time >= 60000 && this.use_time < 90000) {
                if (this.interval > 500) {
                    this.interval = 500;
                    this.hasReadySpeed = false;
                    this.speedLevel++;
                    this.dispatchEvent(new egret.Event(EventName.SPEED, false, false, this.speedLevel));
                }
            }
            else if (this.use_time >= 90000 && this.use_time < 120000) {
                if (this.interval > 300) {
                    this.interval = 300;
                    this.hasReadySpeed = false;
                    this.speedLevel++;
                    this.dispatchEvent(new egret.Event(EventName.SPEED, false, false, this.speedLevel));
                }
            }
            else if (this.use_time >= 90000 + 30000 * (this.addSpeedCount + 1)) {
                this.addSpeedCount++;
                this.interval -= 100;
                if (this.interval < this.MIN_INTERVAL) {
                    this.interval = this.MIN_INTERVAL;
                }
                else {
                    this.hasReadySpeed = false;
                    this.speedLevel++;
                    this.dispatchEvent(new egret.Event(EventName.SPEED, false, false, this.speedLevel));
                }
            }
        }
        else {
            //发出准备加速信号
            if (this.use_time >= 90000 - this.SPEED_READY_TIME && this.use_time < 90000) {
                this.speedReadyEvent();
            }
            else if (this.use_time >= 150000 - this.SPEED_READY_TIME && this.use_time < 150000) {
                this.speedReadyEvent();
            }
            else if (this.use_time >= 150000 + 30000 * (this.addSpeedCount + 1) - this.SPEED_READY_TIME && this.use_time < 150000 + 30000 * (this.addSpeedCount + 1)) {
                this.speedReadyEvent();
            }
            if (this.use_time >= 90000 && this.use_time < 150000) {
                if (this.interval > 500) {
                    this.interval = 500;
                    this.hasReadySpeed = false;
                    this.speedLevel++;
                    this.dispatchEvent(new egret.Event(EventName.SPEED, false, false, this.speedLevel));
                }
            }
            else if (this.use_time >= 150000 && this.use_time < 180000) {
                if (this.interval > 300) {
                    this.interval = 300;
                    this.hasReadySpeed = false;
                    this.speedLevel++;
                    this.dispatchEvent(new egret.Event(EventName.SPEED, false, false, this.speedLevel));
                }
            }
            else if (this.use_time >= 150000 + 30000 * (this.addSpeedCount + 1)) {
                this.addSpeedCount++;
                this.interval -= 100;
                if (this.interval < this.MIN_INTERVAL) {
                    this.interval = this.MIN_INTERVAL;
                }
                else {
                    this.hasReadySpeed = false;
                    this.speedLevel++;
                    this.dispatchEvent(new egret.Event(EventName.SPEED, false, false, this.speedLevel));
                }
            }
        }
        this.time += pass;
        //接收者模式不主动执行逻辑
        if (!this.isReceiver || this.isAI) {
            //游戏事件
            if (this.time >= this.getIntervalTime() && !this.hasTouchDown) {
                this.onInterval();
                this.time = 0;
            }
        }
        // this.logLabel.text = this.getIntervalTime() + ", " + this.use_time;
        //执行缓冲列表的命令
        while (this.cmdArray.length > 0) {
            if (!this.isPlay)
                break;
            var cmdData = this.cmdArray.shift();
            var cmd = cmdData.cmd;
            var data = cmdData.data;
            if (cmd == TetrisCmd.rotate) {
                this.rotateOnce();
            }
            else if (cmd == TetrisCmd.moveleft) {
                this.moveLeft();
            }
            else if (cmd == TetrisCmd.moveright) {
                this.moveRight();
            }
            else if (cmd == TetrisCmd.movedown) {
                this.moveDown();
            }
            else if (cmd == TetrisCmd.movefastdown) {
                this.moveFastDown();
            }
            else if (cmd == TetrisCmd.checkData) {
                if (!this.checkDataSame(data)) {
                    this.setDatas(data);
                }
            }
        }
        this.timeOnEnterFrame = egret.getTimer();
    };
    /**创建一个俄罗斯方块
     * @param tetrisType 俄罗斯方块类型 (0,1,2,3..) 为tetrisInfo的下标
     * @param state 第n种旋转状态 (0,1..)
    */
    Tetris.prototype.createTetris = function (tetrisType, state) {
        var info = this.getTetrisInfo(tetrisType, state);
        this.curBlockTetrisType = tetrisType;
        this.curBlockTetrisTypeName = this.TETRIS_NAMES[tetrisType];
        this.curBlockState = state;
        //创建的时候只出现最后一行俄罗斯方块
        var lastRow = -1;
        for (var i = info.length - 1; i >= 0 && lastRow == -1; i--) {
            for (var j = 0; j < info[i].length; j++) {
                if (info[i][j] == 1) {
                    lastRow = i;
                    break;
                }
            }
        }
        //上移多出来的行数
        this.curBlockBeginPos.i = this.bornBeginPos.i - (lastRow - 0);
        this.curBlockBeginPos.j = this.bornBeginPos.j;
        this.createTetrisBlockByInfo(info);
        this.setTetrisShadow();
    };
    /**随机创建一个俄罗斯方块 */
    Tetris.prototype.createRandomTetris = function () {
        var _this = this;
        var ranNum = this.randomNumArray.shift();
        this.createTetris(ranNum.tetrisType, ranNum.state);
        //填充一个随机数
        this.randomNumArray.push(this.getRandomNumByRule());
        //展试下一个和下下一个俄罗斯方块
        if (this.nextTetrisGroup) {
            this.setTetrisBySelf(this.randomNumArray[0].tetrisType, this.randomNumArray[0].state, this.BLOCK_WIDTH * this.SMALL_BLOCK_PERCENT, this.BLOCK_HEIGHT * this.SMALL_BLOCK_PERCENT, this.nextTetrisGroup);
        }
        if (this.doubleNextTetrisGroup) {
            this.setTetrisBySelf(this.randomNumArray[1].tetrisType, this.randomNumArray[1].state, this.BLOCK_WIDTH * this.SMALL_BLOCK_PERCENT * 0.7, this.BLOCK_HEIGHT * this.SMALL_BLOCK_PERCENT * 0.7, this.doubleNextTetrisGroup);
        }
        if (this.isAI) {
            setTimeout(function () {
                var data = _this.getFitAIPos();
                if (data != null) {
                    _this.setFitAIPos(data);
                }
            }, 300);
        }
    };
    /**创建随机的数 */
    Tetris.prototype.getRandomNum = function () {
        var num = {};
        this.seed = ZJ.MathUtil.randomSeed(this.seed);
        num.tetrisType = ZJ.MathUtil.randomRange(0, this.tetrisInfo.length, this.seed);
        this.seed = ZJ.MathUtil.randomSeed(this.seed);
        num.state = ZJ.MathUtil.randomRange(0, this.tetrisInfo[num.tetrisType].info.length, this.seed);
        return num;
    };
    /**根据规则创建随机数字 */
    Tetris.prototype.getRandomNumByRule = function () {
        var randomNum = this.getRandomNum();
        if (randomNum.tetrisType != this.curRanIndex) {
            this.curRanIndex = randomNum.tetrisType;
            this.curRanCount = 1;
        }
        else {
            this.curRanCount++;
        }
        if (this.curRanCount >= 3) {
            while (true) {
                randomNum = this.getRandomNum();
                if (randomNum.tetrisType != this.curRanIndex) {
                    this.curRanIndex = randomNum.tetrisType;
                    this.curRanCount = 1;
                    break;
                }
            }
        }
        return randomNum;
    };
    Tetris.prototype.createTetrisBlockByInfo = function (info) {
        if (info != null) {
            this.curBlockArray.length = 0;
            for (var i = 0; i < info.length; i++) {
                for (var j = 0; j < info[i].length; j++) {
                    if (info[i][j] == 1) {
                        var tetrisBlock = new Block();
                        tetrisBlock.width = this.BLOCK_WIDTH;
                        tetrisBlock.height = this.BLOCK_HEIGHT;
                        this.addChild(tetrisBlock);
                        this.curBlockArray.push(tetrisBlock);
                        var pos = this.getPosByIndex(this.curBlockBeginPos.i + i, this.curBlockBeginPos.j + j);
                        tetrisBlock.x = pos.x;
                        tetrisBlock.y = pos.y;
                        tetrisBlock.row = this.curBlockBeginPos.i + i;
                        tetrisBlock.col = this.curBlockBeginPos.j + j;
                        tetrisBlock.tetrisType = this.curBlockTetrisType;
                        tetrisBlock.img.source = this.curBlockTetrisTypeName + "_png";
                        //如果方块位于外界, 先取消显示
                        if (tetrisBlock.row < 0) {
                            tetrisBlock.visible = false;
                        }
                    }
                }
            }
        }
    };
    /**展示未来的俄罗斯方块控件 */
    Tetris.prototype.setTetrisBySelf = function (tetrisType, state, width, height, group) {
        if (this.isAI || this.isReceiver)
            return;
        var info = this.getTetrisInfo(tetrisType, state);
        if (info) {
            var count = 0;
            var array = void 0;
            if (group == this.nextTetrisGroup) {
                array = this.nextBlockArray;
            }
            else if (group == this.doubleNextTetrisGroup) {
                array = this.doubleNextBlockArray;
            }
            if (array) {
                //得出方格表属于几乘几
                var row = 0, col = 0;
                for (var r = 0; r < info.length; r++) {
                    for (var c = 0; c < info[r].length; c++) {
                        if (info[r][c] == 1) {
                            row++;
                            break;
                        }
                    }
                }
                for (var c = 0; c < info[0].length; c++) {
                    for (var r = 0; r < info.length; r++) {
                        if (info[r][c] == 1) {
                            col++;
                            break;
                        }
                    }
                }
                //找出topLef方块
                var topLeftBlockPos = new Pos(-1, -1);
                for (var r = 0; r < info.length && topLeftBlockPos.i == -1; r++) {
                    for (var c = 0; c < info[r].length; c++) {
                        if (info[r][c] == 1) {
                            topLeftBlockPos.i = r;
                            break;
                        }
                    }
                }
                for (var c = 0; c < info[0].length && topLeftBlockPos.j == -1; c++) {
                    for (var r = 0; r < info.length; r++) {
                        if (info[r][c] == 1) {
                            topLeftBlockPos.j = c;
                            break;
                        }
                    }
                }
                //重组nxn 信息数组
                var infoArray = new Array();
                for (var r = 0; r < info.length; r++) {
                    infoArray[r] = new Array();
                    for (var c = 0; c < info[r].length; c++) {
                        if (info[r][c] == 1) {
                            infoArray[r - topLeftBlockPos.i][c - topLeftBlockPos.j] = 1;
                        }
                    }
                }
                var topLeftPos = new Pos(-(row - 1) / 2 * height, -(col - 1) / 2 * width);
                for (var i = 0; i < row; i++) {
                    for (var j = 0; j < col; j++) {
                        if (infoArray[i][j] == 1) {
                            var blockPos = new Pos(topLeftPos.i + i * height, topLeftPos.j + j * width);
                            count++;
                            if (array) {
                                var block = void 0;
                                if (array.length >= count) {
                                    block = array[count - 1];
                                    block.visible = true;
                                }
                                else {
                                    block = new Block();
                                    array.push(block);
                                    group.addChild(block);
                                    if (array == this.doubleNextBlockArray) {
                                        block.alpha = 0.5;
                                    }
                                }
                                block.horizontalCenter = blockPos.j;
                                block.verticalCenter = blockPos.i;
                                block.width = width;
                                block.height = height;
                                block.img.source = this.TETRIS_NAMES[tetrisType] + "_png";
                            }
                        }
                    }
                }
                for (var i = 0; i < array.length; i++) {
                    if (i >= count) {
                        array[i].visible = false;
                    }
                }
            }
        }
    };
    /**得到一个俄罗斯方块信息
     * @param tetrisType 俄罗斯方块类型 (0,1,2,3..) 为tetrisInfo的下标
     * @param state 第n种旋转状态 (0,1..)
    */
    Tetris.prototype.getTetrisInfo = function (tetrisType, state) {
        if (tetrisType >= 0 && tetrisType < this.tetrisInfo.length) {
            var tetris = this.tetrisInfo[tetrisType];
            if (state >= 0 && state < tetris.info.length) {
                return tetris.info[state];
            }
        }
        return null;
    };
    /**随机得到一个俄罗斯方块信息 返回结构 {tetrisType, state}*/
    Tetris.prototype.getRandomTetrisInfo = function () {
        this.seed = ZJ.MathUtil.randomSeed(this.seed);
        var tetrisType = ZJ.MathUtil.randomRange(0, this.tetrisInfo.length, this.seed);
        var tetris = this.tetrisInfo[tetrisType];
        this.seed = ZJ.MathUtil.randomSeed(this.seed);
        var state = ZJ.MathUtil.randomRange(0, tetris.info.length);
        return {
            tetrisType: tetrisType,
            state: state
        };
    };
    /**向某一个方向移动 */
    Tetris.prototype.moveTetris = function (dir, playMusic) {
        if (playMusic === void 0) { playMusic = true; }
        if (this.isOver || !this.isPlay)
            return false;
        var beginPos = new Pos(this.curBlockBeginPos.i, this.curBlockBeginPos.j);
        if (dir == Dir.left) {
            beginPos.j--;
        }
        else if (dir == Dir.right) {
            beginPos.j++;
        }
        else if (dir == Dir.down) {
            beginPos.i++;
        }
        //检测能否移动
        var info = this.tetrisInfo[this.curBlockTetrisType].info[this.curBlockState];
        var isCanMove = true;
        var posArray = [];
        for (var i = 0; i < info.length && isCanMove; i++) {
            for (var j = 0; j < info[i].length; j++) {
                if (info[i][j] == 1) {
                    var pos = new Pos(beginPos.i + i, beginPos.j + j);
                    if (!(pos.i < this.ROW && pos.j >= 0 && pos.j < this.COL)) {
                        isCanMove = false;
                        break;
                    }
                    else if (pos.i >= 0 && this.blocks[pos.i][pos.j] != null && this.curBlockArray.indexOf(this.blocks[pos.i][pos.j]) == -1) {
                        isCanMove = false;
                        break;
                    }
                    else {
                        posArray.push(pos);
                    }
                }
            }
        }
        if (isCanMove) {
            this.curBlockBeginPos.i = beginPos.i;
            this.curBlockBeginPos.j = beginPos.j;
            for (var i in this.curBlockArray) {
                var pos = this.getPosByIndex(posArray[i].i, posArray[i].j);
                var block = this.curBlockArray[i];
                if (block.row >= 0 && block.row < this.ROW && block.col >= 0 && block.col < this.COL && this.blocks[block.row][block.col] == block) {
                    return true;
                }
                block.x = pos.x;
                block.y = pos.y;
                block.row = posArray[i].i;
                block.col = posArray[i].j;
                if (block.row >= 0 && block.visible == false) {
                    block.visible = true;
                }
            }
            //播放移动音效
            if (playMusic && !this.isReceiver && !this.isAI) {
                ZJ.AudioManager.Instance.play("move", 1, 0.5);
            }
            return true;
        }
        return false;
    };
    /**向左移动一格 */
    Tetris.prototype.moveLeft = function () {
        if (!this.isPlay || this.isOver)
            return;
        this.moveTetris(Dir.left);
        this.setTetrisShadow();
        this.dispatchEvent(new egret.Event(EventName.MOVE_LEFT, false, false, null));
    };
    /**向右移动一格 */
    Tetris.prototype.moveRight = function () {
        if (!this.isPlay || this.isOver)
            return;
        this.moveTetris(Dir.right);
        this.setTetrisShadow();
        this.dispatchEvent(new egret.Event(EventName.MOVE_RIGHT, false, false, null));
    };
    /**向下移动一格 */
    Tetris.prototype.moveDown = function (playMusic) {
        if (playMusic === void 0) { playMusic = true; }
        if (!this.isPlay || this.isOver)
            return;
        if (this.isMoveFastDown)
            console.log("moveFastDown");
        if (!this.moveTetris(Dir.down, playMusic)) {
            this.moveEndEvent();
        }
        else {
            this.setTetrisShadow();
        }
        this.dispatchEvent(new egret.Event(EventName.MOVE_DOWN, false, false, null));
    };
    /**旋转一次方块 */
    Tetris.prototype.rotateOnce = function () {
        if (!this.isPlay || this.isOver)
            return;
        if (this.rotate()) {
            this.setTetrisShadow();
            this.dispatchEvent(new egret.Event(EventName.ROTATE, false, false, null));
        }
    };
    /** 快速下落到影子区域 */
    Tetris.prototype.moveFastDown = function () {
        if (this.isOver || !this.isPlay)
            return;
        this.isMoveFastDown = true;
        for (var i = 0; i < this.curBlockArray.length; i++) {
            var block = this.curBlockArray[i];
            var shadow = this.shadowBlocks[i];
            block.row = shadow.row;
            block.col = shadow.col;
            block.x = shadow.x;
            block.y = shadow.y;
            if (!block.visible) {
                block.visible = true;
            }
        }
        //取消影子
        for (var _i = 0, _a = this.shadowBlocks; _i < _a.length; _i++) {
            var shadow = _a[_i];
            shadow.visible = false;
        }
        this.moveEndEvent();
        this.isMoveFastDown = false;
        this.dispatchEvent(new egret.Event(EventName.MOVE_FAST_DOWN, false, false, null));
    };
    /**旋转当前俄罗斯方块 */
    Tetris.prototype.rotate = function () {
        if (this.isOver || !this.isPlay)
            return;
        //播放旋转音效
        if (!this.isReceiver && !this.isAI) {
            ZJ.AudioManager.Instance.play("rotate", 1, 0.5);
        }
        var state = this.curBlockState + 1;
        if (state >= this.tetrisInfo[this.curBlockTetrisType].info.length) {
            state = 0;
        }
        var info = this.tetrisInfo[this.curBlockTetrisType].info[state];
        var isCanRotate = true;
        var posArray = [];
        //检查能否旋转
        for (var i = 0; i < info.length && isCanRotate; i++) {
            for (var j = 0; j < info[i].length; j++) {
                if (info[i][j] == 1) {
                    var pos = new Pos(this.curBlockBeginPos.i + i, this.curBlockBeginPos.j + j);
                    if (!(pos.i < this.ROW && pos.j >= 0 && pos.j < this.COL) ||
                        (pos.i >= 0 && this.blocks[pos.i][pos.j] != null)) {
                        isCanRotate = false;
                        break;
                    }
                    else {
                        posArray.push(pos);
                    }
                }
            }
        }
        //检查是否因越界导致的无法旋转
        if (!isCanRotate) {
            var addCol = 0;
            var addRow = 0;
            var isOverStep = false;
            for (var i = 0; i < info.length; i++) {
                for (var j = 0; j < info[i].length; j++) {
                    if (info[i][j] == 1) {
                        var pos = new Pos(this.curBlockBeginPos.i + i, this.curBlockBeginPos.j + j);
                        if (pos.i > this.ROW - 1) {
                            var add = pos.i - (this.ROW - 1);
                            addRow = add > addRow ? add : addRow;
                            isOverStep = true;
                        }
                        if (pos.j < 0) {
                            var add = pos.j - 0;
                            addCol = add < addCol ? add : addCol;
                            isOverStep = true;
                        }
                        else if (pos.j > this.COL - 1) {
                            var add = pos.j - (this.COL - 1);
                            addCol = add > addCol ? add : addCol;
                            isOverStep = true;
                        }
                    }
                }
            }
            //越界方块移至正常位置再次检测能否旋转
            if (isOverStep) {
                var startPosR = this.curBlockBeginPos.i - addRow;
                var startPosC = this.curBlockBeginPos.j - addCol;
                isCanRotate = true;
                posArray.length = 0;
                //检查能否旋转
                for (var i = 0; i < info.length && isCanRotate; i++) {
                    for (var j = 0; j < info[i].length; j++) {
                        if (info[i][j] == 1) {
                            var pos = new Pos(startPosR + i, startPosC + j);
                            if (!(pos.i < this.ROW && pos.j >= 0 && pos.j < this.COL) ||
                                (pos.i >= 0 && this.blocks[pos.i][pos.j] != null)) {
                                isCanRotate = false;
                                break;
                            }
                            else {
                                posArray.push(pos);
                            }
                        }
                    }
                }
                if (isCanRotate) {
                    this.curBlockBeginPos.i = startPosR;
                    this.curBlockBeginPos.j = startPosC;
                }
            }
        }
        if (isCanRotate) {
            for (var i in this.curBlockArray) {
                var pos = this.getPosByIndex(posArray[i].i, posArray[i].j);
                var block = this.curBlockArray[i];
                block.x = pos.x;
                block.y = pos.y;
                block.row = posArray[i].i;
                block.col = posArray[i].j;
                if (block.row < 0 && block.visible) {
                    block.visible = false;
                }
                else if (block.row >= 0 && !block.visible) {
                    block.visible = true;
                }
            }
            this.curBlockState = state;
            return true;
        }
        return false;
    };
    /**设置阴影 */
    Tetris.prototype.setTetrisShadow = function () {
        //检查所有合适的放置点, 寻找最近的一个
        var shadowBeginPos = this.getNearPushPos(this.curBlockTetrisType, this.curBlockState, this.curBlockBeginPos);
        //设置阴影
        if (shadowBeginPos != null && !(shadowBeginPos.i == this.curBlockBeginPos.i && shadowBeginPos.j == this.curBlockBeginPos.j)) {
            var info = this.getTetrisInfo(this.curBlockTetrisType, this.curBlockState);
            var count = 0;
            for (var r = 0; r < info.length; r++) {
                for (var c = 0; c < info[r].length; c++) {
                    if (info[r][c] == 1) {
                        count++;
                        var pos = this.getPosByIndex(shadowBeginPos.i + r, shadowBeginPos.j + c);
                        var shadowBlock = void 0;
                        if (this.shadowBlocks.length >= count) {
                            shadowBlock = this.shadowBlocks[count - 1];
                        }
                        else {
                            shadowBlock = new Block();
                            shadowBlock.width = this.BLOCK_WIDTH;
                            shadowBlock.height = this.BLOCK_HEIGHT;
                            shadowBlock.name = "shadowBlock";
                            this.shadowBlocks.push(shadowBlock);
                            this.addChild(shadowBlock);
                            shadowBlock.img.source = "block_Shadow_png";
                        }
                        shadowBlock.visible = true;
                        shadowBlock.x = pos.x;
                        shadowBlock.y = pos.y;
                        shadowBlock.row = shadowBeginPos.i + r;
                        shadowBlock.col = shadowBeginPos.j + c;
                    }
                }
            }
            for (var i = 0; i < this.shadowBlocks.length; i++) {
                if (i >= count) {
                    this.shadowBlocks[i].visible = false;
                }
                else {
                    var shadowBlock = this.shadowBlocks[i];
                    for (var j = 0; j < this.curBlockArray.length; j++) {
                        var block = this.curBlockArray[j];
                        if (block.row == shadowBlock.row && block.col == shadowBlock.col) {
                            shadowBlock.visible = false;
                            break;
                        }
                    }
                }
            }
        }
        else {
            //取消阴影
            for (var i = 0; i < this.shadowBlocks.length; i++) {
                this.shadowBlocks[i].visible = false;
            }
        }
        //接收模式隐藏阴影
        if (this.isAI || this.isReceiver) {
            //取消阴影
            // for(let i = 0; i < this.shadowBlocks.length; i++){
            // 	this.shadowBlocks[i].visible = false;
            // }
        }
    };
    /**清除所有数据 */
    Tetris.prototype.clearData = function () {
        this.clear_row = 0;
        this.clear_moreRow_Count = 0;
        this.use_time = 0;
        for (var i = 0; i < this.blocks.length; i++) {
            for (var j = 0; j < this.blocks[i].length; j++) {
                var block = this.blocks[i][j];
                if (block != null) {
                    this.removeChild(block);
                    this.blocks[i][j] = null;
                }
            }
        }
        for (var i = 0; i < this.curBlockArray.length; i++) {
            var block = this.curBlockArray[i];
            if (block != null) {
                this.removeChild(block);
            }
        }
        this.curBlockArray = [];
        for (var i = 0; i < this.shadowBlocks.length; i++) {
            this.shadowBlocks[i].visible = false;
        }
        for (var i = 0; i < this.nextBlockArray.length; i++) {
            this.nextBlockArray[i].visible = false;
        }
        for (var i = 0; i < this.doubleNextBlockArray.length; i++) {
            this.doubleNextBlockArray[i].visible = false;
        }
        this.cmdArray.length = 0;
        this.randomNumArray = [];
        this.isOver = false;
        this.addSpeedCount = 0;
        this.time = 0;
        this.timeOnEnterFrame = egret.getTimer();
        this.curRanIndex = -1;
        this.curRanCount = 0;
        this.isDoMoveEndEvent = false;
        this.isMoveFastDown = false;
        this.interval = this.DEF_INTERVAL;
        this.combo = -1;
        this.hasTouchDown = false;
        this.hasReadySpeed = false;
        this.speedLevel = 1;
    };
    /**每帧执行*/
    Tetris.prototype.onInterval = function () {
        if (this.isPlay && !this.isOver) {
            this.moveDown(false);
        }
    };
    /**方块不能向下移动后的事件*/
    Tetris.prototype.moveEndEvent = function () {
        var _this = this;
        if (this.isOver || !this.isPlay)
            return;
        this.isDoMoveEndEvent = true;
        for (var _i = 0, _a = this.curBlockArray; _i < _a.length; _i++) {
            var block = _a[_i];
            if (block.row >= 0 && block.row < this.ROW && block.col >= 0 && block.col < this.COL) {
                if (this.blocks[block.row][block.col] == null) {
                    this.blocks[block.row][block.col] = block;
                }
                else {
                    this.removeChild(block);
                }
            }
            else {
                this.isOver = true;
                this.overGame();
            }
            this.playLuodiAnim(block);
            //播放音效
            if (!this.isReceiver && !this.isAI) {
                ZJ.AudioManager.Instance.play("fall", 1, 0.2);
            }
        }
        var clearUpRowArray = new Array();
        for (var r = this.ROW - 1; r >= 0; r--) {
            var canClearUp = true;
            var rowBlockArray = this.blocks[r];
            for (var c = 0; c < this.COL; c++) {
                if (rowBlockArray[c] == null) {
                    canClearUp = false;
                    break;
                }
            }
            if (canClearUp) {
                clearUpRowArray.push(r);
                this.clearUp(r);
            }
        }
        //生成消除动画
        var delayTime = 0;
        if (!this.isReceiver && !this.isAI) {
            this.isPlay = false;
        }
        if (clearUpRowArray.length > 0) {
            delayTime = this.playClearUpAnim(clearUpRowArray);
        }
        if (!this.isReceiver) {
            //等待消除动画完成
            setTimeout(function () {
                _this.fillEmptyRow(clearUpRowArray);
            }, delayTime);
        }
        else {
            this.fillEmptyRow(clearUpRowArray);
        }
    };
    /**播放落地特效 */
    Tetris.prototype.playLuodiAnim = function (block) {
        var _this = this;
        if (this.isAI || this.isReceiver)
            return;
        var lightBlock = new eui.Image();
        lightBlock.source = "block_light_png";
        lightBlock.x = block.x;
        lightBlock.y = block.y;
        lightBlock.anchorOffsetX = 7;
        lightBlock.anchorOffsetY = 8;
        this.addChild(lightBlock);
        egret.Tween.get(lightBlock).to({ alpha: 0 }, 200, egret.Ease.circIn).call(function () {
            _this.removeChild(lightBlock);
        });
        var posX = block.x + block.width / 2;
        var posY = block.y + block.height;
        var mc = new egret.MovieClip(this.luodiFactory.generateMovieClipData("luodi"));
        mc.addEventListener(egret.MovieClipEvent.FRAME_LABEL, function (e) {
            if (e.frameLabel == "@end") {
                _this.removeChild(mc);
            }
        }, this);
        this.addChild(mc);
        mc.x = posX;
        mc.y = posY;
        mc.play(1);
    };
    /** 播放消除特效*/
    Tetris.prototype.playClearUpAnim = function (rowArray) {
        var _this = this;
        if (this.isAI || this.isReceiver)
            return;
        // //白板消失时间
        var animTime = 300;
        // for(let i=0; i < rowArray.length; i++){
        // 	let row = rowArray[i];
        // 	let panel:eui.Image;
        // 	if(i < this.whitePanelArray.length){
        // 		panel = this.whitePanelArray[i];
        // 		panel.visible = true;
        // 	}else{
        // 		panel = new eui.Image();
        // 		panel.source = "baidi_png";
        // 		panel.scaleX = 1.05;
        // 		panel.scaleY = 1.05;
        // 		this.whitePanelArray.push(panel);
        // 		this.addChild(panel);
        // 	}
        // 	//在每一个消除行生成白底板块
        // 	this.setChildIndex(panel, this.numChildren - 1);
        // 	panel.horizontalCenter = 0;
        // 	panel.verticalCenter = this.getCenterPosByIndex(row, 0).y;
        // 	setTimeout(function() {
        // 		panel.visible = false;
        // 	}, 180);
        // }
        //计算中间位置
        // let posCenterY;
        // let posY;
        // if(rowArray.length > 1){
        // 	let lastRow = rowArray[0];
        // 	let firstRow = rowArray[rowArray.length - 1];
        // 	posCenterY = (this.getCenterPosByIndex(lastRow, 0).y + this.getCenterPosByIndex(firstRow, 0).y) / 2;
        // 	posY = (this.getPosByIndex(lastRow, 0).y + this.getPosByIndex(firstRow, 0).y) / 2;
        // }else{
        // 	posCenterY = this.getCenterPosByIndex(rowArray[0], 0).y;
        // 	posY = this.getPosByIndex(rowArray[0], 0).y + this.BLOCK_HEIGHT/2;
        // }
        //直接播放动画
        //消除动画初始化
        ZJ.ResManager.instance.loadMovieClip("xiaochu", "xiaochu", function (mc, mcfac) {
            var _loop_1 = function (i) {
                var row = rowArray[i];
                var posY = _this.getPosByIndex(row, 0).y + _this.BLOCK_HEIGHT / 2;
                var xiaochuMc = new egret.MovieClip(mcfac.generateMovieClipData("xiaochu"));
                xiaochuMc.addEventListener(egret.MovieClipEvent.FRAME_LABEL, function (e) {
                    if (e.frameLabel == "@end") {
                        _this.removeChild(xiaochuMc);
                    }
                }, _this);
                _this.addChild(xiaochuMc);
                _this.setChildIndex(xiaochuMc, _this.numChildren - 1);
                xiaochuMc.x = _this.width / 2;
                xiaochuMc.y = posY;
                xiaochuMc.scaleX = 2;
                xiaochuMc.scaleY = 2;
                xiaochuMc.visible = false;
                xiaochuMc.frameRate = 12;
                xiaochuMc.visible = true;
                xiaochuMc.gotoAndPlay(1);
            };
            for (var i = 0; i < rowArray.length; i++) {
                _loop_1(i);
            }
        });
        //抖动所有方块
        // setTimeout(()=>{
        // 	egret.Tween.get(this).to({y:this.y + 20}, 25).call(()=>{
        // 		egret.Tween.get(this).to({y:this.y - 20}, 25);
        // 	}, this);
        // }, 100);
        // //在中间位置生成一个白底板块从左往右
        // setTimeout(()=>{
        // 	let panel = new eui.Image();
        // 	panel.source = "baidi_png";
        // 	panel.scaleX = 1.3;
        // 	panel.scaleY = 0.5;
        // 	panel.horizontalCenter = 0;
        // 	panel.verticalCenter = posCenterY;
        // 	this.addChild(panel);
        // 	this.setChildIndex(panel, this.numChildren - 1);
        // 	egret.Tween.get(panel).to({width:0,alpha:0}, 200).call(()=>{
        // 		this.removeChild(panel);
        // 	},this);
        // }, 160);
        return animTime;
    };
    /**增加障碍物方块行 */
    Tetris.prototype.addObsBlock = function (upRow) {
        var _this = this;
        if (this.isOver)
            return;
        //如果正在执行消除检测事件, 延迟300毫秒执行, 避免在消除方块的时候增加障碍方块导致bug
        if (this.isDoMoveEndEvent) {
            setTimeout(function () {
                _this.addObsBlock(upRow);
            }, 300);
            return;
        }
        //播放音效
        if (!this.isReceiver && !this.isAI) {
            ZJ.AudioManager.Instance.play("addObs");
        }
        //空出方块
        var isOver = false;
        //所有方块往上移动n行
        for (var r = 0; r < this.ROW; r++) {
            var rowArray = this.blocks[r];
            for (var c = 0; c < rowArray.length; c++) {
                var block = this.blocks[r][c];
                if (block != null) {
                    block.row -= upRow;
                    if (block.row >= 0) {
                        this.blocks[block.row][c] = block;
                    }
                    else {
                        block.visible = false;
                        isOver = true;
                    }
                    this.blocks[r][c] = null;
                    var pos = this.getPosByIndex(block.row, c);
                    block.x = pos.x;
                    block.y = pos.y;
                }
            }
        }
        var ranseed = ZJ.MathUtil.randomSeed(ZJ.Util.timeStamp());
        //从最后一行增加N行障碍物
        for (var i = 0; i < upRow; i++) {
            var r = this.ROW - 1 - i;
            ranseed = ZJ.MathUtil.randomSeed(ranseed);
            var emptyC = ZJ.MathUtil.randomRange(0, this.COL, ranseed);
            for (var c = 0; c < this.COL; c++) {
                if (c != emptyC) {
                    var block = new Block();
                    this.addChild(block);
                    block.img.source = "block_obstacle_png";
                    block.width = this.BLOCK_WIDTH;
                    block.height = this.BLOCK_HEIGHT;
                    block.name = "block_obs";
                    block.row = r;
                    block.col = c;
                    var pos = this.getPosByIndex(r, c);
                    block.x = pos.x;
                    block.y = pos.y;
                    block.tetrisType = -10;
                    this.blocks[r][c] = block;
                }
            }
        }
        this.setTetrisShadow();
        this.checkBgm();
        if (isOver) {
            this.overGame();
        }
        this.dispatchEvent(new egret.Event(EventName.ADD_OBS_BLOCK, false, false, upRow));
    };
    /**消除某一行的方块 */
    Tetris.prototype.clearUp = function (row) {
        //消除行数加1
        this.clear_row++;
        for (var c = 0; c < this.COL; c++) {
            var block = this.blocks[row][c];
            if (block != null) {
                this.removeChild(block);
                this.blocks[row][c] = null;
            }
        }
    };
    Tetris.prototype.fillEmptyRow = function (clearUpRowArray) {
        if (clearUpRowArray.length > 0) {
            var emptyRow = clearUpRowArray[0];
            for (var r = emptyRow - 1; r >= 0; r--) {
                if (clearUpRowArray.indexOf(r) == -1) {
                    var rowBlockArray = this.blocks[r];
                    for (var c = 0; c < this.COL; c++) {
                        var block = rowBlockArray[c];
                        if (block != null) {
                            block.y = this.getPosByIndex(emptyRow, c).y;
                            this.blocks[emptyRow][c] = block;
                            block.row = emptyRow;
                            rowBlockArray[c] = null;
                        }
                    }
                    emptyRow--;
                }
            }
            if (clearUpRowArray.length >= 3) {
                this.clear_moreRow_Count++;
                this.combo++;
                //特殊消除
                this.dispatchEvent(new egret.Event(EventName.SPECIAL_X, false, false, { uprow: clearUpRowArray.length + this.combo, combo: this.combo }));
                if (!this.isReceiver && !this.isAI) {
                    ZJ.AudioManager.Instance.play("specialX");
                }
                if (this.combo >= 1 && !this.isReceiver && !this.isAI) {
                    var c = this.combo;
                    if (c > 3) {
                        c = 3;
                    }
                    ZJ.AudioManager.Instance.play("combo" + c);
                }
            }
            else {
                this.combo = -1;
                if (!this.isReceiver && !this.isAI) {
                    ZJ.AudioManager.Instance.play("normalX", 1, 0.5);
                }
            }
        }
        else {
            this.combo = -1;
        }
        this.checkBgm();
        this.createRandomTetris();
        if (this.isGameOver()) {
            this.overGame();
        }
        else {
            this.time = this.interval;
            this.isPlay = true;
        }
        this.isDoMoveEndEvent = false;
        this.dispatchEvent(new egret.Event(EventName.MOVE_END_EVENT, false, false, { data: this.getCurData(), clearRow: this.clear_row, level: this.speedLevel, clearMoreRowCount: this.clear_moreRow_Count }));
    };
    /**得到某个状态的俄罗斯方块在某一个位置时垂直映射的最近可放置位置 */
    Tetris.prototype.getNearPushPos = function (tetrisType, state, startPos) {
        var info = this.getTetrisInfo(tetrisType, state);
        var lastPosArray = [];
        for (var c = 0; c < 4; c++) {
            for (var r = info.length - 1; r >= 0; r--) {
                if (info[r][c] == 1) {
                    lastPosArray.push(new Pos(r, c));
                    break;
                }
            }
        }
        var beginPosArray = [];
        for (var _i = 0, lastPosArray_1 = lastPosArray; _i < lastPosArray_1.length; _i++) {
            var pos = lastPosArray_1[_i];
            var col = startPos.j + pos.j;
            if (!(col >= 0 && col < this.COL)) {
                continue;
            }
            for (var r = startPos.i + pos.i + 1; r <= this.ROW; r++) {
                if (r == this.ROW || (r >= 0 && this.blocks[r][col] != null)) {
                    var beginPos = new Pos(r - 1 - pos.i, col - pos.j);
                    //检测该位置能否放置
                    var canPush = true;
                    for (var tr = 0; tr < info.length && canPush; tr++) {
                        for (var tc = 0; tc < info[tr].length; tc++) {
                            if (info[tr][tc] == 1) {
                                var p = new Pos(beginPos.i + tr, beginPos.j + tc);
                                if (p.i < 0 || p.i >= this.ROW || p.j < 0 || p.j >= this.COL ||
                                    (p.i >= 0 && this.blocks[p.i][p.j] != null)) {
                                    canPush = false;
                                    break;
                                }
                            }
                        }
                    }
                    if (canPush && !(beginPos.i == startPos.i && beginPos.j == startPos.j)) {
                        beginPosArray.push(beginPos);
                    }
                    break;
                }
            }
        }
        //检查所有合适的放置点, 寻找最近的一个
        var fitBeginPos;
        if (beginPosArray.length > 0) {
            for (var _a = 0, beginPosArray_1 = beginPosArray; _a < beginPosArray_1.length; _a++) {
                var pos = beginPosArray_1[_a];
                if (fitBeginPos == null) {
                    fitBeginPos = new Pos(pos.i, pos.j);
                }
                else if (pos.i < fitBeginPos.i) {
                    fitBeginPos.i = pos.i;
                    fitBeginPos.j = pos.j;
                }
            }
        }
        return fitBeginPos;
    };
    /**得到最佳放置位置, 返回结构 {pos:Pos, rotate:number}
     * @returns {pos:Pos, rotate:number}
     */
    Tetris.prototype.getFitAIPos = function () {
        if (!this.isPlay || this.isOver)
            return;
        var tetrisType = this.curBlockTetrisType;
        var state = this.curBlockState;
        var scoreArray = [];
        var rotateCount = 0;
        //旋转N次
        for (var i = 0; i < this.tetrisInfo[tetrisType].info.length; i++) {
            if (state >= this.tetrisInfo[tetrisType].info.length) {
                state = 0;
            }
            var info = this.getTetrisInfo(tetrisType, state);
            for (var c = 1 - info[0].length; c <= this.COL - 1; c++) {
                var pos = new Pos(this.curBlockBeginPos.i, c);
                var nearPos = this.getNearPushPos(tetrisType, state, pos);
                var priority = void 0;
                if (nearPos != null) {
                    if (nearPos.j < this.bornBeginPos.j) {
                        priority = 100 * Math.abs(c - this.bornBeginPos.j) + 10 + rotateCount;
                    }
                    else {
                        priority = 100 * Math.abs(c - this.bornBeginPos.j) + rotateCount;
                    }
                    var score = this.calAIScore(nearPos, info);
                    scoreArray.push({ pos: nearPos, score: score, rotate: rotateCount, priority: priority });
                }
            }
            state++;
            rotateCount++;
        }
        //得到最佳位置
        scoreArray.sort(function (a, b) {
            if (a.score > b.score) {
                return -1;
            }
            else if (a.score < b.score) {
                return 1;
            }
            else {
                if (a.priority > b.priority) {
                    return -1;
                }
                else if (a.priority < b.priority) {
                    return 1;
                }
                else {
                    return 0;
                }
            }
        });
        var wrongProbability = this.AIWrongProArray[this.curAILevel - 1];
        var range = ZJ.MathUtil.randomRange(0, 101);
        var index = 0;
        if (range < wrongProbability) {
            //出错
            index = ZJ.MathUtil.randomRange(1, 3);
            if (index >= scoreArray.length) {
                index = scoreArray.length - 1;
            }
        }
        var bestData;
        if (index >= 0 && index < scoreArray.length) {
            bestData = scoreArray[index];
        }
        // //得到最佳位置
        // let array = [];
        // for(let i=0; i < scoreArray.length; i++){
        // 	let data = scoreArray[i];
        // 	if(i == 0){
        // 		array.push(data);
        // 	}else{
        // 		if(data.score > array[0].score){
        // 			array.length = 0;
        // 			array.push(data);
        // 		}else if(data.score == array[0].score){
        // 			array.push(data);
        // 		}
        // 	}
        // }
        // //若有多个,得到优先级最高的
        // for(let i=0; i < array.length; i++){
        // 	if(i==0){
        // 		bestData = array[0];
        // 	}else{
        // 		if(array[i].priority > bestData.priority){
        // 			bestData = array[i];
        // 		}
        // 	}
        // }
        if (bestData != null) {
            // let bestPos:Pos = bestData.pos;
            // let rotateC = bestData.rotate;
            // for(let i=0; i < rotateC; i++){
            // 	this.rotate();
            // }
            // this.curBlockBeginPos = bestPos;
            // this.curBlockBeginPos.i--;
            // this.moveDown();
        }
        return bestData;
    };
    /**AI通过模拟一系列操作到达认为的最佳目的地 参数数据结构{pos:Pos, rotate:number}*/
    Tetris.prototype.setFitAIPos = function (data) {
        var _this = this;
        var bestPos = data.pos;
        var rotateC = data.rotate;
        //计算水平移动的格子数量
        var horizontalMoveStep = bestPos.j - this.curBlockBeginPos.j;
        var speedCount = this.addSpeedCount;
        if (this.curAILevel == 1) {
            speedCount = 0;
        }
        var AIRotateIntervalTime = this.AIRotateIntervalTimeArray[this.curAILevel - 1] - speedCount * 10;
        var AIMoveIntervalTime = this.AIMoveIntervalTimeArray[this.curAILevel - 1] - speedCount * 10;
        var readyRotateTime = this.AIReadyRotateTimeArray[this.curAILevel - 1] - speedCount * 25;
        var readyMoveTime = this.AIMoveIntervalTimeArray[this.curAILevel - 1] - speedCount * 25;
        var readyMoveFastTime = this.AIReadyMoveFastDownTimeArray[this.curAILevel - 1] - speedCount * 20;
        if (AIRotateIntervalTime < 40)
            AIRotateIntervalTime = 40;
        if (AIMoveIntervalTime < 40)
            AIMoveIntervalTime = 40;
        if (readyRotateTime < 80)
            readyRotateTime = 80;
        if (readyMoveTime < 80)
            readyMoveTime = 80;
        if (readyMoveFastTime < 80)
            readyMoveFastTime = 80;
        var moveIntervalTime = readyRotateTime;
        //初始化
        for (var i = 0; i < this.AIRotateIdArray.length; i++) {
            clearTimeout(this.AIRotateIdArray[i]);
        }
        for (var i = 0; i < this.AIMoveIdArray.length; i++) {
            clearTimeout(this.AIMoveIdArray[i]);
        }
        clearTimeout(this.AIMoveFastDownId);
        this.AIRotateIdArray.length = 0;
        this.AIMoveIdArray.length = 0;
        //旋转和移动
        for (var i = 0; i < rotateC; i++) {
            this.AIRotateIdArray.push(setTimeout(function () {
                _this.rotateOnce();
            }, moveIntervalTime));
            moveIntervalTime += AIRotateIntervalTime;
        }
        moveIntervalTime += readyMoveTime;
        for (var i = 0; i < Math.abs(horizontalMoveStep); i++) {
            this.AIMoveIdArray.push(setTimeout(function () {
                if (horizontalMoveStep > 0) {
                    _this.moveRight();
                }
                else if (horizontalMoveStep < 0) {
                    _this.moveLeft();
                }
            }, moveIntervalTime));
            moveIntervalTime += AIMoveIntervalTime;
        }
        moveIntervalTime += readyMoveFastTime;
        this.AIMoveFastDownId = setTimeout(function () {
            _this.moveFastDown();
        }, moveIntervalTime);
    };
    //AI逻辑
    Tetris.prototype.calAIScore = function (beginPos, info) {
        var tempBlocks = new Array();
        //克隆当前数据
        for (var r = 0; r < this.ROW; r++) {
            tempBlocks[r] = new Array();
            for (var c = 0; c < this.COL; c++) {
                if (this.blocks[r][c] != null) {
                    tempBlocks[r][c] = 1;
                }
                else {
                    tempBlocks[r][c] = 0;
                }
            }
        }
        var posArray = [];
        //填充模拟坠落方块数据
        for (var i = 0; i < info.length; i++) {
            for (var j = 0; j < info[i].length; j++) {
                if (info[i][j] == 1) {
                    tempBlocks[beginPos.i + i][beginPos.j + j] = 1;
                    posArray.push(new Pos(beginPos.i + i, beginPos.j + j));
                }
            }
        }
        var landingHeight = this.getLandingHeight(beginPos);
        var erodedPieceCellsMetric = this.getErodedPieceCellsMetric(tempBlocks, posArray);
        var boardRowTransitions = this.getBoardRowTransition(tempBlocks);
        var boardColTransitions = this.getBoardColTransition(tempBlocks);
        var boardBuriedHoles = this.getBoardBuriedHoles(tempBlocks);
        var boardWells = this.getBoardWells(tempBlocks);
        return -1 * landingHeight + erodedPieceCellsMetric + -1 * boardRowTransitions + -1 * boardColTransitions + -4 * boardBuriedHoles + -1 * boardWells;
    };
    /**得到当前方块距离底部的方格数 */
    Tetris.prototype.getLandingHeight = function (beginPos) {
        return this.ROW - 1 - beginPos.i;
    };
    /**加分项 公式=消去行*当前方块被消去的个数 */
    Tetris.prototype.getErodedPieceCellsMetric = function (tempBlocks, posArray) {
        var clearUpRowCount = 0;
        var clearUpBlockCount = 0;
        var rowArray = [];
        for (var r = 0; r < tempBlocks.length; r++) {
            var canClearUp = true;
            for (var c = 0; c < tempBlocks[r].length; c++) {
                if (tempBlocks[r][c] == 0) {
                    canClearUp = false;
                    break;
                }
            }
            if (canClearUp) {
                rowArray.push(r);
            }
        }
        for (var _i = 0, posArray_1 = posArray; _i < posArray_1.length; _i++) {
            var pos = posArray_1[_i];
            if (rowArray.indexOf(pos.i) != -1) {
                clearUpBlockCount++;
            }
        }
        return clearUpRowCount * clearUpBlockCount;
    };
    /**一行中从有到无视为一次变换 例如 1 0 */
    Tetris.prototype.getBoardRowTransition = function (tempBlocks) {
        var boardRowTransition = 0;
        for (var i = 0; i < tempBlocks.length; i++) {
            var rowArray = tempBlocks[i];
            for (var j = 0; j < rowArray.length; j++) {
                if (j == 0) {
                    if (rowArray[j] == 0) {
                        boardRowTransition++;
                    }
                }
                else if (j == rowArray.length - 1) {
                    if (rowArray[j] == 0) {
                        boardRowTransition++;
                    }
                }
                else {
                    if (rowArray[j] == 0 && rowArray[j + 1] == 1) {
                        boardRowTransition++;
                    }
                    if (rowArray[j] == 1 && rowArray[j + 1] == 0) {
                        boardRowTransition++;
                    }
                }
            }
        }
        return boardRowTransition;
    };
    /**一列中从有到无视为一次变换 例如 1 0 */
    Tetris.prototype.getBoardColTransition = function (tempBlocks) {
        var boardColTransition = 0;
        for (var c = 0; c < this.COL; c++) {
            for (var r = 0; r < this.ROW; r++) {
                if (r == 0) {
                    if (tempBlocks[r][c] == 0) {
                        boardColTransition++;
                    }
                }
                else if (r == tempBlocks.length - 1) {
                    if (tempBlocks[r][c] == 0) {
                        boardColTransition++;
                    }
                }
                else {
                    if (tempBlocks[r][c] == 0 && tempBlocks[r + 1][c] == 1) {
                        boardColTransition++;
                    }
                    if (tempBlocks[r][c] == 1 && tempBlocks[r + 1][c] == 0) {
                        boardColTransition++;
                    }
                }
            }
        }
        return boardColTransition;
    };
    /** 各列中间的空洞方格个数和*/
    Tetris.prototype.getBoardBuriedHoles = function (tempBlocks) {
        var boardBuriedHoles = 0;
        for (var c = 0; c < tempBlocks.length; c++) {
            for (var r = 0; r < this.ROW; r++) {
                if (tempBlocks[r][c] == 1) {
                    while (++r < this.ROW) {
                        if (tempBlocks[r][c] == 0) {
                            boardBuriedHoles++;
                        }
                    }
                    break;
                }
            }
        }
        return boardBuriedHoles;
    };
    /** "井"深度和 1 0 1*/
    Tetris.prototype.getBoardWells = function (tempBlocks) {
        var boardWells = 0;
        for (var c = 0; c < this.COL; c++) {
            for (var r = 0; r < this.ROW; r++) {
                if (c == 0) {
                    if (tempBlocks[r][c] == 0 && tempBlocks[r][c + 1] == 1) {
                        //延伸下去直到一个井结束
                        var startR = r;
                        var endR = startR;
                        while (++r < this.ROW) {
                            if (tempBlocks[r][c] == 0 && tempBlocks[r][c + 1] == 1) {
                                endR = r;
                            }
                            else {
                                break;
                            }
                        }
                        var count = endR - startR + 1;
                        while (count > 1) {
                            boardWells += count * (count - 1);
                            count--;
                        }
                    }
                }
                else if (c == this.COL - 1) {
                    if (tempBlocks[r][c] == 0 && tempBlocks[r][c - 1] == 1) {
                        //延伸下去直到一个井结束
                        var startR = r;
                        var endR = startR;
                        while (++r < this.ROW) {
                            if (tempBlocks[r][c] == 0 && tempBlocks[r][c - 1] == 1) {
                                endR = r;
                            }
                            else {
                                break;
                            }
                        }
                        var count = endR - startR + 1;
                        while (count > 1) {
                            boardWells += count * (count - 1);
                            count--;
                        }
                    }
                }
                else {
                    if (tempBlocks[r][c] == 0 && tempBlocks[r][c - 1] == 1 && tempBlocks[r][c + 1] == 1) {
                        //延伸下去直到一个井结束
                        var startR = r;
                        var endR = startR;
                        while (++r < this.ROW) {
                            if (tempBlocks[r][c] == 0 && tempBlocks[r][c - 1] == 1 && tempBlocks[r][c + 1] == 1) {
                                endR = r;
                            }
                            else {
                                break;
                            }
                        }
                        var count = endR - startR + 1;
                        while (count > 1) {
                            boardWells += count * (count - 1);
                            count--;
                        }
                    }
                }
            }
        }
        return boardWells;
    };
    /**发出准备加速信号 */
    Tetris.prototype.speedReadyEvent = function () {
        if (!this.hasReadySpeed && this.interval > this.MIN_INTERVAL) {
            this.hasReadySpeed = true;
            this.dispatchEvent(new egret.Event(EventName.SPEED_READY));
        }
    };
    /**AI对当前状况做出相应操作 */
    Tetris.prototype.AIDoSomething = function () {
        var data = this.getFitAIPos();
        if (data != null) {
            this.setFitAIPos(data);
        }
    };
    /**检查背景音乐是否应该切换 */
    Tetris.prototype.checkBgm = function () {
        //检测是否还有六行到顶，如果是更换Bgm为danger.mp3
        if (!this.isReceiver && !this.isAI && !this.isOver) {
            var isDanger = false;
            for (var r = 0; r < 6 && !isDanger; r++) {
                for (var c = 0; c < this.COL; c++) {
                    if (this.blocks[r][c] != null) {
                        isDanger = true;
                        break;
                    }
                }
            }
            if (isDanger) {
                if (ZJ.AudioManager.Instance.bgm != "danger") {
                    ZJ.AudioManager.Instance.stopBgm();
                    ZJ.AudioManager.Instance.bgm = "danger";
                    ZJ.AudioManager.Instance.playBgm();
                }
            }
            else {
                if (ZJ.AudioManager.Instance.bgm != "bgm") {
                    ZJ.AudioManager.Instance.stopBgm();
                    ZJ.AudioManager.Instance.bgm = "bgm";
                    ZJ.AudioManager.Instance.playBgm();
                }
            }
        }
    };
    /**得到当前数据 */
    Tetris.prototype.getCurData = function () {
        var blockDatas = new Array();
        for (var r = 0; r < this.ROW; r++) {
            blockDatas[r] = new Array();
            for (var c = 0; c < this.COL; c++) {
                if (this.blocks[r][c] == null) {
                    blockDatas[r][c] = -1;
                }
                else {
                    blockDatas[r][c] = this.blocks[r][c].tetrisType;
                }
            }
        }
        var struct = {};
        struct.blockDatas = blockDatas;
        return struct;
    };
    /**检查双方数据是否一致 */
    Tetris.prototype.checkDataSame = function (data) {
        var curData = this.getCurData();
        var blockDatas = data.blockDatas;
        var curBlockDatas = curData.blockDatas;
        for (var r = 0; r < this.ROW; r++) {
            for (var c = 0; c < this.COL; c++) {
                if (blockDatas[r][c] != curBlockDatas[r][c]) {
                    // console.log("方块不一致");
                    return false;
                }
            }
        }
        // console.log("一致");
        return true;
    };
    /**强制刷新当前数据 */
    Tetris.prototype.setDatas = function (data) {
        for (var i = 0; i < this.curBlockArray.length; i++) {
            this.removeChild(this.curBlockArray[i]);
        }
        this.curBlockArray.length = 0;
        var blockDatas = data.blockDatas;
        for (var r = 0; r < this.ROW; r++) {
            for (var c = 0; c < this.COL; c++) {
                var block = this.blocks[r][c];
                var type = blockDatas[r][c];
                if (type == -1) {
                    if (block != null) {
                        this.removeChild(block);
                        this.blocks[r][c] = null;
                    }
                }
                else {
                    if (block == null) {
                        block = new Block();
                        block.width = this.BLOCK_WIDTH;
                        block.height = this.BLOCK_HEIGHT;
                        block.row = r;
                        block.col = c;
                        this.addChild(block);
                        var pos = this.getPosByIndex(r, c);
                        block.x = pos.x;
                        block.y = pos.y;
                        this.blocks[r][c] = block;
                    }
                    if (type == -10) {
                        block.img.source = "block_obstacle_png";
                    }
                    else {
                        block.img.source = this.TETRIS_NAMES[type] + "_png";
                    }
                    block.tetrisType = type;
                }
            }
        }
        this.createRandomTetris();
    };
    /**游戏重新开始 */
    Tetris.prototype.rePlay = function () {
        //清除所有数据
        this.clearData();
        //开始填充三个随机数
        for (var i = 0; i < 3; i++) {
            this.randomNumArray.push(this.getRandomNumByRule());
        }
        // this.createRandomTetris();
        this.isPlay = true;
    };
    /**开始游戏 */
    Tetris.prototype.startPlay = function () {
        //开始填充三个随机数
        for (var i = 0; i < 3; i++) {
            this.randomNumArray.push(this.getRandomNumByRule());
        }
        // this.createRandomTetris();
        this.isPlay = true;
    };
    /**是否死亡结束 */
    Tetris.prototype.isGameOver = function () {
        for (var _i = 0, _a = this.curBlockArray; _i < _a.length; _i++) {
            var block = _a[_i];
            if (block.row >= 0 && block.row < this.ROW && block.col >= 0 && block.col < this.COL && this.blocks[block.row][block.col] != null) {
                return true;
            }
        }
        return false;
    };
    /**游戏结束 */
    Tetris.prototype.overGame = function () {
        this.isOver = true;
        this.dispatchEvent(new egret.Event(EventName.GAME_OVER));
    };
    /**根据下标得到对应的方块位置 */
    Tetris.prototype.getPosByIndex = function (i, j) {
        return {
            x: j * this.BLOCK_WIDTH,
            y: i * this.BLOCK_HEIGHT
        };
    };
    /**以中心为锚点得到对应的方块位置 */
    Tetris.prototype.getCenterPosByIndex = function (i, j) {
        var topLeftPos = new Pos(-(this.ROW - 1) / 2 * this.BLOCK_HEIGHT, -(this.COL - 1) / 2 * this.BLOCK_WIDTH);
        return {
            x: topLeftPos.j + j * this.BLOCK_WIDTH,
            y: topLeftPos.i + i * this.BLOCK_HEIGHT
        };
    };
    /**得到当前的帧间隔(毫秒)*/
    Tetris.prototype.getIntervalTime = function () {
        // let curIntervalTime = this.INTERVAL - this.addSpeedCount * this.SPEED_INTERVAL;
        // if(curIntervalTime < this.MIN_INTERVAL){
        // 	curIntervalTime = this.MIN_INTERVAL;
        // }
        return this.interval;
    };
    //辅助增强逻辑
    /**设置是否为电脑AI */
    Tetris.prototype.setAI = function (isAI) {
        this.isAI = isAI;
    };
    /**设置AI的等级 [1, 3] 最低1级 最高3级*/
    Tetris.prototype.setAILevel = function (level) {
        if (level < 1) {
            level = 1;
        }
        else if (level > 3) {
            level = 3;
        }
        this.curAILevel = level;
    };
    /**设置是否为纯信息接收者 (只展现画面)*/
    Tetris.prototype.setReceiver = function (isReceiver) {
        this.isReceiver = isReceiver;
    };
    //向缓冲池添加命令
    Tetris.prototype.pushCmd = function (cmd, data) {
        var cmdData = {
            cmd: cmd,
            data: data
        };
        this.cmdArray.push(cmdData);
    };
    //摧毁
    Tetris.prototype.destroy = function () {
    };
    return Tetris;
}(eui.Component));
__reflect(Tetris.prototype, "Tetris", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=Tetris.js.map