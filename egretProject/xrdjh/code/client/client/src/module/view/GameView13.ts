class GameView13 extends GameViewBase {
    // 常量 
    public constructor() {
        super();
        this.skinName = "GameView13Skin"
    }

    // ui控件
    private credits: eui.Label
    private game_mode: eui.Button
    private sandbox_mode: eui.Button

    protected partAdded(partName: string, instance: any): void {
        super.partAdded(partName, instance);
    }

    // 变量
    protected childrenCreated(): void {
        super.childrenCreated();

        this.setHtmlText(this.credits, "credits")
        this.setBtnHtmlText(this.game_mode, "game_mode")
        this.game_mode.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ongame_mode, this)
        this.setBtnHtmlText(this.sandbox_mode, "sandbox_mode")
        this.sandbox_mode.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onsandbox_mode, this)

        this.nextStep()
    }

    private ongame_mode() {
        // ModuleUtil.openViewWithScratch(UIName.Game13, UIName.Game1)
        let scratch = ZJ.UIManager.instance.openView(UIName.Scratch) as ScratchView
        scratch.setData({customFunc:()=>{
            let game1 = ZJ.UIManager.instance.openView(UIName.Game1) as GameView1
            game1.nextStep(3)
            ZJ.UIManager.instance.destroyView(UIName.Game13)
        }})
    }

    private onsandbox_mode() {
        ModuleUtil.openViewWithScratch(UIName.Game13, UIName.Game10)
    }

    public onDestroy(): number {
        super.onDestroy()
        return 0;
    }
}
