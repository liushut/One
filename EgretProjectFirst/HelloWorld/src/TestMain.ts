/*
create by ls 20180623
 */
class TestMain extends egret.DisplayObjectContainer {//创建测试文档类
    public constructor()
    {
        super();//继承了必须记得
        console.log("修改了文档");

        //添加方块实例
        let rect:Rect = new Rect();
        this.addChild(rect);
        rect.type = RectType.NOCLICKABLE;
        rect.onClick();
    }
    
}