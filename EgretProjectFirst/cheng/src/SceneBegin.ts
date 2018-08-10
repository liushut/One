class SceneBegin extends eui.Component
{
    private static shared:SceneBegin;
    public static Shared()
    {
        if(SceneBegin.shared == null)
        {
            SceneBegin.shared = new SceneBegin();
        }
        return SceneBegin.shared;
    }
    private StartBtn:eui.Button;
    private btn_setting:eui.Button;
    public constructor()
    {
        super();
        this.skinName = "resource/eui_skins/SceneBeginSkin.exml";
        this.StartBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
            console.log("点击按钮咯");
            this.parent.addChild(SceneLevels.Shared());
            this.parent.removeChild(this);
            SoundManager.Shared().PlayClick();
        },this);
        this.btn_setting.addEventListener(egret.TouchEvent.TOUCH_TAP,
        this. onclick_setting,this);
        //开始播放音乐
        SoundManager.Shared().PlyaBGM();
     
    }
    
      private  onclick_setting() {
       SoundManager.Shared().PlayClick();
     this.addChild(GameSetting.Shared());
    }
}