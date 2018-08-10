module ZJ {
	/**
	 * 用于描绘简单图形，例如背景黑底，若需复杂图形请参考api自行描绘。
	 */
	export class ShapeUtil {
		public constructor() {
		}

		/**
		 * 矩形
		 * 锚点在左上角
		 */
		public static getRect(color: number, alpha: number, width: number, height: number, x: number = 0, y: number = 0): egret.Shape {
			let bg = new egret.Shape();
			bg.graphics.beginFill(color, alpha);
			bg.graphics.drawRect(x, y, width, height);
			bg.graphics.endFill();
			return bg;
		}

		/**
		 * 圆
		 * 锚点在圆心
		 */
		public static getCircle(color: number, alpha: number, r: number, x: number = 0, y: number = 0): egret.Shape {
			let bg: egret.Shape = new egret.Shape();
			bg.graphics.beginFill(color, alpha);
			bg.graphics.drawCircle(x, y, r);
			bg.graphics.endFill();
			return bg;
		}

		/**
		 * 线
		 * 锚点在(0,0)。
		 * 若需以一端做锚点（例如秒针旋转），则让线从(0,0)开始描绘，然后移至(xBegin,yBegin)。
		 */
		public static getLine(color: number, alpha: number, thick: number, xBegin: number, yBegin: number, xEnd: number, yEnd: number): egret.Shape {
			let bg: egret.Shape = new egret.Shape();
			bg.graphics.lineStyle(thick, color, alpha);
			bg.graphics.moveTo(xBegin, yBegin);
			bg.graphics.lineTo(xEnd, yEnd);
			bg.graphics.endFill();
			return bg;
		}

		/**
		 * 弧
		 * 锚点在圆心
		 * angle:角度
		 */
		public static getArc(color: number, alpha: number, thick: number, r: number, angleStart: number, angleEnd: number, anticlockwise: boolean = false, x: number = 0, y: number = 0): egret.Shape {
			let bg: egret.Shape = new egret.Shape();
			bg.graphics.lineStyle(thick, color, alpha);
			bg.graphics.drawArc(x, y, r, Math.PI / 180 * angleStart, Math.PI / 180 * angleEnd, anticlockwise);
			bg.graphics.endFill();
			return bg;
		}

		/**
		 * 拱形
		 * 锚点在圆心
		 * angle:角度
		 */
		public static getArch(color: number, alpha: number, r: number, angleStart: number, angleEnd: number, anticlockwise: boolean = false, x: number = 0, y: number = 0): egret.Shape {
			let bg: egret.Shape = new egret.Shape();
			bg.graphics.beginFill(color, alpha);
			bg.graphics.drawArc(x, y, r, Math.PI / 180 * angleStart, Math.PI / 180 * angleEnd, anticlockwise);
			bg.graphics.endFill();
			return bg;
		}


		/**
		 * 帮物体创建扇形遮罩
		 */
		public static setArcMask(img:eui.Image, radius: number, angleStart: number, value: number, anticlockwise: boolean = false, x: number = img.x, y: number = img.y){
			let shape:egret.Shape;
			if(img.mask != null){
				shape = <egret.Shape>img.mask;
			}else{
				shape = new egret.Shape();
				img.parent.addChild(shape);
			}
			let angleEnd = Math.round(angleStart + 360 * value) * Math.PI / 180;
			angleStart *= Math.PI / 180;
			shape.graphics.clear();
			shape.graphics.beginFill(0xff0000, 1);
			shape.graphics.lineTo(radius, 0);
			shape.graphics.drawArc(x, y, radius, angleStart, angleEnd, anticlockwise);
			shape.graphics.lineTo(x, y);
			shape.graphics.endFill();
			shape.x = img.x;
			shape.y = img.y;
			img.mask = shape;
		}
	}
}