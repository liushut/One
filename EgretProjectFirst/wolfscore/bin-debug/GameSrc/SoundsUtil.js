var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SoundUtils = (function () {
    function SoundUtils() {
        if (SoundUtils._instance != null) {
            throw new Error("singleton 已有");
        }
    }
    SoundUtils.instance = function () {
        if (SoundUtils._instance == null) {
            SoundUtils._instance = new SoundUtils();
        }
        return SoundUtils._instance;
        //return this._instance == null ? this._instance = new SoundUtils() : this._instance;
    };
    //初始化
    SoundUtils.prototype.initSound = function () {
        // 名字在resource.json中定义
        this.bgSound = new SoundBase("sound_bg_mp3");
        this.winSound = new SoundBase("sound_win_mp3");
        this.missSound = new SoundBase("sound_miss_mp3");
        this.hitSound = new SoundBase("sound_hit_mp3");
        this.goSound = new SoundBase("sound_hit_mp3");
        this.overSound = new SoundBase("sound_gameover_mp3");
        this.beHitSound = new SoundBase("sound_behit_mp3");
        this.numSound = new SoundBase("OneTwoThree_mp3");
    };
    //播放num
    SoundUtils.prototype.playNum = function () {
        if (GameData.closeMusic) {
            return;
        }
        this.numSound.play();
    };
    SoundUtils.prototype.playBeHit = function () {
        if (GameData.closeMusic)
            return;
        this.beHitSound.play();
    };
    SoundUtils.prototype.playOver = function () {
        if (GameData.closeMusic)
            return;
        this.overSound.play();
    };
    SoundUtils.prototype.playGo = function () {
        if (GameData.closeMusic)
            return;
        this.goSound.play();
    };
    SoundUtils.prototype.playHit = function () {
        if (GameData.closeMusic)
            return;
        this.hitSound.play();
    };
    SoundUtils.prototype.playMiss = function () {
        if (GameData.closeMusic)
            return;
        this.missSound.play();
    };
    SoundUtils.prototype.playWin = function () {
        if (GameData.closeMusic)
            return;
        this.winSound.play();
    };
    SoundUtils.prototype.playBg = function () {
        if (GameData.closeBgMusic) {
            this.bgSound.pause();
            return;
        }
        this.bgSound.setLoop(true);
        this.bgSound.play();
    };
    SoundUtils.prototype.stopBg = function () {
        this.bgSound && this.bgSound.pause && this.bgSound.pause();
    };
    return SoundUtils;
}());
__reflect(SoundUtils.prototype, "SoundUtils");
//# sourceMappingURL=SoundsUtil.js.map