//棍子类
class Stick extends egret.Sprite{
    private growRate:number;
    private stageWidth:number;
    private stageHeight:number;
    public stickSprite:egret.Bitmap = new egret.Bitmap();
    public timer:egret.Timer;
    public constructor(kind:number)
    {
        super();
        this.init(kind);
    }
    private init(kind:number)
    {
        this.stageWidth = egret.MainContext.instance.stage.stageWidth;
        this.stageHeight = egret.MainContext.instance.stage.stageHeight;
        this.growRate = 6;
        // let sprite = this.stickSprite;
        // let  timer = new egret.Timer(1000/60,0);
        //锚点为右下角然后旋转
        if(kind == 1)
        {
            let sprite = new egret.Bitmap();
            sprite.texture = RES.getRes("stick1_png");
            this.addChild(sprite);
            sprite.scaleX = 2;
            sprite.anchorOffsetX = sprite.width;
            sprite.anchorOffsetY = sprite.height;
            this.stickSprite = sprite;
            let  timer = new egret.Timer(1000/60,0);
            timer.addEventListener(egret.TimerEvent.TIMER,this.growHeight,this);
            this.timer = timer;
        }
        else if(kind == 2)
        {
            let sprite  = new egret.Bitmap();
            sprite.texture = RES.getRes("lovered_png");
            this.addChild(sprite);
            sprite.width = 5;
            sprite.height = 5;
            sprite.scaleX = 3;
            this.stickSprite = sprite;

            let  timer = new egret.Timer(1000/60,0);
            timer.addEventListener(egret.TimerEvent.TIMER,this.growWidth,this);
            this.timer = timer;
        }
        //   this.timer = timer;
        //   this.addChild(sprite);
    }
    private growHeight()
    {
        //如果超过屏幕一半  停止
        let dis = this.scaleY * this.stickSprite.height;
        if(dis >= this.stageHeight / 2)
        {
            console.log("超出屏幕一半");
            return;
        }
        this.scaleY += this.growRate;
        console.log("在屏幕Y之内");
    }
    private growWidth()
    {
        if(this.stickSprite.width * this.scaleX >= this.stageWidth / 2)
        {
            console.log("x超出屏幕一半");
            return;
        }
        this.scaleX += this.growRate;
        console.log("在屏幕x之内")
    }
}