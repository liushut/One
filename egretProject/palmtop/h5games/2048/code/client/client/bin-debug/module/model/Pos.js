var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Pos = (function () {
    function Pos(i, j) {
        this.i = i;
        this.j = j;
    }
    return Pos;
}());
__reflect(Pos.prototype, "Pos");
//# sourceMappingURL=Pos.js.map