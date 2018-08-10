/**
 * Created by egret on 2016/1/25.
 */
var GoodsUI = (function (_super) {
    __extends(GoodsUI, _super);
    function GoodsUI() {
        _super.call(this);
        this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
        this.skinName = "resource/custom_skins/goodsUISkin.exml";
    }
    var d = __define,c=GoodsUI,p=c.prototype;
    p.uiCompHandler = function () {
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
    p.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //this.scrListGoods.horizontalScrollBar = null;
    };
    return GoodsUI;
})(eui.Component);
egret.registerClass(GoodsUI,'GoodsUI');
var GoodsListIRSkin = (function (_super) {
    __extends(GoodsListIRSkin, _super);
    function GoodsListIRSkin() {
        _super.call(this);
        this.skinName = "goodsListIRSkin";
    }
    var d = __define,c=GoodsListIRSkin,p=c.prototype;
    p.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    p.dataChanged = function () {
    };
    return GoodsListIRSkin;
})(eui.ItemRenderer);
egret.registerClass(GoodsListIRSkin,'GoodsListIRSkin');
//# sourceMappingURL=GoodsUI.js.map