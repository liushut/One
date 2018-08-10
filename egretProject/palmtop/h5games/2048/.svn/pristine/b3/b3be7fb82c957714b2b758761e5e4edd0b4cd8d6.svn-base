module ZJ {
	export class Gesture extends ZJ.ComponentBase {
		private INTERVAL = 60;
		private DISTANCE = 20;
		public constructor() {
			super();
		}

		private layer: eui.Image;
		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}

		private pastTime = 0;
		private lastPos = new Vector3();
		private nowPos = new Vector3();
		private isBegin = false;
		private intervalID = 0;
		protected childrenCreated(): void {
			super.childrenCreated();

			this.layer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
			this.layer.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
			this.layer.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);

			this.intervalID = setInterval(() => {
				this.onInterval();
			}, this.INTERVAL)
		}

		private onInterval(): void {
			if (this.isBegin) {
				let deltaX = this.nowPos.x - this.lastPos.x;
				let deltaY = this.nowPos.y - this.lastPos.y;
				let absX = Math.abs(deltaX);
				let absY = Math.abs(deltaY);

				let data: any = {};
				if (absX > absY) {
					if (absX > this.DISTANCE) {
						if (deltaX > 0) {
							// console.log("右");
							data.direct = CommonConfig.RIGHT;
						}
						else {
							// console.log("左");
							data.direct = CommonConfig.LEFT;
						}
						this.isBegin = false;
					}
				}
				else {
					if (absY > this.DISTANCE) {
						if (deltaY > 0) {
							// console.log("下");
							data.direct = CommonConfig.DOWN;
						}
						else {
							// console.log("上");
							data.direct = CommonConfig.UP;
						}
						this.isBegin = false;
					}
				}

				if (!this.isBegin) {
					let e = new egret.Event(CommonEventName.GESTURE_DIRECT);
					e.data = data;
					EventManager.instance.dispatchEvent(e);
				}

				this.lastPos.x = this.nowPos.x;
				this.lastPos.y = this.nowPos.y;

			}
		}

		private onTouchBegin(e: egret.TouchEvent): void {
			this.pastTime = 0;
			this.nowPos.x = e.stageX
			this.nowPos.y = e.stageY
			this.lastPos.x = e.stageX
			this.lastPos.y = e.stageY
			this.isBegin = true;
		}

		private onTouchEnd(e: egret.TouchEvent): void {
			this.isBegin = false;
		}

		private onTouchMove(e: egret.TouchEvent): void {
			this.nowPos.x = e.stageX
			this.nowPos.y = e.stageY
		}

		public OnDestroy(): number {
			clearInterval(this.intervalID);
			return 0;
		}
	}
}