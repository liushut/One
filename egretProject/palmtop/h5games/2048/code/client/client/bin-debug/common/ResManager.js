var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var ZJ;
(function (ZJ) {
    /**
     * 官方RES没有集成AssetAdapter中的功能，仍需要写个这样的管理类。
     * 核心方法loadRes，其余操作请使用RES。
     */
    var ResManager = (function () {
        function ResManager() {
            this.aa = null;
            this.stage = null;
            this.dbFactory = dragonBones.EgretFactory.factory;
            this.dbFileNames = [];
        }
        Object.defineProperty(ResManager, "instance", {
            get: function () {
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        ResManager.prototype.init = function (stage) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.stage = stage;
                            this.aa = new AssetAdapter();
                            return [4 /*yield*/, this.loadConfig("resource/default.res.json?v=" + Math.random(), "resource/")];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.loadTheme()];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 加载资源。
         * @param source res中定义的名称
         * @param compFunc (res, source)
         * @param urlResType RES.ResourceItem。当source是url时，指定加载类型。
         */
        ResManager.prototype.loadRes = function (source, compFunc, thisObject, urlResType) {
            this.aa.getAsset(source, compFunc, thisObject, urlResType);
        };
        /**
         * 加载确定存在的资源。属于loadRes的简化版。
         */
        ResManager.prototype.loadExistRes = function (source) {
            return RES.getRes(source);
        };
        ResManager.prototype.loadConfig = function (url, resourceRoot) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: 
                        // todo 再次加载会报错，可以自己记录跳过。官方表示已知并无计划处理这个。
                        return [4 /*yield*/, RES.loadConfig(url, resourceRoot)];
                        case 1:
                            // todo 再次加载会报错，可以自己记录跳过。官方表示已知并无计划处理这个。
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @param priorvity 默认值0
         */
        ResManager.prototype.loadGroup = function (groupName, priorvity, loading) {
            if (priorvity === void 0) { priorvity = 0; }
            if (loading === void 0) { loading = null; }
            return __awaiter(this, void 0, void 0, function () {
                var e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, RES.loadGroup(groupName, priorvity, loading)];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            e_1 = _a.sent();
                            console.error(e_1);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        ResManager.prototype.loadTheme = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                // load skin theme configuration file, you can manually modify the file. And replace the default skin.
                //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
                var theme = new eui.Theme("resource/default.thm.json", _this.stage);
                theme.addEventListener(eui.UIEvent.COMPLETE, function () {
                    resolve();
                }, _this);
            });
        };
        /**
         * @param callBack 返回MovieClip和MovieClipDataFactory。若需要显示不同动画可使用new egret.MovieClip(mcDataFactory.generateMovieClipData("donghuaName"))生成。
         */
        ResManager.prototype.loadMovieClip = function (fileName, donghuaName, callBack) {
            this.loadRes(fileName + "_json", function (res, source) {
                var j = res;
                this.loadRes(fileName + "_png", function (res, source) {
                    var p = res;
                    var mcDataFactory = new egret.MovieClipDataFactory(j, p);
                    var mc = new egret.MovieClip(mcDataFactory.generateMovieClipData(donghuaName));
                    callBack(mc, mcDataFactory);
                }, this);
            }, this);
        };
        /**
         * 【注意】返回值仅当资源已存在（已load）时有用，提供便利，若环境复杂请在cb使用。
         * 返回的EgretArmatureDisplay可以.animation或者.armature做进一步操作。
         * ps.详见developer.egret.com/cn/github/egret-docs/DB/dbLibs/createAnimation/index.html
         * @param fileName 名字
         * @param armatureName 不传入时与fileName一致
         */
        ResManager.prototype.loadDragonBones = function (fileName, armatureName, cb) {
            var _this = this;
            if (armatureName === void 0) { armatureName = ""; }
            if (cb === void 0) { cb = null; }
            if (armatureName == "") {
                armatureName = fileName;
            }
            if (this.dbFileNames.indexOf(fileName) == -1) {
                if (cb) {
                    this.loadRes(fileName + "_ske_json", function (res, source) {
                        var skeletonData = res;
                        _this.loadRes(fileName + "_tex_json", function (res, source) {
                            var textureData = res;
                            _this.loadRes(fileName + "_tex_png", function (res, source) {
                                var texture = res;
                                _this.dbFactory.parseDragonBonesData(skeletonData);
                                _this.dbFactory.parseTextureAtlasData(textureData, texture);
                                _this.dbFileNames.push(fileName);
                                var armatureDisplay = _this.dbFactory.buildArmatureDisplay(armatureName);
                                if (cb) {
                                    cb(armatureDisplay);
                                }
                            }, _this);
                        }, _this);
                    }, this);
                    return;
                }
                else {
                    var skeletonData = this.loadExistRes(fileName + "_ske_json");
                    var textureData = this.loadExistRes(fileName + "_tex_json");
                    var texture = this.loadExistRes(fileName + "_tex_png");
                    this.dbFactory.parseDragonBonesData(skeletonData);
                    this.dbFactory.parseTextureAtlasData(textureData, texture);
                    this.dbFileNames.push(fileName);
                }
            }
            var armatureDisplay = this.dbFactory.buildArmatureDisplay(armatureName);
            if (cb) {
                cb(armatureDisplay);
            }
            return armatureDisplay;
        };
        /**
         * ps.换了槽会影响该槽的图片，后面每次播放都需要换适当的槽。
         * @param fileName 新db名字
         * @param armatureName 不传入时与fileName一致
         * @param slotName 新图片的槽位
         * @param displayName 新图片名字
         * @param slot 目标槽位
         */
        ResManager.prototype.replaceDBSlotDisplay = function (fileName, armatureName, slotName, displayName, slot) {
            if (armatureName === void 0) { armatureName = ""; }
            if (armatureName == "") {
                armatureName = fileName;
            }
            this.dbFactory.replaceSlotDisplay(fileName, armatureName, slotName, displayName, slot);
        };
        // private loading: RES.PromiseTaskReporter = null;
        ResManager._instance = new ResManager();
        return ResManager;
    }());
    ZJ.ResManager = ResManager;
    __reflect(ResManager.prototype, "ZJ.ResManager");
})(ZJ || (ZJ = {}));
//# sourceMappingURL=ResManager.js.map