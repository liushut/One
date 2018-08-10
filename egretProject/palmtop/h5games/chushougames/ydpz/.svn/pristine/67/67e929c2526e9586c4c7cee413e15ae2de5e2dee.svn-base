var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ZJ;
(function (ZJ) {
    var AudioManager = (function () {
        function AudioManager() {
            this.bgm = "bgm";
            this._isMute = false;
            this.sounds = {};
            this.soundsChannel = {};
        }
        Object.defineProperty(AudioManager, "Instance", {
            get: function () {
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(AudioManager.prototype, "isMute", {
            get: function () {
                return this._isMute;
            },
            set: function (value) {
                this._isMute = value;
                if (this._isMute) {
                    this.stopAll();
                }
                else {
                    this.stopBgm();
                    this.playBgm();
                }
            },
            enumerable: true,
            configurable: true
        });
        AudioManager.prototype.playBgm = function (loops, volume) {
            if (loops === void 0) { loops = 0; }
            if (volume === void 0) { volume = 1; }
            if (!this._isMute) {
                if (this.bgm != null && this.bgm != "") {
                    this.play(this.bgm, loops, volume);
                }
            }
        };
        AudioManager.prototype.stopBgm = function () {
            this.stop(this.bgm);
        };
        /**@param loops 播放次数 <= 0为重复播放 */
        AudioManager.prototype.play = function (soundName, loops, volume) {
            var _this = this;
            if (loops === void 0) { loops = 1; }
            if (volume === void 0) { volume = 1; }
            // let soundUrl = "resource/audio/" + soundName + ".mp3";
            // if (!this._isMute) {
            // 	if (this.sounds[soundName] != null) {
            // 		let channel = this.sounds[soundName].play(0, loops);
            // 		this.soundsChannel[soundName] = channel;
            // 		channel.volume = volume;
            // 	} else {
            // 		let sound:egret.Sound = new egret.Sound();
            // 		sound.addEventListener(egret.Event.COMPLETE, (event:egret.Event)=> {
            // 			let channel = sound.play(0, loops);
            // 			channel.volume = volume;
            // 			this.sounds[soundName] = sound;
            // 			this.soundsChannel[soundName] = channel;
            // 			if(this.isMute){
            // 				this.stop(soundName);
            // 			}
            // 		}, this);
            // 		sound.load(soundUrl);
            // 	}
            // }
            var soundUrl = soundName + "_mp3";
            if (!this._isMute) {
                if (this.sounds[soundName] != null) {
                    var channel = this.sounds[soundName].play(0, loops);
                    this.soundsChannel[soundName] = channel;
                    channel.volume = volume;
                }
                else {
                    ZJ.ResManager.instance.loadRes(soundUrl, function (res, source) {
                        var sound = res;
                        var channel = sound.play(0, loops);
                        channel.volume = volume;
                        _this.sounds[soundName] = sound;
                        _this.soundsChannel[soundName] = channel;
                    }, this);
                }
            }
        };
        AudioManager.prototype.stop = function (soundName) {
            if (this.soundsChannel[soundName] != null) {
                this.soundsChannel[soundName].stop();
                this.soundsChannel[soundName] = null;
            }
        };
        AudioManager.prototype.stopAll = function () {
            for (var name_1 in this.soundsChannel) {
                this.stop(name_1);
            }
        };
        AudioManager.prototype.getSound = function (soundName) {
            return this.sounds[soundName];
        };
        AudioManager.prototype.getChannel = function (soundName) {
            return this.soundsChannel[soundName];
        };
        AudioManager.prototype.init = function (stage) {
            stage.addEventListener(egret.Event.ACTIVATE, function () {
                // ZJ.AudioManager.Instance.playBgm(0);
            }, this);
            stage.addEventListener(egret.Event.DEACTIVATE, function () {
                ZJ.AudioManager.Instance.stopAll();
            }, this);
        };
        AudioManager._instance = new AudioManager();
        return AudioManager;
    }());
    ZJ.AudioManager = AudioManager;
    __reflect(AudioManager.prototype, "ZJ.AudioManager");
})(ZJ || (ZJ = {}));
//# sourceMappingURL=AudioManager.js.map