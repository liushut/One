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
    ModuleUtil.openViewWithScratch = function (from, to) {
        var scratch = ZJ.UIManager.instance.openView(UIName.Scratch);
        scratch.setData({ from: from, to: to });
    };
    ModuleUtil.setCharacter = function (btn, type) {
        var config = this.getCharacterConfig(type);
        var labelDisplay = btn.labelDisplay;
        labelDisplay.textFlow = ZJ.LangUtil.parseHtmlText(config.text);
        labelDisplay.horizontalCenter = 20;
        btn.icon = config.icon;
        btn.iconDisplay.horizontalCenter = config.offsetX;
        btn.name = CharacterType[type];
    };
    ModuleUtil.getCharacterConfig = function (type) {
        var text = "";
        var icon = "sandbox_hats_" + CharacterType[type] + "_png";
        var offsetX = 0;
        switch (type) {
            case CharacterType.tft:
                text = "<font color=0x4089DD>复读机</font>";
                offsetX = -120;
                break;
            case CharacterType.all_d:
                text = "<font color=0x52537F>千年老油条</font>";
                offsetX = -160;
                break;
            case CharacterType.all_c:
                text = "<font color=0xFF75FF>万年小粉红</font>";
                offsetX = -160;
                break;
            case CharacterType.grudge:
                text = "<font color=0xefc701>黑帮老铁</font>";
                offsetX = -140;
                break;
            case CharacterType.prober:
                text = "<font color=0xf6b24c>福尔摩星儿</font>";
                offsetX = -160;
                break;
            case CharacterType.tf2t:
                text = "<font color=0x88A8CE>复读鸭</font>";
                offsetX = -120;
                break;
            case CharacterType.pavlov:
                text = "<font color=0x86C448>一根筋</font>";
                offsetX = -120;
                break;
            case CharacterType.random:
                text = "<font color=0xFF5E5E>胡乱来</font>";
                offsetX = -120;
                break;
        }
        return { text: text, icon: icon, offsetX: offsetX };
    };
    ModuleUtil.replaceCharacterByID = function (textID, type) {
        return this.replaceCharacter(ZJ.LangUtil.getText(textID), type);
    };
    ModuleUtil.replaceCharacter = function (text, type) {
        return ZJ.LangUtil.parseHtmlText(text.replace(/\[CHAR\]/g, ModuleUtil.getCharacterConfig(type).text));
    };
    return ModuleUtil;
}());
__reflect(ModuleUtil.prototype, "ModuleUtil");
var CharacterType;
(function (CharacterType) {
    /**
     * 复读机
     */
    CharacterType[CharacterType["tft"] = 0] = "tft";
    /**
     * 千年老油条
     */
    CharacterType[CharacterType["all_d"] = 1] = "all_d";
    /**
     * 万年小粉红
     */
    CharacterType[CharacterType["all_c"] = 2] = "all_c";
    /**
     * 黑帮老铁
     */
    CharacterType[CharacterType["grudge"] = 3] = "grudge";
    /**
     * 福尔摩星儿
     */
    CharacterType[CharacterType["prober"] = 4] = "prober";
    /**
     * 复读鸭
     */
    CharacterType[CharacterType["tf2t"] = 5] = "tf2t";
    /**
     * 一根筋
     */
    CharacterType[CharacterType["pavlov"] = 6] = "pavlov";
    /**
     * 胡乱来
     */
    CharacterType[CharacterType["random"] = 7] = "random";
})(CharacterType || (CharacterType = {}));
//# sourceMappingURL=ModuleUtil.js.map