class GroupRect extends egret.Sprite{
    public constructor()
    {
        super();
        this.createRects();
    }
    private _rects:Array<Rect>;//方块数组
    private _currentBlackIndex:number = 0;
    public _currentRow:number = 0;
    private createRects()//初始化方块组
    {
        this._rects = [];
        for(var i:number =0;i<4;i++)
        {
           let obj:Rect = new Rect();
           this._rects.push(obj);
           obj.x = i * Data.getRectWidth();
           this.addChild(obj);
           this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickRect,this);
        }
    }
    public createBlackRect()//创建黑方块
    {
        this.init();
        let tw = Math.random();
        if(tw >= 0 && tw < 0.25)
        {
            this._currentBlackIndex = 0;
        }
        else if(tw >= 0.25 && tw<0.5)
        {
            this._currentBlackIndex = 1;
        }
        else if(tw >= 0.5 && tw <0.75)
        {
            this._currentBlackIndex = 2;
        }
        else if(tw >= 0.75 && tw <= 1)
        {
            this._currentBlackIndex = 3;
        }
        this._rects[this._currentBlackIndex].type = RectType.CLICKABLE;//随机黑方块可以点击
    }
    public init()//全部初始化为不可点击状态
    {
        for(var i:number =0;i<4;i++)
        {
           this._rects[i].type = RectType.NOCLICKABLE;
        }
    }
    private onClickRect(e:egret.TouchEvent)//回调函数  点击之后的处理
    {
        e.target.onRectClick();//改变颜色
       if(e.target.type == RectType.NOCLICKABLE || this._currentRow != Data.getRectRow() - 2)//点击的是不可点击  或者 不是倒数第二行
       {
           //发出gameover事件
           this.dispatchEventWith("gameOver");
       }
       else
       {
           this.dispatchEventWith("clickRight")
       }
    }
    public move()//移动函数
    {
        this._currentRow++;//行数+1
        if(this._currentRow == Data.getRectRow())
        {
            this._currentRow = 0;
           this.createBlackRect();
        }
         this.y = this._currentRow * Data.getRectWidth();
    }
}