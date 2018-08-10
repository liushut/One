//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends eui.UILayer {


    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            // egret.ticker.pause(); // zjtest: 点击阿里按钮会蜜汁pause，这里尝试屏蔽
        }

        egret.lifecycle.onResume = () => {
            // egret.ticker.resume();
        }

        //inject the custom material parser
        //注入自定义的素材解析器
        egret.registerImplementation("eui.IAssetAdapter", new AssetAdapter());
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {
        await this.createGameScene();
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);
    }

    /**
     * 创建场景界面
     * Create scene interface
     */
    protected async createGameScene() {
        egret.ImageLoader.crossOrigin = 'anonymous'
        if (ModuleConfig.compile.yy) {
            onPKLoading();
        }

        await ZJ.ResManager.instance.init(this.stage);
        // loading要先加载，所以resconfig和ui先加载。这部分资源不宜过多，否则失去预加载意义。
        await ZJ.ResManager.instance.loadGroup("realpreload");

        ZJ.UIManager.instance.init(this);
        ZJ.UIManager.instance.uiLayers = ModuleConfig.uiLayers;
        ZJ.UIManager.instance.uiDatas = ModuleConfig.uiDatas;
        let loadingView = this.GetLoadingView();

        // res
        // 由于拖资源进去自动进preload，干脆主要的资源group就叫preload，真正的preload叫realpreload。
        await ZJ.ResManager.instance.loadGroup("preload", 0, loadingView);
        // table
        // ZJ.TableManager.instance.init();
        // 物理
        // ZJ.WorldManager.instance.init();
        // this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        // socket
        ZJ.SocketManager.instance.init();

        if (ModuleConfig.compile.yy == true) {
            onPKFinishLoading();
        }
        ModuleStartUp.init();
        if (ModuleConfig.compile.yy == true) {
            onPKStart();
        }
    }

    private GetLoadingView(): ZJ.ViewBase {
        let loadingView: ZJ.ViewBase = null;
        let loadingClass: any = null;
        if (!ModuleConfig.compile.need_loading) {
            // none
        }
        else if (ModuleConfig.compile.danji) {
            loadingClass = LoadingView
        }
        else if (ModuleConfig.compile.yy) {
            loadingClass = YYLoadingView
        }
        else if (ModuleConfig.compile.ali) {
            loadingClass = AliLoadingView
        }
        else if (ModuleConfig.compile.chushou) {
            loadingClass = ChushouLoadingView
        }
        if (loadingClass != null) {
            ModuleConfig.uiDatas[UIName.Loading].viewClass = loadingClass
            loadingView = ZJ.UIManager.instance.openView(UIName.Loading);
        }

        return loadingView
    }

    private onEnterFrame(): void {
        // ZJ.WorldManager.instance.step();
    }

}
