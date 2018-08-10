class Main extends egret.DisplayObjectContainer{
    private loadingUI:LoadingUI;
    public constructor()
    {
        super();
         this.addEventListener(egret.Event.ADDED_TO_STAGE,this.start,this);
    }
     private start()
    {
        this.loadingUI = new LoadingUI();
        this.stage.addChild(this.loadingUI);

        //初始化资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        RES.addEventListener(RES.ResourceEvent.CONFIG_LOAD_ERROR,this.onConfigLoadError,this);
         RES.loadConfig("resource/default.res.json","resource/")
    }
     private onConfigLoadError(event:RES.ResourceEvent)
    {
        console.log("配置加载错误");
    }
    //配置加载完成，加载组
    private onConfigComplete(event:RES.ResourceEvent)
    {
        //移除资源加载库的监听事件
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);

        //添加各种预加载事件监听
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onResourceLoadError,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceLoadProgress,this);
        //开始加载
        RES.loadGroup("preload");
    }
     private onResourceLoadComplete(event:RES.ResourceEvent)
    {
        if(event.groupName == "preload")
        {
            this.stage.removeChild(this.loadingUI);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceLoadProgress, this);
        }
        this.gameStart();
        
    }
    private gameStart()
    {
        let game = new StartScene();
        egret.MainContext.instance.stage.addChild(game);
    }
    private onResourceLoadError(event:RES.ResourceEvent)
    {
        console.log("资源组加载错误");
    }
    private onResourceLoadProgress(event:RES.ResourceEvent)
    {
        if(event.groupName == "preload")
        {
            this.loadingUI.onProgress(event.itemsLoaded,event.itemsTotal);
        }
    }
}