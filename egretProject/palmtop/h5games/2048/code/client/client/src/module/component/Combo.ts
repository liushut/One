class Combo extends eui.Component implements  eui.UIComponent{
	public comboLabel:eui.BitmapLabel;

	public constructor() {
		super();
		this.skinName = "ComboSkin";
	}

	public setCombo(combo:number){
		this.comboLabel.text = "X" + combo.toString();
	}


	public show(){
		this.scaleX = 0.5;
		this.scaleY = 0.5;

		let toTopTime = 350;
		let toNormalTime = 150;
		let waitTime = 500;
		let alphaUseTime = 500;
		egret.Tween.get(this).to({scaleX:1.1, scaleY:1.1, verticalCenter:this.verticalCenter - 250}, toTopTime).call(()=>{
			egret.Tween.get(this).to({scaleX:1,scaleY:1, verticalCenter:this.verticalCenter + 80}, toNormalTime).wait(waitTime).call(()=>{
				egret.Tween.get(this).to({alpha:0}, alphaUseTime).call(()=>{
					this.parent.removeChild(this)});
			}, this);
		}, this);
	}
}