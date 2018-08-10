module ZJ {
	export class LangUtil {
		public constructor() {
		}

		public static LANGUAGE_ENGLISH = xlsx.c_lang_EN;
		public static LANGUAGE_CHINESE = xlsx.c_lang_CN;
		public static LANGUAGE_CHINESE_TRADITIONAL = xlsx.c_lang_CN_TD;
		public static LANGUAGE_JAPANESE = "JP";
		public static LANGUAGE_FRENCH = "FR";
		public static LANGUAGE_GERMAN = "GE";
		public static LANGUAGE_ITALY = "IT";
		public static LANGUAGE_KOREA = "KR";
		public static LANGUAGE_RUSSIA = "RU";
		public static LANGUAGE_SPANISH = "SP";

		private static _lang = LangUtil.LANGUAGE_CHINESE;
		public static setLanguage(lang: string) {
			this._lang = lang
		}

		public static getText(id: string):any {
			return ZJ.TableManager.instance.tables[xlsx.cfg_c_lang][id][this._lang].replace(/\\n/g, "\n");
		}

		private static htmlTextParser:egret.HtmlTextParser = new egret.HtmlTextParser()
		public static getHtmlText(id: string):any {
			let result = this.getText(id)
			result = this.htmlTextParser.parse(result)
			return result
		}
		public static parseHtmlText(text: string):any {
			let result = this.htmlTextParser.parse(text)
			return result
		}

		public static getResName(simpleName: string) {
			switch (this._lang) {
				case this.LANGUAGE_CHINESE_TRADITIONAL:
					simpleName += "_td";
					break;
				case this.LANGUAGE_ENGLISH:
					simpleName += "_en";
					break;
			}
			return simpleName;
		}

	}
}