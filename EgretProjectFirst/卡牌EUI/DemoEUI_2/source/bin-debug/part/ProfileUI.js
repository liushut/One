/**
 * Created by egret on 2016/1/21.
 */
var ProfileUI = (function (_super) {
    __extends(ProfileUI, _super);
    function ProfileUI() {
        _super.call(this);
        this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
        this.skinName = "resource/custom_skins/profileUISkin.exml";
    }
    var d = __define,c=ProfileUI,p=c.prototype;
    p.uiCompHandler = function () {
        var _this = this;
        console.log("\t\tProfileUI uiCompHandler");
        /// 返回逻辑
        this.btnReturn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.dispatchEventWith(GameEvents.EVT_RETURN);
        }, this);
        /// 填充数据
        var dsListSkills = [
            { icon: "skillIcon01_png", name: "旋龙幻杀" },
            { icon: "skillIcon02_png", name: "魔魂天咒" },
            { icon: "skillIcon03_png", name: "天魔舞" },
            { icon: "skillIcon04_png", name: "痴情咒" },
            { icon: "skillIcon05_png", name: "无间寂" },
            { icon: "skillIcon06_png", name: "霸天戮杀" },
            { icon: "skillIcon07_png", name: "灭魂狂飙" }
        ];
        this.listSkills.itemRendererSkinName = "profileSkillListIRSkin";
        this.listSkills.dataProvider = new eui.ArrayCollection(dsListSkills);
    };
    p.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.scrListSkills.horizontalScrollBar = null;
    };
    return ProfileUI;
})(eui.Component);
egret.registerClass(ProfileUI,'ProfileUI');
//# sourceMappingURL=ProfileUI.js.map