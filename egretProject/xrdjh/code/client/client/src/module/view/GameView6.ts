class GameView6 extends GameViewBase {
    // 常量 
    public constructor() {
        super();
        this.skinName = "GameView6Skin"
    }

    // ui控件
    private distrust_1: eui.Label
    private label_start: eui.Button
    private label_step: eui.Button
    private label_reset: eui.Button
    private roundsLabel: eui.Label
    private roundsSlider: eui.HSlider
    private distrust_2_end: eui.Label
    private label_continue: eui.Button
    private distrust_3_btn: eui.Button
    private distrust_5_btn: eui.Button
    private distrust_4:eui.Label
    private distrust_4_2:eui.Label
    private distrust_4_note_2:eui.Label

    protected partAdded(partName: string, instance: any): void {
        super.partAdded(partName, instance);
    }

    // 变量
    protected childrenCreated(): void {
        super.childrenCreated();

        this.distrust_1.textFlow = ZJ.LangUtil.getHtmlText("distrust_1");
        this.fadeIn(this.distrust_1, 600)

        this.label_start.label = ZJ.LangUtil.getText("label_start")
        this.label_start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onlabel_start, this)
        this.label_step.label = ZJ.LangUtil.getText("label_step")
        this.label_step.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onlabel_step, this)
        this.label_reset.label = ZJ.LangUtil.getText("label_reset")
        this.label_reset.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onlabel_reset, this)
        this.fadeIn(this.label_start, 800)
        this.fadeIn(this.label_step, 900)
        this.fadeIn(this.label_reset, 1000)

        // zjtodo 创建tournament
        this.roundsSlider.addEventListener(eui.UIEvent.CHANGE, this.onRoundsSliderChange, this);
        this.roundsSlider.minimum = 1;
        this.roundsSlider.maximum = 20;

        this.distrust_2_end.textFlow = ZJ.LangUtil.getHtmlText("distrust_2_end");
        this.label_continue.label = ZJ.LangUtil.getText("label_continue");
        this.label_continue.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onlabel_continue, this)
        this.distrust_3_btn.label = ZJ.LangUtil.getText("distrust_3_btn");
        this.distrust_3_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ondistrust_3_btn, this);
        this.distrust_5_btn.label = ZJ.LangUtil.getText("distrust_5_btn");
        this.distrust_5_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ondistrust_5_btn, this)

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

    private onlabel_step() {

    }

    private onlabel_reset() {
        // 临时
        this.nextStep();
    }

    private onlabel_continue() {
        this.nextStep();
    }

    private ondistrust_3_btn(){
        this.nextStep();
    }

    private ondistrust_5_btn(){
        ModuleUtil.openViewWithScratch(UIName.Game6, UIName.Game7)
    }

    private onRoundsSliderChange(evt: eui.UIEvent){
        this._updateLabel(evt.target.value)
    }

    private _updateLabel(round: number) {
        let words = (round == 1) ? ZJ.LangUtil.getText("sandbox_rules_1_single") : ZJ.LangUtil.getText("sandbox_rules_1"); // plural?
        words = words.replace(/\[N\]/g, round + ""); // replace [N] with the number value
        this.roundsLabel.textFlow = ZJ.LangUtil.parseHtmlText("<b>" + words + "</b>");
    }

    private onTournamentCompleted(step: string) {
        if (step == "reproduce") {
            this.nextStep();
        }
    }

    private step0() {
        this.roundsLabel.text = ""
        this.roundsSlider.visible = false
        this.distrust_2_end.visible = false;
        this.label_continue.visible = false;
        this.distrust_3_btn.visible = false;
        this.distrust_5_btn.visible = false;
    }

    private step1() {
        this.setHtmlText(this.distrust_1, "distrust_2")
        this.fadeIn(this.distrust_1, 100)

        this.roundsSlider.visible = true
        this.fadeIn(this.roundsSlider, 500)
        this.roundsSlider.value = 10
        this._updateLabel(this.roundsSlider.value);
    }

    private step2(){
        this.distrust_2_end.visible = true;
        this.fadeIn(this.distrust_2_end, 100)
        this.label_continue.visible = true;
        this.fadeIn(this.label_continue, 100)
    }

    private step3(){
        this.roundsLabel.text = ""
        this.roundsSlider.visible = false
        this.distrust_2_end.visible = false;
        this.label_continue.visible = false;


        this.setHtmlText(this.distrust_1, "distrust_3")
        this.fadeIn(this.distrust_1, 100)
        this.distrust_3_btn.visible = true
        this.fadeIn(this.distrust_3_btn, 400)
    }

    private step4(){
        this.distrust_3_btn.visible = false;

        // zjtodo 临时全部显示
        this.setHtmlText(this.distrust_2_end, "distrust_4_note")
        this.label_continue.visible = true;
        this.fadeIn(this.distrust_2_end, 100)
        this.fadeIn(this.label_continue, 100)
        this.setHtmlText(this.distrust_1, "distrust_4")
        this.setHtmlText(this.distrust_4_2, "distrust_4_2")
        this.setHtmlText(this.distrust_4_note_2, "distrust_4_note_2")

        this.fadeIn(this.distrust_1, 100)
        this.fadeIn(this.distrust_4_2, 500)
        this.fadeIn(this.distrust_4_note_2, 500)
        
        
    }

    private step5(){
        this.distrust_4_note_2.text = ""
        this.distrust_4_2.text = ""
        this.distrust_2_end.text = ""
        this.label_continue.visible = false;

        this.setHtmlText(this.distrust_1, "distrust_5")
        this.fadeIn(this.distrust_1, 100)
        this.distrust_5_btn.visible = true;
        this.fadeIn(this.distrust_5_btn, 400)
    }



    public onDestroy(): number {
        super.onDestroy()
        return 0;
    }
}
