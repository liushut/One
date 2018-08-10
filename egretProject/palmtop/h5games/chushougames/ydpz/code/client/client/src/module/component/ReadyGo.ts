class ReadyGo extends eui.Component implements eui.UIComponent {
	private READY_TIME = 2000;
	private GO_TIME = 500;

	public constructor() {
		super();
		this.skinName = "ReadyGoSkin";
	}

	private ready: eui.Image;
	private go: eui.Image;
	public cb = null; // 结束callback
	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	protected childrenCreated(): void {
		super.childrenCreated();

	}

	public start(): void {
		this.stop();
		egret.Tween.get(this.ready).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 400).wait(500).to({ alpha: 0 }, 500).call(() => {
			egret.Tween.get(this.go).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 200).wait(300).to({ alpha: 0 }, 300).call(() => {
				if (this.cb != null) {
					this.cb();
				}
			}, this)
		}, this);
	}

	public stop(): void {
		egret.Tween.removeTweens(this.ready);
		egret.Tween.removeTweens(this.go);
		this.ready.alpha = 0;
		this.ready.scaleX = 0.8
		this.ready.scaleY = 0.8
		this.go.alpha = 0;
		this.go.scaleX = 2;
		this.go.scaleY = 2;
	}

	/**
	 * 销毁前调用
	 */
	public OnDestroy() {
		this.cb = null;
		this.stop();
	}

}