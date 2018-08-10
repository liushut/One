class SceneBegin extends eui.Component
{
    private StartBtn:eui.Button;
    public constructor()
    {
        super();
        this.skinName = "resource/eui_skins/SceneBeginSkin.exml";
        this.StartBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
            console.log("点击按钮咯");
        },this);
    }
    
}