/**
 * 背景层
 */
class BgLayer extends egret.DisplayObjectContainer{
    private bg1: egret.Bitmap;
    private bg2: egret.Bitmap;

    public timer: egret.Timer;

    public constructor(bgMove:boolean)
    {
        super();
        this.init(bgMove)
    }
    private init(bgMove:boolean)
    {
        //当前屏幕大小
        let bgWidth = egret.MainContext.instance.stage.stageWidth;
        let bgHeight = egret.MainContext.instance.stage.stageHeight;

        //随机背景
        let bgIndex = Math.floor(Math.random()*5 + 1);
        let curBg = new egret.Bitmap();
        curBg.texture = RES.getRes("bg" + bgIndex+ "_jpg");
        this.addChild(curBg);
        this.bg1 = curBg;
        if(bgMove)
        {
           let bg2 = new egret.Bitmap();
           bg2.texture = RES.getRes("bg" + bgIndex + "_jpg");
           bg2.x = this.bg1.x + this.bg1.width;
           this.addChild(bg2);
           this.bg2 = bg2;
            //创建计时器
            let timer = new egret.Timer(1000/60,0);
            timer.addEventListener(egret.TimerEvent.TIMER,this.bgMove,this);
            this.timer = timer;
            this.timer.start();
        }
        //背景图2要添加月亮
        if(bgIndex == 2)
        {
            let moon = new egret.Bitmap();
            moon.texture = RES.getRes("moon_png");
            this.addChild(moon);
            moon.y = moon.height / 10;
        }
    }
    private bgMove()
    {
        let speed = 3;
        let bg1 = this.bg1;
        let bg2 = this.bg2;
        this.bg1.x -= speed;
        this.bg2.x -= speed;
        //背景循环   
        //如果完全出屏幕了
        if( bg1.x <= (-bg1.width) )
        {
            bg1.x = bg2.x + bg1.width;
        }
        else if(bg2.x <= (-bg2.width))
        {
            bg2.x = bg1.x + bg2.width;
        }
    }
}