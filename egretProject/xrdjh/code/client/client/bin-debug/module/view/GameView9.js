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
var GameView9 = (function (_super) {
    __extends(GameView9, _super);
    // 常量 
    function GameView9() {
        var _this = _super.call(this) || this;
        _this.reproduceSteps = 0;
        _this.reproduceSteps2 = 0;
        _this.skinName = "GameView9Skin";
        return _this;
    }
    GameView9.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    // 变量
    GameView9.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.noise_evo_1.textFlow = ZJ.LangUtil.getHtmlText("noise_evo_1");
        this.forgot_whos_who.textFlow = ZJ.LangUtil.getHtmlText("forgot_whos_who");
        this.noise_evo_5_continue.textFlow = ZJ.LangUtil.getHtmlText("noise_evo_5_continue");
        this.noiseLabel.text = "";
        this.noiseSlider.addEventListener(eui.UIEvent.CHANGE, this.onNoiseSlider, this);
        this.noiseSlider.snapInterval = 0.01;
        this.noiseSlider.minimum = 0;
        this.noiseSlider.maximum = 0.5;
        ModuleUtil.setCharacter(this.tf2t, CharacterType.tf2t);
        this.tf2t.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCharacter, this);
        ModuleUtil.setCharacter(this.random, CharacterType.random);
        this.random.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCharacter, this);
        ModuleUtil.setCharacter(this.all_c, CharacterType.all_c);
        this.all_c.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCharacter, this);
        ModuleUtil.setCharacter(this.pavlov, CharacterType.pavlov);
        this.pavlov.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCharacter, this);
        ModuleUtil.setCharacter(this.tft, CharacterType.tft);
        this.tft.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCharacter, this);
        ModuleUtil.setCharacter(this.all_d, CharacterType.all_d);
        this.all_d.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCharacter, this);
        this.label_start.label = ZJ.LangUtil.getText("label_start");
        this.label_start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onlabel_start, this);
        this.label_step.label = ZJ.LangUtil.getText("label_step");
        this.label_step.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onlabel_step, this);
        this.label_reset.label = ZJ.LangUtil.getText("label_reset");
        this.label_reset.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onlabel_reset, this);
        this.noise_evo_2_2_btn.label = ZJ.LangUtil.getText("noise_evo_2_2_btn");
        this.noise_evo_2_2_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onnoise_evo_2_2_btn, this);
        this.label_continue.label = ZJ.LangUtil.getText("label_continue");
        this.label_continue.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onlabel_continue, this);
        this.noise_evo_6_btn.label = ZJ.LangUtil.getText("noise_evo_6_btn");
        this.noise_evo_6_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onnoise_evo_6_btn, this);
        this.nextStep();
    };
    GameView9.prototype.onCharacter = function (e) {
        GlobalData.answer = e.currentTarget.name;
        this.nextStep();
    };
    GameView9.prototype.onNoiseSlider = function (evt) {
        this._updateLabel(evt.target.value);
    };
    GameView9.prototype._updateLabel = function (round) {
        var words = ZJ.LangUtil.getText("sandbox_rules_3");
        round = Math.round(round * 100);
        words = words.replace(/\[N\]/g, round + ""); // replace [N] with the number value
        this.noiseLabel.textFlow = ZJ.LangUtil.parseHtmlText("<b>" + words + "</b>");
    };
    GameView9.prototype.onlabel_start = function () {
        // if (o.tournament.isAutoPlaying) {
        //     publish("tournament/autoplay/stop");
        // } else {
        //     publish("tournament/autoplay/start");
        // }
        // 临时
        this.onTournamentCompleted("reproduce");
    };
    GameView9.prototype.onTournamentCompleted = function (step) {
        if (step == "reproduce") {
            this.reproduceSteps++;
            if (this.reproduceSteps == 6) {
                // WORDS
                var words = (GlobalData.answer == "pavlov") ? ZJ.LangUtil.getText("noise_evo_2_2_correct") : ZJ.LangUtil.getText("noise_evo_2_2_incorrect");
                words += " ";
                words += ZJ.LangUtil.getText("noise_evo_2_2");
                this.text_next.textFlow = ZJ.LangUtil.parseHtmlText(words);
                this.fadeIn(this.text_next);
                // BUTTON
                this.fadeIn(this.noise_evo_2_2_btn, 300);
            }
        }
    };
    GameView9.prototype.onTournamentCompleted2 = function (step) {
        if (step == "reproduce") {
            // this.reproduceSteps2++;
            // if (this.reproduceSteps2 == 8) {
            // WORDS
            var words = (GlobalData.answer == "tf2t") ? ZJ.LangUtil.getText("noise_evo_4_2_correct") : ZJ.LangUtil.getText("noise_evo_4_2_incorrect");
            words += " ";
            words += ZJ.LangUtil.getText("noise_evo_4_2");
            this.text_next.textFlow = ZJ.LangUtil.parseHtmlText(words);
            this.fadeIn(this.text_next);
            // BUTTON
            this.setBtnText(this.noise_evo_2_2_btn, "noise_evo_4_2_btn");
            this.fadeIn(this.noise_evo_2_2_btn, 300);
            // }
        }
    };
    GameView9.prototype.onlabel_step = function () {
    };
    GameView9.prototype.onlabel_reset = function () {
        // 临时
        this.nextStep(1);
    };
    GameView9.prototype.onnoise_evo_2_2_btn = function () {
        this.nextStep();
    };
    GameView9.prototype.onlabel_continue = function () {
        this.nextStep();
    };
    GameView9.prototype.onnoise_evo_6_btn = function () {
        ModuleUtil.openViewWithScratch(UIName.Game9, UIName.Game10);
    };
    GameView9.prototype.step0 = function () {
        this.label_start.visible = false;
        this.label_step.visible = false;
        this.label_reset.visible = false;
        this.text_next.visible = false;
        this.noise_evo_2_2_btn.visible = false;
        this.all_d.visible = false;
        this.noiseSlider.visible = false;
        this.noise_evo_5_continue.visible = false;
        this.label_continue.visible = false;
        this.noise_evo_6_btn.visible = false;
    };
    GameView9.prototype.step1 = function () {
        this.tf2t.visible = false;
        this.random.visible = false;
        this.all_c.visible = false;
        this.pavlov.visible = false;
        this.tft.visible = false;
        this.forgot_whos_who.visible = false;
        this.noise_evo_1.textFlow = ModuleUtil.replaceCharacterByID("noise_evo_2", CharacterType[GlobalData.answer]);
        this.fadeIn(this.noise_evo_1);
        this.label_start.visible = true;
        this.label_step.visible = true;
        this.label_reset.visible = true;
    };
    GameView9.prototype.step2 = function () {
        this.label_start.visible = false;
        this.label_step.visible = false;
        this.label_reset.visible = false;
        this.text_next.visible = false;
        this.noise_evo_2_2_btn.visible = false;
        this.tf2t.visible = true;
        this.random.visible = true;
        this.all_d.visible = true;
        this.pavlov.visible = true;
        this.tft.visible = true;
        this.forgot_whos_who.visible = true;
        this.setHtmlText(this.noise_evo_1, "noise_evo_3");
        this.fadeIn(this.noise_evo_1);
    };
    GameView9.prototype.step3 = function () {
        this.tf2t.visible = false;
        this.random.visible = false;
        this.all_d.visible = false;
        this.pavlov.visible = false;
        this.tft.visible = false;
        this.forgot_whos_who.visible = false;
        this.label_start.visible = true;
        this.label_step.visible = true;
        this.label_reset.visible = true;
        this.noise_evo_1.textFlow = ModuleUtil.replaceCharacterByID("noise_evo_4", CharacterType[GlobalData.answer]);
        this.fadeIn(this.noise_evo_1);
        this.onTournamentCompleted2("reproduce");
    };
    GameView9.prototype.step4 = function () {
        this.noise_evo_2_2_btn.visible = false;
        this.text_next.visible = false;
        this.noise_evo_1.textFlow = ZJ.LangUtil.getHtmlText("noise_evo_5");
        this.fadeIn(this.noise_evo_1);
        this.noiseSlider.value = 0.05;
        this._updateLabel(0.05);
        this.fadeIn(this.noiseLabel, 300);
        this.fadeIn(this.noiseSlider, 300);
        // zjtodo 临时跳过
        this.fadeIn(this.noise_evo_5_continue);
        this.fadeIn(this.label_continue);
    };
    GameView9.prototype.step5 = function () {
        this.noiseLabel.visible = false;
        this.noiseSlider.visible = false;
        this.noise_evo_5_continue.visible = false;
        this.label_continue.visible = false;
        this.setHtmlText(this.noise_evo_1, "noise_evo_6");
    };
    GameView9.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
        return 0;
    };
    return GameView9;
}(GameViewBase));
__reflect(GameView9.prototype, "GameView9");
//# sourceMappingURL=GameView9.js.map