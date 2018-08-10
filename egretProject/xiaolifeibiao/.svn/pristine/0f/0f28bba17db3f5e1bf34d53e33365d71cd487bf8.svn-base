class Player extends eui.Component implements eui.UIComponent {
	private G = 8500; // 重力 
	private V0_X = 400; // X初始速度
	private V0_Y = -1800; // Y初始速度
	public PLAYER_SCALE_MIN = 0.5; // 玩家图片压缩最小
	public PLAYER_TIME_MIN = 1000; // 压缩最小时需要时间（毫秒）
	private PLAYER_FORCE_MAX = 2.22; // 压缩最小时的最大力气倍数
	// private INTERVAL = 30; // 帧间隔（毫秒）
	private FLOOR_Y = 1510; // 地板（死亡高度）
	private JUMP_WIDTH_FIX = 10; // 跳跃宽度fix，防止踩空气
	private JUMP_FIRM = 0.4; // 站立部分超过该比例才站稳，否则掉落（新规则）
	private DROP_ROTATION_TIME = 500; // 站不稳掉落旋转动画时长
	private FUHUO_TIME = 2000; // 复活等待时长
	private LUODI_SCALE = [0.7, 4.4]; // luodi特效大小
	//动画
	private xuliTw: egret.MovieClip;	//蓄力动画
	private luodi: eui.Image;	//落地动画
	private PLAYER_LUODI = 400;	//落地动画播放时间 (毫秒)
	// private dieCry:eui.Image;	//死亡哭泣
	private ghost: eui.Image;	//死亡鬼魂
	private qilang: eui.Image;	//死亡水浪
	// private breathAnim: egret.MovieClip; //呼吸动画
	private db: dragonBones.EgretArmatureDisplay;
	private dbScaler: eui.Image;

	public constructor() {
		super();
		this.skinName = "PlayerSkin";
	}

	public img: eui.Image = null;
	public gMC: eui.Group = null;
	public gUp: eui.Group = null;
	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	private beginX = 0;
	public get scoreX(): number {
		return this.beginX
	}
	public set scoreX(value: number) {
		this.beginX = value
	}
	private beginY = 0;
	public get scoreY(): number {
		return this.beginY
	}
	private _isWin = false;
	public get isWin(): boolean {
		return this._isWin
	}
	public isPlayer1 = false;
	// private xuliSound: egret.Sound = null;
	// private xuliSoundChannel: egret.SoundChannel = null;
	private endX = 0;
	private endY = 0;
	private force = 0;
	private halfTime = 0;
	/**
	 * 0:不转 1:逆时针 2:顺时针
	 */
	private rotateDirect = 0;
	public playerData: PlayerData = new PlayerData();
	private _curPlateIndex = 0;
	public get curPlateIndex(): number {
		return this._curPlateIndex;
	}
	private intervalID = 0;
	private timeoutFuhuo = 0;
	private pastTime = 0;
	private _isPlaying = false;
	public get isPlaying(): boolean {
		return this._isPlaying;
	}
	private _isGameOver = false;
	public get isGameOver(): boolean {
		return this._isGameOver;
	}
	public set isGameOver(value: boolean) {
		this._isGameOver = value;
	}
	protected childrenCreated(): void {
		super.childrenCreated();
		this.img.visible = true;

		egret.startTick(this.onTick, this)
	}

	private time: number = 0;
	private onTick(timeStamp: number): boolean {
		if (this.isPlaying && !this.isGameOver) {
			let pass = timeStamp - this.time;

			this.pastTime += pass;
			let delta = this.pastTime / 1000;
			let V0_Y = this.V0_Y * this.force;
			let V0_X = this.V0_X * this.force;
			let y = V0_Y * delta + 0.5 * this.G * delta * delta;
			// y = Math.min(this.FLOOR_Y, y);
			let x = V0_X * delta;
			this.y = Math.min(this.FLOOR_Y, this.beginY + y);
			this.x = this.beginX + x;

			if (this.endX != 0 && this.endY != 0) {
				if (this.x > this.endX) {
					this.y = this.endY;
					this.x = this.endX;

					if (this.rotateDirect == 0) {
						this.beginX = this.x
						this.beginY = this.y
						if (this.curPlateIndex == ModuleConfig.WIN_INDEX - 1) {
							this._isWin = true;
							let e = new egret.Event(EventName.PLAYER_WIN);
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
	}

	private resetPos(): void {
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
	}

	public restart(): void {
		this.resetPos();
		this._curPlateIndex = 0;
	}

	private gameOver(): void {
		this.isGameOver = true;
		this.stopAnim();
		// this.breathAnim.gotoAndStop("die");
		// egret.Tween.get(this.gMC, {loop:true}).to({alpha:0},250).to({alpha:1},250)
		// let e = new egret.Event(EventName.PLAYER_DIE);
		// this.dispatchEvent(e);
		this.timeoutFuhuo = setTimeout(() => {
			egret.Tween.removeTweens(this.gMC)
			this.resetPos();
			this.x = this.beginX
			this.y = this.beginY
			let e = new egret.Event(EventName.PLAYER_FUHUO);
			this.dispatchEvent(e);
		}, this.FUHUO_TIME);
	}

	private stopJump(needEvent = true): void {
		this.pastTime = 0;
		this._isPlaying = false;

		if (this.rotateDirect != 0) {
			let rotation = 0;
			if (this.rotateDirect == 1) {
				rotation = -90;
			}
			else if (this.rotateDirect == 2) {
				rotation = 90;
			}

			this.rotateDirect = 0;
			// this.breathAnim.gotoAndStop("die");
			this.gameOver();

			egret.Tween.get(this.gMC).wait(100).to({ rotation: rotation, y: this.gMC.globalToLocal(0, this.FLOOR_Y + this.height * 0.7).y }, this.DROP_ROTATION_TIME).call(() => {
				this.playGhostAnim();
			}, this);
		} else {
			this.playBreath();
		}

		if (needEvent) {
			let e = new egret.Event(EventName.PLAYER_JUMP_END);
			this.dispatchEvent(e);
		}

	}


	public setData(data: PlayerData): void {
		this.playerData = data;
	}

	/**
	 * 必须先调用setData赋值
	 * return {endX: this.endX, bgTime: bgTime, V0_X: V0_X, V0_Y: V0_Y}
	 */
	public jump(imgScale: number, setX: number = -1, setY: number = -1): any {
		this.playJump();
		this._isPlaying = true;
		this.beginX = this.x;
		this.beginY = this.y;
		this.endX = 0;
		this.endY = 0;
		this.force = 0.1 + (1 - imgScale) / (1 - this.PLAYER_SCALE_MIN) * this.PLAYER_FORCE_MAX; // todo 根据forceTime改变force
		// console.log("this.force " + this.force);

		let V0_Y = this.V0_Y * this.force;
		let V0_X = this.V0_X * this.force;

		this.halfTime = -2 * V0_Y / this.G * 0.5;
		let bgTime = this.halfTime * 2;

		let num = this.playerData.plates.length;
		for (let i = this._curPlateIndex; i < num; ++i) {
			let y = this.playerData.plates[i].y;
			let result = ZJ.MathUtil.YiYuanErCi(0.5 * this.G, V0_Y, (this.beginY + this.height - y));
			// console.log("result: " + i);
			// console.log(result);
			let isBreak = false;
			for (let j = 0; j < result.length; ++j) {
				if (result[j] > this.halfTime) {
					let x = this.beginX + V0_X * result[j];
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

		let endY = this.endY;
		if (this.endX == 0) {
			let y = this.FLOOR_Y;
			let result = ZJ.MathUtil.YiYuanErCi(0.5 * this.G, V0_Y, (this.beginY + this.height - y));
			// console.log("result: " + i);
			// console.log(result);
			let isBreak = false;
			for (let j = 0; j < result.length; ++j) {
				if (result[j] > this.halfTime) {
					let x = this.beginX + V0_X * result[j];
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

		let jumpData = { endX: this.endX, endY: endY, bgTime: bgTime, V0_X: V0_X, V0_Y: V0_Y };

		return jumpData;
	}

	public isPlayingAnim = false;
	public playAnim(): void {
		if (!this.isPlayingAnim && !this._isWin) {
			this.isPlayingAnim = true;

			if (this.isPlayer1) {
				ZJ.AudioManager.Instance.play("xuli", 0)
			}
			this.playYasuo();
			this.playXuli();
		}
	}

	private imgScaleY = 1;
	public stopAnim(): number {
		if (this.isPlayer1) {
			ZJ.AudioManager.Instance.stop("xuli")
		}
		let imgScaleY = this.dbScaler.scaleY;
		egret.Tween.removeTweens(this.dbScaler);
		this.dbScaler.scaleY = 1;
		this.stopXuli();
		this.isPlayingAnim = false;
		this.imgScaleY = imgScaleY;
		return imgScaleY;
	}

	private playYasuo(): void {
		egret.Tween.get(this.dbScaler, { loop: true }).to({ "scaleY": this.PLAYER_SCALE_MIN }, this.PLAYER_TIME_MIN).to({ "scaleY": 1 }, this.PLAYER_TIME_MIN)
		this.db.animation.fadeIn(this.getAniNameByState("xuli")).timeScale = 1.25 * 1000 / this.PLAYER_TIME_MIN; // 1.25 是动画原播放秒数
	}

	public onDestroy(): void {
		egret.stopTick(this.onTick, this)
	}

	//蓄力动画
	private playXuli() {
		if (this.xuliTw == null) {
			ZJ.ResManager.instance.loadMovieClip("xuli", "xuli", (mc: egret.MovieClip) => {
				this.xuliTw = mc;
				this.xuliTw.x = this.width / 2;
				this.xuliTw.y = this.height;
				this.addChild(this.xuliTw);

				this.xuliTw.visible = true;
				this.xuliTw.play(-1);
			})
		}
		else {
			this.xuliTw.visible = true;
			this.xuliTw.play(-1);
		}
	}

	private stopXuli() {
		if (this.xuliTw != null) {
			this.xuliTw.stop();
			this.xuliTw.visible = false;
		}
	}

	//落地动画
	private playLuodi() {
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
		let scaleMin = this.LUODI_SCALE[0]
		let scaleMax = this.LUODI_SCALE[1]
		this.luodi.visible = true;
		this.luodi.scaleX = scaleMin;
		this.luodi.scaleY = scaleMin;
		this.luodi.alpha = 1;
		let scale1 = scaleMin + (scaleMax - scaleMin) * (1 - this.imgScaleY) / (1 - this.PLAYER_SCALE_MIN)
		egret.Tween.get(this.luodi).to({ "scaleY": scale1, "scaleX": scale1, "alpha": 0 }, this.PLAYER_LUODI, egret.Ease.sineOut);

		if (this.isWin) {
			this.db.animation.fadeIn("shengli")
			// ZJ.ResManager.instance.replaceDBSlotDisplay("bao1", "bao1"
			// 	, "头领先", "头胜利_", this.db.armature.getSlot("头领先"))
		}
		else {
			this.db.animation.fadeIn(this.getAniNameByState("luodi"), -1, 1).timeScale = 2.5
		}

		if (this.isPlayer1) {
			ZJ.AudioManager.Instance.stop("jump")
		}
	}

	//死亡动画
	private playGhostAnim() {
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
			this.ghost.scaleY = 1.5
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
			ZJ.AudioManager.Instance.play("tiaodaoci")
		}
	}

	public stopDieAnim() {
		// if(this.dieCry)
		// 	this.dieCry.visible = false;
		if (this.ghost)
			this.ghost.visible = false;
		if (this.qilang)
			this.qilang.visible = false;
	}

	/**
	 * 初始化呼吸动画, 参数代表第几个玩家
	 * @param player 1代表玩家1, 2代表玩家2
	 */
	public initDB(player: number) {
		// let mcName = "p" + player + "breath"
		// ZJ.ResManager.instance.loadMovieClip(mcName, "breath", (mc: egret.MovieClip) => {
		// 	this.breathAnim = mc;
		// 	this.breathAnim.scaleX = 1.5;
		// 	this.breathAnim.scaleY = 1.5;
		// 	this.gMC.addChild(this.breathAnim);
		// })
		let dbName = ""
		let armatureName = ""
		if (player == 1) {
			dbName = "bao1"
			armatureName = "bao1"
		}
		else {
			dbName = "bao2"
			armatureName = "bao2"
		}
		this.db = ZJ.ResManager.instance.loadDragonBones(dbName, armatureName)
		this.gMC.addChild(this.db);
		this.db.addEventListener(dragonBones.FrameEvent.FRAME_EVENT, (evt: dragonBones.FrameEvent) => {
			switch (evt.frameLabel) {
				case "luodi_end":
					this.playBreath()
					break;
			}
		}, this);
	}

	//呼吸动画
	public playBreath() {
		if (this.db != null) {
			// this.updateDBInternal();
			let stand = this.getAniNameByState("stand")
			this.db.animation.fadeIn(stand);
		}
	}

	// public stopBreath() {
	// 	if (this.db != null) {
	// 		this.db.animation.gotoAndStopByFrame("stand");
	// 	}
	// }

	public playJump() {
		if (this.db != null) {
			this.db.animation.fadeIn(this.getAniNameByState("jumppose"));
		}
	}

	private _state = 1;
	private _headName = ["头落后_", "头准备", "头领先"];
	/**
	 * @param state 2胜1平0负
	 */
	public updateDB(state: number) {
		if (state != this._state) {
			this._state = state;
			if (!this.isGameOver) {
				this.updateDBInternal();
			}
		}
	}

	private updateDBInternal() {
		if (this.db.animation.lastAnimationState) {
			let name = this.db.animation.lastAnimationName.split("_")[0];

			this.db.animation.gotoAndPlayByTime(this.getAniNameByState(name), this.db.animation.lastAnimationState.currentTime);
		}
		// ZJ.ResManager.instance.replaceDBSlotDisplay("bao1", "bao1"
		// 	, "头领先", this._headName[this._state], this.db.armature.getSlot("头领先"))
	}

	private getAniNameByState(name: string): string {
		let suffix = ""
		switch (this._state) {
			case 2:
				suffix = "_lingxian"
				break;
			case 0:
				suffix = "_luohou"
				break;
		}
		return name + suffix
	}
}
