var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ZJ;
(function (ZJ) {
    var LangUtil = (function () {
        function LangUtil() {
        }
        LangUtil.setLanguage = function (lang) {
            this._lang = lang;
        };
        LangUtil.getText = function (id) {
            return ZJ.TableManager.instance.tables[xlsx.cfg_c_lang][id][this._lang].replace(/\\n/g, "\n");
        };
        LangUtil.getHtmlText = function (id) {
            var result = this.getText(id);
            result = this.htmlTextParser.parse(result);
            return result;
        };
        LangUtil.parseHtmlText = function (text) {
            var result = this.htmlTextParser.parse(text);
            return result;
        };
        LangUtil.getResName = function (simpleName) {
            switch (this._lang) {
                case this.LANGUAGE_CHINESE_TRADITIONAL:
                    simpleName += "_td";
                    break;
                case this.LANGUAGE_ENGLISH:
                    simpleName += "_en";
                    break;
            }
            return simpleName;
        };
        LangUtil.LANGUAGE_ENGLISH = xlsx.c_lang_EN;
        LangUtil.LANGUAGE_CHINESE = xlsx.c_lang_CN;
        LangUtil.LANGUAGE_CHINESE_TRADITIONAL = xlsx.c_lang_CN_TD;
        LangUtil.LANGUAGE_JAPANESE = "JP";
        LangUtil.LANGUAGE_FRENCH = "FR";
        LangUtil.LANGUAGE_GERMAN = "GE";
        LangUtil.LANGUAGE_ITALY = "IT";
        LangUtil.LANGUAGE_KOREA = "KR";
        LangUtil.LANGUAGE_RUSSIA = "RU";
        LangUtil.LANGUAGE_SPANISH = "SP";
        LangUtil._lang = LangUtil.LANGUAGE_CHINESE;
        LangUtil.htmlTextParser = new egret.HtmlTextParser();
        return LangUtil;
    }());
    ZJ.LangUtil = LangUtil;
    __reflect(LangUtil.prototype, "ZJ.LangUtil");
})(ZJ || (ZJ = {}));
//# sourceMappingURL=LangUtil.js.map