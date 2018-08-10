class Data
{
    private static _rectWidth:number = 0;//方块宽度
    private static _rectRow:number = 0;//总共行数
    public static _score:number = 0;//分数
    public static getRectWidth():number
    {
        if(Data._rectWidth == 0)
        {
            this._rectWidth = egret.MainContext.instance.stage.stageWidth/4;
        }
         
        return Data._rectWidth;
    }
    public static getRectRow():number
    {
        if(Data._rectRow == 0)
        {
            this._rectRow = Math.ceil(egret.MainContext.instance.stage.stageHeight/Data.getRectWidth())+1;
        }
        return Data._rectRow;//如果用this.  必须实例出来才可  静态属于类共有
        
    }
    public static getStageHeight()
    {
        return egret.MainContext.instance.stage.stageHeight;
    }
}