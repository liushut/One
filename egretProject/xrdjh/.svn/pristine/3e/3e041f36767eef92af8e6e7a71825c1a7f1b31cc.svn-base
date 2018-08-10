var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ZJ;
(function (ZJ) {
    /**
     * 使用例子：
     * this.mName.text = ZJ.TableManager.instance.tables[xlsx.cfg_c_role][0][xlsx.c_role_role_name];
     * cfg_c_role: cfg_表名
     * 0: key 可以是字符串
     * c_role_role_name: 表名_列名
     */
    var TableManager = (function () {
        function TableManager() {
            this._tables = {};
        }
        Object.defineProperty(TableManager, "instance", {
            get: function () {
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        TableManager.prototype.init = function () {
            this.load("bg_djw_png");
            return 0;
        };
        Object.defineProperty(TableManager.prototype, "tables", {
            get: function () {
                return this._tables;
            },
            enumerable: true,
            configurable: true
        });
        TableManager.prototype.load = function (url) {
            ZJ.ResManager.instance.loadRes(url, function (a) {
                // egret.log(a);
                var m_zip = new JSZip(a);
                //通用配置解压
                var cfgs = m_zip.file(/^[tc].*/);
                for (var i = 0, li = cfgs.length; i < li; i++) {
                    var cfg = cfgs[i];
                    // egret.log(JSON.parse(cfg.asText()));
                    var cfgName = ZJ.Util.strFormat("shared/{0}", cfg.name);
                    this._tables[cfgName] = JSON.parse(cfg.asText());
                }
                ZJ.EventManager.instance.dispatchEvent(new egret.Event(ZJ.CommonEventName.TABLE_LOADED));
            }, this);
        };
        TableManager._instance = new TableManager();
        return TableManager;
    }());
    ZJ.TableManager = TableManager;
    __reflect(TableManager.prototype, "ZJ.TableManager");
})(ZJ || (ZJ = {}));
//# sourceMappingURL=TableManager.js.map