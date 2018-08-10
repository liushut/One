class TestView extends ZJ.ViewBase {

	private pa
	private pb
	private pc

	private btnFather: eui.Group
	private blueBtn: eui.Image

	public constructor() {
		super()

		this.skinName = "TestViewSkin"
	}


	protected childrenCreated(): void {
		super.childrenCreated();
		this.initA()
		this.initB()
		this.btnFather.scaleX = 0.5
		this.btnFather.scaleY = 0.5
		let bbb = new ZJ.Vector3(1, 2, 3)
		this.blueBtn.x = bbb.x
		this.blueBtn.y = bbb.y
		
		ZJ.UIManager.instance.openView(UIName.xxx).setData({
			a: 111,
			b: 222,
			c: 333
		})
		ZJ.UIManager.instance.destroyView();
 
		this.addEventListener(egret.Event.ENTER_FRAME, () => {
		}, this)
	}

	private initA() {

	}
	private initB() {

	}

	public setData(data: any) {
		this.pa = data.a
		this.pb = data.b
		let a = setInterval(() => {

		}, 200)
		setTimeout()

		let button: eui.Image
		button.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {

		}, this)
	}

	private updata() {

	}

	public onDestory(): number {
		clearInterval(a)
		this.removeEventListener(egret.Event.ENTER_FRAME, this.updata, this)
		return super.onDestroy()
	}
}