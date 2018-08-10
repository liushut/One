module ZJ {
	/**
	 * 倒数。目前只支持显示00:00格式。
	 */
	export class CountDown extends eui.Component implements eui.UIComponent {
		public constructor() {
			super();
			this.skinName = "CountDownSkin";
		}

		public label: eui.Label;
		public cb = null; // 结束callback
		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}

		private leftSecond = 0;
		private intervalID = 0;
		private isPause = false;
		protected childrenCreated(): void {
			super.childrenCreated();
		}


		public start(second: number): void {
			this.stop();
			this.isPause = false;
			this.leftSecond = second;
			this.count();
			this.intervalID = setInterval(() => { this.count() }, 1000);
		}

		public pause(): void {
			this.isPause = true;
		}

		public resume(): void {
			this.isPause = false;
		}

		public stop(): void {
			clearInterval(this.intervalID);
		}

		public setSecond(second:number):void
		{
			// todo 待扩展
			// let days = second / 1000 / 60 / 60 / 24; 
			// let hours = second / 1000 / 60 / 60 % 24;
			let minutes = Math.floor(second / 60) % 60;
			let seconds = second % 60;
			let minutesStr = this.checkTime(minutes);
			let secondsStr = this.checkTime(seconds);

			this.label.text = Util.strFormat("{0}:{1}", minutesStr, secondsStr);
		}

		private count(): void {
			this.setSecond(this.leftSecond);

			if (this.leftSecond == 0) {
				this.stop();
				if (this.cb != null) {
					this.cb();
				}
				return;
			}
			if (this.isPause) {
				return;
			}

			this.leftSecond--;
		}

		private checkTime(i) {
			if (i < 10) {
				i = "0" + i;
			}
			return i;
		}

		/**
		 * 销毁前调用
		 */
		public OnDestroy() {
			this.cb = null;
			this.stop();
		}

	}
}