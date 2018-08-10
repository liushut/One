class GameView3 extends GameViewBase {
    // 常量 
    public constructor() {
        super();
        this.skinName = "GameView3Skin"
    }

    // ui控件
    private place_your_bets: eui.Label
    private forgot_whos_who: eui.Label
    private text_extra: eui.Label

    private tft: eui.Button
    private all_d: eui.Button
    private all_c: eui.Button
    private grudge: eui.Button
    private prober: eui.Button
    private first_match: eui.Button
    private next_match: eui.Button
    private tournament_teaser: eui.Button
    protected partAdded(partName: string, instance: any): void {
        super.partAdded(partName, instance);
    }

    // 变量
    protected childrenCreated(): void {
        super.childrenCreated();

        this.place_your_bets.textFlow = ZJ.LangUtil.getHtmlText("place_your_bets");
        this.forgot_whos_who.textFlow = ZJ.LangUtil.getHtmlText("forgot_whos_who");
        this.text_extra.text = "";
        this.first_match.label = ZJ.LangUtil.getText("first_match");
        this.first_match.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onfirst_match, this)
        this.next_match.label = ZJ.LangUtil.getText("next_match");
        this.next_match.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onnext_match, this)
        this.tournament_teaser.label = ZJ.LangUtil.getText("tournament_teaser");
        this.tournament_teaser.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ontournament_teaser, this)

        ModuleUtil.setCharacter(this.tft, CharacterType.tft)
        this.tft.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCharacter, this)
        ModuleUtil.setCharacter(this.all_d, CharacterType.all_d)
        this.all_d.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCharacter, this)
        ModuleUtil.setCharacter(this.all_c, CharacterType.all_c)
        this.all_c.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCharacter, this)
        ModuleUtil.setCharacter(this.grudge, CharacterType.grudge)
        this.grudge.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCharacter, this)
        ModuleUtil.setCharacter(this.prober, CharacterType.prober)
        this.prober.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCharacter, this)

        this.nextStep()
    }

    private onfirst_match(e: egret.TouchEvent) {
        this.nextStep();
    }

    private onnext_match(e: egret.TouchEvent) {
        if (this._matchNumber == 9) {
            this.nextStep();
        }
        else {
            this._matchNumber++;
            this.showTournament(this._matchNumber);
        }
    }

    private ontournament_teaser(e: egret.TouchEvent) {
        ModuleUtil.openViewWithScratch(UIName.Game3, UIName.Game4)
    }

    private onCharacter(e: egret.TouchEvent) {
        GlobalData.answer = e.currentTarget.name
        this.nextStep()
    }
    private step0() {
        this.first_match.visible = false;
        this.next_match.visible = false;
        this.text_extra.visible = false;
        this.tournament_teaser.visible = false;
    }
    private step1() {
        this.place_your_bets.textFlow = ModuleUtil.replaceCharacterByID("tournament_intro", CharacterType[GlobalData.answer])
        this.fadeIn(this.place_your_bets, 100)
        this.tft.visible = false;
        this.all_d.visible = false;
        this.all_c.visible = false;
        this.grudge.visible = false;
        this.prober.visible = false;
        this.forgot_whos_who.visible = false;

        this.first_match.visible = true;
        this.fadeIn(this.first_match, 100 + 500)
    }
    private step2() {
        this.text_extra.visible = true;
        this.next_match.visible = true;
        this.first_match.visible = false;
        this._matchNumber = 0;
        this.showTournament(this._matchNumber);
    }
    private step3() {
        this.text_extra.visible = false;
        this.next_match.visible = false;
        // WORDS
        let words = "";
        words += ZJ.LangUtil.getText("tournament_winner_1");
        if (GlobalData.answer == "tft") {
            words += ZJ.LangUtil.getText("tournament_winner_2_yay");
        } else {
            words += ZJ.LangUtil.getText("tournament_winner_2_nay");
        }
        words += "\n\n";
        words += ZJ.LangUtil.getText("tournament_winner_3");
        this.place_your_bets.textFlow = ModuleUtil.replaceCharacter(words, CharacterType[GlobalData.answer])

        this.fadeIn(this.place_your_bets, 2000)
        this.fadeIn(this.tournament_teaser, 2000)

        this.tournament_teaser.visible = true;
    }

    private _matchNumber = 0
    private showTournament(num) {
        // zjtodo
        console.log("showTournament " + num)
        this.place_your_bets.text = "showTournament " + num
        this.fadeIn(this.place_your_bets, 100)
        this.text_extra.textFlow = ZJ.LangUtil.getHtmlText("tournament_" + (num + 1))
        this.fadeIn(this.place_your_bets, 100 + 250)
        this.fadeIn(this.next_match, 100 + 500)
    }

    public onDestroy(): number {
        super.onDestroy()
        return 0;
    }
}
