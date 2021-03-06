class GameView1 extends GameViewBase {
    // 常量 
    public constructor() {
        super();
        this.skinName = "GameView1Skin"
    }
    // ui控件
    private gMain: eui.Group;
    private label_you: eui.Label;
    private label_them: eui.Label;
    private oneoff_0_top: eui.Label;
    private oneoff_0_btm: eui.Label;
    private info: eui.Label;
    private label_cheat: eui.Button;
    private label_cooperate: eui.Button;
    private oneoff_button_next: eui.Button;
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

    private iterated: Iterated = null
    protected childrenCreated(): void {
        super.childrenCreated();

        this.label_you.textFlow = ZJ.LangUtil.getHtmlText("label_you");
        this.label_them.textFlow = ZJ.LangUtil.getHtmlText("label_them");
        this.oneoff_0_top.textFlow = ZJ.LangUtil.getHtmlText("oneoff_0_top");
        this.oneoff_0_btm.textFlow = ZJ.LangUtil.getHtmlText("oneoff_0_btm");

        this.label_cheat.label = ZJ.LangUtil.getText("label_cheat")
        this.label_cheat.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onlabel_cheat, this)

        this.label_cooperate.label = ZJ.LangUtil.getText("label_cooperate")
        this.label_cooperate.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onlabel_cooperate, this)

        this.oneoff_button_next.label = ZJ.LangUtil.getText("oneoff_button_next")
        this.oneoff_button_next.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ononeoff_button_next, this)

        ZJ.EventManager.instance.addEventListener(EventName.ITERATED_ROUND_START, this.onIteratedRoundStart, this)
        ZJ.EventManager.instance.addEventListener(EventName.ITERATED_ROUND_END, this.onIteratedRoundEnd, this)


        this.iterated = new Iterated()
        this.gMain.addChild(this.iterated)
        this.iterated.x = 0
        this.iterated.y = 700

        this.step0()
    }

    private onIteratedRoundStart(e: ZJ.CommonEvent) {

    }

    private onIteratedRoundEnd(e: ZJ.CommonEvent) {
        this.label_cheat.enabled = true

    }

    private onlabel_cheat() {
        GlobalData.answer = GlobalData.ANSWER_CHEAT
        this.nextStep()

        this.iterated.startGame(GlobalData.answer, GlobalData.ANSWER_COOPERATE)
        this.label_cheat.enabled = false
    }

    private onlabel_cooperate() {
        GlobalData.answer = GlobalData.ANSWER_COOPERATE
        this.nextStep()

        this.iterated.startGame(GlobalData.answer, GlobalData.ANSWER_COOPERATE)
        this.label_cheat.enabled = false
    }

    private ononeoff_button_next() {
        this.nextStep(3);
    }

    private step0() {
        this.oneoff_button_next.visible = false;
        this.info.visible = false;
    }
    private step1() {
        this.fadeIn(this.oneoff_0_top, 150 + 10)
        this.fadeIn(this.oneoff_0_btm, 150 + 600)
        this.fadeIn(this.label_cheat, 150 + 1200)
        this.fadeIn(this.label_cooperate, 150 + 1200)
        if (GlobalData.answer == GlobalData.ANSWER_COOPERATE) {
            this.oneoff_0_top.textFlow = ZJ.LangUtil.parseHtmlText(ZJ.LangUtil.getText("oneoff_1_cooperated") + "\n" + ZJ.LangUtil.getText("oneoff_1_top"));
        }
        else {
            this.oneoff_0_top.textFlow = ZJ.LangUtil.parseHtmlText(ZJ.LangUtil.getText("oneoff_1_cheated") + "\n" + ZJ.LangUtil.getText("oneoff_1_top"));
        }
        this.oneoff_0_btm.textFlow = ZJ.LangUtil.getHtmlText("oneoff_1_btm")
    }
    private step2() {
        this.label_cheat.visible = false
        this.label_cooperate.visible = false
        this.oneoff_button_next.visible = true
        this.fadeIn(this.oneoff_0_top, 150 + 10)
        this.fadeIn(this.oneoff_0_btm, 150 + 600)
        this.fadeIn(this.oneoff_button_next, 150 + 1200)
        if (GlobalData.answer == GlobalData.ANSWER_COOPERATE) {
            this.oneoff_0_top.textFlow = ZJ.LangUtil.parseHtmlText(ZJ.LangUtil.getText("oneoff_2_cooperated") + "\n" + ZJ.LangUtil.getText("oneoff_2_top"));
        }
        else {
            this.oneoff_0_top.textFlow = ZJ.LangUtil.parseHtmlText(ZJ.LangUtil.getText("oneoff_2_cheated") + "\n" + ZJ.LangUtil.getText("oneoff_2_top"));
        }
        this.oneoff_0_btm.textFlow = ZJ.LangUtil.getHtmlText("oneoff_2_btm")
    }

    private step3() {
        this.label_cheat.visible = true
        this.label_cooperate.visible = true
        this.oneoff_button_next.visible = false
        this.fadeIn(this.oneoff_0_top, 150 + 10)
        this.fadeIn(this.oneoff_0_btm, 150 + 600)
        this.fadeIn(this.label_cheat, 150 + 1200)
        this.fadeIn(this.label_cooperate, 150 + 1200)
        this.oneoff_0_top.textFlow = ZJ.LangUtil.getHtmlText("iterated_intro_top")
        this.oneoff_0_btm.textFlow = ZJ.LangUtil.getHtmlText("iterated_intro_btm")
    }

    /**
     * 开始玩
     */
    private step4() {
        this.oneoff_0_top.visible = false
        this.oneoff_0_btm.visible = false
        this.label_you.visible = false
        this.label_them.visible = false

        this.showInfo()

        // zjtodo: 动画，此处临时跳转下个界面
        ModuleUtil.openViewWithScratch(UIName.Game1, UIName.Game2)

    }

    private showInfo() {
        let text = ZJ.LangUtil.getText("iterated_info_1") + "\n" + ZJ.LangUtil.getText("iterated_info_2") + GlobalData.score
        text = text.replace(/\[X\]/g, (this.ROUND_INDEX + 1) + "");
        text = text.replace(/\[Y\]/g, (this.ROUNDS.length) + "");
        this.info.textFlow = ZJ.LangUtil.parseHtmlText(text);
    }

    public onDestroy(): number {
        super.onDestroy()
        return 0;
    }
}
