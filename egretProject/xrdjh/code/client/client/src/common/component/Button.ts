module ZJ {
	export class Button extends eui.Button {
		public constructor() {
			super();
			this.skinName = "ZJButtonSkin";
		}

		private img:eui.Image;
		protected childrenCreated(): void {
			super.childrenCreated();

			console.log(this.img)
			this.img["source"] = "w3_png"
		}
	}
}