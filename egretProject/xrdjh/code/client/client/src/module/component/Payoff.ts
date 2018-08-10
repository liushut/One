class Payoff extends ZJ.ComponentBase {
	public constructor() {
		super();
		this.skinName = "PayoffSkin"
	}

	// ui控件
	private machine:eui.Image;
	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	// 变量
	protected childrenCreated(): void {
		super.childrenCreated();
		this.machine.visible = false;

		

	}

	public showMachine(isShow:boolean) {
		this.machine.visible = isShow;
	}

}