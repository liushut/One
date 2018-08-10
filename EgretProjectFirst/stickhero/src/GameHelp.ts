//道具类  
class GameHelp extends egret.Sprite{

    private stageW:number;
    private stageH:number;

    public toolTips:egret.Bitmap;//工具提示
    public scoreLabel:egret.TextField;//分数
    private toolNumLabel:egret.TextField;//工具个数
    private revivalNumLabel:egret.TextField;//复活次数

    private toolBg:egret.Bitmap;//工具背景
    public usingTool:boolean = false;//是否使用道具
    public constructor()
    {
        super();
        this.stageH = egret.MainContext.instance.stage.stageHeight;
        this.stageW = egret.MainContext.instance.stage.stageWidth;
        this.init();
        
    }
    private init()
    {
        var stageW = this.stageW;
        var stageH = this.stageH;
        // 分数背景
        var scoreBg = new egret.Bitmap();
        scoreBg.texture = RES.getRes("scoreBg_png");
        this.addChild(scoreBg);
        scoreBg.anchorOffsetX = scoreBg.width/2;
        scoreBg.x = this.stageW/2;
        scoreBg.y = scoreBg.height/2;
          // 初始分数标签
        let scoreLabel = new egret.TextField();
        this.addChild(scoreLabel);
        scoreLabel.x = scoreBg.x;
        scoreLabel.y = scoreBg.y + scoreBg.height/2;
        scoreLabel.size = 100;
        scoreLabel.textAlign = "center";
        scoreLabel.text = "0";
        scoreLabel.anchorOffsetX = scoreLabel.width/2;
        scoreLabel.anchorOffsetY = scoreLabel.height/2;
        this.scoreLabel = scoreLabel;
        console.log("this.scoreLabel创建")
    }
}