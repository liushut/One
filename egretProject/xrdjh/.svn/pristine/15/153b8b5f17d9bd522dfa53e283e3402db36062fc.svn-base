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
var GameView1 = (function (_super) {
    __extends(GameView1, _super);
    // 常量 
    function GameView1() {
        var _this = _super.call(this) || this;
        // 变量
        _this.ROUNDS = [
            { id: "tft", num: 5 },
            { id: "all_d", num: 4 },
            { id: "all_c", num: 4 },
            { id: "grudge", num: 5 },
            { id: "prober", num: 7 } // min 2, max 15
        ]; // TOTAL... MIN 7, MAX 49
        _this.ROUND_INDEX = 0;
        _this.ROUND_NUM = 0;
        _this.iterated = null;
        _this.skinName = "GameView1Skin";
        return _this;
    }
    GameView1.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    GameView1.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.label_you.textFlow = ZJ.LangUtil.getHtmlText("label_you");
        this.label_them.textFlow = ZJ.LangUtil.getHtmlText("label_them");
        this.oneoff_0_top.textFlow = ZJ.LangUtil.getHtmlText("oneoff_0_top");
        this.oneoff_0_btm.textFlow = ZJ.LangUtil.getHtmlText("oneoff_0_btm");
        this.label_cheat.label = ZJ.LangUtil.getText("label_cheat");
        this.label_cheat.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onlabel_cheat, this);
        this.label_cooperate.label = ZJ.LangUtil.getText("label_cooperate");
        this.label_cooperate.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onlabel_cooperate, this);
        this.oneoff_button_next.label = ZJ.LangUtil.getText("oneoff_button_next");
        this.oneoff_button_next.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ononeoff_button_next, this);
        ZJ.EventManager.instance.addEventListener(EventName.ITERATED_ROUND_START, this.onIteratedRoundStart, this);
        ZJ.EventManager.instance.addEventListener(EventName.ITERATED_ROUND_END, this.onIteratedRoundEnd, this);
        this.iterated = new Iterated();
        this.gMain.addChild(this.iterated);
        this.iterated.x = 0;
        this.iterated.y = 700;
        this.step0();
    };
    GameView1.prototype.onIteratedRoundStart = function (e) {
    };
    GameView1.prototype.onIteratedRoundEnd = function (e) {
        this.label_cheat.enabled = true;
    };
    GameView1.prototype.onlabel_cheat = function () {
        GlobalData.answer = GlobalData.ANSWER_CHEAT;
        this.nextStep();
        this.iterated.startGame(GlobalData.answer, GlobalData.ANSWER_COOPERATE);
        this.label_cheat.enabled = false;
    };
    GameView1.prototype.onlabel_cooperate = function () {
        GlobalData.answer = GlobalData.ANSWER_COOPERATE;
        this.nextStep();
        this.iterated.startGame(GlobalData.answer, GlobalData.ANSWER_COOPERATE);
        this.label_cheat.enabled = false;
    };
    GameView1.prototype.ononeoff_button_next = function () {
        this.nextStep(3);
    };
    GameView1.prototype.step0 = function () {
        this.oneoff_button_next.visible = false;
        this.info.visible = false;
    };
    GameView1.prototype.step1 = function () {
        this.fadeIn(this.oneoff_0_top, 150 + 10);
        this.fadeIn(this.oneoff_0_btm, 150 + 600);
        this.fadeIn(this.label_cheat, 150 + 1200);
        this.fadeIn(this.label_cooperate, 150 + 1200);
        if (GlobalData.answer == GlobalData.ANSWER_COOPERATE) {
            this.oneoff_0_top.textFlow = ZJ.LangUtil.parseHtmlText(ZJ.LangUtil.getText("oneoff_1_cooperated") + "\n" + ZJ.LangUtil.getText("oneoff_1_top"));
        }
        else {
            this.oneoff_0_top.textFlow = ZJ.LangUtil.parseHtmlText(ZJ.LangUtil.getText("oneoff_1_cheated") + "\n" + ZJ.LangUtil.getText("oneoff_1_top"));
        }
        this.oneoff_0_btm.textFlow = ZJ.LangUtil.getHtmlText("oneoff_1_btm");
    };
    GameView1.prototype.step2 = function () {
        this.label_cheat.visible = false;
        this.label_cooperate.visible = false;
        this.oneoff_button_next.visible = true;
        this.fadeIn(this.oneoff_0_top, 150 + 10);
        this.fadeIn(this.oneoff_0_btm, 150 + 600);
        this.fadeIn(this.oneoff_button_next, 150 + 1200);
        if (GlobalData.answer == GlobalData.ANSWER_COOPERATE) {
            this.oneoff_0_top.textFlow = ZJ.LangUtil.parseHtmlText(ZJ.LangUtil.getText("oneoff_2_cooperated") + "\n" + ZJ.LangUtil.getText("oneoff_2_top"));
        }
        else {
            this.oneoff_0_top.textFlow = ZJ.LangUtil.parseHtmlText(ZJ.LangUtil.getText("oneoff_2_cheated") + "\n" + ZJ.LangUtil.getText("oneoff_2_top"));
        }
        this.oneoff_0_btm.textFlow = ZJ.LangUtil.getHtmlText("oneoff_2_btm");
    };
    GameView1.prototype.step3 = function () {
        this.label_cheat.visible = true;
        this.label_cooperate.visible = true;
        this.oneoff_button_next.visible = false;
        this.fadeIn(this.oneoff_0_top, 150 + 10);
        this.fadeIn(this.oneoff_0_btm, 150 + 600);
        this.fadeIn(this.label_cheat, 150 + 1200);
        this.fadeIn(this.label_cooperate, 150 + 1200);
        this.oneoff_0_top.textFlow = ZJ.LangUtil.getHtmlText("iterated_intro_top");
        this.oneoff_0_btm.textFlow = ZJ.LangUtil.getHtmlText("iterated_intro_btm");
    };
    /**
     * 开始玩
     */
    GameView1.prototype.step4 = function () {
        this.oneoff_0_top.visible = false;
        this.oneoff_0_btm.visible = false;
        this.label_you.visible = false;
        this.label_them.visible = false;
        this.showInfo();
        // zjtodo: 动画，此处临时跳转下个界面
        ModuleUtil.openViewWithScratch(UIName.Game1, UIName.Game2);
    };
    GameView1.prototype.showInfo = function () {
        var text = ZJ.LangUtil.getText("iterated_info_1") + "\n" + ZJ.LangUtil.getText("iterated_info_2") + GlobalData.score;
        text = text.replace(/\[X\]/g, (this.ROUND_INDEX + 1) + "");
        text = text.replace(/\[Y\]/g, (this.ROUNDS.length) + "");
        this.info.textFlow = ZJ.LangUtil.parseHtmlText(text);
    };
    GameView1.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
        return 0;
    };
    return GameView1;
}(GameViewBase));
__reflect(GameView1.prototype, "GameView1");
//# sourceMappingURL=GameView1.js.map