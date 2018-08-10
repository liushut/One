class LoadingView extends ZJ.ViewBase {
	public constructor() {
		super();
		this.skinName = "resource/eui_skins/view/LoadingView.exml"
	}

	private load1: eui.Label;
	private black: eui.Group;
	private bg7: eui.Group;
	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	private intervalID = 0;
	private ran1 = 0;
	private ran2 = 0;
	protected childrenCreated(): void {
		super.childrenCreated();

		// bg异步，先用黑色挡着。
		let black = ZJ.ShapeUtil.getRect(0x000, 1, this.stage.stageWidth, this.stage.stageHeight);
		this.black.addChild(black);

	}

	public onProgress(current: number, total: number): void {
		this.load1.text = Math.floor(current / total * 100) + "%";
	}

	public onDestroy(): number {
		super.onDestroy();

		clearInterval(this.intervalID);

		return 0;
	}
}