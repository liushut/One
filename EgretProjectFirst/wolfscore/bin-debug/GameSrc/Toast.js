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
var Toast = (function (_super) {
    __extends(Toast, _super);
    function Toast(msg, w, h) {
        var _this = _super.call(this) || this;
        var bg = new egret.Bitmap(Toast._txtrToastBg);
        _this.x = w * 5;
        _this.y = h * .85;
        _this.addChild(bg);
        bg.anchorOffsetX = bg.width / 2;
        var tx = new egret.TextField;
        tx.multiline = true; //是否为多行文本、
        tx.size = 30;
        tx.bold = true; //是否显示粗体
        tx.textColor = 0XFFFFFF;
        tx.stroke = 6; //描边宽度
        tx.strokeColor = 0;
        tx.text = msg;
        tx.fontFamily = "微软雅黑";
        tx.textAlign = egret.HorizontalAlign.CENTER; //居中
        tx.width = w * 1;
        tx.x = bg.x;
        tx.y = bg.y + tx.size / 10;
        tx.anchorOffsetX = tx.width / 2;
        _this.addChild(tx);
        bg.height = 12 + tx.height;
        _this.alpha = 0;
        egret.Tween.get(_this).to({ alpha: 1 }, 200, egret.Ease.quintOut).wait(600).to({ alpha: 0 }, 200, egret.Ease.quintIn).call(function () {
            if (_this.parent) {
                _this.parent.removeChild(_this);
            }
        });
        return _this;
    }
    Toast.init = function (cont, txtrToastBg) {
        console.log("Toast.init", txtrToastBg);
        this._cont = cont;
        this._txtrToastBg = txtrToastBg;
    };
    //初始化资源
    Toast.initRes = function (cont, img) {
        console.log("Toast.init", img);
        this._cont = cont;
        var loader = new egret.ImageLoader();
        //添加加载完成资源加载监听
        loader.addEventListener(egret.Event.COMPLETE, function (event) {
            var loader = event.target;
            //获取加载到的纹理对象
            var bitmapData = loader.data;
            //创建纹理对象
            var texture = new egret.Texture;
            texture.bitmapData = bitmapData;
            this._txtrToastBg = texture;
            //创建BitMap进行显示
            // this.addChild(new egret.Bitmap(texture))     如果函数是箭头函数 则不能addchild  原因：箭头函数不会创建自己的this,它只会从自己的作用域链的上一层继承this。继承的是这个类的this.  addchild是继承父类的，所以没有。 
        }, this);
        //开始加载
        loader.load(img);
    };
    Toast.show = function (msg) {
        if (this._cont) {
            var toast = new Toast(msg, this._cont.stage.stageWidth, this._cont.stage.stageHeight);
            this._cont.addChild(toast);
        }
    };
    return Toast;
}(egret.DisplayObjectContainer));
__reflect(Toast.prototype, "Toast");
//# sourceMappingURL=Toast.js.map