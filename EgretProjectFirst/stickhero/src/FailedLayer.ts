class FailedLayer extends egret.Sprite{
    public constructor()
    {
        super();
        this.init();
    }
    private shareTips:ShareTips;
    private stageH:number = 0;
    private stageW:number = 0;
    private init()
    {
        this.stageW = egret.MainContext.instance.stage.stageWidth;
        this.stageH = egret.MainContext.instance.stage.stageHeight;
        this.setUI();
    }
    //设置UI
    private setUI()
    {
        let stageW = this.stageW;
        let stageH = this.stageH;
        let currentScore = GameManager.getCurScore();

        //绘制背景。
        let shp:egret.Shape = new egret.Shape();
        shp.graphics.beginFill( 0x000000, 0.7);
        shp.graphics.drawRect( 0, 0, stageW, stageH );
        shp.graphics.endFill();
        this.addChild(shp);


         //添加成绩背景
        let scoreBg = new egret.Bitmap();
        scoreBg.texture = RES.getRes("uires_3_png");
        scoreBg.anchorOffsetX = scoreBg.width / 2;
        scoreBg.anchorOffsetY = scoreBg.height / 2;
        scoreBg.x = stageW / 2;
        scoreBg.y = scoreBg.height * 1.3;
        this.addChild(scoreBg);
        //添加结束标题
        let title = new egret.Bitmap();
        title.texture = RES.getRes("uires_9_png");
        title.anchorOffsetX = title.width / 2;
        title.anchorOffsetY = title.height / 2;
        title.x = stageW / 2;
        title.y = title.height * 1.5;
        this.addChild(title);

       

        //添加当前分数标签
        let curScoreLabel = new egret.TextField();
        this.addChild(curScoreLabel);
        curScoreLabel.x = scoreBg.x;
        curScoreLabel.y = scoreBg.y - scoreBg.height / 8;
        curScoreLabel.size = 110;
        curScoreLabel.textAlign = "center";
        curScoreLabel.text = ""+ currentScore;
        curScoreLabel.anchorOffsetX = curScoreLabel.width / 2;
        curScoreLabel.anchorOffsetY = curScoreLabel.height / 2;

        //添加最佳分数标签
        let maxScoreLabel = new egret.TextField();
        this.addChild(maxScoreLabel);
        maxScoreLabel.x = scoreBg.x - scoreBg.width/8;
        maxScoreLabel.y = scoreBg.y + scoreBg.height*5/16;
        maxScoreLabel.size = 100;
        maxScoreLabel.textColor = 0x000000;
        maxScoreLabel.textAlign = "center";

        //先获取存档的分数
        let maxScoreStr = egret.localStorage.getItem("maxScore");
        let maxScore = Number(maxScoreStr);
        maxScoreLabel.text = "" + maxScore;
        maxScoreLabel.anchorOffsetX = maxScoreLabel.width / 2;
        maxScoreLabel.anchorOffsetY = maxScoreLabel.height / 2;

        //添加排名标签
        let rankLabel = new egret.TextField();
        this.addChild(rankLabel);
        rankLabel.x = scoreBg.x + scoreBg.width / 8;
        rankLabel.y = scoreBg.y + scoreBg.height * 5 / 16;
        rankLabel.size = 50;
        rankLabel.textColor = 0x000000;
        rankLabel.textAlign = "center";
        rankLabel.anchorOffsetX = rankLabel.width / 2;
        rankLabel.anchorOffsetY = rankLabel.height / 2;
          if(maxScore < currentScore)
        {
            maxScore = currentScore;
            egret.localStorage.setItem("maxScore",maxScore.toString());
            rankLabel.text = "1";
        }
        else if(currentScore < maxScore)
        {
             rankLabel.text = "比上次成绩差";
        }

        //添加分享微信
        let wechat = new egret.Bitmap;
        wechat.texture = RES.getRes("weixinhaoyou_png");
        this.addChild(wechat);
        wechat.anchorOffsetX = wechat.width/2;
        wechat.anchorOffsetY = wechat.height/2;
        wechat.x = stageW / 4;
        wechat.y = stageH / 2;
        wechat.touchEnabled = true;
        wechat.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.shareBtnCallback, this);
        wechat.addEventListener(egret.TouchEvent.TOUCH_END, this.shareBtnCallback, this);
        wechat.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.shareBtnCallback, this);

        let shareBtn2 = new egret.Bitmap();
        shareBtn2.texture = RES.getRes("weixinpyquan_png");
        this.addChild(shareBtn2);
        shareBtn2.anchorOffsetX = shareBtn2.width/2;
        shareBtn2.anchorOffsetY = shareBtn2.height/2;
        shareBtn2.x = stageW*0.75;
        shareBtn2.y = stageH/2;
        shareBtn2.touchEnabled = true;
        shareBtn2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.shareBtnCallback, this);
        shareBtn2.addEventListener(egret.TouchEvent.TOUCH_END, this.shareBtnCallback, this);
        shareBtn2.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.shareBtnCallback, this);
         //  添加返回主菜单按钮
        var homeBtn = new egret.Bitmap();
        homeBtn.texture = RES.getRes("uires_8_png");
        this.addChild(homeBtn);
        homeBtn.anchorOffsetX = homeBtn.width/2;
        homeBtn.anchorOffsetY = homeBtn.height/2;
        homeBtn.x = stageW/6;
        homeBtn.y = stageH/2 + homeBtn.height*1.5;
        homeBtn.touchEnabled = true;
        homeBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.homeBtnCallback, this);
        homeBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.homeBtnCallback, this);
        homeBtn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.homeBtnCallback, this);
          var restartBtn = new egret.Bitmap();
        restartBtn.texture = RES.getRes("uires_5_png");
        this.addChild(restartBtn);
        restartBtn.anchorOffsetX = restartBtn.width/2;
        restartBtn.anchorOffsetY = restartBtn.height/2;
        restartBtn.x = stageW*5/6;
        restartBtn.y = homeBtn.y;
        restartBtn.touchEnabled = true;
        restartBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.restartBtnCallback, this);
        restartBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.restartBtnCallback, this);
        restartBtn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.restartBtnCallback, this);

        //  添加更多游戏按钮
        var moreGame = new egret.Bitmap();
        moreGame.texture = RES.getRes("scoreBg_png");
        this.addChild(moreGame);
        moreGame.anchorOffsetX = moreGame.width/2;
        moreGame.anchorOffsetY = moreGame.height/2;
        moreGame.scaleX = moreGame.scaleY = 1.5;
        moreGame.x = stageW/2;
        moreGame.y = homeBtn.y;
        //  添加文本
        var moreGameLabel = new egret.TextField();
        this.addChild(moreGameLabel);
        moreGameLabel.x = moreGame.x;
        moreGameLabel.y = moreGame.y;
        moreGameLabel.size = 80;
        moreGameLabel.textAlign = "center";
        moreGameLabel.bold = true;
        moreGameLabel.text = "更多游戏";
        moreGameLabel.touchEnabled = true;
        moreGameLabel.anchorOffsetX = moreGameLabel.width/2;
        moreGameLabel.anchorOffsetY = moreGameLabel.height/2;
        moreGameLabel.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.moreGameCallback, this);
        moreGameLabel.addEventListener(egret.TouchEvent.TOUCH_END, this.moreGameCallback, this);
        moreGameLabel.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.moreGameCallback, this);
        //  添加分享提示
        this.shareTips = new ShareTips();
    }
    private shareBtnCallback(event:egret.TouchEvent)
    {
        if(event.type == egret.TouchEvent.TOUCH_BEGIN)
        {
            event.currentTarget.scaleX = 1.1;
            event.currentTarget.scaleY = 1.1;
        }
        else if(event.type == egret.TouchEvent.TOUCH_END)
        {
            event.currentTarget.scaleX = 1;
            event.currentTarget.scaleY = 1;
            this.addChild(this.shareTips);
        }else if(event.type == egret.TouchEvent.TOUCH_RELEASE_OUTSIDE){
            //console.log("touch cancel");
            event.currentTarget.scaleX = 1.0;
            event.currentTarget.scaleY = 1.0;
        }
    }

    private homeBtnCallback(evt:egret.TouchEvent)
    {
          if(evt.type == egret.TouchEvent.TOUCH_BEGIN){
            //console.log("touch begin");
            evt.currentTarget.scaleX = 1.05;
            evt.currentTarget.scaleY = 1.05;
        }else if(evt.type == egret.TouchEvent.TOUCH_END){
            //console.log("touch ended");
            evt.currentTarget.scaleX = 1.0;
            evt.currentTarget.scaleY = 1.0;
            //  添加开始界面，删除游戏界面
           egret.MainContext.instance.stage.removeChildren();
            let layer = new StartScene();
           egret.MainContext.instance.stage.addChild(layer);
        }else if(evt.type == egret.TouchEvent.TOUCH_RELEASE_OUTSIDE){
            //console.log("touch cancel");
            evt.currentTarget.scaleX = 1.0;
            evt.currentTarget.scaleY = 1.0;
        }
    }
    //重新开始
    private restartBtnCallback(evt:egret.TouchEvent)
    {
        if(evt.type == egret.TouchEvent.TOUCH_BEGIN)
        {
            evt.currentTarget.scaleX = 1.1;
            evt.currentTarget.scaleY = 1.1;
        }
        else if(evt.type == egret.TouchEvent.TOUCH_END)
        {
            evt.currentTarget.scaleX = 1;
            evt.currentTarget.scaleY = 1;
            let game = new GameScene;
            egret.MainContext.instance.stage.removeChildren();
            egret.MainContext.instance.stage.addChild(game);
        }
        
    }
    //更多游戏回调
    private moreGameCallback(evt:egret.TouchEvent)
    {
        if(evt.type == egret.TouchEvent.TOUCH_BEGIN)
        {
            evt.currentTarget.scaleX = 1.1;
            evt.currentTarget.scaleY = 1.1;
        }
        else if(evt.type == egret.TouchEvent.TOUCH_END)
        {
            evt.currentTarget.scaleX = 1;
            evt.currentTarget.scaleY = 1;
            //打开新窗口
            window.open("http://www.4399.com");
        }
    }
}