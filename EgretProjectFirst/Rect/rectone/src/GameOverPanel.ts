class GameOverPanel extends egret.Sprite
{
    public constructor()
    {
        super();
        this.draw();
        this.addEventListener(egret.Event.ADDED,this.showText,this);
    }
    private txt:egret.TextField;
    private draw()
    {
        var w = egret.MainContext.instance.stage.stageWidth;
        var h = egret.MainContext.instance.stage.stageHeight;
        this.graphics.beginFill(0x111111,0.5);
        this.graphics.drawRect(0,0,w,h);
        this.graphics.endFill();

        this.txt = new egret.TextField();
        this.txt.width = w;
        this.txt.height = 100;
        this.txt.textColor = 0xff0000;
        this.txt.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(this.txt);

        var btn = new egret.Sprite();
        btn.graphics.beginFill(0x0000ff);
        btn.graphics.drawRect(0,0,200,200);
        btn.graphics.endFill();
        btn.width = 200;
        btn.height = 100;
        btn.x = (w-200)/2;
        btn.y = (h-100)/2;
        this.addChild(btn);
        btn.touchEnabled = true;
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.startGame,this);
    }
    private startGame()
    {
        this.parent.removeChild(this);//当前面板移除
        this.dispatchEventWith("startGame");
    }
    private showText()//更新文本
    {
        this.txt.text = "点击了" + Data._score + "步";
    }
}