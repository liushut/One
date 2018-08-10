//动画解析类
class StarlingSwfFactory{
     private static _instance:StarlingSwfFactory;
     /*
     * 单例
     * @returns {StarlingSwfFactory}
     */
    public static getInstance():StarlingSwfFactory{
        if(StarlingSwfFactory._instance == null)
        {
            StarlingSwfFactory._instance = new StarlingSwfFactory();

        }
        return StarlingSwfFactory._instance;
    }
    private swfAssetsManager:starlingSwf.SwfAssetManager;
    private swfAssetsNames:Array<string>;
    private swfAssets:Array<starlingSwf.Swf>//文档类数组
    private swfData:any;
    public constructor()
    {
        this.swfAssetsManager = new starlingSwf.SwfAssetManager();
        this.swfAssetsNames = new Array<string>();
        this.swfAssets = new Array<starlingSwf.Swf>();
        this.swfData = {};
    }

    public addSwf(name:string,swfData:Object,spriteSheep:egret.SpriteSheet)
    {
        if(this.swfAssetsNames.indexOf(name)!=-1)
        {
            return;
        }
        if(swfData == null || spriteSheep == null)
        {
            console.log("Swf加载失败" + name);
            return;
        }
        this.swfAssetsManager.addSpriteSheet(name,spriteSheep);
        let swf:starlingSwf.Swf = new starlingSwf.Swf(swfData,this.swfAssetsManager);
        swf.name = name;
        StarlingUtils.addWwf(swf);
        this.swfAssetsNames.push(name);
        this.swfAssets.push(swf);
    }
}