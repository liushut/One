var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ZJ;
(function (ZJ) {
    var MathUtil = (function () {
        function MathUtil() {
        }
        /**
         * 返回[min,max)的整数
         */
        MathUtil.randomRange = function (min, max, seed) {
            if (seed == null) {
                seed = ZJ.Util.timeStamp();
            }
            var rnd = this.randomSeed(seed);
            rnd = rnd / 233280.0;
            // console.log("ran " + Math.floor(min + rnd * (max - min)));
            return Math.floor(min + rnd * (max - min));
        };
        ;
        MathUtil.randomSeed = function (seed) {
            seed = (seed * 9301 + 49297) % 233280;
            return seed;
        };
        MathUtil.YiYuanErCi = function (a, b, c) {
            var result = [];
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
            return result;
        };
        return MathUtil;
    }());
    ZJ.MathUtil = MathUtil;
    __reflect(MathUtil.prototype, "ZJ.MathUtil");
})(ZJ || (ZJ = {}));
//# sourceMappingURL=MathUtil.js.map