/**
 * Created by egret on 2016/1/20.
 */
var HomeUI = (function (_super) {
    __extends(HomeUI, _super);
    function HomeUI() {
        _super.call(this);
        //console.log( "new HomeUI 资源：", RES.getRes( "commonBg_jpg" ) );
        this.addEventListener(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
        this.skinName = "resource/custom_skins/homeUISkin.exml";
    }
    var d = __define,c=HomeUI,p=c.prototype;
    p.uiCompHandler = function () {
        console.log("HomeUI uiCompHandler");
        this.mbtnProfile.addEventListener(egret.TouchEvent.TOUCH_TAP, this.mbtnHandler, this);
        this.mbtnHeros.addEventListener(egret.TouchEvent.TOUCH_TAP, this.mbtnHandler, this);
        this.mbtnGoods.addEventListener(egret.TouchEvent.TOUCH_TAP, this.mbtnHandler, this);
        this.mbtnAbout.addEventListener(egret.TouchEvent.TOUCH_TAP, this.mbtnHandler, this);
        this.btns = [this.mbtnProfile, this.mbtnHeros, this.mbtnGoods, this.mbtnAbout];
        /// 首次加载完成首先显示home
        this.goHome();
    };
    p.resetFocus = function () {
        console.log(" resetFocus ");
        if (this._uiFocused) {
            if (this._uiFocused.parent) {
                this._uiFocused.parent.removeChild(this._uiFocused);
            }
            this._uiFocused = null;
        }
        if (this._mbtnFocused != null) {
            this._mbtnFocused.selected = false;
            this._mbtnFocused.enabled = true;
            this._mbtnFocused = null;
        }
    };
    p.goHome = function () {
        console.log(" ---------- HOME ---------- ");
        this._pageFocusedPrev = this._pageFocused = GamePages.HOME;
        this.imgBg.source = "homeBg_jpg";
    };
    p.mbtnHandler = function (evt) {
        /// 已经选中不应当再处理!
        if (evt.currentTarget == this._mbtnFocused) {
            console.log(evt.currentTarget.name, "已经选中不应当再处理!");
            return;
        }
        /// 逻辑生效，所有按钮锁定
        for (var i = this.btns.length - 1; i > -1; --i) {
            this.btns[i].enabled = false;
        }
        /// 移除上一焦点对应的按钮
        //console.log( "remove _mbtnFocused:", this._mbtnFocused );
        if (this._mbtnFocused) {
            this._mbtnFocused.selected = false;
            this._mbtnFocused.enabled = true;
        }
        /// 移除上一焦点对应的UI
        if (this._uiFocused && this._uiFocused.parent) {
            this._uiFocused.parent.removeChild(this._uiFocused);
        }
        /// 设置当前焦点按钮
        this._mbtnFocused = evt.currentTarget;
        console.log("选中", this._mbtnFocused.name);
        this._mbtnFocused.enabled = false;
        /// 焦点UI重置
        this._uiFocused = null;
        this._pageFocusedPrev = this._pageFocused;
        switch (this._mbtnFocused) {
            case this.mbtnProfile:
                this._pageFocused = GamePages.PROFILE;
                break;
            case this.mbtnHeros:
                this._pageFocused = GamePages.HEROS;
                break;
            case this.mbtnGoods:
                this._pageFocused = GamePages.GOODS;
                break;
            case this.mbtnAbout:
                this._pageFocused = GamePages.ABOUT;
                break;
        }
        this.dispatchEventWith(GameEvents.EVT_LOAD_PAGE, false, this._pageFocused);
    };
    p.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    p.pageReadyHandler = function (pageName) {
        var _this = this;
        console.log("页面就绪:", pageName);
        /// 页面加载完成，所有非焦点按钮解锁
        for (var i = this.btns.length - 1; i > -1; --i) {
            this.btns[i].enabled = !this.btns[i].selected;
        }
        switch (pageName) {
            case GamePages.PROFILE:
                if (!this._profileUI) {
                    this._profileUI = new ProfileUI;
                    this._profileUI.addEventListener(GameEvents.EVT_RETURN, function () {
                        _this.resetFocus();
                        _this.goHome();
                    }, this);
                }
                this.imgBg.source = "commonBg_jpg";
                this._uiFocused = this._profileUI;
                break;
            case GamePages.HEROS:
                if (!this._herosUI) {
                    this._herosUI = new HerosUI();
                    this._herosUI.addEventListener(GameEvents.EVT_RETURN, function () {
                        _this.resetFocus();
                        _this.goHome();
                    }, this);
                }
                this.imgBg.source = "bgListPage_jpg";
                this._uiFocused = this._herosUI;
                break;
            case GamePages.GOODS:
                if (!this._goodsUI) {
                    this._goodsUI = new GoodsUI();
                    this._goodsUI.addEventListener(GameEvents.EVT_RETURN, function () {
                        _this.resetFocus();
                        _this.goHome();
                    }, this);
                }
                this.imgBg.source = "bgListPage_jpg";
                this._uiFocused = this._goodsUI;
                break;
            case GamePages.ABOUT:
                if (!this._aboutUI) {
                    this._aboutUI = new AboutUI();
                    this._aboutUI.addEventListener(GameEvents.EVT_CLOSE_ABOUT, function () {
                        _this.resetFocus();
                        console.log("关闭关于 返回:", _this._pageFocusedPrev);
                        switch (_this._pageFocusedPrev) {
                            case GamePages.PROFILE:
                                _this.mbtnProfile.selected = true;
                                _this.mbtnProfile.dispatchEventWith(egret.TouchEvent.TOUCH_TAP);
                                break;
                            case GamePages.HEROS:
                                _this.mbtnHeros.selected = true;
                                _this.mbtnHeros.dispatchEventWith(egret.TouchEvent.TOUCH_TAP);
                                break;
                            case GamePages.GOODS:
                                _this.mbtnGoods.selected = true;
                                _this.mbtnGoods.dispatchEventWith(egret.TouchEvent.TOUCH_TAP);
                                break;
                        }
                    }, this);
                }
                //this.imgBg.source = "homeBg_jpg";
                this._uiFocused = this._aboutUI;
                break;
        }
        /// 总是把页面放在背景的上一层！
        this.addChildAt(this._uiFocused, this.getChildIndex(this.imgBg) + 1);
    };
    return HomeUI;
})(eui.Component);
egret.registerClass(HomeUI,'HomeUI');
//# sourceMappingURL=HomeUI.js.map