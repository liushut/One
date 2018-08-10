class ChushouLoadingView extends ZJ.ViewBase {
	public constructor() {
		super();
	}

	private load1: eui.Label;
	private load2: eui.Label;
	private progress: eui.ProgressBar;
	private load3: eui.Label;
	// private loadingAnim: ImgAnim;
	private intervalID = 0;
	private ran1 = 0;
	private ran2 = 0;
	protected childrenCreated(): void {
		super.childrenCreated();

		// bg异步，先用黑色挡着。
		let black = ZJ.ShapeUtil.getRect(0x000, 1, this.stage.stageWidth, this.stage.stageHeight);
		this.addChild(black);

	}

	private startCount(): void {
		this.intervalID = setInterval(() => {
			this.ran2 = Math.min(this.ran2 + Math.random() * 8 + 2, 99);
			// this.load2.text = Math.floor(this.ran2).toString() + "%";
			this.progress.value = Math.floor((this.ran1 + this.ran2) / 2);
		}, 200)
	}

	private SEND_PROGRESS = 10; // progress改变多少次发协议，可根据加载资源量调整
	private progressIndex = 0; // 当前progress记数
	public onProgress(current: number, total: number): void {
		// this.load1.text = Math.floor(current / total * 100) + "%";
		// this.ran1 = Math.floor(current / total * 100);
		// this.progress.value = Math.floor((this.ran1 + this.ran2) / 2);
		if (this.progressIndex == this.SEND_PROGRESS - 1) {
			ChushouSDK.instance.csNotifyLoadProgress(current / total * 100)
		}
		this.progressIndex = ++this.progressIndex % this.SEND_PROGRESS;
	}

	public onDestroy(): number {
		super.onDestroy();

		return 0;
	}
}