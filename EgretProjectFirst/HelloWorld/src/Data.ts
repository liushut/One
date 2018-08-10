class Data

{
    private static _rectWidth:number = 0;//方块宽度
    public static getRectWidth():number
    {
        if(Data._rectWidth == 0)
        {
         Data._rectWidth = egret.MainContext.instance.stage.stageWidth/4;
        }
        return Data._rectWidth;
    }

    private static _rectScore = 0;//分数
    private static _rectRow = 0;//行数
    public static getRectRow()
    {
        if(Data._rectRow == 0)
        Data._rectRow = Math.ceil(egret.MainContext.instance.stage.stageHeight/Data.getRectWidth()) + 1;
        return Data._rectRow;
    }

    public static getStateHeight()
    {
        return egret.MainContext.instance.stage.stageHeight;
    }
}