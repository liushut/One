module ZJ {
	/**
	 * 作用跟egret.Event雷同，主要是为了在构造函数前置位传data。
	 */
	export class CommonEvent extends egret.Event {
		public constructor(type: string, data?: any, bubbles?: boolean, cancelable?: boolean) {
			super(type, bubbles, cancelable, data)
		}
	}
}