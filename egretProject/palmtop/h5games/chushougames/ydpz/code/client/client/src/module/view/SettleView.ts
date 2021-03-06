class SettleView extends ZJ.ViewBase {
	public constructor() {
		super();
		this.skinName = "SettleViewSkin";//决定皮肤的显示
	}
	private SHOW_TIME = 3000;

	private gBg: eui.Group;
	private gWin: eui.Group;
	private gPing: eui.Group;
	private gLose: eui.Group;
	private bg: eui.Image;
	private big: eui.Image;
	private restart: eui.Button;
	private game: GameView;
	private friend: eui.Label;//朋友圈rank
	private phb: eui.Button;//排行榜  Button
	private model = MyCDM.instance;
	private dikuan:eui.Image;



	private winId: eui.BitmapLabel;
	private rank: eui.Label;
//本周最高分得分显示
	private weekscore:number;//最高分
	private weekScoreImg:eui.Image;
	private weekScore:eui.BitmapLabel;
//本周最高分缩小版
	private smallWeekScore:eui.BitmapLabel;
	private smallWeekScoreImg:eui.BitmapLabel;
//本次得分显示
	private score:number;
	private scoreBit: eui.BitmapLabel;//得分  Label
	private scoreImg:eui.Image;
	
	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}
	private initUI()
	{
		this.weekScoreImg.alpha = 0;
		this.weekScore.alpha = 0;
		this.scoreImg.alpha = 0;
		this.scoreBit.alpha = 0;
		this.smallWeekScore.alpha = 0;
		this.smallWeekScoreImg.alpha = 0;
	}
	protected childrenCreated(): void {
		super.childrenCreated();
		this.initUI();
		this.dikuan.alpha = 0.5;
		let black = ZJ.ShapeUtil.getRect(0x000000, 0.4, this.stage.stageWidth, this.stage.stageHeight);
		this.gBg.addChild(black);
		this.game = ZJ.UIManager.instance.openView(UIName.Game) as GameView;
		this.restart.addEventListener("touchTap", () => {
			
		    this.game.qiuB.alpha = 1;
			this.game.qiuS.alpha = 1;
			this.game.scoreBitLabel.alpha = 1;
			ZJ.UIManager.instance.destroyView(UIName.Settle)
			this.game.backUI();
			if(ModuleConfig.compile.danji)
			{
				this.game.backUI();
			}
			else
			{
				this.game.backUI();
					//发送11007
			MyCDM.instance.PlayAgain11007();//发起再来一局
					MyCDM.instance.OnData11007 = (data: any) => {//在来一局
			//this.nextG();
		if(data.result == 0)
		{
			//this.nextG();//显示匹配成功
			//ZJ.UIManager.instance.destroyView(UIName.Settle)
			console.log("成功");
		}
		else if(data.result == 1)
		{
			//告知玩家匹配失败，显示Log
			console.log("失败");

		}
		else if(data.result == 3)
		{
			//已经再来一局
			console.log("已经开始");
		}

		};
		//退出房间
		this.phb.addEventListener("touchTap", () => {
			ChushouSDK.instance.csExitGame();
		}, this)
	}
		}, this);

		



	}


	public setData(data: any) {
		this.score = data.score;
		this.weekscore = data.weekScore;
		this.friend = data.friendRank;//朋友圈排名
		this.rank = data.rank;//游戏排名
		if(data.score > data.weekScore)
		{
			//显示本周最佳
			this.weekScore.text = data.score.toString();
			this.weekScore.alpha = 1;
			this.weekScoreImg.alpha = 1;
		}
		else 
		{
			//显示本次得分和本周最佳
			this.scoreBit.text = this.score.toString();
			this.scoreImg.alpha = 1;
			this.scoreBit.alpha = 1;
			//本周最佳缩小
			this.smallWeekScore.text = this.score.toString();
			this.smallWeekScoreImg.alpha = 1;
			this.smallWeekScore.alpha = 1;

		}
		
	}

	public onDestroy(): number {
		super.onDestroy();
		return 0;
	}

}