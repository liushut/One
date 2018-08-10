var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ZJ;
(function (ZJ) {
    /**
     * 用于描绘简单图形，例如背景黑底，若需复杂图形请参考api自行描绘。
     */
    var ShapeUtil = (function () {
        function ShapeUtil() {
        }
        /**
         * 矩形
         * 锚点在左上角
         */
        ShapeUtil.getRect = function (color, alpha, width, height, x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var bg = new egret.Shape();
            bg.graphics.beginFill(color, alpha);
            bg.graphics.drawRect(x, y, width, height);
            bg.graphics.endFill();
            return bg;
        };
        /**
         * 圆
         * 锚点在圆心
         */
        ShapeUtil.getCircle = function (color, alpha, r, x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var bg = new egret.Shape();
            bg.graphics.beginFill(color, alpha);
            bg.graphics.drawCircle(x, y, r);
            bg.graphics.endFill();
            return bg;
        };
        /**
         * 线
         * 锚点在(0,0)。
         * 若需以一端做锚点（例如秒针旋转），则让线从(0,0)开始描绘，然后移至(xBegin,yBegin)。
         */
        ShapeUtil.getLine = function (color, alpha, thick, xBegin, yBegin, xEnd, yEnd) {
            var bg = new egret.Shape();
            bg.graphics.lineStyle(thick, color, alpha);
            bg.graphics.moveTo(xBegin, yBegin);
            bg.graphics.lineTo(xEnd, yEnd);
            bg.graphics.endFill();
            return bg;
        };
        /**
         * 弧
         * 锚点在圆心
         * angle:角度
         */
        ShapeUtil.getArc = function (color, alpha, thick, r, angleStart, angleEnd, anticlockwise, x, y) {
            if (anticlockwise === void 0) { anticlockwise = false; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var bg = new egret.Shape();
            bg.graphics.lineStyle(thick, color, alpha);
            bg.graphics.drawArc(x, y, r, Math.PI / 180 * angleStart, Math.PI / 180 * angleEnd, anticlockwise);
            bg.graphics.endFill();
            return bg;
        };
        /**
         * 拱形
         * 锚点在圆心
         * angle:角度
         */
        ShapeUtil.getArch = function (color, alpha, r, angleStart, angleEnd, anticlockwise, x, y) {
            if (anticlockwise === void 0) { anticlockwise = false; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var bg = new egret.Shape();
            bg.graphics.beginFill(color, alpha);
            bg.graphics.drawArc(x, y, r, Math.PI / 180 * angleStart, Math.PI / 180 * angleEnd, anticlockwise);
            bg.graphics.endFill();
            return bg;
        };
        /**
         * 帮物体创建扇形遮罩
         */
        ShapeUtil.setArcMask = function (img, radius, angleStart, value, anticlockwise, x, y) {
            if (anticlockwise === void 0) { anticlockwise = false; }
            if (x === void 0) { x = img.x; }
            if (y === void 0) { y = img.y; }
            var shape;
            if (img.mask != null) {
                shape = img.mask;
            }
            else {
                shape = new egret.Shape();
                img.parent.addChild(shape);
            }
            var angleEnd = Math.round(angleStart + 360 * value) * Math.PI / 180;
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
        };
        return ShapeUtil;
    }());
    ZJ.ShapeUtil = ShapeUtil;
    __reflect(ShapeUtil.prototype, "ZJ.ShapeUtil");
})(ZJ || (ZJ = {}));
//# sourceMappingURL=ShapeUtil.js.map