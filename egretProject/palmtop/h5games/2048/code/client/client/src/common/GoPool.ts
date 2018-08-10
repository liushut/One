module ZJ{
	export class GoPool{

		private goDt: {[key:string]:Array<any>} = {};
		private goDesign: {[key:string]:any} = {};
		private stage: egret.Stage;
		private goGroup: eui.Group;

		public constructor() {
		}

		private static _instance:GoPool;
		public static get instance(){
			if(this._instance == null){
				this._instance = new GoPool();
			}
			return this._instance;
		}

		public init(stage: egret.Stage){
			this.stage = stage;
			this.goGroup = new eui.Group();
			this.goGroup.name = "GoPoolGroup";
			this.goGroup.touchEnabled = false;
			this.goGroup.touchChildren = false;
			this.goGroup.visible = false;
			stage.addChild(this.goGroup);
		}
		
		/**
		 * 对象设计图, 当对象池没有可用对象但仍需get一个时, 将通过设计图创建一个新对象
		 * @param name 对象设计图名字
		 * @param any 设计方法
		 */
		public setDesign(name:string, any:any){
			this.goDesign[name] = any;
		}

		public push(name:string, go:any){
			if(this.goDt[name] == null){
				this.goDt[name] = new Array<any>();
			}
			this.goDt[name].push(go);
			this.goGroup.addChild(go);
		}

		public get(name:string): any{
			let array = this.goDt[name];
			if(array != null && array.length > 0){
				return array.shift();
			}else{
				if(this.goDesign[name] != null){
					return this.goDesign[name]();
				}
			}
			return null;
		}

		/**
		 * 销毁对象池里所有物体
		 */
		public destroy(){
			this.goGroup.removeChildren();
			for(let name in this.goDt){
				let array = this.goDt[name];
				if(array != null){
					array.length = 0;
				}
			}
		}

		/**
		 * 销毁对象池里某个特定物体
		 */
		public destroyByName(name:string){
			let array = this.goDt[name];
			if(array != null){
				for(let i=0; i < array.length; i++){
					this.goGroup.removeChild(array[i]);
				}
				array.length = 0;
			}
		}
	}
}