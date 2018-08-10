class GameView12 extends GameViewBase {
    // 常量 
    public constructor() {
        super();
        this.skinName = "GameView12Skin"
    }

    // ui控件
    private outro_1: eui.Label
    private outro_1_btn: eui.Button
    // 1
    private outro_2: eui.Label
    private outro_2_credits: eui.Label
    private outro_2_btn: eui.Button
    private img: eui.Image

    protected partAdded(partName: string, instance: any): void {
        super.partAdded(partName, instance);
    }

    // 变量
    protected childrenCreated(): void {
        super.childrenCreated();

        // 0
        this.setHtmlText(this.outro_1, "outro_1");
        this.setBtnHtmlText(this.outro_1_btn, "outro_1_btn")
        this.outro_1_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onoutro_1_btn, this)

        // 1
        this.setHtmlText(this.outro_2_credits, "outro_2_credits");
        this.setHtmlText(this.outro_2, "outro_2");
        this.setBtnHtmlText(this.outro_2_btn, "outro_2_btn")
        this.outro_2_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onoutro_2_btn, this)


        this.nextStep()
    }

    private onoutro_1_btn() {
        this.nextStep()
    }

    private onoutro_2_btn() {
        ModuleUtil.openViewWithScratch(UIName.Game12, UIName.Game13)
    }

    private step0(){
        this.outro_2.visible = false;
        this.outro_2_credits.visible = false;
        this.outro_2_btn.visible = false;
        this.img.visible = false;
    }

    private step1(){
        this.outro_1.visible = false
        this.outro_1_btn.visible = false

        this.fadeIn(this.outro_2, 100)
        this.fadeIn(this.img, 200)
        this.fadeIn(this.outro_2_credits, 200)
        this.fadeIn(this.outro_2_btn, 2000)
    }

    public onDestroy(): number {
        super.onDestroy()
        return 0;
    }
}
