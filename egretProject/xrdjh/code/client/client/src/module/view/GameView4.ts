class GameView4 extends GameViewBase {
    // 常量 
    public constructor() {
        super();
        this.skinName = "GameView4Skin"
    }

    // ui控件
    private evolution_intro: eui.Label
    private evolution_intro_1: eui.Label
    private evolution_intro_2: eui.Label
    private evolution_intro_3: eui.Label
    private evolution_intro_footer: eui.Label
    private evolution_intro_button: eui.Button
    protected partAdded(partName: string, instance: any): void {
        super.partAdded(partName, instance);
    }

    // 变量
    protected childrenCreated(): void {
        super.childrenCreated();

        this.evolution_intro.textFlow = ZJ.LangUtil.getHtmlText("evolution_intro");
        this.evolution_intro_1.textFlow = ZJ.LangUtil.getHtmlText("evolution_intro_1");
        this.evolution_intro_2.textFlow = ZJ.LangUtil.getHtmlText("evolution_intro_2");
        this.evolution_intro_3.textFlow = ZJ.LangUtil.getHtmlText("evolution_intro_3");
        this.evolution_intro_footer.textFlow = ZJ.LangUtil.getHtmlText("evolution_intro_footer");

        this.evolution_intro_button.label = ZJ.LangUtil.getText("evolution_intro_button");
        this.evolution_intro_button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onevolution_intro_button, this)

    }

    private onevolution_intro_button() {
        ModuleUtil.openViewWithScratch(UIName.Game4, UIName.Game5)
    }

    public onDestroy(): number {
        super.onDestroy()
        return 0;
    }
}
