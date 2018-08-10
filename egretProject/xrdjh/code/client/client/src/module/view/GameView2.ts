class GameView2 extends GameViewBase {
    // 常量 
    public constructor() {
        super();
        this.skinName = "GameView2Skin"
    }

    // ui控件
    private score2: eui.Label
    private iterated_score_start: eui.Label
    private iterated_score_end: eui.Label
    private tft: eui.Label
    private all_d: eui.Label
    private all_c: eui.Label
    private grudge: eui.Label
    private prober: eui.Label
    private characters_teaser: eui.Label
    private characters_button: eui.Button

    protected partAdded(partName: string, instance: any): void {
        super.partAdded(partName, instance);
    }

    // 变量
    protected childrenCreated(): void {
        super.childrenCreated();

        // Score Text ID
        let scoreTextID = "";
        let score = GlobalData.score;
        if (score == 49) scoreTextID = "5";
        else if (score >= 34) scoreTextID = "4";
        else if (score >= 22) scoreTextID = "3";
        else if (score >= 8) scoreTextID = "2";
        else if (score == 7) scoreTextID = "1";
        else scoreTextID = "x";
        scoreTextID = "iterated_score_" + scoreTextID;

        this.score2.text = GlobalData.score.toString();
        this.iterated_score_start.textFlow = ZJ.LangUtil.getHtmlText("iterated_score_start")
        this.iterated_score_end.textFlow = ZJ.LangUtil.parseHtmlText(ZJ.LangUtil.getText(scoreTextID) + " " +
            ZJ.LangUtil.getText("iterated_score_end") + "\n" + ZJ.LangUtil.getText("who_were"));

        this.tft.textFlow = ZJ.LangUtil.getHtmlText("character_tft");
        this.all_d.textFlow = ZJ.LangUtil.getHtmlText("character_all_d");
        this.all_c.textFlow = ZJ.LangUtil.getHtmlText("character_all_c");
        this.grudge.textFlow = ZJ.LangUtil.getHtmlText("character_grudge");
        this.prober.textFlow = ZJ.LangUtil.getHtmlText("character_prober");

        this.characters_teaser.textFlow = ZJ.LangUtil.getHtmlText("characters_teaser");
        this.characters_button.label = ZJ.LangUtil.getText("characters_button");
        this.characters_button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.oncharacters_button, this)

    }

    private oncharacters_button() {
        ModuleUtil.openViewWithScratch(UIName.Game2, UIName.Game3)
    }

    public onDestroy(): number {
        super.onDestroy()
        return 0;
    }
}
