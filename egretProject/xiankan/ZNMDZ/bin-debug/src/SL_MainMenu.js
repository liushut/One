var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var slgame;
(function (slgame) {
    var SL_MainMenu = (function (_super) {
        __extends(SL_MainMenu, _super);
        function SL_MainMenu() {
            _super.call(this);

            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.initMainUI, this);
        }
        SL_MainMenu.prototype.initMainUI = function () {
            this.winWidth = this.stage.stageWidth;
            this.winHeight = this.stage.stageHeight;

            this.bgContain = new egret.Sprite();
            this.bgContain.graphics.beginFill(0xf06060);
            this.bgContain.graphics.drawRect(0, 0, this.winWidth, this.winHeight);
            this.bgContain.graphics.endFill();
            this.addChild(this.bgContain);

            //名称
            this.gameName = new egret.TextField();
            this.gameName.x = this.winWidth * 0.5;
            this.gameName.y = 30;
            this.gameName.anchorX = 0.5;
            this.gameName.anchorY = 0;
            this.gameName.size = 30;
            this.gameName.textAlign = egret.HorizontalAlign.CENTER;
            this.gameName.textColor = 0xFFFFFF;
            this.gameName.text = "找你妹的字";
            this.gameName.strokeColor = 0xFF0000;
            this.gameName.stroke = 2;
            this.bgContain.addChild(this.gameName);

            //游戏规则
            this.ruleLabel = new egret.TextField();
            this.ruleLabel.x = this.winWidth * 0.5;
            this.ruleLabel.y = this.winHeight * 0.2;
            this.ruleLabel.anchorX = 0.5;
            this.ruleLabel.anchorY = 0.5;
            this.ruleLabel.textAlign = egret.HorizontalAlign.CENTER;
            this.ruleLabel.textColor = 0xfffafa;
            this.ruleLabel.text = "找出所有字中不同的一个";
            this.ruleLabel.size = 35;
            this.bgContain.addChild(this.ruleLabel);

            //单字游戏
            this.signalBtn = new egret.Bitmap(); //初始化，创建位图
            this.signalBtn.texture = RES.getRes("signalBtn"); //获取资源
            this.signalBtn.x = this.winWidth * 0.5;
            this.signalBtn.y = this.winHeight * 0.38;
            this.signalBtn.anchorX = 0.5;
            this.signalBtn.anchorY = 0.5;
            this.signalBtn.touchEnabled = true; //开启触摸

            this.signalBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gameSignalStart, this); //点击按钮开始游戏

            this.bgContain.addChild(this.signalBtn);

            //多字字游戏
            this.startBtn = new egret.Bitmap(); //初始化，创建位图
            this.startBtn.texture = RES.getRes("moreBtn"); //获取资源
            this.startBtn.x = this.winWidth * 0.5;
            this.startBtn.y = this.winHeight * 0.6;
            this.startBtn.anchorX = 0.5;
            this.startBtn.anchorY = 0.5;
            this.startBtn.touchEnabled = true; //开启触摸

            this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gameStart, this); //点击按钮开始游戏

            this.bgContain.addChild(this.startBtn);

            //声明
            var stateBitmap = new egret.Bitmap();

            stateBitmap.texture = RES.getRes("state"); //获取资源
            stateBitmap.x = this.winWidth * 0.5;
            stateBitmap.y = this.startBtn.y + this.startBtn.height * 0.5 + 30;
            stateBitmap.anchorX = 0.5;
            stateBitmap.anchorY = 0;

            this.bgContain.addChild(stateBitmap);

            //广告
            slgame.SL_MainMenu.mainAdBaner = new egret.Bitmap();
            slgame.SL_MainMenu.mainAdBaner.texture = RES.getRes("wxxcandroid"); //获取资源
            slgame.SL_MainMenu.mainAdBaner.x = this.winWidth * 0.5;
            slgame.SL_MainMenu.mainAdBaner.y = stateBitmap.y + stateBitmap.height + 20;
            slgame.SL_MainMenu.mainAdBaner.anchorX = 0.5;
            slgame.SL_MainMenu.mainAdBaner.anchorY = 0;
            slgame.SL_MainMenu.mainAdBaner.touchEnabled = true;
            slgame.SL_MainMenu.mainAdBaner.addEventListener(egret.TouchEvent.TOUCH_TAP, this.switchToDownloadPage, this); //跳转到下载页面

            this.bgContain.addChild(slgame.SL_MainMenu.mainAdBaner);

            WeixinApi.ready(function (api) {
                var info = new WeixinShareInfo();

                info.title = "超好玩微信游戏-找你妹的字";
                info.desc = "找你妹的字，找出所有字中不同一个，分享给好友，一起寻找身边的火眼金睛！";
                info.link = "http://106.186.27.20/znmdz/launcher/release.html";
                info.imgUrl = "http://106.186.27.20/gameIcons/znmdzIcon.png";

                api.shareToFriend(info);
                api.shareToTimeline(info);
            });
        };

        SL_MainMenu.prototype.gameStart = function () {
            this.removeChild(this.bgContain);

            var gamePlayingScene = new slgame.SeLang(2);
            this.addChild(gamePlayingScene);
        };

        SL_MainMenu.prototype.gameSignalStart = function () {
            this.removeChild(this.bgContain);

            var gamePlayingScene = new slgame.SeLang(1);
            this.addChild(gamePlayingScene);
        };

        SL_MainMenu.prototype.switchToDownloadPage = function () {
            //            window.location.href = "http://106.186.27.20/AdManager/hsxdshortlink.php";
            window.location.href = "http://m.app.so.com/detail/index?pname=com.zt.WhiteDeath&id=1643464";
        };
        return SL_MainMenu;
    })(egret.DisplayObjectContainer);
    slgame.SL_MainMenu = SL_MainMenu;
    SL_MainMenu.prototype.__class__ = "slgame.SL_MainMenu";
})(slgame || (slgame = {}));
