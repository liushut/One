class ScratchView extends ZJ.ViewBase {
	public constructor() {
		super();
		this.skinName = "ScratchViewSkin"
	}

	// private mcFactory: egret.MovieClipDataFactory
	private mcIn: egret.MovieClip
	// private mcOut: egret.MovieClip
	private gMcIn: eui.Group
	// private gMcOut: eui.Group
	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	private _data: any = null;
	private _isIn = false;
	protected childrenCreated(): void {
		super.childrenCreated();

		ZJ.ResManager.instance.loadMovieClip("scratch", "scratch", (mc: egret.MovieClip, mcFactory: egret.MovieClipDataFactory) => {
			this.mcIn = mc;
			this.mcIn.addEventListener(egret.Event.COMPLETE, (e: egret.Event) => {
				if (this._isIn) {
					this._isIn = false;
					this.mcIn.rotation = 180
					this.mcIn.gotoAndPlay("out", 1);
					if (this._data.customFunc) {
						this._data.customFunc();
					} else {
						ZJ.UIManager.instance.openView(this._data.to)
						ZJ.UIManager.instance.destroyView(this._data.from)
					}
				}
				else {
					ZJ.UIManager.instance.destroyView(UIName.Scratch)
				}
			}, this);
			// this.mcFactory = mcFactory;

			this.mcIn.scaleX = 12
			this.mcIn.scaleY = 12
			this.gMcIn.addChild(this.mcIn)

			this.setData(this._data);
		})

	}

	/**
	 * @param data {from:销毁界面,to:打开界面,customFunc:自定义处理}
	 */
	public setData(data: any): void {
		this._data = data;
		if (this._data && this.mcIn) {
			this._isIn = true;
			this.mcIn.rotation = 0
			this.mcIn.gotoAndPlay("in", 1);
		}
	}

	public onDestroy(): number {
		super.onDestroy();

		return 0;
	}
}