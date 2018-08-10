module ZJ {
	/**
	 * 使用例子：
	 * this.mName.text = ZJ.TableManager.instance.tables[xlsx.cfg_c_role][0][xlsx.c_role_role_name];
	 * cfg_c_role: cfg_表名
	 * 0: key 可以是字符串
	 * c_role_role_name: 表名_列名
	 */
	export class TableManager {
		public constructor() {
		}
		private static _instance: TableManager = new TableManager();
		static get instance(): TableManager {
			return this._instance;
		}
		public init(): number {
			this.load("bg_djw_png");
			return 0;
		}

		private _tables = {};
		public get tables(): Object {
			return this._tables;
		}

		public load(url): void {
			ResManager.instance.loadRes(url, function (a) {
				// egret.log(a);
				let m_zip = new JSZip(a);
				//通用配置解压
				let cfgs = m_zip.file(/^[tc].*/);
				for (let i = 0, li = cfgs.length; i < li; i++) {
					let cfg = cfgs[i];
					// egret.log(JSON.parse(cfg.asText()));
					let cfgName = Util.strFormat("shared/{0}", cfg.name);
					this._tables[cfgName] = JSON.parse(cfg.asText());
				}
				EventManager.instance.dispatchEvent(new egret.Event(CommonEventName.TABLE_LOADED));
			},this);
		}
	}
}