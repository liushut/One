class MyButton extends ZJ.ComponentBase{
	public img:eui.Image;
	public label:eui.Label;

	public constructor() {
		super();

		this.addEventListener("touchBegin", ()=>{
			this.img.visible = false;
		}, this);

		this.addEventListener("touchEnd", ()=>{
			this.img.visible = true;
		}, this);

		this.addEventListener("touchReleaseOutside", ()=>{
			this.img.visible = true;
		}, this);
	}
}