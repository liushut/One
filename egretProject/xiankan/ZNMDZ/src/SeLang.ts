module slgame
{
    export class SeLang extends egret.DisplayObjectContainer {

        //背景颜色
        public static bgContain:egret.Sprite;

        public static winWidth:number;
        public static  winHeight:number;

        //行列数
        public static diffBlockIndex:number;

        //当前关卡
        public static currentLevel:number;

        //数组选字索引
        public static aryIndex:number;

        //两个字任选一
        public static randomOne:number;

        public static gameBg:egret.Sprite;

        //剩余时间
        public static timeLeft:number;

        //剩余时间定时器
        public static leftTimer:egret.Timer;

        //时间label
        public static timeLabel:egret.TextField;

        //分数label
        public static scoreLabel:egret.TextField;

        public static fontAry:string[][] = [
            ["亮", "壳"],
            ["免", "兔"],
            ["呜", "鸣"],
            ["竞", "竟"],
            ["已", "己"],
            ["士", "土"],
            ["水", "氺"],
            ["找", "我"],
            ["妹", "姝"],
            ["喔", "握"],
            ["天", "夭"],
            ["大", "太"],
            ["催", "摧"],
            ["玫", "玖"],
            ["匀", "勺"],
            ["爱", "受"],
            ["尤", "龙"],
            ["日", "曰"],
            ["提", "堤"],
            ["低", "抵"],
            ["治", "冶"],
            ["哈", "蛤"],
            ["代", "伐"],
            ["谈", "淡"],
            ["下", "卞"],
            ["说", "悦"],
            ["子", "孓"],
            ["于", "干"],
            ["挂", "桂"],
            ["祥", "详"],
            ["戌", "戍"],
            ["皿", "血"],
            ["日", "目"],
            ["崇", "祟"],
            ["丐", "丏"],
            ["余", "佘"],
            ["茶", "荼"],
            ["刺", "剌"],
            ["忐", "忑"],
            ["皂", "皁"],
            ["胃", "胄"],
            ["拴", "栓"],
            ["暑", "署"],
            ["札", "扎"],
            ["佼", "狡"],
            ["垣", "桓"],
            ["盲", "肓"],
            ["准", "淮"],
            ["睹", "赌"],
            ["揠", "堰"],
            ["卅", "册"],
            ["根", "恨"],
            ["晴", "睛"],
            ["埔", "捕"],
            ["扑", "朴"],
            ["尖", "尘"],
            ["问", "间"],
            ["闩", "闫"],
            ["蚂", "吗"],
            ["坤", "珅"],
            ["明", "朋"],
            ["汗", "汪"],
            ["因", "田"],
            ["汩", "汨"],
            ["汨", "泪"],
            ["抒", "杼"],
            ["王", "玉"],
            ["今", "令"],
            ["干", "千"],
            ["币", "巾"],
            ["斤", "斥"],
            ["柬", "束"],
            ["赢", "羸"],
            ["人", "入"],
            ["已", "巳"],
            ["木", "本"],
            ["眯", "咪"],
            ["旯", "旮"],
            ["杨", "扬"],
            ["绕", "饶"],
            ["他", "她"],
            ["业", "亚"],
            ["顺", "须"],
            ["拟", "似"],
            ["议", "仪"],
            ["绎", "泽"],
            ["桶", "捅"],
            ["忧", "优"],
            ["抽", "柚"],
            ["酒", "洒"],
            ["西", "酉"],
            ["均", "钧"],
            ["帖", "贴"],
            ["挑", "桃"],
            ["枝", "技"],
            ["凋", "调"],
            ["往", "住"],
            ["礼", "轧"],
            ["塞", "寒"],
            ["纱", "沙"],
            ["沈", "沉"],
            ["汁", "计"],
            ["拭", "试"],
            ["设", "没"],
            ["待", "侍"],
            ["谭", "潭"],
            ["瞠", "膛"],
            ["师", "帅"]
        ];

        public static modeType:number;


        public constructor(mt:number) {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.startGame, this);

            this.touchEnabled = true;

            this.touchChildren = true;

            slgame.SeLang.modeType = mt;
        }

        //开始游戏
        private startGame() {

            WeixinApi.ready(function(api:WeixinApi){

                var info:WeixinShareInfo = new WeixinShareInfo();

                info.title = "超好玩微信游戏-找你妹的字";
                info.desc = "找你妹的字，找出所有字中不同一个，分享给好友，一起寻找身边的火眼金睛！";
                info.link = "http://106.186.27.20/znmdz/launcher/release.html";
                info.imgUrl = "http://106.186.27.20/gameIcons/znmdzIcon.png";

                api.shareToFriend(info);
                api.shareToTimeline(info);
            })


            slgame.SeLang.winWidth = this.stage.stageWidth;
            slgame.SeLang.winHeight = this.stage.stageHeight;

            slgame.SeLang.currentLevel = 1;

            slgame.SeLang.timeLeft = 60;

            slgame.SeLang.leftTimer = new egret.Timer(1000);
            slgame.SeLang.leftTimer.repeatCount = 60;

            slgame.SeLang.leftTimer.start();

            slgame.SeLang.leftTimer.addEventListener(egret.TimerEvent.TIMER,slgame.SeLang.displayLeftTime,slgame.SeLang.leftTimer);

            slgame.SeLang.gameBg = new egret.Sprite();
            slgame.SeLang.gameBg.graphics.beginFill(0xf06060);
            slgame.SeLang.gameBg.graphics.endFill();
            this.addChild(slgame.SeLang.gameBg);

            var tmparyCount:number = slgame.SeLang.fontAry.length;

            if(slgame.SeLang.modeType == 1) {  //多字模式
                slgame.SeLang.aryIndex = Math.floor(Math.random() * tmparyCount);
            }

            slgame.SeLang.createBlockByLevel(slgame.SeLang.currentLevel);

        }

        //生成方块
        public static createBlockByLevel(levelInt:number) {

            //数据初始化

            //背景
            slgame.SeLang.bgContain = new egret.Sprite();
            slgame.SeLang.bgContain.graphics.beginFill(0xf06060);
            slgame.SeLang.bgContain.graphics.drawRect(0, 0, slgame.SeLang.winWidth, slgame.SeLang.winHeight);
            slgame.SeLang.bgContain.graphics.endFill();
            slgame.SeLang.gameBg.addChild(slgame.SeLang.bgContain);

            //得分label
            slgame.SeLang.scoreLabel = new egret.TextField();

            slgame.SeLang.scoreLabel.text = "得分:" + String(slgame.SeLang.currentLevel-1);

            slgame.SeLang.scoreLabel.x = 20;

            slgame.SeLang.scoreLabel.y = slgame.SeLang.winHeight *0.05;

            slgame.SeLang.scoreLabel.size = 40;

            slgame.SeLang.scoreLabel.anchorX = 0;
            slgame.SeLang.scoreLabel.anchorY = 0.5;

            slgame.SeLang.bgContain.addChild(slgame.SeLang.scoreLabel);

            slgame.SeLang.timeLabel = new egret.TextField();

            slgame.SeLang.timeLabel.text = "时间:"+String(slgame.SeLang.timeLeft);

            slgame.SeLang.timeLabel.x = slgame.SeLang.winWidth - 20;

            slgame.SeLang.timeLabel.y = slgame.SeLang.winHeight *0.05;

            slgame.SeLang.timeLabel.size = 40;

            slgame.SeLang.timeLabel.anchorX = 1;
            slgame.SeLang.timeLabel.anchorY = 0.5;

            slgame.SeLang.bgContain.addChild(slgame.SeLang.timeLabel);


            var aryCount:number = slgame.SeLang.fontAry.length;

            if(slgame.SeLang.modeType == 2) {  //多字模式
                slgame.SeLang.aryIndex = Math.floor(Math.random() * aryCount);
            }



            slgame.SeLang.randomOne = Math.floor(Math.random() * 2);


            var blockCount:number = 4;
            if (levelInt < 5) {
                blockCount = (levelInt + 1) * (levelInt + 1)
            }
            else if (levelInt == 5) {
                blockCount = 25;
            }
            else if (levelInt < 8) {
                blockCount = 36;
            }
            else if (levelInt < 11) {
                blockCount = 49;
            }
            else if (levelInt < 17) {
                blockCount = 64;
            }
            else {
                blockCount = 81;
            }

            var rowNumber:number = Math.sqrt(blockCount);

            slgame.SeLang.diffBlockIndex = Math.floor(Math.random() * blockCount);

            //宽高边缘间距
            var wAndHBounceSpace = 15;

            //字体背景间距
            var fontBgSpace:number = 480 / (32 + (levelInt*2));

            if (levelInt > 20) {
                fontBgSpace = 6.5;
            }

            //字体背景块的size
            var blockWidth:number = (slgame.SeLang.winWidth - wAndHBounceSpace * 2 - ((rowNumber - 1) * fontBgSpace) ) / rowNumber;

            for (var i:number = 0; i < blockCount; i++) {

                //字体背景
                var fontBgTexture:egret.Texture = RES.getRes("fontBg");  //获取资源

                var fontBgBitmap:egret.Bitmap = new egret.Bitmap();

                fontBgBitmap.texture = fontBgTexture;

                //设置描点
                fontBgBitmap.anchorX = 0.5;
                fontBgBitmap.anchorY = 0.5;

                fontBgBitmap.width = fontBgBitmap.height = blockWidth;


                fontBgBitmap.x = wAndHBounceSpace + blockWidth * 0.5 + (blockWidth + fontBgSpace) * Math.floor(i / rowNumber);

                fontBgBitmap.y = slgame.SeLang.winHeight*0.1 + wAndHBounceSpace + blockWidth * 0.5 + (blockWidth + fontBgSpace) * (i % rowNumber);

                fontBgBitmap.name = String(i + 100);
                fontBgBitmap.touchEnabled = true;

                //添加点击事件
                fontBgBitmap.addEventListener(egret.TouchEvent.TOUCH_TAP, slgame.SeLang.checkIsRightBlock, fontBgBitmap);

                slgame.SeLang.bgContain.addChild(fontBgBitmap);

                //文字
                var word:egret.TextField = new egret.TextField();


                if (i == slgame.SeLang.diffBlockIndex) {
                    word.text = slgame.SeLang.fontAry[slgame.SeLang.aryIndex][slgame.SeLang.randomOne];
                } else {

                    word.text = slgame.SeLang.fontAry[slgame.SeLang.aryIndex][slgame.SeLang.randomOne == 0 ? 1 : 0];
                }


//            word.width = word.height = fontBgBitmap.width*0.7;
                word.textColor = 0x524646;

                word.size = 165 * (blockWidth / 210);

                word.anchorX = word.anchorY = 0.5;

                word.x = fontBgBitmap.x;
                word.y = fontBgBitmap.y;


                slgame.SeLang.bgContain.addChild(word);


            }

            //广告
            var adBaner:egret.Bitmap = new egret.Bitmap();
            adBaner.texture = RES.getRes("wxxcandroid");  //获取资源
            adBaner.x = this.winWidth * 0.5;
            adBaner.y =  slgame.SL_MainMenu.mainAdBaner.y;
            adBaner.anchorX = 0.5;
            adBaner.anchorY = 0;
            adBaner.touchEnabled = true;
            adBaner.addEventListener(egret.TouchEvent.TOUCH_TAP,slgame.SeLang.switchToDownloadPage,this);  //跳转到下载页面

            this.bgContain.addChild(adBaner);

        }

        //判断是否点击正确位置
        public static checkIsRightBlock(event:egret.TouchEvent) {

            var fontB:egret.Bitmap = event.target;

            var nameTag:number = parseInt(fontB.name);

                if (nameTag == (slgame.SeLang.diffBlockIndex + 100)) {
                    console.log("恭喜您！选对了！！！！！");

                    slgame.SeLang.gameBg.removeChild(slgame.SeLang.bgContain);

                    slgame.SeLang.currentLevel ++;

                    slgame.SeLang.createBlockByLevel(slgame.SeLang.currentLevel);

                    slgame.SeLang.scoreLabel.text = "得分:" + String(slgame.SeLang.currentLevel-1);

                }




        }

        public static displayLeftTime(event:egret.TimerEvent) {

            slgame.SeLang.timeLeft -- ;

            console.log("slgame.SeLang.timeLeft:    " + slgame.SeLang.timeLeft);
            slgame.SeLang.timeLabel.text = "时间:"+ String(slgame.SeLang.timeLeft);

            if(slgame.SeLang.timeLeft <= 0) {

                console.log(" jinlaile  ");

                slgame.SeLang.gameBg.removeChild(slgame.SeLang.bgContain);

                var gameOverScene:slgame.SL_GameOver = new slgame.SL_GameOver(slgame.SeLang.currentLevel);
                slgame.SeLang.gameBg.addChild(gameOverScene);

                slgame.SeLang.leftTimer.stop();

            }


        }

         public static switchToDownloadPage() {
            window.location.href = "http://m.app.so.com/detail/index?pname=com.zt.WhiteDeath&id=1643464";
        }

    }
}