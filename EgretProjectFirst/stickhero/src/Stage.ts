//自己写的背景类
class Stage extends egret.Sprite{
    private stageSprite:egret.Bitmap;//台阶图片    有需要得更换
    public constructor()
    {
        super();
        this.init();
    }
    private init()
    {
        let bg = new egret.Bitmap();
        bg.texture = RES.getRes("stage_png");
        bg.anchorOffsetX = bg.width / 2;
        this.addChild(bg);
        this.StageSprite = bg;
    }
    public set StageSprite(bg:egret.Bitmap)
    {
        this.stageSprite = bg;
    }
    public get StageSprite()
    {
        return this.stageSprite;
    }
}