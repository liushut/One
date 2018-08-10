module ZJ {
	export class Util {
		public constructor() {
		}

		/**
		 * _str按utf8截取_len，后面补...
		 */
		public static getChar(_str: string, _len: number): string {

			let _ba: egret.ByteArray = new egret.ByteArray;

			_ba.writeUTFBytes(_str);

			if (_ba.length < _len) return _str;

			_ba.position = 0;

			return _ba.readUTFBytes(_len) + "...";

		}

		/**
		 * format("{0} is {1}", "he", "beautiful")
		 */
		public static strFormat(str, ...replaceArgs: string[]): string {
			return str.replace(/\{(\d+)\}/g,
				function (m, i) {
					return replaceArgs[i];
				});
		}

		/**
		 * 获取当前时间戳
		 */
		public static timeStamp(dateStr?: string): number {
			dateStr = dateStr || new Date().toString();
			return Date.parse(dateStr) / 1000;
		}

		/**
		 * utf8码转string
		 */
		public static Utf8ArrayToStr(array) {
			var out, i, len, c;
			var char2, char3;

			out = "";
			len = array.length;
			i = 0;
			while (i < len) {
				c = array[i++];
				switch (c >> 4) {
					case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
						// 0xxxxxxx
						out += String.fromCharCode(c);
						break;
					case 12: case 13:
						// 110x xxxx   10xx xxxx
						char2 = array[i++];
						out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
						break;
					case 14:
						// 1110 xxxx  10xx xxxx  10xx xxxx
						char2 = array[i++];
						char3 = array[i++];
						out += String.fromCharCode(((c & 0x0F) << 12) |
							((char2 & 0x3F) << 6) |
							((char3 & 0x3F) << 0));
						break;
				}
			}

			return out;
		}

		/**
		 * 获取类名string
		 */
		public static getClassName(obj) {
			if (obj && obj.constructor && obj.constructor.toString()) {
				/*
				 * for browsers which have name property in the constructor
				 * of the object,such as chrome 
				 */
				if (obj.constructor.name) {
					return obj.constructor.name;
				}
				var str = obj.constructor.toString();
				/*
				 * executed if the return of object.constructor.toString() is 
				 * "[object objectClass]"
				 */
				if (str.charAt(0) == '[') {
					var arr = str.match(/\[\w+\s*(\w+)\]/);
				} else {
					/*
					 * executed if the return of object.constructor.toString() is 
					 * "function objectClass () {}"
					 * for IE Firefox
					 */
					var arr = str.match(/function\s*(\w+)/);
				}
				if (arr && arr.length == 2) {
					return arr[1];
				}
			}
			return undefined;
		}

		/**
		 * obj转json转ByteArray
		 */
		public static objToByteArray(obj:any): egret.ByteArray {
			let aji: any = JSON.stringify(obj)
			let ba = new egret.ByteArray();
			ba.writeUTF(aji);
			return ba;
		}

		/**
		 * objToByteArray的bytes
		 */
		public static objToBytes(obj:any): Uint8Array {
			return this.objToByteArray(obj).bytes
		}

		/**
		 * bytes转ByteArray转json转obj
		 */
		public static bytesToObj(bytes:Uint8Array): any {
			let ba = new egret.ByteArray(bytes)
			let obj = JSON.parse(ba.readUTF())
			return obj;
		}

		/**
		 * Array移除元素
		 */
		public static rmArrayObj<T>(array: Array<T>, obj: T) {
			if (array.indexOf(obj) != -1) {
				return array.splice(array.indexOf(obj), 1);
			}
		}

	}

}