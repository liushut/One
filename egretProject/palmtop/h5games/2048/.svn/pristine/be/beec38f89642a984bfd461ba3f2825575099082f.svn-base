class FlyBlock extends eui.Component implements eui.UIComponent{
	public constructor() {
		super();
		this.skinName = "FlyBlockSkin";

		for(let i=0;i<this.moveTimeArray.length;i++){
            this.moveTotalTime += this.moveTimeArray[i];
        }
	}

	//控件
	public ball:eui.Group;
	public tail:eui.Image;
    public light_point:eui.Image;
    public ball_block:eui.Image;
	public posArray:Array<ZJ.Vector3> = [];

	//变量
	private curIndex = 0;
    // private rotateArray:Array<number> = [-28, -45, -90, -135, -160];
    public rotateArray:Array<number> = [-105, -105];
    // private moveTimeArray:Array<number> = [0, 90, 100, 80, 40];
    private moveTimeArray:Array<number> = [0, 320]; //320
    private moveTotalTime:number=0;

    private particleSystem:particle.GravityParticleSystem;
    public callBack = null;

	public play(pArray:Array<ZJ.Vector3>, particleSystem:particle.GravityParticleSystem, hasBlock:boolean=true){
        this.particleSystem = particleSystem;
        //完成动画初始化
		this.posArray = pArray;
        this.ball.visible = true;
        this.tail.scaleY = 0.1;
        this.tail.visible = true;
        this.tail.source = "tail_png";
        this.light_point.visible = true;
		this.horizontalCenter = this.posArray[0].x;
		this.verticalCenter = this.posArray[0].y;
        this.rotation = this.rotateArray[0];
        let array:Array<string> = ["J","L","Z","S","T","O","I"];
        if(hasBlock){
            this.ball_block.source = "block_"+array[ZJ.MathUtil.randomRange(0,array.length)] + "_png";
            this.ball_block.scaleX = 0;
            this.ball_block.scaleY = 0;
            this.ball_block.rotation = 0;
            this.ball_block.visible = true;
            egret.Tween.get(this.ball_block).to({scaleX:1,scaleY:1}, this.moveTimeArray[1]);
            egret.Tween.get(this.ball_block).to({rotation:150}, this.moveTotalTime);
        }
        this.particleSystem.emitterX = this.posArray[0].x;
        this.particleSystem.emitterY = this.posArray[0].y;
        this.particleSystem.start();
        this.moveNextPos();
    }


	private moveNextPos(){
        this.curIndex++;
        if(this.curIndex >= this.posArray.length){
            this.light_point.visible = false;
            this.ball_block.visible = false;
            setTimeout(()=>{
                this.tail.visible = false;
            }, 50);
            if(this.callBack != null){
                this.callBack(this.ball);
            }
            this.particleSystem.stop();
        }else{
			let posGroup = this.posArray[this.curIndex];
            egret.Tween.get(this.particleSystem).to({emitterX:posGroup.x,emitterY:posGroup.y}, this.moveTimeArray[this.curIndex]);
            egret.Tween.get(this).to({horizontalCenter:posGroup.x,verticalCenter:posGroup.y, rotation:this.rotateArray[this.curIndex]}, this.moveTimeArray[this.curIndex]).call(()=>{
                this.moveNextPos();
            });
            if(this.curIndex == 1){
                egret.Tween.get(this.tail).to({scaleY:1}, this.moveTimeArray[this.curIndex] / 2);
            }
            // else if(this.curIndex == 2){
            //     this.tail.source = "tail2_png";
            // }
        }
    }
}