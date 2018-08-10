module ZJ {
	export class MathUtil {
		public constructor() {
		}

		/**
		 * 返回[min,max)的整数
		 */
		public static randomRange(min: number, max: number, seed?: number): number {
			if (seed == null) {
				seed = Util.timeStamp();
			}
			let rnd = this.randomSeed(seed);
			rnd = rnd / 233280.0;
			// console.log("ran " + Math.floor(min + rnd * (max - min)));
			return Math.floor(min + rnd * (max - min));
		};

		public static randomSeed(seed: number): number {
			seed = (seed * 9301 + 49297) % 233280;
			return seed;
		}

		public static YiYuanErCi(a, b, c): number[] {
			let result: number[] = [];
			var t, x1, x2;
			t = b * b - 4 * a * c;
			if (t < 0) {
			}
			else {
				x1 = (-1 * b + Math.sqrt(t)) / (2 * a);
				x2 = (-1 * b - Math.sqrt(t)) / (2 * a);
				result.push(x1);
				result.push(x2);
			}

			return result
		}
	}
}