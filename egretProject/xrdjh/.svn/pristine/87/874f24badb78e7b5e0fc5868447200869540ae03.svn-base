class GameView10 extends GameViewBase {
    // 常量 
    public constructor() {
        super();
        this.skinName = "GameView10Skin"
    }

    // ui控件
    private label_start: eui.Button
    private label_step: eui.Button
    private label_reset: eui.Button
    private sandbox_end: eui.Label
    private sandbox_end_btn: eui.Button

    protected partAdded(partName: string, instance: any): void {
        super.partAdded(partName, instance);
    }

    // 变量
    protected childrenCreated(): void {
        super.childrenCreated();

        this.label_start.label = ZJ.LangUtil.getText("label_start")
        this.label_start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onlabel_start, this)
        this.label_step.label = ZJ.LangUtil.getText("label_step")
        this.label_step.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onlabel_step, this)
        this.label_reset.label = ZJ.LangUtil.getText("label_reset")
        this.label_reset.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onlabel_reset, this)

        this.setHtmlText(this.sandbox_end, "sandbox_end")
        this.setBtnText(this.sandbox_end_btn, "sandbox_end_btn")
        this.sandbox_end_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onsandbox_end_btn, this)


        this.nextStep()
    }

    private onsandbox_end_btn(){
        this.nextStep()
    }

    private onlabel_start() {
        // if (o.tournament.isAutoPlaying) {
        //     publish("tournament/autoplay/stop");
        // } else {
        //     publish("tournament/autoplay/start");
        // }
        // 临时
        this.onTournamentCompleted("reproduce")
    }

    private reproduceSteps = 0;
    private onTournamentCompleted(step: string) {
        if (step == "reproduce") {
            this.reproduceSteps++;
            if (this.reproduceSteps == 6) {

            }
        }
    }

    private onlabel_step() {

    }

    private onlabel_reset() {
    }

    private step0() {

    }

    private step1() {
        ModuleUtil.openViewWithScratch(UIName.Game10, UIName.Game11)
    }

    public onDestroy(): number {
        super.onDestroy()
        return 0;
    }
}
