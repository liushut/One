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
var GameView7 = (function (_super) {
    __extends(GameView7, _super);
    // 常量 
    function GameView7() {
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
        _this.STAGES = [
            { button: "cooperate", message: "cooperate" },
            { button: "cooperate", message: "TRIP" },
            { button: "cooperate", message: "cooperate" },
            { button: "cheat", message: "cheat" }
        ];
        _this.STAGE_INDEX = 0;
        _this._foreverWar = false;
        _this._foreverMove = "cheat";
        _this.skinName = "GameView7Skin";
        return _this;
    }
    GameView7.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    GameView7.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.oneoff_0_top.textFlow = ZJ.LangUtil.getHtmlText("noise_1");
        this.oneoff_0_btm.textFlow = ZJ.LangUtil.getHtmlText("noise_1_end");
        this.one_btn.label = ZJ.LangUtil.getText("label_cooperate");
        this.one_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onone_btn, this);
        this.noise_5_btn.label = ZJ.LangUtil.getText("noise_5_btn");
        this.noise_5_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onnoise_5_btn, this);
        this.nextStep();
    };
    GameView7.prototype.onone_btn = function () {
        var s = this.STAGES[this.STAGE_INDEX];
        this.one_btn.enabled = false;
        this.oneoff_0_top.text = "";
        this.oneoff_0_btm.text = "";
        // 临时 应等动画完成再恢复下一步
        this.onRoundEnd();
    };
    GameView7.prototype.onRoundEnd = function () {
        if (this._foreverWar) {
            if (this._foreverMove == "cheat")
                this._foreverMove = "cooperate";
            else if (this._foreverMove == "cooperate")
                this._foreverMove = "cheat";
        }
        else {
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
            }
            else {
                // Reactivate buttons
                var s = this.STAGES[this.STAGE_INDEX];
                this.setBtnText(this.one_btn, "label_" + s.button);
                this.one_btn.enabled = true;
            }
        }
    };
    GameView7.prototype.onlabel_cheat = function () {
        GlobalData.answer = GlobalData.ANSWER_CHEAT;
        this.nextStep();
    };
    GameView7.prototype.onlabel_cooperate = function () {
        GlobalData.answer = GlobalData.ANSWER_COOPERATE;
        this.nextStep();
    };
    GameView7.prototype.onnoise_5_btn = function () {
        this.nextStep();
    };
    GameView7.prototype.step0 = function () {
        this.noise_5_btn.visible = false;
    };
    GameView7.prototype.step1 = function () {
        ModuleUtil.openViewWithScratch(UIName.Game7, UIName.Game8);
    };
    GameView7.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
        return 0;
    };
    return GameView7;
}(GameViewBase));
__reflect(GameView7.prototype, "GameView7");
//# sourceMappingURL=GameView7.js.map