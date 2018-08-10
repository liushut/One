module ZJ {
	export class ChannelDataEvent extends egret.Event {
		/**
		 * eventName: 事件名
		 * event: 事件 
		 */
		public data: {
			eventName: string
			, event?: any
		} = null;

		public constructor(type: string, bubbles?: boolean, cancelable?: boolean, data?: any) {
			super(type, bubbles, cancelable, data);
		}
	}
}