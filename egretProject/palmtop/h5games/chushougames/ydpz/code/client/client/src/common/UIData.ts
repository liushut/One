module ZJ {
	export class UIData {
		public constructor(viewName:string, layer:number = 0, viewClass = null) {
			this.viewName = viewName;
			this.layer = layer;
			this.viewClass = viewClass;
		}

		public viewName:string = "";
		public layer:number = 0;
		public viewClass:typeof ViewBase = null;
	}
}