module ZJ {
	export class UIManager {
		private static _instance: UIManager = new UIManager();
		public constructor() {
		}
		static get instance(): UIManager {
			return this._instance;
		}
		public init(uiroot: eui.UILayer): number {
			this.uiroot = uiroot;
			return 0;
		}

		private _uiLayers: number[] = [];
		public set uiLayers(value: number[]) {
			if (this._uiLayers.length > 0) {
				egret.warn("uiLayers已经设定。");
			}
			else {
				this._uiLayers = value;
				for (let i = 0, len = this._uiLayers.length; i < len; ++i) {
					let group = new eui.Group();
					group.name = "layer" + i;
					group.touchEnabled = false;
					this.uiroot.addChild(group);
					group.percentWidth = 100;
					group.percentHeight = 100;
				}
			}MyCDM
		}
		public uiDatas: { [key: string]: UIData } = {};
		private getUIData(viewName: string): UIData {
			return this.uiDatas[viewName];
		}

		private uiroot: eui.UILayer = null;
		private views: { [key: string]: ZJ.ViewBase } = {};

		/**
		 * 获得view
		 */
		public getView(viewName: string): ZJ.ViewBase {
			return this.views[viewName];
		}

		/**
		 * 打开view
		 */
		public openView(viewName: string): ZJ.ViewBase {
			let uidata = this.getUIData(viewName);
			if (uidata == undefined) {
				egret.log("ModuleConfig没有界面配置: " + viewName);
				return null;
			}
			let viewExist = this.getView(viewName);
			if (viewExist != undefined) {

			} else {
				viewExist = new uidata.viewClass();
				if (viewExist != undefined) {
					viewExist.percentWidth = 100;
					viewExist.percentHeight = 100;
					this.views[viewName] = viewExist;
					let layer = 0;
					if(uidata.layer < this.uiroot.numChildren)
					{
						layer = uidata.layer;
					}
					(this.uiroot.getChildAt(layer) as eui.Component).addChild(viewExist);
				}
				else{
					console.warn("viewClass不存在 请检查ModuleConfig.uiDatas");
					return null;
				}
			}
			viewExist.visible = true;
			viewExist.parent.setChildIndex(viewExist, 9999) // 置顶
			viewExist.show();
			return viewExist;
		}

		/**
		 * 销毁view
		 */
		public destroyView(viewName: string): number {
			let view = this.getView(viewName);
			if (view != undefined && view != null) {
				view.onDestroy();
				view.parent.removeChild(view);
				this.views[viewName] = null;
			}
			return 0;
		}

	}
}