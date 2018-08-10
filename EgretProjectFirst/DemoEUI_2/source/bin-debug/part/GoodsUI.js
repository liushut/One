/**
 * Created by egret on 2016/1/25.
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var GoodsUI = (function (_super) {
    __extends(GoodsUI, _super);
    function GoodsUI() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.uiCompHandler, _this);
        _this.skinName = "resource/custom_skins/goodsUISkin.exml";
        return _this;
    }
    GoodsUI.prototype.uiCompHandler = function () {
        var _this = this;
        console.log("\t\tGoodsUI uiCompHandler");
        /// 返回逻辑
        this.btnReturn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.dispatchEventWith(GameEvents.EVT_RETURN);
        }, this);
        /// 填充数据
        var dsListHeros = [
            { icon: "goods01_png", goodsName: "魔法石", comment: "法力加成 +3" },
            { icon: "goods02_png", goodsName: "诅咒娃娃", comment: "咒术加成 +3" },
            { icon: "goods03_png", goodsName: "万圣戒指", comment: "敏捷加成 +3" },
            { icon: "goods04_png", goodsName: "斗篷", comment: "耐力加成 +3" },
            { icon: "goods05_png", goodsName: "鹅毛笔", comment: "精神加成 +3" },
            { icon: "goods06_png", goodsName: "血滴子", comment: "嗜血加成 +3" },
            { icon: "goods07_png", goodsName: "屠龙刀", comment: "力量加成 +5" }
        ];
        this.listGoods.dataProvider = new eui.ArrayCollection(dsListHeros);
        this.listGoods.itemRenderer = GoodsListIRSkin;
    };
    GoodsUI.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //this.scrListGoods.horizontalScrollBar = null;
    };
    return GoodsUI;
}(eui.Component));
__reflect(GoodsUI.prototype, "GoodsUI");
var GoodsListIRSkin = (function (_super) {
    __extends(GoodsListIRSkin, _super);
    function GoodsListIRSkin() {
        var _this = _super.call(this) || this;
        _this.skinName = "goodsListIRSkin";
        return _this;
    }
    GoodsListIRSkin.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    GoodsListIRSkin.prototype.dataChanged = function () {
    };
    return GoodsListIRSkin;
}(eui.ItemRenderer));
__reflect(GoodsListIRSkin.prototype, "GoodsListIRSkin");
//# sourceMappingURL=GoodsUI.js.map