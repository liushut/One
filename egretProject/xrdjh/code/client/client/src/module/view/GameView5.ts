class GameView5 extends GameViewBase {
    // 常量 
    public constructor() {
        super();
        this.skinName = "GameView5Skin"
    }

    // ui控件
    private evo_1: eui.Label
    private forgot_whos_who: eui.Label
    private tft: eui.Button
    private all_d: eui.Button
    private all_c: eui.Button
    private label_play_tournament: eui.Button
    private label_eliminate_bottom_5: eui.Button
    private label_reproduce_top_5: eui.Button
    private evo_9_btn: eui.Button
    private evo_autoplay: eui.Button
    private evo_10_followup: eui.Label
    private evo_10_btn: eui.Button
    private evo_11_btn: eui.Button


    protected partAdded(partName: string, instance: any): void {
        super.partAdded(partName, instance);
    }

    // 变量
    protected childrenCreated(): void {
        super.childrenCreated();

        this.evo_1.textFlow = ZJ.LangUtil.getHtmlText("evo_1");
        this.evo_10_followup.textFlow = ZJ.LangUtil.getHtmlText("evo_10_followup");
        this.forgot_whos_who.textFlow = ZJ.LangUtil.getHtmlText("forgot_whos_who");

        ModuleUtil.setCharacter(this.tft, CharacterType.tft)
        this.tft.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCharacter, this)
        ModuleUtil.setCharacter(this.all_d, CharacterType.all_d)
        this.all_d.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCharacter, this)
        ModuleUtil.setCharacter(this.all_c, CharacterType.all_c)
        this.all_c.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCharacter, this)

        this.label_play_tournament.label = ZJ.LangUtil.getText("label_play_tournament")
        this.label_play_tournament.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onlabel_play_tournament, this)
        this.label_eliminate_bottom_5.label = ZJ.LangUtil.getText("label_eliminate_bottom_5")
        this.label_eliminate_bottom_5.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onlabel_eliminate_bottom_5, this)
        this.label_reproduce_top_5.label = ZJ.LangUtil.getText("label_reproduce_top_5")
        this.label_reproduce_top_5.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onlabel_reproduce_top_5, this)

        this.evo_9_btn.label = ZJ.LangUtil.getText("evo_9_btn")
        this.evo_9_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onevo_9_btn, this)
        this.evo_autoplay.label = ZJ.LangUtil.getText("evo_autoplay")
        this.evo_autoplay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onevo_autoplay, this)

        this.evo_10_btn.label = ZJ.LangUtil.getText("evo_10_btn")
        this.evo_10_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onevo_10_btn, this)

        this.evo_11_btn.label = ZJ.LangUtil.getText("evo_11_btn")
        this.evo_11_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onevo_11_btn, this)

        this.nextStep()
    }

    private onCharacter(e: egret.TouchEvent) {
        GlobalData.answer = e.currentTarget.name
        this.nextStep()
    }

    private onlabel_play_tournament() {
        this.label_play_tournament.enabled = false
        this.nextStepBtn = this.label_eliminate_bottom_5
        this.onTournamentCompleted("")
    }

    private onlabel_eliminate_bottom_5() {
        this.label_eliminate_bottom_5.enabled = false
        this.nextStepBtn = this.label_reproduce_top_5
        this.onTournamentCompleted("")

    }

    private onlabel_reproduce_top_5() {
        this.label_reproduce_top_5.enabled = false
        this.nextStepBtn = this.label_play_tournament
        this.onTournamentCompleted("reproduce")
    }

    // private textStep = 2;
    private textStep = 8; // debug
    private onTournamentCompleted(step: string) {
        // zjtodo 图形
        this.nextStepBtn.enabled = true
        if (step == "reproduce") {
            this.textStep++;
            let response = "";
            if (this.textStep < 9) {
                if (this.textStep == 3) {
                    response = ZJ.LangUtil.getText("evo_3_" + GlobalData.answer) + " " + ZJ.LangUtil.getText("evo_3");
                } else {
                    response = ZJ.LangUtil.getText("evo_" + this.textStep);
                }
                this.evo_1.textFlow = ZJ.LangUtil.parseHtmlText(response)
                this.fadeIn(this.evo_1, 100)
                this._showButtons();
            } else {
                this.nextStep();
            }
        }
    }

    private autoStep = 0;
    private onAutoTournamentCompleted() {
        this.autoStep++;
        if (this.autoStep == 13) {
            this._goOn();
        }
    }
    private _goOn() {
        this.evo_10_followup.visible = true;
        this.evo_10_btn.visible = true;

        this.fadeIn(this.evo_10_followup, 400)
        this.fadeIn(this.evo_10_btn, 600)
    }

    private onevo_9_btn() {
        this.nextStep()
    }

    private onevo_10_btn() {
        this.nextStep()
    }

    private onevo_11_btn() {
        ModuleUtil.openViewWithScratch(UIName.Game5, UIName.Game6)
    }

    private isPlaying = false;
    private onevo_autoplay() {
        if (!this.isPlaying) {
            this.evo_autoplay.label = ZJ.LangUtil.getText("evo_autoplay_stop")
            // publish("tournament/autoplay/start");
            this.isPlaying = true;
        } else {
            this.evo_autoplay.label = ZJ.LangUtil.getText("evo_autoplay")
            // publish("tournament/autoplay/stop");
            this.isPlaying = false;
        }

        // zjtodo 临时跳过
        this._goOn();
    }

    private step0() {
        this.label_play_tournament.visible = false;
        this.label_eliminate_bottom_5.visible = false;
        this.label_reproduce_top_5.visible = false;
        this.evo_9_btn.visible = false;
        this.evo_autoplay.visible = false;
        this.evo_10_followup.visible = false;
        this.evo_10_btn.visible = false;
        this.evo_11_btn.visible = false;
    }

    private nextStepBtn: eui.Button = null
    private step1() {
        this.forgot_whos_who.visible = false;
        this.tft.visible = false;
        this.all_d.visible = false;
        this.all_c.visible = false;

        this.evo_1.textFlow = ZJ.LangUtil.parseHtmlText(ZJ.LangUtil.getText("evo_2_" + GlobalData.answer) + " " + ZJ.LangUtil.getText("evo_2"))
        this.fadeIn(this.evo_1, 100)

        this.label_play_tournament.visible = true;
        this.label_eliminate_bottom_5.visible = true;
        this.label_eliminate_bottom_5.enabled = false;
        this.label_reproduce_top_5.visible = true;
        this.label_reproduce_top_5.enabled = false;
        this._showButtons()
    }
    private _showButtons() {
        this.fadeIn(this.label_play_tournament, 500)
        this.fadeIn(this.label_eliminate_bottom_5, 600)
        this.fadeIn(this.label_reproduce_top_5, 700)
    }

    private step2() {
        this.label_play_tournament.visible = false;
        this.label_eliminate_bottom_5.visible = false;
        this.label_reproduce_top_5.visible = false;


        let response = ZJ.LangUtil.getText("evo_9") + "\n\n" + ZJ.LangUtil.getText("evo_9_" + GlobalData.answer) + " " + ZJ.LangUtil.getText("evo_9_end");
        this.evo_1.textFlow = ZJ.LangUtil.parseHtmlText(response)

        this.evo_9_btn.visible = true
        this.fadeIn(this.evo_9_btn, 400)
    }

    private step3() {
        this.evo_9_btn.visible = false;

        this.evo_1.textFlow = ZJ.LangUtil.getHtmlText("evo_10")
        this.fadeIn(this.evo_1, 1000)
        this.evo_autoplay.visible = true;
        this.fadeIn(this.evo_autoplay, 1200)

    }

    private step4() {
        this.evo_10_btn.visible = false;
        this.evo_10_followup.visible = false;
        this.evo_autoplay.visible = false;

        this.evo_1.textFlow = ZJ.LangUtil.getHtmlText("evo_11")
        this.evo_11_btn.visible = true

    }

    public onDestroy(): number {
        super.onDestroy()
        return 0;
    }
}
