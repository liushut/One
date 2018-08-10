class GameView11 extends GameViewBase {
    // 常量 
    public constructor() {
        super();
        this.skinName = "GameView11Skin"
    }

    // ui控件
    private conclusion_0: eui.Label
    private conclusion_0123: eui.Label
    private conclusion_4: eui.Label
    private conclusion_btn: eui.Button

    protected partAdded(partName: string, instance: any): void {
        super.partAdded(partName, instance);
    }

    // 变量
    protected childrenCreated(): void {
        super.childrenCreated();

        this.setHtmlText(this.conclusion_0, "conclusion_0")
        this.setHtmlText(this.conclusion_0123, "conclusion_0123")
        this.setHtmlText(this.conclusion_4, "conclusion_4");

        this.setBtnHtmlText(this.conclusion_btn, "conclusion_btn")
        this.conclusion_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onconclusion_btn, this)


        this.nextStep()
    }

    private onconclusion_btn() {
        ModuleUtil.openViewWithScratch(UIName.Game11, UIName.Game12)
    }

    public onDestroy(): number {
        super.onDestroy()
        return 0;
    }
}
