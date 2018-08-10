/**
 * Created by egret on 2016/1/21.
 */
var HerosUI = (function (_super) {
    __extends(HerosUI, _super);
    function HerosUI() {
        _super.call(this);
        this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
        this.skinName = "resource/custom_skins/herosUISkin.exml";
    }
    var d = __define,c=HerosUI,p=c.prototype;
    p.uiCompHandler = function () {
        var _this = this;
        console.log("\t\tHerosUI uiCompHandler");
        /// 返回逻辑
        this.btnReturn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.dispatchEventWith(GameEvents.EVT_RETURN);
        }, this);
        /// 确定
        this.btnOK.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            var dp = _this.listHeros.dataProvider;
            var aNameChecked = new Array();
            for (var i = 0; i < dp.length; ++i) {
                if (dp.getItemAt(i).checked) {
                    aNameChecked.push(dp.getItemAt(i).heroName);
                }
            }
            if (aNameChecked.length) {
                Toast.launch("您选择了：" + aNameChecked.join(", "));
            }
            else {
                Toast.launch("你牛叉，一个也不选！");
            }
            _this.dispatchEventWith(GameEvents.EVT_RETURN);
        }, this);
        /// 填充数据
        var dsListHeros = [
            { icon: "heros01_png", heroName: "伊文捷琳", comment: "评价：樱桃小丸子", checked: false },
            { icon: "heros02_png", heroName: "亚特伍德", comment: "评价：离了我你不行的", checked: true },
            { icon: "heros03_png", heroName: "伊妮德", comment: "评价：猴子请来的逗比", checked: false },
            { icon: "heros04_png", heroName: "鲁宾", comment: "评价：我勒个去", checked: false },
            { icon: "heros05_png", heroName: "威弗列德", comment: "评价：这货碉堡了", checked: false },
            { icon: "heros06_png", heroName: "史帝文", comment: "评价：咖啡不加糖", checked: false },
            { icon: "heros07_png", heroName: "哈瑞斯", comment: "评价：猪一样的队友", checked: false }
        ];
        this.listHeros.dataProvider = new eui.ArrayCollection(dsListHeros);
        this.listHeros.itemRenderer = HerosListIRSkin;
    };
    p.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //this.scrListHeros.horizontalScrollBar = null;
    };
    return HerosUI;
})(eui.Component);
egret.registerClass(HerosUI,'HerosUI');
var HerosListIRSkin = (function (_super) {
    __extends(HerosListIRSkin, _super);
    function HerosListIRSkin() {
        _super.call(this);
        this.skinName = "herosListIRSkin";
    }
    var d = __define,c=HerosListIRSkin,p=c.prototype;
    p.createChildren = function () {
        var _this = this;
        _super.prototype.createChildren.call(this);
        this.cb.addEventListener(egret.Event.CHANGE, function () {
            console.log("\tCheckbox 变化:", _this.data.checked);
            _this.data.checked = _this.cb.selected;
        }, this);
    };
    return HerosListIRSkin;
})(eui.ItemRenderer);
egret.registerClass(HerosListIRSkin,'HerosListIRSkin');
//# sourceMappingURL=HerosUI.js.map