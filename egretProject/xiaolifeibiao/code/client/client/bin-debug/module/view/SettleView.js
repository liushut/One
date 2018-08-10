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
var SettleView = (function (_super) {
    __extends(SettleView, _super);
    function SettleView() {
        var _this = _super.call(this) || this;
        _this.SHOW_TIME = 3000;
        _this.toPlatform = "";
        _this.timeoutid = 0;
        _this.skinName = "SettleViewSkin";
        return _this;
    }
    SettleView.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    SettleView.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        var black = ZJ.ShapeUtil.getRect(0x000000, 0.4, this.stage.stageWidth, this.stage.stageHeight);
        this.gBg.addChild(black);
        this.game = ZJ.UIManager.instance.openView(UIName.Game);
        // egret.Tween.get(this.bg, { loop: true }).to({ rotation: 360 }, 7000);
        this.restart.addEventListener("touchTap", function () {
            var e = new egret.Event(EventName.Test);
            ZJ.EventManager.instance.dispatchEvent(e);
            ZJ.UIManager.instance.destroyView(UIName.Settle);
        }, this);
        this.phb.addEventListener("touchTap", function () {
            ChushouSDK.instance.csExitGame();
        }, this);
    };
    SettleView.prototype.setData = function (data) {
        if (!ModuleConfig.compile.danji) {
            if (data.weekTop < data.score) {
                this.icon0.source = "bzzj_png";
                this.icon3.visible = false;
                this.score.text = data.score.toString();
            }
            else if (data.weekTop >= data.score) {
                this.icon0.source = "bcdf_png";
                this.icon3.visible = true;
                this.score.text = data.score.toString();
                this.bzzj.text = data.weekTop.toString();
            }
            this.friend.text = data.friend.toString();
            this.paiming.text = data.paiming.toString();
        }
        else if (ModuleConfig.compile.danji) {
            this.score.text = data.score.toString();
        }
    };
    // public setData(data:any){
    // 	this.score.text = data.score.toString();
    // }
    // private onBigClick(): void {
    // 	ZJ.UIManager.instance.destroyView(UIName.Settle);
    // 	//this.onTimeout();
    // }
    // private onTimeout(): void {
    // 	if (ModuleConfig.compile.danji) {
    // 		ZJ.EventManager.instance.dispatchEvent(new egret.Event(EventName.GAME_RESTART));
    // 		ZJ.UIManager.instance.destroyView(UIName.Settle)
    // 	}
    // 	else {
    // test
    // let e = new egret.Event(EventName.Test);
    // e.data = { log: this.toPlatform };
    // ZJ.EventManager.instance.dispatchEvent(e);
    // ZJ.UIManager.instance.destroyView(UIName.Settle)
    // 		sendResult(this.toPlatform);
    // 	}
    // }
    // public setData(data: any): void {
    // 	this.toPlatform = data.toPlatform;
    // 	if (data.win == 2) {
    // 		this.bg.source = "shenglidi_png";
    // 		this.icon.source = "shengli_png";
    // 	}
    // 	else if (data.win == 1) {
    // 		this.bg.source = "pingdi_png";
    // 		this.icon.source = "ping_png";
    // 	}
    // 	else {
    // 		this.bg.source = "shibaidi_png";
    // 		this.icon.source = "shibai_png";
    // 	}
    // 	this.score1.text = data.score1.toString();
    // 	this.score2.text = data.score2.toString();
    // 	// this.gWin.visible = data.win == 2;
    // 	// this.gPing.visible = data.win == 1;
    // 	// this.gLose.visible = data.win == 0;
    // 	this.timeoutid = setTimeout(() => {
    // 		this.onTimeout();
    // 	}, this.SHOW_TIME);
    // }
    SettleView.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
        // clearTimeout(this.timeoutid);
        // egret.Tween.removeTweens(this.bg);
        return 0;
    };
    return SettleView;
}(ZJ.ViewBase));
__reflect(SettleView.prototype, "SettleView");
//# sourceMappingURL=SettleView.js.map