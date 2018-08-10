class Rect extends egret.Sprite
{
    public constructor()
    {
        super();
        this.touchEnabled = true;
        this.draw();
    }
    //绘制颜色  1 黑蓝   2白红 hei bai hong lan
    //颜色数值
    private _colors:Array<number> = [0x000000,0xffffff,0xff0000,0x0000ff];
    //当前显示颜色  数组下标
    private _currentColor:number = 1;
    private _type:string = RectType.NOCLICKABLE;//默认为不能被点击
    //绘制方法
    private draw()
    {
        let tw = Data.getRectWidth();
        this.width = 100;
        this.height =100;
        this.graphics.lineStyle(1,0x000000);
        this.graphics.beginFill(this._colors[this._currentColor]);
        this.graphics.drawRect(0,0,tw,tw);
        this.graphics.endFill();
    }
    public get type():string
    {
        return this._type;
    }
    public set type(e:string)
    {
        this._type = e;
        if(this._type == RectType.NOCLICKABLE)
        {
            this._currentColor = 1;
        }
        else
        {
            this._currentColor = 0;
        }
        this.draw();
       
    }
    public onRectClick()
    {
        if(this._type == RectType.NOCLICKABLE)
        {
            this._currentColor = 3;
        }
        else
        {
            this._currentColor = 2;
        }
        this.draw();
    }
}