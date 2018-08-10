class ModuleUtil {
	public constructor() {
	}

	public static get tables(): any {
		return ZJ.TableManager.instance.tables;
	}

	public static openViewWithScratch(from: string, to: string) {
		let scratch = ZJ.UIManager.instance.openView(UIName.Scratch)
		scratch.setData({ from: from, to: to })
	}


	public static setCharacter(btn: eui.Button, type: CharacterType) {
		let config = this.getCharacterConfig(type);

		let labelDisplay = btn.labelDisplay as eui.Label
		labelDisplay.textFlow = ZJ.LangUtil.parseHtmlText(config.text);
		labelDisplay.horizontalCenter = 20
		btn.icon = config.icon;
		btn.iconDisplay.horizontalCenter = config.offsetX;
		btn.name = CharacterType[type]
	}

	public static getCharacterConfig(type: CharacterType): { text, icon, offsetX } {
		let text = ""
		let icon = "sandbox_hats_" + CharacterType[type] + "_png";
		let offsetX = 0;
		switch (type) {
			case CharacterType.tft:
				text = "<font color=0x4089DD>复读机</font>"
				offsetX = -120
				break;
			case CharacterType.all_d:
				text = "<font color=0x52537F>千年老油条</font>"
				offsetX = -160
				break;
			case CharacterType.all_c:
				text = "<font color=0xFF75FF>万年小粉红</font>"
				offsetX = -160
				break;
			case CharacterType.grudge:
				text = "<font color=0xefc701>黑帮老铁</font>"
				offsetX = -140
				break;
			case CharacterType.prober:
				text = "<font color=0xf6b24c>福尔摩星儿</font>"
				offsetX = -160
				break;
			case CharacterType.tf2t:
				text = "<font color=0x88A8CE>复读鸭</font>"
				offsetX = -120
				break;
			case CharacterType.pavlov:
				text = "<font color=0x86C448>一根筋</font>"
				offsetX = -120
				break;
			case CharacterType.random:
				text = "<font color=0xFF5E5E>胡乱来</font>"
				offsetX = -120
				break;
		}
		return { text: text, icon: icon, offsetX: offsetX }
	}

	public static replaceCharacterByID(textID: string, type: CharacterType): any {
		return this.replaceCharacter(ZJ.LangUtil.getText(textID), type)
	}

	public static replaceCharacter(text: string, type: CharacterType): any {
		return ZJ.LangUtil.parseHtmlText(text.replace(/\[CHAR\]/g,
			ModuleUtil.getCharacterConfig(type).text));
	}
}

enum CharacterType {
	/**
	 * 复读机
	 */
	tft,
	/**
	 * 千年老油条
	 */
	all_d,
	/**
	 * 万年小粉红
	 */
	all_c,
	/**
	 * 黑帮老铁
	 */
	grudge,
	/**
	 * 福尔摩星儿
	 */
	prober,
	/**
	 * 复读鸭
	 */
	tf2t,
	/**
	 * 一根筋
	 */
	pavlov,
	/**
	 * 胡乱来
	 */
	random
}