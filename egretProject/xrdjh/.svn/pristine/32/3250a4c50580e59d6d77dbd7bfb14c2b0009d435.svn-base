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
			}else{
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
				if(this.bgm != null && this.bgm != ""){
					this.play(this.bgm, loops, volume);
				}
			}
		}

		public stopBgm(){
			this.stop(this.bgm);
		}

		/**@param loops 播放次数 <= 0为重复播放 */
		public play(soundName: string, loops: number = 1, volume: number = 1) {
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
			let soundUrl = soundName + "_mp3";
			if(!this._isMute){
				if (this.sounds[soundName] != null) {
					let channel = this.sounds[soundName].play(0, loops);
					this.soundsChannel[soundName] = channel;
					channel.volume = volume;
				} else {
					ZJ.ResManager.instance.loadRes(soundUrl, (res, source) =>{
						let sound:egret.Sound = res;
						let channel = sound.play(0, loops);
						channel.volume = volume;
						this.sounds[soundName] = sound;
						this.soundsChannel[soundName] = channel;
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

		public stopAll(){
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
