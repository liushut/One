/**
 * Created by egret on 2016/1/26.
 */
var Toast = (function (_super) {
    __extends(Toast, _super);
    function Toast(msg, w, h) {
        var _this = this;
        _super.call(this);
        console.log("Toast:", msg);
        var bg = new egret.Bitmap(Toast._txtrToastBg);
        this.addChild(bg);
        var tx = new egret.TextField;
        tx.multiline = true;
        tx.size = 20;
        tx.bold = true;
        tx.textColor = 0xFFFFFF;
        tx.stroke = 2;
        tx.strokeColor = 0;
        tx.text = msg;
        tx.fontFamily = "微软雅黑";
        tx.textAlign = egret.HorizontalAlign.CENTER;
        tx.width = w * .84;
        tx.x = (Toast._txtrToastBg.textureWidth - tx.width) / 2;
        tx.y = 6;
        this.addChild(tx);
        bg.height = 12 + tx.height;
        this.anchorOffsetX = this.width * .5;
        this.anchorOffsetY = this.height * .5;
        this.x = w * .5;
        this.y = h * .618;
        this.alpha = 0;
        egret.Tween.get(this)
            .to({ alpha: 1 }, 800, egret.Ease.quintOut)
            .wait(1600)
            .to({ alpha: 0 }, 1200, egret.Ease.quintIn).call(function () {
            if (_this.parent) {
                _this.parent.removeChild(_this);
            }
        });
    }
    var d = __define,c=Toast,p=c.prototype;
    Toast.init = function (cont, txtrToastBg) {
        console.log("Toast.init", txtrToastBg);
        this._cont = cont;
        this._txtrToastBg = txtrToastBg;
    };
    Toast.launch = function (msg) {
        if (this._cont) {
            var toast = new Toast(msg, this._cont.stage.stageWidth, this._cont.stage.stageHeight);
            this._cont.addChild(toast);
        }
    };
    return Toast;
})(egret.DisplayObjectContainer);
egret.registerClass(Toast,'Toast');
//# sourceMappingURL=Toast.js.map