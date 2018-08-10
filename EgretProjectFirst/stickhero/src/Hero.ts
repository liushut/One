//自己的英雄类
class Hero extends egret.Sprite{
    public heroSprite:egret.Bitmap = new egret.Bitmap();//英雄图片
    public mcDataFactory:egret.MovieClipDataFactory;//处理movieclip动画
    public heroMC:egret.MovieClip;//片段
    public constructor(heroType: number)
    {
        super();
        this.init(heroType);
    }
    private init(heroType: number)
    {
        let herosprite = RES.getRes("hero0" + heroType);//图片
        let tempBit = new egret.Bitmap();
        tempBit.texture = herosprite;
        this.heroSprite = tempBit;
        this.animation(heroType);
    }

    public animation(heroType:number)
    {
        let movieJson = RES.getRes("hero" + heroType + "_json");//json
        let moviePng = RES.getRes("hero" + heroType + "_png");//图集

       let mcFactoty = new egret.MovieClipDataFactory(movieJson,moviePng);
       let mcHero = new egret.MovieClip(mcFactoty.generateMovieClipData("stay"));
       this.addChild(mcHero);
       mcHero.play(-1);
       this.anchorOffsetX = 0;
       this.anchorOffsetY = this.heroSprite.height / 2;

       this.mcDataFactory = mcFactoty;
       this.heroMC = mcHero;
    }
}