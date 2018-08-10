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
                    this.play(this.bgm, loops, volume, true); // bgm认为唯一
                }
            }
        };
        AudioManager.prototype.stopBgm = function () {
            this.stop(this.bgm);
        };
        /**
         * 播放声音。
         * ps.若需要循环且不唯一，请参考else部分用ResManager加载并自行管理。
         * @param unique 唯一，播放前先停掉上一个。
         */
        AudioManager.prototype.play = function (soundResName, loops, volume, unique) {
            var _this = this;
            if (loops === void 0) { loops = 1; }
            if (volume === void 0) { volume = 1; }
            if (unique === void 0) { unique = false; }
            var soundUrl = soundResName + "_mp3";
            if (!this._isMute) {
                if (this.sounds[soundResName] != null) {
                    if (unique) {
                        this.stop(soundResName);
                    }
                    var channel = this.sounds[soundResName].play(0, loops);
                    this.soundsChannel[soundResName] = channel;
                    channel.volume = volume;
                }
                else {
                    ZJ.ResManager.instance.loadRes(soundUrl, function (res, source) {
                        var sound = res;
                        var channel = sound.play(0, loops);
                        channel.volume = volume;
                        _this.sounds[soundResName] = sound;
                        _this.soundsChannel[soundResName] = channel;
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
        AudioManager._instance = new AudioManager();
        return AudioManager;
    }());
    ZJ.AudioManager = AudioManager;
    __reflect(AudioManager.prototype, "ZJ.AudioManager");
})(ZJ || (ZJ = {}));
//# sourceMappingURL=AudioManager.js.map