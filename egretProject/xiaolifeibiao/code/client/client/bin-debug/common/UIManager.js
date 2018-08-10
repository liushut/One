var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ZJ;
(function (ZJ) {
    var UIManager = (function () {
        function UIManager() {
            this._uiLayers = [];
            this.uiDatas = {};
            this.uiroot = null;
            this.views = {};
        }
        Object.defineProperty(UIManager, "instance", {
            get: function () {
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        UIManager.prototype.init = function (uiroot) {
            this.uiroot = uiroot;
            return 0;
        };
        Object.defineProperty(UIManager.prototype, "uiLayers", {
            set: function (value) {
                if (this._uiLayers.length > 0) {
                    egret.warn("uiLayers已经设定。");
                }
                else {
                    this._uiLayers = value;
                    for (var i = 0, len = this._uiLayers.length; i < len; ++i) {
                        var group = new eui.Group();
                        group.name = "layer" + i;
                        group.touchEnabled = false;
                        this.uiroot.addChild(group);
                        group.percentWidth = 100;
                        group.percentHeight = 100;
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        UIManager.prototype.getUIData = function (viewName) {
            return this.uiDatas[viewName];
        };
        /**
         * 获得view
         */
        UIManager.prototype.getView = function (viewName) {
            return this.views[viewName];
        };
        /**
         * 打开view
         */
        UIManager.prototype.openView = function (viewName) {
            var uidata = this.getUIData(viewName);
            if (uidata == undefined) {
                egret.log("ModuleConfig没有界面配置: " + viewName);
                return null;
            }
            var viewExist = this.getView(viewName);
            if (viewExist != undefined) {
            }
            else {
                viewExist = new uidata.viewClass();
                if (viewExist != undefined) {
                    viewExist.percentWidth = 100;
                    viewExist.percentHeight = 100;
                    this.views[viewName] = viewExist;
                    var layer = 0;
                    if (uidata.layer < this.uiroot.numChildren) {
                        layer = uidata.layer;
                    }
                    this.uiroot.getChildAt(layer).addChild(viewExist);
                }
                else {
                    console.warn("viewClass不存在 请检查ModuleConfig.uiDatas");
                    return null;
                }
            }
            viewExist.visible = true;
            viewExist.parent.setChildIndex(viewExist, 9999); // 置顶
            viewExist.show();
            return viewExist;
        };
        /**
         * 销毁view
         */
        UIManager.prototype.destroyView = function (viewName) {
            var view = this.getView(viewName);
            if (view != undefined && view != null) {
                view.onDestroy();
                view.parent.removeChild(view);
                this.views[viewName] = null;
            }
            return 0;
        };
        UIManager._instance = new UIManager();
        return UIManager;
    }());
    ZJ.UIManager = UIManager;
    __reflect(UIManager.prototype, "ZJ.UIManager");
})(ZJ || (ZJ = {}));
//# sourceMappingURL=UIManager.js.map