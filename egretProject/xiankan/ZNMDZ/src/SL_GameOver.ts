module slgame {
    export class SL_GameOver extends egret.DisplayObjectContainer {

        //分数
        public static scoreResult:number;

        //背景颜色
        private bgContain:egret.Sprite;

        public static scoreLabel:egret.TextField;

        //荣誉称号
        private titleAry:string[] = ["瞎子,LV","近视眼,LV","正常视力,LV","炯炯有神,LV","犀利眼,LV","放大镜,LV","显微镜,LV","哈雷望远镜,LV","火眼金睛,LV"];

        public constructor(levelResult:number) {

            super();

            slgame.SL_GameOver.scoreResult = levelResult;

            this.addEventListener(egret.Event.ADDED_TO_STAGE,this.createUI,this);


        }

        private createUI() {

            var winWidth:number = this.stage.stageWidth;
            var winHeight:number = this.stage.stageHeight;

            this.bgContain = new egret.Sprite();
            this.bgContain.graphics.beginFill(0xf06060);
            this.bgContain.graphics.drawRect(0,0,winWidth,winHeight);
            this.bgContain.graphics.endFill();
            this.addChild(this.bgContain);

            //分享
            var shareImg:egret.Bitmap = new egret.Bitmap();   //初始化，创建位图
            shareImg.texture = RES.getRes("shareImg");  //获取资源
            shareImg.x = winWidth-40;
            shareImg.y =  8;
            shareImg.anchorX = 1;
            shareImg.anchorY = 0;

            this.bgContain.addChild(shareImg);


            //重玩按钮
            var reStartBtn:egret.Bitmap = new egret.Bitmap();   //初始化，创建位图
            reStartBtn.texture = RES.getRes("restartBtn");  //获取资源
            reStartBtn.x = winWidth * 0.5;
            reStartBtn.y =  winHeight * 0.6;
            reStartBtn.anchorX = 0.5;
            reStartBtn.anchorY = 0.5;
            reStartBtn.touchEnabled = true;  //开启触摸

            reStartBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.gameStart,this);  //点击按钮开始游戏

            this.bgContain.addChild(reStartBtn);


            //单子或者多字按钮
            var modeBtn:egret.Bitmap = new egret.Bitmap();   //初始化，创建位图

            if(slgame.SeLang.modeType == 1) {  //单子，则出现多字模式
                modeBtn.texture = RES.getRes("moreBtn");  //获取资源
            } else {//多字，则出现单子模式
                modeBtn.texture = RES.getRes("signalBtn");  //获取资源
            }

            modeBtn.x = winWidth * 0.5;
            modeBtn.y =  winHeight * 0.4;
            modeBtn.anchorX = 0.5;
            modeBtn.anchorY = 0.5;
            modeBtn.touchEnabled = true;  //开启触摸

            modeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.startOtherModeGame,this);  //点击按钮开始游戏

            this.bgContain.addChild(modeBtn);

            //关注
            var followBtn:egret.Bitmap = new egret.Bitmap();

            followBtn.texture = RES.getRes("follow");  //获取资源
            followBtn.x = winWidth * 0.5;
            followBtn.y =  reStartBtn.y + reStartBtn.height*0.5 + 40;
            followBtn.anchorX = 0.5;
            followBtn.anchorY = 0;
            followBtn.touchEnabled = true;
            followBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.followAction,this);  //绑定关注事件

            this.bgContain.addChild(followBtn);

            //广告
            var adBaner:egret.Bitmap = new egret.Bitmap();
            adBaner.texture = RES.getRes("wxxcandroid");  //获取资源
            adBaner.x = winWidth * 0.5;
            adBaner.y =  followBtn.y + followBtn.height + 20;
            adBaner.anchorX = 0.5;
            adBaner.anchorY = 0;
            adBaner.touchEnabled = true;

            adBaner.addEventListener(egret.TouchEvent.TOUCH_TAP,this.switchToDownloadPage,this);  //跳转到下载页面

            this.bgContain.addChild(adBaner);



            //得分label
            slgame.SL_GameOver.scoreLabel = new egret.TextField();

            if (slgame.SL_GameOver.scoreResult < 6) {
                slgame.SL_GameOver.scoreLabel.text = this.titleAry[0] +  String(slgame.SL_GameOver.scoreResult-1);
            } else if (slgame.SL_GameOver.scoreResult < 11) {
                slgame.SL_GameOver.scoreLabel.text = this.titleAry[1] + String(slgame.SL_GameOver.scoreResult-1);
            } else if (slgame.SL_GameOver.scoreResult < 21) {
                slgame.SL_GameOver.scoreLabel.text = this.titleAry[2] + String(slgame.SL_GameOver.scoreResult-1);
            } else if (slgame.SL_GameOver.scoreResult < 31) {
                slgame.SL_GameOver.scoreLabel.text = this.titleAry[3] + String(slgame.SL_GameOver.scoreResult-1);
            } else if (slgame.SL_GameOver.scoreResult < 41) {
                slgame.SL_GameOver.scoreLabel.text = this.titleAry[4] + String(slgame.SL_GameOver.scoreResult-1);
            } else if (slgame.SL_GameOver.scoreResult < 51) {
                slgame.SL_GameOver.scoreLabel.text = this.titleAry[5] + String(slgame.SL_GameOver.scoreResult-1);
            } else if (slgame.SL_GameOver.scoreResult < 61) {
                slgame.SL_GameOver.scoreLabel.text = this.titleAry[6] + String(slgame.SL_GameOver.scoreResult-1);
            } else if (slgame.SL_GameOver.scoreResult < 71) {
                slgame.SL_GameOver.scoreLabel.text = this.titleAry[7] + String(slgame.SL_GameOver.scoreResult-1);
            } else {
                slgame.SL_GameOver.scoreLabel.text = this.titleAry[8] + String(slgame.SL_GameOver.scoreResult-1);
            }


            slgame.SL_GameOver.scoreLabel.x = winWidth * 0.5;

            slgame.SL_GameOver.scoreLabel.y = winHeight *0.2;

            slgame.SL_GameOver.scoreLabel.size = 60;

            slgame.SL_GameOver.scoreLabel.anchorX = 0.5;

            slgame.SL_GameOver.scoreLabel.anchorY = 0.5;

            slgame.SL_GameOver.scoreLabel.strokeColor = 0x585555;

            slgame.SL_GameOver.scoreLabel.stroke = 2;

            this.bgContain.addChild(slgame.SL_GameOver.scoreLabel);


            WeixinApi.ready(function(api:WeixinApi){

                var info:WeixinShareInfo = new WeixinShareInfo();

                info.title = "眼已瞎，怒闯"+String(slgame.SL_GameOver.scoreResult-1) +"关，"+"我是["+slgame.SL_GameOver.scoreLabel.text+"]，"+"求虐，求超越！";
                info.desc = "找你妹的字，找出所有字中不同一个，分享给好友，一起寻找身边的火眼金睛！";
                info.link = "http://106.186.27.20/znmdz/launcher/release.html";
                info.imgUrl = "http://106.186.27.20/gameIcons/znmdzIcon.png";

                api.shareToFriend(info);

                var timelineInfo:WeixinShareInfo = new WeixinShareInfo();

                timelineInfo.desc = "眼已瞎，怒闯"+String(slgame.SL_GameOver.scoreResult-1) +"关，"+"我是["+slgame.SL_GameOver.scoreLabel.text+"]，"+"求虐，求超越！找你妹的字，找出所有字中不同一个，分享给好友，一起寻找身边的火眼金睛！";
                timelineInfo.title = "找你妹的字";
                timelineInfo.link = "http://106.186.27.20/znmdz/launcher/release.html";
                timelineInfo.imgUrl = "http://106.186.27.20/gameIcons/znmdzIcon.png";
                api.shareToTimeline(timelineInfo);


            })


        }

        private gameStart() {
            this.removeChild(this.bgContain);
            var gamePlayingScene:slgame.SeLang = new slgame.SeLang(slgame.SeLang.modeType);
            this.addChild(gamePlayingScene);
        }

        private startOtherModeGame() {
            this.removeChild(this.bgContain);

            var gamePlayingScene:slgame.SeLang;

            if (slgame.SeLang.modeType == 1) {
                gamePlayingScene = new slgame.SeLang(2);
            } else {
                gamePlayingScene = new slgame.SeLang(1);
            }

            this.addChild(gamePlayingScene);
        }

        private followAction() {
            window.location.href = "http://mp.weixin.qq.com/s?__biz=MzA5NTI0ODAzOA==&mid=201092364&idx=1&sn=4863a9e9c2558da14f0fcc1fd6124596#rd";
        }

        private switchToDownloadPage() {
//            window.location.href = "http://106.186.27.20/AdManager/hsxdshortlink.php";
            window.location.href = "http://m.app.so.com/detail/index?pname=com.zt.WhiteDeath&id=1643464";
        }

    }
}