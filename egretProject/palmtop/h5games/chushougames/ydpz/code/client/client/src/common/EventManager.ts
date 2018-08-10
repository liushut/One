module ZJ {
	export class EventManager extends egret.EventDispatcher {
		public constructor() {
			super();
		}
		private static _instance: EventManager = new EventManager();
		static get instance(): EventManager {
			return this._instance;
		}
		public init(): number {
			return 0;
		}
	}
}