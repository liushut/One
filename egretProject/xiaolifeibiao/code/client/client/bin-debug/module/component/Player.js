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
var Player = (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super.call(this) || this;
        _this.G = 8500; // 重力 
        _this.V0_X = 400; // X初始速度
        _this.V0_Y = -1800; // Y初始速度
        _this.PLAYER_SCALE_MIN = 0.5; // 玩家图片压缩最小
        _this.PLAYER_TIME_MIN = 1000; // 压缩最小时需要时间（毫秒）
        _this.PLAYER_FORCE_MAX = 2.22; // 压缩最小时的最大力气倍数
        // private INTERVAL = 30; // 帧间隔（毫秒）
        _this.FLOOR_Y = 1510; // 地板（死亡高度）
        _this.JUMP_WIDTH_FIX = 10; // 跳跃宽度fix，防止踩空气
        _this.JUMP_FIRM = 0.4; // 站立部分超过该比例才站稳，否则掉落（新规则）
        _this.DROP_ROTATION_TIME = 500; // 站不稳掉落旋转动画时长
        _this.FUHUO_TIME = 2000; // 复活等待时长
        _this.LUODI_SCALE = [0.7, 4.4]; // luodi特效大小
        _this.PLAYER_LUODI = 400; //落地动画播放时间 (毫秒)
        _this.img = null;
        _this.gMC = null;
        _this.gUp = null;
        _this.beginX = 0;
        _this.beginY = 0;
        _this._isWin = false;
        _this.isPlayer1 = false;
        // private xuliSound: egret.Sound = null;
        // private xuliSoundChannel: egret.SoundChannel = null;
        _this.endX = 0;
        _this.endY = 0;
        _this.force = 0;
        _this.halfTime = 0;
        /**
         * 0:不转 1:逆时针 2:顺时针
         */
        _this.rotateDirect = 0;
        _this.playerData = new PlayerData();
        _this._curPlateIndex = 0;
        _this.intervalID = 0;
        _this.timeoutFuhuo = 0;
        _this.pastTime = 0;
        _this._isPlaying = false;
        _this._isGameOver = false;
        _this.time = 0;
        _this.isPlayingAnim = false;
        _this.imgScaleY = 1;
        _this._state = 1;
        _this._headName = ["头落后_", "头准备", "头领先"];
        _this.skinName = "PlayerSkin";
        return _this;
    }
    Player.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    Object.defineProperty(Player.prototype, "scoreX", {
        get: function () {
            return this.beginX;
        },
        set: function (value) {
            this.beginX = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "scoreY", {
        get: function () {
            return this.beginY;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "isWin", {
        get: function () {
            return this._isWin;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "curPlateIndex", {
        get: function () {
            return this._curPlateIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "isPlaying", {
        get: function () {
            return this._isPlaying;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "isGameOver", {
        get: function () {
            return this._isGameOver;
        },
        set: function (value) {
            this._isGameOver = value;
        },
        enumerable: true,
        configurable: true
    });
    Player.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.img.visible = true;
        egret.startTick(this.onTick, this);
    };
    Player.prototype.onTick = function (timeStamp) {
        if (this.isPlaying && !this.isGameOver) {
            var pass = timeStamp - this.time;
            this.pastTime += pass;
            var delta = this.pastTime / 1000;
            var V0_Y = this.V0_Y * this.force;
            var V0_X = this.V0_X * this.force;
            var y = V0_Y * delta + 0.5 * this.G * delta * delta;
            // y = Math.min(this.FLOOR_Y, y);
            var x = V0_X * delta;
            this.y = Math.min(this.FLOOR_Y, this.beginY + y);
            this.x = this.beginX + x;
            if (this.endX != 0 && this.endY != 0) {
                if (this.x > this.endX) {
                    this.y = this.endY;
                    this.x = this.endX;
                    if (this.rotateDirect == 0) {
                        this.beginX = this.x;
                        this.beginY = this.y;
                        if (this.curPlateIndex == ModuleConfig.WIN_INDEX - 1) {
                            this._isWin = true;
                            var e = new egret.Event(EventName.PLAYER_WIN);
                            this.dispatchEvent(e);
                        }
                    }
                    this.stopJump();
                    this.playLuodi();
                }
            }
            else {
                if (this.y >= this.FLOOR_Y) {
                    if (this.endX != 0) {
                        this.x = Math.min(this.x, this.endX + 100); // 防止卡帧过远
                    }
                    this.stopJump();
                    this.gameOver();
                    this.playGhostAnim();
                }
            }
        }
        this.time = timeStamp;
        return true;
    };
    Player.prototype.resetPos = function () {
        clearTimeout(this.timeoutFuhuo);
        this._isWin = false;
        this.isPlayingAnim = false;
        this._isPlaying = false;
        this.isGameOver = false;
        this.gMC.rotation = 0;
        this.gMC.y = this.height;
        this.gMC.alpha = 1;
        this._state = 0;
        this.stopJump(false);
        this.stopDieAnim();
        this.playBreath();
    };
    Player.prototype.restart = function () {
        this.resetPos();
        this._curPlateIndex = 0;
    };
    Player.prototype.gameOver = function () {
        var _this = this;
        this.isGameOver = true;
        this.stopAnim();
        // this.breathAnim.gotoAndStop("die");
        // egret.Tween.get(this.gMC, {loop:true}).to({alpha:0},250).to({alpha:1},250)
        // let e = new egret.Event(EventName.PLAYER_DIE);
        // this.dispatchEvent(e);
        this.timeoutFuhuo = setTimeout(function () {
            egret.Tween.removeTweens(_this.gMC);
            _this.resetPos();
            _this.x = _this.beginX;
            _this.y = _this.beginY;
            var e = new egret.Event(EventName.PLAYER_FUHUO);
            _this.dispatchEvent(e);
        }, this.FUHUO_TIME);
    };
    Player.prototype.stopJump = function (needEvent) {
        var _this = this;
        if (needEvent === void 0) { needEvent = true; }
        this.pastTime = 0;
        this._isPlaying = false;
        if (this.rotateDirect != 0) {
            var rotation = 0;
            if (this.rotateDirect == 1) {
                rotation = -90;
            }
            else if (this.rotateDirect == 2) {
                rotation = 90;
            }
            this.rotateDirect = 0;
            // this.breathAnim.gotoAndStop("die");
            this.gameOver();
            egret.Tween.get(this.gMC).wait(100).to({ rotation: rotation, y: this.gMC.globalToLocal(0, this.FLOOR_Y + this.height * 0.7).y }, this.DROP_ROTATION_TIME).call(function () {
                _this.playGhostAnim();
            }, this);
        }
        else {
            this.playBreath();
        }
        if (needEvent) {
            var e = new egret.Event(EventName.PLAYER_JUMP_END);
            this.dispatchEvent(e);
        }
    };
    Player.prototype.setData = function (data) {
        this.playerData = data;
    };
    /**
     * 必须先调用setData赋值
     * return {endX: this.endX, bgTime: bgTime, V0_X: V0_X, V0_Y: V0_Y}
     */
    Player.prototype.jump = function (imgScale, setX, setY) {
        if (setX === void 0) { setX = -1; }
        if (setY === void 0) { setY = -1; }
        this.playJump();
        this._isPlaying = true;
        this.beginX = this.x;
        this.beginY = this.y;
        this.endX = 0;
        this.endY = 0;
        this.force = 0.1 + (1 - imgScale) / (1 - this.PLAYER_SCALE_MIN) * this.PLAYER_FORCE_MAX; // todo 根据forceTime改变force
        // console.log("this.force " + this.force);
        var V0_Y = this.V0_Y * this.force;
        var V0_X = this.V0_X * this.force;
        this.halfTime = -2 * V0_Y / this.G * 0.5;
        var bgTime = this.halfTime * 2;
        var num = this.playerData.plates.length;
        for (var i = this._curPlateIndex; i < num; ++i) {
            var y = this.playerData.plates[i].y;
            var result = ZJ.MathUtil.YiYuanErCi(0.5 * this.G, V0_Y, (this.beginY + this.height - y));
            // console.log("result: " + i);
            // console.log(result);
            var isBreak = false;
            for (var j = 0; j < result.length; ++j) {
                if (result[j] > this.halfTime) {
                    var x = this.beginX + V0_X * result[j];
                    // console.log("x: " + x);
                    // console.log("plates x: " + this.playerData.plates[i].x);
                    if (x > this.playerData.plates[i].x - this.width + this.JUMP_WIDTH_FIX
                        && x < this.playerData.plates[i].x + this.playerData.plates[i].width - this.JUMP_WIDTH_FIX) {
                        if (x < this.playerData.plates[i].x - (1 - this.JUMP_FIRM) * this.width + this.JUMP_WIDTH_FIX) {
                            //逆时针转动
                            this.rotateDirect = 1;
                            // isBreak = true;
                            // break;
                        }
                        else if (x > this.playerData.plates[i].x + this.playerData.plates[i].width - this.JUMP_FIRM * this.width - this.JUMP_WIDTH_FIX) {
                            //顺时针转动
                            this.rotateDirect = 2;
                            // isBreak = true;
                            // break;
                        }
                        else {
                            this._curPlateIndex = i;
                        }
                        this.endX = Math.floor(x);
                        this.endY = Math.floor(y - this.height);
                        bgTime = result[j];
                        // console.log("endX: " + this.endX);
                        // console.log("endY: " + this.endY);
                        isBreak = true;
                        break;
                        // }
                    }
                }
            }
            if (isBreak) {
                break;
            }
        }
        var endY = this.endY;
        if (this.endX == 0) {
            var y = this.FLOOR_Y;
            var result = ZJ.MathUtil.YiYuanErCi(0.5 * this.G, V0_Y, (this.beginY + this.height - y));
            // console.log("result: " + i);
            // console.log(result);
            var isBreak = false;
            for (var j = 0; j < result.length; ++j) {
                if (result[j] > this.halfTime) {
                    var x = this.beginX + V0_X * result[j];
                    // console.log("x: " + x);
                    // console.log("plates x: " + this.playerData.plates[i].x);
                    this.endX = Math.floor(x);
                    break;
                }
            }
        }
        if (setX != -1) {
            this.endX = setX;
        }
        if (setY != -1) {
            this.endY = setY;
        }
        var jumpData = { endX: this.endX, endY: endY, bgTime: bgTime, V0_X: V0_X, V0_Y: V0_Y };
        return jumpData;
    };
    Player.prototype.playAnim = function () {
        if (!this.isPlayingAnim && !this._isWin) {
            this.isPlayingAnim = true;
            if (this.isPlayer1) {
                ZJ.AudioManager.Instance.play("xuli", 0);
            }
            this.playYasuo();
            this.playXuli();
        }
    };
    Player.prototype.stopAnim = function () {
        if (this.isPlayer1) {
            ZJ.AudioManager.Instance.stop("xuli");
        }
        var imgScaleY = this.dbScaler.scaleY;
        egret.Tween.removeTweens(this.dbScaler);
        this.dbScaler.scaleY = 1;
        this.stopXuli();
        this.isPlayingAnim = false;
        this.imgScaleY = imgScaleY;
        return imgScaleY;
    };
    Player.prototype.playYasuo = function () {
        egret.Tween.get(this.dbScaler, { loop: true }).to({ "scaleY": this.PLAYER_SCALE_MIN }, this.PLAYER_TIME_MIN).to({ "scaleY": 1 }, this.PLAYER_TIME_MIN);
        this.db.animation.fadeIn(this.getAniNameByState("xuli")).timeScale = 1.25 * 1000 / this.PLAYER_TIME_MIN; // 1.25 是动画原播放秒数
    };
    Player.prototype.onDestroy = function () {
        egret.stopTick(this.onTick, this);
    };
    //蓄力动画
    Player.prototype.playXuli = function () {
        var _this = this;
        if (this.xuliTw == null) {
            ZJ.ResManager.instance.loadMovieClip("xuli", "xuli", function (mc) {
                _this.xuliTw = mc;
                _this.xuliTw.x = _this.width / 2;
                _this.xuliTw.y = _this.height;
                _this.addChild(_this.xuliTw);
                _this.xuliTw.visible = true;
                _this.xuliTw.play(-1);
            });
        }
        else {
            this.xuliTw.visible = true;
            this.xuliTw.play(-1);
        }
    };
    Player.prototype.stopXuli = function () {
        if (this.xuliTw != null) {
            this.xuliTw.stop();
            this.xuliTw.visible = false;
        }
    };
    //落地动画
    Player.prototype.playLuodi = function () {
        if (this.luodi == null) {
            this.luodi = new eui.Image();
            this.luodi.source = "luodi_png";
            this.luodi.width = 202;
            this.luodi.height = 22;
            this.luodi.anchorOffsetX = this.luodi.width / 2;
            this.luodi.anchorOffsetY = this.luodi.height / 2;
            this.luodi.x = this.width / 2;
            this.luodi.y = this.height;
            this.addChildAt(this.luodi, 0);
        }
        var scaleMin = this.LUODI_SCALE[0];
        var scaleMax = this.LUODI_SCALE[1];
        this.luodi.visible = true;
        this.luodi.scaleX = scaleMin;
        this.luodi.scaleY = scaleMin;
        this.luodi.alpha = 1;
        var scale1 = scaleMin + (scaleMax - scaleMin) * (1 - this.imgScaleY) / (1 - this.PLAYER_SCALE_MIN);
        egret.Tween.get(this.luodi).to({ "scaleY": scale1, "scaleX": scale1, "alpha": 0 }, this.PLAYER_LUODI, egret.Ease.sineOut);
        if (this.isWin) {
            this.db.animation.fadeIn("shengli");
            // ZJ.ResManager.instance.replaceDBSlotDisplay("bao1", "bao1"
            // 	, "头领先", "头胜利_", this.db.armature.getSlot("头领先"))
        }
        else {
            this.db.animation.fadeIn(this.getAniNameByState("luodi"), -1, 1).timeScale = 2.5;
        }
        if (this.isPlayer1) {
            ZJ.AudioManager.Instance.stop("jump");
        }
    };
    //死亡动画
    Player.prototype.playGhostAnim = function () {
        // if(this.dieCry == null){
        // 	this.dieCry = new eui.Image();
        // 	this.dieCry.source= "jues_png";
        // 	this.dieCry.width = this.width;
        // 	this.dieCry.height = this.height;
        // 	this.dieCry.anchorOffsetX = this.dieCry.width / 2;
        // 	this.dieCry.anchorOffsetY = this.dieCry.height / 2;
        // 	this.dieCry.x = this.width / 2;
        // 	this.dieCry.y = this.height / 2;
        // 	this.addChildAt(this.dieCry, 1);
        // }
        if (this.ghost == null) {
            this.ghost = new eui.Image();
            this.ghost.source = "linghun_png";
            this.ghost.width = 142;
            this.ghost.height = 165;
            this.ghost.scaleX = 1.5;
            this.ghost.scaleY = 1.5;
            this.ghost.anchorOffsetX = this.ghost.width / 2;
            this.ghost.anchorOffsetY = this.ghost.height / 2;
            this.gUp.addChildAt(this.ghost, 2);
        }
        if (this.qilang == null) {
            this.qilang = new eui.Image();
            this.qilang.source = "qilang_png";
            this.qilang.width = 272;
            this.qilang.height = 89;
            this.qilang.anchorOffsetX = this.qilang.width / 2;
            this.qilang.anchorOffsetY = this.qilang.height / 2;
            this.qilang.scaleX = 1.5;
            this.qilang.scaleY = 1.5;
            this.gUp.addChildAt(this.qilang, 3);
        }
        this.ghost.x = this.gMC.x;
        this.ghost.y = this.gMC.y;
        this.qilang.x = this.gMC.x;
        this.qilang.y = this.gMC.y;
        // this.dieCry.visible = true;
        this.ghost.visible = true;
        this.qilang.visible = true;
        this.ghost.alpha = 1;
        egret.Tween.get(this.ghost).to({ "y": this.gMC.y - 150, "alpha": 0 }, 500, egret.Ease.sineIn);
        this.qilang.alpha = 1;
        egret.Tween.get(this.qilang).to({ "alpha": 0 }, 200);
        // 播放死亡效果
        this.db.animation.fadeIn("daku");
        // ZJ.ResManager.instance.replaceDBSlotDisplay("bao1", "bao1"
        // 	, "头领先", "头死亡", this.db.armature.getSlot("头领先"))
        // egret.Tween.get(this.gMC, { loop: true }).to({ alpha: 0 }, 250).to({ alpha: 1 }, 250)
        if (this.isPlayer1) {
            ZJ.AudioManager.Instance.play("tiaodaoci");
        }
    };
    Player.prototype.stopDieAnim = function () {
        // if(this.dieCry)
        // 	this.dieCry.visible = false;
        if (this.ghost)
            this.ghost.visible = false;
        if (this.qilang)
            this.qilang.visible = false;
    };
    /**
     * 初始化呼吸动画, 参数代表第几个玩家
     * @param player 1代表玩家1, 2代表玩家2
     */
    Player.prototype.initDB = function (player) {
        var _this = this;
        // let mcName = "p" + player + "breath"
        // ZJ.ResManager.instance.loadMovieClip(mcName, "breath", (mc: egret.MovieClip) => {
        // 	this.breathAnim = mc;
        // 	this.breathAnim.scaleX = 1.5;
        // 	this.breathAnim.scaleY = 1.5;
        // 	this.gMC.addChild(this.breathAnim);
        // })
        var dbName = "";
        var armatureName = "";
        if (player == 1) {
            dbName = "bao1";
            armatureName = "bao1";
        }
        else {
            dbName = "bao2";
            armatureName = "bao2";
        }
        this.db = ZJ.ResManager.instance.loadDragonBones(dbName, armatureName);
        this.gMC.addChild(this.db);
        this.db.addEventListener(dragonBones.FrameEvent.FRAME_EVENT, function (evt) {
            switch (evt.frameLabel) {
                case "luodi_end":
                    _this.playBreath();
                    break;
            }
        }, this);
    };
    //呼吸动画
    Player.prototype.playBreath = function () {
        if (this.db != null) {
            // this.updateDBInternal();
            var stand = this.getAniNameByState("stand");
            this.db.animation.fadeIn(stand);
        }
    };
    // public stopBreath() {
    // 	if (this.db != null) {
    // 		this.db.animation.gotoAndStopByFrame("stand");
    // 	}
    // }
    Player.prototype.playJump = function () {
        if (this.db != null) {
            this.db.animation.fadeIn(this.getAniNameByState("jumppose"));
        }
    };
    /**
     * @param state 2胜1平0负
     */
    Player.prototype.updateDB = function (state) {
        if (state != this._state) {
            this._state = state;
            if (!this.isGameOver) {
                this.updateDBInternal();
            }
        }
    };
    Player.prototype.updateDBInternal = function () {
        if (this.db.animation.lastAnimationState) {
            var name_1 = this.db.animation.lastAnimationName.split("_")[0];
            this.db.animation.gotoAndPlayByTime(this.getAniNameByState(name_1), this.db.animation.lastAnimationState.currentTime);
        }
        // ZJ.ResManager.instance.replaceDBSlotDisplay("bao1", "bao1"
        // 	, "头领先", this._headName[this._state], this.db.armature.getSlot("头领先"))
    };
    Player.prototype.getAniNameByState = function (name) {
        var suffix = "";
        switch (this._state) {
            case 2:
                suffix = "_lingxian";
                break;
            case 0:
                suffix = "_luohou";
                break;
        }
        return name + suffix;
    };
    return Player;
}(eui.Component));
__reflect(Player.prototype, "Player", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=Player.js.map