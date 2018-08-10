class SettleView extends ZJ.ViewBase {
	public constructor() {
		super();
		this.skinName = "SettleViewSkin"
	}
	private SHOW_TIME = 3000;

	private gBg: eui.Group;
	private gWin: eui.Group;
	private gPing: eui.Group;
	private gLose: eui.Group;
	private bg: eui.Image;
	private icon: eui.Image;
	private icon0:eui.Image;
	private icon3:eui.Image;
	private big: eui.Image;
	private restart: eui.Button;
	private score1: eui.BitmapLabel;
	private score2: eui.BitmapLabel;
	private zailai: eui.Image;
	private game: GameView;
	private score: eui.BitmapLabel;
	private friend:eui.BitmapLabel;
	private paiming:eui.BitmapLabel;
	private bzzj:eui.BitmapLabel;
	private phb:eui.Button;
	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	private toPlatform = "";
	private timeoutid = 0;
	protected childrenCreated(): void {
		super.childrenCreated();

		let black = ZJ.ShapeUtil.getRect(0x000000, 0.4, this.stage.stageWidth, this.stage.stageHeight);
		this.gBg.addChild(black);
		this.game = ZJ.UIManager.instance.openView(UIName.Game) as GameView;
		// egret.Tween.get(this.bg, { loop: true }).to({ rotation: 360 }, 7000);
		this.restart.addEventListener("touchTap", () => {
			let e = new egret.Event(EventName.Test);
			ZJ.EventManager.instance.dispatchEvent(e);
			ZJ.UIManager.instance.destroyView(UIName.Settle)
		}, this);
		this.phb.addEventListener("touchTap",()=>{
				ChushouSDK.instance.csExitGame()
		},this)

	}

	public setData(data:any){
		if(!ModuleConfig.compile.danji){
			if(data.weekTop<data.score){
				this.icon0.source="bzzj_png";
				this.icon3.visible=false;
				this.score.text=data.score.toString();
			}else if(data.weekTop>=data.score){
				this.icon0.source="bcdf_png";
				this.icon3.visible=true;
				this.score.text=data.score.toString();
				this.bzzj.text=data.weekTop.toString();
			}
			this.friend.text=data.friend.toString();
			this.paiming.text=data.paiming.toString();
		}else if(ModuleConfig.compile.danji){
			this.score.text=data.score.toString();
		}
	}
	// public setData(data:any){
	// 	this.score.text = data.score.toString();
	// }

	// private onBigClick(): void {

	// 	ZJ.UIManager.instance.destroyView(UIName.Settle);
	// 	//this.onTimeout();
	// }

	// private onTimeout(): void {
	// 	if (ModuleConfig.compile.danji) {
	// 		ZJ.EventManager.instance.dispatchEvent(new egret.Event(EventName.GAME_RESTART));
	// 		ZJ.UIManager.instance.destroyView(UIName.Settle)
	// 	}
	// 	else {
	// test
	// let e = new egret.Event(EventName.Test);
	// e.data = { log: this.toPlatform };
	// ZJ.EventManager.instance.dispatchEvent(e);
	// ZJ.UIManager.instance.destroyView(UIName.Settle)
	// 		sendResult(this.toPlatform);
	// 	}
	// }


	// public setData(data: any): void {
	// 	this.toPlatform = data.toPlatform;
	// 	if (data.win == 2) {
	// 		this.bg.source = "shenglidi_png";
	// 		this.icon.source = "shengli_png";
	// 	}
	// 	else if (data.win == 1) {
	// 		this.bg.source = "pingdi_png";
	// 		this.icon.source = "ping_png";
	// 	}
	// 	else {
	// 		this.bg.source = "shibaidi_png";
	// 		this.icon.source = "shibai_png";
	// 	}
	// 	this.score1.text = data.score1.toString();
	// 	this.score2.text = data.score2.toString();
	// 	// this.gWin.visible = data.win == 2;
	// 	// this.gPing.visible = data.win == 1;
	// 	// this.gLose.visible = data.win == 0;

	// 	this.timeoutid = setTimeout(() => {
	// 		this.onTimeout();
	// 	}, this.SHOW_TIME);
	// }


	public onDestroy(): number {
		super.onDestroy();
		// clearTimeout(this.timeoutid);
		// egret.Tween.removeTweens(this.bg);
		return 0;
	}

}