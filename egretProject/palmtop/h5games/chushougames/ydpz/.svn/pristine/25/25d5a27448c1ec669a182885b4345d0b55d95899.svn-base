var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ZJ;
(function (ZJ) {
    var GoPool = (function () {
        // private goGroup: eui.Group;
        function GoPool() {
            this.goDt = {};
            this.goDesign = {};
        }
        Object.defineProperty(GoPool, "instance", {
            get: function () {
                if (this._instance == null) {
                    this._instance = new GoPool();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        GoPool.prototype.init = function (stage) {
            this.stage = stage;
            // 未知是否影响性能，仅调试时启用goGroup。
            // this.goGroup = new eui.Group();
            // this.goGroup.name = "GoPoolGroup";
            // this.goGroup.touchEnabled = false;
            // this.goGroup.touchChildren = false;
            // this.goGroup.visible = false;
            // stage.addChild(this.goGroup); 
        };
        /**
         * 对象设计图, 当对象池没有可用对象但仍需get一个时, 将通过设计图创建一个新对象
         * @param name 对象设计图名字
         * @param any 设计方法
         */
        GoPool.prototype.setDesign = function (name, any) {
            this.goDesign[name] = any;
        };
        GoPool.prototype.push = function (name, go) {
            if (this.goDt[name] == null) {
                this.goDt[name] = new Array();
            }
            this.goDt[name].push(go);
            // this.goGroup.addChild(go);
        };
        GoPool.prototype.get = function (name) {
            var array = this.goDt[name];
            if (array != null && array.length > 0) {
                return array.shift();
            }
            else {
                if (this.goDesign[name] != null) {
                    return this.goDesign[name]();
                }
            }
            return null;
        };
        /**
         * 销毁对象池里所有物体
         */
        GoPool.prototype.destroy = function () {
            // this.goGroup.removeChildren();
            for (var name_1 in this.goDt) {
                var array = this.goDt[name_1];
                if (array != null) {
                    array.length = 0;
                }
            }
        };
        /**
         * 销毁对象池里某个特定物体
         */
        GoPool.prototype.destroyByName = function (name) {
            var array = this.goDt[name];
            if (array != null) {
                for (var i = 0; i < array.length; i++) {
                    // this.goGroup.removeChild(array[i]);
                }
                array.length = 0;
            }
        };
        return GoPool;
    }());
    ZJ.GoPool = GoPool;
    __reflect(GoPool.prototype, "ZJ.GoPool");
})(ZJ || (ZJ = {}));
//# sourceMappingURL=GoPool.js.map