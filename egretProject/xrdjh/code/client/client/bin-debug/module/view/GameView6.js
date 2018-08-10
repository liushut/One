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
var GameView6 = (function (_super) {
    __extends(GameView6, _super);
    // 常量 
    function GameView6() {
        var _this = _super.call(this) || this;
        _this.skinName = "GameView6Skin";
        return _this;
    }
    GameView6.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    // 变量
    GameView6.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.distrust_1.textFlow = ZJ.LangUtil.getHtmlText("distrust_1");
        this.fadeIn(this.distrust_1, 600);
        this.label_start.label = ZJ.LangUtil.getText("label_start");
        this.label_start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onlabel_start, this);
        this.label_step.label = ZJ.LangUtil.getText("label_step");
        this.label_step.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onlabel_step, this);
        this.label_reset.label = ZJ.LangUtil.getText("label_reset");
        this.label_reset.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onlabel_reset, this);
        this.fadeIn(this.label_start, 800);
        this.fadeIn(this.label_step, 900);
        this.fadeIn(this.label_reset, 1000);
        // zjtodo 创建tournament
        this.roundsSlider.addEventListener(eui.UIEvent.CHANGE, this.onRoundsSliderChange, this);
        this.roundsSlider.minimum = 1;
        this.roundsSlider.maximum = 20;
        this.distrust_2_end.textFlow = ZJ.LangUtil.getHtmlText("distrust_2_end");
        this.label_continue.label = ZJ.LangUtil.getText("label_continue");
        this.label_continue.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onlabel_continue, this);
        this.distrust_3_btn.label = ZJ.LangUtil.getText("distrust_3_btn");
        this.distrust_3_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ondistrust_3_btn, this);
        this.distrust_5_btn.label = ZJ.LangUtil.getText("distrust_5_btn");
        this.distrust_5_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ondistrust_5_btn, this);
        this.nextStep();
    };
    GameView6.prototype.onlabel_start = function () {
        // if (o.tournament.isAutoPlaying) {
        //     publish("tournament/autoplay/stop");
        // } else {
        //     publish("tournament/autoplay/start");
        // }
        // 临时
        this.onTournamentCompleted("reproduce");
    };
    GameView6.prototype.onlabel_step = function () {
    };
    GameView6.prototype.onlabel_reset = function () {
        // 临时
        this.nextStep();
    };
    GameView6.prototype.onlabel_continue = function () {
        this.nextStep();
    };
    GameView6.prototype.ondistrust_3_btn = function () {
        this.nextStep();
    };
    GameView6.prototype.ondistrust_5_btn = function () {
        ModuleUtil.openViewWithScratch(UIName.Game6, UIName.Game7);
    };
    GameView6.prototype.onRoundsSliderChange = function (evt) {
        this._updateLabel(evt.target.value);
    };
    GameView6.prototype._updateLabel = function (round) {
        var words = (round == 1) ? ZJ.LangUtil.getText("sandbox_rules_1_single") : ZJ.LangUtil.getText("sandbox_rules_1"); // plural?
        words = words.replace(/\[N\]/g, round + ""); // replace [N] with the number value
        this.roundsLabel.textFlow = ZJ.LangUtil.parseHtmlText("<b>" + words + "</b>");
    };
    GameView6.prototype.onTournamentCompleted = function (step) {
        if (step == "reproduce") {
            this.nextStep();
        }
    };
    GameView6.prototype.step0 = function () {
        this.roundsLabel.text = "";
        this.roundsSlider.visible = false;
        this.distrust_2_end.visible = false;
        this.label_continue.visible = false;
        this.distrust_3_btn.visible = false;
        this.distrust_5_btn.visible = false;
    };
    GameView6.prototype.step1 = function () {
        this.setHtmlText(this.distrust_1, "distrust_2");
        this.fadeIn(this.distrust_1, 100);
        this.roundsSlider.visible = true;
        this.fadeIn(this.roundsSlider, 500);
        this.roundsSlider.value = 10;
        this._updateLabel(this.roundsSlider.value);
    };
    GameView6.prototype.step2 = function () {
        this.distrust_2_end.visible = true;
        this.fadeIn(this.distrust_2_end, 100);
        this.label_continue.visible = true;
        this.fadeIn(this.label_continue, 100);
    };
    GameView6.prototype.step3 = function () {
        this.roundsLabel.text = "";
        this.roundsSlider.visible = false;
        this.distrust_2_end.visible = false;
        this.label_continue.visible = false;
        this.setHtmlText(this.distrust_1, "distrust_3");
        this.fadeIn(this.distrust_1, 100);
        this.distrust_3_btn.visible = true;
        this.fadeIn(this.distrust_3_btn, 400);
    };
    GameView6.prototype.step4 = function () {
        this.distrust_3_btn.visible = false;
        // zjtodo 临时全部显示
        this.setHtmlText(this.distrust_2_end, "distrust_4_note");
        this.label_continue.visible = true;
        this.fadeIn(this.distrust_2_end, 100);
        this.fadeIn(this.label_continue, 100);
        this.setHtmlText(this.distrust_1, "distrust_4");
        this.setHtmlText(this.distrust_4_2, "distrust_4_2");
        this.setHtmlText(this.distrust_4_note_2, "distrust_4_note_2");
        this.fadeIn(this.distrust_1, 100);
        this.fadeIn(this.distrust_4_2, 500);
        this.fadeIn(this.distrust_4_note_2, 500);
    };
    GameView6.prototype.step5 = function () {
        this.distrust_4_note_2.text = "";
        this.distrust_4_2.text = "";
        this.distrust_2_end.text = "";
        this.label_continue.visible = false;
        this.setHtmlText(this.distrust_1, "distrust_5");
        this.fadeIn(this.distrust_1, 100);
        this.distrust_5_btn.visible = true;
        this.fadeIn(this.distrust_5_btn, 400);
    };
    GameView6.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
        return 0;
    };
    return GameView6;
}(GameViewBase));
__reflect(GameView6.prototype, "GameView6");
//# sourceMappingURL=GameView6.js.map