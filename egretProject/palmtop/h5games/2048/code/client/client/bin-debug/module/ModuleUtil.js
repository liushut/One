var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ModuleUtil = (function () {
    function ModuleUtil() {
    }
    Object.defineProperty(ModuleUtil, "tables", {
        get: function () {
            return ZJ.TableManager.instance.tables;
        },
        enumerable: true,
        configurable: true
    });
    return ModuleUtil;
}());
__reflect(ModuleUtil.prototype, "ModuleUtil");
//# sourceMappingURL=ModuleUtil.js.map