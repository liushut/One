var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GlobalData = (function () {
    function GlobalData() {
    }
    GlobalData.ANSWER_CHEAT = "ANSWER_CHEAT";
    GlobalData.ANSWER_COOPERATE = "ANSWER_COOPERATE";
    GlobalData.RESULT_HEZUO_FU = "peep_guocheng_hezuo_fu_png";
    GlobalData.RESULT_HEZUO_PING = "peep_guocheng_hezuo_ping_png";
    GlobalData.RESULT_QIPIAN_PING = "peep_guocheng_qipian_ping_png";
    GlobalData.RESULT_QIPIAN_SHENG = "peep_guocheng_qipian_sheng_png";
    GlobalData.EYE_HEZUO_FU = "peep_daiji_hezuo_fu_png";
    GlobalData.EYE_HEZUO_PING = "peep_daiji_hezuo_ping_png";
    GlobalData.EYE_QIPIAN_PING = "peep_daiji_qipian_ping_png";
    GlobalData.EYE_QIPIAN_SHENG = "peep_daiji_qipian_sheng_png";
    GlobalData.answer = "";
    GlobalData.score = 7;
    return GlobalData;
}());
__reflect(GlobalData.prototype, "GlobalData");
//# sourceMappingURL=GlobalData.js.map