class GameView9 extends GameViewBase {
    // 常量 
    public constructor() {
        super();
        this.skinName = "GameView9Skin"
    }

    // ui控件
    private noise_evo_1: eui.Label;
    private forgot_whos_who: eui.Label;
    private tf2t: eui.Button;
    private random: eui.Button;
    private all_c: eui.Button;
    private all_d: eui.Button;
    private pavlov: eui.Button;
    private tft: eui.Button;
    private label_start: eui.Button
    private label_step: eui.Button
    private label_reset: eui.Button
    private text_next: eui.Label;
    private noise_evo_2_2_btn: eui.Button
    private noiseLabel: eui.Label
    private noiseSlider: eui.HSlider
    private noise_evo_5_continue: eui.Label;
    private label_continue: eui.Button
    private noise_evo_6_btn: eui.Button

    protected partAdded(partName: string, instance: any): void {
        super.partAdded(partName, instance);
    }

    // 变量
    protected childrenCreated(): void {
        super.childrenCreated();

        this.noise_evo_1.textFlow = ZJ.LangUtil.getHtmlText("noise_evo_1");
        this.forgot_whos_who.textFlow = ZJ.LangUtil.getHtmlText("forgot_whos_who");
        this.noise_evo_5_continue.textFlow = ZJ.LangUtil.getHtmlText("noise_evo_5_continue");
        this.noiseLabel.text = ""
        this.noiseSlider.addEventListener(eui.UIEvent.CHANGE, this.onNoiseSlider, this);
        this.noiseSlider.snapInterval = 0.01
        this.noiseSlider.minimum = 0
        this.noiseSlider.maximum = 0.5

        ModuleUtil.setCharacter(this.tf2t, CharacterType.tf2t)
        this.tf2t.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCharacter, this)
        ModuleUtil.setCharacter(this.random, CharacterType.random)
        this.random.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCharacter, this)
        ModuleUtil.setCharacter(this.all_c, CharacterType.all_c)
        this.all_c.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCharacter, this)
        ModuleUtil.setCharacter(this.pavlov, CharacterType.pavlov)
        this.pavlov.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCharacter, this)
        ModuleUtil.setCharacter(this.tft, CharacterType.tft)
        this.tft.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCharacter, this)
        ModuleUtil.setCharacter(this.all_d, CharacterType.all_d)
        this.all_d.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCharacter, this)

        this.label_start.label = ZJ.LangUtil.getText("label_start")
        this.label_start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onlabel_start, this)
        this.label_step.label = ZJ.LangUtil.getText("label_step")
        this.label_step.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onlabel_step, this)
        this.label_reset.label = ZJ.LangUtil.getText("label_reset")
        this.label_reset.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onlabel_reset, this)

        this.noise_evo_2_2_btn.label = ZJ.LangUtil.getText("noise_evo_2_2_btn")
        this.noise_evo_2_2_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onnoise_evo_2_2_btn, this)

        this.label_continue.label = ZJ.LangUtil.getText("label_continue")
        this.label_continue.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onlabel_continue, this)

        this.noise_evo_6_btn.label = ZJ.LangUtil.getText("noise_evo_6_btn")
        this.noise_evo_6_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onnoise_evo_6_btn, this)

        this.nextStep()
    }

    private onCharacter(e: egret.TouchEvent) {
        GlobalData.answer = e.currentTarget.name
        this.nextStep()
    }

    private onNoiseSlider(evt: eui.UIEvent) {
        this._updateLabel(evt.target.value)
    }

    private _updateLabel(round: number) {
        let words = ZJ.LangUtil.getText("sandbox_rules_3")
        round = Math.round(round * 100);
        words = words.replace(/\[N\]/g, round + ""); // replace [N] with the number value
        this.noiseLabel.textFlow = ZJ.LangUtil.parseHtmlText("<b>" + words + "</b>");
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

                // WORDS
                var words = (GlobalData.answer == "pavlov") ? ZJ.LangUtil.getText("noise_evo_2_2_correct") : ZJ.LangUtil.getText("noise_evo_2_2_incorrect");
                words += " ";
                words += ZJ.LangUtil.getText("noise_evo_2_2");
                this.text_next.textFlow = ZJ.LangUtil.parseHtmlText(words)
                this.fadeIn(this.text_next)

                // BUTTON
                this.fadeIn(this.noise_evo_2_2_btn, 300)
            }
        }
    }

    private reproduceSteps2 = 0;
    private onTournamentCompleted2(step: string) {
        if (step == "reproduce") {
            // this.reproduceSteps2++;
            // if (this.reproduceSteps2 == 8) {

            // WORDS
            var words = (GlobalData.answer == "tf2t") ? ZJ.LangUtil.getText("noise_evo_4_2_correct") : ZJ.LangUtil.getText("noise_evo_4_2_incorrect");
            words += " ";
            words += ZJ.LangUtil.getText("noise_evo_4_2");
            this.text_next.textFlow = ZJ.LangUtil.parseHtmlText(words)
            this.fadeIn(this.text_next)

            // BUTTON
            this.setBtnText(this.noise_evo_2_2_btn, "noise_evo_4_2_btn")
            this.fadeIn(this.noise_evo_2_2_btn, 300)
            // }
        }
    }

    private onlabel_step() {

    }

    private onlabel_reset() {
        // 临时
        this.nextStep(1);
    }

    private onnoise_evo_2_2_btn() {
        this.nextStep()
    }

    private onlabel_continue() {
        this.nextStep()
    }

    private onnoise_evo_6_btn(){
        ModuleUtil.openViewWithScratch(UIName.Game9, UIName.Game10)
    }

    private step0() {
        this.label_start.visible = false
        this.label_step.visible = false
        this.label_reset.visible = false
        this.text_next.visible = false;
        this.noise_evo_2_2_btn.visible = false;
        this.all_d.visible = false;
        this.noiseSlider.visible = false
        this.noise_evo_5_continue.visible = false
        this.label_continue.visible = false
        this.noise_evo_6_btn.visible =false
    }

    private step1() {
        this.tf2t.visible = false
        this.random.visible = false
        this.all_c.visible = false
        this.pavlov.visible = false
        this.tft.visible = false
        this.forgot_whos_who.visible = false

        this.noise_evo_1.textFlow = ModuleUtil.replaceCharacterByID("noise_evo_2", CharacterType[GlobalData.answer])
        this.fadeIn(this.noise_evo_1)

        this.label_start.visible = true
        this.label_step.visible = true
        this.label_reset.visible = true
    }

    private step2() {
        this.label_start.visible = false
        this.label_step.visible = false
        this.label_reset.visible = false
        this.text_next.visible = false
        this.noise_evo_2_2_btn.visible = false

        this.tf2t.visible = true
        this.random.visible = true
        this.all_d.visible = true
        this.pavlov.visible = true
        this.tft.visible = true
        this.forgot_whos_who.visible = true;

        this.setHtmlText(this.noise_evo_1, "noise_evo_3")
        this.fadeIn(this.noise_evo_1)
    }

    private step3() {
        this.tf2t.visible = false
        this.random.visible = false
        this.all_d.visible = false
        this.pavlov.visible = false
        this.tft.visible = false
        this.forgot_whos_who.visible = false;

        this.label_start.visible = true
        this.label_step.visible = true
        this.label_reset.visible = true

        this.noise_evo_1.textFlow = ModuleUtil.replaceCharacterByID("noise_evo_4", CharacterType[GlobalData.answer])
        this.fadeIn(this.noise_evo_1)

        this.onTournamentCompleted2("reproduce")
    }

    private step4() {
        this.noise_evo_2_2_btn.visible = false
        this.text_next.visible = false

        this.noise_evo_1.textFlow = ZJ.LangUtil.getHtmlText("noise_evo_5")
        this.fadeIn(this.noise_evo_1)

        this.noiseSlider.value = 0.05
        this._updateLabel(0.05)
        this.fadeIn(this.noiseLabel, 300)
        this.fadeIn(this.noiseSlider, 300)

        // zjtodo 临时跳过
        this.fadeIn(this.noise_evo_5_continue)
        this.fadeIn(this.label_continue)
    }

    private step5() {
        this.noiseLabel.visible = false
        this.noiseSlider.visible = false
        this.noise_evo_5_continue.visible = false
        this.label_continue.visible = false

        this.setHtmlText(this.noise_evo_1, "noise_evo_6")
    }


    public onDestroy(): number {
        super.onDestroy()
        return 0;
    }
}
