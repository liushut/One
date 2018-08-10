/**
 * 开始场景
 * createBy @疯狂点馒头 
 */
class StartScene extends egret.DisplayObjectContainer {
  //  private loadingUI : LoadingUI;//加载UI界面
    private stage1: Stage; //背景1
    private stage2: Stage;

    private startBtn: egret.Bitmap;
    private heroBtn: egret.Bitmap;

    private stage1Hero: number = 0;
    private stage2Hero: number = 1;
    private heroVector: Array<Hero> = new Array();//英雄数组
    private canChoose: boolean = true;
    private curbg: number = 1;
    private curHero: number = 1;

    private stageWidth = 0;
    private stageHeight = 0;

    private btnClickSound:egret.Sound;
    private isFirst = true;
    public constructor(){
        super();
        this.setUI();
        //  开启fps
        //egret.Profiler.getInstance().run();
        // Profiler这个类已被删除，如果需要使用性能分析功能，请直接在```index.html```中修改```
        // data-show-fps="false"``` 关闭性能分析显示，```data-show-fps="true"``` 打开性能分析显示 ##...
        // this.addEventListener(egret.Event.ADDED_TO_STAGE,this.start,this);
    } 
    // private start()
    // {
    //     this.loadingUI = new LoadingUI();
    //     this.stage.addChild(this.loadingUI);

    //     //初始化资源加载库
    //     RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
    //     RES.addEventListener(RES.ResourceEvent.CONFIG_LOAD_ERROR,this.onConfigLoadError,this);

    //      RES.loadConfig("resource/default.res.json","resource/")
        
     
    // }
    // private onConfigLoadError(event:RES.ResourceEvent)
    // {
    //     console.log("配置加载错误");
    // }
    // //配置加载完成，加载组
    // private onConfigComplete(event:RES.ResourceEvent)
    // {
    //     //移除资源加载库的监听事件
    //     RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);

