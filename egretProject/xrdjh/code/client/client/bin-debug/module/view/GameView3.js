var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var GameView3 = (function (_super) {
    __extends(GameView3, _super);
    // 常量 
    function GameView3() {
        var _this = _super.call(this) || this;
        _this._matchNumber = 0;
        _this.skinName = "GameView3Skin";
        return _this;
    }
    GameView3.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    // 变量
    GameView3.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.place_your_bets.textFlow = ZJ.LangUtil.getHtmlText("place_your_bets");
        this.forgot_whos_who.textFlow = ZJ.LangUtil.getHtmlText("forgot_whos_who");
        this.text_extra.text = "";
        this.first_match.label = ZJ.LangUtil.getText("first_match");
        this.first_match.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onfirst_match, this);
        this.next_match.label = ZJ.LangUtil.getText("next_match");
        this.next_match.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onnext_match, this);
        this.tournament_teaser.label = ZJ.LangUtil.getText("tournament_teaser");
        this.tournament_teaser.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ontournament_teaser, this);
        ModuleUtil.setCharacter(this.tft, CharacterType.tft);
        this.tft.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCharacter, this);
        ModuleUtil.setCharacter(this.all_d, CharacterType.all_d);
        this.all_d.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCharacter, this);
        ModuleUtil.setCharacter(this.all_c, CharacterType.all_c);
        this.all_c.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCharacter, this);
        ModuleUtil.setCharacter(this.grudge, CharacterType.grudge);
        this.grudge.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCharacter, this);
        ModuleUtil.setCharacter(this.prober, CharacterType.prober);
        this.prober.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCharacter, this);
        this.nextStep();
    };
    GameView3.prototype.onfirst_match = function (e) {
        this.nextStep();
    };
    GameView3.prototype.onnext_match = function (e) {
        if (this._matchNumber == 9) {
            this.nextStep();
        }
        else {
            this._matchNumber++;
            this.showTournament(this._matchNumber);
        }
    };
    GameView3.prototype.ontournament_teaser = function (e) {
        ModuleUtil.openViewWithScratch(UIName.Game3, UIName.Game4);
    };
    GameView3.prototype.onCharacter = function (e) {
        GlobalData.answer = e.currentTarget.name;
        this.nextStep();
    };
    GameView3.prototype.step0 = function () {
        this.first_match.visible = false;
        this.next_match.visible = false;
        this.text_extra.visible = false;
        this.tournament_teaser.visible = false;
    };
    GameView3.prototype.step1 = function () {
        this.place_your_bets.textFlow = ModuleUtil.replaceCharacterByID("tournament_intro", CharacterType[GlobalData.answer]);
        this.fadeIn(this.place_your_bets, 100);
        this.tft.visible = false;
        this.all_d.visible = false;
        this.all_c.visible = false;
        this.grudge.visible = false;
        this.prober.visible = false;
        this.forgot_whos_who.visible = false;
        this.first_match.visible = true;
        this.fadeIn(this.first_match, 100 + 500);
    };
    GameView3.prototype.step2 = function () {
        this.text_extra.visible = true;
        this.next_match.visible = true;
        this.first_match.visible = false;
        this._matchNumber = 0;
        this.showTournament(this._matchNumber);
    };
    GameView3.prototype.step3 = function () {
        this.text_extra.visible = false;
        this.next_match.visible = false;
        // WORDS
        var words = "";
        words += ZJ.LangUtil.getText("tournament_winner_1");
        if (GlobalData.answer == "tft") {
            words += ZJ.LangUtil.getText("tournament_winner_2_yay");
        }
        else {
            words += ZJ.LangUtil.getText("tournament_winner_2_nay");
        }
        words += "\n\n";
        words += ZJ.LangUtil.getText("tournament_winner_3");
        this.place_your_bets.textFlow = ModuleUtil.replaceCharacter(words, CharacterType[GlobalData.answer]);
        this.fadeIn(this.place_your_bets, 2000);
        this.fadeIn(this.tournament_teaser, 2000);
        this.tournament_teaser.visible = true;
    };
    GameView3.prototype.showTournament = function (num) {
        // zjtodo
        console.log("showTournament " + num);
        this.place_your_bets.text = "showTournament " + num;
        this.fadeIn(this.place_your_bets, 100);
        this.text_extra.textFlow = ZJ.LangUtil.getHtmlText("tournament_" + (num + 1));
        this.fadeIn(this.place_your_bets, 100 + 250);
        this.fadeIn(this.next_match, 100 + 500);
    };
    GameView3.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
        return 0;
    };
    return GameView3;
}(GameViewBase));
__reflect(GameView3.prototype, "GameView3");
//# sourceMappingURL=GameView3.js.map