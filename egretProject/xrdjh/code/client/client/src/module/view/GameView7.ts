class GameView7 extends GameViewBase {
    // 常量 
    public constructor() {
        super();
        this.skinName = "GameView7Skin"
    }

    // ui控件
    private oneoff_0_top: eui.Label;
    private oneoff_0_btm: eui.Label;
    private info: eui.Label;
    private one_btn: eui.Button;
    private noise_5_btn: eui.Button;
    protected partAdded(partName: string, instance: any): void {
        super.partAdded(partName, instance);
    }

    // 变量
    private ROUNDS = [ // and min & max score...
        { id: "tft", num: 5 }, // min 2, max 11
        { id: "all_d", num: 4 }, // min -4, max 0
        { id: "all_c", num: 4 }, // min 8, max 12
        { id: "grudge", num: 5 }, // min -1, max 11
        { id: "prober", num: 7 } // min 2, max 15
    ]; // TOTAL... MIN 7, MAX 49
    private ROUND_INDEX = 0;
    private ROUND_NUM = 0;
    private STAGES = [
        { button: "cooperate", message: "cooperate" },
        { button: "cooperate", message: "TRIP" },
        { button: "cooperate", message: "cooperate" },
        { button: "cheat", message: "cheat" }
    ];
    private STAGE_INDEX = 0;

    protected childrenCreated(): void {
        super.childrenCreated();

        this.oneoff_0_top.textFlow = ZJ.LangUtil.getHtmlText("noise_1");
        this.oneoff_0_btm.textFlow = ZJ.LangUtil.getHtmlText("noise_1_end");

        this.one_btn.label = ZJ.LangUtil.getText("label_cooperate")
        this.one_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onone_btn, this)

        this.noise_5_btn.label = ZJ.LangUtil.getText("noise_5_btn")
        this.noise_5_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onnoise_5_btn, this)

        this.nextStep()
    }

    private onone_btn() {
        let s = this.STAGES[this.STAGE_INDEX];

        this.one_btn.enabled = false;
        this.oneoff_0_top.text = "";
        this.oneoff_0_btm.text = "";
        // 临时 应等动画完成再恢复下一步
        this.onRoundEnd()
    }
    private _foreverWar = false;
    private _foreverMove = "cheat";
    private onRoundEnd() {
        if (this._foreverWar) {
            if (this._foreverMove == "cheat") this._foreverMove = "cooperate";
            else if (this._foreverMove == "cooperate") this._foreverMove = "cheat";
        } else {
            this.STAGE_INDEX++;

            // New words
            this.setHtmlText(this.oneoff_0_top, "noise_" + (this.STAGE_INDEX + 1));
            this.setHtmlText(this.oneoff_0_btm, "noise_" + (this.STAGE_INDEX + 1 + "_end"));
            this.fadeIn(this.oneoff_0_top, 100);
            this.fadeIn(this.oneoff_0_btm, 300);

            // Next stage
            if (this.STAGE_INDEX >= this.STAGES.length) {

                // publish("iterated/cooperate");
                this._foreverWar = true;

                // The FINAL buttons... remove the button & put it back in.
                this.one_btn.visible = false;
                this.noise_5_btn.visible = true;

            } else {
                // Reactivate buttons
                var s = this.STAGES[this.STAGE_INDEX];
                this.setBtnText(this.one_btn, "label_" + s.button)
                this.one_btn.enabled = true
            }

        }

    }

    private onlabel_cheat() {
        GlobalData.answer = GlobalData.ANSWER_CHEAT
        this.nextStep()
    }

    private onlabel_cooperate() {
        GlobalData.answer = GlobalData.ANSWER_COOPERATE
        this.nextStep()
    }

    private onnoise_5_btn() {
        this.nextStep();
    }

    private step0() {
        this.noise_5_btn.visible = false;
    }
    private step1() {
        ModuleUtil.openViewWithScratch(UIName.Game7, UIName.Game8)
    }

    public onDestroy(): number {
        super.onDestroy()
        return 0;
    }
}
