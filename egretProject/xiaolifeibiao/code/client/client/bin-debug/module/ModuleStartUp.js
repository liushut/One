var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ModuleStartUp = (function () {
    function ModuleStartUp() {
    }
    ModuleStartUp.init = function () {
        ZJ.SocketManager.instance.setCompany(1);
        ZJ.AudioManager.Instance.bgm = "bg";
        ZJ.AudioManager.Instance.playBgm();
        // 装载不同界面
        if (ModuleConfig.compile.single) {
            ModuleConfig.uiDatas[UIName.Settle].viewClass = SettleView;
        }
        // open
        ZJ.UIManager.instance.openView(UIName.Game);
        return 0;
    };
    return ModuleStartUp;
}());
__reflect(ModuleStartUp.prototype, "ModuleStartUp");
//# sourceMappingURL=ModuleStartUp.js.map