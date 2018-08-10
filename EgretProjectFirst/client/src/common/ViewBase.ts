module ZJ {
	export class ViewBase extends ComponentBase implements RES.PromiseTaskReporter {
		public constructor() {
			super();
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}

		protected childrenCreated(): void {
			super.childrenCreated();
		}

		public setData(data: any): void {

		}

		public show(): void {

		}

		public onProgress(current: number, total: number): void {
		}

		/**
		 * 销毁界面时会被调用，一般重写进行回收操作。
		 * 返回0表示正常结束。
		 * 【注意】全局事件必须remove（例如EventManager和ENTER_FRAME），timeout必须clear。
		 */
		public onDestroy(): number {
			return super.onDestroy();
		}
	}
}