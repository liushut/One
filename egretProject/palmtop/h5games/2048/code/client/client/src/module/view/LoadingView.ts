class LoadingView extends ZJ.ViewBase {
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

		let y = 500;

		//进度条
		let pb = new eui.ProgressBar();
		pb.skinName = "YYLoadingPBSkin";
		this.progress = pb;
		this.progress.width = 450;
		this.progress.height = 62;
		this.progress.minimum = 0;
		this.progress.maximum = 100;
		this.progress.horizontalCenter = 0;
		this.progress.y = y + 435;
		this.progress.scaleX = 1.3;
		this.progress.scaleY = 1.3;
		this.progress.labelFunction = (number, maxNumber) => {
			return number + "%";
		};
		this.addChild(this.progress);

		let ig = new eui.Image();
		ig.source = "load_img03_png";
		ig.horizontalCenter = 0;
		ig.y = y + 630;
		ig.width = 510;
		ig.height = 100;
		ig.alpha = 0.2;
		this.addChild(ig);

		this.load3 = new eui.Label();
		this.load3.text = "等待对手加入游戏..."
		this.load3.horizontalCenter = 0;
		this.load3.y = y + 660;
		this.load3.size = 40;
		this.load3.textColor = 0xffffff;
		this.addChild(this.load3);

		this.startCount();
	}

	private startCount(): void {
		this.intervalID = setInterval(() => {
			this.ran2 = Math.min(this.ran2 + Math.random() * 8 + 2, 99);
			// this.load2.text = Math.floor(this.ran2).toString() + "%";
			this.progress.value = Math.floor((this.ran1 + this.ran2) / 2);
		}, 200)
	}

	public onProgress(current: number, total: number): void {
		// this.load1.text = Math.floor(current / total * 100) + "%";
		this.ran1 = Math.floor(current / total * 100);
		this.progress.value = Math.floor((this.ran1 + this.ran2) / 2);
	}

	public onDestroy(): number {
		super.onDestroy();

		clearInterval(this.intervalID);
		// this.loadingAnim.pause();

		return 0;
	}
}