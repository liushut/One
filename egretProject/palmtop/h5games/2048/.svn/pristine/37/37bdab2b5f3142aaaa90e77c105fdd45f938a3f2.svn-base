module ZJ {
	export class SocketDataEvent extends egret.Event {
		/**
		 * result: yy 服务器是否正确处理 
		 * error: yy 服务器没正确处理时的错误文本
		 * data99999: yy 返回的大协议中的数据
		 */
		public data: {
			protoID: number
			, data: any
			, result?: boolean
			, error?: string
			, data99999?: any
		} = null;

		public constructor(type: string, bubbles?: boolean, cancelable?: boolean, data?: any) {
			super(type, bubbles, cancelable, data);
		}
	}
}