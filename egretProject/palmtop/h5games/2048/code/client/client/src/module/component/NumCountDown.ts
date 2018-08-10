class NumCountDown extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
		this.skinName = "NumCountDownSkin";
	}

	private label: eui.Label;
	public cb = null; // 结束callback
	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	private leftSecond = 0;
	private intervalID = 0;
	private isPause = false;
	protected childrenCreated(): void {
		super.childrenCreated();
	}

	public start(second: number): void {
		this.stop();
		this.isPause = false;
		this.leftSecond = second;
		this.count();
		this.intervalID = setInterval(() => { this.count() }, 1000);
	}

	public pause(): void {
		this.isPause = true;
	}

	public stop(): void {
		this.label.text = "";
		clearInterval(this.intervalID);
	}

	private count(): void {
		this.label.text = this.leftSecond.toString();

		if (this.leftSecond == 0) {
			this.stop();
			if (this.cb != null) {
				this.cb();
			}
			return;
		}
		if (this.isPause) {
			return;
		}

		this.leftSecond--;
	}

	/**
	 * 销毁前调用
	 */
	public OnDestroy() {
		this.cb = null;
		this.stop();
	}

}