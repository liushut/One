class GameSetting extends eui.Component{
    private static shared:GameSetting;
    public static Shared()
    {
        if(GameSetting.shared == null)
        {
            GameSetting.shared = new GameSetting();
        }
        return GameSetting.shared;
    }

    private btnagree:eui.Button;       //同意按钮，相当于直接关闭界面
    private imgmusicdisable: eui.Image;//音乐静音显示
    private imgsounddisable: eui.Image;//声音静音显示
    private btnSound: eui.Button;      //声音按钮
    private btnmusic: eui.Button;      //音乐按钮
    public constructor() {
        super();
        this.skinName = "resource/eui_skins/GameSettingSkin.exml";
        this.btnagree.addEventListener(egret.TouchEvent.TOUCH_TAP,this.click_agree,this);
        this.btnSound.addEventListener(egret.TouchEvent.TOUCH_TAP,this.click_sound,this);
        this.btnmusic.addEventListener(egret.TouchEvent.TOUCH_TAP,this.click_music,this);
        //通过声音管理类来处理界面显示
        this.update_buttonstate();
    }
    private click_agree(){
        SoundManager.Shared().PlayClick();
        this.parent.removeChild(this);
    }
    private click_sound(){
        SoundManager.Shared().PlayClick();
        SoundManager.Shared().IsSound = !SoundManager.Shared().IsSound;
        this.update_buttonstate();
    }
    private click_music(){
        SoundManager.Shared().PlayClick();
        SoundManager.Shared().IsMusic = !SoundManager.Shared().IsMusic;
        this.update_buttonstate();
    }
    private update_buttonstate(){//根据取到的数据来显示
        this.imgmusicdisable.visible = !SoundManager.Shared().IsMusic;
        this.imgsounddisable.visible = !SoundManager.Shared().IsSound;
    
}
}