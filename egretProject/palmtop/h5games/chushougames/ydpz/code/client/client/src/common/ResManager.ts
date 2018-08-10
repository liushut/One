module ZJ {
    /**
     * 官方RES没有集成AssetAdapter中的功能，仍需要写个这样的管理类。
     * 核心方法loadRes，其余操作请使用RES。
     */
    export class ResManager {

        private aa: AssetAdapter = null;
        private stage: egret.Stage = null;
        // private loading: RES.PromiseTaskReporter = null;

        private static _instance: ResManager = new ResManager();
        public constructor() {
        }

        static get instance(): ResManager {
            return this._instance;
        }

        public async init(stage: egret.Stage) {
            this.stage = stage;
            this.aa = new AssetAdapter();
            await this.loadConfig("resource/default.res.json", "resource/");
            await this.loadTheme();
        }

        /**
         * 加载资源。
         * @param source res中定义的名称 
         * @param compFunc (res, source)
         * @param urlResType RES.ResourceItem。当source是url时，指定加载类型。
         */
        public loadRes(source: string, compFunc: Function, thisObject: any, urlResType?: string): void {
            this.aa.getAsset(source, compFunc, thisObject, urlResType);
        }

        /**
         * 加载确定存在的资源。属于loadRes的简化版。
         */
        public loadExistRes(source: string): any {
            return RES.getRes(source);
        }

        public async loadConfig(url: string, resourceRoot: string) {
            // todo 再次加载会报错，可以自己记录跳过。官方表示已知并无计划处理这个。
            await RES.loadConfig(url, resourceRoot);
        }

        /**
         * @param priorvity 默认值0
         */
        public async loadGroup(groupName: string, priorvity: number = 0, loading: RES.PromiseTaskReporter = null) {
            try {
                await RES.loadGroup(groupName, priorvity, loading);
            }
            catch (e) {
                console.error(e);
            }
        }

        private loadTheme() {
            return new Promise((resolve, reject) => {
                // load skin theme configuration file, you can manually modify the file. And replace the default skin.
                //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
                let theme = new eui.Theme("resource/default.thm.json", this.stage);
                theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                    resolve();
                }, this);

            })
        }

        /**
         * @param callBack 返回MovieClip和MovieClipDataFactory。若需要显示不同动画可使用new egret.MovieClip(mcDataFactory.generateMovieClipData("donghuaName"))生成。
         */
        public loadMovieClip(fileName: string, donghuaName: string, callBack: (movieClip: egret.MovieClip, mcDataFactory: egret.MovieClipDataFactory) => void): void {
            ZJ.ResManager.instance.loadRes(fileName + "_json", function (res, source) {
                let j = res;
                ZJ.ResManager.instance.loadRes(fileName + "_png", function (res, source) {
                    let p = res
                    let mcDataFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(j, p);
                    let mc: egret.MovieClip = new egret.MovieClip(mcDataFactory.generateMovieClipData(donghuaName));
                    callBack(mc, mcDataFactory);
                }, this)
            }, this);
        }

        public dbFactory = dragonBones.EgretFactory.factory;
        private dbFileNames: string[] = [];
        /**
         * 返回的EgretArmatureDisplay可以.animation或者.armature做进一步操作。
         * ps.详见developer.egret.com/cn/github/egret-docs/DB/dbLibs/createAnimation/index.html
         * @param fileName 名字
         * @param armatureName 不传入时与fileName一致 
         */
        public loadDragonBones(fileName: string, armatureName: string = ""): dragonBones.EgretArmatureDisplay {
            if (armatureName == "") {
                armatureName = fileName
            }

            if (this.dbFileNames.indexOf(fileName) == -1) {
                let skeletonData = this.loadExistRes(fileName + "_ske_json");
                let textureData = this.loadExistRes(fileName + "_tex_json");
                let texture = this.loadExistRes(fileName + "_tex_png");

                this.dbFactory.parseDragonBonesData(skeletonData);
                this.dbFactory.parseTextureAtlasData(textureData, texture);
                this.dbFileNames.push(fileName)
            }

            let armatureDisplay = this.dbFactory.buildArmatureDisplay(armatureName);

            return armatureDisplay
        }

        /**
         * ps.换了槽会影响该槽的图片，后面每次播放都需要换适当的槽。
         * @param fileName 新db名字
         * @param armatureName 不传入时与fileName一致 
         * @param slotName 新图片的槽位
         * @param displayName 新图片名字
         * @param slot 目标槽位
         */
        public replaceDBSlotDisplay(fileName: string
            , armatureName: string = ""
            , slotName: string
            , displayName: string
            , slot: dragonBones.Slot): void {
            if (armatureName == "") {
                armatureName = fileName
            }

            this.dbFactory.replaceSlotDisplay(fileName, armatureName
                , slotName, displayName, slot) 

        }
    }
}