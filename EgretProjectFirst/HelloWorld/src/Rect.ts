class Rect extends egret.Sprite{
    public constructor()
    {
        super();
        this.touchEnabled = true;
        this.darw();
    }
    private _colors:Array<number> = [0x000000,0xffffff,0xff0000,0x0000ff];//颜色数组
    private _currentColor:number//0 可以点击  黑色  1 不可以点击  白色
    private darw()//执行绘图操作
    {
        this.width = Data.getRectWidth();
        this.height = Data.getRectWidth();
        this.graphics.lineStyle(1,0x000000);
        this.graphics.beginFill(this._colors[this._currentColor]);
        this.graphics.drawRect(0,0,this.width,this.width);
        this.graphics.endFill();
    }
    private _type:string = RectType.NOCLICKABLE;//初始化为不可触摸
    public get type():string
    {
        return this._type;
    }
    public set type(type:string)
    {
        this._type = type;
        if(type != this._type)
        {
         if(this._type == RectType.CLICKABLE)
            {
            this._currentColor = 0;//可以点击
           }
        else 
          {
            this._currentColor = 1;//不可点击
          }
        this.darw();
        }
       
    }
public onClick():void 
{
    if(this._type == RectType.CLICKABLE)
    {
        this._currentColor = 3;
    }
    else 
    {
        this._currentColor = 2;
    }
    this.darw();
}
}