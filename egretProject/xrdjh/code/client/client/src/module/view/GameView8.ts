class GameView8 extends GameViewBase {
    // 常量 
    public constructor() {
        super();
        this.skinName = "GameView8Skin"
    }

    // ui控件
    private noise_characters: eui.Label;
    private char_tf2t: eui.Label;
    private char_pavlov: eui.Label;
    private char_random: eui.Label;
    private noise_characters_end: eui.Label;
    private noise_characters_btn: eui.Button;

    protected partAdded(partName: string, instance: any): void {
        super.partAdded(partName, instance);
    }

    // 变量
    protected childrenCreated(): void {
        super.childrenCreated();

        this.noise_characters.textFlow = ZJ.LangUtil.getHtmlText("noise_characters");
        this.char_tf2t.textFlow = ZJ.LangUtil.getHtmlText("character_tf2t");
        this.char_pavlov.textFlow = ZJ.LangUtil.getHtmlText("character_pavlov");
        this.char_random.textFlow = ZJ.LangUtil.getHtmlText("character_random");
        this.noise_characters_end.textFlow = ZJ.LangUtil.getHtmlText("noise_characters_end");

        this.noise_characters_btn.label = ZJ.LangUtil.getText("noise_characters_btn")
        this.noise_characters_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onnoise_characters_btn, this)

        this.nextStep()
    }

    private onnoise_characters_btn() {
        ModuleUtil.openViewWithScratch(UIName.Game8, UIName.Game9)
    }

    public onDestroy(): number {
        super.onDestroy()
        return 0;
    }
}
