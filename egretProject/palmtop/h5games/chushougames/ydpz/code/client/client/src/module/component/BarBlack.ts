class BarBlack extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
		this.skinName = "BarBlackSkin";
	}
	public barblack:eui.Image;
	protected childrenCreated(){
		 //egret.Tween.get(this.arrow, { loop: true }).to({ rotation: 360 }, 2000);
	}
}