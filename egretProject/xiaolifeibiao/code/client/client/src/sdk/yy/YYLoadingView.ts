class YYLoadingView extends ZJ.ViewBase {
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

		let bg = new eui.Image();
		bg.source = "loading_bg_png";
		bg.height = 1920;
		// bg.width = 1080;
		bg.percentWidth = 100;
		this.addChild(bg);
		bg.horizontalCenter = 0;

		let x = -180;
		let y = 500;
		// let dx = 200;
		// let dy = 180;
		// let fontSize = 100;
		// let head1 = new eui.Image();
		// head1.source = "p1_png";
		// head1.horizontalCenter = x;
		// head1.y = y;
		// this.addChild(head1);

		// let head2 = new eui.Image();
		// head2.source = "p2_png";
		// head2.horizontalCenter = x;
		// head2.y = y + dy;
		// this.addChild(head2);

		// this.load1 = new eui.Label();
		// this.load1.horizontalCenter = x + dx;
		// this.load1.y = y;
		// this.load1.size = fontSize;
		// this.addChild(this.load1);

		// this.load2 = new eui.Label();
		// this.load2.horizontalCenter = x + dx;
		// this.load2.y = y + dy;
		// this.load2.size = fontSize;
		// this.addChild(this.load2);

		//加载帧动画
		// this.loadingAnim = new ImgAnim(['logo_1_png', 'logo_2_png', 'logo_3_png', 'logo_4_png', 'logo_5_png', 'logo_6_png',]);
		// this.loadingAnim.horizontalCenter = 0;
		// this.loadingAnim.y = y + 0;
		// this.loadingAnim.scaleX = 1.5;
		// this.loadingAnim.scaleY = 1.5;
		// this.addChild(this.loadingAnim);
		// this.loadingAnim.interval = 120;
		// this.loadingAnim.play();
		let gLangren = new eui.Group();
		this.addChild(gLangren);
		gLangren.horizontalCenter = 0;
		gLangren.y = y;
		ZJ.ResManager.instance.loadMovieClip("yylangren", "yylangren", (mc: egret.MovieClip) => {
			gLangren.addChild(mc);
			mc.scaleX = 1.5
			mc.scaleY = 1.5
			mc.x = -195
			mc.gotoAndPlay("tiao", -1)
		})

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