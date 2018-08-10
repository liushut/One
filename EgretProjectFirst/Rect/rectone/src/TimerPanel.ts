class TimerPanel extends egret.Sprite
{
    public constructor()
    {
        super();
        this.draw();
        this.creatTimer();
    }
    private _txt:egret.TextField;//文本变量
    private _timer:egret.Timer;//计时器对象
    private _num:number = 20;//记录的次数
    private _timers:number =20;//剩余的秒数
    //绘制
    private draw()
    {
        this._txt = new egret.TextField();
        this._txt.width = egret.MainContext.instance.stage.stageWidth;
        this._txt.y =  100;
        this._txt.textColor = 0xff0000;
        this._txt.textAlign = egret.HorizontalAlign.CENTER;
        this._txt.text = "20'00'";
        this.addChild(this._txt);
    }
    private creatTimer()
    {
        this._timer = new egret.Timer(1000,this._num);//1s 记录的次数
        this._timer.addEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
        this._timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.onTimerCom,this);
    }
    private onTimer()
    {
        this._timers -= 1;
        this._txt.text = this._timers + "'00'";

    }
    //时间到的回调
    private onTimerCom()
    {
        this._txt.text = "00'00'";
        this.dispatchEventWith("gameOver");
    }

    public start()//开始
    {
        this._txt.text = "20'00'";
        this._timer.reset();
        this._timers = 20;
        this._timer.start();
    }
    public stop()//暂停
    {
        this._timer.stop();
    }

}