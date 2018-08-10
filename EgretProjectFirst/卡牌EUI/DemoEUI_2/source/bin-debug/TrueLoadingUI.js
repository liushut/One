/**
 * Created by egret on 2016/1/20.
 */
var TrueLoadingUI = (function (_super) {
    __extends(TrueLoadingUI, _super);
    function TrueLoadingUI() {
        var _this = this;
        _super.call(this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
            if (_this.hasEventListener(egret.Event.ENTER_FRAME)) {
                _this.removeEventListener(egret.Event.ENTER_FRAME, _this.runLoading, _this);
            }
        }, this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, function () {
            _this.setProgress(0, 1);
            _this.addEventListener(egret.Event.ENTER_FRAME, _this.runLoading, _this);
        }, this);
    }
    var d = __define,c=TrueLoadingUI,p=c.prototype;
    p.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this._loadingRun = new egret.Bitmap(RES.getRes("loading_run"));
        this.addChild(this._loadingRun);
        this._loadingRun.anchorOffsetX = this._loadingRun.width * .5;
        this._loadingRun.anchorOffsetY = this._loadingRun.height * .5;
        this._loadingRun.x = this.stage.stageWidth * .5;
        this._loadingRun.y = this.stage.stageHeight * .5;
        this._txProgress = new egret.TextField;
        this._txProgress.textAlign = egret.HorizontalAlign.CENTER;
        this._txProgress.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._txProgress.x = this.stage.stageWidth * .5 - 100;
        this._txProgress.width = 200;
        this._txProgress.y = this.stage.stageHeight * .5 - 100;
        this._txProgress.height = 200;
        this._txProgress.size = 14;
        this._txProgress.stroke = 1;
        this._txProgress.strokeColor = 0;
        this.addChild(this._txProgress);
    };
    p.runLoading = function (evt) {
        this._loadingRun.rotation += 3;
    };
    p.setProgress = function (itemsLoaded, itemsTotal) {
        if (this._txProgress) {
            this._txProgress.text = Math.round(itemsLoaded / itemsTotal * 100) + "%";
        }
    };
    return TrueLoadingUI;
})(eui.Group);
egret.registerClass(TrueLoadingUI,'TrueLoadingUI');
//# sourceMappingURL=TrueLoadingUI.js.map