module ZJ {
	export class AudioManager {
		public bgm: string = "bgm";
		private static _instance: AudioManager = new AudioManager();
		static get Instance(): AudioManager {
			return this._instance;
		}

		private _isMute: boolean = false;;
		public get isMute() {
			return this._isMute;
		}
		public set isMute(value) {
			this._isMute = value;
			if (this._isMute) {
				this.stopAll();
			} else {
				this.stopBgm();
				this.playBgm();
			}
		}
		private sounds: { [key: string]: egret.Sound } = {};
		private soundsChannel: { [key: string]: egret.SoundChannel } = {};

		public constructor() {

		}

		public playBgm(loops: number = 0, volume: number = 1) {
			if (!this._isMute) {
				if (this.bgm != null && this.bgm != "") {
					this.play(this.bgm, loops, volume, true); // bgm认为唯一
				}
			}
		}

		public stopBgm() {
			this.stop(this.bgm);
		}

		/**
		 * 播放声音。
		 * ps.若需要循环且不唯一，请参考else部分用ResManager加载并自行管理。
		 * @param unique 唯一，播放前先停掉上一个。
		 */
		public play(soundResName: string, loops: number = 1, volume: number = 1, unique: boolean = false) {
			let soundUrl = soundResName + "_mp3";
			if (!this._isMute) {
				if (this.sounds[soundResName] != null) {
					if (unique) {
						this.stop(soundResName);
					}
					let channel = this.sounds[soundResName].play(0, loops);
					this.soundsChannel[soundResName] = channel;
					channel.volume = volume;
				} else {
					ZJ.ResManager.instance.loadRes(soundUrl, (res, source) => {
						let sound: egret.Sound = res;
						let channel = sound.play(0, loops);
						channel.volume = volume;
						this.sounds[soundResName] = sound;
						this.soundsChannel[soundResName] = channel;
					}, this);
				}
			}
		}

		public stop(soundName: string) {
			if (this.soundsChannel[soundName] != null) {
				this.soundsChannel[soundName].stop();
				this.soundsChannel[soundName] = null;
			}
		}

		public stopAll() {
			for (let name in this.soundsChannel) {
				this.stop(name);
			}
		}

		public getSound(soundName: string) {
			return this.sounds[soundName];
		}

		public getChannel(soundName: string) {
			return this.soundsChannel[soundName];
		}
	}
}