    //     //添加各种预加载事件监听
    //     RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
    //     RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onResourceLoadError,this);
    //     RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceLoadProgress,this);
    //     //开始加载
    //     RES.loadGroup("preload");
    // }
    // private onResourceLoadComplete(event:RES.ResourceEvent)
    // {
    //     if(event.groupName == "preload")
    //     {
    //         this.stage.removeChild(this.loadingUI);
    //         RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
    //         RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
    //         RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceLoadProgress, this);
    //     }
    //     this.setUI();
    // }
    // private onResourceLoadError(event:RES.ResourceEvent)
    // {
    //     console.log("资源组加载错误");
    // }
    // private onResourceLoadProgress(event:RES.ResourceEvent)
    // {
    //     if(event.groupName == "preload")
    //     {
    //         this.loadingUI.onProgress(event.itemsLoaded,event.itemsTotal);
    //     }
    // }
    //设置界面
    private setUI()
    {
        //获取屏幕大小
        this.stageWidth = egret.MainContext.instance.stage.stageWidth;
        this.stageHeight = egret.MainContext.instance.stage.stageHeight;

        let bgLayer = new BgLayer(false);
        this.addChild(bgLayer);

        //添加标题
        let title = new egret.Bitmap();
        title.texture = RES.getRes("uires1_png");
        this.addChild(title);
        title.anchorOffsetX = title.width / 2;
        title.anchorOffsetY = title.height / 2;
        title.x = this.stageWidth / 2;
        title.y = title.height;
        console.log("this.stageWidth",this.stageWidth);


        //开始按钮
        let beginBtn = new egret.Bitmap();
        beginBtn.texture = RES.getRes("uires2_png");
        this.addChild(beginBtn);
        beginBtn.anchorOffsetX = beginBtn.width / 2;
        beginBtn.anchorOffsetX = beginBtn.height / 2;
        beginBtn.x = this.stageWidth / 2;
        beginBtn.y = this.stageHeight / 2;
        //允许触摸
        beginBtn.touchEnabled = true;
        beginBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.beginBtnCallback,this);
        beginBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.beginBtnCallback, this);
        beginBtn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.beginBtnCallback,this);
        this.startBtn = beginBtn;

        //按钮上下移动
        this.moveUpDown(this.startBtn);
        //添加英雄选择台阶
        this.addHeroStage();
        //添加英雄切换按钮
        this.switchHero();

    }
    private switchHero()
    {   
        let switchBtn = new egret.Bitmap();
        switchBtn.texture = RES.getRes("mainqiehuan");
        this.addChild(switchBtn);
        switchBtn.anchorOffsetX = switchBtn.width / 2;
        switchBtn.anchorOffsetY = switchBtn.height / 2;
        switchBtn.x = this.stageWidth / 4;
        switchBtn.y = 2 * this.stageHeight / 3;
        switchBtn.touchEnabled = true;
        switchBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.swithHeroCallBack,this);
        switchBtn.addEventListener(egret.TouchEvent.TOUCH_END,this.swithHeroCallBack,this);
    }
    //切换事件
    private swithHeroCallBack(event:egret.TouchEvent)
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
            this.touchEnd();
        }
    }
    //end后处理
    private touchEnd()
    {
        if(!this.canChoose)return;
        this.canChoose = false;
        //如果台阶1在屏幕中间，则将台阶1移出屏幕，台阶2进来屏幕中间。
        let stageW = this.stageWidth;
        let stageH = this.stageHeight;
        let stage1 = this.stage1;
        let stage2 = this.stage2;
        if(this.curbg == 1)
        {
            egret.Tween.get(stage1).to({x:-stageW / 2},1000).to({x:stageW*1.5},0).call(this.chooseCallBack,this);
            egret.Tween.get(stage2).to({x:stageW / 2},1000);
            this.curbg = 2;
        }
        else if(this.curbg == 2)
        {
           
            egret.Tween.get(stage2).to({x:-stageW/2},1000).to({x:stageW*1.5},0).call(this.chooseCallBack,this);
            egret.Tween.get(stage1).to({x:stageW / 2},1000);
            this.curbg = 1;
        }
    }
    //切换后回调
    private chooseCallBack()
    {
        if(this.curbg == 1)
        {
            //移除英雄1，添加英雄3
            if(this.stage2Hero == 1)
            {
                this.heroVector[1].visible = false;
                this.heroVector[3].visible = true;
                this.stage2Hero = 3;
            }
            else if(this.stage2Hero == 3)
            {
                this.heroVector[3].visible = false;
                this.heroVector[1].visible = true;
                this.stage2Hero = 1;
            }
            //当前展示的英雄索引为下一个台阶上的英雄索引减1
            this.curHero = (this.stage2Hero - 1 + 4)% 4 + 1;
        }
        else if(this.curbg == 2)
        {
            if(this.stage1Hero == 2)
            {
                this.heroVector[0].visible = true;
                this.heroVector[2].visible = false;
                this.stage1Hero = 0;
            }
            else if(this.stage1Hero == 0)
            {
                this.heroVector[0].visible = false;
                this.heroVector[2].visible = true;
                this.stage1Hero = 2;
            }
            this.curHero = (this.stage1Hero - 1 +4)%4 +1;
        }
        //可以继续切换
        this.canChoose = true;
    }
    //英雄选择台阶
    private addHeroStage()
    {
        //创建两个台阶
        this.stage1 = new Stage();
        this.stage2 = new Stage();
        let stageW = this.stageWidth;
        let stageH = this.stageHeight;
        let stageOne = this.stage1;
        let stageTwo = this.stage2;
        stageOne.StageSprite.scaleX = 40;
        stageTwo.StageSprite.scaleX = 40;
        stageOne.x = stageW / 2;
        stageTwo.x = stageOne.x + stageW;
        stageOne.y = stageH - stageOne.height;
        stageTwo.y = stageH - stageTwo.height;
        this.addChild(stageOne);
        this.addChild(stageTwo);
        let tempVector = this.heroVector;
        //创建4个英雄
        for(let i = 0;i < 4; i++)
        {
            let tempHero = new Hero(i + 1)
            tempVector.push(tempHero);
            if(i == 1 || i == 3)//1 3 放在台阶2
            {
                stageTwo.addChild(tempVector[i]);
                if(i == 3)
                {
                    tempVector[i].visible = false;
                }
                this.stage2Hero = 1;
            }
            else
            {
                stageOne.addChild(tempVector[i]);
                if(i == 2)
                {
                    tempVector[i].visible = false;
                }
                this.stage1Hero = 0;
            }
        }
            // 添加英雄简介文本  
            let heroIntroduce1 = new egret.TextField();
            stageOne.addChild(heroIntroduce1);
            heroIntroduce1.textAlign = "center";
            heroIntroduce1.text = "一根棍子走天下";
            heroIntroduce1.size = 50;
            heroIntroduce1.y = stageOne.height * 0.65;
            heroIntroduce1.width = stageOne.width * 0.25;
            heroIntroduce1.anchorOffsetX = heroIntroduce1.textWidth / 2;
            heroIntroduce1.anchorOffsetY = heroIntroduce1.textHeight / 2;

            let heroIntroduce2 = new egret.TextField();
            stageTwo.addChild(heroIntroduce2);
            heroIntroduce1.textAlign = "center";
            heroIntroduce2.text = "多根棍子走天下";
            heroIntroduce2.size = 50;
            heroIntroduce2.y = heroIntroduce1.y;
            heroIntroduce2.width = heroIntroduce1.x;
            heroIntroduce2.anchorOffsetX = heroIntroduce2.textWidth / 2;
            heroIntroduce2.anchorOffsetY = heroIntroduce2.textHeight / 2;
        
        
        
    }
    //开始按钮后的回调函数
 private beginBtnCallback(event:egret.TouchEvent)
 {
     if(!this.canChoose)return ;
     if(event.type == egret.TouchEvent.TOUCH_BEGIN)
     {
         event.currentTarget.scaleX = 1.1;
         event.currentTarget.scaleY = 1.1;
        //  this.btnClickSound.play(0,1);
         console.log("开始");
     }
     else if(event.type == egret.TouchEvent.TOUCH_END){
         event.currentTarget.scaleX = 1;
         event.currentTarget.scaleY = 1;
         //进入游戏界面
         console.log("进入游戏界面");
         GameManager.setHeroIndex(this.curHero);
         this.parent.addChild(new GameScene());
         this.parent.removeChild(this);
        
        
     }
     else if(event.type == egret.TouchEvent.TOUCH_RELEASE_OUTSIDE) {
         event.currentTarget.scaleX = 1;
         event.currentTarget.scaleY = 1;
         console.log("取消")
     }
 }
 //按钮上下移动
 public moveUpDown(btn:egret.Bitmap)
 {
        var stageH = this.stageWidth;
        var startBtn = this.startBtn;
        var tw = egret.Tween.get(btn);
        tw.to({y:stageH/2 + startBtn.height / 10}, 1500).to({y:stageH/2 - startBtn.height/10}, 1500).call(this.moveUpDown, this,[btn]);
 }



}