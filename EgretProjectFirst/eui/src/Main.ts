class Main extends eui.UILayer{
    /**
     * 加载进度界面
     */
    private loadingView:LoadingUI;//加载界面
    private _trueLoadingUI:TrueLoadingUI;
    private _homeUI:HomeUI;
    private _loadingBg:egret.Bitmap;
    private idLoading:string;
    private isThemeLoadEnd = false;
    protected createChildren()
    {
        super.createChildren();

        //注入自定义解析器
        var assetAdapter = new AssetAdapter();
        this.stage.registerImplementation("eui.IAssetAdapter",assetAdapter);
        this.stage.registerImplementation("eui.IThemeAdapter",new ThemeAdapter);

        //设置加载进度界面
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化加载Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        RES.loadConfig("resource/default.res.json","resource/");
    }
    //配置文件加载完成，开始加载皮肤主题资源和priload资源组.
    private onConfigComplete(evet:RES.ResourceEvent)
    {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);

         //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        let theme = new eui.Theme("resource/default.thm.jsom",this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE,this.onThemeLoadComplete,this);

        
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onResourceLoadError,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.ResourceProgress,this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,this.onItemLoadError,this);
        RES.loadGroup("preload");
    }
    
    //加载资源组完成后
    private onResourceLoadComplete(evet:RES.ResourceEvent)
    {
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);

        switch(evet.groupName)
        {
            case "loading":
            console.log("loading ok",egret.getTimer());
            if(this.loadingView.parent)
            {
                this.loadingView.parent.removeChild(this.loadingView);
            }

            Toast.init(this,RES.getRes("toast-bg_png"));
            
        }
       
    }
    //主题加载完成
    private onThemeLoadComplete()
    {
        console.log("onThemeLoadComplete");
        this.isThemeLoadEnd = true;
        this.createScene();
    }
    //资源加载出错
    private onResourceLoadError(evet:RES.ResourceEvent)
    {
            console.warn("Group" + evet.groupName + "has fail to load");
            //忽略加载失败的项目
            this.onResourceLoadComplete(evet);
    }
    //preload资源组加载进度
    private ResourceProgress(evet:RES.ResourceEvent)
    {
        switch(evet.groupName)
        {
            case "loading":
            this.loadingView.onProgress(evet.itemsLoaded,evet.itemsTotal);
                  break;
            default:
            this._trueLoadingUI.onProgress(evet.itemsLoaded,evet.itemsTotal);
            break;
        }
    }

    //创建场景界面
    protected startCreateScene()
    {

    }

}