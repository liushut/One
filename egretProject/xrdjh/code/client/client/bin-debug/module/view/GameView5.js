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
var GameView5 = (function (_super) {
    __extends(GameView5, _super);
    // 常量 
    function GameView5() {
        var _this = _super.call(this) || this;
        // private textStep = 2;
        _this.textStep = 8; // debug
        _this.autoStep = 0;
        _this.isPlaying = false;
        _this.nextStepBtn = null;
        _this.skinName = "GameView5Skin";
        return _this;
    }
    GameView5.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    // 变量
    GameView5.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.evo_1.textFlow = ZJ.LangUtil.getHtmlText("evo_1");
        this.evo_10_followup.textFlow = ZJ.LangUtil.getHtmlText("evo_10_followup");
        this.forgot_whos_who.textFlow = ZJ.LangUtil.getHtmlText("forgot_whos_who");
        ModuleUtil.setCharacter(this.tft, CharacterType.tft);
        this.tft.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCharacter, this);
        ModuleUtil.setCharacter(this.all_d, CharacterType.all_d);
        this.all_d.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCharacter, this);
        ModuleUtil.setCharacter(this.all_c, CharacterType.all_c);
        this.all_c.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCharacter, this);
        this.label_play_tournament.label = ZJ.LangUtil.getText("label_play_tournament");
        this.label_play_tournament.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onlabel_play_tournament, this);
        this.label_eliminate_bottom_5.label = ZJ.LangUtil.getText("label_eliminate_bottom_5");
        this.label_eliminate_bottom_5.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onlabel_eliminate_bottom_5, this);
        this.label_reproduce_top_5.label = ZJ.LangUtil.getText("label_reproduce_top_5");
        this.label_reproduce_top_5.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onlabel_reproduce_top_5, this);
        this.evo_9_btn.label = ZJ.LangUtil.getText("evo_9_btn");
        this.evo_9_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onevo_9_btn, this);
        this.evo_autoplay.label = ZJ.LangUtil.getText("evo_autoplay");
        this.evo_autoplay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onevo_autoplay, this);
        this.evo_10_btn.label = ZJ.LangUtil.getText("evo_10_btn");
        this.evo_10_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onevo_10_btn, this);
        this.evo_11_btn.label = ZJ.LangUtil.getText("evo_11_btn");
        this.evo_11_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onevo_11_btn, this);
        this.nextStep();
    };
    GameView5.prototype.onCharacter = function (e) {
        GlobalData.answer = e.currentTarget.name;
        this.nextStep();
    };
    GameView5.prototype.onlabel_play_tournament = function () {
        this.label_play_tournament.enabled = false;
        this.nextStepBtn = this.label_eliminate_bottom_5;
        this.onTournamentCompleted("");
    };
    GameView5.prototype.onlabel_eliminate_bottom_5 = function () {
        this.label_eliminate_bottom_5.enabled = false;
        this.nextStepBtn = this.label_reproduce_top_5;
        this.onTournamentCompleted("");
    };
    GameView5.prototype.onlabel_reproduce_top_5 = function () {
        this.label_reproduce_top_5.enabled = false;
        this.nextStepBtn = this.label_play_tournament;
        this.onTournamentCompleted("reproduce");
    };
    GameView5.prototype.onTournamentCompleted = function (step) {
        // zjtodo 图形
        this.nextStepBtn.enabled = true;
        if (step == "reproduce") {
            this.textStep++;
            var response = "";
            if (this.textStep < 9) {
                if (this.textStep == 3) {
                    response = ZJ.LangUtil.getText("evo_3_" + GlobalData.answer) + " " + ZJ.LangUtil.getText("evo_3");
                }
                else {
                    response = ZJ.LangUtil.getText("evo_" + this.textStep);
                }
                this.evo_1.textFlow = ZJ.LangUtil.parseHtmlText(response);
                this.fadeIn(this.evo_1, 100);
                this._showButtons();
            }
            else {
                this.nextStep();
            }
        }
    };
    GameView5.prototype.onAutoTournamentCompleted = function () {
        this.autoStep++;
        if (this.autoStep == 13) {
            this._goOn();
        }
    };
    GameView5.prototype._goOn = function () {
        this.evo_10_followup.visible = true;
        this.evo_10_btn.visible = true;
        this.fadeIn(this.evo_10_followup, 400);
        this.fadeIn(this.evo_10_btn, 600);
    };
    GameView5.prototype.onevo_9_btn = function () {
        this.nextStep();
    };
    GameView5.prototype.onevo_10_btn = function () {
        this.nextStep();
    };
    GameView5.prototype.onevo_11_btn = function () {
        ModuleUtil.openViewWithScratch(UIName.Game5, UIName.Game6);
    };
    GameView5.prototype.onevo_autoplay = function () {
        if (!this.isPlaying) {
            this.evo_autoplay.label = ZJ.LangUtil.getText("evo_autoplay_stop");
            // publish("tournament/autoplay/start");
            this.isPlaying = true;
        }
        else {
            this.evo_autoplay.label = ZJ.LangUtil.getText("evo_autoplay");
            // publish("tournament/autoplay/stop");
            this.isPlaying = false;
        }
        // zjtodo 临时跳过
        this._goOn();
    };
    GameView5.prototype.step0 = function () {
        this.label_play_tournament.visible = false;
        this.label_eliminate_bottom_5.visible = false;
        this.label_reproduce_top_5.visible = false;
        this.evo_9_btn.visible = false;
        this.evo_autoplay.visible = false;
        this.evo_10_followup.visible = false;
        this.evo_10_btn.visible = false;
        this.evo_11_btn.visible = false;
    };
    GameView5.prototype.step1 = function () {
        this.forgot_whos_who.visible = false;
        this.tft.visible = false;
        this.all_d.visible = false;
        this.all_c.visible = false;
        this.evo_1.textFlow = ZJ.LangUtil.parseHtmlText(ZJ.LangUtil.getText("evo_2_" + GlobalData.answer) + " " + ZJ.LangUtil.getText("evo_2"));
        this.fadeIn(this.evo_1, 100);
        this.label_play_tournament.visible = true;
        this.label_eliminate_bottom_5.visible = true;
        this.label_eliminate_bottom_5.enabled = false;
        this.label_reproduce_top_5.visible = true;
        this.label_reproduce_top_5.enabled = false;
        this._showButtons();
    };
    GameView5.prototype._showButtons = function () {
        this.fadeIn(this.label_play_tournament, 500);
        this.fadeIn(this.label_eliminate_bottom_5, 600);
        this.fadeIn(this.label_reproduce_top_5, 700);
    };
    GameView5.prototype.step2 = function () {
        this.label_play_tournament.visible = false;
        this.label_eliminate_bottom_5.visible = false;
        this.label_reproduce_top_5.visible = false;
        var response = ZJ.LangUtil.getText("evo_9") + "\n\n" + ZJ.LangUtil.getText("evo_9_" + GlobalData.answer) + " " + ZJ.LangUtil.getText("evo_9_end");
        this.evo_1.textFlow = ZJ.LangUtil.parseHtmlText(response);
        this.evo_9_btn.visible = true;
        this.fadeIn(this.evo_9_btn, 400);
    };
    GameView5.prototype.step3 = function () {
        this.evo_9_btn.visible = false;
        this.evo_1.textFlow = ZJ.LangUtil.getHtmlText("evo_10");
        this.fadeIn(this.evo_1, 1000);
        this.evo_autoplay.visible = true;
        this.fadeIn(this.evo_autoplay, 1200);
    };
    GameView5.prototype.step4 = function () {
        this.evo_10_btn.visible = false;
        this.evo_10_followup.visible = false;
        this.evo_autoplay.visible = false;
        this.evo_1.textFlow = ZJ.LangUtil.getHtmlText("evo_11");
        this.evo_11_btn.visible = true;
    };
    GameView5.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
        return 0;
    };
    return GameView5;
}(GameViewBase));
__reflect(GameView5.prototype, "GameView5");
//# sourceMappingURL=GameView5.js.map